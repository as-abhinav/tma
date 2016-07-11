import tmpl from '../../utils/templates';
import LanesView from '../lane/LanesView';

class WallView   {
  constructor (wallContainer) {
    this.parentContainer = wallContainer;
    this.selector = '.wall';
    this.template = tmpl.wallTemplate;

    this.render();

    this.renderChilds();
  }

  render() {
    this.$el = this.parentContainer.append($(this.template())).find(this.selector);
  }

  renderChilds() {
    new LanesView(this.$el);
  }
}

export default WallView;
