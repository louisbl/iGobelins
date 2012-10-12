define([       
	'jquery',
    'underscore',
    'backbone',
    'mobile-views/widgets-list',
    'text!mobile-templates/home.html'
],function($,_,Backbone, WidgetsListView, homeTemplate){
	
	var HomeView = Backbone.View.extend({

		initialize: function(){
			this.model.fetch();
			this.template = _.template(homeTemplate);
		},

		render: function(){
 			$(this.el).html(this.template(this.model.toJSON()));
			
			this.widgetsListView = new WidgetsListView({
				el: this.$('ul'),
				model : this.model,
			});
			return this;
		},

	});

	return HomeView;
});