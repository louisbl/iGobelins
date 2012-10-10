define([
  'jquery',
  'backbone',
  'services/web-server',
  'consts'
], function( $, Backbone, WebServSync){
    return function (method, model, options) {
      var no_send = false;
        switch(method){
          case 'create':
              console.log(method);
              options.data           = _.pick(model.toJSON(), 'email', 'pass');
              options.data.apiCall   = "login";
              break;
          case 'update':
              console.log(method);
              no_send = true;
              break;
          case 'delete':
              console.log(method);
              options.data           = _.pick(model.toJSON(), 'token' );
              options.data.apiCall   = "logout";
              break;
          case 'read':
              console.log(method);
              var cookie = model.getCookie();
              
              if( cookie != null ){
                options.data         = {};
                options.data.token   = cookie;
                options.data.apiCall = "getUserData";
              }else{
                no_send = true;
              }
              break;
    }

    if( no_send ){
      options.success(model);
    }else{
      return WebServSync(options);
    }
  }
});