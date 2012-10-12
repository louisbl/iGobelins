requirejs.config({
    paths: {
        'modernizr'    : 'vendor/modernizr-2.6.1-respond-1.1.0.min',
        'jquery'       : 'vendor/jquery-min',
        'jqueryui'     : 'vendor/jquery-ui-min',
        'jquerymobile' : 'vendor/jquery-mobile-min',
        'underscore'   : 'vendor/underscore-min',
        'backbone'     : 'vendor/backbone-min',
        'text'         : 'vendor/text'
    },

    shim: {
        'underscore' : {
          exports: '_'
        },

        'backbone': {
            deps    : ['underscore'],
            exports : 'Backbone'
        },

        'jquerymobile' : {
            deps : ['jqm-config'],
        },

        'modernizr': {
            exports: 'Modernizr'
        }
    }
});

require([
    'jquery',
    'modernizr'
], function($, Modernizr){
    /*
    Modernizr.load({
        test: Modernizr.touch,
        yep: 'css/jquery-mobile.min.css',
        nope: 'css/pepper-grinder/jquery-ui.css'
    });

    if($("html").hasClass("no-touch")){
        require(["app"], function (App) {
            App.initialize();
        });
    }else{
        require(["mobile-app","jquerymobile"], function (App) {
            App.initialize();
        });
    }*/    
    Modernizr.load({
        test: Modernizr.touch,
        nope: 'css/jquery-mobile.min.css',
        yep: 'css/pepper-grinder/jquery-ui.css'
    });

    if($("html").hasClass("touch")){
        require(["app"], function (App) {
            App.initialize();
        });
    }else{
        require(["mobile-app","jquerymobile"], function (App) {
            App.initialize();
        });
    }
});