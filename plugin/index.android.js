var app = require("application");
var startEndCallback = null;
var momentCallback = null;

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

    setCallback();
}

exports.instance = function () {
    return me.kiip.sdk.Kiip.getInstance();
}

exports.setEmail = function (email) {
    me.kiip.sdk.Kiip.getInstance().setEmail(email);
}

exports.setGender = function (gender) {
    me.kiip.sdk.Kiip.getInstance().setGender(gender);
}

exports.getDeviceIdentifier = function () {
    return me.kiip.sdk.Kiip.getInstance().getDeviceIdentifier();
}

exports.getCapabilities = function () {
    return me.kiip.sdk.Kiip.getInstance().getCapabilities();
}
/*
exports.setBirthday = function (birthday) {
    debugger;
    var format = new java.lang.SimpleDateFormat("dd/mm/yy", Locale.ENGLISH);
    var date = format.parse(birthday);
    me.kiip.sdk.Kiip.getInstance().setBirthday(date);
}
*/
exports.saveMoment = function (options) {
    return new Promise(function (resolve, reject) {
        if(options.id){
            var localCallback = new momentCallback();
            localCallback.init(resolve, reject)
            
            if(options.id && options.value){
                me.kiip.sdk.Kiip.getInstance().saveMoment(options.id, options.value, localCallback);
            }
            else if(options.id && options.meta){
                me.kiip.sdk.Kiip.getInstance().saveMoment(options.id, options.meta, localCallback);
            }
            else{
                me.kiip.sdk.Kiip.getInstance().saveMoment(options.id, localCallback);
            }
        }else{
            console.log("No moment id sent... example: kiip.saveMoment({id: 'someid'})");
        }
    });
}

exports.startSession = function () {
    return new Promise(function (resolve, reject) {
        var localCallback = new startEndCallback();
        localCallback.init(resolve, reject)

        me.kiip.sdk.Kiip.getInstance().startSession(localCallback);
    });
}

exports.endSession = function () {
    return new Promise(function (resolve, reject) {
        var localCallback = new startEndCallback();
        localCallback.init(resolve, reject)

        me.kiip.sdk.Kiip.getInstance().endSession(localCallback);
    });
}

function setCallback(){
    startEndCallback = me.kiip.sdk.Kiip.Callback.extend({
        _promise: null,

        init: function(resolve, reject){
           this._promise  = { resolve: resolve, reject: reject };
        },
        onFinished: function (kiip, poptart) {
            this._promise.resolve({
                kiip: kiip,
                poptart: poptart
            });
        },
        onFailed: function (kiip, exception) {
            this._promise.reject({
                kiip: kiip,
                exception: exception
            });
        }
    });
    
    momentCallback = me.kiip.sdk.Kiip.Callback.extend({
        _promise: null,
        _message: "",
        
        init: function(resolve, reject, message){
           this._promise  = { resolve: resolve, reject: reject };
        },
        onFinished: function (kiip, poptart) {
            if (poptart == null) {
                this._message = "Successful moment but no reward to give.";
                console.log("Successful moment but no reward to give.");
            }
            
            this._promise.resolve({
                kiip: kiip,
                poptart: poptart,
                message: this._message
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