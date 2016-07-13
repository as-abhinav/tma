import tmpl from '../../utils/templates';
import View from './../ParentView';
import TasksView from './../tasks/TasksView';
import BadgeView from './../badge/BadgeView';
import LaneModel from './../../model/LanesModel';

class LaneView extends View {
  constructor (laneContainer, lane) {
    super(laneContainer, tmpl.laneTemplate, '.lane');
    this.data = lane;

    this.render();
    this.renderChilds();
  }

  render() {
    this.$el = $(this.viewTemplate(this.data));
    this.container.append(this.$el);
  }

  renderChilds() {
    new TasksView(this.$el.find('.card-container'), this.data.tasks);
  }
}

export default LaneView;
