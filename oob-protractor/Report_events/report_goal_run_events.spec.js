
/*
* Reporting Goal-Run events with answer YES and send message
    * Create event Goal - Run race - 5km, report event with answer YES *HHS 20 and send message
    * Create event Goal - Run race - 10km, report event with answer YES *HHS 40 and send message
    * Create event Goal - Run race - Half marathon, report event with answer YES *HHS 60 and send message
    * Create event Goal - Run race - Marathon, report event with answer YES *HHS 80 and send message
    * Create event Goal - Run race - Other distance, report event with answer YES *HHS 100 and send message

* Reporting Goal-Run events with answer NO and send message
    * Create event Goal - Run race - 5km, report event with answer NO *skip and send message
    * Create event Goal - Run race - 10km, report event with answer NO *skip and send message
    * Create event Goal - Run race - Half marathon, report event with answer NO *tired and send message
    * Create event Goal - Run race - Marathon, report event with answer NO *injury and send messages
    * Create event Goal - Run race - Other distance, report event with answer NO *sick and send message

 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');

describe ("Reporting Goal- Run events with answer YES and send message", function(){


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

    it ("Create event Goal - Run race - 5 km, report event with answer YES *HHS 20 and send message", function() {
        console.log("Create event Goal - Run race - 5km, report event with answer YES *HHS 20 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race 5 km');
        //duration field
        expect(createEvent.durationField.getAttribute('value')).toEqual('30');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('5');
        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("5 km 30'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.answerYes.isDisplayed()).toBeTruthy();
        expect(reportEvent.answerNo.isDisplayed()).toBeTruthy();
        expect(reportEvent.goalDistance.isDisplayed()).toBeTruthy();
        expect(reportEvent.timeCompleted.isDisplayed()).toBeTruthy();
        expect(reportEvent.goalAverageHr.isDisplayed()).toBeTruthy();
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

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("30 '");

        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('00:30:00');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('5');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

        reportEvent.timeCompleted.click();
        browser.sleep(200);
        reportEvent.timeHours.sendKeys('2');
        browser.sleep(200);
        reportEvent.timeMinutes.sendKeys('11');
        browser.sleep(200);
        reportEvent.timeSeconds.sendKeys('45');
        browser.sleep(200);
        reportEvent.setButton.click();
        browser.sleep(200);
        reportEvent.goalAverageHr.clear();
        browser.sleep(200);
        reportEvent.goalAverageHr.sendKeys('140');
        browser.sleep(200);
        reportEvent.goalDistance.sendKeys('12');
        browser.sleep(400);

        // povratak na kalendar
        browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(400);
        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("5 km 2h 12'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(500);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("132 '");

        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('02:11:45');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('12');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

        reportEvent.timeCompleted.click();
        browser.sleep(200);
        reportEvent.timeHours.sendKeys('13');
        browser.sleep(200);
        reportEvent.timeMinutes.sendKeys('11');
        browser.sleep(200);
        reportEvent.timeSeconds.sendKeys('59');
        browser.sleep(200);
        reportEvent.setButton.click();
        browser.sleep(200);
        reportEvent.goalAverageHr.clear();
        browser.sleep(200);
        reportEvent.goalAverageHr.sendKeys('88');
        browser.sleep(200);
        reportEvent.goalDistance.sendKeys('7');
        browser.sleep(200);

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.isDisplayed()).toBeTruthy();
        expect(reportEvent.completed.isPresent()).toBeFalsy();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.getText()).toEqual('not completed');

        // klik na yes kao odgovor i porvera da li postoje elementi
        reportEvent.answerYes.click();
        browser.sleep(1000);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("792 '");

        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('13:11:59');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('7');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

    });


    it ("Create event Goal - Run race - 10 km, report event with answer YES *HHS 40 and send message", function() {
        console.log("Create event Goal - Run race - 10 km, report event with answer YES *HHS 40 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race 10 km');
        //duration field
        expect(createEvent.durationField.getAttribute('value')).toEqual('60');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('10');
        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("10 km 1h 00'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.notCompleted.isPresent()).toBeFalsy();
        expect(reportEvent.completed.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("60 '");

        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('01:00:00');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('10');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

        reportEvent.timeCompleted.click();
        browser.sleep(200);
        reportEvent.timeHours.sendKeys('8');
        browser.sleep(200);
        reportEvent.timeMinutes.sendKeys('59');
        browser.sleep(200);
        reportEvent.timeSeconds.sendKeys('01');
        browser.sleep(200);
        reportEvent.setButton.click();
        browser.sleep(100);
        reportEvent.goalAverageHr.clear();
        browser.sleep(200);
        reportEvent.goalAverageHr.sendKeys('1');
        browser.sleep(200);
        reportEvent.goalDistance.sendKeys('0');

        browser.sleep(500);
        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('08:59:01');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');
        browser.sleep(200);
        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("539 '");

        // klik na NO kao odgovor i porvera da li postoje elementi
        reportEvent.answerNo.click();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.isDisplayed()).toBeTruthy();
        expect(reportEvent.completed.isPresent()).toBeFalsy();

        browser.wait(EC.presenceOf(reportEvent.notCompleted), 5000);
        expect(reportEvent.notCompleted.getText()).toEqual('not completed');

        // klik na yes kao odgovor i porvera da li postoje elementi
        reportEvent.answerYes.click();
        browser.sleep(500);

        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('08:59:01');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("539 '");

    });


    it ("Create event Goal - Run race - Half marathon, report event with answer YES *HHS 60 and send message", function() {
        console.log("Create event Goal - Run race - Half marathon, report event with answer YES *HHS 60 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(2).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race Halfmarathon');
        //duration field
        expect(createEvent.durationField.getAttribute('value')).toEqual('100');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('21.0975');
        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();


        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Halfmarathon 1h 40'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(500);

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.notCompleted.isPresent()).toBeFalsy();
        expect(reportEvent.completed.isDisplayed()).toBeTruthy();
        browser.sleep(200);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("100 '");
        browser.sleep(200);

        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('01:40:00');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('21.0975');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

        reportEvent.timeCompleted.click();
        browser.sleep(200);
        reportEvent.timeHours.sendKeys('8');
        browser.sleep(200);
        reportEvent.timeMinutes.sendKeys('59');
        browser.sleep(200);
        reportEvent.timeSeconds.sendKeys('01');
        browser.sleep(200);
        reportEvent.setButton.click();
        browser.sleep(200);
        reportEvent.goalAverageHr.clear();
        browser.sleep(200);
        reportEvent.goalAverageHr.sendKeys('1');
        browser.sleep(200);
        reportEvent.goalDistance.sendKeys('0');

        browser.sleep(500);
        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('08:59:01');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');
        browser.sleep(200);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("539 '");

    });


    it ("Create event Goal - Run race - Marathon, report event with answer YES *HHS 80 and send message", function() {
        console.log("Create event Goal - Run race - Marathon, report event with answer YES *HHS 80 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(3).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race Marathon');
        //duration field
        expect(createEvent.durationField.getAttribute('value')).toEqual('200');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('42.195');
        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();
        browser.sleep(1000);


        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();


        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Marathon 3h 20'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.notCompleted.isPresent()).toBeFalsy();
        expect(reportEvent.completed.isDisplayed()).toBeTruthy();
        browser.sleep(200);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("200 '");
        browser.sleep(200);

        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('03:20:00');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('42.195');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

        reportEvent.timeCompleted.click();
        browser.sleep(200);
        reportEvent.timeHours.sendKeys('8');
        browser.sleep(200);
        reportEvent.timeMinutes.sendKeys('59');
        browser.sleep(200);
        reportEvent.timeSeconds.sendKeys('01');
        browser.sleep(200);
        reportEvent.setButton.click();
        browser.sleep(100);
        reportEvent.goalAverageHr.clear();
        browser.sleep(200);
        reportEvent.goalAverageHr.sendKeys('1');
        browser.sleep(100);
        reportEvent.goalDistance.sendKeys('0');

        browser.sleep(500);
        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('08:59:01');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('0');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("539 '");

    });

    it ("Create event Goal - Run race - Other distance, report event with answer YES *HHS 100 and send message", function() {
        console.log("Create event Goal - Run race - Other distance, report event with answer YES *HHS 100 and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(4).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race Other distance');
        //duration field
        expect(createEvent.durationField.getAttribute('value')).toEqual('100');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();


        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Other distance 1h 40'");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.completed), 5000);
        expect(reportEvent.notCompleted.isPresent()).toBeFalsy();
        expect(reportEvent.completed.isDisplayed()).toBeTruthy();
        browser.sleep(200);
        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("100 '");

        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('01:40:00');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('1');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

        reportEvent.timeCompleted.click();
        browser.sleep(300);
        reportEvent.timeHours.sendKeys('12');
        browser.sleep(300);
        reportEvent.timeMinutes.sendKeys('11');
        browser.sleep(300);
        reportEvent.timeSeconds.sendKeys('11');
        browser.sleep(300);
        reportEvent.setButton.click();
        browser.sleep(300);
        reportEvent.goalAverageHr.clear();
        browser.sleep(300);
        reportEvent.goalAverageHr.sendKeys('456');
        browser.sleep(300);
        reportEvent.goalDistance.sendKeys('987');

        browser.sleep(1000);
        //provera upisanih vrednosti
        expect(reportEvent.timeCompleted.getText()).toEqual('12:11:11');
        expect(reportEvent.goalDistance.getAttribute('value')).toEqual('987');
        expect(reportEvent.goalAverageHr.getAttribute('placeholder')).toEqual('hr');

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.completed.getText()).toEqual("731 '");

    });

});
