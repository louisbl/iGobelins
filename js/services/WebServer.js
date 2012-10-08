define([
  'jQuery',
  'Underscore',
  'Backbone',
  'consts'
], function(_, Backbone){
	var WebServSync = function(options) {
		var params = { data : ""};

    	params.url      = apiURL;
    	params.url      += "?apiKey="+apiKey;
    	params.timeout  = 10000;
    	params.dataType = "jsonp";

    	return $.ajax(_.extend(params,options));
    }

    return WebServSync;
});