define([
		'jquery',
       'backbone',
       'services/sync-header',
],function($,Backbone, HeaderSync){
	
	var HeaderModel = Backbone.Model.extend({
		
		idAttribute: "token",

		isLoggedIn: function(){
			$.cookie.json = true;
			$.cookie('iGobelins_user',
				this.get("token")
			);
		},

		isLoggedOut: function(){
			$.removeCookie('iGobelins_user');
		},

		sync: HeaderSync,

	});

	return HeaderModel;

});