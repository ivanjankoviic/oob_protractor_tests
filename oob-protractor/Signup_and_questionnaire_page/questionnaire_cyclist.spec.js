
/*
* Not logged user filling out questionnaire for Cyclist
    * Not logged user filling out questionnaire for Cyclist - Grand Fondos
    * Not logged user filling out questionnaire for Cyclist - Criterium
    * Not logged user filling out questionnaire for Cyclist - Other Type of race
    * Without a completed questionnaire not logged user click on the button next

* Logged user filling out questionnaire for Cyclist
    * Logged user filling out questionnaire for Cyclist - Grand Fondos
    * Logged user filling out questionnaire for Cyclist - Criterium
    * Logged user filling out questionnaire for Cyclist - Other Type of race
    * Without a completed questionnaire logged user click on the button next

*/

var Config = require ('./../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var Questionnaire = require ('../Page_Objects/Questionnaire.js');
var QuestionnaireCyclist = require ('../Page_Objects/QuestionnaireCyclist.js');
var Inroduction = require ('../Page_Objects/Introduction.js');
var SetupService = require('../setup_service.js');
var EventAdd = require('../Page_Objects/AddEvent.js');

describe('Not logged user filling out questionnaire for Cyclist', function () {

    var config = new Config();
    var questionnaire = new Questionnaire();
    var questionnaireCyclist = new QuestionnaireCyclist();
    var errordialog;
    var EC = protractor.ExpectedConditions;

    beforeEach(function (){
        browser.get(config.test_url_questionnaire);
        questionnaire.athleteCyclist.click();
        questionnaire.buttonNext.click();
        browser.wait(EC.presenceOf(questionnaireCyclist.grandFondos), 5000);
        browser.sleep(1000);

    });

    it ('Not logged user filling out questionnaire for Cyclist - Grand Fondos', function(){
        console.log('Not logged user filling out questionnaire for Cyclist - Grand Fondos');

        // browser.wait(EC.presenceOf(questionnaireCyclist.grandFondos), 5000);
        questionnaireCyclist.grandFondos.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2018');
            race_div[0].element(by.model('race[1]')).sendKeys(')(@#&$&*@$^897987234][p][p{PWER');
            browser.sleep(300);
            expect(race_div[0].element(by.model('race[0]')).getAttribute('value')).toEqual('2018-04-27');
            expect(race_div[0].element(by.model('race[1]')).getAttribute('value')).toEqual(')(@#&$&*@$^897987234][p][p{PWER');
        });
        browser.sleep(200);

        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.removeCycleRaces.click();
        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Grand Fondos');
            browser.sleep(300);
            expect(race_div[1].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-18');
            expect(race_div[1].element(by.model('race[1]')).getAttribute('value')).toEqual('Grand Fondos');
        });

        // questionnaire.level1.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();

    });

    it ('Not logged user filling out questionnaire for Cyclist - Criterium', function(){
        console.log('Not logged user filling out questionnaire for Cyclist - Criterium');

        // browser.wait(EC.presenceOf(questionnaireCyclist.criterium), 5000);
        questionnaireCyclist.criterium.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('11/15/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Criterium');
            browser.sleep(300);
            expect(race_div[0].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-11-15');
            expect(race_div[0].element(by.model('race[1]')).getAttribute('value')).toEqual('Criterium');
        });
        browser.sleep(200);

        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.removeCycleRaces.click();
        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('01/01/2020');
            race_div[1].element(by.model('race[1]')).sendKeys('asdwqe');
            browser.sleep(300);
            expect(race_div[1].element(by.model('race[0]')).getAttribute('value')).toEqual('2020-01-01');
            expect(race_div[1].element(by.model('race[1]')).getAttribute('value')).toEqual('asdwqe');
        });
        // questionnaire.level2.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
        expect(questionnaire.messages.getText()).toEqual('Unauthorized request');
        errordialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(errordialog), 5000);
        errordialog.click();
    });

    it ('Not logged user filling out questionnaire for Cyclist - Other Type of race', function(){
        console.log('Not logged user filling out questionnaire for Cyclist - Other Type of race');

        // browser.wait(EC.presenceOf(questionnaireCyclist.otherTypeOfRace), 5000);
        questionnaireCyclist.otherTypeOfRace.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('02/29/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Races');
            browser.sleep(300);
            expect(race_div[0].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-02-29');
            expect(race_div[0].element(by.model('race[1]')).getAttribute('value')).toEqual('Races');
        });

        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.removeCycleRaces.click();
        questionnaireCyclist.addMoreCycleRaces.click();
        browser.sleep(200);

        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Races');
            browser.sleep(300);
            expect(race_div[1].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-18');
            expect(race_div[1].element(by.model('race[1]')).getAttribute('value')).toEqual('Races');
        });
        // questionnaire.level3.click();
        questionnaire.updateProfile.click();
        browser.driver.sleep(1000);
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
describe('Logged user filling out questionnaire for Cyclist', function () {

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
        questionnaire.athleteCyclist.click();
        questionnaire.buttonNext.click();
        browser.driver.sleep(500);

    });

    afterEach(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username2;
        setup_service.delete_user(uri)
    });

    var setup_service = new SetupService;
    var config = new Config();
    var login = new Login();
    var calendar = new Calendar();
    var questionnaire = new Questionnaire();
    var questionnaireCyclist = new QuestionnaireCyclist();
    var dialog;
    var EC = protractor.ExpectedConditions;
    var introduction = new Inroduction();
    var eventAdd = new EventAdd();

    it ('Logged user filling out questionnaire for Cyclist - Grand Fondos', function(){
        console.log('Logged user filling out questionnaire for Cyclist - Grand Fondos');

        browser.wait(EC.presenceOf(questionnaireCyclist.grandFondos), 5000);
        questionnaireCyclist.grandFondos.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Grand Fondos');
            browser.sleep(300);
            expect(race_div[0].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-27');
            expect(race_div[0].element(by.model('race[1]')).getAttribute('value')).toEqual('Grand Fondos');
        });
        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.removeCycleRaces.click();
        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Grand Fondos');
            browser.sleep(300);
            expect(race_div[1].element(by.model('race[0]')).getAttribute('value')).toEqual('2024-04-18');
            expect(race_div[1].element(by.model('race[1]')).getAttribute('value')).toEqual('Grand Fondos');
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

    it ('Logged user filling out questionnaire for Cyclist - Criterium', function(){
        console.log('Logged user filling out questionnaire for Cyclist - Criterium');

        browser.wait(EC.presenceOf(questionnaireCyclist.criterium), 5000);
        questionnaireCyclist.criterium.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Criterium');
        });
        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.removeCycleRaces.click();
        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Criterium');
        });
        // questionnaire.level2.click();
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

    it ('Logged user filling out questionnaire for Cyclist - Other Type of race', function(){
        console.log('Logged user filling out questionnaire for Cyclist - Other Type of race');

        browser.wait(EC.presenceOf(questionnaireCyclist.otherTypeOfRace), 5000);
        questionnaireCyclist.otherTypeOfRace.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[0].element(by.model('race[0]')).sendKeys('04/27/2024');
            race_div[0].element(by.model('race[1]')).sendKeys('Races');
        });
        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.removeCycleRaces.click();
        questionnaireCyclist.addMoreCycleRaces.click();
        questionnaireCyclist.dateAndNameOfTheRace.then(function(race_div) {
            race_div[1].element(by.model('race[0]')).sendKeys('04/18/2024');
            race_div[1].element(by.model('race[1]')).sendKeys('Races');
        });
        // questionnaire.level3.click();
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

    it ('Without a completed questionnaire logged user click on the button next', function () {
        console.log('Without a completed questionnaire logged user click on the button next');

        browser.wait(EC.presenceOf(questionnaire.updateProfile), 5000);
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

});

