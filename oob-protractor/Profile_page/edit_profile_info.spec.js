
/*

* Checking elements on Profile Info page
    * Check whether the elements are visible on Profile Info page
    * Check whether the elements are visible on Profile Info page edit form
    * Edit profile information for Home Town on Profile Info page edit form
    * Edit profile information for Birthday on Profile Info page edit form
    * Edit profile information for Phone on Profile Info page edit form
    * Edit profile information for Gender on Profile Info page edit form

 */

var SetupService = require('./../setup_service.js');
var Config = require ('./../Config/config.js');
var Login = require('./../Page_Objects/Login.js');
var Calendar = require('./../Page_Objects/Calendar.js');
var Profile = require('./../Page_Objects/Profile.js');

describe ("Checking elements on Profile Info page", function(){

    beforeEach(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);

        browser.get(config.test_url);
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
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 5000);

    });

    afterEach(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username;
        setup_service.delete_user(uri)
    });

    var setup_service = new SetupService;
    var login = new Login();
    var calendar = new Calendar();
    var profile = new Profile();
    var config = new Config();
    var EC = protractor.ExpectedConditions;

    function getSelectedText(select) {
        return select.getAttribute('value')
            .then(function (i) {
                return select.element(by.css('option[value="' + i + '"]')).getText();
            });
    }

    it ("Edit profile information for Home Town on Profile Info page edit form", function() {
        console.log("Edit profile information for Home Town on Profile Info page edit form");

        browser.wait(EC.presenceOf(profile.editForm), 5000);
        profile.editForm.click();

        browser.wait(EC.presenceOf(profile.editHomeTown), 5000);
        profile.editHomeTown.clear();
        profile.editHomeTown.sendKeys('Beograd');

        browser.wait(EC.presenceOf(profile.saveForm), 5000);
        profile.saveForm.click();
        browser.sleep(300);
        browser.wait(EC.presenceOf(profile.homeTown), 5000);
        expect(profile.homeTown.getText()).toEqual('Beograd');

    });

    it ("Edit profile information for Birthday on Profile Info page edit form", function() {
        console.log("Edit profile information for Birthday on Profile Info page edit form");

        browser.wait(EC.presenceOf(profile.editForm), 5000);
        profile.editForm.click();

        browser.wait(EC.presenceOf(profile.editBirthDate), 5000);
        profile.editBirthDate.sendKeys('02/29/1984');
        browser.wait(EC.presenceOf(profile.saveForm), 5000);
        profile.saveForm.click();

        browser.sleep(300);
        browser.wait(EC.presenceOf(profile.birthDate), 5000);
        expect(profile.birthDate.getText()).toEqual('29. Feb 1984.');

    });

   it ("Edit profile information for Phone on Profile Info page edit form", function() {
        console.log("Edit profile information for Phone on Profile Info page edit form");

        browser.wait(EC.presenceOf(profile.editForm), 5000);
        profile.editForm.click();
        browser.wait(EC.presenceOf(profile.editPhone), 5000);
        profile.editPhone.clear();
       browser.sleep(100);
       profile.editPhone.sendKeys('+381 645899872');

        browser.wait(EC.presenceOf(profile.saveForm), 5000);
        profile.saveForm.click();

        browser.sleep(500);
        browser.wait(EC.presenceOf(profile.phone), 5000);
        expect(profile.phone.getText()).toEqual('+381 645899872');

    });

    it ("Edit profile information for Gender on Profile Info page edit form", function() {
        console.log("Edit profile information for Gender on Profile Info page edit form");

        browser.wait(EC.presenceOf(profile.editForm), 5000);
        profile.editForm.click();

        browser.wait(EC.presenceOf(profile.editGender), 5000);
        browser.sleep(500);

        profile.editGender.get(1).click();
        browser.sleep(300);
        expect(getSelectedText(element(by.model('vm.user_gender')))).toBe('Male');
        browser.wait(EC.presenceOf(profile.saveForm), 5000);
        profile.saveForm.click();

        browser.sleep(700);
        browser.wait(EC.presenceOf(profile.gender), 5000);
        expect(profile.gender.getText()).toEqual('male');

    });

    it ("Edit profile information for all inputs on Profile Info page edit form - male", function() {
        console.log("Edit profile information for all inputs on Profile Info page edit form");

        browser.wait(EC.presenceOf(profile.editForm), 10000);
        profile.editForm.click();

        browser.wait(EC.presenceOf(profile.editHomeTown), 5000);
        profile.editHomeTown.clear();
        profile.editHomeTown.sendKeys('Beograd');

        browser.wait(EC.presenceOf(profile.editBirthDate), 5000);
        profile.editBirthDate.sendKeys('04/04/1989');

        browser.wait(EC.presenceOf(profile.editPhone), 5000);
        profile.editPhone.clear();
        profile.editPhone.sendKeys('+381 646464644');

        element(by.css('[ng-model="vm.user_gender"]')).click();
        profile.editGender.get(1).click();
        browser.sleep(300);

        expect(getSelectedText(element(by.model('vm.user_gender')))).toBe('Male');

        browser.wait(EC.presenceOf(profile.saveForm), 5000);
        profile.saveForm.click();
        browser.sleep(500);

        browser.wait(EC.presenceOf(profile.homeTown), 5000);
        expect(profile.homeTown.getText()).toEqual('Beograd');
        browser.wait(EC.presenceOf(profile.birthDate), 5000);
        expect(profile.birthDate.getText()).toEqual('04. Apr 1989.');
        browser.wait(EC.presenceOf(profile.phone), 5000);
        expect(profile.phone.getText()).toEqual('+381 646464644');
        browser.wait(EC.presenceOf(profile.gender), 5000);
        expect(profile.gender.getText()).toEqual('male');
    });

    it ("Edit profile information for all inputs on Profile Info page edit form - female", function() {
        console.log("Edit profile information for all inputs on Profile Info page edit form");

        browser.wait(EC.presenceOf(profile.editForm), 5000);
        profile.editForm.click();

        browser.wait(EC.presenceOf(profile.editHomeTown), 5000);
        profile.editHomeTown.clear();
        profile.editHomeTown.sendKeys('Beograd123');

        browser.wait(EC.presenceOf(profile.editBirthDate), 5000);
        profile.editBirthDate.sendKeys('04/04/2050');

        browser.wait(EC.presenceOf(profile.editPhone), 5000);
        profile.editPhone.clear();
        profile.editPhone.sendKeys('+381 64-646-46-44');

        element(by.css('[ng-model="vm.user_gender"]')).click();
        profile.editGender.get(2).click();
        browser.sleep(300);

        expect(getSelectedText(element(by.model('vm.user_gender')))).toBe('Female');

        browser.wait(EC.presenceOf(profile.saveForm), 5000);
        profile.saveForm.click();
        browser.sleep(500);
        browser.wait(EC.presenceOf(profile.homeTown), 5000);
        expect(profile.homeTown.getText()).toEqual('Beograd123');
        browser.wait(EC.presenceOf(profile.birthDate), 5000);
        expect(profile.birthDate.getText()).toEqual('04. Apr 2050.');
        browser.wait(EC.presenceOf(profile.phone), 5000);
        expect(profile.phone.getText()).toEqual('+381 64-646-46-4');
        browser.wait(EC.presenceOf(profile.gender), 5000);
        expect(profile.gender.getText()).toEqual('female');

    });

    it ("Edit profile information for all inputs on Profile Info page edit form - xxx", function() {
        console.log("Edit profile information for all inputs on Profile Info page edit form");

        browser.wait(EC.presenceOf(profile.editForm), 5000);
        profile.editForm.click();

        browser.wait(EC.presenceOf(profile.editHomeTown), 5000);
        profile.editHomeTown.clear();
        profile.editHomeTown.sendKeys('@#%Beograd');

        browser.wait(EC.presenceOf(profile.editBirthDate), 5000);
        profile.editBirthDate.sendKeys('04/04/2017');

        browser.wait(EC.presenceOf(profile.editPhone), 5000);
        profile.editPhone.clear();
        profile.editPhone.sendKeys('+381 646464644');

        element(by.css('[ng-model="vm.user_gender"]')).click();
        profile.editGender.get(3).click();
        browser.sleep(300);

        expect(getSelectedText(element(by.model('vm.user_gender')))).toBe('Mx');

        browser.wait(EC.presenceOf(profile.saveForm), 5000);
        profile.saveForm.click();
        browser.sleep(500);
        browser.wait(EC.presenceOf(profile.homeTown), 5000);
        expect(profile.homeTown.getText()).toEqual('@#%Beograd');
        browser.wait(EC.presenceOf(profile.birthDate), 5000);
        expect(profile.birthDate.getText()).toEqual('04. Apr 2017.');
        browser.wait(EC.presenceOf(profile.phone), 5000);
        expect(profile.phone.getText()).toEqual('+381 646464644');
        browser.wait(EC.presenceOf(profile.gender), 5000);
        expect(profile.gender.getText()).toEqual('mx');

    });
});
