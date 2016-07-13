import tmpl from '../../utils/templates';

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
  }

  renderChild() {
    new LanesView(this.$el.find('.lanes-container'));
    new AddFormView(this.$el.find('.form-container'));
  }

  renderOverAllCount() {
    const $badgeContainer = $('.main-badge-container');
    new BadgeView($badgeContainer, LaneModel.getAllTaskCount());
  }
}

export default WallView;
