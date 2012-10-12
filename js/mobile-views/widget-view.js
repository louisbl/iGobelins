define([       
	'jquery',
    'underscore',
    'backbone',
    'text!mobile-templates/widget-rss.html',
    'text!mobile-templates/widget-meteo.html'
],function($,_,Backbone, rssTemplate, meteoTemplate){
	
	var WidgetView = Backbone.View.extend({

		initialize: function(){
			switch(this.model.get("type")){
        	  case '1':
        	    template_content = rssTemplate;
        	    break;
        	  case '2':
        	    template_content = meteoTemplate;
        	    break;
        	}
			this.template = _.template(template_content);
		},

		render: function(){
			console.log(this.model.toJSON());
 			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},	

	});

	return WidgetView;
});