define([
  'jquery',
  'underscore',
  'backbone',
  'text!mobile-templates/widget-item.html',
], function($, _, Backbone, itemTemplate){
  
  var WidgetItemView = Backbone.View.extend({

    tagName: "li",

    initialize:function () {
        this.template = _.template(itemTemplate);
        this.model.on("change", this.render, this);
    },

    render: function () {
        console.log(" item render ::: ",this.model.toJSON());
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
  });

  return WidgetItemView;
});