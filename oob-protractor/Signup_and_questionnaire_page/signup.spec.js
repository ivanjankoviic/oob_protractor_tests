
/*

 * User has successfully completed registration
     * The user successfully sign up fulfilled all fields on the three pages and choose Mr for gender
     * The user successfully sign up fulfilled all fields on the three pages and choose Mrs for gender
     * The user successfully sign up fulfilled all fields on the three pages and choose Miss for gender
     * The user successfully sign up fulfilled all fields on the three pages and choose Mx for gender

 * User login failed
    * The user failed sign up because the user with that username already exist

 */

var SetupService = require('../setup_service.js');
var Config = require ('./../Config/config.js');
var UserSingUp = require ('../Page_Objects/UserSignup.js');
var UserSingUpTwo = require ('../Page_Objects/UserSignupTwo.js');
var UserSingUpThree = require ('../Page_Objects/UserSignupThree.js');

describe('User has successfully completed registration', function () {

    beforeEach(function (){
        browser.get(config.test_url_signup);
        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        browser.sleep(1000);

    });

    afterEach(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username2;
        setup_service.delete_user(uri)
    });
    var setup_service = new SetupService;
    var config = new Config();
    var userSignup = new UserSingUp();
    var userSignupTwo = new UserSingUpTwo();
    var userSignupThree = new UserSingUpThree();
    var dialog;
    var EC = protractor.ExpectedConditions;

    function getSelectedText(select) {
        return select.getAttribute('value')
            .then(function (i) {
                return select.element(by.css('option[value="' + i + '"]')).getText();
            });
    }


    it ('The user successfully sign up fulfilled all fields on the three pages and choose Mr for gender', function () {
        console.log('The user successfully sign up fulfilled all fields on the three pages and choose Mr for gender');

        // browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(0).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Mr');
        userSignup.firstName.sendKeys('User01');
        userSignup.lastName.sendKeys('Test01');
        userSignup.email.sendKeys(config.username2);
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('321');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.buttonNext), 5000);
        userSignupTwo.countryNubmer.sendKeys('+381');
        userSignupTwo.number.sendKeys('6464646464');
        userSignupTwo.homeTown.sendKeys('Beograd');
        userSignupTwo.birthdate.sendKeys('05/05/1985');
        userSignupTwo.language.get(0).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.language_chosen')))).toBe('English');
        browser.wait(EC.presenceOf(userSignupTwo.buttonNext2), 5000);
        userSignupTwo.buttonNext2.click();
        // userSignupThree.disclaimer.click();
        // userSignupThree.termsAndConditions.click();
        userSignupThree.buttonRegister.click();
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        expect(element(by.css('.popup-body span')).getText()).toEqual('You are successfully registered');
        dialog.click();

    });

    it ('The user successfully sign up fulfilled all fields on the three pages and choose Mrs for gender', function () {
        console.log('The user successfully sign up fulfilled all fields on the three pages and choose Mrs for gender');

        // browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(2).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Mrs');
        userSignup.firstName.sendKeys('User02');
        userSignup.lastName.sendKeys('Test02');
        userSignup.email.sendKeys(config.username2);
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('321');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.buttonNext), 5000);
        userSignupTwo.countryNubmer.sendKeys('+381');
        userSignupTwo.number.sendKeys('6464646464');
        userSignupTwo.homeTown.sendKeys('Beograd');
        userSignupTwo.birthdate.sendKeys('05/05/1985');
        userSignupTwo.language.get(0).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.language_chosen')))).toBe('English');
        browser.wait(EC.presenceOf(userSignupTwo.buttonNext2), 5000);
        userSignupTwo.buttonNext2.click();
        // userSignupThree.disclaimer.click();
        // userSignupThree.termsAndConditions.click();
        userSignupThree.buttonRegister.click();
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        expect(element(by.css('.popup-body span')).getText()).toBe('You are successfully registered');
        dialog.click();
    });

    it ('The user successfully sign up fulfilled all fields on the three pages and choose Miss for gender', function () {
        console.log('The user successfully sign up fulfilled all fields on the three pages and choose Miss for gender');

        // browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Miss');
        userSignup.firstName.sendKeys('User03');
        userSignup.lastName.sendKeys('Test03');
        userSignup.email.sendKeys(config.username2);
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('321');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.buttonNext), 5000);
        userSignupTwo.countryNubmer.sendKeys('+381');
        userSignupTwo.number.sendKeys('6464646464');
        userSignupTwo.homeTown.sendKeys('Beograd');
        userSignupTwo.birthdate.sendKeys('05/05/1985');
        userSignupTwo.language.get(0).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.language_chosen')))).toBe('English');
        browser.wait(EC.presenceOf(userSignupTwo.buttonNext2), 5000);
        userSignupTwo.buttonNext2.click();
        // userSignupThree.disclaimer.click();
        // userSignupThree.termsAndConditions.click();
        userSignupThree.buttonRegister.click();
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        expect(element(by.css('.popup-body span')).getText()).toBe('You are successfully registered');
        dialog.click();
    });

    it ('The user successfully sign up fulfilled all fields on the three pages and choose Mx for gender', function () {
        console.log('The user successfully sign up fulfilled all fields on the three pages and choose Mx for gender');

        // browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(3).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Mx');
        userSignup.firstName.sendKeys('User04');
        userSignup.lastName.sendKeys('Test04');
        userSignup.email.sendKeys(config.username2);
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('321');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.buttonNext), 5000);
        userSignupTwo.countryNubmer.sendKeys('+381');
        userSignupTwo.number.sendKeys('6464646464');
        userSignupTwo.homeTown.sendKeys('Beograd');
        userSignupTwo.birthdate.sendKeys('05/05/1985');
        userSignupTwo.language.get(0).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.language_chosen')))).toBe('English');
        browser.wait(EC.presenceOf(userSignupTwo.buttonNext2), 5000);
        userSignupTwo.buttonNext2.click();
        // userSignupThree.disclaimer.click();
        // userSignupThree.termsAndConditions.click();
        userSignupThree.buttonRegister.click();
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        expect(element(by.css('.popup-body span')).getText()).toBe('You are successfully registered');
        dialog.click();
    });

});

