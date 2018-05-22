var request = require('request');
var Config = require('./Config/config.js');

module.exports = function() {

    var config = new Config;
    this.register_user = function(url) {
        console.log("Calling", url);
        var duri = config.backend_uri + "/avl/user?username=" + config.username;

        request.delete(duri, function(error, message, body) {


            request.post(url, function (error, message) {
                // console.log('REGISTER ERROR', error);
                // console.log('REGISTER MESSAGES', message.body);
                var token = JSON.parse(message.body)['token'];

                function patch(token) {
                    // console.log('PATHC USER');
                    // console.log("Calling patch", token);
                    var options = {
                        url: config.backend_uri + "/avl/user-change?sport=1&service=DEFAULT",
                        headers: {
                            'Authorization': token
                        }
                    };
                    // console.log('OPTIONS', options )
                    request.post(options, function (error, message) {
                        // console.log('PATCH USER', message.body);
                    });
                }

                patch(token)


            });

        }, function () {

            request.post(url, function (error, message) {
                // console.log('REGISTER ERROR', error);
                // console.log('REGISTER MESSAGES', message.body);
                var token = JSON.parse(message.body)['token'];

                function patch(token) {
                    // console.log('PATHC USER');
                    // console.log("Calling patch", token);
                    var options = {
                        url: config.backend_uri + "/avl/user-change?sport=1&service=DEFAULT",
                        headers: {
                            'Authorization': token
                        }
                    };
                    // console.log('OPTIONS', options )
                    request.post(options, function (error, message) {
                        // console.log('PATCH USER', message.body);
                    });
                }

                patch(token)


            });

        });

    };

    this.delete_user = function(uri, callback) {
        console.log("CALLING DELETE " +uri);
        request.delete(uri, function(error, message, body) {
            // console.log(message.body);

            if (callback && typeof callback === 'function') {
                console.log('RADIM CALLBACK NA SUCCESS');
                callback(error, message, body);
            }
        }, function (err) {

            if (callback && typeof callback === 'function') {
                console.log('RADIM CALLBACK NA ERROR');
                callback(error, message, body);
            }
        });
        browser.driver.sleep(200);
    }
};