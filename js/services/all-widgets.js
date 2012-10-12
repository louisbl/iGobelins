define([
  'services/web-server',
  'models/header',
  'consts'
], function(WebServSync, User){
	 return function (method, model, options) {
    	switch(method){
          case 'update':
              // console.log(method, model, options);
              options.data         = {};
              options.data.widget  = model.widget;
              options.data.token   = User.getToken();
              options.data.apiCall = "changeWidgetPosition";
              break;
          case 'read':
              options.data         = {};
              options.data.token   = User.getToken();
            	options.data.apiCall = "loadUserWidgets";
            	break;
    	}
    	return WebServSync(options);
    }
});