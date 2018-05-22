

/*

* Reporting Activity - Yoga events with answer YES and send message
    * Create event Activity - Yoga - Power yoga, report event with answer YES *HHS 20, 40, 60 and send message
    * Create event Activity - Yoga - Yoga, report event with answer YES *HHS 60, 80, 100 and send message
    * Create event Activity - Yoga - Bikram yoga, report event with answer YES *HHS 20, 40, 60 and send message

* Reporting Activity - Yoga events with answer NO and send message
    * Create event Activity - Yoga - Power yoga, report event with answer NO * and send message
    * Create event Activity - Yoga - Yoga, report event with answer NO * and send message
    * Create event Activity - Yoga - Bikram yoga, report event with answer NO * and send message

 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');

describe ("Reporting Activity - Yoga events with answer YES and send message", function(){


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

    it ("Create event Activity - Yoga - Power yoga, report event with answer YES *HHS 20, 40, 60 and send message", function() {
        console.log("Create event Activity - Yoga - Power yoga, report event with answer YES *HHS 20, 40, 60 and send message");

        browser.sleep(3000);
        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(9).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Yoga Power yoga');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Power yoga 1h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.answerYes.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.answerNo), 5000);
        expect(reportEvent.answerNo.isDisplayed()).toBeTruthy();

        expect(reportEvent.timeCompleted.isDisplayed()).toBeTruthy();
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
        expect(reportEvent.writeMessage.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.notCompleted.isPresent()).toBeFalsy();
        expect(reportEvent.completed.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.completed.getText()).toEqual("60 '");

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.timeCompleted), 5000);
        expect(reportEvent.timeCompleted.getText()).toEqual('01:00:00');

        reportEvent.timeCompleted.click();
        reportEvent.timeHours.sendKeys('16');
        reportEvent.timeMinutes.sendKeys('59');
        reportEvent.timeSeconds.sendKeys('59');
        reportEvent.setButton.click();
        browser.sleep(200);
        browser.wait(EC.elementToBeClickable(reportEvent.happy20), 5000);
        reportEvent.happy20.click();
        browser.sleep(200);
        browser.wait(EC.elementToBeClickable(reportEvent.healthy40), 5000);
        reportEvent.healthy40.click();
        browser.sleep(200);
        browser.wait(EC.elementToBeClickable(reportEvent.strong60), 5000);
        reportEvent.strong60.click();
        browser.sleep(200);
        reportEvent.writeMessage.click();
        reportEvent.newMessage.sendKeys('Færdig!');
        reportEvent.sendMessage.click();
        browser.sleep(200);

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.timeCompleted), 5000);
        expect(reportEvent.timeCompleted.getText()).toEqual('16:59:59');

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.completed.getText()).toEqual("1020 '");

        browser.wait(EC.presenceOf(reportEvent.happy20), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[0] > 0"]:checked')).isSelected()).toBeTruthy();
        browser.wait(EC.presenceOf(reportEvent.happy40), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[0] > 20"]:checked')).isPresent()).toBeFalsy();
        browser.wait(EC.presenceOf(reportEvent.healthy40), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[1] > 20"]:checked')).isSelected()).toBeTruthy();
        browser.wait(EC.presenceOf(reportEvent.strong60), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[2] > 40"]:checked')).isSelected()).toBeTruthy();
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
        reportEvent.newMessage.sendKeys("Jeg har :) springet over ...");
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
        expect(element(by.repeater('message in vm.event.messages').row(1)).element(by.css('[data-dc-automation="event-message-content"]')).getText()).toBe("Jeg har :) springet over ...");


    });

    it ("Create event Activity - Yoga - Yoga, report event with answer YES *HHS 60, 80, 100 and send message", function() {
        console.log("Create event Activity - Yoga - Yoga, report event with answer YES *HHS 60, 80, 100 and send message");

        browser.sleep(3000);
        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(9).click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Yoga Yoga');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Yoga 1h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.answerYes.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.completed.getText()).toEqual("60 '");

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.timeCompleted), 5000);
        expect(reportEvent.timeCompleted.getText()).toEqual('01:00:00');

        reportEvent.timeCompleted.click();
        reportEvent.timeHours.sendKeys('10');
        reportEvent.timeMinutes.sendKeys('59');
        reportEvent.timeSeconds.sendKeys('59');
        reportEvent.setButton.click();
        browser.sleep(200);

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.timeCompleted), 5000);
        expect(reportEvent.timeCompleted.getText()).toEqual('10:59:59');

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.completed.getText()).toEqual("660 '");

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        // klik na prvi odgovor SKIP
        reportEvent.notMotivated.click();

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.skip), 5000);
        expect(reportEvent.notMotivated.isSelected()).toBeTruthy();

    });

    it ("Create event Activity - Yoga - Bikram yoga, report event with answer YES *HHS 20, 40, 60 and send message", function() {
        console.log("Create event Activity - Yoga - Bikram yoga, report event with answer YES *HHS 20, 40, 60 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(9).click();
        browser.sleep(100);
        addEvent.categoris.get(2).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Yoga Bikram yoga');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Bikram yoga 1h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.answerYes.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.completed.getText()).toEqual("60 '");

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.timeCompleted), 5000);
        expect(reportEvent.timeCompleted.getText()).toEqual('01:00:00');

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        // klik na prvi odgovor SKIP
        reportEvent.notMotivated.click();
        browser.sleep(300);

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.skip), 5000);
        expect(reportEvent.notMotivated.isSelected()).toBeTruthy();

    });

});