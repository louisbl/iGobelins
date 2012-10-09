define([
  'jquery',
  'backbone',
  'services/web-server',
  'vendor/jquery-cookie',
  'consts'
], function( Backbone, WebServSync){
    return function (method, model, options) {
      var no_send = false;
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
              $.cookie.json = true;
              var user = $.cookie('iGobelins_user');
              if( user != null ){
                //TODO retrieve info from user to test cookie validity
              }else{
                no_send = true;
                model.set("not_auth", true);
                //TODO set not authenticated on model
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