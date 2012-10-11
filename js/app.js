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
    
    User.getSession().on("change:authenticated", onAuthChange);
    widgetsColl.on("change:data", onDataChange);
    widgetsColl.on("add", onWidgetAdd);
    widgetsColl.on("remove", onWidgetRemove);

    widgetsColl.on("all", onEvents);

    headerView.on("header:login",User.doLogin);
    headerView.on("header:logout",User.doLogout);
    headerView.on("header:add",addWidget);

    User.testCookie();
  }

  var onAuthChange = function(event){
    console.log("on auth change ::: ",event);
    appView.render();
  }

  var onWidgetAdd = function(event){
    console.log("on widget add ::: ",event);
    appView.render();
  }

  var onWidgetRemove = function(event){
    console.log("on widget remove ::: ",event);
    appView.render();
  }
  
  var onDataChange = function(event){
    console.log("on data change ::: ",event);
    appView.render();
  }

  var onEvents = function(event,params) {
    console.log(" on events ::: ",event,params);
  }

  var addWidget = function(data){
    console.log("app ::: add widget ::: ",data);
    widgetsColl.create(data,{wait: true});
  }

  return {
    initialize : initialize
  };

});