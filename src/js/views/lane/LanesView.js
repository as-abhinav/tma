import tmpl from './../../utils/templates';
import $ from 'jquery';
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
    const $lanes = $('.lanes .lane .card-container'), laneIds = [];

    $lanes.each(lane => {
      laneIds.push($lanes.eq(lane).attr('id'))
    });

    for(let i=0, len = $lanes.length; i<len;i++) {
      let id = laneIds[i];

      Sortable.create($lanes.get(i), {
        group: {
          name: id,
          put: laneIds
        },
        animation: 100,
        onEnd: function (evt) {
          const newLaneId = $(evt.item).closest('.lane').data('id');
          const taskId = $(evt.item).data('id');

          LaneModel.addTaskToLane(newLaneId, taskId);
        }
      });
    }
  }
}

export default LanesView;
