

var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var Profile = require('../Page_Objects/Profile.js');

describe ("change profile picture", function(){
    // console.log("bla bla bla ");

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
    var profile = new Profile();
    var EC = protractor.ExpectedConditions;

    it ("bla bla bla ", function() {
        console.log("change profile picture");

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

        //klik za dodavanje slike
        browser.wait(EC.presenceOf(profile.editPicture), 5000);
        expect(profile.editPicture.isDisplayed()).toBeTruthy();
        profile.editPicture.click();

        browser.wait(EC.presenceOf(profile.closeButton), 5000);
        expect(profile.closeButton.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(profile.savePictureButton), 5000);
        expect(profile.savePictureButton.isDisplayed()).toBeTruthy();
        browser.sleep(1000);

        expect(element(by.css('[ng-show="vm.show_completion"]')).getText()).toEqual("Chose Your Profile Picture");
        expect(element(by.css('[ng-click="vm.save_profile_picture()"]')).getAttribute('value')).toEqual('Save profile picture');
        expect(element(by.css('[ng-click="vm.close_image_upload()"]')).getAttribute('value')).toEqual('Close');

        // TODO NACI NACIN ZA TESTIRANJE PROFILNE SLIKE

        //
        //
        // // profile.editPicture.click()
        //
        // browser.sleep(5000);
        //
        // //klik misem
        // // var plot0 = element(by.css('[data-dc-automation="profile-info-save-button"]'));
        // // browser.actions()
        // //     .mouseMove(plot0, {x: 100, y: 100}) // 100px from left, 100 px from top of plot0
        // //     .mouseDown()
        // //     .mouseMove({x: 400, y: 0}) // 400px to the right of current location
        // //     .perform();
        //
        //
        // // // /klik na TAB NA TASTATURI
        // // browser.actions().sendKeys(protractor.Key.TAB).perform();
        // // browser.sleep(1000);
        // // // /klik na TAB NA TASTATURI
        // // browser.actions().sendKeys(protractor.Key.TAB).perform();
        // // browser.sleep(1000);
        // // // /klik na TAB NA TASTATURI
        // // browser.actions().sendKeys(protractor.Key.TAB).perform();
        // // browser.sleep(1000);
        // // // /klik na TAB NA TASTATURI
        // // browser.actions().sendKeys(protractor.Key.TAB).perform();
        // // browser.sleep(1000);
        // // // /klik na TAB NA TASTATURI
        // // browser.actions().sendKeys(protractor.Key.TAB).perform();
        //
        // // browser.actions().sendKeys(protractor.Key.ENTER).perform();
        // //
        //
        //
        // // var path = require('path');
        // // it('should upload a file', function() {
        // //     var fileToUpload = '../home/ivan/Pictures',
        // //         absolutePath = path.resolve(__dirname, fileToUpload);
        // //
        // //     element(by.css('input[type="file"]')).sendKeys(absolutePath);
        // //     element(by.id('uploadButton')).click();
        // // });
        //
        //
        //
        // // var imagePath = 'http://placehold.it/120x120&text=image1';
        // // profile.savePictureButton.sendKeys(imagePath);
        //
        // // browser.sleep(6000);
        //
        //

    });
});
