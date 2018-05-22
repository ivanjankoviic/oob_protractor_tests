//
//
// var SetupService = require('../setup_service.js');
// var Config = require ('../Config/config.js');
// var Login = require('../Page_Objects/Login.js');
// var Calendar = require('../Page_Objects/Calendar.js');
// var AddEvent = require('../Page_Objects/AddEvent.js');
// var CreateEvent = require('../Page_Objects/CreateEvent.js');
//
// describe ("Checking elements for Goal - Run race events with different default difficulty", function(){
//
//
//     var setup_service = new SetupService;
//     var login = new Login();
//     var calendar = new Calendar();
//     var addEvent = new AddEvent();
//     var createEvent = new CreateEvent();
//     var config = new Config();
//     var EC = protractor.ExpectedConditions;
//
//
//     it ("Create event Goal - Run race - 5km and check whether the elements are visible and whether the default duration 30", function() {
//
//         //ulazak na adresu
//         browser.get("http://sm.ooblife.com/login");
//
//         //upis u email polje
//         browser.wait(EC.presenceOf(element(by.id('username'))), 10000);
//         element(by.id('username')).sendKeys('trula baba lan');
//
//         //upis u pass polje
//         element(by.id("password")).sendKeys("123456");
//
//         //klik na forgot pass
//         element(by.css('[ui-sref="ooblogin.forgot"]')).click();
//
//         //klik na back pages
//         browser.navigate().back();
//
//         //upis u email polje
//         browser.wait(EC.presenceOf(element(by.id('username'))), 5000);
//         element(by.id('username')).sendKeys('ivan@digitalcube.rs');
//
//         //upis u pass polje
//         element(by.id("password")).sendKeys("1234");
//
//         //klik na login btn
//         element(by.css('[on-tap="vm.login()"]')).click();
//
//         //klik na fub btn
//         browser.wait(EC.presenceOf(element(by.css('[data-dc-automation="add-event"]'))), 5000);
//         element(by.css('[data-dc-automation="add-event"]')).click();
//
//
//         //vatanje elem. preko ng repeatera
//         //klik na reports
//         browser.wait(EC.presenceOf(element.all(by.repeater('category in vm.event_categories'))), 5000);
//         element.all(by.repeater('category in vm.event_categories')).get(2).click();
//
//         //klik na injury
//         browser.wait(EC.presenceOf(element.all(by.repeater('category in vm.event_categories'))), 5000);
//         element.all(by.repeater('category in vm.event_categories')).get(6).click();
//
//         //upis u input polje date
//         browser.wait(EC.presenceOf(element(by.css('[data-dc-automation="add-event-date"]'))), 5000);
//         element(by.css('[data-dc-automation="add-event-date"]')).sendKeys('04/05/2018');
//
//         //klik na create event
//         element(by.css('[data-dc-automation="create-event-button"]')).click();
//
//
//         browser.sleep(1000);
//         element(by.css('[ng-if="vm.logged_user.profile_picture"]')).click();
//
//
//
//
//
//
//
//         browser.sleep(3000)
//
//
//
//
//     });
// });



/*
 * Reporting Activity- Other - Other event with answer YES and send message
 * Create event Activity- Other - Other, report event with answer YES and send message

 * Reporting Activity- Other - Other event with answer NO *skip and send message
 * Create event Activity- Other - Other, report event with answer NO *skip and send message

 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');

describe ("Reporting Activity - Other - Other event with answer YES and send message", function(){


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

    it ("Create event Activity- Other - Other, report event with answer YES and send message", function() {
        console.log("Create event Activity- Other - Other, report event with answer YES and send message");
        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);


        // //klik na fub btn
        // browser.wait(EC.presenceOf(element(by.css('[data-dc-automation="add-event"]'))), 5000);
        // element(by.css('[data-dc-automation="add-event"]')).click();
        //
        //
        // //vatanje elem. preko ng repeatera
        // //klik na reports
        // browser.wait(EC.presenceOf(element.all(by.repeater('category in vm.event_categories'))), 5000);
        // element.all(by.repeater('category in vm.event_categories')).get(2).click();
        //
        // //klik na injury
        // browser.wait(EC.presenceOf(element.all(by.repeater('category in vm.event_categories'))), 5000);
        // element.all(by.repeater('category in vm.event_categories')).get(6).click();
        //
        // //upis u input polje date
        // browser.wait(EC.presenceOf(element(by.css('[data-dc-automation="add-event-date"]'))), 5000);
        // element(by.css('[data-dc-automation="add-event-date"]')).sendKeys('04/05/2018');
        //
        // //klik na create event
        // element(by.css('[data-dc-automation="create-event-button"]')).click();

        //klik na profil pic
        browser.wait(EC.presenceOf(element(by.css('[data-dc-automation="calendar-header-pic"]'))), 5000);
        element(by.css('[data-dc-automation="calendar-header-pic"]')).click();

        // //Upis u input polje weight
        // browser.wait(EC.presenceOf(element(by.css('[ng-model="vm.user_weight"]'))), 5000);
        // element(by.css('[ng-model="vm.user_weight"]')).sendKeys('123');
        //
        // //upis u input polje height
        // element(by.css('[ng-model="vm.user_height"]')).sendKeys('175');
        //
        //
        // element(by.css('[ng-model="vm.language_selected"]')).click();
        // //nacin da se uhvati elem u padajucem meniu
        // element.all(by.options('vm.languages.indexOf(g) as g for g in vm.languages')).get(2).click();
        // // element.all(by.css('[ng-model="vm.language_selected"]')).get(2).click();
        //
        // //promena discipline
        // element.all(by.options('vm.sports.indexOf(s) as s for s in vm.sports')).get(1).click();
        // //klik na save btn
        // element(by.css('[on-tap="vm.save_changes(1)"]')).click();
        // //klik na popup ok btn
        // browser.wait(EC.presenceOf( element(by.css('[ng-click="$buttonTapped(button, $event)"]'))), 5000);
        // element(by.css('[ng-click="$buttonTapped(button, $event)"]')).click();
        //
        //
        // //klik na add more races btn
        // element(by.css('[data-dc-automation="add-more-races"]')).click();
        //
        // //provera kako se izvlaci text na osnovu valuea
        // expect(element(by.css('[on-tap="vm.save_changes(4)"]')).getAttribute('value')).toEqual('Tilføje');

        browser.sleep(1000);

        element(by.css('[data-dc-automation="profile-info-password-menu"]')).click();

        browser.sleep(1000);

        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="profile-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="profile-menu-scroll"]'+"').scrollHeight;");
        browser.sleep(2000);

        // //provera kako se izvlaci text na osnovu texta
        expect(element(by.css('[data-dc-automation="profile-details-birth-date"]')).getText()).toEqual('Invalid date');








        browser.sleep(3000);


    });
});