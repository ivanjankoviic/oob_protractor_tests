// /**
//  * Created by ivan on 13.4.17..
//  */
//
// var Config = require('../Config/config.js');
// var Login = require('../Page_Objects/LoginAdmin.js');
// var Calendar = require('../Page_Objects/Calendar.js');
//
// describe('User login', function () {
//
//     var config = new Config();
//     var login = new Login();
//     var calendar = new Calendar();
//     var EC = protractor.ExpectedConditions;
//
//     it ('Login User successfully, and check if  user entered the calendar', function () {
//         console.log('Login User successfully, and check if user entered the calendar');
//
//         browser.waitForAngular();
//         browser.get(config.test_url);
//
//         //provera TITLA
//         expect(browser.getTitle()).toBe('OOB Life');
//
//         browser.waitForAngular();
//         browser.wait(EC.presenceOf(login.emailInput), 10000);
//         login.emailInput.sendKeys('ivo@digitalcube.rs');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//
//         //provera da li se elementi nalaze na stranici
//         browser.waitForAngular();
//         browser.wait(EC.presenceOf(calendar.profilePictureButton), 5000);
//         expect(calendar.profilePictureButton.isDisplayed()).toBeTruthy();
//         browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
//         expect(calendar.showMenuButtonCalendar.isDisplayed()).toBeTruthy();
//
//         // nacin da se refresh-uje stranica ali hvata poslednju adresu na kojoj smo bili
//         browser.navigate().refresh();
//         // browser.refresh()
//
//         //provera da li se elementi nalaze na stranici
//         browser.waitForAngular();
//         browser.wait(EC.presenceOf(calendar.profilePictureButton), 20000);
//         expect(calendar.profilePictureButton.isDisplayed()).toBeTruthy();
//         browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
//         expect(calendar.showMenuButtonCalendar.isDisplayed()).toBeTruthy();
//                 // browser.sleep(2000)
//
//     });
// });
//
// describe('Checking if users is still logged on when we exit browser - ', function () {
//     console.log('Checking if users is still logged on when we exit browser - ');
//
//     var config = new Config();
//     var calendar = new Calendar();
//     var login = new Login();
//     var EC = protractor.ExpectedConditions;
//
//     it ('Login User directly on calendar, without login ', function () {
//         console.log('Login User directly on calendar, without login ');
//         browser.waitForAngular();
//         browser.get(config.test);
//         // browser.sleep(7000)
//
//         // provera da li se elementi nalaze na stranici
//         browser.waitForAngular();
//         browser.wait(EC.presenceOf(calendar.profilePictureButton), 5000);
//         expect(calendar.profilePictureButton.isDisplayed()).toBeTruthy();
//         browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
//         expect(calendar.showMenuButtonCalendar.isDisplayed()).toBeTruthy();
//
//         //provera TITLA
//         expect(browser.getTitle()).toBe('OOB Life');
//         // showMenuButton must have SLEEP-a!!!
//         browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
//         calendar.showMenuButton.click();
//         browser.wait(EC.presenceOf(calendar.showMenuLogoutButton), 5000);
//         calendar.showMenuLogoutButton.click();
//         browser.wait(EC.presenceOf(login.emailInput), 10000);
//         expect(browser.getCurrentUrl()).toContain(config.test_url);
//
//     });
// });

// /**
//  * Created by ivan on 13.4.17..
//  */
//
var Config = require('../Config/config.js');
var Login = require('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var SetupService = require('../setup_service.js');

describe('User login', function () {

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

    var config = new Config();
    var login = new Login();
    var calendar = new Calendar();
    var EC = protractor.ExpectedConditions;
    var setup_service = new SetupService;

    it ('Login User successfully, and check if  user entered the calendar', function () {
        console.log('Login User successfully, and check if user entered the calendar');

        // //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        //provera da li se elementi nalaze na stranici
        browser.waitForAngular();
        browser.wait(EC.presenceOf(calendar.profilePictureButton), 5000);
        expect(calendar.profilePictureButton.isDisplayed()).toBeTruthy();
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        expect(calendar.showMenuButtonCalendar.isDisplayed()).toBeTruthy();

        // nacin da se refresh-uje stranica ali hvata poslednju adresu na kojoj smo bili
        browser.navigate().refresh();
        // browser.refresh()

        //provera da li se elementi nalaze na stranici
        browser.waitForAngular();
        browser.wait(EC.presenceOf(calendar.profilePictureButton), 20000);
        expect(calendar.profilePictureButton.isDisplayed()).toBeTruthy();
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        expect(calendar.showMenuButtonCalendar.isDisplayed()).toBeTruthy();
                // browser.sleep(2000)

    });

    it ('Login User directly on calendar, without login ', function () {
        console.log('Login User directly on calendar, without login ');

        browser.get(config.test);

        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        // provera da li se elementi nalaze na stranici
        browser.waitForAngular();
        browser.wait(EC.presenceOf(calendar.profilePictureButton), 5000);
        expect(calendar.profilePictureButton.isDisplayed()).toBeTruthy();
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        expect(calendar.showMenuButtonCalendar.isDisplayed()).toBeTruthy();

        //provera TITLA
        expect(browser.getTitle()).toBe('OOB Life');
        browser.sleep(1000);
        // showMenuButton must have SLEEP-a!!!
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuLogoutButton), 5000);
        calendar.showMenuLogoutButton.click();
        browser.wait(EC.presenceOf(login.emailInput), 10000);
        expect(browser.getCurrentUrl()).toContain(config.test_url);

    });
});

