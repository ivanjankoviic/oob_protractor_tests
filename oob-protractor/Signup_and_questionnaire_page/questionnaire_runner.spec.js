
/*
 * Not logged user filling out questionnaire for Runner
     * Not logged user filling out questionnaire for Runner - 5km
     * Not logged user filling out questionnaire for Runner - 10km
     * Not logged user filling out questionnaire for Runner - Marathon
     * Not logged user filling out questionnaire for Runner - Halfmarathon
     * Not logged user filling out questionnaire for Runner - Other
     * Without a completed questionnaire not logged user click on the button next

 * Logged user filling out questionnaire for Runner
     * Logged user filling out questionnaire for Runner - 5km
     * Logged user filling out questionnaire for Runner - 10km
     * Logged user filling out questionnaire for Runner - Marathon
     * Logged user filling out questionnaire for Runner - Halfmarathon
     * Logged user filling out questionnaire for Runner - Other
     * Without a completed questionnaire logged user click on the button next

 */
var Config = require ('./../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var Questionnaire = require ('../Page_Objects/Questionnaire.js');
var QuestionnaireRunner = require ('../Page_Objects/QuestionnaireRunner.js');
var Introduction = require ('../Page_Objects/Introduction.js');
var SetupService = require('../setup_service.js');
var EventAdd = require('../Page_Objects/AddEvent.js');


describe('Not logged user filling out questionnaire for Runner', function () {

    var config = new Config();
    var questionnaire = new Questionnaire();
    var questionnaireRunner = new QuestionnaireRunner();
    var errordialog;
    var EC = protractor.ExpectedConditions;

    beforeEach(function (){
        browser.get(config.test_url_questionnaire);
        questionnaire.athleteRunner.click();
        questionnaire.buttonNext.click();
        browser.wait(EC.presenceOf(questionnaireRunner.fiveKm), 5000);
        browser.sleep(1000);
    });

    it ('Not logged user filling out questionnaire for Runner - 5km', function(){
        console.log('Not logged user filling out questionnaire for Runner - 5km');

        // browser.wait(EC.presenceOf(questionnaireRunner.fiveKm), 5000);
        questionnaireRunner.fiveKm.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
            browser.sleep(300);
            expect(race_div[0].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-27');
            expect(race_div[0].element(by.model('race[1]')).getAttribute('value')).toEqual('Belgrade marathon');
        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
            browser.sleep(300);
            expect(race_div[1].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-18');
            expect(race_div[1].element(by.model('race[1]')).getAttribute('value')).toEqual('Belgrade marathon');
        });
        // questionnaire.level1.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();
    });

    it ('Not logged user filling out questionnaire for Runner - 10km', function(){
        console.log('Not logged user filling out questionnaire for Runner - 10km');

        // browser.wait(EC.presenceOf(questionnaireRunner.tenKm), 5000);
        questionnaireRunner.tenKm.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        // questionnaire.level2.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();
    });

    it ('Not logged user filling out questionnaire for Runner - Marathon', function(){
        console.log('Not logged user filling out questionnaire for Runner - Marathon');

        // browser.wait(EC.presenceOf(questionnaireRunner.marathon), 5000);
        questionnaireRunner.marathon.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        // questionnaire.level3.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();
    });

    it ('Not logged user filling out questionnaire for Runner - Halfmarathon', function(){
        console.log('Not logged user filling out questionnaire for Runner - Halfmarathon');

        // browser.wait(EC.presenceOf(questionnaireRunner.halfmarathon), 5000);
        questionnaireRunner.halfmarathon.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        // questionnaire.guidance.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();
    });

    it ('Not logged user filling out questionnaire for Runner - Other', function(){
        console.log('Not logged user filling out questionnaire for Runner - Other');

        // browser.wait(EC.presenceOf(questionnaireRunner.other), 5000);
        questionnaireRunner.other.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        // questionnaire.guidance.click();
        questionnaire.updateProfile.click();
        browser.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();
    });

    it ('Without a completed questionnaire not logged user click on the button next', function () {
        console.log('Without a completed questionnaire not logged user click on the button next');

        // browser.wait(EC.presenceOf(questionnaire.updateProfile), 5000);
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();

    });

});

describe('Logged user filling out questionnaire for Runner', function () {

    beforeEach(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username2+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);

        // //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username2);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 10000);
        browser.driver.sleep(1000);
        browser.get(config.test_url_questionnaire);
        questionnaire.athleteRunner.click();
        questionnaire.buttonNext.click();
        browser.driver.sleep(500);

    });

    afterEach(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username2;
        setup_service.delete_user(uri)
    });
    var config = new Config();
    var login = new Login();
    var calendar = new Calendar();
    var questionnaire = new Questionnaire();
    var questionnaireRunner = new QuestionnaireRunner();
    var dialog;
    var EC = protractor.ExpectedConditions;
    var introduction = new Introduction();
    var eventAdd = new EventAdd();
    var setup_service = new SetupService;

    it ('Logged user filling out questionnaire for Runner - 5km', function(){
        console.log('Logged user filling out questionnaire for Runner - 5km');

        browser.wait(EC.presenceOf(questionnaireRunner.fiveKm), 5000);
        questionnaireRunner.fiveKm.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
            browser.sleep(300);
            expect(race_div[0].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-27');
            expect(race_div[0].element(by.model('race[1]')).getAttribute('value')).toEqual('Belgrade marathon');

        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
            browser.sleep(300);
            expect(race_div[1].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-18');
            expect(race_div[1].element(by.model('race[1]')).getAttribute('value')).toEqual('Belgrade marathon');
        });
        // questionnaire.level1.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();
        browser.driver.sleep(300);

        introduction.X_close_introduction.click();

        browser.driver.sleep(1000);
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 10000);
        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
    });

    it ('Logged user filling out questionnaire for Runner - 10km', function(){
        console.log('Logged user filling out questionnaire for Runner - 10km');

        browser.wait(EC.presenceOf(questionnaireRunner.tenKm), 5000);
        questionnaireRunner.tenKm.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        // questionnaire.level2.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();
    });

    it ('Logged user filling out questionnaire for Runner - Marathon', function(){
        console.log('Logged user filling out questionnaire for Runner - Marathon');

        browser.wait(EC.presenceOf(questionnaireRunner.marathon), 5000);
        questionnaireRunner.marathon.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        // questionnaire.level3.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();
    });

    it ('Logged user filling out questionnaire for Runner - Halfmarathon', function(){
        console.log('Logged user filling out questionnaire for Runner - Halfmarathon');

        browser.wait(EC.presenceOf(questionnaireRunner.halfmarathon), 5000);
        questionnaireRunner.halfmarathon.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        // questionnaire.guidance.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();
    });

    it ('Logged user filling out questionnaire for Runner - Other', function(){
        console.log('Logged user filling out questionnaire for Runner - Other');

        browser.wait(EC.presenceOf(questionnaireRunner.other), 5000);
        questionnaireRunner.other.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.removeRunRaces.click();
        questionnaireRunner.addMoreRunRaces.click();
        questionnaireRunner.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Belgrade marathon');
        });
        // questionnaire.guidance.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();
    });

    it ('Without a completed questionnaire logged user click on the button next', function () {
        console.log('Without a completed questionnaire logged user click on the button next');

        browser.wait(EC.presenceOf(questionnaire.updateProfile), 5000);
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();

    });

});