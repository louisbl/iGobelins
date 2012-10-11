define([
  'backbone',
  'services/one-widget'
], function( Backbone, WidgetSync){
  var WidgetModel = Backbone.Model.extend({

    idAttribute: "id_widget",

    initialize : function(){
        if(!this.isNew())
          this.fetch();
    },

    refresh: function(){
      options = {};
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = Backbone.wrapError(options.error, model, options);
      return this.sync.call(this, 'refresh', this, options);
    },

    sync: WidgetSync,
    
  });
  return WidgetModel;
});