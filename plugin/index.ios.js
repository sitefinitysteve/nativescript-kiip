var app = require("application");
var settings = {
    testMode: false
};

var kiip;

exports.initalize = function (options) {
    kiip = Kiip.alloc().initWithAppKeyAndSecret(options.key, options.secret);

    if (options.testMode) {
        kiip.testMode = true;
    }
}

exports.instance = function () {
    return kiip;
}

exports.setEmail = function (email) {
    kiip.email = email;
}

exports.setGender = function (gender) {
    kiip.gender = gender;
}

exports.getDeviceIdentifier = function () {
    return kiip.deviceIdentifier;
}

exports.getCapabilities = function () {
    var capabilities = kiip.capabilities;
    var items = [];

    for (var i = 0; i < capabilities.count; i++) {
        items.push(capabilities[i]);
    }

    return items;
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
    //TODO
}

exports.startSession = function () {
    //TODO
}

exports.endSession = function () {
    //TODO
}