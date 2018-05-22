
/*

 * Checking stats
 * Checking stats before and after add event anding after report that event. Event is 'Speed swim'


 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var AddEvent = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var Stats = require('../Page_Objects/Stats.js');

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
    var config = new Config();
    var EC = protractor.ExpectedConditions;

    it ("Checking stats before and after adding event and after report that event. Event is 'Speed swim''", function() {

        //provera statistika pre dovdavanja eventa
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuStatsButton), 10000);
        calendar.showMenuStatsButton.click();
        browser.sleep(500);

        //provera da li je prisutan element <week>
        browser.wait(EC.presenceOf(stats.weekAndMonthCurrentStats), 10000);
        expect(stats.weekAndMonthCurrentStats.isPresent()).toBeTruthy();

        //provera da li je prisutan element left Arrow
        browser.wait(EC.presenceOf(stats.leftArrow), 10000);
        expect(stats.leftArrow.isPresent()).toBeTruthy();
        //provera da li je prisutan element right Arrow
        browser.wait(EC.presenceOf(stats.rightArrow), 10000);
        expect(stats.rightArrow.isPresent()).toBeTruthy();

        //provera texta na trenutnoj nedelji
        expect(stats.weekAndMonthCurrentStats.getText()).toEqual('16-22 Apr 2018');

        stats.leftArrow.click();
        browser.sleep(1000);
        browser.wait(EC.presenceOf(stats.questionMark), 10000);
        //provera texta na trenutnoj nedelji
        expect(stats.weekAndMonthCurrentStats.getText()).toEqual('09-15 Apr 2018');

        stats.rightArrow.click();
        browser.sleep(1000);
        browser.wait(EC.presenceOf(stats.questionMark), 10000);
        expect(stats.weekAndMonthCurrentStats.getText()).toEqual('16-22 Apr 2018');

        stats.rightArrow.click();
        browser.sleep(1000);
        browser.wait(EC.presenceOf(stats.questionMark), 10000);
        expect(stats.weekAndMonthCurrentStats.getText()).toEqual('23-29 Apr 2018');

        //provera teksta i elemenata na month
        stats.month.click();
        browser.sleep(1000);

        browser.wait(EC.presenceOf(stats.questionMark), 10000);
        expect(stats.weekAndMonthCurrentStats.getText()).toEqual('April');

        stats.rightArrow.click();
        browser.sleep(1000);
        browser.wait(EC.presenceOf(stats.questionMark), 10000);
        expect(stats.weekAndMonthCurrentStats.getText()).toEqual('May');

        stats.leftArrow.click();
        browser.sleep(1000);
        browser.wait(EC.presenceOf(stats.questionMark), 10000);
        expect(stats.weekAndMonthCurrentStats.getText()).toEqual('April');

        stats.leftArrow.click();
        browser.sleep(1000);
        browser.wait(EC.presenceOf(stats.questionMark), 10000);
        expect(stats.weekAndMonthCurrentStats.getText()).toEqual('March');
    });
});