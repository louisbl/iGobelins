define([
  'jquery',
  'underscore',
  'backbone',
  'collections/widgets',
  'text!mobile-templates/widgets-list.html',
], function($, _, Backbone, WidgetsCollection, widgetsListTemplate){
  
  var WidgetsListView = Backbone.View.extend({

    className: "main-container",

    events: {
    },

    initialize:function () {

      this.model.fetch();
      
      this.template = _.template(widgetsListTemplate);
      this.$el.html(
          this.template()
      );
    },

    render: function () {

      _.each(this.model.models, function(widget){
          
          console.log(widget.id);

      }, this);

    },

  });

  return WidgetsListView;
});