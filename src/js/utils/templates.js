import Handlebars from 'handlebars';
import $ from 'jquery';

export default {
  badgeTemplate:    Handlebars.compile($("#badgeTemplate").html()),
  addFormTemplate:  Handlebars.compile($("#addFormTemplate").html()),
  wallTemplate:     Handlebars.compile($("#wallTemplate").html()),
  laneTemplate:     Handlebars.compile($("#laneTemplate").html()),
  taskTemplate:     Handlebars.compile($("#taskTemplate").html()),
  lanesTemplate:    Handlebars.compile("<div class='lanes'></div>")
};
