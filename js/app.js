define([
  'views/app-view',
  'views/header-view',
  'views/widgets-list',
  'models/header',
  'collections/widgets'
], function( AppView, HeaderView, WidgetsListView, HeaderModel, WidgetsCollection ){
  
  var headerModel = {};
  var widgetsColl = {};

  var appView     = {};
  var headerView  = {};
  var widgetsList = {};

  var initialize = function(){

   headerModel = new HeaderModel();
   widgetsColl = new WidgetsCollection();

   headerView  = new HeaderView({
    model: headerModel,
   });

   widgetsList = new WidgetsListView({
    model: widgetsColl,
    hModel: headerModel
   });

   appView = new AppView({
    headerView : headerView,
    widgetsList : widgetsList,
   });
    
    headerModel.on("change", renderAll);
    widgetsColl.on("change", renderAll);

    headerView.on("header:save",onHeaderSave);
    headerView.on("header:destroy",onHeaderDestroy);

    headerModel.fetch({
      success: onHeaderFetchSuccess,
      error: onHeaderFetchError,
    });
  }

  var onHeaderFetchSuccess = function(model, response) {
    if( response.authenticated ){
      model.isLoggedIn();
    }else{
      headerModel.set({
          authenticated : response.authenticated,
          token : response.token
        });
      model.isLoggedOut();
    }
  }

  var onHeaderFetchError = function(model, response) {
    console.log( "app ::: on header fecth error",model,response);
    appView.error(response);
  }

  var renderAll = function(model,options){
    console.log("app ::: render",model,options);
    appView.render();
  }

  var onHeaderSave = function(data){
    console.log(" app ::: on header save",data);
    headerModel.save(data,{
      wait: true,
      success: onHeaderFetchSuccess,
      error: onHeaderFetchError, 
    })
  }
  
  var onHeaderDestroy = function(){
    console.log(" app ::: on header destroy");
    headerModel.destroy({
      success: onHeaderFetchSuccess,
      error: onHeaderFetchError, 
    })
  }

  return {
    initialize: initialize
  };

});