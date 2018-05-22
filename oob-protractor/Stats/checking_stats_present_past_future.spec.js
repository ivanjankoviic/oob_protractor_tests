

//TODO: ponekada se preklope nedeljne statistike, test moze da se koristi tek ako se zaustavi kalendar

//
// var SetupService = require('../setup_service.js');
// var Config = require ('../Config/config.js');
// var Login = require('../Page_Objects/LoginAdmin.js');
// var Calendar = require('../Page_Objects/Calendar.js');
// var AddEvent = require('../Page_Objects/AddEvent.js');
// var CreateEvent = require('../Page_Objects/CreateEvent.js');
// var Stats = require('../Page_Objects/Stats.js');
// var ReportEvent = require('../Page_Objects/ReportEvent.js');
//
// describe ("Create 3 different events in present past and future, and delete them - ", function(){
//     console.log("Create 3 different events in present past and future, and delete them - ");
//
//     beforeAll(function (){
//         // console.log('beforeAll');
//         var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
//                 {
//                     "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
//                 });
//         setup_service.register_user(uri);
//     });
//
//     afterAll(function (){
//         // console.log('afterAll');
//         var uri = config.backend_uri +"/avl/user?username="+config.username;
//         setup_service.delete_user(uri)
//     });
//
//     var setup_service = new SetupService;
//     var login = new Login();
//     var calendar = new Calendar();
//     var stats = new Stats();
//     var addEvent = new AddEvent();
//     var createEvent = new CreateEvent();
//     var config = new Config();
//     var reportEvent = new ReportEvent();
//     var EC = protractor.ExpectedConditions;
//
//     var moment = require('moment');
//     var current_day = moment().format('[day-]YYYY-MM-DD');
//     var future_day = moment().add(1, 'days').format('[day-]YYYY-MM-DD');
//     var past_day = moment().add(-1, 'days').format('[day-]YYYY-MM-DD');
//
//
//     it ("Login user with right password", function() {
//         console.log("Login user with right password");
//         browser.get(config.test_url);
//         browser.wait(EC.presenceOf(login.emailInput), 15000);
//         //upis u polje Email
//         login.emailInput.sendKeys(config.username);
//         //upis u polje Email
//         login.passwordInput.sendKeys('123');
//         //klik na login
//         login.buttonLogin.click();
//     });
//     it ("Checking stats before and after adding event and after report that event. Event is 'Speed swim''", function() {
//
//         browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
//         calendar.showMenuButtonCalendar.click();
//         browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
//         calendar.showMenuStatsButton.click();
//
//         //provera da li je prisutan element week
//         browser.wait(EC.presenceOf(stats.week), 10000);
//         expect(stats.week.isPresent()).toBeTruthy();
//
//         //provera da li je prisutan element month
//         browser.wait(EC.presenceOf(stats.month), 10000);
//         expect(stats.month.isPresent()).toBeTruthy();
//
//         //provera da li je prisutan element question mark
//         browser.wait(EC.presenceOf(stats.questionMark), 10000);
//         expect(stats.questionMark.isPresent()).toBeTruthy();
//
//         //provera teksta na week
//         stats.week.click();
//         expect(stats.weigthloss.getText()).toEqual('0 kg');
//         expect(stats.activityCompleted.getText()).toEqual('0 %');
//         expect(stats.timePlanned.getText()).toEqual('0 h');
//         expect(stats.timeCompleted.getText()).toEqual('0 h');
//
//         expect(stats.weigthlossText.getText()).toEqual('Weight');
//         expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
//         expect(stats.timePlannedText.getText()).toEqual('Time planned');
//         expect(stats.timeCompletedText.getText()).toEqual('Time completed');
//
//         expect(stats.HHS.getText()).toEqual('0%');
//
//         expect(stats.happy.getText()).toEqual('Happy 0%');
//         expect(stats.healthy.getText()).toEqual('Healthy 0%');
//         expect(stats.strong.getText()).toEqual('Strong 0%');
//
//
//         //provera teksta na week
//         stats.month.click();
//         browser.wait(EC.presenceOf(stats.timePlanned), 10000);
//         expect(stats.weigthloss.getText()).toEqual('0 kg');
//         expect(stats.activityCompleted.getText()).toEqual('0 %');
//         expect(stats.timePlanned.getText()).toEqual('0 h');
//         expect(stats.timeCompleted.getText()).toEqual('0 h');
//         expect(stats.HHS.getText()).toEqual('0%');
//
//         expect(stats.weigthlossText.getText()).toEqual('Weight');
//         expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
//         expect(stats.timePlannedText.getText()).toEqual('Time planned');
//         expect(stats.timeCompletedText.getText()).toEqual('Time completed');
//
//         expect(stats.HHS.getText()).toEqual('0%');
//
//         expect(stats.happy.getText()).toEqual('Happy 0%');
//         expect(stats.healthy.getText()).toEqual('Healthy 0%');
//         expect(stats.strong.getText()).toEqual('Strong 0%');
//     });
//     it ("Checking stats before and after adding event and after report that event. Event is 'Speed swim''", function() {
//         console.log("Checking stats before and after adding event and after report that event. Event is 'Speed swim'");
//
//         browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
//         calendar.showMenuButton.click();
//         browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
//         calendar.showMenuCalendarButton.click();
//
//         browser.wait(EC.presenceOf(calendar.buttonAddEvent), 1000);
//         calendar.buttonAddEvent.click();
//
//         addEvent.categoris.get(0).click();
//
//         addEvent.categoris.get(0).click();
//
//         addEvent.categoris.get(0).click();
//
//         createEvent.createEventButton.click();
//
//         browser.wait(EC.presenceOf(calendar.buttonAddEvent), 10000);
//
//         // nacin da se proveri text
//         browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
//         browser.findElements(by.id(current_day)).then(function() {
//             expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Jogging 1h 00'");
//         });
//
//         browser.sleep(400);
//         element(by.id(current_day)).click();
//
//         browser.sleep(400);
//         browser.wait(EC.presenceOf(reportEvent.happy20), 10000);
//         reportEvent.happy20.click();
//         reportEvent.healthy60.click();
//         reportEvent.strong100.click();
//
//         browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
//         calendar.showMenuButton.click();
//         browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
//         calendar.showMenuStatsButton.click();
//
//         //provera da li je prisutan element week
//         browser.wait(EC.presenceOf(stats.week), 10000);
//         expect(stats.week.isPresent()).toBeTruthy();
//
//         //provera da li je prisutan element month
//         browser.wait(EC.presenceOf(stats.month), 10000);
//         expect(stats.month.isPresent()).toBeTruthy();
//
//         //provera da li je prisutan element question mark
//         browser.wait(EC.presenceOf(stats.questionMark), 10000);
//         expect(stats.questionMark.isPresent()).toBeTruthy();
//
//         //provera teksta na week
//         stats.week.click();
//         expect(stats.weigthloss.getText()).toEqual('0 kg');
//         expect(stats.activityCompleted.getText()).toEqual('100 %');
//         expect(stats.timePlanned.getText()).toEqual('1:0 h');
//         expect(stats.timeCompleted.getText()).toEqual('1:0 h');
//
//         expect(stats.weigthlossText.getText()).toEqual('Weight');
//         expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
//         expect(stats.timePlannedText.getText()).toEqual('Time planned');
//         expect(stats.timeCompletedText.getText()).toEqual('Time completed');
//
//         expect(stats.HHS.getText()).toEqual('60%');
//
//         expect(stats.happy.getText()).toEqual('Happy 20%');
//         expect(stats.healthy.getText()).toEqual('Healthy 60%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//
//         //provera teksta na week
//         stats.month.click();
//         browser.wait(EC.presenceOf(stats.timePlanned), 10000);
//         expect(stats.weigthloss.getText()).toEqual('0 kg');
//         expect(stats.activityCompleted.getText()).toEqual('100 %');
//         expect(stats.timePlanned.getText()).toEqual('1:0 h');
//         expect(stats.timeCompleted.getText()).toEqual('1:0 h');
//         expect(stats.HHS.getText()).toEqual('60%');
//
//         expect(stats.weigthlossText.getText()).toEqual('Weight');
//         expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
//         expect(stats.timePlannedText.getText()).toEqual('Time planned');
//         expect(stats.timeCompletedText.getText()).toEqual('Time completed');
//
//         expect(stats.HHS.getText()).toEqual('60%');
//
//         expect(stats.happy.getText()).toEqual('Happy 20%');
//         expect(stats.healthy.getText()).toEqual('Healthy 60%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//     });
//
//     it ("Checking stats before and after adding event and after report that event. Event is 'Speed swim''", function() {
//         console.log("Checking stats before and after adding event and after report that event. Event is 'Speed swim'");
//
//         browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
//         calendar.showMenuButton.click();
//         browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
//         calendar.showMenuCalendarButton.click();
//
//         browser.wait(EC.presenceOf(calendar.moveDeleteButton), 5000);
//         expect(calendar.moveDeleteButton.isPresent()).toBeTruthy();
//         calendar.moveDeleteButton.click();
//
//         browser.wait(EC.presenceOf(calendar.deleteButton), 5000);
//         //klik na move
//         calendar.moveButton.click();
//
//         // upis datuma u kalendar
//         calendar.moveEventDatePicker.sendKeys(moment().add(1, 'days').format('MM-DD-YYYY'));
//
//         //klik na move button
//         browser.wait(EC.presenceOf(calendar.moveEventMoveButton), 5000);
//         calendar.moveEventMoveButton.click();
//
//         browser.sleep(400);
//         element(by.id(future_day)).click();
//
//         // nacin da se proveri text
//         browser.wait(EC.presenceOf(element(by.css( "#" + future_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
//         browser.findElements(by.id(future_day)).then(function() {
//             expect(element(by.css( "#" + future_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Jogging 1h 00'");
//         });
//
//         browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
//         calendar.showMenuButtonCalendar.click();
//         browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
//         calendar.showMenuStatsButton.click();
//
//         //provera da li je prisutan element week
//         browser.wait(EC.presenceOf(stats.week), 10000);
//         expect(stats.week.isPresent()).toBeTruthy();
//
//         //provera da li je prisutan element month
//         browser.wait(EC.presenceOf(stats.month), 10000);
//         expect(stats.month.isPresent()).toBeTruthy();
//
//         //provera da li je prisutan element question mark
//         browser.wait(EC.presenceOf(stats.questionMark), 10000);
//         expect(stats.questionMark.isPresent()).toBeTruthy();
//
//         //provera teksta na week
//         stats.week.click();
//         expect(stats.weigthloss.getText()).toEqual('0 kg');
//         expect(stats.activityCompleted.getText()).toEqual('100 %');
//         expect(stats.timePlanned.getText()).toEqual('1:0 h');
//         expect(stats.timeCompleted.getText()).toEqual('1:0 h');
//
//         expect(stats.weigthlossText.getText()).toEqual('Weight');
//         expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
//         expect(stats.timePlannedText.getText()).toEqual('Time planned');
//         expect(stats.timeCompletedText.getText()).toEqual('Time completed');
//
//         expect(stats.HHS.getText()).toEqual('60%');
//
//         expect(stats.happy.getText()).toEqual('Happy 20%');
//         expect(stats.healthy.getText()).toEqual('Healthy 60%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//
//         //provera teksta na week
//         stats.month.click();
//         browser.wait(EC.presenceOf(stats.timePlanned), 10000);
//         expect(stats.weigthloss.getText()).toEqual('0 kg');
//         expect(stats.activityCompleted.getText()).toEqual('100 %');
//         expect(stats.timePlanned.getText()).toEqual('1:0 h');
//         expect(stats.timeCompleted.getText()).toEqual('1:0 h');
//         expect(stats.HHS.getText()).toEqual('60%');
//
//         expect(stats.weigthlossText.getText()).toEqual('Weight');
//         expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
//         expect(stats.timePlannedText.getText()).toEqual('Time planned');
//         expect(stats.timeCompletedText.getText()).toEqual('Time completed');
//
//         expect(stats.HHS.getText()).toEqual('60%');
//
//         expect(stats.happy.getText()).toEqual('Happy 20%');
//         expect(stats.healthy.getText()).toEqual('Healthy 60%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//     });
//
//     it ("Checking stats before and after adding event and after report that event. Event is 'Speed swim''", function() {
//         console.log("Checking stats before and after adding event and after report that event. Event is 'Speed swim'");
//
//         browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
//         calendar.showMenuButton.click();
//         browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
//         calendar.showMenuCalendarButton.click();
//
//         browser.wait(EC.presenceOf(calendar.moveDeleteButton), 5000);
//         expect(calendar.moveDeleteButton.isPresent()).toBeTruthy();
//         calendar.moveDeleteButton.click();
//
//         browser.wait(EC.presenceOf(calendar.deleteButton), 5000);
//         //klik na move
//         calendar.moveButton.click();
//
//         // upis datuma u kalendar
//         calendar.moveEventDatePicker.sendKeys(moment().add(-1, 'days').format('MM-DD-YYYY'));
//
//         //klik na move button
//         browser.wait(EC.presenceOf(calendar.moveEventMoveButton), 5000);
//         calendar.moveEventMoveButton.click();
//
//
//         browser.sleep(500);
//         browser.wait(EC.presenceOf(calendar.calendArrowLeftButton), 10000);
//         calendar.calendArrowLeftButton.click();
//         calendar.calendArrowLeftButton.click();
//
//         browser.sleep(400);
//         element(by.id(past_day)).click();
//
//         // nacin da se proveri text
//         browser.wait(EC.presenceOf(element(by.css( "#" + past_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
//         browser.findElements(by.id(past_day)).then(function() {
//             expect(element(by.css( "#" + past_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe("Jogging 1h 00'");
//         });
//
//         browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
//         calendar.showMenuButtonCalendar.click();
//         browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
//         calendar.showMenuStatsButton.click();
//
//         //provera da li je prisutan element week
//         browser.wait(EC.presenceOf(stats.week), 10000);
//         expect(stats.week.isPresent()).toBeTruthy();
//
//         //provera da li je prisutan element month
//         browser.wait(EC.presenceOf(stats.month), 10000);
//         expect(stats.month.isPresent()).toBeTruthy();
//
//         //provera da li je prisutan element question mark
//         browser.wait(EC.presenceOf(stats.questionMark), 10000);
//         expect(stats.questionMark.isPresent()).toBeTruthy();
//
//         //provera teksta na week
//         stats.week.click();
//         expect(stats.weigthloss.getText()).toEqual('0 kg');
//         expect(stats.activityCompleted.getText()).toEqual('100 %');
//         expect(stats.timePlanned.getText()).toEqual('1:0 h');
//         expect(stats.timeCompleted.getText()).toEqual('1:0 h');
//
//         expect(stats.weigthlossText.getText()).toEqual('Weight');
//         expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
//         expect(stats.timePlannedText.getText()).toEqual('Time planned');
//         expect(stats.timeCompletedText.getText()).toEqual('Time completed');
//
//         expect(stats.HHS.getText()).toEqual('60%');
//
//         expect(stats.happy.getText()).toEqual('Happy 20%');
//         expect(stats.healthy.getText()).toEqual('Healthy 60%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//
//         //provera teksta na week
//         stats.month.click();
//         browser.wait(EC.presenceOf(stats.timePlanned), 10000);
//         expect(stats.weigthloss.getText()).toEqual('0 kg');
//         expect(stats.activityCompleted.getText()).toEqual('100 %');
//         expect(stats.timePlanned.getText()).toEqual('1:0 h');
//         expect(stats.timeCompleted.getText()).toEqual('1:0 h');
//         expect(stats.HHS.getText()).toEqual('60%');
//
//         browser.sleep(1000);
//
//         expect(stats.weigthlossText.getText()).toEqual('Weight');
//         expect(stats.activityCompletedText.getText()).toEqual('Activity completed');
//         expect(stats.timePlannedText.getText()).toEqual('Time planned');
//         expect(stats.timeCompletedText.getText()).toEqual('Time completed');
//
//         expect(stats.HHS.getText()).toEqual('60%');
//
//         expect(stats.happy.getText()).toEqual('Happy 20%');
//         expect(stats.healthy.getText()).toEqual('Healthy 60%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//     });
//
// });