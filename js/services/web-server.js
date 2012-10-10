define([
  'jquery',
  'underscore',
  'backbone',
  'consts'
], function($,_, Backbone){
	  return function(options) {
		var params = { data : ""};

    	params.url      = apiURL;
    	params.url      += "?apiKey="+apiKey;
      if(!_.isUndefined(options.other_params))
        params.url      += options.other_params;
    	params.timeout  = 10000;
    	params.dataType = "jsonp";

    	return $.ajax(_.extend(params,options));
    }
});