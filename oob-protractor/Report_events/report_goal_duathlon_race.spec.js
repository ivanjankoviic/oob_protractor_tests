

/*

* Reporting Goal-Duathlon race with answer YES and send message
    * Create event Goal - Duathlon race report event with answer YES *HHS 20, 40, 60 and send message
    * Create event Goal - Duathlon race report event with answer YES *HHS 60, 80, 100 and send message

* Reporting Goal - Duathlon race events with answer NO and send message
    * Create event Goal - Duathlon race, report event with answer NO *skip and send message
    * Create event Goal - Duathlon race, report event with answer NO *injury and send message
    * Create event Goal - Duathlon race, report event with answer NO *sick and send message
    * Create event Goal - Duathlon race, report event with answer NO *not motivated and send message

 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');

describe ("Reporting Goal - Duathlon race events with answer YES and send message", function() {


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

    it("Create event Goal - Duathlon race report event with answer YES *HHS 20, 40, 60 and send message", function () {
        console.log("Create event Goal - Duathlon race, report event with answer YES *HHS 20, 40, 60 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(4).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Duathlon race');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).sendKeys('45');
            browser.sleep(300);
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('45');
        });

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).sendKeys('101');
            browser.sleep(300);
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('101');
        });

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).sendKeys('99');
            browser.sleep(300);
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('99');
        });

        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Duathlon race 1h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("completed");
        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.timeCompleted), 5000);
        //provera  vremena
        expect(element(by.css('[range-model="vm.event.goal_run_time"]')).getText()).toEqual('00:00:00');
        expect(element(by.css('[range-model="vm.event.goal_bike_time"')).getText()).toEqual('00:00:00');
        expect(element(by.css('[data-dc-automation="goal-duathlon-run-second-time"]')).getText()).toEqual('00:00:00');

        // //provera koji su podaci upisani u placeholder-e za swim run i average hr
        expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('45');
        expect(reportEvent.goalRunHr.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalBikeDistance.getAttribute('value')).toEqual('1');
        expect(reportEvent.goalBikePower.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalBikeHr.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalRunSecondDistance.getAttribute('value')).toEqual('99');
        expect(reportEvent.goalRunSecondHr.getAttribute('value')).toEqual('0');

        element(by.css('[range-model="vm.event.goal_run_time"]')).click();
        reportEvent.timeHours.sendKeys('05');
        reportEvent.timeMinutes.sendKeys('11');
        reportEvent.timeSeconds.sendKeys('33');
        reportEvent.setButton.click();
        browser.sleep(200);

        element(by.css('[range-model="vm.event.goal_bike_time"')).click();
        reportEvent.timeHours.sendKeys('15');
        reportEvent.timeMinutes.sendKeys('59');
        reportEvent.timeSeconds.sendKeys('59');
        reportEvent.setButton.click();
        browser.sleep(200);

        element(by.css('[data-dc-automation="goal-duathlon-run-second-time"]')).click();
        reportEvent.timeHours.sendKeys('00');
        reportEvent.timeMinutes.sendKeys('00');
        reportEvent.timeSeconds.sendKeys('01');
        reportEvent.setButton.click();
        browser.sleep(200);

        //provera  vremena
        expect(element(by.css('[range-model="vm.event.goal_run_time"]')).getText()).toEqual('05:11:33');
        expect(element(by.css('[range-model="vm.event.goal_bike_time"')).getText()).toEqual('15:59:59');
        expect(element(by.css('[data-dc-automation="goal-duathlon-run-second-time"]')).getText()).toEqual('00:00:01');

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.isDisplayed()).toBeTruthy();
        expect(reportEvent.completed.isPresent()).toBeFalsy();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.getText()).toEqual('not completed');

        // klik na yes kao odgovor i porvera da li postoje elementi
        reportEvent.answerYes.click();
        browser.sleep(300);

        //provera  vremena
        expect(element(by.css('[range-model="vm.event.goal_run_time"]')).getText()).toEqual('05:11:33');
        expect(element(by.css('[range-model="vm.event.goal_bike_time"')).getText()).toEqual('15:59:59');
        expect(element(by.css('[data-dc-automation="goal-duathlon-run-second-time"]')).getText()).toEqual('00:00:01');

        // //provera koji su podaci upisani u placeholder-e za swim run i average hr
        expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('45');
        expect(reportEvent.goalRunHr.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalBikeDistance.getAttribute('value')).toEqual('1');
        expect(reportEvent.goalBikePower.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalBikeHr.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalRunSecondDistance.getAttribute('value')).toEqual('99');
        expect(reportEvent.goalRunSecondHr.getAttribute('value')).toEqual('0');

        // povratak na kalendar
        browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();
        browser.sleep(500);

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(500);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("1272 '");
        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.timeCompleted), 5000);
        //provera  vremena
        expect(element(by.css('[range-model="vm.event.goal_run_time"]')).getText()).toEqual('05:11:33');
        expect(element(by.css('[range-model="vm.event.goal_bike_time"')).getText()).toEqual('15:59:59');
        expect(element(by.css('[data-dc-automation="goal-duathlon-run-second-time"]')).getText()).toEqual('00:00:01');

        // //provera koji su podaci upisani u placeholder-e za swim run i average hr
        expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('45');
        expect(reportEvent.goalRunHr.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalBikeDistance.getAttribute('value')).toEqual('1');
        expect(reportEvent.goalBikePower.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalBikeHr.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalRunSecondDistance.getAttribute('value')).toEqual('99');
        expect(reportEvent.goalRunSecondHr.getAttribute('value')).toEqual('0');

    });
});