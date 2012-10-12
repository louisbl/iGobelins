define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/widget-item.html',
  'text!templates/rss-item.html',
  'text!templates/meteo-item.html',
  'text!templates/youtube-item.html',
  'vendor/jquery-youtube',
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
            this.numItems = 10;
            this.template_content = _.template(rssItemTemplate);
            break;
          case '2':
            this.template_content = _.template(meteoItemTemplate);
            break;
          case '3':
            this.numItems = 5;
            this.template_content = _.template(youtubeItemTemplate);
            break;
        }
      }

    },

    render:function () {

      if(this.rendered && _.isEmpty(_.omit(this.model.changedAttributes(),'col','position'))){
        // console.log(" no render :: ",this.id);
        return false;
      }
      // console.log(" do render :: ",this.id);

        this.template = _.template(widgetItemTemplate);

        
        if(!_.isUndefined(this.model.get("data"))){
          this.$el.html(
            this.template({
              content: this.template_content({
                data : this.model.getData(this.numItems)
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

        this.$(".accordion").accordion({
            collapsible: true,
            active: false,
            heightStyle: 'content',
            beforeActivate: this.onBeforeActivate,
          });
  
        this.$(".tabs").tabs({
          collapsible: true,
        });

      this.rendered = true;
    },

    activateYoutube: function(data) {
      this.$("#player_"+data.id).tubeplayer({
        width: data.width,
        allowFullScreen: "true",
        initialVideo: data.id,
        preferredQuality: "default",
        autoPlay: true,
      });
    },

    deactivateYoutube: function(data) {
      // console.log("deactivate youtube ::: ");
      this.$("#player_"+data.id).tubeplayer("stop");
      this.$("#player_"+data.id).tubeplayer("destroy");
    },

    onBeforeActivate: function(event,ui) {
      // console.log(event,ui);

      if(ui.newHeader.length > 0 ){
        var data = {
          id :(ui.newPanel.attr("id")).replace("youtube_",""),
          width : ui.newHeader.width()
        }; 
        this.activateYoutube(data);
      }else{
        var data = {
          id :(ui.oldPanel.attr("id")).replace("youtube_",""),
        }; 
        this.deactivateYoutube(data);
      }
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