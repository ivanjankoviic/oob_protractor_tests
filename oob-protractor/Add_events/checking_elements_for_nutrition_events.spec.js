
/*

 * Checking elements for Nutrition - Breakfast events
     * Create event Nutrition - Breakfast - Bread and check whether the elements are visible
     * Create event Nutrition - Breakfast - Yogurt and check whether the elements are visible

* Checking elements for Nutrition - Lunch events
    * Create event Nutrition - Lunch - Fish and check whether the elements are visible
    * Create event Nutrition - Lunch - Soup and check whether the elements are visible

* Checking elements for Nutrition - Dinner events
    * Create event Nutrition - Dinner - Meat and check whether the elements are visible
    * Create event Nutrition - Dinner - Vegetables and check whether the elements are visible


* Checking elements for Nutrition - Snack events
    * Create event Nutrition - Snack - Chocolate and check whether the elements are visible
    * Create event Nutrition - Snack - Nuts and check whether the elements are visible

* Checking elements for Nutrition - Sport nutrition events
    * Create event Nutrition - Sport nutrition - Protein shake and check whether the elements are visible
    * Create event Nutrition - Sport nutrition - Energy gels and check whether the elements are visible

* Checking elements for Nutrition - Drink events
    * Create event Nutrition - Drink - Fruit juice and check whether the elements are visible
    * Create event Nutrition - Drink - Tea and check whether the elements are visible


 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var AddEvent = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');

describe ("Checking elements for Nutrition - Breakfast events", function(){

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

    it ("Create event Nutrition - Breakfast - Bread and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Breakfast - Bread and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Breakfast Bread');

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

    it ("Create event Nutrition - Breakfast - Yogurt and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Breakfast - Yogurt and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(5).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Breakfast Yogurt');

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

    it ("Create event Nutrition - Lunch - Fish and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Lunch - Fish and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Lunch Fish');

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

    it ("Create event Nutrition - Lunch - Soup and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Lunch - Soup and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(8).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Lunch Soup');

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

    it ("Create event Nutrition - Dinner - Meat and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Dinner - Meat and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Dinner Meat');

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

    it ("Create event Nutrition - Dinner - Vegetables and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Dinner - Vegetables and check whether the elements are visible");

        browser.sleep(2000);
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(7).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Dinner Vegetables');

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

    it ("Create event Nutrition - Snack - Chocolate and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Snack - Chocolate and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Snack Chocolate');

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

    it ("Create event Nutrition - Snack - Nuts and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Snack - Nuts and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(5).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Snack Nuts');

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

    it ("Create event Nutrition - Sport nutrition - Protein shake and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Sport nutrition - Protein shake and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(4).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Sport nutrition Protein shake');

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

    it ("Create event Nutrition - Sport nutrition - Energy gels and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Sport nutrition - Energy gels and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(4).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Sport nutrition Energy gels');

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

    it ("Create event Nutrition - Drink - Fruit juice and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Drink - Fruit juice and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(5).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Drink Fruit juice');

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

    it ("Create event Nutrition - Drink - Tea and check whether the elements are visible", function() {
        console.log("Create event Nutrition - Drink - Tea and check whether the elements are visible");

        browser.sleep(2000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(5).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(4).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Nutrition Drink Tea');

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