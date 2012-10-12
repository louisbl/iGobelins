define([
	   'jquery',
       'backbone',
       'services/sync-header',
       'vendor/jquery-cookie',
],function($,Backbone, HeaderSync){
	
	var HeaderModel = Backbone.Model.extend({
		
		idAttribute: "token",
/*
		initialize: function(){
			this.set("authenticated",false);
		},*/

	    parse : function(response){
	        if( response.success == true ){
	        	if( response.authenticated == true ){
	        		this.setCookie();
	        	}
	            return _.omit(response, 'email', 'pass' );
	        }else{
	        	this.trigger("error",response.msg);
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
			$.cookie('iGobelins_user',
				this.get("token"),
				{"expires":2,"path":"/"}
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

	function resetCookie( auth ){
		console.log("reset cookie ::: ",auth);
		if( auth ){
			userSession.setCookie();
		}
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
		getSession  : getSession,
		getAuth     : getAuth,
		getToken    : getToken,
		testCookie  : testCookie,
		resetCookie : resetCookie,
		doLogin     : doLogin,
		doLogout    : doLogout,
	}
});