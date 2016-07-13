import tmpl from './../../utils/templates';
import View from './../ParentView';

class BadgeView extends View {
  constructor (container, count) {

    super(container, tmpl.badgeTemplate, '.badge');

    this.data = {count};

    this.render();
  }
}

export default BadgeView;