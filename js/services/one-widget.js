define([
  'backbone',
  'services/web-server',
  'models/header',
  'consts'
], function( Backbone, WebServSync, User){
    return function (method, model, options) {
        switch(method){
          case 'refresh':
              options.data           = {};
              options.data.token     = User.getToken();
              options.data.id_widget = model.get("id_widget");
              options.data.apiCall   = "refreshWidget";
              break;
          case 'create':
              options.data         = model.toJSON();
              options.data.token   = User.getToken();
              options.data.apiCall = "addWidget";
              break;
          case 'update':
              console.log(method);
              break;
          case 'delete':
              options.data           = {};
              options.data.token     = User.getToken();
              options.data.id_widget = model.get("id_widget");
              options.data.apiCall   = "deleteWidget";
              break;
          case 'read':
              options.data           = {};
              options.data.token     = User.getToken();
              options.data.id_widget = model.get("id_widget");
              options.data.all       = true;
              options.data.apiCall   = "getWidget";
              break;
    }

    return WebServSync(options);
  }
});