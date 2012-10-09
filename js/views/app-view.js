define([
       'jquery',
       'underscore',
       'backbone',
       'views/header-view',
       'views/widgets-list',
],function($,_,Backbone, HeaderView, WidgetsListView ){
	
	var AppView = Backbone.View.extend({

		el: $("body"),

		initialize: function(){
			this.header = new HeaderView();
			this.widgets = new WidgetsListView();
		},

		render: function(){
			this.$el.append(this.header.el);
			this.$el.append(this.widgets.el);
		},

	});

	return new AppView;

});