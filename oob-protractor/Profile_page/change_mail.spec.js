//
// /*
//     - Change email in profile page
//         - login user
//         - go to email settings
//         - check if all elements are present
//             - check if present email is correct, placeholders and their text is correct
//         - check is summary boxes are checked and unchecked
//         - test different combinations of username and password and check alert messages
//             - Try with wrong password
//             - check with correct password and email without @
//             - check without password
//             - check without email
//             - check with non existing email
//             - check with correct password and email with two @
//             - check with correct password and email
//                 - check if user is sent to login page
//
//  IMPORTANT: CHECK MANUALLY IF CHANGE REQUEST IS SENT TO EMAIL THAT IS SPECIFIED IN TEST, AND IF YOU CAN LOGIN WITH NEW EMAIL!
//  THERE ARE SOME LINES (CASES) THAT SHOULD BE UNCOMMENTED WHEN BUGS ARE CORRECTED
//  FROM STAGING EMAIL WAS NOT SENT EVEN IF POSITIVE ALERT WAS DISPLAYED
//
// */


var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var Profile = require('../Page_Objects/Profile.js');




describe ("Change email test", function() {
    console.log("Change email test");


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

    it("Enter email settings and check if elements are present", function () {
        console.log("Enter email settings and check if elements are present");

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

        // Click on email settings
        expect(profile.email.isDisplayed()).toBeTruthy();
        profile.email.click();

        // Scroll to bottom
        browser.executeScript("document.querySelector('" + 'ion-content[data-dc-automation="profile-menu-scroll"]' + "').scrollTop = document.querySelector('" + 'ion-content[data-dc-automation="profile-menu-scroll"]' + "').scrollHeight;");

        // Check if elements are present
        browser.wait(EC.presenceOf(profile.saveEmailButton), 5000);

        expect(profile.profileInfoUsermail.getText()).toEqual(config.username);

        expect(profile.oldPasswordEmail.isDisplayed()).toBeTruthy();
        expect(profile.newEmail.isDisplayed()).toBeTruthy();
        expect(profile.saveEmailButton.isDisplayed()).toBeTruthy();

        // Check text in placeholder
        profile.oldPasswordEmail.getAttribute('placeholder').then(function (element) {
            expect(element).toEqual('Enter password to confirm');
        });

        profile.newEmail.getAttribute('placeholder').then(function (element) {
            expect(element).toEqual('Enter New E-mail');
        });

    });
        it("Check checkboxes ", function () {
            console.log("Check checkboxes");

        // check Summary checkboxes
        expect(profile.summaryReceive.getText()).toEqual('I Would Like to Receive Summary:');

        expect(profile.dailySummary.isDisplayed()).toBeTruthy();
        expect(profile.dailySummary.getText()).toEqual('Daily');

        expect(profile.weeklySummary.isDisplayed()).toBeTruthy();
        expect(profile.weeklySummary.getText()).toEqual('Weekly');

        // Check if both checkboxes are not checked
        expect(element(by.css('[ng-checked="vm.logged_user.notify_daily"]:checked')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="vm.logged_user.notify_weekly"]:checked')).isSelected()).toBeTruthy();

        // click on summary checkboxes
        profile.dailySummary.click();
        profile.weeklySummary.click();

        // check if boxes are checked
        expect(element(by.css('[ng-checked="vm.logged_user.notify_daily"]:checked')).isPresent()).toBeFalsy();
        expect(element(by.css('[ng-checked="vm.logged_user.notify_weekly"]:checked')).isPresent()).toBeFalsy();


        // check if daily box is checked and weekly box is unchecked
        profile.weeklySummary.click();

        expect(element(by.css('[ng-checked="vm.logged_user.notify_daily"]:checked')).isPresent()).toBeFalsy();
        expect(element(by.css('[ng-checked="vm.logged_user.notify_weekly"]:checked')).isSelected()).toBeTruthy();

        //check if daily box is unchecked and daily box checked
        profile.dailySummary.click();
        profile.weeklySummary.click();

        expect(element(by.css('[ng-checked="vm.logged_user.notify_daily"]:checked')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="vm.logged_user.notify_weekly"]:checked')).isPresent()).toBeFalsy();

    });

    it("Try with different combinations of email and password", function () {
        console.log("Try with different combinations of email and password");

        // Try with wrong password (1)
        profile.oldPasswordEmail.sendKeys('45677');
        profile.newEmail.sendKeys('user11119@test.digitalcube.rs');

        // click save button
        profile.saveEmailButton.click();
        browser.sleep(500);
        // check alert
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Error');
        expect(element(by.css(".popup-body")).getText()).toEqual('Wrong password');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();

        browser.sleep(200);
        //clear fields
        profile.oldPasswordEmail.clear();
        profile.newEmail.clear();


        // CHECK WITH CORRECT PASSWORD AND EMAIL WITHOUT @ (2)
        profile.oldPasswordEmail.sendKeys('123');
        profile.newEmail.sendKeys('user11119test.digitalcube.rs');

        profile.saveEmailButton.click();
        browser.sleep(500);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Error');
        expect(element(by.css(".popup-body")).getText()).toEqual('Enter New E-mail');
        //click OK button and clear fields
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();

        browser.sleep(200);
        profile.oldPasswordEmail.clear();
        profile.newEmail.clear();


        //CHECK WITHOUT PASSWORD (3)
        profile.newEmail.sendKeys('user11119@test.digitalcube.rs');

        profile.saveEmailButton.click();
        browser.sleep(500);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Error');
        expect(element(by.css(".popup-body")).getText()).toEqual('Enter Password');
        //click OK button and clear fields
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();

        browser.sleep(200);
        profile.oldPasswordEmail.clear();
        profile.newEmail.clear();


        // //CHECK WITHOUT EMAIL (4)
        profile.oldPasswordEmail.sendKeys('123');

        profile.saveEmailButton.click();
        browser.sleep(500);
        // // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Error');
        expect(element(by.css(".popup-body")).getText()).toEqual('Enter New E-mail');
        //click OK button and clear fields
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.sleep(200);

        profile.oldPasswordEmail.clear();
        profile.newEmail.clear();


        //CHECK WITH CORRECT PASSWORD AND EMAIL WITH TWO @ (6)
        profile.oldPasswordEmail.sendKeys('123');
        profile.newEmail.sendKeys('user11119@@test.digitalcube.rs');

        profile.saveEmailButton.click();
        browser.sleep(500);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Error');
        expect(element(by.css(".popup-body")).getText()).toEqual('Enter New E-mail');
        // click OK button and clear fields
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();

        browser.sleep(200);
        profile.oldPasswordEmail.clear();
        profile.newEmail.clear();


        //CHECK CORRECT PASSWORD AND EMAIL (7)
        profile.oldPasswordEmail.sendKeys('123');
        profile.newEmail.sendKeys('user11119@test.digitalcube.rs');

        // click save button
        profile.saveEmailButton.click();
        browser.sleep(500);
        // check alert
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Email message with change confirmation is sent to your new address. Please confirm email change!');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();

        browser.sleep(500);
        //check if sent back to login
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        expect(login.emailInput.isDisplayed()).toBeTruthy();

    });
});