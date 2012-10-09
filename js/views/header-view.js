define([
       'backbone',
       'models/header',
       'text!templates/header.html'
],function(Backbone, Header, headerTemplate){
	
	var HeaderView = Backbone.View.extend({

		tagName: "header",

		initialize: function(){
			this.model = new Header();
			console.log(" header view ::: ",this.model.isNew());
			this.model.on("change", this.render, this);
			this.model.fetch();
		},

		render: function(){
			console.log( "header view ::: render" );
			this.template = _.template(headerTemplate);
			this.$el.html(
			    this.template({compte: "rien"})
			);
		},

	});

	return HeaderView;

});