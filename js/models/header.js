define([
       'backbone',
       'services/sync-header',
],function(Backbone, HeaderSync){
	
	var HeaderModel = Backbone.Model.extend({
		sync: HeaderSync,
	});

	return HeaderModel;

});