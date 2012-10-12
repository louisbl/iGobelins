define([
  'collections/widgets',
  'mobile-views/header-view',
  'mobile-views/app-view',
  'mobile-views/widgets-list',
], function( WidgetsCollection, HeaderView, AppView, WidgetsListView ){
  
  var widgetsColl = {};

  var appView     = {};
  var headerView  = {};
  var widgetsList = {};

  var initialize = function(){
    console.log(" device ::: touch ::: ");

    widgetsColl = new WidgetsCollection();

    headerView = new HeaderView();

    widgetsList = new WidgetsListView({
      model : widgetsColl,
    });
   
    appView = new AppView({
      headerView : headerView,
      widgetsList: widgetsList,
    });

    widgetsColl.on("change:data", renderAll);
    widgetsColl.on("sync", renderAll);
    widgetsColl.on("reset", renderAll);

    widgetsColl.on("all", logEvents);

  }

  var renderAll = function(){
    appView.render();
  }

  var logEvents = function(event){
    console.log("on event ::: ",event);
  }

  return {
    initialize : initialize
  };

});