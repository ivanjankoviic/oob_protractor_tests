
    // TODO treba nastaviti test kada se ispravi bug (posle search-a klik na back dugme)


var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var EventAdd = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var ReportEvent = require('../Page_Objects/ReportEvent.js');


describe ("Check search field, and create event", function(){
    console.log("Check search field, and create event");

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
        // browser.sleep(1000);
    });

    afterEach(function (){
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

    it ("Check search field, and create event", function() {
        console.log("Check search field, and create event");

        browser.sleep(2000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();

        browser.wait(EC.presenceOf(eventAdd.search), 10000);
        eventAdd.search.getAttribute('placeholder').then(function(element){
            expect(element).toEqual('Search');
        });

        eventAdd.search.sendKeys('jog');
        browser.sleep(500);

        expect(eventAdd.searchedEventName.get(0).getText()).toBe('Jogging(Run)');

        eventAdd.searchedEventName.click();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 10000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);
        // Nacin da se proveri broj evenata funkcionise samo za celu stranicu,
        // ne funkcionise za pojedinacno polje u datumu
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        // Nacin da se proveri tekst
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Jogging 1h 00'");
    });

    it ("Check search field, and create event", function() {
        console.log("Check search field, and create event");

        browser.sleep(2000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();

        browser.wait(EC.presenceOf(eventAdd.search), 10000);
        eventAdd.search.getAttribute('placeholder').then(function(element){
            expect(element).toEqual('Search');
        });

        eventAdd.search.sendKeys('tes');
        browser.sleep(500);

        expect(eventAdd.searchedEventName.get(5).getText()).toBe('Run test 3 km(Test)');

        eventAdd.searchedEventName.get(5).click();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 10000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);
        // Nacin da se proveri broj evenata funkcionise samo za celu stranicu,
        // ne funkcionise za pojedinacno polje u datumu
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        // Nacin da se proveri tekst
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Run test 3 km 45'");

    });
    it ("Check search field, and create event", function() {
        console.log("Check search field, and create event");

        browser.sleep(2000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();

        browser.wait(EC.presenceOf(eventAdd.search), 10000);
        eventAdd.search.getAttribute('placeholder').then(function(element){
            expect(element).toEqual('Search');
        });

        eventAdd.search.sendKeys('wei');
        browser.sleep(500);

        expect(eventAdd.searchedEventName.get(0).getText()).toBe('Body Weight(Strength interval based)');

        eventAdd.searchedEventName.get(0).click();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 10000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);
        // Nacin da se proveri broj evenata funkcionise samo za celu stranicu,
        // ne funkcionise za pojedinacno polje u datumu
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        // Nacin da se proveri tekst
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Body Weight 1h 00'");
    });
    it ("Check search field, and create event", function() {
        console.log("Check search field, and create event");

        browser.sleep(2000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();

        browser.wait(EC.presenceOf(eventAdd.search), 10000);
        eventAdd.search.getAttribute('placeholder').then(function(element){
            expect(element).toEqual('Search');
        });

        eventAdd.search.sendKeys('weight');
        browser.sleep(500);

        expect(eventAdd.searchedEventName.get(3).getText()).toBe('Weight(Reports)');

        eventAdd.searchedEventName.get(3).click();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 10000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);
        // Nacin da se proveri broj evenata funkcionise samo za celu stranicu,
        // ne funkcionise za pojedinacno polje u datumu
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        // Nacin da se proveri tekst
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe('Weight');
    });
});
