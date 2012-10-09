define([
  'backbone',
  'models/widget',
  'services/all-widgets'
], function( Backbone, WidgetModel, AllWidgetsSync){
  var WidgetCollection = Backbone.Collection.extend({
    parse : function(response){
        if( response.success ){
            return response.widgets;
        }
    },

    initialize : function() {
      this.on("destroy", this.onModelDestroy);
    },

    onModelDestroy: function(event) {
      console.log(event);
    },

    model:WidgetModel,
    
    sync: AllWidgetsSync
  });
  return WidgetCollection;
});