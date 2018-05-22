
/*
 - Test reports stress event report
     - create stress report
     - check is stress event in calendar
     - enter the event
     - check are all elements visible
     - click on a completed activity
     - check are elements closed
     - check radio buttons
        - check if radio buttons are present
        - check are labels next to radio buttons present and is the text correct
        - click on all radio buttons
        - validate that specific radio button is selected and others not
     - type a message and discard
        - check if it is discarded when entering message board
     - type a message and click somewhere on the screen to exit the message board
        - check if entered letters are still in a message board
     - type a message with danish serbian and spanish letters and send
        - check if it is displayed that message was sent and check correctness
     - type another message and check
     - go to calendar
 */


var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');
var moment = require ('moment');


describe ('report motivation event', function() {


    beforeEach(function (){
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

            //login
            browser.get(config.test_url);
            browser.wait(EC.presenceOf(login.emailInput), 5000);
            login.emailInput.sendKeys(config.username);
            login.passwordInput.sendKeys('123');
            login.buttonLogin.click();
            //browser.sleep(1000);
            browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        // });

    });

    afterEach(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username;
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

    it("Create report stress and check", function () {
        console.log("Create report stress and check");

        browser.sleep(2000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(2).click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();

        expect(createEvent.eventTitleDefault.getText()).toEqual('Reports Stress');
        browser.wait(EC.presenceOf(addEvent.addEvent), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(1000);

        // check if event is present in calendar and is title OK
        browser.findElements(by.id("day-" + calendar.returnCurrentDate().year
                .toString() + "-" + calendar.returnCurrentDate().monthNumber
                .toString() + "-" + calendar.returnCurrentDate().day.toString()))
            .then(function () {
                expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2)
            });

        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe('Stress');

        // click on event in calendar
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();

        browser.sleep(300);

        // check that menu button is present
        browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
        expect(calendar.showMenuButton.isDisplayed()).toBeTruthy();

        // check is report stress icon present
        browser.wait(EC.presenceOf(element(by.css('.event-reports-stress-icon'))), 5000);
        expect(element(by.css('.event-reports-stress-icon')).isDisplayed()).toBeTruthy();

        // Check if title of event is correct
        expect(element(by.css('.main-navbar .navbar-item.navbar-report-title')).getText()).toEqual('Stress');

        // check are planned and completed activity fields present
        expect(reportEvent.plannedActivity.isPresent()).toBeFalsy();
        // expect(reportEvent.completedActivity.isDisplayed()).toBeTruthy();

        //check is "How are you feeling today?" and HHS displayed
        expect(element(by.css('.task-header')).getText()).toEqual('Evaluate your overall stress level');

        // check are radio buttons displayed
        expect(element(by.id('s0')).isDisplayed()).toBeTruthy();
        expect(element(by.id('s1')).isDisplayed()).toBeTruthy();
        expect(element(by.id('s2')).isDisplayed()).toBeTruthy();
        expect(element(by.id('s3')).isDisplayed()).toBeTruthy();
        expect(element(by.id('s4')).isDisplayed()).toBeTruthy();

        // Check are labels next to radio buttons present and is the text correct
        // Way to check label next to radio button
        expect(reportEvent.radio1Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio1Label.getText()).toEqual('Feel great.');
        expect(reportEvent.radio2Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio2Label.getText()).toEqual('Good. Busy but feel on top of things.');
        expect(reportEvent.radio3Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio3Label.getText()).toEqual('Ok. I feel in control.');
        expect(reportEvent.radio4Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio4Label.getText()).toEqual('Getting swamped.');
        expect(reportEvent.radio5Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio5Label.getText()).toEqual('Feel hopeless behind on things');

        // click on a completed and check if elements "How are you feeling today?" and HHS are not visible
        // reportEvent.completedActivity.click();

        // browser.sleep(300);
        // expect(element(by.css('.task-header')).isDisplayed()).toBeFalsy();
        // // expect(element(by.css('.task-feeling-value')).isDisplayed()).toBeFalsy();
        // expect(element(by.id('s0')).isDisplayed()).toBeFalsy();
        // expect(element(by.id('s1')).isDisplayed()).toBeFalsy();
        // expect(element(by.id('s2')).isDisplayed()).toBeFalsy();
        // expect(element(by.id('s3')).isDisplayed()).toBeFalsy();
        // expect(element(by.id('s4')).isDisplayed()).toBeFalsy();

        // CLICK ON RADIO BUTTONS AND CHECK
        // Check is specfic radio buton selected. Check that buttons that are not selected - are not selected
        // reportEvent.completedActivity.click();
        // browser.sleep(300);

        // click on a second button
        element(by.id('s1')).click();
        browser.sleep(400);

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
        element(by.id('s3')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s4')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });

        //click on a first button
        element(by.id('s0')).click();
        browser.sleep(400);

        // check is first button selected and others are not
        element(by.id('s0')).getAttribute('checked').then(function(value) {
            expect(value).toBe('true'); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s1')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s2')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s3')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s4')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });

        // click on a third button
        element(by.id('s2')).click();
        browser.sleep(400);

        // check is third button selected and others are not
        element(by.id('s2')).getAttribute('checked').then(function(value) {
            expect(value).toBe('true'); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s1')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s0')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s3')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s4')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });

        // click on a fifth button
        element(by.id('s4')).click();
        browser.sleep(400);

        // check is fifth button selected and others are not
        element(by.id('s4')).getAttribute('checked').then(function(value) {
            expect(value).toBe('true'); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s1')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s0')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s3')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s2')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });

        //click on a fourth button
        element(by.id('s3')).click();
        browser.sleep(300);

        // check is fourth button selected and others are not
        element(by.id('s3')).getAttribute('checked').then(function(value) {
            expect(value).toBe('true'); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s1')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s0')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s4')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });
        element(by.id('s2')).getAttribute('checked').then(function(value) {
            expect(value).toBe(null); // value is 'true' if checked, and is null if not checked
        });

    });
});