import Handlebars from 'handlebars';

class TaskManager {
  constructor (opt) {
    this.projectTemplate = Handlebars.compile($("#projectCardTemplate").html());
    this.data = opt;

    this.render();
    this.bindEvents();
  }

  render() {
    const projectCardHtml = this.projectTemplate(this.data.task);
    container.append(projectCardHtml);
    container.find(`#card_${this.data.task.id}`).parent().find('.badge-container').html(this.badgeCountTemplate(countData));
  }

  bindEvents() {

  }
}

export default TaskManager;
