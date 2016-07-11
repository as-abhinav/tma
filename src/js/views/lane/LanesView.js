import tmpl from './../../utils/templates';

import LaneView from './../lane/LaneView';
import LaneModel from './../../model/lanes';

class LanesView {
  constructor (laneContainer) {
    this.parentContainer = laneContainer;
    this.template = tmpl.lanesTemplate;
    this.selector = '.lanes';
    this.data = new LaneModel();

    this.render();

    this.renderChilds();
  }

  render() {
    this.$el = this.parentContainer.append($(this.template())).find(this.selector);
  }

  renderChilds() {
    for(let i in this.data.lanes) {
      new LaneView(this.$el, this.data.lanes[i]);
    }
  }
}

export default LanesView;