describe('User login failed', function () {

    var config = new Config();
    var userSignup = new UserSingUp();
    var userSignupTwo = new UserSingUpTwo();
    var userSignupThree = new UserSingUpThree();
    var dialog;
    var EC = protractor.ExpectedConditions;

    function getSelectedText(select) {
        return select.getAttribute('value')
            .then(function (i) {
                return select.element(by.css('option[value="' + i + '"]')).getText();
            });
    }

    beforeEach(function (){
        browser.get(config.test_url_signup);
        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        browser.sleep(1000);

    });

    it ('The user failed sign up because the user with that username already exist', function () {
        console.log('The user failed sign up because the user with that username already exist');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(0).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Mr');
        userSignup.firstName.sendKeys('User01');
        userSignup.lastName.sendKeys('Test01');
        userSignup.email.sendKeys('ivan@digitalcube.rs');
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('321');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.buttonNext), 5000);
        userSignupTwo.countryNubmer.sendKeys('+381');
        userSignupTwo.number.sendKeys('6464646464');
        userSignupTwo.homeTown.sendKeys('Beograd');
        userSignupTwo.birthdate.sendKeys('05/05/1985');
        userSignupTwo.language.get(0).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.language_chosen')))).toBe('English');
        browser.wait(EC.presenceOf(userSignupTwo.buttonNext2), 5000);
        userSignupTwo.buttonNext2.click();
        // userSignupThree.disclaimer.click();
        // userSignupThree.termsAndConditions.click();
        userSignupThree.buttonRegister.click();
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 10000);
        browser.sleep(200);
        expect(element(by.css('.popup-body span')).getText()).toEqual('User name is already taken');
        dialog.click();
    });

});