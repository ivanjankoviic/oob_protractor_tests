/**
 * Created by ivan on 18.10.17..
 */
//
// /*
//
// * Reporting Goal-Bike events with answer YES and send message
//     * Create event Goal - Bike race - Bike race, report event with answer YES *HHS 20, 40, 60 and send message
//     * Create event Goal - Bike race - Time trial, report event with answer YES *HHS 60, 80, 100 and send message
//
// * Reporting Goal-Bike events with answer NO and send message
//     * Create event Goal - Bike race - Bike race, report event with answer NO *skip and send message
//     * Create event Goal - Bike race - Time trial, report event with answer NO *injury and send message
//
// * Reporting Goal-Swim events with answer YES and send message
//     * Create event Goal - Swim race, report event with answer YES *HSS 20, 40, 60 and send message
//     * Create event Goal - Swim race, report event with answer YES *HHS 60, 80, 100 and send message
//
// * Reporting Goal-Swim events with answer NO and send message
//     * Create event Goal -Swim race, report event with answer NO *skip and send message
//     * Create event Goal -Swim race, report event with answer NO *injury and send message
//
//  */
//
var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');



describe ("Reporting Goal-Bike events", function(){


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

    it ("Create event Goal - Bike race, report event ", function() {
        console.log("Create event Goal - Bike race");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Bike race Time trial');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).sendKeys('25');
            browser.sleep(300);
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('25');
        });

        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Time trial 1h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(200);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.completed.getText()).toEqual("60 '");
        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.timeCompleted), 5000);
        expect(reportEvent.timeCompleted.getText()).toEqual('01:00:00');

        //provera koji su podaci upisani u placeholder-e za swim run i average hr
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('25');

        reportEvent.goalDistance.sendKeys('66');
        browser.sleep(300);
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('66');

        reportEvent.timeCompleted.click();
        browser.sleep(200);
        reportEvent.timeHours.sendKeys('10');
        browser.sleep(200);
        reportEvent.timeMinutes.sendKeys('25');
        browser.sleep(200);
        reportEvent.timeSeconds.sendKeys('45');
        browser.sleep(200);
        reportEvent.setButton.click();
        browser.sleep(200);

        expect(reportEvent.goalAveragePower.getAttribute('placeholder')).toEqual('watt');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('bmp');
        browser.sleep(200);
        reportEvent.goalAveragePower.sendKeys('342');
        browser.sleep(200);
        reportEvent.goalAverageHr.sendKeys('125');

        browser.sleep(500);
        expect(reportEvent.timeCompleted.getText()).toEqual('10:25:45');
        expect(reportEvent.completed.getText()).toEqual("626 '");

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.isDisplayed()).toBeTruthy();
        expect(reportEvent.completed.isPresent()).toBeFalsy();

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerYes.click();
        browser.sleep(500);

        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('66');
        expect(reportEvent.timeCompleted.getText()).toEqual('10:25:45');
        expect(reportEvent.goalAveragePower.getAttribute('value')).toEqual('342');
        expect(reportEvent.goalAverageHr.getAttribute('value')).toEqual('125');
    });
});