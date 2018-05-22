/**
 * Created by ivan on 25.10.17..
 */

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

        browser.wait(EC.presenceOf(calendar.calendArrowLeftButton), 10000);
        calendar.calendArrowLeftButton.click();
        //TODO: popraviti kada se ispravi bug (mora dva puta da se klikne na strelicu na kalendaru)
        calendar.calendArrowLeftButton.click();

        browser.sleep(500);
        //TODO: popraviti kada se ispravi bug (mora dva puta da se klikne na strelicu na kalendaru)
        browser.wait(EC.presenceOf(element(by.id(past_day))), 10000);
        browser.sleep(500);
        element(by.id(past_day)).click();

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
        //nacin da se proveri text
        browser.findElements(by.id(past_day)).then(function() {
            expect(element(by.css( "#" + past_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Weight');
        });

        element(by.id(past_day)).click();

        //provera da li otvoren completed activity na danasnji danXXX
        browser.wait(EC.presenceOf(reportEvent.reportWeight), 5000);
        expect(reportEvent.reportWeight.isDisplayed()).toBeTruthy();

        //Upis u polje weightXXX
        reportEvent.reportWeight.sendKeys('100');
        expect(reportEvent.reportWeight.getAttribute('value')).toEqual('100');

        browser.driver.sleep(100);

        //vracanje na kalendarXXX
        browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
        calendar.showMenuButton.click();
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuCalendarButton.click();

        browser.sleep(300);
        browser.wait(EC.presenceOf(calendar.buttonAddEvent), 10000);

        element(by.id(current_day)).click();
        browser.driver.sleep(100);
        calendar.buttonAddEvent.click();
        browser.driver.sleep(100);
        addEvent.categoris.get(1).click();
        browser.driver.sleep(100);
        addEvent.categoris.get(6).click();
        browser.driver.sleep(100);
        createEvent.requirements.then(function(wl) {
    wl[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).sendKeys('95');
    browser.sleep(100);
});
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(500);
        // nacin da se proveri text
        browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Weight loss 95kg');
        });

        browser.sleep(500);
        //ulaz u stats sa kalendara
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
        expect(stats.weigthloss.getText()).toEqual('95 (-5) kg');
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
        expect(stats.weigthloss.getText()).toEqual('95 (-5) kg');
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
        browser.driver.sleep(500);

        browser.refresh();

        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
        calendar.showMenuStatsButton.click();

        //provera da li je prisutan element week
        browser.wait(EC.presenceOf(stats.week), 10000);
        expect(stats.week.isPresent()).toBeTruthy();

        //provera teksta na week
        stats.week.click();
        expect(stats.weigthloss.getText()).toEqual('95 (-5) kg');
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
        expect(stats.weigthloss.getText()).toEqual('95 (-5) kg');
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
