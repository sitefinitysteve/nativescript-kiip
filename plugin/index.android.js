var app = require("application");
var callback = null;

var settings = {
    testMode: false
};

exports.initalize = function (options) {
    var context = app.android.context;
    var kiip = me.kiip.sdk.Kiip.init(context, options.key, options.secret);
    me.kiip.sdk.Kiip.setInstance(kiip);

    if (options.testMode) {
        var jBool = new java.lang.Boolean(options.testMode);
        me.kiip.sdk.Kiip.getInstance().setTestMode(jBool);
    }

    getCallback();
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
    return new Promise(function (resolve, reject) {
        var localCallback = new callback();
        localCallback._promise = { resolve: resolve, reject: reject };
        localCallback._successLogMessage = "Successful moment but no reward to give."

        me.kiip.sdk.Kiip.getInstance().saveMoment(momentId, new _callback());
    });
}

exports.startSession = function () {
    return new Promise(function (resolve, reject) {
        var localCallback = new callback();
        localCallback._promise = { resolve: resolve, reject: reject };

        me.kiip.sdk.Kiip.getInstance().startSession(localCallback);
    });
}

exports.endSession = function () {
    return new Promise(function (resolve, reject) {
        var localCallback = new callback();
        localCallback._promise = { resolve: resolve, reject: reject };

        me.kiip.sdk.Kiip.getInstance().endSession(localCallback);
    });
}

function getCallback(){
    callback = me.kiip.sdk.Kiip.Callback.extend({
        _promise: null,
        _successLogMessage: "",
        onFinished: function (kiip, poptart) {
            this._promise.resolve({
                kiip: kiip,
                poptart: poptart,
                message: (poptart == null) ? _successLogMessage : "Success"
            });
        },
        onFailed: function (kiip, exception) {
            this._promise.reject({
                kiip: kiip,
                exception: exception
            });
        }
    });
}