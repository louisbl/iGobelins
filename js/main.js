requirejs.config({
    paths: {
        'jquery': 'vendor/jquery-min',
        'jqueryui':'vendor/jquery-ui-min',
        'underscore': 'vendor/underscore-min',
        'backbone': 'vendor/backbone-min',
        'text': 'vendor/text'
    },

    shim: {
        'underscore' : {
          exports: '_'
        },

        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        }
    }
});

require([
  'app'
], function(App){
    App.initialize();
});