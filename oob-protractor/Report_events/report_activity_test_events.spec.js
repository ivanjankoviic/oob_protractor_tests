

/*


 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');

describe ("Reporting Activity - Test - Run test event with answer YES and send message", function(){

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
        var uri = config.backend_uri +"/avl/user?username="+config.username2;
        setup_service.delete_user(uri);
    });

    var setup_service = new SetupService;
    var login = new Login();
    var calendar = new Calendar();
    var addEvent = new AddEvent();
    var createEvent = new CreateEvent();
    var reportEvent = new ReportEvent();
    var config = new Config();
    var dialog;
    var EC = protractor.ExpectedConditions;

    it ("Create event Activity- Test - Run test 3 km, report event with answer YES and send message", function() {
        console.log("Create event Activity- Test - Test, report event with answer YES and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollHeight;");
        browser.sleep(100);
        addEvent.categoris.get(10).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(200);

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Test Run test 3 km');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Run test 3 km 45'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);
        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.answerYes.isDisplayed()).toBeTruthy();
        expect(reportEvent.answerNo.isDisplayed()).toBeTruthy();
        expect(reportEvent.timeCompletedWithoutHours.isDisplayed()).toBeTruthy();
        expect(reportEvent.testRunDistance.isDisplayed()).toBeTruthy();
        expect(reportEvent.testRunHr.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.happy20), 5000);
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

        //nacin da se proveri tekst u distance
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-distance-0"]')).getAttribute('value')).toEqual('3');
        });

        element(by.repeater('_i in vm.event.test_repeat').row(0)).element(by.css('[dc-data-autmation="run-test-distance-0"]')).sendKeys('2');

        browser.sleep(400);
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-distance-0"]')).getAttribute('value')).toEqual('2');
        });

        //nacin da se proveri tekst u time mm:ss
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(0).getText()).toBe("00:00");

        element(by.repeater('_i in vm.event.test_repeat').row(0)).element(by.css('[dc-data-autmation="run-test-time-0"]')).click();
        browser.sleep(200);
        reportEvent.timeMinutes.sendKeys('45');
        browser.sleep(200);
        reportEvent.timeSeconds.sendKeys('45');
        browser.sleep(200);
        reportEvent.setButton.click();

        browser.sleep(400);
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(0).getText()).toBe("45:45");
        browser.sleep(200);

        //us u average hr
        element(by.repeater('_i in vm.event.test_repeat').row(0)).element(by.css('[dc-data-autmation="run-test-hr-0"]')).sendKeys('23');

        //nacin da se proveri tekst u average hr
        browser.sleep(400);
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-hr-0"]')).getAttribute('value')).toEqual('23');
        });

        browser.wait(EC.presenceOf(reportEvent.happy20), 5000);
        reportEvent.happy20.click();
        browser.sleep(200);
        reportEvent.healthy40.click();
        browser.sleep(200);
        reportEvent.strong60.click();
        browser.sleep(200);
        reportEvent.writeMessage.click();
        reportEvent.newMessage.sendKeys('Done!');
        reportEvent.sendMessage.click();
        reportEvent.saveTest.click();

        browser.driver.sleep(2000);
        expect(reportEvent.messages.getText()).toEqual('Congratulations, we have created zones for your running. Your zones will guide you in your training. Follow them to make sure you get progress and avoid injuries. Your zones will be adjusted to your fitness each month. You can find your zones under your profile.');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();

        browser.wait(EC.presenceOf(reportEvent.happy20), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[0] > 0"]:checked')).isSelected()).toBeTruthy();
        browser.wait(EC.presenceOf(reportEvent.happy40), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[0] > 20"]:checked')).isPresent()).toBeFalsy();

        browser.wait(EC.presenceOf(reportEvent.healthy40), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[1] > 20"]:checked')).isSelected()).toBeTruthy();
        browser.wait(EC.presenceOf(reportEvent.healthy60), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[1] > 40"]:checked')).isPresent()).toBeFalsy();

        browser.wait(EC.presenceOf(reportEvent.strong60), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[2] > 40"]:checked')).isSelected()).toBeTruthy();
        browser.wait(EC.presenceOf(reportEvent.strong80), 5000);
        expect(element(by.css('[ng-checked="+vm.event.feel[2] > 60"]:checked')).isPresent()).toBeFalsy();
        expect(reportEvent.messageContent.getText()).toBe('Done!');

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

    });

    it ("Create event Activity- Test - Run test 3x1 km, report event with answer YES and send message", function() {
        console.log("Create event Activity- Test - Run test 3x1 km, report event with answer YES and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollHeight;");
        browser.sleep(100);
        addEvent.categoris.get(10).click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(200);

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Test Run test 3x1 km');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();
        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(500);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Run test 3x1 km 45'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);


        //nacin da se proveri tekst u distance
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-distance-0"]')).getAttribute('value')).toEqual('1');
            expect(element(by.css('[dc-data-autmation="run-test-distance-1"]')).getAttribute('value')).toEqual('1');
            expect(element(by.css('[dc-data-autmation="run-test-distance-2"]')).getAttribute('value')).toEqual('1');

        });
       // za ng-repeter
       element.all(by.repeater('_i in vm.event.test_repeat')).then(
           function(dist) {
               dist[0].element(by.css('[dc-data-autmation="run-test-distance-0"]')).sendKeys('2');
               browser.sleep(100);
               dist[1].element(by.css('[dc-data-autmation="run-test-distance-1"]')).sendKeys('3');
               browser.sleep(100);
               dist[2].element(by.css('[dc-data-autmation="run-test-distance-2"]')).sendKeys('4');

           }
       );

       browser.sleep(300);
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-distance-0"]')).getAttribute('value')).toEqual('2');
            expect(element(by.css('[dc-data-autmation="run-test-distance-1"]')).getAttribute('value')).toEqual('3');
            expect(element(by.css('[dc-data-autmation="run-test-distance-2"]')).getAttribute('value')).toEqual('4');

        });

        //nacin da se proveri tekst u time mm:ss
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(0).getText()).toBe("00:00");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(1).getText()).toBe("00:00");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(2).getText()).toBe("00:00");

        element.all(by.repeater('_i in vm.event.test_repeat')).then(
            function(time) {
                time[0].element(by.css('[dc-data-autmation="run-test-time-0"]')).click();
                    reportEvent.timeMinutes.sendKeys('45');
                    browser.sleep(200);
                    reportEvent.timeSeconds.sendKeys('45');
                    reportEvent.setButton.click();
                browser.sleep(500);
                time[1].element(by.css('[dc-data-autmation="run-test-time-1"]')).click();
                    reportEvent.timeMinutes.sendKeys('33');
                    browser.sleep(200);
                    reportEvent.timeSeconds.sendKeys('33');
                    browser.sleep(200);
                    reportEvent.setButton.click();
                browser.sleep(500);
                time[2].element(by.css('[dc-data-autmation="run-test-time-2"]')).click();
                    reportEvent.timeMinutes.sendKeys('11');
                    browser.sleep(200);
                    reportEvent.timeSeconds.sendKeys('59');
                    browser.sleep(200);
                    reportEvent.setButton.click();
            }
        );
        browser.sleep(100);
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(0).getText()).toBe("45:45");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(1).getText()).toBe("33:33");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(2).getText()).toBe("11:59");

        //nacin da se proveri tekst u average hr
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-hr-0"]')).getAttribute('value')).toEqual('0');
            expect(element(by.css('[dc-data-autmation="run-test-hr-1"]')).getAttribute('value')).toEqual('0');
            expect(element(by.css('[dc-data-autmation="run-test-hr-2"]')).getAttribute('value')).toEqual('0');

        });
        element.all(by.repeater('_i in vm.event.test_repeat')).then(
            function(hr) {
                hr[0].element(by.css('[dc-data-autmation="run-test-hr-0"]')).sendKeys('11');
                browser.sleep(100);
                hr[1].element(by.css('[dc-data-autmation="run-test-hr-1"]')).sendKeys('0');
                browser.sleep(100);
                hr[2].element(by.css('[dc-data-autmation="run-test-hr-2"]')).sendKeys('321');
            }
        );

        //nacin da se proveri tekst u average hr
        browser.sleep(400);
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-hr-0"]')).getAttribute('value')).toEqual('11');
            expect(element(by.css('[dc-data-autmation="run-test-hr-1"]')).getAttribute('value')).toEqual('0');
            expect(element(by.css('[dc-data-autmation="run-test-hr-2"]')).getAttribute('value')).toEqual('321');
        });


        reportEvent.writeMessage.click();
        reportEvent.newMessage.sendKeys('Done!');
        reportEvent.sendMessage.click();
        reportEvent.saveTest.click();

        browser.driver.sleep(2000);
        expect(reportEvent.messages.getText()).toEqual('Congratulations, we have created zones for your running. Your zones will guide you in your training. Follow them to make sure you get progress and avoid injuries. Your zones will be adjusted to your fitness each month. You can find your zones under your profile.');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();

        expect(reportEvent.messageContent.getText()).toBe('Done!');

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        // klik na prvi odgovor SKIP
        reportEvent.skip.click();
        reportEvent.writeMessage.click();
        reportEvent.newMessage.sendKeys("Jeg har springet over ...");
        reportEvent.sendMessage.click();
        browser.driver.sleep(500);

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.skip), 5000);
        expect(reportEvent.skip.isSelected()).toBeTruthy();

        //nacin da se proveri druga poruka
        expect(element(by.repeater('message in vm.event.messages').row(1)).element(by.css('[data-dc-automation="event-message-content"]')).getText()).toBe("Jeg har springet over ...");

    });

    it ("Create event Activity- Test - Run test 5 km, report event with answer YES and send message", function() {
        console.log("Create event Activity- Test - Run test 5 km, report event with answer YES and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollHeight;");
        browser.sleep(100);
        addEvent.categoris.get(10).click();
        browser.sleep(100);
        addEvent.categoris.get(2).click();
        browser.sleep(200);

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Test Run test 5 km');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Run test 5 km 1h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        //nacin da se proveri tekst u distance
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-distance-0"]')).getAttribute('value')).toEqual('5');
        });
        browser.sleep(200);

        element(by.repeater('_i in vm.event.test_repeat').row(0)).element(by.css('[dc-data-autmation="run-test-distance-0"]')).sendKeys('2');

        browser.sleep(400);
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-distance-0"]')).getAttribute('value')).toEqual('2');
        });

        //nacin da se proveri tekst u time mm:ss
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(0).getText()).toBe("00:00");

        element(by.repeater('_i in vm.event.test_repeat').row(0)).element(by.css('[dc-data-autmation="run-test-time-0"]')).click();
        browser.sleep(200);
        reportEvent.timeMinutes.sendKeys('45');
        browser.sleep(200);
        reportEvent.timeSeconds.sendKeys('45');
        reportEvent.setButton.click();

        browser.sleep(400);
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(0).getText()).toBe("45:45");
        browser.sleep(200);

        //us u average hr
        element(by.repeater('_i in vm.event.test_repeat').row(0)).element(by.css('[dc-data-autmation="run-test-hr-0"]')).sendKeys('23');

        //nacin da se proveri tekst u average hr
        browser.sleep(400);
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-hr-0"]')).getAttribute('value')).toEqual('23');
        });

        reportEvent.saveTest.click();
        browser.driver.sleep(2000);
        expect(reportEvent.messages.getText()).toEqual('Congratulations, we have created zones for your running. Your zones will guide you in your training. Follow them to make sure you get progress and avoid injuries. Your zones will be adjusted to your fitness each month. You can find your zones under your profile.');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.isDisplayed()).toBeTruthy();
        expect(reportEvent.completed.isPresent()).toBeFalsy();

        // klik na prvi odgovor SKIP
        reportEvent.injury.click();

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.skip), 5000);
        expect(reportEvent.injury.isSelected()).toBeTruthy();

    });


    it ("Create event Activity- Test - Run test 5x1 km, report event with answer YES and send message", function() {
        console.log("Create event Activity- Test - Run test 5x1 km, report event with answer YES and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollHeight;");
        //klik na Test
        addEvent.categoris.get(10).click();
        browser.sleep(100);
        addEvent.categoris.get(3).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Test Run test 5x1 km');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Run test 5x1 km 1h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);


        //nacin da se proveri tekst u distance
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-distance-0"]')).getAttribute('value')).toEqual('1');
            expect(element(by.css('[dc-data-autmation="run-test-distance-1"]')).getAttribute('value')).toEqual('1');
            expect(element(by.css('[dc-data-autmation="run-test-distance-2"]')).getAttribute('value')).toEqual('1');
            expect(element(by.css('[dc-data-autmation="run-test-distance-3"]')).getAttribute('value')).toEqual('1');
            expect(element(by.css('[dc-data-autmation="run-test-distance-4"]')).getAttribute('value')).toEqual('1');

        });
        // za ng-repeter
        element.all(by.repeater('_i in vm.event.test_repeat')).then(
            function(dist) {
                dist[0].element(by.css('[dc-data-autmation="run-test-distance-0"]')).sendKeys('2');
                browser.sleep(100);
                dist[1].element(by.css('[dc-data-autmation="run-test-distance-1"]')).sendKeys('3');
                browser.sleep(100);
                dist[2].element(by.css('[dc-data-autmation="run-test-distance-2"]')).sendKeys('4');
                browser.sleep(100);
                dist[3].element(by.css('[dc-data-autmation="run-test-distance-3"]')).sendKeys('5');
                browser.sleep(100);
                dist[4].element(by.css('[dc-data-autmation="run-test-distance-4"]')).sendKeys('6');

            }
        );

        browser.sleep(300);
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-distance-0"]')).getAttribute('value')).toEqual('2');
            expect(element(by.css('[dc-data-autmation="run-test-distance-1"]')).getAttribute('value')).toEqual('3');
            expect(element(by.css('[dc-data-autmation="run-test-distance-2"]')).getAttribute('value')).toEqual('4');
            expect(element(by.css('[dc-data-autmation="run-test-distance-3"]')).getAttribute('value')).toEqual('5');
            expect(element(by.css('[dc-data-autmation="run-test-distance-4"]')).getAttribute('value')).toEqual('6');

        });

        //nacin da se proveri tekst u time mm:ss
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(0).getText()).toBe("00:00");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(1).getText()).toBe("00:00");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(2).getText()).toBe("00:00");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(3).getText()).toBe("00:00");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(4).getText()).toBe("00:00");

        element.all(by.repeater('_i in vm.event.test_repeat')).then(
            function(time) {
                time[0].element(by.css('[dc-data-autmation="run-test-time-0"]')).click();
                reportEvent.timeMinutes.sendKeys('45');
                reportEvent.timeSeconds.sendKeys('45');
                reportEvent.setButton.click();
                browser.sleep(500);
                time[1].element(by.css('[dc-data-autmation="run-test-time-1"]')).click();
                reportEvent.timeMinutes.sendKeys('33');
                reportEvent.timeSeconds.sendKeys('33');
                reportEvent.setButton.click();
                browser.sleep(500);
                time[2].element(by.css('[dc-data-autmation="run-test-time-2"]')).click();
                reportEvent.timeMinutes.sendKeys('11');
                reportEvent.timeSeconds.sendKeys('59');
                reportEvent.setButton.click();
                browser.sleep(500);
                time[3].element(by.css('[dc-data-autmation="run-test-time-3"]')).click();
                reportEvent.timeMinutes.sendKeys('59');
                reportEvent.timeSeconds.sendKeys('59');
                reportEvent.setButton.click();
                browser.sleep(500);
                time[4].element(by.css('[dc-data-autmation="run-test-time-4"]')).click();
                reportEvent.timeMinutes.sendKeys('11');
                reportEvent.timeSeconds.sendKeys('06');
                reportEvent.setButton.click();
            }
        );
        browser.sleep(200);

        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(0).getText()).toBe("45:45");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(1).getText()).toBe("33:33");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(2).getText()).toBe("11:59");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(3).getText()).toBe("59:59");
        expect(element.all(by.repeater('_i in vm.event.test_repeat')).get(4).getText()).toBe("11:06");

        //nacin da se proveri tekst u average hr
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-hr-0"]')).getAttribute('value')).toEqual('0');
            expect(element(by.css('[dc-data-autmation="run-test-hr-1"]')).getAttribute('value')).toEqual('0');
            expect(element(by.css('[dc-data-autmation="run-test-hr-2"]')).getAttribute('value')).toEqual('0');
            expect(element(by.css('[dc-data-autmation="run-test-hr-3"]')).getAttribute('value')).toEqual('0');
            expect(element(by.css('[dc-data-autmation="run-test-hr-4"]')).getAttribute('value')).toEqual('0');

        });
        element.all(by.repeater('_i in vm.event.test_repeat')).then(
            function(hr) {
                hr[0].element(by.css('[dc-data-autmation="run-test-hr-0"]')).sendKeys('11');
                browser.sleep(100);
                hr[1].element(by.css('[dc-data-autmation="run-test-hr-1"]')).sendKeys('0');
                browser.sleep(100);
                hr[2].element(by.css('[dc-data-autmation="run-test-hr-2"]')).sendKeys('321');
                browser.sleep(100);
                hr[3].element(by.css('[dc-data-autmation="run-test-hr-3"]')).sendKeys('4 4');
                browser.sleep(100);
                hr[4].element(by.css('[dc-data-autmation="run-test-hr-4"]')).sendKeys('7');

            }
        );

        //nacin da se proveri tekst u average hr
        browser.sleep(400);
        element.all(by.repeater('_i in vm.event.test_repeat')).then(function() {
            expect(element(by.css('[dc-data-autmation="run-test-hr-0"]')).getAttribute('value')).toEqual('11');
            expect(element(by.css('[dc-data-autmation="run-test-hr-1"]')).getAttribute('value')).toEqual('0');
            expect(element(by.css('[dc-data-autmation="run-test-hr-2"]')).getAttribute('value')).toEqual('321');
            expect(element(by.css('[dc-data-autmation="run-test-hr-2"]')).getAttribute('value')).toEqual('321');
            expect(element(by.css('[dc-data-autmation="run-test-hr-2"]')).getAttribute('value')).toEqual('321');

        });

        reportEvent.saveTest.click();

        browser.driver.sleep(2000);
        expect(reportEvent.messages.getText()).toEqual('Congratulations, we have created zones for your running. Your zones will guide you in your training. Follow them to make sure you get progress and avoid injuries. Your zones will be adjusted to your fitness each month. You can find your zones under your profile.');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();


        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        // klik na prvi odgovor SKIP
        reportEvent.skip.click();
        reportEvent.writeMessage.click();
        reportEvent.newMessage.sendKeys("Jeg har springet over ...");
        reportEvent.sendMessage.click();

        //provera da li su uneseni podaci
        browser.wait(EC.presenceOf(reportEvent.skip), 5000);
        expect(reportEvent.skip.isSelected()).toBeTruthy();

        //nacin da se proveri druga poruka
        expect(element(by.repeater('message in vm.event.messages').row(0)).element(by.css('[data-dc-automation="event-message-content"]')).getText()).toBe("Jeg har springet over ...");

    });

});
