define([
  'jquery',
  'underscore',
  'backbone',
  'collections/widgets',
  'views/widget-item',
  'text!templates/widgets-list.html',
  'jqueryui'
], function($, _, Backbone, WidgetsCollection, WidgetItemView, widgetsListTemplate){
  
  var WidgetsListView = Backbone.View.extend({

    initialize:function (options) {

        _.bindAll(this,"onReceive");

        this.model  = options.model;
        this.hModel = options.hModel;
        this.model.fetch();
    },

    render: function () {
      
      this.datas    = {};
      this.template = _.template(widgetsListTemplate);
      this.$el.html(
          this.template(this.datas)
      );
      
      _.each(this.model.models, function(widget){
      
        if(!_.isUndefined(widget.get('col'))) {
          
          var view = new WidgetItemView({
            model: widget,
            id: "widget_item_"+widget.id,
          });

          view.render();
          
          if(widget.get('col') == 0){
            $("#main_col").append(view.el);
          }else{
            $("#side_col").append(view.el);
          }
        }
      
      }, this);

      if( this.hModel.get("authenticated") ){

        $(".drop_col").sortable({
            receive: this.onReceive,
            connectWith: ".drop_col"
          });
        $(".auth-btn").show();


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
    },

    onReceive: function( event, ui ){
      var i = 0;
      var widget_id = 0;

      _.each($("#main_col").children(),function(child){
          widget_id = ( $(child).attr("id") ).replace("widget_item_","");
          this.model.get(widget_id).set(
            {col: 0, position: i},
            {silent: true}
            );
          i++;
      },this);
      
      i = 0;
      
      _.each($("#main_col").children(),function(child){
          widget_id = ( $(child).attr("id") ).replace("widget_item_","");
          this.model.get(widget_id).set(
            {col: 1, position: i},
            {silent: true}
          );
          i++;
      },this);

      this.model.save();

    },

  });

  return WidgetsListView;
});