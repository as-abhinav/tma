/**
    var template = Handlebars.compile($("#entry-template").html();); // template
    var context = {title: "My New Post", body: "This is my first post!"};  // data
    var html    = template(context); // VIEW
 */

import $ from 'jquery';

import WallView from './views/wall/WallView';

const App = (() => {
  let $app = $("#app");

  let init = () => {
    new WallView($app);
  };

  return {init};
})();


$(App.init);
