import tmpl from '../../utils/templates';
import Handlebars from 'handlebars';

import LaneModel from './../../model/lanes';

class LaneManager {
  constructor (laneContainer) {
    this.parentContainer = laneContainer;
    this.template = tmpl.laneTemplate;
    this.selector = '.lanes';
    this.data = new LaneModel();

    this.render();
    this.bindEvents();
  }

  render() {
    for(let i in this.data.lanes) {
      let lane = this.data.lanes[i];

      this.parentContainer.append($(this.template(lane)));

      // container.find(`#${lane.identifier} .badge-container`).append(this.badgeCountTemplate({}));
    }
  }

  bindEvents() {

  }
}

export default LaneManager;
