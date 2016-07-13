import tmpl from './../../utils/templates';
import dragula from 'dragula';
import View from './../ParentView';
import LaneView from './../lane/LaneView';
import LaneModel from '../../model/LanesModel';

class LanesView extends View {
  constructor (laneContainer) {
    super(laneContainer, tmpl.lanesTemplate, '.lanes');

    this.render();
    this.renderChilds();
    this.bindEvents();
  }


  renderChilds() {
    this.data = LaneModel;

    for(let i in this.data.lanes) {
      new LaneView(this.$el, this.data.lanes[i]);
    }
  }

  bindEvents() {
    dragula($('.card-container').toArray())
      .on('drop', function (el) {
        const $el = $(el);
        const $laneEl = $el.closest('.lane');
        const taskId = $el.attr('id').replace('card_', '');
        const laneId = $laneEl.attr('id').replace('lane_','');

        LaneModel.addTaskToLane(laneId, taskId);
      });
  }
}

export default LanesView;
