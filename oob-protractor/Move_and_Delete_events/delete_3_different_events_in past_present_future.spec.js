
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var EventAdd = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var ReportEvent = require('../Page_Objects/ReportEvent.js');


describe ("Create 3 different events in present past and future, and delete them - ", function(){
    console.log("Create 3 different events in present past and future, and delete them - ");

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
    var future_day = moment().add(5, 'days').format('[day-]YYYY-MM-DD');
    var past_day = moment().add(-6, 'days').format('[day-]YYYY-MM-DD');


    it ("Create event on current day, and check is that event on specific date, and then delete event and check is calendar empty", function() {
        console.log("Create event on current day, and check is that event on specific date, and then delete event and check is calendar empty");

        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(2000);

        //Nacin da se pregleda da na celom kalendaru ne postoji nijedan event
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(0);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //putanja da se napravi event bike test 20min
        eventAdd.categoris.get(0).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(5).click();
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.completedActivity), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(300);
        //Nacin da se proveri koliko se evenata nalazi na celom kalendaru
        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        var selector = "#" + current_day + " oob-day .day-events-full .day-event-full";
        //nacin da se proveri koliko evenata ima u tacno odredjenom danu
        expect(element.all(by.css(selector)).count()).toEqual(1);

        //nacin da se proveri text
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Bike test 5 min 45'");
        });

        //kllik na tri tackice za move i delete
        calendar.moveDeleteButton.click();

        //klik na delete
        calendar.deleteButton.click();

        //Nacin da se proveri koliko se evenata nalazi na celom kalendaru
        browser.driver.sleep(500);

        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(0);

        //nacin da se sazna da li se event nalazi na tacno odredjenom datumu
        expect(element.all(by.css(selector)).count()).toEqual(0);

    });


    it ("Create event on future day, and check is that event on specific date, and then delete event and check is calendar empty", function() {
        console.log("Create event on future day, and check is that event on specific date, and then delete event and check is calendar empty");

        browser.sleep(500);
        browser.wait(EC.presenceOf(element(by.id(future_day))), 10000);
        element(by.id(future_day)).click();

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //putanja da se napravi event
        eventAdd.categoris.get(1).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        eventAdd.categoris.get(1).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        eventAdd.categoris.get(1).click();
        createEvent.createEventButton.click();

        browser.driver.sleep(500);
        //Nacin da se proveri koliko se evenata nalazi na celom kalendaru
        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        var selector1 = "#" + future_day + " oob-day .day-events-full .day-event-full";
        //nacin da se proveri koliko evenata ima u tacno odredjenom danu
        expect(element.all(by.css(selector1)).count()).toEqual(1);


        //nacin da se proveri text
        browser.findElements(by.id(future_day)).then(function() {
            expect(element(by.css( "#" + future_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Time trial 1h 00'");
        });

        //kllik na tri tackice za move i delete
        calendar.moveDeleteButton.click();

        //klik na delete
        calendar.deleteButton.click();

        //Nacin da se proveri koliko se evenata nalazi na celom kalendaru
        browser.driver.sleep(1000);

        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(0);

        //nacin da se sazna da li se event nalazi na tacno odredjenom datumu
        expect(element.all(by.css(selector1)).count()).toEqual(0);

    });

    it ("Create event on paste day, and check is that event on specific date, and then delete event and check is calendar empty", function() {
        console.log("Create event on paste day, and check is that event on specific date, and then delete event and check is calendar empty");

        browser.sleep(500);
        browser.wait(EC.presenceOf(calendar.calendArrowLeftButton), 10000);
        calendar.calendArrowLeftButton.click();
        calendar.calendArrowLeftButton.click();
        calendar.calendArrowLeftButton.click();

        browser.wait(EC.presenceOf(element(by.id(past_day))), 10000);
        browser.sleep(1000);
        element(by.id(past_day)).click();

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //putanja da se napravi event
        eventAdd.categoris.get(2).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        eventAdd.categoris.get(2).click();

        createEvent.createEventButton.click();

        // //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        // browser.driver.sleep(700);
        //Nacin da se proveri koliko se evenata nalazi na celom kalendaru
        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        var selector2 = "#" + past_day + " oob-day .day-events-full .day-event-full";
        //nacin da se proveri koliko evenata ima u tacno odredjenom danu
        expect(element.all(by.css(selector2)).count()).toEqual(1);


        //nacin da se proveri text
        browser.findElements(by.id(past_day)).then(function() {
            expect(element(by.css( "#" + past_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Weight');
        });

        //kllik na tri tackice za move i delete
        calendar.moveDeleteButton.click();

        //klik na delete
        calendar.deleteButton.click();

        //Nacin da se proveri koliko se evenata nalazi na celom kalendaru
        browser.driver.sleep(500);

        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(0);

        //nacin da se sazna da li se event nalazi na tacno odredjenom datumu
        expect(element.all(by.css(selector2)).count()).toEqual(0);

    });
});
