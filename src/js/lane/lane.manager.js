import Handlebars from 'handlebars';

class LaneManager {
  constructor (laneConatiner, lanes) {
    this.laneTemplate = Handlebars.compile($("#laneTemplate").html());
    this.badgeCountTemplate = Handlebars.compile($("#badgeCountTemplate").html());
  }

  render(container, lanes) {
    for(let i in lanes) {
      let lane = lanes[i];
      const laneHtml = this.laneTemplate(lane);
      container.append(laneHtml);
      container.find(`#${lane.identifier} .badge-container`).append(this.badgeCountTemplate({}));
    }
  }
}

export default new LaneManager();
