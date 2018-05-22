//
// var SetupService = require('../setup_service.js');
// var Config = require ('../Config/config.js');
// var Login = require('../Page_Objects/LoginAdmin.js');
// var Calendar = require('../Page_Objects/Calendar.js');
// var AddEvent = require('../Page_Objects/AddEvent.js');
// var CreateEvent = require('../Page_Objects/CreateEvent.js');
// var Stats = require('../Page_Objects/Stats.js');
// var ReportEvent = require('../Page_Objects/ReportEvent.js');
// var Profile = require('./../Page_Objects/Profile.js');
//
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
//     var profile = new Profile();
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
//         // klik na crveni krstic, i pravljenje eventa weightlossXXX
//         browser.wait(EC.presenceOf(calendar.buttonAddEvent), 1000);
//         calendar.buttonAddEvent.click();
//
//         addEvent.categoris.get(0).click();
//         addEvent.categoris.get(4).click();
//         addEvent.categoris.get(2).click();
//
//         createEvent.createEventButton.click();
//
//         browser.wait(EC.presenceOf(calendar.buttonAddEvent), 1000);
//
//         // nacin da se proveri text
//         browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
//         browser.findElements(by.id(current_day)).then(function() {
//             expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Gym');
//         });
//
//         //klik na danasnji danXXX
//         // browser.sleep(400);
//         element(by.id(current_day)).click();
//
//         //klik na HHS 100%
//         browser.wait(EC.presenceOf(reportEvent.healthy100), 5000);
//         expect(reportEvent.healthy100.isDisplayed()).toBeTruthy();
//         reportEvent.healthy100.click();
//
//         browser.wait(EC.presenceOf(reportEvent.happy100), 5000);
//         expect(reportEvent.happy100.isDisplayed()).toBeTruthy();
//         reportEvent.happy100.click();
//
//         browser.wait(EC.presenceOf(reportEvent.strong100), 5000);
//         expect(reportEvent.strong100.isDisplayed()).toBeTruthy();
//         reportEvent.strong100.click();
//         //
//         browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
//         calendar.showMenuButton.click();
//         browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
//         calendar.showMenuStatsButton.click();
//         //
//         //provera teksta na week
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
//         expect(stats.HHS.getText()).toEqual('100%');
//
//         expect(stats.happy.getText()).toEqual('Happy 100%');
//         expect(stats.healthy.getText()).toEqual('Healthy 100%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//         browser.navigate().refresh();
//
//         //provera teksta na week
//         browser.wait(EC.presenceOf(stats.weigthloss), 15000);
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
//         expect(stats.HHS.getText()).toEqual('100%');
//
//         expect(stats.happy.getText()).toEqual('Happy 100%');
//         expect(stats.healthy.getText()).toEqual('Healthy 100%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//         //
//         // //provera texta na month
//         stats.month.click();
//         browser.wait(EC.presenceOf(stats.weigthloss), 15000);
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
//         expect(stats.HHS.getText()).toEqual('100%');
//
//         expect(stats.happy.getText()).toEqual('Happy 100%');
//         expect(stats.healthy.getText()).toEqual('Healthy 100%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//         browser.navigate().refresh();
//
//         //provera teksta na week
//         browser.wait(EC.presenceOf(stats.weigthloss), 15000);
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
//         expect(stats.HHS.getText()).toEqual('100%');
//
//         expect(stats.happy.getText()).toEqual('Happy 100%');
//         expect(stats.healthy.getText()).toEqual('Healthy 100%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//
//         browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
//         calendar.showMenuButton.click();
//         browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
//         calendar.showMenuCalendarButton.click();
//     // });
//
//     // it ("Checking stats before and after adding event and after report that event. Event is 'Speed swim''", function() {
//
//         browser.sleep(2500);
//         //klik na crveni krstic, i pravljenje eventa weightlossXXX
//         browser.wait(EC.presenceOf(calendar.buttonAddEvent), 10000);
//         calendar.buttonAddEvent.click();
//
//         addEvent.categoris.get(0).click();
//         addEvent.categoris.get(8).click();
//         addEvent.categoris.get(0).click();
//
//         createEvent.createEventButton.click();
//
//         browser.wait(EC.presenceOf(calendar.buttonAddEvent), 1000);
//
//         // nacin da se proveri text
//         browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
//         browser.findElements(by.id(current_day)).then(function() {
//             expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(2)")).getText()).toBe('Gym');
//         });
//
//         //klik na danasnji danXXX
//         // browser.sleep(400);
//         // element(by.id(current_day)).click();
//         browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
//         browser.findElements(by.id(current_day)).then(function() {
//             expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(2)")).click());
//         });
//         //klik na HHS 100%
//         browser.wait(EC.presenceOf(reportEvent.healthy100), 5000);
//         expect(reportEvent.healthy100.isDisplayed()).toBeTruthy();
//
//         browser.wait(EC.presenceOf(reportEvent.happy100), 5000);
//         expect(reportEvent.happy100.isDisplayed()).toBeTruthy();
//
//         browser.wait(EC.presenceOf(reportEvent.strong100), 5000);
//         expect(reportEvent.strong100.isDisplayed()).toBeTruthy();
//
//         //ulaz na statsXXX
//         browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
//         calendar.showMenuButton.click();
//         browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
//         calendar.showMenuStatsButton.click();
//
//         //provera teksta na week
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
//         expect(stats.HHS.getText()).toEqual('100%');
//
//         expect(stats.happy.getText()).toEqual('Happy 100%');
//         expect(stats.healthy.getText()).toEqual('Healthy 100%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//         browser.refresh();
//
//         //provera teksta na week
//         browser.wait(EC.presenceOf(stats.weigthloss), 15000);
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
//         expect(stats.HHS.getText()).toEqual('100%');
//
//         expect(stats.happy.getText()).toEqual('Happy 100%');
//         expect(stats.healthy.getText()).toEqual('Healthy 100%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//         //provera texta na month
//         stats.month.click();
//         browser.wait(EC.presenceOf(stats.weigthloss), 15000);
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
//         expect(stats.HHS.getText()).toEqual('100%');
//
//         expect(stats.happy.getText()).toEqual('Happy 100%');
//         expect(stats.healthy.getText()).toEqual('Healthy 100%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//         browser.refresh();
//
//         //provera teksta na week
//         browser.wait(EC.presenceOf(stats.weigthloss), 15000);
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
//         expect(stats.HHS.getText()).toEqual('100%');
//
//         expect(stats.happy.getText()).toEqual('Happy 100%');
//         expect(stats.healthy.getText()).toEqual('Healthy 100%');
//         expect(stats.strong.getText()).toEqual('Strong 100%');
//
//         browser.sleep(3000);
//     });
// });