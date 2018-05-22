
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var Profile = require('../Page_Objects/Profile.js');

describe ("Connect OOB on Google fit", function(){
    console.log("Connect OOB on Google fit");

    // beforeAll(function (){
    //     // console.log('beforeAll');
    //     var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
    //             {
    //                 "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
    //             });
    //     setup_service.register_user(uri);
    // });
    //
    // afterAll(function (){
    //     // console.log('afterAll');
    //     var uri = config.backend_uri +"/avl/user?username="+config.username;
    //     setup_service.delete_user(uri)
    // });

    var setup_service = new SetupService;
    var config = new Config;
    var login = new Login();
    var calendar = new Calendar();
    var profile = new Profile();
    var EC = protractor.ExpectedConditions;

    it ("Enter to Profile page, then click on Connect Apps, Connect OOB on Google fit, check URL, back to OOB, adn check URL again ", function() {
        console.log("Enter to Profile page, then click on Connect Apps, Connect OOB on Google fit, check URL, back to OOB, adn check URL again ");
        browser.driver.sleep(1000);

        browser.get('https://m.ooblife.com/login');
        browser.driver.sleep(3000);

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('ivan@digitalcube.rs');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 5000);
        calendar.showMenuProfileButton.click();
        //klik na Connect Apps
        profile.connectApplications.click();

        //provera da li postoji element connect Strava
        expect(profile.connectStrava .isDisplayed()).toBeTruthy();
        //provera da li postoji element connect Google Fit
        expect(profile.connectGoogleFit.isDisplayed()).toBeTruthy();

        //klik na google fit
        profile.connectGoogleFit.click();

        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        expect(browser.getTitle()).toBe('Sign in - Google Accounts');
        expect(browser.isElementPresent(element(by.id("errorCode")))).toBe(false);

        //upis email-a u google polje
        element(by.id('identifierId')).sendKeys('ivan@digitalcube.rs');
        //klik na next
        element(by.id('identifierNext')).click();

        browser.sleep(1000);

        //upis password-a u google polje
        element(by.css('[type="password"]')).sendKeys('pfcpfcpfc');
        //klik na next
        element(by.id('passwordNext')).click();
        browser.sleep(1000);

        //klik na ALLOW
        element(by.id('submit_approve_access')).click();
        browser.sleep(1000);

        browser.ignoreSynchronization = false;

        //provara na kojoj se adresi nalazimo
        expect(browser.getCurrentUrl()).toContain('https://m.ooblife.com/profile/info');

        browser.waitForAngular();
        browser.refresh();
        browser.sleep(1000);

        //klik na Connect Apps
        profile.connectApplications.click();

        browser.wait(EC.presenceOf(profile.connectStrava), 5000);
        //provera da li postoji element connect Strava
        expect(profile.connectStrava.isDisplayed()).toBeTruthy();

        //TODO: ispraviti posle refresha skida konekciju sa google fit-a
        //provera da li postoji element connect Google Fit
        // expect(profile.disconnectGoogleFit.isDisplayed()).toBeTruthy();
        // browser.sleep(2000);


        // showMenuButton must have SLEEP-a!!!
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuLogoutButton), 5000);
        calendar.showMenuLogoutButton.click();
        browser.wait(EC.presenceOf(login.emailInput), 10000);

    });
});
