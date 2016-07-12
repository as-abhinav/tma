import './../../../../node_modules/object.observe/dist/object-observe-lite';
import './../../../../node_modules/array.observe/array-observe';
import tmpl from './../../utils/templates';
import LaneModel from './../../model/LanesModel';
import TaskView from './../tasks/TaskView';


class AddFormManager {
  constructor (container) {
    this.parentContainer = container;
    this.template = tmpl.addFormTemplate;
    this.selector = 'form';

    this.render();
    this.bindEvents();

    this.bindDataObserver();
  }

  render() {
    this.$el = this.parentContainer.append($(this.template())).find(this.selector);
  }

  bindEvents() {
    let self = this;
    self.$el.on('submit', (e) => {
      e.preventDefault();
      var title = $('#taskName').val().trim();
      if(!title) return;
      let task = {
        id: (new Date()).getTime().toString(),
        title
      };
      LaneModel.addTask(task, null);
      self.$el.get(0).reset();
    });
  }

  bindDataObserver() {
    LaneModel.bindEvents(LaneModel.getLane().tasks, function(changes) {
      new TaskView(null,changes[0].object[changes[0].index]);
      console.log("Changes: ", changes);
    });
  }
}

export default AddFormManager;