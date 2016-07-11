import Handlebars from 'handlebars';
import LaneManager from "../lane/lane.manager";

class WallManager {
  constructor (container, options) {
    const wallTemplate = Handlebars.compile($("#wallTemplate").html());
    const wallHtml = wallTemplate();

    container.html(wallHtml);

    LaneManager.render(container.find('.wall'), options.lanes);
  }
}

export default WallManager;
