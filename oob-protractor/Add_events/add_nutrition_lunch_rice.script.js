
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var EventAdd = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var ReportEvent = require('../Page_Objects/ReportEvent.js');


describe ("Add an check event Rice - ", function(){
    console.log("Add an check event Rice - ");

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

    it ("ADD event Rice, check is there any events on calendar, check is there one event (Rice)", function() {
        console.log("ADD event Rice, check is there any events on calendar, check is there one event (Rice)");

        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        //klik na Nutrition
        eventAdd.categoris.get(3).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        eventAdd.categoris.get(1).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

        eventAdd.categoris.get(5).click();

        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);

        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe('Rice');

    });
});
