import tmpl from './../../utils/templates';
import View from './../ParentView';
import TaskView from './TaskView';

class TasksView extends View {
  constructor (tasksContainer, tasks) {
    super(tasksContainer, tmpl.taskTemplate, '.task');

    this.data = tasks;

    this.render();
  }

  render() {
    for(let i in this.data) {
      const task = this.data[i];
      new TaskView(this.container, task);
    }
  }
}

export default TasksView;
