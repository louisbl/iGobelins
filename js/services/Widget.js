define([
  'Underscore',
  'Backbone',
  'consts',
  'services/WevServer'
], function(_, Backbone, method, model, options){
      var WidgetSync = function (method, model, options) {
        switch(method){
          case 'create':
              break;
          case 'update':
              break;
          case 'delete':
              break;
          case 'read':
              options.data         = model.toJSON();
              options.data.all     = true;
              options.data.apiCall = "getWidget";
              break;
    }
    return WebServSync(options);
  }

  return WidgetSync;
});