import $ from 'jquery';

import tmpl from '../../utils/templates';
import Elements from './../../utils/elements';
import util from './../../utils/util';

import View from './../ParentView';

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
      const allLanes = LaneModel.lanes;

      Array.observe(lane.tasks, (c) => {
        allLanes.map(l => {
          new BadgeView($(`#lane_${l.identifier} .badge-container`), l.tasks.length);
        });
      });
    });
  }
}

export default WallView;
