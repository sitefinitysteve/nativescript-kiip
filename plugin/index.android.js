var app = require("application");

var settings = {
    
};

exports.initalize = function (options) {
    var context = app.android.context;
    var kiip = me.kiip.sdk.Kiip.init(context, options.key, options.secret);
    me.kiip.sdk.Kiip.setInstance(kiip);
}

exports.instance = function () {
    me.kiip.sdk.Kiip.getInstance();
}

exports.saveMoment = function(momentId){
    debugger;
}