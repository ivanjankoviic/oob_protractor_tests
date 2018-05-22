// An example configuration file.
exports.config = {
    /* Ivan je dodao sledeca 2
     Your test script communicates directly Chrome Driver or Firefox Driver, bypassing any Selenium Server*/
    directConnect: 'true',
    getPageTimeout: 15000,
    allScriptsTimeout: 20000,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'/*,
         'chromeOptions': {
         'mobileEmulation' : {
         'deviceName': 'Google Nexus 5'
         }
         }*/
    },
    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',

    specs: ['**/*.spec.js'],
    // specs: ['**/connect_apps_google_fit.spec.js', '**/connect_apps_strava.spec.js'],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 250000
        //ivan dodao
        , onComplete: null
        , showColors: true
        , includeStackTrace: true
        // , print: function () {
        //
        // }

    },

    onPrepare: function(){
        browser.driver.manage().window().maximize();

    },

    // plugins: [{
    //     package: 'protractor-console',
    //     logLevels: ['severe']
    // }],
};
