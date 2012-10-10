define([       
	'jquery',
       'underscore',
       'backbone',
       'models/header',
       'text!templates/header.html'
],function($,_,Backbone, Header, headerTemplate){
	
	var HeaderView = Backbone.View.extend({

		tagName: "header",

		events: {
			"submit #login-form" : "onLoginClicked",
			"click #compte-btn" : "onCompteClicked",
			"click #logout-btn" : "onLogoutClicked",
		},

		initialize: function(){
		},

		render: function(){
			console.log( "header view ::: render",this.model.toJSON());
			this.template = _.template(headerTemplate);
			this.$el.html(
			    this.template(this.model.toJSON())
			);
		},

	//UI Events handler

		onLoginClicked: function(event){
			event.preventDefault();
			this.trigger("header:save",{
				email : $("#login-form #email").val(), 
				pass : $("#login-form #password").val()
			});
		},

		onCompteClicked: function(event) {
			console.log(event);
			//TODO gestion du compte utilisateur
		},

		onLogoutClicked: function(event) {
			this.trigger("header:destroy");
			/*this.model.destroy({
				success: this.onLoggedOut,
			});*/
		},

	//Callbacks

		onLoggedOut: function(model, response) {
			if(response.success){
				model.set({
					authenticated : response.authenticated,
					token : response.token
				});
				model.isLoggedOut();
			}
		},

		onLoggedIn : function(model,response){
			console.log(model,response);
			if( model.get("success") != true ){
				//model.trigger("error",model.get("msg"));
			}else{
				//model.isLoggedIn();
			}
		},

	//Errors
	
		onSaveError: function(model,response){
			console.log(model,response);
		},
		
	});

	return HeaderView;

});