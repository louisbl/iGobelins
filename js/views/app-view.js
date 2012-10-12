define([
       'jquery',
       'underscore',
       'backbone',
       'views/header-view',
       'views/widgets-list',
       'jqueryui'
],function($,_,Backbone, HeaderView, WidgetsListView ){
	
	var AppView = Backbone.View.extend({

		el: $("body"),

		initialize: function(options){
			this.header		= options.headerView;
			this.widgets	= options.widgetsList;
			
			this.$("#toast").dialog({
				autoOpen: false,
				modal: true,
				resizable: false,
				buttons: {
					"Ok": function(){
						$(this).dialog( "close" );
					},
				}
			});
		},

		render: function(){
			this.header.render();
			this.widgets.render();

			this.$el.append(this.header.el);
			this.$el.append(this.widgets.el);

      		$(".button").button();
		},

		showError: function(response){
			console.log("app view ::: error ::: ",response);
			if( _.isString(response) )
				this.$("#toast p").html(response);
			else
				this.$("#toast p").html("erreur lors de la connexion au serveur.");
			
			this.$("#toast").dialog("open");
			
		}

	});

	return AppView;

});