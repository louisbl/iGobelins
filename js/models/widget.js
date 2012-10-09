define([
  'backbone',
  'services/one-widget'
], function( Backbone, WidgetSync){
  var WidgetModel = Backbone.Model.extend({
    idAttribute: "id_widget",
    
    parse : function(response){
        return response;
    },    

    initialize : function(){
        this.fetch();
    },

    sync: WidgetSync,

    events : {
      "widget:remove" : "removeWidget"
    },

    removeWidget: function() {
      console.log("BB rules ;)",this.id);
    }
  });
  return WidgetModel;
});