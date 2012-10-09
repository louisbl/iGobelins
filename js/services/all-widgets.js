define([
  'services/web-server',
  'consts'
], function(WebServSync){
	 return function (method, model, options) {
    	switch(method){
        	case 'read':
            	options.data = "apiCall=loadUserWidgets";
            	break;
    	}
    	return WebServSync(options);
    }
});