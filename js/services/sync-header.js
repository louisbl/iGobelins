define([
  'jquery',
  'backbone',
  'services/web-server',
  'vendor/jquery-cookie',
  'consts'
], function( $, Backbone, WebServSync){
    return function (method, model, options) {
      var no_send = false;
        switch(method){
          case 'create':
              console.log(method);
              options.data           = model.toJSON();
              options.data.apiCall   = "login";
              break;
          case 'update':
              console.log(method);
              no_send = true;
              break;
          case 'delete':
              console.log(method);
              options.data           = model.toJSON();
              options.data.apiCall   = "logout";
              break;
          case 'read':
              console.log(method);
              $.cookie.json = true;
              var cookie = $.cookie('iGobelins_user');
              if( cookie != null ){
                console.log( cookie );
                options.data = {};
                options.data.token = cookie;
                model.set({"token": cookie}, {"silent": true} );
                options.data.apiCall   = "getUserData";
              }else{
                no_send = true;
                model.set({"authenticated" : false}, {"silent": true});
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