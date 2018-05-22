
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var Profile = require('../Page_Objects/Profile.js');




describe ("Change password test", function(){
// console.log("Change password test");

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

    var setup_service = new SetupService();
    var config = new Config();
    var login = new Login();
    var calendar = new Calendar();
    var profile = new Profile();
    var EC = protractor.ExpectedConditions;

    it ("Enter password settings", function() {
        console.log("Enter password settings");

        // //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 5000);
        calendar.showMenuProfileButton.click();

        // Click on Password settings
        expect(profile.password.isDisplayed()).toBeTruthy();
        profile.password.click();

        // Check if elements are present
        // browser.sleep(1000);
        browser.wait(EC.presenceOf(profile.oldPassword), 5000);
        expect(profile.oldPassword.isDisplayed()).toBeTruthy();
        expect(profile.newPassword.isDisplayed()).toBeTruthy();
        expect(profile.retypePassword.isDisplayed()).toBeTruthy();
        expect(profile.savePasswordButton.isDisplayed()).toBeTruthy();

        //provera texta u placeholder-u
        profile.oldPassword.getAttribute('placeholder').then(function (element) {
            expect(element).toEqual('Enter Old Password');
        });

        profile.newPassword.getAttribute('placeholder').then(function (element) {
            expect(element).toEqual('Enter New Password');
        });

        profile.retypePassword.getAttribute('placeholder').then(function (element) {
            expect(element).toEqual('Retype New Password');
        });
    });
        it ("Try with wrong password", function() {
            console.log("Try with wrong password");

        // Try with wrong password
        profile.oldPassword.sendKeys('456');
        profile.newPassword.sendKeys('321');
        profile.retypePassword.sendKeys('321');
        //click save button
        element(by.css('[data-dc-automation="profile-info-save-password"]')).click();
        browser.sleep(500);

        // check alert
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Error');
            expect(element(by.css(".popup-body")).getText()).toEqual('Wrong password');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();

        //clear fields
        profile.oldPassword.clear();
        profile.newPassword.clear();
        profile.retypePassword.clear();

        // Try with correct password but not to match new password and retype password
        profile.oldPassword.sendKeys('123');
        profile.newPassword.sendKeys('3213');
        profile.retypePassword.sendKeys('321');

        // click save button
        element(by.css('[data-dc-automation="profile-info-save-password"]')).click();
        browser.sleep(500);
        // check alert
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Error');
        expect(element(by.css(".popup-body")).getText()).toEqual('Please repeat the password');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();

        //clear fields
        profile.oldPassword.clear();
        profile.newPassword.clear();
        profile.retypePassword.clear();

        });

        it ("Try with correct password", function() {
           console.log("Try with correct password");

        // Try with right password
        profile.oldPassword.sendKeys('123');
        profile.newPassword.sendKeys('321');
        profile.retypePassword.sendKeys('321');

        //click save button
        element(by.css('[data-dc-automation="profile-info-save-password"]')).click();
        browser.sleep(500);
        // check alert
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Password successfully changed!');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();

        });

        it ("Check if change was successful", function() {
            console.log("Check if change was successful");

            browser.sleep(500);
            // click na logout
            browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
            calendar.showMenuButton.click();
            browser.wait(EC.presenceOf(calendar.showMenuLogoutButton), 5000);
            calendar.showMenuLogoutButton.click();

            // login with changed password
            browser.wait(EC.presenceOf(login.emailInput), 5000);
            //upis u polje Email
            login.emailInput.sendKeys(config.username);
            //upis u polje Email
            login.passwordInput.sendKeys('321');
            //klik na login
            login.buttonLogin.click();

            browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        });

});



