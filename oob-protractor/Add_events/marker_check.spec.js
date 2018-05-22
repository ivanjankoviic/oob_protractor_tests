
//TODO: odkomentarisati kada se ispravi bug sa markerima

var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var EventAdd = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var ReportEvent = require('../Page_Objects/ReportEvent.js');


describe ("Check when we make more events, whether a marker appears", function(){
    console.log("Check when we make more events, whether a marker appears");

    beforeAll(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);
    });

    afterAll(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username;
        setup_service.delete_user(uri)
    });

    var setup_service = new SetupService;
    var config = new Config;
    var login = new Login();
    var calendar = new Calendar();
    var eventAdd = new EventAdd();
    var createEvent = new CreateEvent();
    var EC = protractor.ExpectedConditions;
    var reportEvent = new ReportEvent();

    var moment = require('moment');
    var current_day = moment().format('[day-]YYYY-MM-DD');
    var future_day = moment().add(1, 'days').format('[day-]YYYY-MM-DD');
    var past_day = moment().add(-1, 'days').format('[day-]YYYY-MM-DD');

    it ("Check when we make more events, whether a marker appears", function() {
        console.log("Check when we make more events, whether a marker appears");

        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);

        browser.sleep(1000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(1).click();
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        element(by.css( "#" + current_day)).click();
        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(8).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        element(by.css( "#" + current_day)).click();
        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(1).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        //klik na dan u buducnosti
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        //klik na danasnji dan
        element(by.css( "#" + current_day)).click();

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(8).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        element(by.css( "#" + current_day)).click();

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(1).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        element(by.css( "#" + current_day)).click();
        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(8).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        element(by.css( "#" + current_day)).click();

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(1).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        element(by.css( "#" + current_day)).click();
        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(8).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        element(by.css( "#" + current_day)).click();
        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(1).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        //klik na dan u buducnosti
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        //klik na danasnji dan
        element(by.css( "#" + current_day)).click();

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(8).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        element(by.css( "#" + current_day)).click();

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(1).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeFalsy();
        element(by.css( "#" + current_day)).click();
        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(8).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        //nacin da se saceka element(crveni krstic)
        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeTruthy();
        element(by.css( "#" + current_day)).click();
        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Activity
        eventAdd.categoris.get(0).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        // browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(1).click();
        createEvent.createEventButton.click();

        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        browser.sleep(300);
        calendar.showMenuCalendarButton.click();

        browser.sleep(500);
        element(by.css( "#" + future_day)).click();
        expect(calendar.marker_more_events_in_one_day.isPresent()).toBeTruthy();
        element(by.css( "#" + current_day)).click();

    });
});
