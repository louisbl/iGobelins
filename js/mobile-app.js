define([
  'collections/widgets',
  'mobile-views/home-view',
  'mobile-views/widget-view',
], function( WidgetsCollection, HomeView, WidgetView ){
  
  var app = {};

  var initialize = function(){
    // console.log(" device ::: touch ::: ");

    app = new AppRouter();

    Backbone.history.start();

  }

  var AppRouter = Backbone.Router.extend({

    routes: {
      "" : "home",
      "widget/:id" : "widgetItems"
    },

    initialize: function(){
        $('.back').on('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
        this.widgetsColl = new WidgetsCollection();
      },

      home: function(){
        // console.log("home ::: ");
        $.mobile.loading('show');
        changePage( new HomeView({model: this.widgetsColl}) );
        $.mobile.loading('hide');
      },

      widgetItems: function(id){
        // console.log(this.widgetsColl);
        $.mobile.loading('show');
        var widget = this.widgetsColl.get(id);
        widget.fetch({
          success:function(data){
            changePage(new WidgetView({model:data}));
            $.mobile.loading('hide');
          }
        });
      }
  });

  var changePage = function (page) {
    
    // console.log("change page ::: ",page);

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
    // console.log("on event ::: ",event);
  }

  return {
    initialize : initialize
  };

});