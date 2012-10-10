define([
  'services/web-server',
  'models/header',
  'consts'
], function(WebServSync, User){
	 return function (method, model, options) {
    	switch(method){
          case 'update':
              console.log(method, model, options);
              options.data         = {};
              options.data.token   = User.getToken();
              options.other_params = model.widg;
              options.data.apiCall = "changeWidgetPosition";
              break;
        	case 'read':
              options.data         = {};
            	options.data.apiCall = "loadUserWidgets";
            	break;
    	}
    	return WebServSync(options);
    }
});