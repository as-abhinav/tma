import tmpl from './../../utils/templates';
import View from './../ParentView';

class BadgeView extends View {
  constructor (container, count) {
    super(container, tmpl.badgeTemplate, '.badge');

    this.data = {count, label: this.getBadgeLabel(count)};

    this.render();
  }

  getBadgeLabel(count) {
    return count>1?'Projects':'Project'
  }
}

export default BadgeView;