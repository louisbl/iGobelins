define([
  'backbone',
  'models/widget',
  'services/all-widgets'
], function( Backbone, WidgetModel, AllWidgetsSync){
  var WidgetCollection = Backbone.Collection.extend({
    
    initialize: function(options){
      this.hModel = options.hModel;
    },

    parse : function(response){
        if( response.success ){
            return response.widgets;
        }
    },

    save: function(){
      this.widg = "";
      this.each(function( widget ){
        this.widg += "&widget["+widget.id+"]"+"="+widget.get("col")+"_"+widget.get("position");
      },this );

      console.log(this.widg);

      options = {};

      return this.sync.call(this,"update",this,options);
    },

    getToken: function(){
      return this.hModel.get("token");
    },

    model:WidgetModel,
    
    sync: AllWidgetsSync,

  });
  return WidgetCollection;
});