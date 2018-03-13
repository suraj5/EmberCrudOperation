import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('singer', { path:'/singer'});
  this.route('singer-detail', {path:'/singer-detail/:singer'});
});

export default Router;
