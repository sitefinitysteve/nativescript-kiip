var app = require("application");
var settings = {
    testMode: false
};

exports.initalize = function (options) {
    debugger;
    var kiip = Kiip.alloc();
}

exports.instance = function () {
    //TODO
}

exports.setEmail = function (email) {
    //TODO
}

exports.setGender = function (gender) {
    //TODO
}

exports.getDeviceIdentifier = function () {
    //TODO
}

exports.getCapabilities = function () {
    //TODO
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