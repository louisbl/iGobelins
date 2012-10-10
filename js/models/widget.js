define([
  'backbone',
  'services/one-widget'
], function( Backbone, WidgetSync){
  var WidgetModel = Backbone.Model.extend({

    idAttribute: "id_widget",

    initialize : function(){
        this.fetch();
    },   

    sync: WidgetSync,
    
  });
  return WidgetModel;
});