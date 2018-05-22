var SetupService = require('../setup_service.js');
var Config = require ('./../Config/config.js');
var UserSingUp = require ('../Page_Objects/UserSignup.js');
var UserSingUpTwo = require ('../Page_Objects/UserSignupTwo.js');
var UserSingUpThree = require ('../Page_Objects/UserSignupThree.js');
var Questionnaire = require ('../Page_Objects/Questionnaire.js');
var QuestionnaireCyclist = require ('../Page_Objects/QuestionnaireCyclist.js');
var Inroduction = require ('../Page_Objects/Introduction.js');

var Calendar = require ('../Page_Objects/Calendar.js');

describe('Check introduction', function () {

    beforeEach(function (){
        browser.get(config.test_url_signup);
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
    var introduction = new Inroduction();
    var dialog;
    var EC = protractor.ExpectedConditions;
    var questionnaire = new Questionnaire();
    var errordialog;

    function getSelectedText(select) {
        return select.getAttribute('value')
            .then(function (i) {
                return select.element(by.css('option[value="' + i + '"]')).getText();
            });
    }


    it ('Check introduction', function () {
        console.log('Check introduction');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        // userSignup.gender.get(0).click();
        // expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Mr');
        userSignup.firstName.sendKeys('User01');
        userSignup.lastName.sendKeys('Test01');
        userSignup.email.sendKeys(config.username2);
        // browser.sleep(2500);
        userSignup.password.sendKeys('123');
        userSignup.repeatPassword.sendKeys('123');
        userSignup.buttonNext.click();
        browser.sleep(200);
        // browser.wait(EC.presenceOf(userSignup.buttonNext), 5000);
        // userSignupTwo.countryNubmer.sendKeys('+381');
        // userSignupTwo.number.sendKeys('6464646464');
        // userSignupTwo.homeTown.sendKeys('Beograd');
        // userSignupTwo.birthdate.sendKeys('05/05/1985');
        // userSignupTwo.language.get(0).click();
        // expect(getSelectedText(element(by.model('vm.dcm.signup.language_chosen')))).toBe('English');
        browser.wait(EC.presenceOf(userSignupTwo.buttonNext2), 5000);
        userSignupTwo.buttonNext2.click();
        //skonjeni su check box button-i
        // userSignupThree.disclaimer.click();
        // userSignupThree.termsAndConditions.click();
        browser.sleep(200);
        userSignupThree.buttonRegister.click();
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        // expect(element(by.css('.popup-body span')).getText()).toEqual('You are successfully registered');
        dialog.click();

        browser.wait(EC.presenceOf(questionnaire.athleteRunner), 5000);
        questionnaire.athleteRunner.click();
        browser.wait(EC.presenceOf(questionnaire.buttonNext), 5000);
        questionnaire.buttonNext.click();

        questionnaire.updateProfile.click();

        browser.driver.sleep(500);

        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        expect(element(by.css('.popup-body span')).getText()).toEqual('Profile updated');
        errordialog.click();


        // browser.driver.sleep(500);
        browser.wait(EC.presenceOf(element(by.css('[on-tap="vm.got_it()"]'))), 5000);

        expect(element(by.css('.intro-title')).getText()).toEqual('Help OOB life help you!');
        expect(element(by.css('.intro-text')).getText()).toEqual('Get the most out of your personal coach. When you connect OOB life account to these apps your coach will be able to automatically track all your training and daily activity.');
        expect(element(by.css('[data-dc-automation="text-1.0"]')).getText()).toEqual('1.0 Under your Profile | Info, scroll to find Connect Apps section.');
        expect(element(by.css('.intro-instruction ')).getText()).toEqual("Don't have the apps? You can download here:");

        element(by.css('[on-tap="vm.got_it()"]')).click();


        browser.driver.sleep(500);
        browser.wait(EC.presenceOf(element(by.css('.intro-nav-close'))), 5000);
        expect(element(by.binding("'yourPersonalPlan' | translate")).getText()).toEqual('Your personal plan!');
        expect(element(by.binding("'thisIsYourPersonalTraining' | translate")).getText()).toEqual('This is your personal training plan created by your coach.');
        expect(element(by.binding("'yourPlanIsDesigned' | translate")).getText()).toEqual('2.0 Your plan is designed according to your current fitness level and your goals.');

        browser.driver.sleep(1000);

        // introduction.nav_right.click();
        // element(by.css('[on-tap="vm.next_view()"]')).click();
        // element(by.css('[data-dc-automation="introduction-nav-right"]')).click();
        // browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollHeight;");

        // var mumbaiCity = element(by.css('[on-tap="vm.got_it()"]'))
        // browser.actions().mouseMove(mumbaiCity).click().perform();





        // browser.executeScript('window.scrollTo(0,0);').then(function () {
        //     browser.driver.sleep(3000);
        //
        //     element(by.css('[on-tap="vm.got_it()"]')).click();
        // })
        //
        // browser.driver.sleep(3000);

    });

});