import tmpl from '../../utils/templates';

import View from './../ParentView';
import Elements from './../../utils/elements';
import LanesView from '../lane/LanesView';
import AddFormView from './../form/AddFormView';
import BadgeView from './../badge/BadgeView';

import LaneModel from './../../model/LanesModel';

class WallView extends View {
  constructor (wallContainer) {
    super(wallContainer, tmpl.wallTemplate, '.wall');

    this.render();
    this.renderChild();
    this.renderOverAllCount();
    this.bindDataEvents();
  }

  renderChild() {
    new LanesView(this.$el.find('.lanes-container'));
    new AddFormView(this.$el.find('.form-container'));
  }

  renderOverAllCount() {
    new BadgeView($('.main-badge-container'), LaneModel.getAllTaskCount());
  }

  bindDataEvents() {

    LaneModel.lanes.map(lane => {
      const $laneElement = $(`#lane_${lane.identifier} .badge-container`);

      Array.observe(lane.tasks, (changes) => {
        // console.log(changes);
        new BadgeView($laneElement, lane.tasks.length);
        new BadgeView($(Elements.mainBadgeSelector), LaneModel.getAllTaskCount());
      });
    });
  }
}

export default WallView;
