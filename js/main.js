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
    
/*    Modernizr.load({
        test: Modernizr.touch,
        yep: 'css/jquery-mobile.min.css',
        nope: 'css/pepper-grinder/jquery-ui.css'
    });*/

    if($("html").hasClass("touch") && Modernizr.mq('only screen and (max-device-width: 800px)') ){
        require(["mobile-app","jquerymobile"], function (App) {
            loadCss("css/jquery-mobile.min.css");
            App.initialize();
        });
    }else{
        require(["app"], function (App) {
            loadCss("css/pepper-grinder/jquery-ui.css");
            App.initialize();
        });
    }


    var loadCss = function(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }    
});