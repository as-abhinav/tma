/**
    var template = Handlebars.compile($("#entry-template").html();); // template
    var context = {title: "My New Post", body: "This is my first post!"};  // data
    var html    = template(context); // VIEW
 */

import Handlebars from 'handlebars';
import $ from 'jquery';

import tmpl from './utils/templates';
import WallManager from './views/wall/WallView';
import LanesModel from './model/lanes';

// import ProjectCardManager from "./views/tasks/task.manager";

const App = (() => {
  let $app = $("#app");

  let init = () => {
    const wall = new WallManager($app);
  };

  return {init};
})();


$(App.init);
