
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var EventAdd = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');


describe ("Check Message for coach", function(){
    console.log("Check Message for coach");

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

    it ("Check Message for coach", function() {
        console.log("Check Message for coach");

        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        //browser.sleep(1000);
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);

        browser.sleep(3000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();
        browser.sleep(100);
        eventAdd.messageForCoach.click();
        browser.sleep(100);

        browser.wait(EC.presenceOf(createEvent.eventTitleDefault), 5000);
        expect(createEvent.eventTitleDefault.getText()).toEqual('Other Message for Coach');

        element(by.css('.msg_to_coach')).sendKeys('ЖЂШЂШПЋЧЛ !@##%^&(* }{PAUIOYAREWJ/.,');

        createEvent.createEventButton.click();


        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);
        browser.wait(EC.presenceOf(element.all(by.repeater('event in vm.day.events'))), 10000);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(2);
        // Nacin da se proveri tekst
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe('ЖЂШЂШПЋЧЛ !@##%^&(* }{PAUIOYAREWJ/.,');

        // klik na move delete
        browser.wait(EC.presenceOf(calendar.moveDeleteButton), 5000);
        calendar.moveDeleteButton.click();

        // klik na delete
        browser.wait(EC.presenceOf(calendar.deleteButton), 5000);
        calendar.deleteButton.click();

        browser.sleep(500);
        expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(0);

    });
});
