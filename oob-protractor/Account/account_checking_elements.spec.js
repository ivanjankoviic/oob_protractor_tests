var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var Account = require('../Page_Objects/Account.js');


describe ("Checking elements on Account", function(){
    console.log("Checking elements on Account");

    beforeAll(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);
    });

    afterAll(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username;
        setup_service.delete_user(uri)
    });

    var setup_service = new SetupService;
    var config = new Config;
    var login = new Login();
    var calendar = new Calendar();
    var account = new Account();
    var EC = protractor.ExpectedConditions;

    it ("Checking elements on Account", function() {

        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 15000);
        //upis u polje Email
        login.emailInput.sendKeys(config.username);
        //upis u polje Password
        login.passwordInput.sendKeys('123');
        //klik na login dugme
        login.buttonLogin.click();

        //nacin da se saceka element(crveni krstic)
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(500);

        // klik na show Menu Button
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        calendar.showMenuButtonCalendar.click();

        //klik na account dugme
        browser.wait(EC.presenceOf(calendar.accountButton), 5000);
        calendar.accountButton.click();

        browser.wait(EC.presenceOf(account.payment), 10000);

        expect(account.payment.getText()).toEqual('Payments');

        expect(account.disclamer.getText()).toEqual('Disclamer');

        expect(account.paymentInfoText.getText()).toEqual('Thank you! Keep up with good training!');

        expect(account.paymentReceipts.getText()).toEqual('Receipts');

        account.disclamer.click();

        expect(account.disclamerTitle.getText()).toEqual('Training Course Disclaimer');

        expect(account.disclclamerInfoText.getText()).toContain('I solely am responsible for my participation in the training course, including that');

    });
});
