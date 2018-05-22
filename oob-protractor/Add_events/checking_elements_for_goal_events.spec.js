/*
 * Checking elements for Goal - Run race events with different default duration
     * Create event Goal - Run race - 5km and check whether the elements are visible and whether the default duration 30
     * Create event Goal - Run race - 10km and check whether the elements are visible and whether the default duration 60
     * Create event Goal - Run race - Halfmarathon and check whether the elements are visible and whether the default duration 100
     * Create event Goal - Run race - Marathon and check whether the elements are visible and whether the default duration 200
     * Create event Goal - Run race - Other and check whether the elements are visible and whether the default duration 100

* Checking elements for Goal - Bike race events with different default difficulty
     * Create event Goal - Bike race - Bike race and check whether the elements are visible and whether the default duration 180
     * Create event Goal - Bike race - Time trial and check whether the elements are visible and whether the default duration 60

* Checking elements for Goal - Swim race events with different default difficulty
    * Create event Goal - Swim race and check whether the elements are visible and whether the default duration 60

* Checking elements for Goal - Duathlon race events with different default difficulty
    * Create event Goal - Duathlon race and check whether the elements are visible and whether the default duration 60

* Checking elements for Goal - Aquathlon race events with different default difficulty
    * Create event Goal - Aquathlon race and check whether the elements are visible and whether the default duration 60

* Checking elements for Goal - Triathlon race events with different default difficulty
    * Create event Goal - Triathlon race - Sprint and check whether the elements are visible and whether the default duration 90
    * Create event Goal - Triathlon race - Olympic distance and check whether the elements are visible and whether the default duration 150
    * Create event Goal - Triathlon race - Half ironman and check whether the elements are visible and whether the default duration 360
    * Create event Goal - Triathlon race - Ironman and check whether the elements are visible and whether the default duration 780
    * Create event Goal - Triathlon race - Other and check whether the elements are visible and whether the default duration 150

* Checking elements for Goal - Weight loss events
    * Create event Goal - Weight loss and check whether the elements are visible

* Checking elements for Goal - Fitness events
    * Create event Goal - Fitness and check whether the elements are visible

* Checking elements for Goal - Others events
    * Create event Goal - Others and check whether the elements are visible

 */

var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var AddEvent = require('../Page_Objects/AddEvent.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');

