import tmpl from './../../utils/templates';

class TasksView {
  constructor (taskContainer, tasks) {
    this.parentContainer = taskContainer;
    this.template = tmpl.taskTemplate;
    this.selector = '.task';
    this.data = tasks;

    this.render();
    this.renderChilds();
  }

  render() {
    for(let i in this.data) {
      const task = this.data[i];
      this.$el = this.parentContainer.append($(this.template(task))).find(this.selector);
      this.parentContainer.find(`#${task.identifier} .badge-container`).append(tmpl.badgeTemplate());
    }
  }

  renderChilds() {
  }

  // render() {
  //   const projectCardHtml = this.projectTemplate(this.data.task);
  //   container.append(projectCardHtml);
  //   container.find(`#card_${this.data.task.id}`).parent().find('.badge-container').html(this.badgeCountTemplate(countData));
  // }
  //
  // bindEvents() {
  //
  // }
}

export default TasksView;
