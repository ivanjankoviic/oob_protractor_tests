
    // TODO treba nastaviti test kada se ispravi bug (posle search-a klik na back dugme)


var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var EventAdd = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');


describe ("Check search field", function(){
    console.log("Check search field");

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

    it ("Check search field", function() {
        console.log("Check search field");

        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);

        browser.sleep(1000);

        //klik na FUB(crveni krstic) dugme
        calendar.buttonAddEvent.click();

        browser.wait(EC.presenceOf(eventAdd.search), 10000);
        eventAdd.search.getAttribute('placeholder').then(function(element){
            expect(element).toEqual('Search');
        });

        eventAdd.search.sendKeys('jog');
        browser.sleep(500);

        expect(eventAdd.searchedEventName.get(0).getText()).toBe('Jogging(Run)');

        eventAdd.search.clear();
        eventAdd.search.sendKeys('tes');

        expect(eventAdd.searchedEventName.get(0).getText()).toBe('Bike test 20 min(Test)');

        expect(eventAdd.searchedEventName.get(1).getText()).toBe('Bike test 2x20 min(Test)');

        expect(eventAdd.searchedEventName.get(2).getText()).toBe('Bike test 30 min(Test)');

        expect(eventAdd.searchedEventName.get(3).getText()).toBe('Bike test 5 min(Test)');

        expect(eventAdd.searchedEventName.get(4).getText()).toBe('Run test 10 km(Test)');

        expect(eventAdd.searchedEventName.get(5).getText()).toBe('Run test 3 km(Test)');

        expect(eventAdd.searchedEventName.get(6).getText()).toBe('Run test 3x1 km(Test)');

        expect(eventAdd.searchedEventName.get(7).getText()).toBe('Run test 5 km(Test)');

        expect(eventAdd.searchedEventName.get(8).getText()).toBe('Run test 5x1 km(Test)');

        expect(eventAdd.searchedEventName.get(9).getText()).toBe('Swim test 1000 m(Test)');

        expect(eventAdd.searchedEventName.get(10).getText()).toBe('Swim test 1000 m broken(Test)');

        expect(eventAdd.searchedEventName.get(11).getText()).toBe('Swim test 1500 m(Test)');

        expect(eventAdd.searchedEventName.get(12).getText()).toBe('Swim test 1500 m broken(Test)');

        expect(eventAdd.searchedEventName.get(13).getText()).toBe('Swim test 1900 m(Test)');

        expect(eventAdd.searchedEventName.get(14).getText()).toBe('Swim test 3800 m(Test)');

        expect(eventAdd.searchedEventName.get(15).getText()).toBe('Swim test 500 m(Test)');

        eventAdd.search.clear();
        eventAdd.search.sendKeys('str');
        browser.sleep(500);

        expect(eventAdd.searchedEventName.get(0).getText()).toBe('Crosstrainer(Cardio)');

        expect(eventAdd.searchedEventName.get(1).getText()).toBe('Pastry(Snack)');

        expect(eventAdd.searchedEventName.get(2).getText()).toBe('Strength(Strength weight based)');

        expect(eventAdd.searchedEventName.get(3).getText()).toBe('Strength bike(Bike)');

        expect(eventAdd.searchedEventName.get(4).getText()).toBe('Strength swim(Swim)');

        expect(eventAdd.searchedEventName.get(5).getText()).toBe('Stress(Reports)');

        expect(eventAdd.searchedEventName.get(6).getText()).toBe('Stretching(Stretch)');

        browser.navigate().back();

        //nacin da se saceka element(crveni krstic)
        browser.wait(EC.presenceOf(calendar.buttonAddEvent), 10000);
        // browser.sleep(1000);

        // TODO treba nastaviti test kada se ispravi bug (posle search-a klik na back dugme)

    });
});
