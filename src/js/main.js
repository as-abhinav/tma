/**
    var template = Handlebars.compile($("#entry-template").html();); // template
    var context = {title: "My New Post", body: "This is my first post!"};  // data
    var html    = template(context); // VIEW
 */

import WallManager from './wall/wall.manager';
import wallConfig from './wall/wall.config';
import Handlebars from 'handlebars';
import ProjectCardManager from "./projects/project.manager";

const App = (() => {
  let $app = $("#app");

  let init = () => {
    // Init Wall
    let wall = new WallManager($app, wallConfig);

    // Init Form to add stickies
    $app.prepend(Handlebars.compile($("#addFormTemplate").html())({}));

    initComponents();
    initAddForm();
  },

  initComponents = () => {
    // Init global components
    Materialize.updateTextFields();
    $('.collapsible').collapsible({accordion : false});
  },

  initAddForm = () => {
    $('#addProjectForm').on('submit', (e) => {
      e.preventDefault();
      let data = {
        id: (new Date()).getTime().toString(),
        title: $('#projectName').val(),
        description: $('#projectDesc').val()
      };

      ProjectCardManager.render($('#todoLane'),data);

      // let storyCard = new
      $('.collapsible-header').click();
    });
  };

  return {init};
})();


$(App.init);
