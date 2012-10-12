define([
  'jquery',
  'underscore',
  'backbone',
  'collections/widgets',
  'views/widget-item',
  'text!templates/widgets-list.html',
  'models/header',
  'jqueryui'
], function($, _, Backbone, WidgetsCollection, WidgetItemView, widgetsListTemplate, User){
  
  var WidgetsListView = Backbone.View.extend({

    className: "main-container",

    events: {
      "mouseover .widget-header": "onOverWidgetHeader",
      "mousedown .widget-header": "onOverWidgetHeader",
      "mouseleave .widget-header": "onOverWidgetHeader",
    },

    initialize:function () {

        this.views = [];

        _.bindAll(this,"onUpdate");

        this.model.on("destroy",this.render,this);

        this.model.fetch();
      
      //this.datas    = {};
      this.template = _.template(widgetsListTemplate);
      this.$el.html(
          //this.template(this.datas)
          this.template()
      );
    },

    render: function () {

      console.log(this.views.length);
      this.views = _.filter(this.views,this.filterViews,this);
      console.log(this.views.length);

      _.each(this.model.models, function(widget){
          
          console.log(widget.id);

          if(!this.filterModels( widget ) ){
            var view = new WidgetItemView({
              model: widget,
              id: "widget_item_"+widget.id,
            });

            this.views.push(view);
            
            if(widget.get('col') == 0){
              this.$("#main_col").prepend(view.el);
            }else{
              this.$("#side_col").prepend(view.el);
            }

          }
      }, this);

      _.each(this.views, function(view){
          view.render();
      },this);


      if( User.getAuth() ){
      console.log("user get auth",User.getAuth());

        $(".drop_col").sortable({
            disabled: false,
            update: this.onUpdate,
            connectWith: ".drop_col",
            cursor: "move",
            revert: 300,
            opacity: 0.5,
            placeholder: "drop-zone",
            scrollSensitivity: 100,
            scrollSpeed: 100,
            tolerance: "pointer",
            handle: $(".widget-header"),
          });

        $(".auth-btn").show();

        this.onUpdate();
      } else {
      console.log("user get auth",User.getAuth());
        
        $(".drop_col").sortable({
            disabled: true
          });
        $(".auth-btn").hide();
      }

    },

    onUpdate: function( event, ui ){

      console.log("on update",this.views.length);

      if( ui != null && ui.sender != null )
          return;

      var i = 1;
      var widget_id = 0;

      _.each(this.$("#main_col").children(),function(child){
          widget_id = ( this.$(child).attr("id") ).replace("widget_item_","");
          this.model.get(widget_id).set(
            {col: 0, position: i},
            {silent: true}
            );
          i++;
      },this);
      
      i = 1;
      
      _.each(this.$("#side_col").children(),function(child){
          widget_id = ( this.$(child).attr("id") ).replace("widget_item_","");
          this.model.get(widget_id).set(
            {col: 1, position: i},
            {silent: true}
          );
          i++;
      },this);

      if( event != null )
        this.model.save();

    },

    onOverWidgetHeader: function( event ){
      if( event.type == "mouseover" && User.getAuth() )
        $("body").css("cursor","move");
      else
        $("body").css("cursor","auto");
    },

    filterViews: function(view){
      if(!_.any(this.model.models,function(model){
        return view.model === model;
      })){
        view.remove();
        return false;
      }
      return true;
    },

    filterModels: function(model){
      return _.any(this.views,function(view){
        return view.model === model;
      });
    },

  });

  return WidgetsListView;
});