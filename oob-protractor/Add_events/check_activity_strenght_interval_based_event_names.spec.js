
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var EventAdd = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');

describe ("Check if fields exist, and if they are named properly - ", function(){

    beforeAll(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);
    });

    afterAll(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username;
        setup_service.delete_user(uri)
    });

    var setup_service = new SetupService;
    var config = new Config;
    var login = new Login();
    var calendar = new Calendar();
    var eventAdd = new EventAdd();
    var createEvent = new CreateEvent();
    var EC = protractor.ExpectedConditions;

    it ("On event-add/menu/, check if fields exist, and if they are named properly", function() {
        console.log('On event-add/menu/, check if fields exist, and if they are named properly');

        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();

        //Nacin da proveri text
        browser.wait(EC.presenceOf(eventAdd.categoris), 10000);
        //klik na Activity
        eventAdd.categoris.get(0).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 10000);

        //klik na clik on strength interval based
        eventAdd.categoris.get(5).click();
        browser.wait(EC.presenceOf(eventAdd.categoris), 10000);
        expect(eventAdd.categoris.get(0).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(1).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(2).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(3).isDisplayed()).toBeTruthy();

        //Nacin da proveri text
        browser.wait(EC.presenceOf(eventAdd.categoris), 10000);
        expect(eventAdd.categoris.get(0).getText()).toBe('TRX');
        expect(eventAdd.categoris.get(1).getText()).toBe('Body Weight');
        expect(eventAdd.categoris.get(2).getText()).toBe('Circuit');
        expect(eventAdd.categoris.get(3).getText()).toBe('Others');
        //klik na Circuit
        eventAdd.categoris.get(2).click();
        //nacin da se proveri da li postoji polje create event
        browser.wait(EC.presenceOf(createEvent.orderField), 10000);
        expect((createEvent.orderField).isPresent()).toBe(true);
    });
});