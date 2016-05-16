var viewModel = require("./main-view-model");
var frameModule = require("ui/frame");
var kiip = require("nativescript-kiip");

var page;

exports.onNavigatingTo = function (args) {
    page = args.object;
    page.bindingContext = viewModel;
}

exports.onTest = function (args) {
    startSession().then(function (args) {
        alert("success");
    }, function (args) {
        debugger;
        alert("tanked");
    });
}

function startSession() {

}
