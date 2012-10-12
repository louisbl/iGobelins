define([
	   'jquery',
       'backbone',
       'services/sync-header',
       'vendor/jquery-cookie',
],function($,Backbone, HeaderSync){
	
	var HeaderModel = Backbone.Model.extend({
		
		idAttribute: "token",

		initialize: function(){
			_.bindAll(this);
		},

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

    	forgot: function(data){
    		options = {};
    		options.data = data;
    		var model = this;
    		var success = options.success;
    		options.success = function(resp, status, xhr) {
    		  	model.trigger("forgot:resp",resp.msg);
    		};
    		options.error = Backbone.wrapError(options.error, model, options);
    		return this.sync.call(this, 'forgot', this, options);
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

		doLogin: function(data){
			this.save(data,{
    			wait    : true,
    			success : this.onUserFetchSuccess,
    		});
		},


		doLogout: function(){
			this.destroy({
    			success : this.onUserFetchSuccess,
    		});
		},


		doForgot: function(data){
			console.log("forgot ::: ",data);
			this.forgot(data)
		},

		onUserFetchSuccess: function( model, response ){
			if( response.authenticated ){
	    		this.setCookie();
	    	}else{
	    		this.set({
	    	      authenticated : response.authenticated,
	    	      token         : response.token
	    	    });
	    	  	this.delCookie();
	    	}
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
		// console.log("reset cookie ::: ",auth);
		if( auth ){
			userSession.setCookie();
		}
	}

	function testCookie(){
		userSession.fetch({
			success: userSession.onUserFetchSuccess,
		});
	}

	return {
		getSession  : getSession,
		getAuth     : getAuth,
		getToken    : getToken,
		testCookie  : testCookie,
		resetCookie : resetCookie,
	}
});