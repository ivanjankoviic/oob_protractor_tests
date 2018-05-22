
/*

* Reporting Goal-Triathlon race with answer YES and send message
    * Create event Goal - Triathlon race - Sprint, report event with answer YES *HHS 20, 40, 60 and send message
    * Create event Goal - Triathlon race - Olympic distance, report event with answer YES *HHS 60, 80, 100 and send message
    * Create event Goal - Triathlon race - Half ironman, report event with answer YES *HHS 20, 40, 60 and send message
    * Create event Goal - Triathlon race - Ironman, report event with answer YES *HHS 60, 80, 100 and send message
    * Create event Goal - Triathlon race - Others, report event with answer YES *HHS 20, 40, 60 and send message

* Reporting Goal-Triathlon race events with answer NO and send message
    * Create event Goal - Triathlon race - Sprint, report event with answer NO *skip and send message
    * Create event Goal - Triathlon race - Olympic distance, report event with answer NO *injury and send message
    * Create event Goal - Triathlon race - Half ironman, report event with answer NO *sick and send message
    * Create event Goal - Triathlon race - Ironman, report event with answer NO *not motivated and send message
    * Create event Goal - Triathlon race - Others, report event with answer NO *tired and send message
 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');

describe ("Reporting Goal-Triathlon race events with answer YES and send message", function(){


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
            browser.sleep(1000);
            browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 20000);
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

    it ("Create event Goal - Triathlon race - Sprint, report event with answer NO *skip and send message", function() {
        console.log("Create event Goal - Triathlon race - Sprint, report event with answer NO *skip and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(3).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Triathlon race Sprint');

        //duration field
        expect(createEvent.durationField.getAttribute('value')).toEqual('90');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('750');
            browser.sleep(100);
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('20');
            browser.sleep(100);
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('5');
        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Sprint 1h 30'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("completed");

        //provera upisanih vrednosti
        expect(reportEvent.goalTriathlonSwimTime.getText()).toEqual('00:00:00');
        expect(reportEvent.goalTriathlonBikeTime.getText()).toEqual('00:00:00');
        expect(reportEvent.goalTriathlonRunTime.getText()).toEqual('00:00:00');
        expect(reportEvent.goalSwimDistance.getAttribute('value')).toEqual('750');
        expect(reportEvent.goalBikeDistance.getAttribute('value')).toEqual('20');
        expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('5');
        expect(reportEvent.goalBikePower.getAttribute('placeholder')).toEqual('watt');
        expect(reportEvent.goalBikeHr.getAttribute('placeholder')).toEqual('hr');
        expect(reportEvent.goalRunHr.getAttribute('placeholder')).toEqual('hr');



        // reportEvent.goalTriathlonSwimTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('45');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('45');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonBikeTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('45');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('45');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonRunTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('45');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('45');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalSwimDistance.sendKeys('423');
        // browser.sleep(300);
        // reportEvent.goalBikeDistance.sendKeys('35');
        // browser.sleep(300);
        // reportEvent.goalRunDistance.sendKeys('234');
        // browser.sleep(300);
        // reportEvent.goalBikePower.sendKeys('111');
        // browser.sleep(300);
        // reportEvent.goalBikeHr.sendKeys('222');
        // browser.sleep(300);
        // reportEvent.goalRunHr.sendKeys('333');
        // browser.sleep(300);
        //
        // browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        // expect(reportEvent.completed.getText()).toEqual("8135 '");
        // browser.sleep(200);
        //
        // //provera upisanih vrednosti
        // expect(reportEvent.goalTriathlonSwimTime.getText()).toEqual('45:11:45');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonBikeTime.getText()).toEqual('45:11:45');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonRunTime.getText()).toEqual('45:11:45');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalSwimDistance.getAttribute('value')).toEqual('423');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeDistance.getAttribute('value')).toEqual('35');
        // browser.sleep(200);
        // expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('234');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalBikePower.getAttribute('value')).toEqual('111');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeHr.getAttribute('value')).toEqual('222');
        // browser.sleep(200);
        // expect(reportEvent.goalRunHr.getAttribute('value')).toEqual('333');
        // browser.sleep(200);




        // // povratak na kalendar
        // browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
        // calendar.showMenuButton.click();
        // calendar.showMenuCalendarButton.click();
        // browser.sleep(303);
        //
        // //klik na event i provera da li su svi elementi vidljivi
        // element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        // browser.sleep(300);
        //
        // browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        // expect(reportEvent.completed.getText()).toEqual("8135 '");
        // browser.sleep(200);
        //
        // //provera upisanih vrednosti
        // expect(reportEvent.goalTriathlonSwimTime.getText()).toEqual('45:11:45');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonBikeTime.getText()).toEqual('45:11:45');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonRunTime.getText()).toEqual('45:11:45');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalSwimDistance.getAttribute('value')).toEqual('423');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeDistance.getAttribute('value')).toEqual('35');
        // browser.sleep(200);
        // expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('234');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalBikePower.getAttribute('value')).toEqual('111');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeHr.getAttribute('value')).toEqual('222');
        // browser.sleep(200);
        // expect(reportEvent.goalRunHr.getAttribute('value')).toEqual('333');
        // browser.sleep(300);
        //
        // // klik na NO kao odgovor i porvera da li postoje elementi
        // reportEvent.answerNo.click();
        //
        // browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        // expect(reportEvent.notCompleted.isDisplayed()).toBeTruthy();
        // expect(reportEvent.completed.isPresent()).toBeFalsy();
        //
        // browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        // expect(reportEvent.notCompleted.getText()).toEqual('not completed');
        //
        // // klik na yes kao odgovor i porvera da li postoje elementi
        // reportEvent.answerYes.click();
        // browser.sleep(300);
        //
        // browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        // expect(reportEvent.completed.getText()).toEqual("8135 '");
        // browser.sleep(200);
        //
        // //provera upisanih vrednosti
        // expect(reportEvent.goalTriathlonSwimTime.getText()).toEqual('45:11:45');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonBikeTime.getText()).toEqual('45:11:45');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonRunTime.getText()).toEqual('45:11:45');
        // browser.sleep(200);
        // expect(reportEvent.goalSwimDistance.getAttribute('value')).toEqual('423');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeDistance.getAttribute('value')).toEqual('35');
        // browser.sleep(200);
        // expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('234');
        // browser.sleep(200);
        // expect(reportEvent.goalBikePower.getAttribute('value')).toEqual('111');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeHr.getAttribute('value')).toEqual('222');
        // browser.sleep(200);
        // expect(reportEvent.goalRunHr.getAttribute('value')).toEqual('333');
    });

    it ("Create event Goal - Triathlon race - Olympic distance, report event with answer YES *HHS 60, 80, 100 and send message", function() {
        console.log("Create event Goal - Triathlon race - Olympic distance, report event with answer YES *HHS 60, 80, 100 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(3).click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(300);

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toBe('Goal Triathlon race Olympic distance');
        //duration field
        expect(createEvent.durationField.getAttribute('value')).toBe('150');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('1500');
            browser.sleep(200);
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('40');
            browser.sleep(200);
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('10');

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Olympic distance 2h 30'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("completed");

        //provera upisanih vrednosti
        expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalTriathlonRunTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('1500');
        expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('40');
        expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('10');
        expect(reportEvent.goalBikePower.getAttribute('placeholder')).toBe('watt');
        expect(reportEvent.goalBikeHr.getAttribute('placeholder')).toBe('hr');
        expect(reportEvent.goalRunHr.getAttribute('placeholder')).toBe('hr');

        // reportEvent.goalTriathlonSwimTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('32');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('32');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonBikeTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonRunTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('22');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('33');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalSwimDistance.sendKeys('1');
        // browser.sleep(100);
        // reportEvent.goalBikeDistance.sendKeys('2');
        // browser.sleep(100);
        // reportEvent.goalRunDistance.sendKeys('3');
        // browser.sleep(100);
        // reportEvent.goalBikePower.sendKeys('4');
        // browser.sleep(100);
        // reportEvent.goalBikeHr.sendKeys('5');
        // browser.sleep(100);
        // reportEvent.goalRunHr.sendKeys('6');
        // browser.sleep(300);
        //
        // browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        // expect(reportEvent.completed.getText()).toBe("2024 '");
        //
        // //provera upisanih vrednosti
        // expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('11:32:32');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonRunTime.getText()).toBe('22:11:33');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('1');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('2');
        // browser.sleep(200);
        // expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('3');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalBikePower.getAttribute('value')).toBe('4');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeHr.getAttribute('value')).toBe('5');
        // browser.sleep(200);
        // expect(reportEvent.goalRunHr.getAttribute('value')).toBe('6');




        // // klik na NO kao odgovor i porvera da li postoje elementi
        // reportEvent.answerNo.click();
        //
        // browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        // expect(reportEvent.notCompleted.isDisplayed()).toBeTruthy();
        // expect(reportEvent.completed.isPresent()).toBeFalsy();
        //
        // browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        // expect(reportEvent.notCompleted.getText()).toEqual('not completed');
        //
        // // klik na yes kao odgovor i porvera da li postoje elementi
        // reportEvent.answerYes.click();
        // browser.sleep(500);
        //
        // browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        // expect(reportEvent.completed.getText()).toEqual("2024 '");
        //
        // //provera upisanih vrednosti
        // expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('11:32:32');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonRunTime.getText()).toBe('22:11:33');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('1');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('2');
        // browser.sleep(200);
        // expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('3');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalBikePower.getAttribute('value')).toBe('4');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeHr.getAttribute('value')).toBe('5');
        // browser.sleep(200);
        // expect(reportEvent.goalRunHr.getAttribute('value')).toBe('6');

    });

    it ("Create event Goal - Triathlon race - Half ironman, report event with answer YES *HHS 20, 40, 60 and send message", function() {
         console.log("Create event Goal - Triathlon race - Half ironman, report event with answer YES *HHS 20, 40, 60 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(3).click();
        browser.sleep(100);
        addEvent.categoris.get(2).click();
        browser.sleep(300);

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toBe('Goal Triathlon race Half ironman');
        //duration field
        expect(createEvent.durationField.getAttribute('value')).toBe('360');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('1900');
            browser.sleep(200);
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('90');
            browser.sleep(200);
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('21.098');

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Half ironman 6h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toBe("completed");

        //provera upisanih vrednosti
        expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalTriathlonRunTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('1900');
        expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('90');
        expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('21.098');
        expect(reportEvent.goalBikePower.getAttribute('placeholder')).toBe('watt');
        expect(reportEvent.goalBikeHr.getAttribute('placeholder')).toBe('hr');
        expect(reportEvent.goalRunHr.getAttribute('placeholder')).toBe('hr');

        // reportEvent.goalTriathlonSwimTime.click();
        // reportEvent.timeHours.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('32');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('32');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonBikeTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonRunTime.click();
        // reportEvent.timeHours.sendKeys('22');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('33');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        // reportEvent.goalSwimDistance.sendKeys('1');
        // browser.sleep(100);
        // reportEvent.goalBikeDistance.sendKeys('2');
        // browser.sleep(100);
        // reportEvent.goalRunDistance.sendKeys('3');
        // browser.sleep(100);
        // reportEvent.goalBikePower.sendKeys('4');
        // browser.sleep(100);
        // reportEvent.goalBikeHr.sendKeys('5');
        // browser.sleep(100);
        // reportEvent.goalRunHr.sendKeys('6');
        // browser.sleep(300);
        //
        // browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        // expect(reportEvent.completed.getText()).toBe("2024 '");
        //
        // //provera upisanih vrednosti
        // expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('11:32:32');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonRunTime.getText()).toBe('22:11:33');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('1');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('2');
        // browser.sleep(200);
        // expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('3');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalBikePower.getAttribute('value')).toBe('4');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeHr.getAttribute('value')).toBe('5');
        // browser.sleep(200);
        // expect(reportEvent.goalRunHr.getAttribute('value')).toBe('6');





        // // klik na NO kao odgovor i porvera da li postoje elementi
        // reportEvent.answerNo.click();
        //
        // browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        // expect(reportEvent.notCompleted.isDisplayed()).toBeTruthy();
        // expect(reportEvent.completed.isPresent()).toBeFalsy();
        //
        // browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        // expect(reportEvent.notCompleted.getText()).toBe('not completed');
        //
        // // klik na yes kao odgovor i porvera da li postoje elementi
        // reportEvent.answerYes.click();
        // browser.sleep(500);
        //
        // browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        // expect(reportEvent.completed.getText()).toEqual("2024 '");
        //
        // //provera upisanih vrednosti
        // expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('11:32:32');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonRunTime.getText()).toBe('22:11:33');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('1');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('2');
        // browser.sleep(200);
        // expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('3');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalBikePower.getAttribute('value')).toBe('4');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeHr.getAttribute('value')).toBe('5');
        // browser.sleep(200);
        // expect(reportEvent.goalRunHr.getAttribute('value')).toBe('6');

    });

    it ("Create event Goal - Triathlon race - Ironman, report event with answer YES *HHS 60, 80, 100 and send message", function() {
        console.log("Create event Goal - Triathlon race - Ironman, report event with answer YES *HHS 60, 80, 100 a");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(3).click();
        browser.sleep(100);
        addEvent.categoris.get(3).click();
        browser.sleep(300);

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toBe('Goal Triathlon race Ironman');
        //duration field
        expect(createEvent.durationField.getAttribute('value')).toBe('780');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('3800');
            browser.sleep(200);
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('180');
            browser.sleep(200);
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('42.195');

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Ironman 13h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        //provera upisanih vrednosti
        expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalTriathlonRunTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('3800');
        expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('180');
        expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('42.195');
        expect(reportEvent.goalBikePower.getAttribute('placeholder')).toBe('watt');
        expect(reportEvent.goalBikeHr.getAttribute('placeholder')).toBe('hr');
        expect(reportEvent.goalRunHr.getAttribute('placeholder')).toBe('hr');

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toBe("completed");

        // reportEvent.goalTriathlonSwimTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('32');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('32');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonBikeTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonRunTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('22');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('33');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        // reportEvent.goalSwimDistance.sendKeys('1');
        // browser.sleep(100);
        // reportEvent.goalBikeDistance.sendKeys('2');
        // browser.sleep(100);
        // reportEvent.goalRunDistance.sendKeys('3');
        // browser.sleep(100);
        // reportEvent.goalBikePower.sendKeys('4');
        // browser.sleep(100);
        // reportEvent.goalBikeHr.sendKeys('5');
        // browser.sleep(100);
        // reportEvent.goalRunHr.sendKeys('6');
        // browser.sleep(300);
        //
        // browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        // expect(reportEvent.completed.getText()).toBe("2024 '");
        //
        // //provera upisanih vrednosti
        // expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('11:32:32');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonRunTime.getText()).toBe('22:11:33');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('1');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('2');
        // browser.sleep(200);
        // expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('3');
        // browser.sleep(300);
        //
        // expect(reportEvent.goalBikePower.getAttribute('value')).toBe('4');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeHr.getAttribute('value')).toBe('5');
        // browser.sleep(200);
        // expect(reportEvent.goalRunHr.getAttribute('value')).toBe('6');

    });

    it ("Create event Goal - Triathlon race - Others, report event with answer YES *HHS 20, 40, 60 and send message", function() {
        console.log("Create event Goal - Triathlon race - Others, report event with answer YES *HHS 20, 40, 60 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(3).click();
        browser.sleep(100);
        addEvent.categoris.get(4).click();
        browser.sleep(300);

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toBe('Goal Triathlon race Others');
        //duration field
        expect(createEvent.durationField.getAttribute('value')).toBe('150');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('');
            browser.sleep(200);
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('');
            browser.sleep(200);
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toBe('');

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Others 2h 30'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toBe("completed");

        //provera upisanih vrednosti
        expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalTriathlonRunTime.getText()).toBe('00:00:00');
        expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('1');
        expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('1');
        expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('1');
        expect(reportEvent.goalBikePower.getAttribute('placeholder')).toBe('watt');
        expect(reportEvent.goalBikeHr.getAttribute('placeholder')).toBe('hr');
        expect(reportEvent.goalRunHr.getAttribute('placeholder')).toBe('hr');

        // reportEvent.goalTriathlonSwimTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('32');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('32');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonBikeTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('00');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        //
        // reportEvent.goalTriathlonRunTime.click();
        // browser.sleep(200);
        // reportEvent.timeHours.sendKeys('22');
        // browser.sleep(200);
        // reportEvent.timeMinutes.sendKeys('11');
        // browser.sleep(200);
        // reportEvent.timeSeconds.sendKeys('33');
        // browser.sleep(200);
        // reportEvent.setButton.click();
        // browser.sleep(100);
        // reportEvent.goalSwimDistance.sendKeys('1');
        // browser.sleep(100);
        // reportEvent.goalBikeDistance.sendKeys('2');
        // browser.sleep(100);
        // reportEvent.goalRunDistance.sendKeys('3');
        // browser.sleep(100);
        // reportEvent.goalBikePower.sendKeys('4');
        // browser.sleep(100);
        // reportEvent.goalBikeHr.sendKeys('5');
        // browser.sleep(100);
        // reportEvent.goalRunHr.sendKeys('6');
        // browser.sleep(300);
        //
        // browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        // expect(reportEvent.completed.getText()).toBe("2024 '");
        //
        // //provera upisanih vrednosti
        // expect(reportEvent.goalTriathlonSwimTime.getText()).toBe('11:32:32');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonBikeTime.getText()).toBe('00:00:00');
        // browser.sleep(200);
        // expect(reportEvent.goalTriathlonRunTime.getText()).toBe('22:11:33');
        // browser.sleep(100);
        //
        // expect(reportEvent.goalSwimDistance.getAttribute('value')).toBe('1');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeDistance.getAttribute('value')).toBe('2');
        // browser.sleep(200);
        // expect(reportEvent.goalRunDistance.getAttribute('value')).toBe('3');
        // browser.sleep(100);
        //
        // expect(reportEvent.goalBikePower.getAttribute('value')).toBe('4');
        // browser.sleep(200);
        // expect(reportEvent.goalBikeHr.getAttribute('value')).toBe('5');
        // browser.sleep(200);
        // expect(reportEvent.goalRunHr.getAttribute('value')).toBe('6');

    });
});
