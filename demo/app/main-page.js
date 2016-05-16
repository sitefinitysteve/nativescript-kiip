var app = require("application");
var viewModel = require("./main-view-model");
var frameModule = require("ui/frame");
var kiip = require("nativescript-kiip");

var page;

exports.onNavigatingTo = function (args) {
    page = args.object;
    page.bindingContext = viewModel;
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
    kiip.saveMoment("open_app").then(function (args) {
        
        if(args.poptart != null){
            var context = app.android.context;  
            args.poptart.show(context, true);  
        }
            
        viewModel.debug = "Saved Moment " + new Date()
    }, function (args) {
        viewModel.debug = "Save Moment Failed";
    });
}
