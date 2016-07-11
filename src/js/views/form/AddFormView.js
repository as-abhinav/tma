import tmpl from './../../utils/templates';

class AddFormManager {
  constructor (container) {
    this.parentContainer = container;
    this.template = tmpl.addFormTemplate;
    this.selector = 'form';

    this.render();
    this.bindEvents();
  }

  render() {
    this.$el = this.parentContainer.append($(this.template())).find(this.selector);
  }

  bindEvents() {
    let self = this;
    self.$el.on('submit', (e) => {
      e.preventDefault();
      var title = $('#taskName').val().trim();
      if(!title) return;
      let task = {
        id: (new Date()).getTime().toString(),
        title
      };

      self.$el.get(0).reset();
    });
  }
}

export default AddFormManager;