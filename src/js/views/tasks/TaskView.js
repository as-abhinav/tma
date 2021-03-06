import $ from 'jquery';
import tmpl from './../../utils/templates';
import View from './../ParentView';

class TaskView extends View {
  constructor (taskContainer, task) {
    taskContainer = taskContainer || $('.card-container').eq(0);
    super(taskContainer, tmpl.taskTemplate, '.task');
    
    this.data = task;

    this.render();
  }

  render() {
    const task = this.data;
    this.$el = this.container.append($(this.viewTemplate(task))).find(this.selector);
  }
}

export default TaskView;
