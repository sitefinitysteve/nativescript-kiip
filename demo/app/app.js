var application = require("application");
var kiip = require("nativescript-kiip");

var frameModule = require("ui/frame");

if (application.ios) {
    var __extends = this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };
    
    var appDelegate = (function (_super) {
        __extends(appDelegate, _super);
        function appDelegate() {
            _super.apply(this, arguments);
        }
        
        appDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (app, launchOptions) {
            kiip.initalize({
                key: "d16762e04b6f3320a8c828daeb178d2e",
                secret: "baa8b79a95a55908ae71d9254669dd0e"
            }); 
        };
        
        appDelegate.ObjCProtocols = [UIApplicationDelegate];
        return appDelegate;
    })(UIResponder);
    application.ios.delegate = appDelegate;
}else{
    kiip.initalize({
        key: "d16762e04b6f3320a8c828daeb178d2e",
        secret: "baa8b79a95a55908ae71d9254669dd0e"
    }); 
}

application.start({ moduleName: "main-page" });
