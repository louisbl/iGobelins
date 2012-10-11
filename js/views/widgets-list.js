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
      
      _.each(this.model.models, function(widget){
      
          if(this.$el.has("#widget_item_"+widget.id).length == 0){

            var view = new WidgetItemView({
              model: widget,
              id: "widget_item_"+widget.id,
            });

            this.views.push(view);
            
            if(widget.get('col') == 0){
              $("#main_col").append(view.el);
            }else{
              $("#side_col").append(view.el);
            }
          }
      
      }, this);

      _.each(this.views, function(view){
        view.render();
      },this);

      if( User.getAuth() ){

        $(".drop_col").sortable({
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
        
        $(".drop_col").sortable({
            disabled: true
          });
        $(".auth-btn").hide();
      }

      $(".accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: 'content'
      });

      $(".tabs").tabs({
        collapsible: true,
      });

    },

    onUpdate: function( event, ui ){

      console.log("on update");

      if( ui != null && ui.sender != null )
          return;

      var i = 1;
      var widget_id = 0;

      _.each($("#main_col").children(),function(child){
          widget_id = ( $(child).attr("id") ).replace("widget_item_","");
          this.model.get(widget_id).set(
            {col: 0, position: i},
            {silent: true}
            );
          i++;
      },this);
      
      i = 1;
      
      _.each($("#side_col").children(),function(child){
          widget_id = ( $(child).attr("id") ).replace("widget_item_","");
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
    }

  });

  return WidgetsListView;
});