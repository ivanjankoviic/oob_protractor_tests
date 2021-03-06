
var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var AddEvent = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var Stats = require('../Page_Objects/Stats.js');
var ReportEvent = require('../Page_Objects/ReportEvent.js');

describe ("Create 3 different events in present past and future, and delete them - ", function(){
    console.log("Create 3 different events in present past and future, and delete them - ");

    beforeAll(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);

        // //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(2000);
    });

    afterAll(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username;
        setup_service.delete_user(uri)
    });

    var setup_service = new SetupService;
    var login = new Login();
    var calendar = new Calendar();
    var stats = new Stats();
    var addEvent = new AddEvent();
    var createEvent = new CreateEvent();
    var config = new Config();
    var reportEvent = new ReportEvent();
    var EC = protractor.ExpectedConditions;

    var moment = require('moment');
    var current_day = moment().format('[day-]YYYY-MM-DD');

    it ("Checking stats before and after adding event and after report that event. Event is 'Sickness'", function() {
        console.log("Checking stats before and after adding event and after report that event. Event is 'Sickness'");

        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(2).click();
        browser.sleep(100);
        addEvent.categoris.get(7).click();
        browser.sleep(100);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(500);

        browser.wait(EC.presenceOf(calendar.buttonAddEvent), 10000);

        // nacin da se proveri text
        browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Sickness');
        });

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
        calendar.showMenuStatsButton.click();
        browser.sleep(500);

        //provera da li je prisutan element week
        browser.wait(EC.presenceOf(stats.week), 10000);

        //provera teksta na week
        stats.week.click();
        expect(stats.weigthloss.getText()).toEqual('0 kg');
        expect(stats.activityCompleted.getText()).toEqual('0 %');
        expect(stats.timePlanned.getText()).toEqual('0 h');
        expect(stats.timeCompleted.getText()).toEqual('0 h');

        expect(stats.weigthlossText.getText()).toEqual('Weight');
        expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
        expect(stats.timePlannedText.getText()).toEqual('Time planned');
        expect(stats.timeCompletedText.getText()).toEqual('Time completed');

        expect(stats.HHS.getText()).toEqual('0%');

        expect(stats.happy.getText()).toEqual('Happy 0%');
        expect(stats.healthy.getText()).toEqual('Healthy 0%');
        expect(stats.strong.getText()).toEqual('Strong 0%');


        //provera teksta na week
        stats.month.click();
        browser.sleep(500);

        browser.wait(EC.presenceOf(stats.timePlanned), 10000);
        expect(stats.weigthloss.getText()).toEqual('0 kg');
        expect(stats.activityCompleted.getText()).toEqual('0 %');
        expect(stats.timePlanned.getText()).toEqual('0 h');
        expect(stats.timeCompleted.getText()).toEqual('0 h');
        expect(stats.HHS.getText()).toEqual('0%');

        expect(stats.weigthlossText.getText()).toEqual('Weight');
        expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
        expect(stats.timePlannedText.getText()).toEqual('Time planned');
        expect(stats.timeCompletedText.getText()).toEqual('Time completed');

        expect(stats.HHS.getText()).toEqual('0%');

        expect(stats.happy.getText()).toEqual('Happy 0%');
        expect(stats.healthy.getText()).toEqual('Healthy 0%');
        expect(stats.strong.getText()).toEqual('Strong 0%');
    });
});