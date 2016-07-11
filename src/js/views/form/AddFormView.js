import Handlebars from 'handlebars';
import tmpl from './../../utils/templates';

class AddFormManager {
  constructor(opt) {
    this.options = opt;

    this.render();
    this.bindEvents();
  }

  render() {
    const el = $(tmpl.addFormTemplate);
    this.options.parentContainer.append(el);
  }

  bindEvents() {
    $('#addProjectForm').on('submit', (e) => {
      e.preventDefault();
      var title = $('#taskName').val().trim();
      if(!title) return;
      let task = {
        id: (new Date()).getTime().toString(),
        title
      };

      // ProjectCardManager.render($('#todoLane'),data);

      // let storyCard = new
      $('.collapsible-header').click();
    });
  }
}

export default AddFormManager;