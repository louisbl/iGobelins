requirejs.config({
    paths: {
        'modernizr'  : 'vendor/modernizr-2.6.1-respond-1.1.0.min',
        'jquery'     : 'vendor/jquery-min',
        'jqueryui'   : 'vendor/jquery-ui-min',
        'underscore' : 'vendor/underscore-min',
        'backbone'   : 'vendor/backbone-min',
        'text'       : 'vendor/text'
    },

    shim: {
        'underscore' : {
          exports: '_'
        },

        'backbone': {
            deps    : ['underscore'],
            exports : 'Backbone'
        }
    }
});

require([
    'app',
    'modernizr',
], function(App){
    App.initialize();
});