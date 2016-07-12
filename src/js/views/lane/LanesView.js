import tmpl from './../../utils/templates';

import View from './../ParentView';
import LaneView from './../lane/LaneView';
import LaneModel from '../../model/LanesModel';

class LanesView extends View {
  constructor (laneContainer) {
    super(laneContainer, tmpl.lanesTemplate, '.lanes');

    this.render();
    this.renderChilds();
  }


  renderChilds() {
    this.data = LaneModel;

    for(let i in this.data.lanes) {
      new LaneView(this.$el, this.data.lanes[i]);
    }
  }
}

export default LanesView;
