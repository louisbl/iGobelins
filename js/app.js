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
    User.getSession().on("forgot:resp", onForgotResp);
    User.getSession().on("error", onError);

    widgetsColl.on("change:data", renderAll);
    widgetsColl.on("sync", renderAll);
    widgetsColl.on("reset", fetchWidget);

    //widgetsColl.on("all", logEvents);
    widgetsColl.on("error", onError);

    headerView.on("header:login",User.doLogin);
    headerView.on("header:logout",User.doLogout);
    headerView.on("header:forgot",User.doForgot);
    headerView.on("header:add",addWidget);

    User.testCookie();
  }

  var onForgotResp = function(response){
    console.log(response);
  }

  var fetchWidget = function(event){
    widgetsColl.fetchAllData();
  }

  var onError = function(event){
    // console.log("on error ::: ",event);
    appView.showError(event)
  }

  var logEvents = function(event){
    // console.log("on event ::: ",event);
  }

  var renderAll = function(dispatcher,options){
    // console.log("on render ::: ",dispatcher );
    User.resetCookie(dispatcher.get("authenticated"));
    appView.render();
  }

  var addWidget = function(data){
    // console.log("app ::: add widget ::: ",data);
    widgetsColl.create(data,{wait: true});
  }

  return {
    initialize : initialize
  };

});