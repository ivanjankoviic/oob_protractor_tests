
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var Profile = require('../Page_Objects/Profile.js');

describe ("check user connection on STRAVA", function(){
    // console.log("check user connection on STRAVA");

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

    it ("Enter to Profile page, then click on Connect Apps, Connect OOB on Strava, check URL, back to OOB, adn check URL again ", function() {
        console.log("Enter to Profile page, then click on Connect Apps, Connect OOB on Google fit, check URL, back to OOB, adn check URL again ");

        // //login
        // browser.get(config.test_url);
        browser.get('https://m.ooblife.com/login');
        browser.sleep(2000);
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

        //klik na stravu
        profile.connectStrava.click();

        browser.sleep(2000);
        browser.ignoreSynchronization = true;
        expect(browser.getCurrentUrl()).toContain('https://www.strava.com/login');
        expect(browser.getTitle()).toBe('Log In | Strava');

        //klik na 'Log in using Google'
        browser.driver.findElement(by.id('email')).sendKeys('ivan@digitalcube.rs');
        browser.driver.findElement(by.id('password')).sendKeys('isj501');

        browser.driver.findElement(by.id('login-button')).click();

        browser.sleep(2000);
        browser.driver.findElement(by.xpath('//button[contains(.,"Authorize")]')).click();

        // browser.ignoreSynchronization = false;
        // browser.waitForAngular();


        //Nacin da se proveri tekst da li je uspesno konektovan na STRAV-u
        browser.wait(EC.presenceOf(element(by.css('.popup-body span'))), 5000);
        expect(element(by.css('.popup-body span')).getText()).toBe('Strava account successfully connected, please wait for 3-5 minutes to see connected events');
        browser.sleep(1000);
        element(by.css('[ng-click="$buttonTapped(button, $event)"]')).click();

        browser.ignoreSynchronization = false;
        browser.waitForAngular();

        browser.refresh();
        //
        browser.sleep(2000);

        //provera da li postoji element connect Strava
        browser.wait(EC.presenceOf(profile.connectApplications), 5000);

        //klik na Connect Apps
        profile.connectApplications.click();

        browser.sleep(500);

        browser.wait(EC.presenceOf(profile.disconnectStrava), 5000);
        //provera da li postoji element connect Strava
        expect(profile.disconnectStrava.isDisplayed()).toBeTruthy();
        //provera da li postoji element connect Google Fit
        expect(profile.connectGoogleFit.isDisplayed()).toBeTruthy();
        browser.sleep(500);

        profile.disconnectStrava.click();
        browser.sleep(500);
        browser.wait(EC.presenceOf(profile.connectStrava), 5000);

        //provera da li postoji element connect Google Fit
        expect(profile.connectGoogleFit.isDisplayed()).toBeTruthy();
        expect(profile.connectStrava.isDisplayed()).toBeTruthy();


        // showMenuButton must have SLEEP-a!!!
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuLogoutButton), 5000);
        calendar.showMenuLogoutButton.click();
        browser.wait(EC.presenceOf(login.emailInput), 10000);

    });
});
