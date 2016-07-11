import Handlebars from 'handlebars';

class ProjectCardManager {
  constructor (projectCardData) {
    this.projectTemplate = Handlebars.compile($("#projectCardTemplate").html());
    this.badgeCountTemplate = Handlebars.compile($("#badgeCountTemplate").html());
  }

  render(container, projectCardData) {
      const projectCardHtml = this.projectTemplate(projectCardData);
      container.append(projectCardHtml);
      container.find(`#card_${projectCardData.id}`).parent().find('.badge-container').html(this.badgeCountTemplate(countData));
  }
}

export default new ProjectCardManager();
