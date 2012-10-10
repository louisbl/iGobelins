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

    model:WidgetModel,
    
    sync: AllWidgetsSync,

  });
  return WidgetCollection;
});