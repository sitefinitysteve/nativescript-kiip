var app = require("application");

var settings = {
    testMode: false
};

exports.initalize = function (options) {
    var context = app.android.context;
    var kiip = me.kiip.sdk.Kiip.init(context, options.key, options.secret);
    me.kiip.sdk.Kiip.setInstance(kiip);
    
    if(options.testMode){
        var jBool = new java.lang.Boolean(options.testMode);
        me.kiip.sdk.Kiip.getInstance().setTestMode(jBool);
    }
}

exports.instance = function () {
    return me.kiip.sdk.Kiip.getInstance();
}

exports.setEmail = function (email) {
    return me.kiip.sdk.Kiip.getInstance().setEmail(email);
}

exports.setGender = function (gender) {
    return me.kiip.sdk.Kiip.getInstance().setGender(gender);
}

exports.setBirthday = function (birthday) {
    return me.kiip.sdk.Kiip.getInstance().setBirthday(birthday);
}

exports.saveMoment = function (momentId) {
    return new Promise(function(resolve, reject) {
    var callback = me.kiip.sdk.Kiip.Callback.extend({
            onFinished: function(kiip, poptart){
                resolve({
                    kiip: kiip,
                    poptart: poptart
                });
            },
            onFailed: function(kiip, exception){
                reject({
                    kiip: kiip,
                    exception: exception
                });
            }
        });
        
        me.kiip.sdk.Kiip.getInstance().saveMoment(momentId, new callback());
    });
}

exports.startSession = function () {
    return new Promise(function(resolve, reject) {
    var callback = me.kiip.sdk.Kiip.Callback.extend({
            onFinished: function(kiip, poptart){
                resolve({
                    kiip: kiip,
                    poptart: poptart
                });
            },
            onFailed: function(kiip, exception){
                reject({
                    kiip: kiip,
                    exception: exception
                });
            }
        });
        
        me.kiip.sdk.Kiip.getInstance().startSession(new callback());
    });
}

exports.endSession = function () {
    return new Promise(function(resolve, reject) {
    var callback = me.kiip.sdk.Kiip.Callback.extend({
            onFinished: function(kiip, poptart){
                resolve({
                    kiip: kiip,
                    poptart: poptart
                });
            },
            onFailed: function(kiip, exception){
                reject({
                    kiip: kiip,
                    exception: exception
                });
            }
        });
        
        me.kiip.sdk.Kiip.getInstance().endSession(new callback());
    });
}
