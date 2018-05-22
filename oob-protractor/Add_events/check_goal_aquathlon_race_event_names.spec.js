
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
        browser.wait(EC.presenceOf(eventAdd.categoris), 5000);

    });
    it ("On event-add/menu1/ (click on Goal), check if fields exist, and if they are named properly", function() {
        console.log("On event-add/menu1/ (click on Goal), check if fields exist, and if they are named properly");

        //klik na Goal
        eventAdd.categoris.get(1).click();
        //Nacin da proveri text
        browser.wait(EC.presenceOf(eventAdd.categoris), 10000);
        expect(eventAdd.categoris.get(0).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(1).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(2).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(3).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(4).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(5).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(6).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(7).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(8).isDisplayed()).toBeTruthy();


        expect(eventAdd.categoris.get(0).getText()).toBe('Run race');
        expect(eventAdd.categoris.get(1).getText()).toBe('Bike race');
        expect(eventAdd.categoris.get(2).getText()).toBe('Swim race');
        expect(eventAdd.categoris.get(3).getText()).toBe('Triathlon race');
        expect(eventAdd.categoris.get(4).getText()).toBe('Duathlon race');
        expect(eventAdd.categoris.get(5).getText()).toBe('Aquathlon race');
        expect(eventAdd.categoris.get(6).getText()).toBe('Weight loss');
        expect(eventAdd.categoris.get(7).getText()).toBe('Fitness');
        expect(eventAdd.categoris.get(8).getText()).toBe('Others');
    });

    it ("On /event-add/form/ (click on Aquathlon), check if Create event field exist, and go on previous page, and check " +
        "fields exist on event-add/menu/, and if they are named properly", function() {
        console.log("On /event-add/form/  (click on Aquathlon), check if Create event field exist, and go on previous page, and check " +
            "fields exist on event-add/menu/, and if they are named properly");

        //klik na Aquathlon
        eventAdd.categoris.get(5).click();
        //nacin da se proveri da li postoji polje create event
        browser.wait(EC.presenceOf(createEvent.orderField), 10000);
        expect((createEvent.orderField).isPresent()).toBe(true);
        //back button na browseru
        browser.navigate().back();

        //Nacin da proveri text
        browser.wait(EC.presenceOf(eventAdd.categoris), 10000);


        expect(eventAdd.categoris.get(0).getText()).toBe('Activity');
        expect(eventAdd.categoris.get(1).getText()).toBe('Goal');
        expect(eventAdd.categoris.get(2).getText()).toBe('Reports');
        expect(eventAdd.categoris.get(3).getText()).toBe('Nutrition');
        expect(eventAdd.messageForCoach.getText()).toBe('Message for Coach');
        expect(eventAdd.categoris.get(4).getText()).toBe('Other');
    });

});
