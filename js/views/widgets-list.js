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

    initialize:function () {

        this.model = new WidgetsCollection();
        this.model.on("change", this.render, this);
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
          var view = new WidgetItemView({model: widget});
          view.render();
          if(widget.get('col') == 0){
            $("#main_col").append(view.el);
          }else{
            $("#side_col").append(view.el);
          }
        }
      
      }, this);

      $(".drop_col").sortable({
        connectWith: ".drop_col"
      });

      $(".accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: 'content'
      });


      $(".button").button();

    },

  });

  return WidgetsListView;
});