define([
  'Underscore',
  'Backbone',
  'models/widgetModel',
  'services/AllWidgets'
], function(_, Backbone, widgetModel, AllWidgetsSync){
  var WidgetCollection = Backbone.Collection.extend({
    parse : function(response){
        console.log(response);
        if( response.success ){
            return response.widgets;
        }
    },
    
    model:WidgetModel,
    
    sync: AllWidgetsSync
  });
  return WidgetCollection;
});