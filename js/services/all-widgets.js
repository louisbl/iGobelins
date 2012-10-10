define([
  'services/web-server',
  'consts'
], function(WebServSync){
	 return function (method, model, options) {
    	switch(method){
          case 'update':
              console.log(method, model, options);
              options.data         = {};
              options.other_params = model.widg;
              options.data.token   = model.getToken();
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