define([
  'collections/widgets',
  'mobile-views/home-view'
], function( WidgetsCollection, HomeView ){
  
  var app = {};
  var widgetsColl = {};

  var initialize = function(){
    console.log(" device ::: touch ::: ");
    widgetsColl = new WidgetsCollection();

    app = new AppRouter();

    Backbone.history.start();

  }

  var AppRouter = Backbone.Router.extend({

    routes: {
      "" : "home"
    },

    initialize: function(){
        $('.back').on('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
      },

      home: function(){
        console.log("home ::: ");
        changePage( new HomeView({model: widgetsColl}) );
      },
  });

  var changePage = function (page) {
    
    console.log("change page ::: ",page);

     $(page.el).attr('data-role', 'page');
     page.render();
     $('body').append($(page.el));
     var transition = $.mobile.defaultPageTransition;
     if (this.firstPage) {
         transition = 'none';
         this.firstPage = false;
     }
     $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
  }

  var logEvents = function(event){
    console.log("on event ::: ",event);
  }

  return {
    initialize : initialize
  };

});