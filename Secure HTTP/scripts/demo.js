(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        sendPlain: function () {
            if (!this.checkSimulator()) {
                var email = {
                    "to"      : "your-email-address@your-host.com",
                    "from"    : "sendgrid-plugin@telerik.com",
                    "subject" : "Mail from the SendGrid plugin (plain text)",
                    "text"    : "This message is sent as plain text, so you <strong>should</strong> see some nasty HTML tags here :)"
                };
                window.sendgrid.send(
                    email,
                    function (msg) {alert("SUCCESS: " + JSON.stringify(msg))},
                    function (msg) {alert("ERROR: "   + JSON.stringify(msg))}
                );
            }
        },

        sendHTML: function () {
            if (!this.checkSimulator()) {
                var email = {
                    "to"      : "your-email-address@your-host.com",
                    "from"    : "sendgrid-plugin@telerik.com",
                    "subject" : "Mail from the SendGrid plugin (HTML)",
                    "text"    : "This is the backup text for non-HTML mailclients",
                    "html"    : "<p>Grabbed this <strong>boldly</strong> from the DOM:</p> " + document.getElementById('emailcontent').innerHTML
                };
                window.sendgrid.send(
                    email,
                    function (msg) {alert("SUCCESS: " + JSON.stringify(msg))},
                    function (msg) {alert("ERROR: "   + JSON.stringify(msg))}
                );
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