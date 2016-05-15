var app = require("application");

var settings = {
    
};

exports.initalize = function (options) {
    var context = app.android.context;
    var kiip = me.kiip.sdk.Kiip.init(context, options.key, options.secret);
    me.kiip.sdk.Kiip.setInstance(kiip);
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

exports.saveMoment = function (moment) {
    
}

exports.startSession = function () {
    return new Promise(function(resolve, reject) {
        me.kiip.sdk.Kiip.getInstance().startSession(function() {
            debugger;
            resolve("complete");
        });
    });
}

exports.endSession = function () {
    return new Promise(function(resolve, reject) {
        me.kiip.sdk.Kiip.getInstance().endSession(function() {
            debugger;
            resolve("complete");
        });
    });
}