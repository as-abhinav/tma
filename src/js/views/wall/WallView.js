import $ from 'jquery';

import tmpl from '../../utils/templates';
import Elements from './../../utils/elements';

import View from './../ParentView';

import LanesView from '../lane/LanesView';
import AddFormView from './../form/AddFormView';
import BadgeView from './../badge/BadgeView';
import MainBadgeView from './../badge/MainBadgeView';

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
    const allLanes = LaneModel.lanes;
    LaneModel.bindEventOnAll(c => {
      allLanes.map(l => {
        new BadgeView($(`#lane_${l.identifier} .badge-container`), l.tasks.length);
        new MainBadgeView($(Elements.mainBadgeSelector));
      });
    });
  }
}

export default WallView;
