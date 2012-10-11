define([
  'backbone',
  'models/widget',
  'services/all-widgets'
], function( Backbone, WidgetModel, AllWidgetsSync){
  
  var WidgetCollection = Backbone.Collection.extend({
    
    comparator: function(widget){
      return widget.get("position");
    },
    
    parse : function(response){
        if( response.success ){
            return response.widgets;
        }
    },

    save: function(){
      this.widget = {};
      this.each(function( widget ){
        this.widget[widget['id']] = widget.get("position")+"_"+widget.get("col");
      },this );

      options = {};

      console.log(this.widget);

      return this.sync.call(this,"update",this,options);
    },

    model:WidgetModel,
    
    sync: AllWidgetsSync,

  });
  return WidgetCollection;
});