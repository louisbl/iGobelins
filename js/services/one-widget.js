define([
  'backbone',
  'services/web-server',
  'consts'
], function( Backbone, WebServSync){
    return function (method, model, options) {
        switch(method){
          case 'create':
              console.log(method);
              break;
          case 'update':
              console.log(method);
              break;
          case 'delete':
              options.data           = {};
              options.data.id_widget = model.get("id_widget");
              options.data.apiCall   = "deleteWidget";
              break;
          case 'read':
              options.data           = {};
              options.data.id_widget = model.get("id_widget");
              options.data.all       = true;
              options.data.apiCall   = "getWidget";
              break;
    }

    return WebServSync(options);
  }
});