define([       
	'jquery',
       'underscore',
       'backbone',
       'models/header',
       'text!templates/header.html'
],function($,_,Backbone, Header, headerTemplate){
	
	var HeaderView = Backbone.View.extend({

		className: "ui-widget ui-widget-header",

		events: {
			"submit #login-form" : "onLoginClicked",
			"click #compte-btn"  : "onCompteClicked",
			"click #logout-btn"  : "onLogoutClicked",
			"click #ajout-btn"   : "onAjoutClicked",
		},

		initialize: function(){
			_.bindAll(this,"onAddWidget");
		},

		render: function(){
			console.log( "header view ::: render",this.model.toJSON());
			this.template = _.template(headerTemplate);
			this.$el.html(
			    this.template(this.model.toJSON())
			);

			this.$("#ajout-dialog").on("widget:add",this.onAddWidget);

			this.$("#ajout-dialog").dialog({
				autoOpen: false,
				modal: true,
				buttons: {
					Cancel: function(){
						$(this).dialog( "close" );
					},
					"Ajouter": function(){
						$(this).trigger("widget:add");
						$(this).dialog( "close" );
					},
				}
			});

		},

	//UI Events handler

		onAddWidget: function(event){
			console.log(event,this);
			this.trigger("header:add",{
				name         : $("#titre").val(),
				type         : $("#type").val(),
				option 		 : {url : $("#url").val()},
			});
		},

		onAjoutClicked: function(event){
			$("#ajout-dialog").dialog( "open" );
		},

		onLoginClicked: function(event){
			event.preventDefault();
			this.trigger("header:login",{
				email : this.$("#login-form #email").val(), 
				pass  : this.$("#login-form #password").val()
			});
		},

		onCompteClicked: function(event) {
			console.log(event);
			//TODO gestion du compte utilisateur
		},

		onLogoutClicked: function(event) {
			this.trigger("header:logout");
		},
		
	});

	return HeaderView;

});