describe ("Checking elements for Goal - Run race events with different default difficulty", function(){

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


    it ("Create event Goal - Run race - 5km and check whether the elements are visible and whether the default duration 30", function() {
        console.log("Create event Goal - Run race - 5km and check whether the elements are visible and whether the default duration 30");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race 5 km');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('30');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('5');
        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var distanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(distanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Run race - 10km and check whether the elements are visible and whether the default duration 60", function() {
        console.log("Create event Goal - Run race - 10km and check whether the elements are visible and whether the default duration 60");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race 10 km');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('60');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('10');
        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var distanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(distanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Run race - Halfmarathon and check whether the elements are visible and whether the default duration 100", function() {
        console.log("Create event Goal - Run race - Half marathon and check whether the elements are visible and whether the default duration 100");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();

        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race Halfmarathon');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('100');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('21.0975');
        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var distanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(distanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Run race - Marathon and check whether the elements are visible and whether the default duration 200", function() {
        console.log("Create event Goal - Run race - Marathon and check whether the elements are visible and whether the default duration 200");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race Marathon');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('200');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('42.195');
        });


        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var distanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(distanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Run race - Other distance and check whether the elements are visible and whether the default duration 100", function() {
        console.log("Create event Goal - Run race - Other distance and check whether the elements are visible and whether the default duration 100");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(4).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Run race Other distance');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('100');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var distanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(distanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Bike race - Bike race and check whether the elements are visible and whether the default duration 180", function() {
        console.log("Create event Goal - Bike race - Bike race and check whether the elements are visible and whether the default duration 180");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Bike race Bike race');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('180');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var distanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(distanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Bike race - Time trial and check whether the elements are visible and whether the default duration 60", function() {
        console.log("Create event Goal - Bike race - Time trial and check whether the elements are visible and whether the default duration 60");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Bike race Time trial');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('60');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var distanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(distanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Swim race and check whether the elements are visible and whether the default duration 60", function() {
        console.log("Create event Goal - Swim race and check whether the elements are visible and whether the default duration 60");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Swim race');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('60');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var distanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(distanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Duathlon race and check whether the elements are visible and whether the default duration 60", function() {
        console.log("Create event Goal - Duathlon race and check whether the elements are visible and whether the default duration 60");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(4).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Duathlon race');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('60');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');

        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var RunDistanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var BikeDistanceElement = req[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var RunDistanceSecondElement = req[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(RunDistanceElement.isDisplayed()).toBeTruthy();
            expect(BikeDistanceElement.isDisplayed()).toBeTruthy();
            expect(RunDistanceSecondElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Aquathlon race and check whether the elements are visible and whether the default duration 60", function() {
        console.log("Create event Goal - Aquathlon race and check whether the elements are visible and whether the default duration 60");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(5).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Aquathlon race');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('60');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var SwimDistanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var RunDistanceElement = req[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(SwimDistanceElement.isDisplayed()).toBeTruthy();
            expect(RunDistanceElement.isDisplayed()).toBeTruthy();


        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Triathlon race - Sprint and check whether the elements are visible and whether the default duration 90", function() {
        console.log("Create event Goal - Triathlon race - Sprint and check whether the elements are visible and whether the default duration 90");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(0).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Triathlon race Sprint');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('90');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('750');
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('20');
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('5');

        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var SwimDistanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var BikeDistanceElement = req[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var RunDistanceElement = req[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(SwimDistanceElement.isDisplayed()).toBeTruthy();
            expect(BikeDistanceElement.isDisplayed()).toBeTruthy();
            expect(RunDistanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Triathlon race - Olympic distance and check whether the elements are visible and whether the default duration 150", function() {
        console.log("Create event Goal - Triathlon race - Olympic distance and check whether the elements are visible and whether the default duration 150");

        browser.sleep(3000);
        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Triathlon race Olympic distance');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('150');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('1500');
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('40');
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('10');

        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var SwimDistanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var BikeDistanceElement = req[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var RunDistanceElement = req[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(SwimDistanceElement.isDisplayed()).toBeTruthy();
            expect(BikeDistanceElement.isDisplayed()).toBeTruthy();
            expect(RunDistanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Triathlon race - Half ironman and check whether the elements are visible and whether the default duration 360", function() {
        console.log("Create event Goal - Triathlon race - Half ironman and check whether the elements are visible and whether the default duration 360");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(2).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Triathlon race Half ironman');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('360');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('1900');
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('90');
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('21.098');

        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var SwimDistanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var BikeDistanceElement = req[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var RunDistanceElement = req[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(SwimDistanceElement.isDisplayed()).toBeTruthy();
            expect(BikeDistanceElement.isDisplayed()).toBeTruthy();
            expect(RunDistanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Triathlon race - Ironman and check whether the elements are visible and whether the default duration 780", function() {
        console.log("Create event Goal - Triathlon race - Ironman and check whether the elements are visible and whether the default duration 780");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Triathlon race Ironman');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('780');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('3800');
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('180');
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('42.195');

        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var SwimDistanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var BikeDistanceElement = req[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var RunDistanceElement = req[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(SwimDistanceElement.isDisplayed()).toBeTruthy();
            expect(BikeDistanceElement.isDisplayed()).toBeTruthy();
            expect(RunDistanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Triathlon race - Other and check whether the elements are visible and whether the default duration 150", function() {
        console.log("Create event Goal - Triathlon race - Other and check whether the elements are visible and whether the default duration 150");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(3).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(4).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Triathlon race Others');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.durationField), 5000);
        expect(createEvent.durationField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('150');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
            expect(posts[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
            expect(posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');

        });

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var SwimDistanceElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var BikeDistanceElement = req[2].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var RunDistanceElement = req[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(SwimDistanceElement.isDisplayed()).toBeTruthy();
            expect(BikeDistanceElement.isDisplayed()).toBeTruthy();
            expect(RunDistanceElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Weight loss and check whether the elements are visible", function() {
        console.log("Create event Goal - Weight loss and check whether the elements are visible");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(6).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Weight loss');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        //provera da li je duration 30
        expect(createEvent.durationField.getAttribute('value')).toEqual('');

        //za dodavanje u donjim poljima u ovom slucaju distance
        element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
            expect(posts[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).getAttribute('value')).toEqual('');
        });

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
            var weightElement = req[1].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();
            expect(weightElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Fitness and check whether the elements are visible", function() {
        console.log("Create event Goal - Fitness and check whether the elements are visible");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(7).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Fitness');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();

        });

        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

    it ("Create event Goal - Others and check whether the elements are visible", function() {
        console.log("Create event Goal - Other and check whether the elements are visible");

        browser.sleep(3000);

        calendar.buttonAddEvent.click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(1).click();
        browser.wait(EC.presenceOf(addEvent.categoris), 5000);
        addEvent.categoris.get(8).click();

        //provera naslova
        expect(createEvent.eventTitleDefault.getText()).toEqual('Goal Others');

        //provera da li su svi elementi na stranci
        browser.wait(EC.presenceOf(createEvent.dateField), 5000);
        expect(createEvent.dateField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.orderField), 5000);
        expect(createEvent.orderField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.addNoteField), 5000);
        expect(createEvent.addNoteField.isDisplayed()).toBeTruthy();

        browser.wait(EC.presenceOf(createEvent.requirements), 5000);
        createEvent.requirements.then(function(req) {
            var titleElement = req[0].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

            expect(titleElement.isDisplayed()).toBeTruthy();

        });
        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        expect(createEvent.createEventButton.isDisplayed()).toBeTruthy();

    });

});
