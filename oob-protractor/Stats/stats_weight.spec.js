
var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var AddEvent = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var Stats = require('../Page_Objects/Stats.js');
var ReportEvent = require('../Page_Objects/ReportEvent.js');
var Profile = require('./../Page_Objects/Profile.js');


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
    var profile = new Profile();
    var EC = protractor.ExpectedConditions;

    var moment = require('moment');
    var current_day = moment().format('[day-]YYYY-MM-DD');
    var future_day = moment().add(1, 'days').format('[day-]YYYY-MM-DD');
    var past_day = moment().add(-1, 'days').format('[day-]YYYY-MM-DD');

    it ("Checking stats before and after adding event and after report that event. Event is 'WEIGHT LOSS''", function() {

        calendar.buttonAddEvent.click();
        browser.driver.sleep(100);
        addEvent.categoris.get(2).click();
        browser.driver.sleep(100);
        addEvent.categoris.get(2).click();
        browser.driver.sleep(100);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);

        browser.wait(EC.presenceOf(calendar.buttonAddEvent), 10000);

        // nacin da se proveri text
        browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Weight');
        });

        element(by.id(current_day)).click();

        //provera da li otvoren completed activity na danasnji danXXX
        browser.wait(EC.presenceOf(reportEvent.reportWeight), 5000);
        expect(reportEvent.reportWeight.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.reportMorning), 5000);
        expect(reportEvent.reportMorning.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.reportDuringDay), 5000);
        expect(reportEvent.reportDuringDay.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.reportEvening), 5000);
        expect(reportEvent.reportEvening.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(reportEvent.writeMessage), 5000);
        expect(reportEvent.writeMessage.isDisplayed()).toBeTruthy();

        //provera texta na straniciXXX
        expect(element(by.css('.task-header')).getText()).toEqual('What is your weight Today?');

        reportEvent.reportWeight.getAttribute('placeholder').then(function(element){
            expect(element).toEqual('kg');
        });

        expect(element(by.binding('vm.event.report_second_title')).getText()).toEqual('When Did You Measure Your Weight?');

        element.all(by.repeater('op in vm.event.report_options')).then(function(posts) {
            var titleElement = posts[0].element(by.className('option-title ng-binding'));
            expect(titleElement.getText()).toEqual('Morning');
        });

        element.all(by.repeater('op in vm.event.report_options')).then(function(posts) {
            var titleElement = posts[1].element(by.className('option-title ng-binding'));
            expect(titleElement.getText()).toEqual('During day');
        });

        element.all(by.repeater('op in vm.event.report_options')).then(function(posts) {
            var titleElement = posts[2].element(by.className('option-title ng-binding'));
            expect(titleElement.getText()).toEqual('Evening');
        });

        //Upis u polje weightXXX
        reportEvent.reportWeight.sendKeys('100');
        expect(reportEvent.reportWeight.getAttribute('value')).toEqual('100');

        //klik na radio button-e
        reportEvent.reportEvening.click();
        browser.driver.sleep(100);

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButton.click();
        browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
        calendar.showMenuStatsButton.click();
        browser.sleep(500);

        //provera da li je prisutan element week
        browser.wait(EC.presenceOf(stats.week), 10000);
        expect(stats.week.isPresent()).toBeTruthy();

        //provera teksta na week
        stats.week.click();
        expect(stats.weigthloss.getText()).toEqual('100 kg');
        expect(stats.activityCompleted.getText()).toEqual('0 %');
        expect(stats.timePlanned.getText()).toEqual('0 h');
        expect(stats.timeCompleted.getText()).toEqual('0 h');

        expect(stats.HHS.getText()).toEqual('0%');

        expect(stats.happy.getText()).toEqual('Happy 0%');
        expect(stats.healthy.getText()).toEqual('Healthy 0%');
        expect(stats.strong.getText()).toEqual('Strong 0%');

        //provera teksta na mont
        stats.month.click();
        browser.sleep(500);
        browser.wait(EC.presenceOf(stats.timePlanned), 10000);
        expect(stats.weigthloss.getText()).toEqual('100 kg');
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

        //  profil stranica
         browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
         calendar.showMenuButton.click();
         browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 10000);
         calendar.showMenuProfileButton.click();
         browser.driver.sleep(500);

        //provera texta iz inputa weightXXX
        browser.wait(EC.presenceOf(profile.weight), 10000);
        expect(profile.weight.getAttribute('value')).toEqual('100');

        profile.weight.sendKeys('120');

        profile.saveButton.click();
        browser.driver.sleep(500);

        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');

        browser.wait(EC.presenceOf(element(by.css(".popup-body"))), 5000);
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button and clear fields
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(500);

        //provera texta iz inputa weightXXX
        browser.wait(EC.presenceOf(profile.weight), 10000);
        expect(profile.weight.getAttribute('value')).toEqual('120');


        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButton.click();
        browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
        calendar.showMenuStatsButton.click();
        browser.sleep(500);

        //provera da li je prisutan element week
        browser.wait(EC.presenceOf(stats.week), 10000);
        expect(stats.week.isPresent()).toBeTruthy();

        //provera teksta na week
        stats.week.click();
        expect(stats.weigthloss.getText()).toEqual('120 kg');
        expect(stats.activityCompleted.getText()).toEqual('0 %');
        expect(stats.timePlanned.getText()).toEqual('0 h');
        expect(stats.timeCompleted.getText()).toEqual('0 h');

        expect(stats.HHS.getText()).toEqual('0%');

        expect(stats.happy.getText()).toEqual('Happy 0%');
        expect(stats.healthy.getText()).toEqual('Healthy 0%');
        expect(stats.strong.getText()).toEqual('Strong 0%');

        //provera teksta na mont
        stats.month.click();
        browser.sleep(500);
        browser.wait(EC.presenceOf(stats.timePlanned), 10000);
        expect(stats.weigthloss.getText()).toEqual('120 kg');
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

        //vracanje na kalendarXXX
        browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
        calendar.showMenuButton.click();
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuCalendarButton.click();

        browser.sleep(500);
        browser.wait(EC.presenceOf(calendar.buttonAddEvent), 10000);

        // nacin da se proveri text
        browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Weight 100kg');
        });

        browser.wait(EC.presenceOf(element(by.id(current_day))), 10000);
        element(by.id(current_day)).click();
        //provera da li je promenjena tezina
        browser.wait(EC.presenceOf(reportEvent.reportWeight), 10000);
        expect(reportEvent.reportWeight.getAttribute('value')).toEqual('120');

        //  calendar stranica
        browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
        calendar.showMenuButton.click();
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 10000);
        calendar.showMenuCalendarButton.click();
        browser.driver.sleep(500);

        browser.refresh();

        browser.sleep(500);
        browser.wait(EC.presenceOf(calendar.buttonAddEvent), 20000);

        // nacin da se proveri text
        browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Weight 120kg');
        });

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
        calendar.showMenuStatsButton.click();
        browser.sleep(500);

        //provera da li je prisutan element week
        browser.wait(EC.presenceOf(stats.week), 10000);
        expect(stats.week.isPresent()).toBeTruthy();

        //provera teksta na week
        stats.week.click();
        expect(stats.weigthloss.getText()).toEqual('120 kg');
        expect(stats.activityCompleted.getText()).toEqual('0 %');
        expect(stats.timePlanned.getText()).toEqual('0 h');
        expect(stats.timeCompleted.getText()).toEqual('0 h');

        expect(stats.HHS.getText()).toEqual('0%');

        expect(stats.happy.getText()).toEqual('Happy 0%');
        expect(stats.healthy.getText()).toEqual('Healthy 0%');
        expect(stats.strong.getText()).toEqual('Strong 0%');

        //provera teksta na mont
        stats.month.click();
        browser.sleep(500);
        browser.wait(EC.presenceOf(stats.timePlanned), 10000);
        expect(stats.weigthloss.getText()).toEqual('120 kg');
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