define([
		'jquery',
       'backbone',
       'services/sync-header',
       'vendor/jquery-cookie',
],function($,Backbone, HeaderSync){
	
	var HeaderModel = Backbone.Model.extend({
		
		idAttribute: "token",

	    parse : function(response){
	        if( response.success ){
	            return _.omit(response, 'email', 'pass' );
	        }
	    },

		getCookie: function() {
			var cookie    = $.cookie('iGobelins_user');
              
            if( cookie != null ){
				this.set({
					"token"         : cookie,
					"authenticated" : false
				},{
					"silent"        : true,
				});
			} else {
				this.set({
					"authenticated" : false
				},{
					"silent"        : true,
				});
			}
			return cookie;
		},

		setCookie: function(){
			$.cookie.json = true;
			$.cookie('iGobelins_user',
				this.get("token")
			);
		},

		delCookie: function(){
			$.removeCookie('iGobelins_user');
		},

		sync: HeaderSync,

	});

	$.cookie.json = true;

	var userSession = new HeaderModel();

	function getSession(){ 
		return userSession;
	}

	function getAuth(){
		return userSession.get("authenticated");
	}

	function getToken(){
		return userSession.get("token");
	}

	function testCookie(){
		userSession.fetch({
			success: onUserFetchSuccess,
		});
	}

	function onUserFetchSuccess( model, response ){
		if( response.authenticated ){
	    	model.setCookie();
	    }else{
	    	model.set({
	          authenticated : response.authenticated,
	          token         : response.token
	        });
	      	model.delCookie();
    	}
	}

	function doLogin(data){
		userSession.save(data,{
    		wait    : true,
    		success : onUserFetchSuccess,
    	});
	}

	function doLogout(){
		userSession.destroy({
    		success : onUserFetchSuccess,
    	});
	}

	return {
		getSession : getSession,
		getAuth    : getAuth,
		getToken   : getToken,
		testCookie : testCookie,
		doLogin    : doLogin,
		doLogout   : doLogout,
	}
});