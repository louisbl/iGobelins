define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/widgetItem.html'
], function($, _, Backbone, widgetItemTemplate){
  var widgetItemView = Backbone.View.extend({
    el: $('#container'),
    render: function(){
      var data = {};
      var compiledTemplate = _.template( widgetItemTemplate, data );
      this.el.append( compiledTemplate );
    }
  });
  return new widgetItemView;
});