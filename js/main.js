// Models

var WebServSync = function(options) {
    var params = { data : ""};
    
    params.url      = apiURL;
    params.url      += "?apiKey="+apiKey;
    params.timeout  = 10000;
    params.dataType = "jsonp";

    return $.ajax(_.extend(params,options));
}

var AllWidgetsSync = function (method, model, options) {
    switch(method){
        case 'read':
            options.data = "apiCall=loadUserWidgets";
            break;
    }
    return WebServSync(options);
}

var WidgetSync = function (method, model, options) {
    switch(method){
        case 'create':
            break;
        case 'update':
            break;
        case 'delete':
            break;
        case 'read':
            options.data         = model.toJSON();
            options.data.all     = true;
            options.data.apiCall = "getWidget";
            break;
    }
    return WebServSync(options);    
};

var ConnectionSync = function ( method, model, options ) {
    options.data.email = email;
    options.data.pass = pass;
    options.data.apiCall=login;

    return WebServSync(options);    
}

window.User = Backbone.Model.extend({

});

window.Connection = Backbone.Model.extend({

    parse : function(response){
        console.log(response);
        return response;
    },

    sync : ConnectionSync    
});

window.WidgetGob = Backbone.Model.extend({

    idAttribute: "id_widget",
    
    parse : function(response){
        console.log(response);
        return response;
    },    

    initialize : function(){
        this.fetch();
    },

    sync: WidgetSync

});
 
window.WidgetGobCollection = Backbone.Collection.extend({
    
    parse : function(response){
        console.log(response);
        if( response.success ){
            return response.widgets;
        }
    },
    
    model:WidgetGob,
    
    sync: AllWidgetsSync
});
 
// Views
window.WidgetListView = Backbone.View.extend({
 
    tagName:'ul',
 
    initialize:function () {
        this.model.on("reset", this.render, this);
    },
 
    render:function (eventName) {
        _.each(this.model.models, function (widgetGob) {
            $(this.el).append(new WidgetGobListItemView({model:widgetGob}).render().el);
        }, this);
        return this;
    }
 
});
 
window.WidgetGobListItemView = Backbone.View.extend({
 
    tagName:"li",
 
    template:_.template($('#tpl-widgt-list-item').html()),
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
 
});
 
// Router
var AppRouter = Backbone.Router.extend({
 
    routes:{
        "":"list",
    },
 
    list:function () {
    	console.log("in list function ::: ");

        this.widgtList = new WidgetGobCollection();
        this.widgtListView = new WidgetListView({model:this.widgtList});
        this.widgtList.fetch();
        $('#widgets').html(this.widgtListView.render().el);
    }
});
 
$(document).ready(function() {
	var app = new AppRouter();
	Backbone.history.start();

	$( "#draggable" ).draggable();
	
	$( "#droppable" ).droppable();
	$( ".sortable" ).sortable({
        connectWith: ".sortable"
    }
        ).disableSelection();
});