define([       
	'jquery',
       'underscore',
       'backbone',
       'models/header',
       'text!templates/header.html'
],function($,_,Backbone, Header, headerTemplate){
	
	var HeaderView = Backbone.View.extend({

		className: "ui-widget-header",

		events: {
			"submit #login-form" : "onLoginClicked",
			"click #compte-btn"  : "onCompteClicked",
			"click #logout-btn"  : "onLogoutClicked",
			"click #ajout-btn"   : "onAjoutClicked",
		},

		initialize: function(){
			_.bindAll(this);
		},

		render: function(){
			console.log( "header view ::: render",this.model.changedAttributes());

			if(this.rendered && !this.model.changedAttributes() )
        		return false;

			this.template = _.template(headerTemplate);
			this.$el.html(
			    this.template(this.model.toJSON())
			);

			this.$("#ajout-dialog").on("widget:add",this.onAddWidget);

			this.$("#ajout-dialog").dialog({
				autoOpen: false,
				modal: true,
				buttons: {
					"Ajouter": function(){
						$(this).trigger("widget:add");
						$(this).dialog( "close" );
					},
				}
			});

			this.$("#compte-dialog").on("compte:update",this.onCompteUpdate);

			this.$("#compte-dialog").dialog({
				autoOpen: false,
				modal: true,
				buttons: {
					"Modifier": function(){
						$(this).trigger("compte:update");
						$(this).dialog( "close" );
					},
				}
			});

			this.$("#ajout-btn").button({
				icons: {
					primary: "ui-icon-plusthick",
					secondary: "ui-icon-triangle-1-se",
				}
			});

			this.$("#logout-btn").button({
				icons: {
					primary: "ui-icon-power",
				}
			});

			this.$("#compte-btn").button({
				icons: {
					primary: "ui-icon-person",
				}
			});

			this.rendered = true;
		},

	//UI Events handler

		onCompteUpdate: function(event){
			console.log(event,this);
			this.model.save({
				user : {
					pseudo : $('#user_pseudo').val(),
					email : $('#user_email').val(),
					pass : $('#user_pass').val()
				}
			});
		},

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
			$("#compte-dialog").dialog( "open" );
		},

		onLogoutClicked: function(event) {
			this.trigger("header:logout");
		},
		
	});

	return HeaderView;

});