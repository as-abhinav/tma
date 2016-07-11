import tmpl from '../../utils/templates';
import LaneView from '../lane/LaneView';

class WallView   {
  constructor (wallContainer) {
    this.parentContainer = wallContainer;
    this.selector = '.wall';
    this.template = tmpl.wallTemplate;

    this.render();

    this.initChilds();
  }

  render() {
    this.$el = this.parentContainer.append($(this.template())).find(this.selector);
  }

  initChilds() {
    const lanes = new LaneView(this.$el);
  }
}

export default WallView;
