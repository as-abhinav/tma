class View {
  constructor(container, template, selector) {
    this.container = container;
    this.viewTemplate = template;
    this.selector = selector;
  }

  render() {
    this.$el = $(this.viewTemplate(this.data));
    this.container.append(this.$el);
  }
}

export default View;