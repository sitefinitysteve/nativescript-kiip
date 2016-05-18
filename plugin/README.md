# Nativescript Kiip Wrapper

## Setup
Add this to the app.js to run before application.start
``` js
if (application.ios) {
    //iOS
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
                key: "<YOUR KEY>",
            secret: "<YOUR SECRET>",
                testMode: true
            }); 
        };
        
        appDelegate.ObjCProtocols = [UIApplicationDelegate, KiipDelegate];
        return appDelegate;
    })(UIResponder);
    application.ios.delegate = appDelegate;
}else{
    //ANDROID
    application.on(application.launchEvent, function (args) {
        kiip.initalize({
            key: "<YOUR KEY>",
            secret: "<YOUR SECRET>",
            testMode: true
        }); 
    });
}
```

### iOS 
Looks like kiip uses http, so in iOS we need to allow http in the info.plist per the [guide](http://docs.kiip.me/en/guide/ios.html)
``` xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

### METHODS
```
var kiip = require("nativescript-kiip");
```
#### Save Moment
```
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
```

#### OPTIONS
``` js
exports.onSetEmail = function (args) {
    kiip.setEmail(viewModel.email);
}

exports.onSetBirthday = function (args) {
    kiip.setBirthday(viewModel.birthday);
}

exports.onSetGender = function (args) {
    kiip.setGender(viewModel.gender);
}

//iOS Only
exports.onStartSession = function (args) {
    kiip.startSession().then(function (args) {
        viewModel.debug = "Session Started " + new Date()
    }, function (args) {
        viewModel.debug = "Session Start Failed"
    });
}

//iOS Only
exports.onEndSession = function (args) {
    kiip.endSession().then(function (args) {
        viewModel.debug = "Session Ended " + new Date()
    }, function (args) {
        viewModel.debug = "Session End Failed"
    });
}

```