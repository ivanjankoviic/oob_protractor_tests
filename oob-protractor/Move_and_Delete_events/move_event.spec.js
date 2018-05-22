
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var EventAdd = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var ReportEvent = require('../Page_Objects/ReportEvent.js');


describe ("Create and move event- ", function() {
    console.log("Create and move event- ");

    beforeAll(function () {
        // console.log('beforeAll');
        var uri = config.backend_uri + "/user/register?username=" + config.username + "&password=123&data=" + JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);
    });

    afterAll(function () {
        // console.log('afterAll');
        var uri = config.backend_uri + "/avl/user?username=" + config.username;
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
    var future_day = moment().add(6, 'days').format('[day-]YYYY-MM-DD');

    it ("Create event on current day, and check is that event on specific date, and then click on move event and check close button", function() {
        console.log("Create event on current day, and check is that event on specific date, and then click on move event and check close button");
        ///login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(2000);

        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(0);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //putanja da se napravi event jogging
        eventAdd.categoris.get(0).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        eventAdd.categoris.get(0).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        eventAdd.categoris.get(3).click();
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.completedActivity), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();


        browser.driver.sleep(500);

        var selector = "#" + current_day + " oob-day .day-events-full .day-event-full";
        //nacin da se proveri koliko evenata ima u tacno odredjenom danu
        expect(element.all(by.css(selector)).count()).toEqual(1);

        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        // // Nacin da se proveri tekst
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Tempo run 1h 00'");
        });

        //kllik na tri tackice za move i delete
        calendar.moveDeleteButton.click();

        //provera da li postoje move i delete button
        browser.wait(EC.presenceOf(calendar.deleteButton), 5000);
        expect(calendar.deleteButton.isPresent()).toBeTruthy();
        expect(calendar.moveButton.isPresent()).toBeTruthy();

        //klik na move
        calendar.moveButton.click();

        // upis datuma u kalendar
        calendar.moveEventDatePicker.sendKeys(moment().add(9, 'days').format('MM-DD-YYYY'));

        //klik na cancel button
        browser.wait(EC.presenceOf(calendar.moveEventCancelButton), 5000);
        calendar.moveEventCancelButton.click();

        //nacin da se proveri koliko evenata ima u tacno odredjenom danu
        expect(element.all(by.css(selector)).count()).toEqual(1);

        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        // // Nacin da se proveri tekst
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Tempo run 1h 00'");
        });
    });

    it ("Create event on current day, and check is that event on specific date, and then move event and check is event move on wright date", function() {
        console.log("Create event on current day, and check is that event on specific date, and then move event and check is event move on wright date");
        browser.sleep(500);

        // klik na move delete
        browser.wait(EC.presenceOf(calendar.moveDeleteButton), 5000);
        expect(calendar.moveDeleteButton.isPresent()).toBeTruthy();
        calendar.moveDeleteButton.click();

        //provera da li postoje move i delete button
        browser.wait(EC.presenceOf(calendar.deleteButton), 5000);
        expect(calendar.deleteButton.isPresent()).toBeTruthy();
        expect(calendar.moveButton.isPresent()).toBeTruthy();

        //klik na move
        calendar.moveButton.click();

        // upis datuma u kalendar
        calendar.moveEventDatePicker.sendKeys(moment().add(6, 'days').format('MM-DD-YYYY'));

        //klik na move button
        browser.wait(EC.presenceOf(calendar.moveEventMoveButton), 5000);
        calendar.moveEventMoveButton.click();

        browser.driver.sleep(500);
        var selector1 = "#" + future_day + " oob-day .day-events-full .day-event-full";
        //nacin da se proveri koliko evenata ima u tacno odredjenom danu
        expect(element.all(by.css(selector1)).count()).toEqual(1);

        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);


        var selector = "#" + current_day + " oob-day .day-events-full .day-event-full";
        //nacin da se proveri koliko evenata ima u tacno odredjenom danu
        expect(element.all(by.css(selector)).count()).toEqual(0);

        element(by.id(future_day)).click();
        browser.sleep(300);

        // // Nacin da se proveri tekst
        browser.findElements(by.id(future_day)).then(function() {
            expect(element(by.css( "#" + future_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Tempo run 1h 00'");
        });
    });
});
