define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/widgets',
], function($, _, Backbone, Session, widgetsView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      '/widgets': 'showWidgets',

      '*actions': 'defaultAction'
    },
    showWidgets: function(){
      widgetsView.render();
    },
    defaultAction: function(actions){
      console.log('No route:', actions);
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});