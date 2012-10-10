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
		},

		render: function(){
			//this.$el.empty();

			this.header.render();
			this.widgets.render();

			this.$el.append(this.header.el);
			this.$el.append(this.widgets.el);

      		$(".button").button();
		},

		error: function(response){
			console.log("app view ::: error ::: ",response);
		}

	});

	return AppView;

});