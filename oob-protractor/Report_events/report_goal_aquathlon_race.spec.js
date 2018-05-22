
/*

* Reporting Goal-Aquathlon race with answer YES and send message
    * Create event Goal - Aquathlon race, report event with answer YES *HHS 20, 40, 60 and send message
    * Create event Goal - Aquathlon race, report event with answer YES *HHS 60, 80, 100 and send message

 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');

describe ("Reporting Goal-Aquathlon race events with answer YES and send message", function(){


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

    it ("Create event Goal - Aquathlon race, report event with answer YES *HHS 20, 40, 60 and send message", function() {
        console.log("Create event Goal - Aquathlon race, report event with answer YES *HHS 20, 40, 60 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(5).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Aquathlon race');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Aquathlon race 1h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.completed.getText()).toEqual("completed");
        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.timeCompleted), 5000);
        expect(reportEvent.timeCompleted.getText()).toEqual('00:00:00');

        expect(reportEvent.answerYes.isDisplayed()).toBeTruthy();
        expect(reportEvent.answerNo.isDisplayed()).toBeTruthy();
        expect(reportEvent.goalAquathlonSwimTime.isDisplayed()).toBeTruthy();
        expect(reportEvent.goalRunDistance.isDisplayed()).toBeTruthy();
        expect(reportEvent.goalAquathlonRunTime.isDisplayed()).toBeTruthy();
        expect(reportEvent.goalRunHr.isDisplayed()).toBeTruthy();
        expect(reportEvent.happy20.isDisplayed()).toBeTruthy();
        expect(reportEvent.happy40.isDisplayed()).toBeTruthy();
        expect(reportEvent.happy60.isDisplayed()).toBeTruthy();
        expect(reportEvent.happy80.isDisplayed()).toBeTruthy();
        expect(reportEvent.happy100.isDisplayed()).toBeTruthy();
        expect(reportEvent.healthy20.isDisplayed()).toBeTruthy();
        expect(reportEvent.healthy40.isDisplayed()).toBeTruthy();
        expect(reportEvent.healthy60.isDisplayed()).toBeTruthy();
        expect(reportEvent.healthy80.isDisplayed()).toBeTruthy();
        expect(reportEvent.healthy100.isDisplayed()).toBeTruthy();
        expect(reportEvent.strong20.isDisplayed()).toBeTruthy();
        expect(reportEvent.strong40.isDisplayed()).toBeTruthy();
        expect(reportEvent.strong60.isDisplayed()).toBeTruthy();
        expect(reportEvent.strong80.isDisplayed()).toBeTruthy();
        expect(reportEvent.strong100.isDisplayed()).toBeTruthy();

        //provera koji su podaci upisani u placeholder-e za swim run i average hr
        expect(reportEvent.goalSwimDistance.getAttribute('value')).toEqual('1');
        expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('1');
        expect(reportEvent.goalRunHr.getAttribute('placeholder')).toEqual('bmp');

        reportEvent.goalSwimDistance.sendKeys('444');
        browser.sleep(100);
        reportEvent.goalAquathlonSwimTime.click();
        reportEvent.timeHours.sendKeys('00');
        reportEvent.timeMinutes.sendKeys('25');
        reportEvent.timeSeconds.sendKeys('45');
        reportEvent.setButton.click();
        browser.sleep(100);
        reportEvent.goalRunDistance.sendKeys('23');
        reportEvent.goalAquathlonRunTime.click();
        browser.sleep(100);
        reportEvent.timeHours.sendKeys('01');
        reportEvent.timeMinutes.sendKeys('11');
        reportEvent.timeSeconds.sendKeys('59');
        reportEvent.setButton.click();
        browser.sleep(100);
        reportEvent.goalRunHr.clear();
        reportEvent.goalRunHr.sendKeys('120');
        browser.sleep(100);
        browser.wait(EC.presenceOf(reportEvent.happy20), 5000);
        reportEvent.happy20.click();
        browser.sleep(200);
        reportEvent.healthy40.click();
        browser.sleep(200);
        reportEvent.strong60.click();
        browser.sleep(200);
        reportEvent.writeMessage.click();
        reportEvent.newMessage.sendKeys('Færdig!');
        reportEvent.sendMessage.click();
        browser.sleep(400);

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.goalSwimDistance), 5000);
        expect(reportEvent.goalAquathlonSwimTime.getText()).toEqual('00:25:45');
        expect(reportEvent.goalAquathlonRunTime.getText()).toEqual('01:11:59');
        expect(reportEvent.goalSwimDistance.getAttribute('value')).toEqual('444');
        expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('23');
        expect(reportEvent.goalRunHr.getAttribute('value')).toEqual('120');

        expect(element(by.css('[ng-checked="+vm.event.feel[0] > 0"]:checked')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.feel[0] > 20"]:checked')).isPresent()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.feel[1] > 20"]:checked')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.feel[1] > 40"]:checked')).isPresent()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.feel[2] > 40"]:checked')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.feel[2] > 60"]:checked')).isPresent()).toBeFalsy();

        expect(reportEvent.messageContent.getText()).toBe('Færdig!');

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.isDisplayed()).toBeTruthy();
        expect(reportEvent.completed.isPresent()).toBeFalsy();

        browser.wait(EC.presenceOf(reportEvent.skip), 5000);
        expect(reportEvent.skip.isDisplayed()).toBeTruthy();
        expect(reportEvent.notMotivated.isDisplayed()).toBeTruthy();
        expect(reportEvent.tired.isDisplayed()).toBeTruthy();
        expect(reportEvent.injury.isDisplayed()).toBeTruthy();
        expect(reportEvent.sick.isDisplayed()).toBeTruthy();
        expect(reportEvent.writeMessage.isDisplayed()).toBeTruthy();

        // klik na prvi odgovor SKIP
        reportEvent.skip.click();
        reportEvent.writeMessage.click();
        reportEvent.newMessage.sendKeys("Jeg har springet over ...");
        reportEvent.sendMessage.click();

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.skip), 5000);
        expect(reportEvent.skip.isSelected()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.notMotivated), 5000);
        expect(reportEvent.notMotivated.isSelected()).toBeFalsy();
        expect(reportEvent.tired.isSelected()).toBeFalsy();
        expect(reportEvent.injury.isSelected()).toBeFalsy();
        expect(reportEvent.sick.isSelected()).toBeFalsy();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.getText()).toEqual('not completed');

        //nacin da se proveri druga poruka
        expect(element(by.repeater('message in vm.event.messages').row(1)).element(by.css('[data-dc-automation="event-message-content"]')).getText()).toBe("Jeg har springet over ...");

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerYes.click();
        browser.sleep(500);

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.goalSwimDistance), 5000);
        expect(reportEvent.goalAquathlonSwimTime.getText()).toEqual('00:25:45');
        expect(reportEvent.goalAquathlonRunTime.getText()).toEqual('01:11:59');
        expect(reportEvent.goalSwimDistance.getAttribute('value')).toEqual('444');
        expect(reportEvent.goalRunDistance.getAttribute('value')).toEqual('23');
        expect(reportEvent.goalRunHr.getAttribute('value')).toEqual('120');
    });

});

