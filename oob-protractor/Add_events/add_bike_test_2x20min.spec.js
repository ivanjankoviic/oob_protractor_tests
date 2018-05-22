
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var EventAdd = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var ReportEvent = require('../Page_Objects/ReportEvent.js');


describe ("Add and check event Bike test 2x20 min - ", function(){
    console.log("Add and check event Bike test 2x20 min- ");

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

    it ("ADD event Bike test 2x20 min, check is there any events on calendar, check is there one event (Bike test 2x20 min)", function() {
        console.log("ADD event Bike test 2x20 min, check is there any events on calendar, check is there one event (Bike test 2x20 min)");

        // //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        //provera TITLA
        expect(browser.getTitle()).toBe('OOB Life');
        //Nacin da se pregleda da na celom kalendaru ne postoji nijedan event
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(0);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(0).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(10).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);
        eventAdd.categoris.get(8).click();
        //klik na create event
        createEvent.createEventButton.click();


        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.completedActivity), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        // Nacin da se proveri broj evenata funkcionise samo za celu stranicu,
        // ne funkcionise za pojedinacno polje u datumu
        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        // Nacin da se proveri tekst
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Bike test 2x20 min 1h 30'");

        // klik na move delete
        browser.wait(EC.presenceOf(calendar.moveDeleteButton), 5000);
        calendar.moveDeleteButton.click();

        // klik na delete
        browser.wait(EC.presenceOf(calendar.deleteButton), 5000);
        calendar.deleteButton.click();

        browser.driver.sleep(500);
        // Nacin da se proveri tekst
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(0);

    });
});
