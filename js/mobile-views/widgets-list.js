define([
  'jquery',
  'underscore',
  'backbone',
  'mobile-views/widget-item'
], function($, _, Backbone, WidgetItemView){
  
  var WidgetsListView = Backbone.View.extend({

    initialize:function () {
        this.model.on("reset", this.render, this);
    },

    render: function () {

      // console.log(" widgets list render ::: ",this.$el);

       this.$el.empty();

      _.each(this.model.models, function(widget){
          
          // console.log(widget.id);

           this.$el.prepend(new WidgetItemView({model:widget}).render().el);

      }, this);

      $("#widgetsListView").listview("refresh");
      
      return this;
    },

  });

  return WidgetsListView;
});