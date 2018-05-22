
/*
* Reporting Goal- Weight loss event with answer YES and send message
    * Create event Goal - Weight loss, report event with answer YES and send message

* Reporting Goal- Weight loss event with answer NO and send message
    * Create event Goal - Weight loss, report event with answer NO and send message

* Reporting Goal- Fitness event with answer YES and send message
    * Create event Goal - Fitness, report event with answer YES and send message

* Reporting Goal- Fitness event with answer NO and send message
    * Create event Goal - Fitness, report event with answer NO and send message

* Reporting Goal- Others event with answer YES and send message
    * Create event Goal - Others, report event with answer YES and send message

* Reporting Goal- Others event with answer NO and send message
    * Create event Goal - Others, report event with answer NO and send message

 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');
var Stats = require('../Page_Objects/Stats.js');

describe ("Reporting Goal- Weight loss event with answer YES and send message", function(){

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
    var stats = new Stats();

    it ("Create event Goal - Weight loss, report event with answer YES and send message", function() {
        console.log("Create event Goal - Weight loss, report event with answer YES and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(6).click();

        //provera naslova i dodavanje tezine
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Weight loss');

        createEvent.requirements.then(function(wl) {
            expect(wl[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
            wl[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).sendKeys('85');
            browser.sleep(100);
            expect(wl[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('85');
        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Weight loss 85kg");

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.answerYes.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.answerNo), 5000);
        expect(reportEvent.answerNo.isDisplayed()).toBeTruthy();
        expect(reportEvent.writeMessage.isDisplayed()).toBeTruthy();
        expect(reportEvent.notCompleted.isPresent()).toBeFalsy();
        expect(reportEvent.completed.isDisplayed()).toBeTruthy();


        reportEvent.writeMessage.click();
        reportEvent.newMessage.sendKeys('Done!');
        reportEvent.sendMessage.click();
        browser.sleep(200);

        // povratak na kalendar
        browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuStatsButton.click();
        browser.sleep(200);

        // browser.sleep(1000);

        //provera da li je prisutan element week
        browser.wait(EC.presenceOf(stats.week), 10000);
        expect(stats.week.isPresent()).toBeTruthy();

        expect(stats.weigthloss.getText()).toEqual('85 kg');
        expect(stats.activityCompleted.getText()).toEqual('0 %');
        expect(stats.timePlanned.getText()).toEqual('0 h');
        expect(stats.timeCompleted.getText()).toEqual('0 h');

        expect(stats.HHS.getText()).toEqual('0%');

        //provera teksta na month
        stats.month.click();
        browser.wait(EC.presenceOf(stats.timePlanned), 10000);
        expect(stats.weigthloss.getText()).toEqual('85 kg');
        expect(stats.activityCompleted.getText()).toEqual('0 %');
        expect(stats.timePlanned.getText()).toEqual('0 h');
        expect(stats.timeCompleted.getText()).toEqual('0 h');
        expect(stats.HHS.getText()).toEqual('0%');

        // povratak na kalendar
        browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
        calendar.showMenuButton.click();
        browser.sleep(200);
        browser.wait(EC.elementToBeClickable(calendar.showMenuCalendarButton), 10000);
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);
        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe("Weight loss 85kg");
    });

    it ("Create event Goal - Fitness, report event with answer YES and send message", function() {
        console.log("Create event Goal - Fitness, report event with answer YES and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(7).click();

        //provera naslova i dodavanje tezine
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Fitness');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe('Fitness');

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.answerYes.isDisplayed()).toBeTruthy();
        expect(reportEvent.answerNo.isDisplayed()).toBeTruthy();
        expect(reportEvent.writeMessage.isDisplayed()).toBeTruthy();
        expect(reportEvent.notCompleted.isPresent()).toBeFalsy();
        expect(reportEvent.completed.isDisplayed()).toBeTruthy();

        // povratak na kalendar
        browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
        calendar.showMenuButton.click();
        browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 5000);
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);
        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe('Fitness');
    });

    it ("Create event Goal - Others, report event with answer YES and send message", function() {
        console.log("Create event Goal - Others, report event with answer YES and send message");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(1).click();
        browser.sleep(100);
        addEvent.categoris.get(8).click();

        //provera naslova i dodavanje tezine
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Others');

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);

        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe('Others');

        //klik na event i provera da li su svi elementi vidljivi
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();
        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.answerYes), 5000);
        expect(reportEvent.answerYes.isDisplayed()).toBeTruthy();
        expect(reportEvent.answerNo.isDisplayed()).toBeTruthy();
        expect(reportEvent.writeMessage.isDisplayed()).toBeTruthy();
        expect(reportEvent.notCompleted.isPresent()).toBeFalsy();
        expect(reportEvent.completed.isDisplayed()).toBeTruthy();

        // povratak na kalendar
        browser.wait(EC.presenceOf(calendar.showMenuButton), 5000);
        browser.sleep(200)
        calendar.showMenuButton.click();
        browser.sleep(200)
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);
        // provera da li je event u kalendaru
        expect(element.all(by.repeater('event in vm.day.events')).get(1).getText()).toBe('Others');
    });
});