define([       
		'jquery',
       'underscore',
       'backbone',
       'text!mobile-templates/header.html'
],function($,_,Backbone, headerTemplate){
	
	var HeaderView = Backbone.View.extend({

		className: "ui-widget-header",

		render: function(){
			this.template = _.template(headerTemplate);
			this.$el.html( this.template() );
		},

	});

	return HeaderView;
});