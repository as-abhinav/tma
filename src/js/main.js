import $ from 'jquery';
import WallView from './views/wall/WallView';

const App = (() => {
  let $app = $("#app");

  let init = () => {
    new WallView($app);
  };

  return {init};
})();


$(App.init);
