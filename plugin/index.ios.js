var app = require("application");
var settings = {
    testMode: false
};

var _kiip;

exports.initalize = function (options) {
    _kiip = Kiip.alloc().initWithAppKeyAndSecret(options.key, options.secret);

    if (options.testMode) {
        _kiip.testMode = true;
    }
}

exports.instance = function () {
    return _kiip;
}

exports.setEmail = function (email) {
    _kiip.email = email;
}

exports.setGender = function (gender) {
    _kiip.gender = gender;
}

exports.getDeviceIdentifier = function () {
    return _kiip.deviceIdentifier;
}

exports.getCapabilities = function () {
    var capabilities = _kiip.capabilities;
    var items = [];

    for (var i = 0; i < capabilities.count; i++) {
        items.push(capabilities[i]);
    }

    return items;
}

function getCallback(){
    return {
        _promise: null,
        init: function (resolve, reject, message) {
            this._promise = { resolve: resolve, reject: reject };
        },
        callback: function (poptart, error) {
                if(error){
                    this._promise.reject({
                        kiip: _kiip,
                        exception: error
                    });
                }else{
                    this._promise.resolve({
                        kiip: _kiip,
                        poptart: poptart
                    });
                }
        }
    }
}

exports.saveMoment = function (options) {
    return new Promise(function (resolve, reject) {
        if (options.id) {
            if (options.id && options.value) {
                
            }
            else if (options.id && options.meta) {
                
            }
            else {
                var localCallback = new getCallback();
                localCallback.init(resolve, reject)
        
                _kiip.saveMomentWithCompletionHandler(options.id, localCallback.callback());
            }
        } else {
            console.log("No moment id sent... example: kiip.saveMoment({id: 'someid'})");
        }
    });
}

//DUMMY STUBS TO NOT BREAK Cross Platformability
exports.startSession = function () {
    return new Promise(function (resolve, reject) {
        resolve({
            kiip: _kiip,
            poptart: null
        });
    });
}

exports.endSession = function () {
    return new Promise(function (resolve, reject) {
        resolve({
            kiip: _kiip,
            poptart: null
        });
    });
}