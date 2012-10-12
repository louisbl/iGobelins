define([
       'jquery',
       'underscore',
       'backbone',
       'mobile-views/widgets-list',
],function($,_,Backbone ){
	
	var AppView = Backbone.View.extend({

		initialize: function(options){
		},

		render: function(){
			//this.$el.empty();


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