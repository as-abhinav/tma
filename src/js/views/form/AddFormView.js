import './../../../../node_modules/object.observe/dist/object-observe-lite';
import './../../../../node_modules/array.observe/array-observe';

import tmpl from './../../utils/templates';
import View from './../ParentView';
import LaneModel from './../../model/LanesModel';
import TaskView from './../tasks/TaskView';

class AddFormView extends View {
  constructor (container) {
    super(container, tmpl.addFormTemplate, 'form');

    this.render();
    this.bindEvents();
    this.bindDataObserver();

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
      const changedObject = changes[0];
      new TaskView(null, changedObject.object[changedObject.index]);
    });
  }
}

export default AddFormView;