define([
  'backbone',
  'views/app-view',
], function( Backbone, AppView){
  
  var AppRouter = Backbone.Router.extend({
    
    routes: {
      ''         : 'home',
      '*actions' : 'defaultAction'
    },
    
    home: function(actions){
      console.log("home ::: ",actions);
      AppView.render();
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