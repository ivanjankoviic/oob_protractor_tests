
/*
* Checking elements for activity events with different default difficulty
    * Create event Activity - Run - Jogging and check whether the elements are visible and whether the default difficulty 'Easy'
    * Create event Activity - Run - Speed work run and check whether the elements are visible and whether the default difficulty 'Medium'
    * Create event Activity - Run - Long interval run and check whether the elements are visible and whether the default difficulty 'Hard'
    * Create event Activity - Run - Treadmill and check whether the elements are visible and whether the default difficulty is not marked

*/

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var AddEvent = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');

describe ("Checking elements for Activity events with different default difficulty", function(){

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
    var login = new Login();
    var calendar = new Calendar();
    var addEvent = new AddEvent();
    var createEvent = new CreateEvent();
    var config = new Config();
    var EC = protractor.ExpectedConditions;



    it ("Create event Activity - Run - Jogging and check whether the elements are visible and whether the default difficulty 'Easy'", function() {
        console.log("Create event Activity - Run - Jogging and check whether the elements are visible and whether the default difficulty 'Easy'");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Run Jogging');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        // browser.wait(EC.presenceOf(createEvent.easyRadioButton), 5000);
        // expect(createEvent.easyRadioButton.isDisplayed()).toBeTruthy();
        //
        // browser.wait(EC.presenceOf(createEvent.mediumRadioButton), 5000);
        // expect(createEvent.mediumRadioButton.isDisplayed()).toBeTruthy();
        //
        // browser.wait(EC.presenceOf(createEvent.hardRadioButton), 5000);
        // expect(createEvent.hardRadioButton.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Activity - Run - Speed work run and check whether the elements are visible and whether the default difficulty 'Medium'", function() {
        console.log("Create event Activity - Run - Speed work run and check whether the elements are visible and whether the default difficulty 'Medium'");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(7).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Run Speed work run');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        // browser.wait(EC.presenceOf(createEvent.easyRadioButton), 5000);
        // expect(createEvent.easyRadioButton.isDisplayed()).toBeTruthy();
        //
        // browser.wait(EC.presenceOf(createEvent.mediumRadioButton), 5000);
        // expect(createEvent.mediumRadioButton.isDisplayed()).toBeTruthy();
        //
        // browser.wait(EC.presenceOf(createEvent.hardRadioButton), 5000);
        // expect(createEvent.hardRadioButton.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Activity - Run - Long interval run and check whether the elements are visible and whether the default difficulty 'Hard'", function() {
        console.log("Create event Activity - Run - Long interval run and check whether the elements are visible and whether the default difficulty 'Hard'");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(5).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Run Long interval run');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Activity - Run - Treadmill and check whether the elements are visible and whether the default difficulty is not marked", function() {
        console.log("Create event Activity - Run - Treadmill and check whether the elements are visible and whether the default difficulty is not marked");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(10).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Activity Run Treadmill');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

});