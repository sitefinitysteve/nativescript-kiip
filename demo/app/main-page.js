var app = require("application");
var viewModel = require("./main-view-model");
var frameModule = require("ui/frame");
var kiip = require("nativescript-kiip");

var page;

exports.onNavigatingTo = function (args) {
    page = args.object;
    page.bindingContext = viewModel;

    viewModel.id = "Kiip DeviceId: " + kiip.getDeviceIdentifier();
    viewModel.capabilities = kiip.getCapabilities();
}

exports.onStartSession = function (args) {
    kiip.startSession().then(function (args) {
        viewModel.debug = "Session Started " + new Date()
    }, function (args) {
        viewModel.debug = "Session Start Failed"
    });
}

exports.onEndSession = function (args) {
    kiip.endSession().then(function (args) {
        viewModel.debug = "Session Ended " + new Date()
    }, function (args) {
        viewModel.debug = "Session End Failed"
    });
}

exports.onSaveMoment = function (args) {
    kiip.saveMoment({
        id: "open_app"
    }).then(function (args) {

        if (args.poptart != null) {
            if (app.android) {
                var context = app.android.currentContext;
                args.poptart.show(context); //<-- CRASH HERE
            }else if(app.ios){
                debugger;
                args.poptart.show();
            }
        }

        viewModel.debug = "Saved Moment " + new Date()
    }, function (args) {
        viewModel.debug = "Save Moment Failed";
    });
}

exports.onSetEmail = function (args) {
    kiip.setEmail(viewModel.email);
}

exports.onSetBirthday = function (args) {
    kiip.setBirthday(viewModel.birthday);
}

exports.onSetGender = function (args) {
    kiip.setGender(viewModel.gender);
}