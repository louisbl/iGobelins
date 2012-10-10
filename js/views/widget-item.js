define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/widget-item.html',
  'text!templates/rss-item.html',
  'text!templates/meteo-item.html',
  'text!templates/youtube-item.html',
  'text!templates/custom-item.html',
  'jqueryui'
], function($, _, Backbone, widgetItemTemplate, rssItemTemplate, meteoItemTemplate, youtubeItemTemplate, customItemTemplate){
  
 var WidgetItemView = Backbone.View.extend({
    
    className: "ui-widget ui-widget-content",

    events: {
      "click .close-btn": "onCloseButtonClicked"
    },

    initialize: function() {

      if(!_.isUndefined(this.model.get("type"))){
        
        switch(this.model.get("type")){
          case '1':
            this.template_content = _.template(rssItemTemplate);
            break;
          case '2':
            this.template_content = _.template(meteoItemTemplate);
            break;
          case '3':
            this.template_content = _.template(youtubeItemTemplate);
            break;
          case '4':
            this.template_content = _.template(customItemTemplate);
            break;
        }
      }
    },

    render:function () {

        this.template = _.template(widgetItemTemplate);
        
        if(!_.isUndefined(this.model.get("data"))){
          this.$el.html(
            this.template({
              content: this.template_content({
                data : this.model.get("data")
              }),
          
              name: this.model.get("name")
            })
          );
        }
    },

    onCloseButtonClicked: function(event) {
      console.log(this.model.isNew());
      this.model.destroy();
    },

  });

  return WidgetItemView;
});