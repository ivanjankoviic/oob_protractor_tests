
var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var AddEvent = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');

describe ("Checking add note", function(){

    beforeEach(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);

        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);

    });

    afterEach(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username;
        setup_service.delete_user(uri);
    });

    var setup_service = new SetupService;
    var login = new Login();
    var calendar = new Calendar();
    var addEvent = new AddEvent();
    var createEvent = new CreateEvent();
    var config = new Config();
    var reportEvent = new ReportEvent();
    var EC = protractor.ExpectedConditions;

    var moment = require('moment');
    var current_day = moment().format('[day-]YYYY-MM-DD');

    it("Create event and check add note", function () {
        console.log("Create event and check add note");

        browser.driver.sleep(3000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(10).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();

        //klik na add note i upis teksta
        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        createEvent.addNoteField.click();
        createEvent.addNoteInputText.sendKeys('Færdig! ЂШПЋЧМН шупичкуматерину ĐŠPĆČLčlk +_))(*&^%$%#');
        createEvent.sendButtonAddNote.click();
        //provera teksta na stranici create event
        browser.wait(EC.presenceOf(createEvent.checkTextAddNote), 5000);
        expect(createEvent.checkTextAddNote.getText()).toBe('Færdig! ЂШПЋЧМН шупичкуматерину ĐŠPĆČLčlk +_))(*&^%$%#');
        //klik na create event
        createEvent.createEventButton.click();

        browser.driver.sleep(1000);
        // //nacin da se proveri text
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Run test 5 km 1h 00'");
        // });
        //
        // //klk na event
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).click());
        // });

        browser.wait(EC.presenceOf(reportEvent.plannedActivity), 5000);
        reportEvent.plannedActivity.click();
        expect(element(by.css('.content-item-main')).getText()).toBe('Færdig! ЂШПЋЧМН шупичкуматерину ĐŠPĆČLčlk +_))(*&^%$%#');

    });

    it("Create event and check add note", function () {
        console.log("Create event and check add note");

        browser.sleep(3000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(4).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();

        //klik na add note i upis teksta
        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        createEvent.addNoteField.click();
        createEvent.addNoteInputText.sendKeys('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        createEvent.sendButtonAddNote.click();
        //provera teksta na stranici create event
        browser.wait(EC.presenceOf(createEvent.checkTextAddNote), 5000);
        expect(createEvent.checkTextAddNote.getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        //klik na create event
        createEvent.createEventButton.click();

        browser.driver.sleep(1000);
        // //nacin da se proveri text
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("TRX 1h 00'");
        // });
        //
        // //klk na event
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).click());
        // });

        browser.wait(EC.presenceOf(reportEvent.plannedActivity), 5000);
        reportEvent.plannedActivity.click();
        // browser.driver.sleep(700);
        expect(element(by.css('.content-item-main')).getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');

    });

    it("Create event and check add note", function () {
        console.log("Create event and check add note");

        browser.sleep(3000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();

        //klik na add note i upis teksta
        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        createEvent.addNoteField.click();
        createEvent.addNoteInputText.sendKeys('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        createEvent.sendButtonAddNote.click();
        //provera teksta na stranici create event
        browser.wait(EC.presenceOf(createEvent.checkTextAddNote), 5000);
        expect(createEvent.checkTextAddNote.getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        //klik na create event
        createEvent.createEventButton.click();

        browser.driver.sleep(1000);
        // //nacin da se proveri text
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("5 km 30'");
        // });
        //
        // //klk na event
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).click());
        // });

        browser.wait(EC.presenceOf(reportEvent.plannedActivity), 5000);
        reportEvent.plannedActivity.click();
        // browser.driver.sleep(700);
        expect(element(by.css('.content-item-main')).getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');

    });

   it("Create event and check add note", function () {
        console.log("Create event and check add note");

        browser.sleep(3000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();

        //klik na add note i upis teksta
        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        createEvent.addNoteField.click();
        createEvent.addNoteInputText.sendKeys('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        createEvent.sendButtonAddNote.click();
        //provera teksta na stranici create event
        browser.wait(EC.presenceOf(createEvent.checkTextAddNote), 5000);
        expect(createEvent.checkTextAddNote.getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        //klik na create event
        createEvent.createEventButton.click();

        browser.driver.sleep(1000);
        // //nacin da se proveri text
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Ironman 13h 00'");
        // });
        //
        // //klk na event
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).click());
        // });

        browser.wait(EC.presenceOf(reportEvent.plannedActivity), 5000);
        reportEvent.plannedActivity.click();
        // browser.driver.sleep(700);
        expect(element(by.css('.content-item-main')).getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');

    });

    it("Create event and check add note", function () {
        console.log("Create event and check add note");

        browser.sleep(3000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();

        //klik na add note i upis teksta
        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        createEvent.addNoteField.click();
        createEvent.addNoteInputText.sendKeys('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        createEvent.sendButtonAddNote.click();
        //provera teksta na stranici create event
        browser.wait(EC.presenceOf(createEvent.checkTextAddNote), 5000);
        expect(createEvent.checkTextAddNote.getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        //klik na create event
        createEvent.createEventButton.click();

        browser.driver.sleep(1000);
        //nacin da se proveri text
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Weight');
        // });
        //
        // //klk na event
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).click());
        // });


        // //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(1000);
        //nacin da se proveri text
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Weight');
        });

        //klk na event
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).click());
        });


    });

    it("Create event and check add note", function () {
        console.log("Create event and check add note");

        browser.sleep(3000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();

        //klik na add note i upis teksta
        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        createEvent.addNoteField.click();
        createEvent.addNoteInputText.sendKeys('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        createEvent.sendButtonAddNote.click();
        //provera teksta na stranici create event
        browser.wait(EC.presenceOf(createEvent.checkTextAddNote), 5000);
        expect(createEvent.checkTextAddNote.getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        //klik na create event
        createEvent.createEventButton.click();

        browser.driver.sleep(1000);
        // //nacin da se proveri text
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Bread');
        // });
        //
        // //klk na event
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).click());
        // });

        browser.wait(EC.presenceOf(reportEvent.plannedActivity), 5000);
        reportEvent.plannedActivity.click();
        expect(element(by.css('.content-item-main')).getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');

    });
    it("Create event and check add note", function () {
        console.log("Create event and check add note");

        browser.sleep(3000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.messageForCoach.click();
        expect(createEvent.checkTextAddNote.isDisplayed()).toBeFalsy();

        createEvent.createEventButton.click();

        browser.driver.sleep(1000);

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();
        browser.driver.sleep(1000);

        //nacin da se proveri text
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Message for Coach');
        });

    });

    it("Create event and check add note", function () {
        console.log("Create event and check add note");

        browser.sleep(3000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);

        // addEvent.other.click();

        expect(element(by.repeater('category in vm.event_categories').row(4)).element(by.css('.used-event-name')).click());


        // browser.sleep(2000);
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);

        expect(addEvent.categoris.get(0).getText()).toBe('Others');
        expect(addEvent.categoris.get(1).getText()).toBe('Travel');
        expect(addEvent.categoris.get(2).getText()).toBe('Message for Coach');
        expect(addEvent.categoris.get(3).getText()).toBe('Focus');
        expect(addEvent.categoris.get(4).getText()).toBe('Day off');


        //klik na Others
        addEvent.categoris.get(0).click();

        //klik na add note i upis teksta
        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        createEvent.addNoteField.click();
        createEvent.addNoteInputText.sendKeys('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
        createEvent.sendButtonAddNote.click();
        //provera teksta na stranici create event
        browser.wait(EC.presenceOf(createEvent.checkTextAddNote), 5000);
        expect(createEvent.checkTextAddNote.getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');
       browser.sleep(200);
        //klik na create event
        createEvent.createEventButton.click();

        browser.driver.sleep(1000);
        //nacin da se proveri text
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Others');
        // });
        //
        // //klk na event
        // browser.findElements(by.id(current_day)).then(function() {
        //     expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).click());
        // });

        browser.wait(EC.presenceOf(reportEvent.plannedActivity), 5000);
        reportEvent.plannedActivity.click();
        // browser.driver.sleep(700);
        expect(element(by.css('.content-item-main')).getText()).toBe('Færdig! ЂШПЋЧМН шупичкумат... ĐŠPĆČLčlk +_))(*&^%$%#');

    });

});