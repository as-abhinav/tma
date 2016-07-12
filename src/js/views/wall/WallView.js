import tmpl from '../../utils/templates';
import View from './../ParentView';
import LanesView from '../lane/LanesView';
import AddFormView from './../form/AddFormView';

class WallView extends View {
  constructor (wallContainer) {
    super(wallContainer, tmpl.wallTemplate, '.wall');

    this.render();
    this.renderChild();
  }

  renderChild() {
    debugger;
    new LanesView(this.$el.find('.lanes-container'));
    new AddFormView(this.$el.find('.form-container'));
  }
}

export default WallView;
