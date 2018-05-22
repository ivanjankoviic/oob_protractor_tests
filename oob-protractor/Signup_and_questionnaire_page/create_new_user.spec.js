/**
 * Created by ivan on 2.8.17..
 */
var SetupService = require('../setup_service.js');
var Config = require ('./../Config/config.js');
var UserSingUp = require ('../Page_Objects/UserSignup.js');
var UserSingUpTwo = require ('../Page_Objects/UserSignupTwo.js');
var UserSingUpThree = require ('../Page_Objects/UserSignupThree.js');
var Login = require ('../Page_Objects/Login.js');
var Questionnaire = require ('../Page_Objects/Questionnaire.js');
var QuestionnaireCyclist = require ('../Page_Objects/QuestionnaireCyclist.js');
var Introduction = require ('../Page_Objects/Introduction.js');
var Calendar = require('../Page_Objects/Calendar.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');

describe('User has successfully completed registration', function () {

    // beforeEach(function (){
    //     browser.get(config.test_url_signup);
    // });

    afterAll(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username3;
        setup_service.delete_user(uri)
    });


    var setup_service = new SetupService;
    var config = new Config();
    var userSignup = new UserSingUp();
    var userSignupTwo = new UserSingUpTwo();
    var userSignupThree = new UserSingUpThree();
    var dialog;
    var EC = protractor.ExpectedConditions;
    var questionnaire = new Questionnaire();
    var introduction = new Introduction();
    var calendar = new Calendar();
    var createEvent = new CreateEvent();

    function getSelectedText(select) {
        return select.getAttribute('value')
            .then(function (i) {
                return select.element(by.css('option[value="' + i + '"]')).getText();
            });
    }

    it ('The user successfully sign up fulfilled all fields on the three pages and choose Mr for gender', function () {
        console.log('The user successfully sign up fulfilled all fields on the three pages and choose Mr for gender');

        browser.get(config.test_url_signup);

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        // browser.sleep(1000);
        expect(userSignup.gender.getText()).toEqual([ 'Mr', 'Miss', 'Mrs', 'Mx' ]);
        expect(userSignup.firstName.getAttribute('placeholder')).toEqual('First Name');
        expect(userSignup.lastName.getAttribute('placeholder')).toEqual('Last Name');
        expect(userSignup.email.getAttribute('placeholder')).toEqual('Email');
        expect(userSignup.password.getAttribute('placeholder')).toEqual('Password');
        expect(userSignup.repeatPassword.getAttribute('placeholder')).toEqual('Repeat Password');

        userSignup.gender.get(0).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Mr');
        userSignup.gender.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Miss');
        userSignup.gender.get(2).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Mrs');
        userSignup.gender.get(3).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Mx');

        userSignup.firstName.sendKeys('User17');
        userSignup.lastName.sendKeys('Test17');

        userSignup.email.sendKeys(config.username3);
        userSignup.password.sendKeys('123');
        userSignup.repeatPassword.sendKeys('123');
        userSignup.buttonNext.click();

        //druga strana
        browser.wait(EC.presenceOf(userSignup.buttonNext), 5000);
        expect(userSignupTwo.countryNubmer.getAttribute('placeholder')).toEqual('+999');
        expect(userSignupTwo.number.getAttribute('placeholder')).toEqual('Phone Number');
        expect(userSignupTwo.homeTown.getAttribute('placeholder')).toEqual('Home Town');
        expect(userSignupTwo.birthdate.getAttribute('placeholder')).toEqual('date');
        expect(userSignupTwo.language.getText()).toEqual([ 'English', 'Danish', 'Spanish' ]);

        userSignupTwo.countryNubmer.sendKeys('+381');
        userSignupTwo.number.sendKeys('0641234567');
        userSignupTwo.homeTown.sendKeys('Beograd');
        userSignupTwo.birthdate.sendKeys('05/05/1985');

        userSignupTwo.language.get(0).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.language_chosen')))).toBe('English');
        userSignupTwo.language.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.language_chosen')))).toBe('Danish');
        userSignupTwo.language.get(2).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.language_chosen')))).toBe('Spanish');

        browser.wait(EC.presenceOf(userSignupTwo.buttonNext2), 5000);
        userSignupTwo.buttonNext2.click();

        //treca strana
        browser.wait(EC.presenceOf(userSignupThree.buttonRegister), 5000);

        expect(element(by.css('.signup-item.disclaimer-item')).getText()).toEqual("I hereby confirm that I have read and understood Training Course Disclamer and that I agree to the participation in the training course entirely at my own risk and responsibility.");
        expect(element(by.css('[ng-include="vm.disclaimer2_tpl"]')).getText()).toEqual("I hereby confirm that I have read and understood the terms under which OOB has authorization to Collect Data, for the purpose of development of training programs, statistics and advertising.");

        userSignupThree.buttonRegister.click();
        browser.sleep(500);
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        expect(element(by.css('.popup-body span')).getText()).toEqual('You are successfully registered');
        dialog.click();

        browser.sleep(500);

        questionnaire.athleteRunner.getAttribute('checked').then(function(value) {
            expect(value).toBe(null);
        });
        questionnaire.athleteCyclist.getAttribute('checked').then(function(value) {
            expect(value).toBe(null);
        });
        questionnaire.athleteTriathlete.getAttribute('checked').then(function(value) {
            expect(value).toBe(null);
        });

        questionnaire.athleteCyclist.click();
        questionnaire.athleteRunner.getAttribute('checked').then(function(value) {
            expect(value).toBe(null);
        });
        questionnaire.athleteCyclist.getAttribute('checked').then(function(value) {
            expect(value).toBe('true');
        });
        questionnaire.athleteTriathlete.getAttribute('checked').then(function(value) {
            expect(value).toBe(null);
        });

        questionnaire.athleteTriathlete.click();
        questionnaire.athleteRunner.getAttribute('checked').then(function(value) {
            expect(value).toBe(null);
        });
        questionnaire.athleteCyclist.getAttribute('checked').then(function(value) {
            expect(value).toBe(null);
        });
        questionnaire.athleteTriathlete.getAttribute('checked').then(function(value) {
            expect(value).toBe('true');
        });

        expect(element(by.css('[for="runner"]')).getText()).toEqual('Soy Corredor.');
        expect(element(by.css('[for="cyclist"]')).getText()).toEqual('Soy Ciclista.');
        expect(element(by.css('[for="triathlete"]')).getText()).toEqual('Soy Triatleta.');
        expect(element(by.css('.signup-item.title')).getText()).toEqual('¿Qué tipo de atleta eres?');

        questionnaire.athleteCyclist.click();
        browser.sleep(300);
        element(by.css('[ng-click="vm.go_to()"]')).click();
        browser.sleep(500);

        expect(element(by.css('[for="grand-fondos"]')).getText()).toEqual('Gran Fondos');
        expect(element(by.css('[for="criterium"]')).getText()).toEqual('Criterium');
        expect(element(by.css('[for="other"]')).getText()).toEqual('Otro tipo de carrera');

        questionnaire.updateProfile.click();
        browser.driver.sleep(500);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();
        browser.sleep(500);
        introduction.X_close_introduction.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(0);
        calendar.buttonAddEvent.click();

    });
});