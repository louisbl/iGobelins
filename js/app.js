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
    
    User.getSession().on("change", renderAll);
    widgetsColl.on("sync", renderAll);

    headerView.on("header:login",User.doLogin);
    headerView.on("header:logout",User.doLogout);
    headerView.on("header:add",addWidget);

    User.testCookie();
  }

  var addWidget = function(data){
    console.log("app ::: add widget ::: ",data);
    widgetsColl.create(data,{wait: true});
  }

  var renderAll = function(model,options){
    console.log("app ::: render",model,options);
    appView.render();
  }

  return {
    initialize : initialize
  };

});