/**
 * Created by ivan on 8.1.18..
 */
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var Account = require('../Page_Objects/Account.js');


describe ("Checking route for user payments", function(){
    console.log("Checking route for user payments");

    // beforeAll(function (){
    //     // console.log('beforeAll');
    //     var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
    //             {
    //                 "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
    //             });
    //     setup_service.register_user(uri);
    // });
    //
    afterAll(function (){
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');

        // browser.driver.sleep(2000);
    });

    var setup_service = new SetupService;
    var config = new Config;
    var login = new Login();
    var calendar = new Calendar();
    var account = new Account();
    var EC = protractor.ExpectedConditions;

    it ("Checking route for user payments", function() {

        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 15000);
        //upis u polje Email
        login.emailInput.sendKeys('gihsbpmg1@gmail.com');
        //upis u polje Password
        login.passwordInput.sendKeys('123');
        //klik na login dugme
        login.buttonLogin.click();

        browser.driver.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual('http://localhost:9910/account/payments');

        expect(element(by.css('.warning-text')).getText()).toBe("Well… It looks like your account has been temporarily blocked. Please be a pal and sort it out.");

        element(by.css('[on-tap="vm.go_to_payment()"]')).click();
        browser.driver.sleep(700);

        expect(element(by.css('.billing-title')).getText()).toBe("RELLENA LOS DATOS DE FACTURACIÓN");

        // browser.executeScript('window.scrollTo(0,0);').then(function () {
        //     element(by.css('[on-tap="vm.pay()"]')).click();
        // })
        browser.driver.sleep(300);



    });
});
