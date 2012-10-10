define([
  'services/web-server',
  'consts'
], function(WebServSync){
	 return function (method, model, options) {
    	switch(method){
          case 'update':
              options.data = "apiCall=changeWidgetPosition";
              break;
        	case 'read':
            	options.data = "apiCall=loadUserWidgets";
            	break;
    	}
    	return WebServSync(options);
    }
});