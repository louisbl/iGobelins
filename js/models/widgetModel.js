define([
  'Underscore',
  'Backbone',
  'services/Widget'
], function(_, Backbone, WidgetSync){
  var WidgetModel = Backbone.Model.extend({
    idAttribute: "id_widget",
    
    parse : function(response){
        console.log(response);
        return response;
    },    

    initialize : function(){
        this.fetch();
    },

    sync: WidgetSync
  });
  return projectModel;
});