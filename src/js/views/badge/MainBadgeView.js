import $ from 'jquery';
import tmpl from './../../utils/templates';
import View from './../ParentView';
import Elements from './../../utils/elements';
import LaneModel from './../../model/LanesModel';

class BadgeView extends View {
  constructor (container) {
    container = $(Elements.mainBadgeSelector);
    super(container, tmpl.badgeTemplate, '.badge');

    const mainCount = LaneModel.getAllTaskCount();
    this.data = {
      count: mainCount,
      label: this.getBadgeLabel(mainCount)
    };

    this.render();
  }

  getBadgeLabel(count) {
    return count>1?'Projects':'Project'
  }

}

export default BadgeView;