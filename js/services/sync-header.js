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
              console.log(method);
              break;
          case 'read':
              console.log(method);
              break;
    }

    return WebServSync(options);
  }
});