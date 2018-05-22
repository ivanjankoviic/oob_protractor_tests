/**
 * Created by ivan on 24.10.17..
 */

/*

 * Checking elements on Profile Info page
 * Check whether the elements are visible on Profile Info page
 * Check whether the elements are visible on Profile Info page edit form
 * Edit profile information for Home Town on Profile Info page edit form
 * Edit profile information for Birthday on Profile Info page edit form
 * Edit profile information for Phone on Profile Info page edit form
 * Edit profile information for Gender on Profile Info page edit form

 */

var SetupService = require('./../setup_service.js');
var Config = require ('./../Config/config.js');
var Login = require('./../Page_Objects/Login.js');
var Calendar = require('./../Page_Objects/Calendar.js');
var Profile = require('./../Page_Objects/Profile.js');
var moment = require ('moment');

describe ("Checking elements on Profile Info page", function(){

    beforeEach(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);

        browser.get(config.test_url);
        // //login
        browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys(config.username);
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 5000);
        calendar.showMenuProfileButton.click();

    });

    afterEach(function (){
        // console.log('afterAll');
        var uri = config.backend_uri +"/avl/user?username="+config.username;
        setup_service.delete_user(uri)
    });

    var setup_service = new SetupService;
    var login = new Login();
    var calendar = new Calendar();
    var profile = new Profile();
    var config = new Config();
    var EC = protractor.ExpectedConditions;
    var current_day = moment().format('[day-]YYYY-MM-DD');

    function getSelectedText(select) {
        return select.getAttribute('value')
            .then(function (i) {
                return select.element(by.css('option[value="' + i + '"]')).getText();
            });
    }

    it ("Check whether the elements are visible on Profile Info page", function() {
        console.log("Check whether the elements are visible on Profile Info page - check WEIGHT");

        browser.wait(EC.presenceOf(profile.weight), 5000);
        expect(profile.weight.isDisplayed()).toBeTruthy();
        expect(profile.weight.getAttribute('placeholder')).toEqual('Weight');

        browser.wait(EC.presenceOf(profile.height), 5000);
        expect(profile.height.isDisplayed()).toBeTruthy();
        expect(profile.height.getAttribute('placeholder')).toEqual('Height');

        browser.wait(EC.presenceOf(profile.language), 5000);
        expect(profile.language.isDisplayed()).toBeTruthy();
        expect(profile.language.getText()).toEqual("Language\nEnglish\nDanish\nSpanish");
        expect(getSelectedText(element(by.model('vm.language_selected')))).toBe('English');

        browser.wait(EC.presenceOf(profile.sport), 5000);
        expect(profile.sport.isDisplayed()).toBeTruthy();
        expect(profile.sport.getText()).toEqual("Sport\nRun\nCycle\nTriathlon");
        expect(getSelectedText(element(by.model('vm.sport_selected')))).toBe('Run');

        profile.weight.clear();
        profile.weight.sendKeys('29');
        expect(profile.weight.getAttribute('value')).toEqual('29');
        browser.refresh();
        browser.wait(EC.presenceOf(profile.weight), 10000);
        expect(profile.weight.isDisplayed()).toBeTruthy();
        expect(profile.weight.getAttribute('value')).toEqual('');
        expect(profile.weight.getAttribute('placeholder')).toEqual('Weight');

        profile.weight.clear();
        profile.weight.sendKeys('29');

        // check alert message
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button and clear fields
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);

        expect(profile.weight.getAttribute('value')).toEqual('80');

        profile.weight.clear();
        profile.weight.sendKeys('77');
        expect(profile.weight.getAttribute('value')).toEqual('77');

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);

        // check in calendar is event made
        browser.wait(EC.presenceOf(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)"))), 10000);
        browser.findElements(by.id(current_day)).then(function() {
            expect(element(by.css( "#" + current_day + " oob-day .day-events-full .day-event-full:nth-child(1)")).getText()).toBe('Weight 80kg');
        });

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 10000);
        calendar.showMenuProfileButton.click();

        browser.wait(EC.presenceOf(profile.weight), 5000);
        expect(profile.weight.getAttribute('value')).toEqual('80');

        profile.weight.clear();
        profile.weight.sendKeys('111');
        expect(profile.weight.getAttribute('value')).toEqual('111');

        // check alert message
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button and clear fields
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);

        expect(profile.weight.getAttribute('value')).toEqual('111');

    });

    it ("Check whether the elements are visible on Profile Info page", function() {
        console.log("Check whether the elements are visible on Profile Info page - Height");

        browser.wait(EC.presenceOf(profile.height), 5000);

        profile.height.clear();
        profile.height.sendKeys('29');
        expect(profile.height.getAttribute('value')).toEqual('29');
        browser.refresh();
        browser.wait(EC.presenceOf(profile.height), 10000);
        expect(profile.height.isDisplayed()).toBeTruthy();
        expect(profile.height.getAttribute('value')).toEqual('');
        expect(profile.height.getAttribute('placeholder')).toEqual('Height');

        profile.height.clear();
        profile.height.sendKeys('29');

        // check alert message
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button and clear fields
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);

        expect(profile.height.getAttribute('value')).toEqual('180');

        profile.height.clear();
        profile.height.sendKeys('198');
        // expect(profile.weight.getAttribute('value')).toEqual('198');

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 10000);
        calendar.showMenuProfileButton.click();

        browser.wait(EC.presenceOf(profile.height), 5000);
        expect(profile.height.getAttribute('value')).toEqual('180');

        profile.height.clear();
        profile.height.sendKeys('299');
        expect(profile.height.getAttribute('value')).toEqual('299');

        // check alert message
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button and clear fields
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);

        expect(profile.height.getAttribute('value')).toEqual('299');

    });

    it ("Check whether the elements are visible on Profile Info page", function() {
        console.log("Check whether the elements are visible on Profile Info page - LANGUAGE");

        browser.wait(EC.presenceOf(profile.language), 5000);

        profile.language.click();
        profile.languages.get(0).click();
        browser.sleep(300);
        expect(getSelectedText(profile.language)).toBe('Language');
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Add more races");
        expect(getSelectedText(profile.language)).toBe('Language');

        profile.language.click();
        profile.languages.get(1).click();
        browser.sleep(300);
        expect(getSelectedText(profile.language)).toBe('English');
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Add more races");
        expect(getSelectedText(profile.language)).toBe('English');

        profile.language.click();
        profile.languages.get(2).click();
        browser.sleep(300);
        expect(getSelectedText(profile.language)).toBe('Danish');
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Gennemført');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profil opdateret');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Tilføj flere stævner");
        expect(getSelectedText(profile.language)).toBe('Danish');

        profile.language.click();
        profile.languages.get(3).click();
        browser.sleep(300);
        expect(getSelectedText(profile.language)).toBe('Spanish');
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Éxito');
        expect(element(by.css(".popup-body")).getText()).toEqual('Actualizar perfil');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Añadir más carreras");
        expect(getSelectedText(profile.language)).toBe('Spanish');

        browser.refresh();
        browser.wait(EC.presenceOf(profile.height), 10000);
        expect(getSelectedText(profile.language)).toBe('Spanish');
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Añadir más carreras");

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 10000);
        calendar.showMenuProfileButton.click();

        browser.wait(EC.presenceOf(profile.height), 10000);
        expect(getSelectedText(profile.language)).toBe('Spanish');
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Añadir más carreras");
    });

    it ("Check whether the elements are visible on Profile Info page", function() {
        console.log("Check whether the elements are visible on Profile Info page - SPORTS");

        browser.wait(EC.presenceOf(profile.sport), 5000);

        profile.sport.click();
        profile.sports.get(0).click();
        browser.sleep(300);
        expect(getSelectedText(profile.sport)).toBe('Sport');
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);
        expect(getSelectedText(profile.sport)).toBe('Sport');

        profile.sport.click();
        profile.sports.get(1).click();
        browser.sleep(300);
        expect(getSelectedText(profile.sport)).toBe('Run');
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);
        expect(getSelectedText(profile.sport)).toBe('Run');

        profile.sport.click();
        profile.sports.get(2).click();
        browser.sleep(300);
        expect(getSelectedText(profile.sport)).toBe('Cycle');
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);
        expect(getSelectedText(profile.sport)).toBe('Cycle');

        profile.sport.click();
        profile.sports.get(3).click();
        browser.sleep(300);
        expect(getSelectedText(profile.sport)).toBe('Triathlon');
        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Success');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profile updated');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);
        expect(getSelectedText(profile.sport)).toBe('Triathlon');

        browser.refresh();
        browser.wait(EC.presenceOf(profile.sport), 10000);
        expect(getSelectedText(profile.sport)).toBe('Triathlon');

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 10000);
        calendar.showMenuProfileButton.click();

        browser.wait(EC.presenceOf(profile.sport), 10000);
        expect(getSelectedText(profile.sport)).toBe('Triathlon');
    });

    it ("Check whether the elements are visible on Profile Info page", function() {
        console.log("Check whether the elements are visible on Profile Info page - ALL");

        browser.wait(EC.presenceOf(profile.sport), 5000);
        profile.sport.click();
        profile.sports.get(2).click();
        browser.sleep(300);
        expect(getSelectedText(profile.sport)).toBe('Cycle');


        browser.wait(EC.presenceOf(profile.language), 5000);
        profile.language.click();
        profile.languages.get(2).click();
        browser.sleep(300);
        expect(getSelectedText(profile.language)).toBe('Danish');
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Add more races");

        browser.wait(EC.presenceOf(profile.height), 5000);
        profile.height.clear();
        profile.height.sendKeys('156');
        expect(profile.height.getAttribute('value')).toEqual('156');

        profile.weight.clear();
        profile.weight.sendKeys('98');
        expect(profile.weight.getAttribute('value')).toEqual('98');

        profile.saveButton.click();
        browser.driver.sleep(300);
        // check alert message
        browser.wait(EC.presenceOf(element(by.css(".popup-head"))), 5000);
        expect(element(by.css(".popup-head")).getText()).toEqual('Gennemført');
        expect(element(by.css(".popup-body")).getText()).toEqual('Profil opdateret');
        //click OK button
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();
        browser.driver.sleep(300);

        expect(getSelectedText(profile.sport)).toBe('Cycle');
        expect(getSelectedText(profile.language)).toBe('Danish');
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Tilføj flere stævner");
        expect(profile.height.getAttribute('value')).toEqual('156');
        expect(profile.weight.getAttribute('value')).toEqual('98');


        browser.refresh();
        browser.wait(EC.presenceOf(profile.sport), 10000);
        expect(getSelectedText(profile.sport)).toBe('Cycle');
        expect(getSelectedText(profile.language)).toBe('Danish');
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Tilføj flere stævner");
        expect(profile.height.getAttribute('value')).toEqual('156');
        expect(profile.weight.getAttribute('value')).toEqual('98');

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuCalendarButton), 10000);
        calendar.showMenuCalendarButton.click();

        browser.driver.sleep(500);

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuProfileButton), 10000);
        calendar.showMenuProfileButton.click();

        browser.wait(EC.presenceOf(profile.sport), 10000);
        expect(getSelectedText(profile.sport)).toBe('Cycle');
        expect(getSelectedText(profile.language)).toBe('Danish');
        expect(element(by.css('[ng-if="!vm.add_races"]')).getText()).toEqual("Tilføj flere stævner");
        expect(profile.height.getAttribute('value')).toEqual('156');
        expect(profile.weight.getAttribute('value')).toEqual('98');

    });


});
