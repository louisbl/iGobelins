define([
  'jquery',
  'underscore',
  'backbone',
  'collections/widgets',
  'views/widget-item',
  'jqueryui'
], function($, _, Backbone, WidgetsCollection, WidgetItemView){
  
  var WidgetsListView = Backbone.View.extend({

    initialize:function () {

        this.model = new WidgetsCollection();
        this.model.on("change", this.render, this);
        this.model.fetch();
      
        $(".drop_col").sortable({
          connectWith: ".drop_col"
        });
    },


    render: function () {
      
      $(".drop_col").empty();
      
      _.each(this.model.models, function(widget){
      
        if(!_.isUndefined(widget.get('col'))) {
          $("#colonne_"+widget.get('col')).append( 
            new WidgetItemView({model: widget}).render().el 
          )
        }
      }, this);

      $(".accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: 'content'
      });

    },

  });

  return new WidgetsListView;
});