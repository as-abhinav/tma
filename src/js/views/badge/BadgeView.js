import Handlebars from 'handlebars';

class BadgeManager {
  constructor() {
    this.badgeCountTemplate = Handlebars.compile($("#badgeCountTemplate").html());

    this.render();
    this.bindEvents();
  }

  render() {

  }

  bindEvents() {

  }
}

export default BadgeManager;