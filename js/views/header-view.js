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
			_.bindAll(this,"onAddWidget");
		},

		render: function(){
			console.log( "header view ::: render",this.model.changedAttributes());

			if( !this.model.changedAttributes() )
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