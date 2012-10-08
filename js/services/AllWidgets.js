define([
  'Underscore',
  'Backbone',
  'consts',
  'services/WevServer'
], function(_, Backbone){
	var AllWidgetsSync = function (method, model, options) {
    	switch(method){
        	case 'read':
            	options.data = "apiCall=loadUserWidgets";
            	break;
    	}
    	return WebServSync(options);
    }

    return AllWidgetsSync;
});