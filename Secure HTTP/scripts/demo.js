(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        enablePinning: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.enableSSLPinning(
                    true,
                    function (msg) {alert("SUCCESS, you can now talk only to trusted endpoints")},
                    function (msg) {alert("ERROR: "   + msg)}
                );
            }
        },

        disablePinning: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.enableSSLPinning(
                    false,
                    function (msg) {alert("SUCCESS: you can now talk to any endpoint")},
                    function (msg) {alert("ERROR: "   + msg)}
                );
            }
        },

        doTrustedGET: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.get(
                    "https://cordova.apache.org", // we have a .cer file for this in www/certificates
                    {}, // optional params
                    {}, // optional headers
                    function(msg) {alert("OK: " + msg)},
                    function(msg) {alert("ERROR: " + msg)}
                )
            }
        },

        doUntrustedGET: function () {
            if (!this.checkSimulator()) {
                window.cordovaHTTP.get(
                    "https://www.github.com", // we don't have a .cer file for this
                    {}, // optional params
                    {}, // optional headers
                    function(msg) {alert("OK: " + msg)},
                    function(msg) {alert("ERROR: " + msg)}
                )
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.cordovaHTTP === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);