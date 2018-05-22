
/*
* Not logged user filling out questionnaire for Triathlete
    * Not logged user filling out questionnaire for Triathlete - Olympic Triathlon
    * Not logged user filling out questionnaire for Triathlete - Half Ironman
    * Not logged user filling out questionnaire for Triathlete - Ironman
    * Not logged user filling out questionnaire for Triathlete - Other
    * Without a completed questionnaire not logged user click on the button next

* Logged user filling out questionnaire for Triathlete
    * Logged user filling out questionnaire for Triathlete - Olympic Triathlon
    * Logged user filling out questionnaire for Triathlete - Half Ironman
    * Logged user filling out questionnaire for Triathlete - Ironman
    * Logged user filling out questionnaire for Triathlete - Other
    * Without a completed questionnaire logged user click on the button next

 */



var Config = require ('./../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var Questionnaire = require ('../Page_Objects/Questionnaire.js');
var QuestionnaireTriathlete = require ('../Page_Objects/QuestionnaireTriathlete.js');
var Introduction = require ('../Page_Objects/Introduction.js');
var SetupService = require('../setup_service.js');
var EventAdd = require('../Page_Objects/AddEvent.js');

describe('Not logged user filling out questionnaire for Triathlete', function () {

    var config = new Config();
    var questionnaire = new Questionnaire();
    var questionnaireTriathlete = new QuestionnaireTriathlete();
    var errordialog;
    var EC = protractor.ExpectedConditions;

    beforeEach(function (){
        browser.get(config.test_url_questionnaire);
        questionnaire.athleteTriathlete.click();
        questionnaire.buttonNext.click();
        browser.wait(EC.presenceOf(questionnaireTriathlete.olympicTriathlon), 5000);
        browser.sleep(1000);

    });

    it ('Not logged user filling out questionnaire for Triathlete - Olympic Triathlon', function(){
        console.log('Not logged user filling out questionnaire for Triathlete - Olympic Triathlon');

        // browser.wait(EC.presenceOf(questionnaireTriathlete.olympicTriathlon), 5000);
        questionnaireTriathlete.olympicTriathlon.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Olympic Triathlon');
            browser.sleep(300);
            expect(race_div[0].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-27');
            expect(race_div[0].element(by.model('race[1]')).getAttribute('value')).toEqual('Olympic Triathlon');
        });
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.removeTriathleteRaces.click();
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Olympic Triathlon');
            browser.sleep(300);
            expect(race_div[1].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-18');
            expect(race_div[1].element(by.model('race[1]')).getAttribute('value')).toEqual('Olympic Triathlon');
        });
        // questionnaire.level1.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();

    });

    it ('Not logged user filling out questionnaire for Triathlete - Half Ironman', function(){
        console.log('Not logged user filling out questionnaire for Triathlete - Half Ironman');

        // browser.wait(EC.presenceOf(questionnaireTriathlete.halfIronman), 5000);
        questionnaireTriathlete.halfIronman.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('half Ironman');
        });
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.removeTriathleteRaces.click();
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('half Ironman');
        });
        // questionnaire.level2.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();
    });

    it ('Not logged user filling out questionnaire for Triathlete - Ironman', function(){
        console.log('Not logged user filling out questionnaire for Triathlete - Ironman');

        // browser.wait(EC.presenceOf(questionnaireTriathlete.ironman), 5000);
        questionnaireTriathlete.ironman.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Ironman');
        });
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.removeTriathleteRaces.click();
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Ironman');
        });
        // questionnaire.level3.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();
    });

    it ('Not logged user filling out questionnaire for Triathlete - Other', function(){
        console.log('Not logged user filling out questionnaire for Triathlete - Other');

        // browser.wait(EC.presenceOf(questionnaireTriathlete.other), 5000);
        questionnaireTriathlete.other.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('other');
        });
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.removeTriathleteRaces.click();
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('other');
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

describe('Logged user filling out questionnaire for Triathlete', function () {

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
        questionnaire.athleteTriathlete.click();
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
    var questionnaireTriathlete = new QuestionnaireTriathlete();
    var dialog;
    var EC = protractor.ExpectedConditions;
    var introduction = new Introduction();
    var eventAdd = new EventAdd();
    var setup_service = new SetupService;
    //
    // beforeEach(function (){
    //     browser.sleep(500);
    //     browser.get(config.test_url);
    //     browser.wait(EC.presenceOf(login.emailInput), 5000);
    //     login.emailInput.sendKeys('tester@testic.loc');
    //     login.passwordInput.sendKeys('123');
    //     login.buttonLogin.click();
    //     browser.sleep(1000);
    //     browser.get(config.test_url_questionnaire);
    //     questionnaire.athleteTriathlete.click();
    //     questionnaire.buttonNext.click();
    //
    // });
    //
    // afterEach(function (){
    //     // browser.sleep(500);
    //     browser.wait(EC.presenceOf(introduction.X_close_introduction), 10000);
    //     introduction.X_close_introduction.click();
    //     browser.sleep(500);
    //     // showMenuButton must have SLEEP-a!!!
    //     browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
    //     calendar.showMenuButtonCalendar.click();
    //     browser.wait(EC.presenceOf(calendar.showMenuLogoutButton), 5000);
    //     calendar.showMenuLogoutButton.click();
    //     browser.wait(EC.presenceOf(login.emailInput), 10000);
    //     expect(browser.getCurrentUrl()).toContain(config.test_url);
    //
    // });

    it ('Logged user filling out questionnaire for Triathlete - Olympic Triathlon', function(){
        console.log('Logged user filling out questionnaire for Triathlete - Olympic Triathlon');

        browser.wait(EC.presenceOf(questionnaireTriathlete.olympicTriathlon), 5000);
        questionnaireTriathlete.olympicTriathlon.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Olympic Triathlon');
        });
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.removeTriathleteRaces.click();
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Olympic Triathlon');
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

    it ('Logged user filling out questionnaire for Triathlete - Half Ironman', function(){
        console.log('Logged user filling out questionnaire for Triathlete - Half Ironman');

        browser.wait(EC.presenceOf(questionnaireTriathlete.halfIronman), 5000);
        questionnaireTriathlete.halfIronman.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('half Ironman');
        });
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.removeTriathleteRaces.click();
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('half Ironman');
        });
        // questionnaire.level2.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();
    });

    it ('Logged user filling out questionnaire for Triathlete - Ironman', function(){
        console.log('Logged user filling out questionnaire for Triathlete - Ironman');

        browser.wait(EC.presenceOf(questionnaireTriathlete.ironman), 5000);
        questionnaireTriathlete.ironman.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Ironman');
        });
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.removeTriathleteRaces.click();
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Ironman');
        });
        // questionnaire.level3.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();
    });

    it ('Logged user filling out questionnaire for Triathlete - Other', function(){
        console.log('Logged user filling out questionnaire for Triathlete - Other');

        browser.wait(EC.presenceOf(questionnaireTriathlete.other), 5000);
        questionnaireTriathlete.other.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('other');
        });
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.removeTriathleteRaces.click();
        questionnaireTriathlete.addMoreTriathleteRaces.click();
        questionnaireTriathlete.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('other');
        });
        // questionnaire.level3.click();
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
