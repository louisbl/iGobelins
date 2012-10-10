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

    save: function(){
      this.widg = "";
      this.each(function( widget ){
        this.widg += "&widget["+widget.id+"]"+"="+widget.get("position")+"_"+widget.get("col");
      },this );

      options = {};

      return this.sync.call(this,"update",this,options);
    },

    model:WidgetModel,
    
    sync: AllWidgetsSync,

  });
  return WidgetCollection;
});