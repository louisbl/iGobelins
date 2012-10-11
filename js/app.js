define([
  'views/app-view',
  'views/header-view',
  'views/widgets-list',
  'models/header',
  'collections/widgets'
], function( AppView, HeaderView, WidgetsListView, User, WidgetsCollection ){
  
  var widgetsColl = {};

  var appView     = {};
  var headerView  = {};
  var widgetsList = {};

  var initialize = function(){

   widgetsColl = new WidgetsCollection();

   headerView  = new HeaderView({
    model: User.getSession()
  });

   widgetsList = new WidgetsListView({
    model  : widgetsColl,
   });

   appView = new AppView({
    headerView  : headerView,
    widgetsList : widgetsList,
   });
    
    User.getSession().on("change:authenticated", renderAll);
    widgetsColl.on("change:data", renderAll);
    widgetsColl.on("add", renderAll);
    widgetsColl.on("remove", renderAll);

    widgetsColl.on("all", logEvents);

    headerView.on("header:login",User.doLogin);
    headerView.on("header:logout",User.doLogout);
    headerView.on("header:add",addWidget);

    User.testCookie();
  }

  var logEvents = function(event){
    console.log("on event ::: ",event);
  }

  var renderAll = function(dispatcher,options){
    console.log("on render ::: ",dispatcher,options );
    appView.render();
  }

  var addWidget = function(data){
    console.log("app ::: add widget ::: ",data);
    widgetsColl.create(data,{wait: true});
  }

  return {
    initialize : initialize
  };

});