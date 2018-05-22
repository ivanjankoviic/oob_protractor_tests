
/*

* Checking elements for Reports events
    * Create event Reports - Motivation and check whether the elements are visible
    * Create event Reports - Weight and check whether the elements are visible
    * Create event Reports - Sleep and check whether the elements are visible

 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');

describe ("Checking elements for Reports events", function(){

    beforeEach(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);

        //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
    });

    afterEach(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username;
        setup_service.delete_user(uri)

    });

    var setup_service = new SetupService;
    var config = new Config;
    var login = new Login();
    var calendar = new Calendar();
    var addEvent = new AddEvent();
    var createEvent = new CreateEvent();
    var EC = protractor.ExpectedConditions;


    it ("Create event Reports - Motivation and check whether the elements are visible", function() {
        console.log("Create event Reports - Motivation and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Reports Motivation');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Reports - Weight and check whether the elements are visible", function() {
        console.log("Create event Reports - Weight and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Reports Weight');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Reports - Sleep and check whether the elements are visible", function() {
        console.log("Create event Reports - Sleep and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(4).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Reports Sleep');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

});

