import tmpl from '../../utils/templates';
import TasksView from './../tasks/TasksView';

class LaneView {
  constructor (laneContainer, lane) {
    this.parentContainer = laneContainer;
    this.template = tmpl.laneTemplate;
    this.selector = '.lane';
    this.data = lane;

    this.render();
    this.renderChilds();
  }

  render() {
    this.$el = $(this.template(this.data));
    this.parentContainer.append(this.$el);
    this.parentContainer.find(`#${this.data.identifier} .badge-container`).append(tmpl.badgeTemplate());
  }

  renderChilds() {
    new TasksView(this.$el, this.data.tasks);
  }
}

export default LaneView;
