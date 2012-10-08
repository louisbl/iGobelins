require.config({
  paths: {
    jQuery: 'vendor/jquery-min',
    Underscore: 'vendor/underscore-min',
    Backbone: 'vendor/backbone-min'
  },
  shim: {
        'Backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['Underscore', 'jQuery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        }
      }
});

require([

  'app',

], function(App){
  App.initialize();
});