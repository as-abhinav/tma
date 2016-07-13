import tmpl from './../../utils/templates';
import View from './../ParentView';

class BadgeView extends View {
  constructor (container, count) {
    container = container || $('#todolane .badge-container');
    super(container, tmpl.badgeTemplate, '.badge');

    this.data = {count, label: count>1?'Projects':'Project'};

    this.render();
  }
}

export default BadgeView;