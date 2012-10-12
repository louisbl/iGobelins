define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/widget-item.html',
  'text!templates/rss-item.html',
  'text!templates/meteo-item.html',
  'text!templates/youtube-item.html',
  'text!templates/custom-item.html',
  //'vendor/jquery-youtube',
  'jqueryui'
], function($, _, Backbone, widgetItemTemplate, rssItemTemplate, meteoItemTemplate, youtubeItemTemplate, customItemTemplate){
  
 var WidgetItemView = Backbone.View.extend({
    
    className: "widget-item ui-widget-content ui-corner-all",

    events: {
      "click .close-btn": "onCloseButtonClicked",
      "click .reduce-btn": "onReduceButtonClicked",
      "click .refresh-btn": "onRefreshButtonClicked",
    },

    initialize: function() {

      _.bindAll(this);

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

      if(this.rendered && _.isEmpty(_.omit(this.model.changedAttributes(),'col','position'))){
        console.log(" no render :: ",this.id);
        return false;
      }
      console.log(" do render :: ",this.id);

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

        this.toggleReduceBtn();

        this.$(".refresh-btn").button({
          text: false,
          icons: {
            primary: "ui-icon-refresh"
          }
        });

        this.$(".close-btn").button({
          text: false,
          icons: {
            primary: "ui-icon-closethick"
          }
        });

/*        this.$(".youtube-player").tubeplayer({
          width: 640,
          height: 480,
          allowFullScreen: "true",
          initialVideo: "wNQVXJ3hHLg",
          preferredQuality: "default",
          autoPlay: true,
        });*/

      this.rendered = true;
    },

    onCloseButtonClicked: function(event) {
      this.model.destroy();
    },
    
    onReduceButtonClicked: function(event) {
      this.$(".widget-content").slideToggle(this.onSlideDone);
    },

    onRefreshButtonClicked: function(event) {
      this.model.refresh();
    },

    onSlideDone: function(){
      if(this.$(".widget-content").css('display') == "none"){
        this.model.setOption("hide",1);
        this.toggleReduceBtn();
      }else{
        this.model.setOption("hide",0);
        this.toggleReduceBtn();
      }
    },

    toggleReduceBtn: function(){
        if( this.model.getOption("hide") == 1 ){
          this.$(" .reduce-btn").button({
            text: false,
            icons: {
              primary: "ui-icon-plusthick"
            }
          });
          this.$(".widget-content").hide();
        }else{
          this.$(".reduce-btn").button({
            text: false,
            icons: {
              primary: "ui-icon-minusthick"
            }
          });
          this.$(".widget-content").show();
        }
    }

  });

  return WidgetItemView;
});