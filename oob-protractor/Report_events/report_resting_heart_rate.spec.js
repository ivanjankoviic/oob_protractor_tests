
    // - create resting heart rate event
    // - enter event
    // - check check valid and invalid values in bpm field

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');
var moment = require ('moment');

describe ('report resting heart rate event', function() {

    beforeAll(function () {
        var duri = config.backend_uri + "/avl/user?username=" + config.username;
        // setup_service.delete_user(duri, function (e, m, b) {

            // browser.driver.sleep(300);
            var uri = config.backend_uri + "/user/register?username=" + config.username + "&password=123&id_coach=" + config.coach_id + "&data=" + JSON.stringify(
                    {
                        "first_name": "user",
                        "last_name": "test",
                        "I_AGREE": "true",
                        "role": 1,
                        "language": 1,
                        "service": 1
                    });
            setup_service.register_user(uri);
    });

    afterAll(function () {
        // console.log('afterAll');
        var uri = config.backend_uri + "/avl/user?username=" + config.userName1;
        setup_service.delete_user(uri)
    });


    var setup_service = new SetupService;
    var login = new Login();
    var calendar = new Calendar();
    var addEvent = new AddEvent();
    var createEvent = new CreateEvent();
    var reportEvent = new ReportEvent();
    var config = new Config();
    var EC = protractor.ExpectedConditions;

    var moment = require('moment');
    var current_day = moment().format('[day-]YYYY-MM-DD');
// var future_day = moment().add(6, 'days').format('[day-]YYYY-MM-DD');

    it("Create resting heart rate event and check valid and invalid values", function () {
        console.log("Create resting heart rate event and check valid and invalid values");

        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        //browser.sleep(1000);
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);

        browser.sleep(2000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(2).click();
        browser.sleep(100);
        addEvent.categoris.get(5).click();

        // click on create
        expect(createEvent.eventTitleDefault.getText()).toEqual('Reports Resting heart rate');
        browser.wait(EC.presenceOf(addEvent.addEvent), 5000);
        createEvent.createEventButton.click();


        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(1000);

        // check in calendar is event made
        browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Resting heart rate');
        });

        // click on event in calendar
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();

        //check is "What is your resting heart rate today" displayed
        browser.wait(EC.presenceOf(element(by.css('.task-header'))), 5000);
        expect(element(by.css('.task-header')).isDisplayed()).toBeTruthy();
        expect(element(by.css('.task-header')).getText()).toBe('What is your resting heart rate today?');

        // //checking
        reportEvent.heartRateInput.click();
        browser.sleep(200);
        reportEvent.heartRateInput.sendKeys('66');
        browser.sleep(200);
        expect(reportEvent.heartRateInput.getAttribute('value')).toEqual('66');
        browser.sleep(200);
        browser.actions().doubleClick(reportEvent.heartRateInput).perform();
        reportEvent.heartRateInput.sendKeys('99');
        browser.sleep(500);
        expect(reportEvent.heartRateInput.getAttribute('value')).toEqual('99');

        // check 'When did you measure' and radio buttons

        expect(element(by.id('s0')).isDisplayed()).toBeTruthy();
        expect(element(by.id('s1')).isDisplayed()).toBeTruthy();
        expect(element(by.id('s2')).isDisplayed()).toBeTruthy();

        // checking radio buttons labels
        expect(reportEvent.radio1Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio1Label.getText()).toEqual('Morning');
        expect(reportEvent.radio2Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio2Label.getText()).toEqual('During day');
        expect(reportEvent.radio3Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio3Label.getText()).toEqual("Evening");

        // click on a second button
        element(by.id('s1')).click();
        browser.sleep(100);

        // check is second button selected and others are not
        element(by.id('s1')).getAttribute('checked').then(function(value) {
            expect(value).toBe('true'); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s0')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s2')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });

        // click on a first button
        element(by.id('s0')).click();
        browser.sleep(100);

        // check is second button selected and others are not
        element(by.id('s0')).getAttribute('checked').then(function(value) {
            expect(value).toBe('true'); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s1')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s2')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });

        // click on a third button
        element(by.id('s2')).click();
        browser.sleep(100);

        // check is second button selected and others are not
        element(by.id('s2')).getAttribute('checked').then(function(value) {
            expect(value).toBe('true'); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s0')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s1')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });

    });

});

