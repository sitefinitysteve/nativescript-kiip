var app = require("application");
var viewModel = require("./main-view-model");
var frameModule = require("ui/frame");
var kiip = require("nativescript-kiip");

var page;

exports.onNavigatingTo = function (args) {
    page = args.object;
    page.bindingContext = viewModel;
    
    viewModel.id = "Kiip DeviceId: " + kiip.getDeviceIdentifier();
    
    var capabilityResult = "";
    var capabilities = kiip.getCapabilities();
    for(var i=0; i<capabilities.length; i++) {
        capabilityResult = capabilityResult + capabilities[i] + ", ";
    }
    
    viewModel.capabilities = "Capabilities: " + capabilityResult;
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
        
        if(args.poptart != null){
            debugger;
            var context = app.android.context;  
            args.poptart.show(context); //<-- CRASH HERE  
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