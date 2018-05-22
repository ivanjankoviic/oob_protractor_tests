
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
    });

    it ("On event-add/menu2/ (click on Test), check if fields exist, and if they are named properly", function() {
        console.log("On event-add/menu2/ (click on Test, check if fields exist, and if they are named properly");

        //klik na Activity
        eventAdd.categoris.get(0).click();

        // SCROOL za ADD EVENT do dna stranice
        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollHeight;");

        //klik na clik on Test
        eventAdd.categoris.get(10).click();

        // SCROOL za ADD EVENT do dna stranice
        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollHeight;");

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
        expect(eventAdd.categoris.get(9).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(10).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(11).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(12).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(13).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(14).isDisplayed()).toBeTruthy();
        expect(eventAdd.categoris.get(15).isDisplayed()).toBeTruthy();


        //Nacin da proveri text
        browser.wait(EC.presenceOf(eventAdd.categoris), 10000);
        expect(eventAdd.categoris.get(0).getText()).toBe('Run test 3 km');
        expect(eventAdd.categoris.get(1).getText()).toBe('Run test 3x1 km');
        expect(eventAdd.categoris.get(2).getText()).toBe('Run test 5 km');
        expect(eventAdd.categoris.get(3).getText()).toBe('Run test 5x1 km');
        expect(eventAdd.categoris.get(4).getText()).toBe('Run test 10 km');
        expect(eventAdd.categoris.get(5).getText()).toBe('Bike test 5 min');
        expect(eventAdd.categoris.get(6).getText()).toBe('Bike test 20 min');
        expect(eventAdd.categoris.get(7).getText()).toBe('Bike test 30 min');
        expect(eventAdd.categoris.get(8).getText()).toBe('Bike test 2x20 min');
        expect(eventAdd.categoris.get(9).getText()).toBe('Swim test 500 m');
        expect(eventAdd.categoris.get(10).getText()).toBe('Swim test 1000 m');
        expect(eventAdd.categoris.get(11).getText()).toBe('Swim test 1000 m broken');
        expect(eventAdd.categoris.get(12).getText()).toBe('Swim test 1500 m');
        expect(eventAdd.categoris.get(13).getText()).toBe('Swim test 1500 m broken');
        expect(eventAdd.categoris.get(14).getText()).toBe('Swim test 1900 m');
        expect(eventAdd.categoris.get(15).getText()).toBe('Swim test 3800 m');

    });

});