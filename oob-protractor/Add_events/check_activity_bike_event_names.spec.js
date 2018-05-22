
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
            console.log("On event-add/menu/, check if fields exist, and if they are named properly");

            //login
            browser.get(config.test_url);
            browser.wait(EC.presenceOf(login.emailInput), 5000);
            login.emailInput.sendKeys(config.username);
            login.passwordInput.sendKeys('123');
            login.buttonLogin.click();
            browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
            browser.driver.sleep(1000);
            //nacin da se saceka element(crveni krstic)
            browser.wait(EC.presenceOf(calendar.buttonAddEvent), 10000);

            //klik na FUB(crveni krstic) dugme
            calendar.buttonAddEvent.click();

            //Nacin da proveri text
            browser.wait(EC.presenceOf(eventAdd.categoris), 10000);
            expect(eventAdd.categoris.get(0).isDisplayed()).toBeTruthy();
            expect(eventAdd.categoris.get(1).isDisplayed()).toBeTruthy();
            expect(eventAdd.categoris.get(2).isDisplayed()).toBeTruthy();
            expect(eventAdd.categoris.get(3).isDisplayed()).toBeTruthy();


            expect(eventAdd.categoris.get(0).getText()).toBe('Activity');
            expect(eventAdd.categoris.get(1).getText()).toBe('Goal');
            expect(eventAdd.categoris.get(2).getText()).toBe('Reports');
            expect(eventAdd.categoris.get(3).getText()).toBe('Nutrition');
            expect(eventAdd.categoris.get(4).getText()).toBe('Other');
            expect(eventAdd.messageForCoach.getText()).toBe('Message for Coach');



        });

        it ("On event-add/menu1/ (clik on Activity), check if fields exist, and if they are named properly", function() {
            console.log("On event-add/menu1/ (clik on Activity), check if fields exist, and if they are named properly");

            //klik na Activity
            eventAdd.categoris.get(0).click();

            //SCROLL do dna stranice
            browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollHeight;");

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
            expect(eventAdd.categoris.get(9).isDisplayed()).toBeTruthy();
            expect(eventAdd.categoris.get(10).isDisplayed()).toBeTruthy();
            expect(eventAdd.categoris.get(11).isDisplayed()).toBeTruthy();

            expect(eventAdd.categoris.get(0).getText()).toBe('Run');
            expect(eventAdd.categoris.get(1).getText()).toBe('Bike');
            expect(eventAdd.categoris.get(2).getText()).toBe('Swim');
            expect(eventAdd.categoris.get(3).getText()).toBe('Brick');
            expect(eventAdd.categoris.get(4).getText()).toBe('Strength weight based');
            expect(eventAdd.categoris.get(5).getText()).toBe('Strength interval based');
            expect(eventAdd.categoris.get(6).getText()).toBe('Cardio');
            expect(eventAdd.categoris.get(7).getText()).toBe('Stretch');
            expect(eventAdd.categoris.get(8).getText()).toBe('Walk');
            expect(eventAdd.categoris.get(9).getText()).toBe('Yoga');
            expect(eventAdd.categoris.get(10).getText()).toBe('Test');
            expect(eventAdd.categoris.get(11).getText()).toBe('Other');

            });

            it ("On event-add/menu2/ (clik on Bike), check if fields exist, and if they are named properly", function() {
            console.log("y are named properly");

            //klik na Bike
            eventAdd.categoris.get(1).click();
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

            //Nacin da proveri text
            browser.wait(EC.presenceOf(eventAdd.categoris), 10000);
            expect(eventAdd.categoris.get(0).getText()).toBe('Recovery bike');
            expect(eventAdd.categoris.get(1).getText()).toBe('Endurance bike');
            expect(eventAdd.categoris.get(2).getText()).toBe('Tempo bike');
            expect(eventAdd.categoris.get(3).getText()).toBe('Race pace bike');
            expect(eventAdd.categoris.get(4).getText()).toBe('Time trial bike');
            expect(eventAdd.categoris.get(5).getText()).toBe('Long intervals bike');
            expect(eventAdd.categoris.get(6).getText()).toBe('Short intervals bike');
            expect(eventAdd.categoris.get(7).getText()).toBe('Power bike');
            expect(eventAdd.categoris.get(8).getText()).toBe('Strength bike');
            expect(eventAdd.categoris.get(9).getText()).toBe('Spinning');
            expect(eventAdd.categoris.get(10).getText()).toBe('Fartlek bike');

            //SCROLL do dna stranice
            browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollHeight;");

            expect(eventAdd.categoris.get(11).getText()).toBe('MTB XC');
            expect(eventAdd.categoris.get(12).getText()).toBe('MTB Enduro');
            expect(eventAdd.categoris.get(13).getText()).toBe('MTB DH');
            expect(eventAdd.categoris.get(14).getText()).toBe('Freestyle');
            expect(eventAdd.categoris.get(15).getText()).toBe('Stationary bike');
            expect(eventAdd.categoris.get(16).getText()).toBe('Commute bike');
            expect(eventAdd.categoris.get(17).getText()).toBe('Other bike');

            });

            it ("On /event-add/form/ (clik on Recovery bike ), check if Create event field exist, and go on previous page, and chech " +
                    "fields exist on event-add/menu/, and if they are named properly", function() {
            console.log("On /event-add/form/ (clik on Recovery bike ), check if Create event field exist, and go on previous page, and chech " +
                "fields exist on event-add/menu/, and if they are named properly");

            //SCROOL za ADD EVENT do vrha stranice
            browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="add-event-menu-scroll"]'+"').scrollTop = 0;");

            //klik na Recovery bike
            eventAdd.categoris.get(0).click();
            //nacin da se proveri da li postoji polje order
            browser.wait(EC.presenceOf(createEvent.orderField), 10000);
            expect((createEvent.orderField).isPresent()).toBe(true);

            browser.navigate().back();

            //Nacin da proveri text
            browser.wait(EC.presenceOf(eventAdd.categoris), 10000);
            expect(eventAdd.categoris.get(0).isDisplayed()).toBeTruthy();
            expect(eventAdd.categoris.get(1).isDisplayed()).toBeTruthy();
            expect(eventAdd.categoris.get(2).isDisplayed()).toBeTruthy();
            expect(eventAdd.categoris.get(3).isDisplayed()).toBeTruthy();
  ;

            expect(eventAdd.categoris.get(0).getText()).toBe('Activity');
            expect(eventAdd.categoris.get(1).getText()).toBe('Goal');
            expect(eventAdd.categoris.get(2).getText()).toBe('Reports');
            expect(eventAdd.categoris.get(3).getText()).toBe('Nutrition');
            expect(eventAdd.categoris.get(4).getText()).toBe('Other');
            expect(eventAdd.messageForCoach.getText()).toBe('Message for Coach');


            });
});