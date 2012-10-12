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
              // console.log(method);
              options.data           = _.pick(model.toJSON(), 'email', 'pass');
              options.data.apiCall   = "login";
              break;
          case 'forgot':
              // console.log(method);
              options.data.apiCall   = "lostPassword";
              break;
          case 'update':
              // console.log(method);
              options.data           = model.get("user");
              options.data.token     = model.get("token");
              options.data.apiCall   = "updateUserData";
              break;
          case 'delete':
              // console.log(method);
              options.data           = _.pick(model.toJSON(), 'token' );
              options.data.apiCall   = "logout";
              break;
          case 'read':
              // console.log(method);
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
      options.success(_.extend(model,{success : true}));
    }else{
      return WebServSync(options);
    }
  }
});