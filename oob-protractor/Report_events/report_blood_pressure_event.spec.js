
/*
 - Test reports blood pressure event report
    - create blood pressure report
    - check is blood pressure event in calendar
    - enter the event
    - check are all elements visible
    - click on a completed activity
    - check are elements closed
    - check radio buttons
        - check if radio buttons are present
        - check are labels next to radio buttons present and is the text correct
        - click on all radio buttons
        - validate that specific radio button is selected and others not
    - enter valid and invalid values
        - check alerts

         MESSAGES ARE N0T CHECKED
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


describe ('report blood pressure event', function() {


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

    var moment = require('moment');
    var current_day = moment().format('[day-]YYYY-MM-DD');


    it("Create report blood pressure and check", function () {
        console.log("Create report blood pressure and check");

        browser.sleep(3000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(2).click();
        browser.sleep(100);
        addEvent.categoris.get(3).click();

        expect(createEvent.eventTitleDefault.getText()).toEqual('Reports Blood pressure');

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
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Blood pressure');
        });

        // click on event in calendar
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        // check that menu button is present
        browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
        expect(calendar.showMenuButton.isDisplayed()).toBeTruthy();

        // check is date field present
        browser.wait(EC.presenceOf(element(by.css('.navbar-report-date'))), 5000);
        expect(element(by.css('.navbar-report-date')).isDisplayed()).toBeTruthy();

        // check is report blood pressure icon present
        browser.wait(EC.presenceOf(element(by.css('.event-reports-blood-pressure-icon'))), 5000);
        expect(element(by.css('.event-reports-blood-pressure-icon')).isDisplayed()).toBeTruthy();

        // Check if title of event is correct
        expect(element(by.css('.main-navbar .navbar-item.navbar-report-title')).getText()).toEqual('Blood pressure');

        // check is write message button present
        browser.wait(EC.presenceOf(reportEvent.writeMessage), 5000);
        expect(reportEvent.writeMessage.isDisplayed()).toBeTruthy();

        // check are planned and completed activity fields present
        expect(reportEvent.plannedActivity.isPresent()).toBeFalsy();
        // expect(reportEvent.completedActivity.isDisplayed()).toBeTruthy();

        //check is "what is your blood pressure?" present
        expect(element(by.css('.task-header')).isDisplayed()).toBeTruthy();

        // OVO ODKOMENTARISI KAD ISPRAVE GRESKU
        // expect(element(by.css('.task-header')).getText()).toEqual('What is your blood pressure Today?');


        // way to check more titles with same class name
        expect(element(by.css('.item-title')).isDisplayed()).toBeTruthy();
        expect(element(by.css('.item-title')).getText()).toEqual('Systolic pressure input');
        expect(element(by.binding ("'diastolicPressureInput' | translate")).isDisplayed()).toBeTruthy();
        expect(element(by.binding ("'diastolicPressureInput' | translate")).getText()).toBe('Diastolic pressure input');

        expect(element(by.binding ("'heartRateInput' | translate")).isDisplayed()).toBeTruthy();
        expect(element(by.binding ("'heartRateInput' | translate")).getText()).toBe('Heart rate input');

        expect(element(by.binding ('vm.event.report_second_title')).isDisplayed()).toBeTruthy();
        expect(element(by.binding ('vm.event.report_second_title')).getText()).toBe('When Did You Measure Your Pressure?');

        // check are input fields present (mmHg)
        expect(reportEvent.systolicInput.isDisplayed()).toBeTruthy();
        expect(reportEvent.systolicInput.getAttribute('placeholder')).toEqual('mmHg');

        expect(reportEvent.diastolicInput.isDisplayed()).toBeTruthy();
        expect(reportEvent.diastolicInput.getAttribute('placeholder')).toEqual('mmHg');

        expect(reportEvent.heartRateInput.isDisplayed()).toBeTruthy();
        expect(reportEvent.heartRateInput.getAttribute('placeholder')).toEqual('bmp');

        // check 'When did you measure' and radio buttons
        expect(element(by.css ('.task-header.high-cups.ng-binding')).getText()).toBe('When Did You Measure Your Pressure?');

        expect(element(by.id('s0')).isDisplayed()).toBeTruthy();
        expect(element(by.id('s1')).isDisplayed()).toBeTruthy();
        expect(element(by.id('s2')).isDisplayed()).toBeTruthy();

        // checking radio buttons labels
        expect(reportEvent.radio1Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio1Label.getText()).toEqual('Morning');
        expect(reportEvent.radio2Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio2Label.getText()).toEqual('During day');
        expect(reportEvent.radio3Label.isDisplayed()).toBeTruthy();
        expect(reportEvent.radio3Label.getText()).toEqual('Evening');


        // Check is specfic radio buton selected. Check that buttons that are not selected - are not selected

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

        //DA LI KAD SE KLIKNE NEKI OD RADIO BUTTONA TREBA DA SE U INPUT POLJIMA POJAVE NULE?

        expect(reportEvent.systolicInput.getAttribute('value')).toEqual('0');
        expect(reportEvent.diastolicInput.getAttribute('value')).toEqual('0');
        expect(reportEvent.heartRateInput.getAttribute('value')).toEqual('0');

        // reportEvent.completedActivity.click();
        //
        // browser.sleep(300);
        // expect(element(by.css('.task-header')).isDisplayed()).toBeFalsy();
        // expect(element(by.id('s0')).isDisplayed()).toBeFalsy();
        // expect(element(by.id('s1')).isDisplayed()).toBeFalsy();
        // expect(element(by.id('s2')).isDisplayed()).toBeFalsy();
        //
        // reportEvent.completedActivity.click();

        // enter valid and invalid values in input fields

        // enter invalid values for systolic
        reportEvent.systolicInput.click();
        browser.sleep(100);
        reportEvent.systolicInput.sendKeys('39');
        browser.sleep(300);
        expect(reportEvent.systolicInput.getAttribute('value')).toEqual('39');
        // browser.sleep(500);

        reportEvent.systolicInput.click();
        browser.sleep(100);
        reportEvent.systolicInput.sendKeys('123');
        browser.sleep(300);
        expect(reportEvent.systolicInput.getAttribute('value')).toEqual('123');

        // enter invalid values for diastolic
        reportEvent.diastolicInput.click();
        browser.sleep(100);
        reportEvent.diastolicInput.sendKeys('111');
        browser.sleep(300);
        expect(reportEvent.diastolicInput.getAttribute('value')).toEqual('111');
        // browser.sleep(500);

        reportEvent.diastolicInput.click();
        browser.sleep(100);
        reportEvent.diastolicInput.sendKeys('222');
        browser.sleep(300);
        expect(reportEvent.diastolicInput.getAttribute('value')).toEqual('222');

        // enter invalid values for heart rate
        reportEvent.heartRateInput.click();
        browser.sleep(100);
        reportEvent.heartRateInput.sendKeys('25');
        browser.sleep(200);
        expect(reportEvent.heartRateInput.getAttribute('value')).toEqual('25');

        reportEvent.heartRateInput.click();
        browser.sleep(100);
        reportEvent.heartRateInput.sendKeys('12321');
        browser.sleep(200);
        expect(reportEvent.heartRateInput.getAttribute('value')).toEqual('12321');
        browser.sleep(2000);

        // povratak na kalendar
        browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
        calendar.showMenuButton.click();
        browser.sleep(200);
        calendar.showMenuCalendarButton.click();
        browser.sleep(1000);

        // check in calendar is event made
        browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Blood pressure');
        });

        // click on event in calendar
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        expect(reportEvent.systolicInput.getAttribute('value')).toEqual('123');
        expect(reportEvent.diastolicInput.getAttribute('value')).toEqual('222');
        expect(reportEvent.heartRateInput.getAttribute('value')).toEqual('0');

        reportEvent.writeMessage.click();
        reportEvent.newMessage.sendKeys("Ø æ Å Œ Ć ć Č č Đ đ Š š Ž ž ǅ ǆ ǈ ǉ ǋ ǌ");
        reportEvent.sendMessage.click();
        browser.sleep(200);

        //nacin da se proveri druga poruka
        expect(element(by.repeater('message in vm.event.messages').row(0)).element(by.css('[data-dc-automation="event-message-content"]')).getText()).toBe("Ø æ Å Œ Ć ć Č č Đ đ Š š Ž ž ǅ ǆ ǈ ǉ ǋ ǌ");

    });

});