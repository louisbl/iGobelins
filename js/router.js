define([
  'backbone',
  'views/widgets-list',
], function( Backbone, WidgetsListView){
  var AppRouter = Backbone.Router.extend({
    
    routes: {
      '': 'home',

      '*actions': 'defaultAction'
    },
    
    home: function(actions){
      console.log("home ::: ",actions);
      WidgetsListView.render();
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