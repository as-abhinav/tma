import fs from 'fs';
import source from 'vinyl-source-stream';
import del from 'del';
import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import htmlMin from 'gulp-htmlmin';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import gIf from 'gulp-if';
import watch from 'gulp-watch';
import sequence from 'gulp-sequence';
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import shell from 'gulp-shell';
import packageJSON from './package.json';
import {argv} from 'yargs';

// Configurations.
const IS_DEV_MODE = argv.development;
const sourceDirectory = packageJSON.directories.src;
const destinationDirectory = packageJSON.directories.dist;


function runScriptsBundler(isWatchMode) {
  // Configuration.
  const config = {
    babel: JSON.parse(fs.readFileSync(`${__dirname}/.babelrc`, 'utf8')),
    browserify: {
      entries: `${sourceDirectory}/js/main.js`,
      debug: IS_DEV_MODE
    },
    uglify: {
      compress: {
        drop_debugger: !IS_DEV_MODE
      }
    }
  };

  // Browserify bundler instance with babelify transform.
  const browserifyInstance = browserify(config.browserify).transform(babelify.configure(config.babel));

  // If in watch mode watchify module is used
  // to wrap the browserify instance for incremental building.
  const bundler = isWatchMode ?
    watchify(browserifyInstance) : browserifyInstance;

  function rebundle() {
    return bundler.bundle()
      .on('error', (error) => {
        util.beep();
        this.emit('end');
      })
      .pipe(source('scripts.js'))
      .pipe(gIf(!IS_DEV_MODE, buffer()))
      .pipe(gIf(!IS_DEV_MODE, uglify(config.uglify)))
      .pipe(gulp.dest(destinationDirectory))
      .pipe(gIf(IS_DEV_MODE, browserSync.reload({stream: true})));
  }

  // Bundle on changes.
  bundler.on('update', () => {
    rebundle();
  });

  // Return bundler function.
  return rebundle();
}

// Development task.
gulp.task('default', (callback) =>
  sequence(
    'clean',
    ['build:html', 'build:sass', 'build:js:watch', 'copy:libjs'],
    ['watch', 'browsersync'],
    callback
  )
);

// Production task.
gulp.task('build', (callback) =>
  sequence(
    'clean',
    ['build:html', 'build:sass', 'build:js', 'copy:libjs'],
    'server', callback
  )
);

// Keeps changes in sync with the browser.
gulp.task('browsersync', () => {
  // Configuration.
  const config = {
    server: {
      baseDir: `${destinationDirectory}`
    }
  };

  return browserSync(config);
});

// Deletes the build folder.
gulp.task('clean', (callback) => {
  const paths = [destinationDirectory];
  return del(paths, callback);
});

// copy lib js to destination folder
gulp.task('copy:libjs', () => {
  return gulp.src(`${sourceDirectory}/js/lib/*.*`)
    .pipe(plumber())
    .pipe(gulp.dest(`${destinationDirectory}/lib/`));
});


// Minifies the HTML file and clones it to destination folder.
gulp.task('build:html', () => {
  // Configuration.
  const config = {
    removeComments: true,
    collapseWhitespace: true,
  };

  return gulp.src(`${sourceDirectory}/html/**/*.html`)
    .pipe(plumber())
    .pipe(htmlMin(config))
    .pipe(gulp.dest(destinationDirectory))
    .pipe(gIf(IS_DEV_MODE, browserSync.reload({stream: true})));
});

// Compiles modular JS written in ES6 down to ES5 with
// babelify transform, which allows us to write modular ES6.
// Result is a single file compiled to
// ES5 with all required dependecies resolved.
gulp.task('build:js', () => runScriptsBundler(false));

// Same task as above but in watch mode for incremental building.
gulp.task('build:js:watch', ['build:js'], () => runScriptsBundler(true));

// Concats and auto-prefixes the stylesheets.
gulp.task('build:sass', () => {
  // Configuration.
  const config = {
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    stylus: {
      'include css': true
    }
  };

  return gulp.src(`${sourceDirectory}/sass/app.scss`)
    .pipe(plumber())
    .pipe(gIf(IS_DEV_MODE, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(destinationDirectory))
    .pipe(gIf(IS_DEV_MODE, browserSync.reload({stream: true})));
});

// Run local server for the build files.
gulp.task('server', shell.task([
  `./node_modules/.bin/http-server ${destinationDirectory}`,
]));

// Watches for file changes and run specific tasks.
// Script watching is already done by watchify.
gulp.task('watch', ['browsersync'], () => {
  // HTML document.
  watch(
    `${sourceDirectory}/html/**/*.html`,
    () => gulp.start('build:html')
  );

  // Styles.
  watch(
    `${sourceDirectory}/sass/**/*.{scss,css}`,
    () => gulp.start('build:sass')
  );
});
