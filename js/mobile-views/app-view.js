define([
       'jquery',
       'underscore',
       'backbone',
       'mobile-views/header-view',
       'mobile-views/widgets-list',
],function($,_,Backbone ){
	
	var AppView = Backbone.View.extend({

		el: $("body"),

		initialize: function(options){
			this.header		= options.headerView;
			this.widgets	= options.widgetsList;			
		},

		render: function(){
			//this.$el.empty();

			this.header.render();
			this.widgets.render();

			this.$el.append(this.header.el);
			this.$el.append(this.widgets.el);

      		//$(".button").button();
		},

		/*showError: function(response){
			console.log("app view ::: error ::: ",response);
			if( _.isString(response) )
				this.$("#toast p").html(response);
			else
				this.$("#toast p").html("erreur lors de la connexion au serveur.");
			
			this.$("#toast").dialog("open");
			
		}*/

	});

	return AppView;

});