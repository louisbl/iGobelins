define([
  'backbone',
  'services/one-widget'
], function( Backbone, WidgetSync){
  var WidgetModel = Backbone.Model.extend({

    idAttribute: "id_widget",

    events : {
      "widget:remove" : "removeWidget"
    },

    initialize : function(){
        this.fetch();
    },
    
    parse : function(response){
        return response;
    },    

    sync: WidgetSync,

    removeWidget: function() {
      console.log("BB rules ;)",this.id);
    }
    
  });
  return WidgetModel;
});