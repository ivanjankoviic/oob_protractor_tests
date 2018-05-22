
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var Profile = require('../Page_Objects/Profile.js');


describe ("Add races in past, and expect allert", function(){
    console.log("Add races in past, and expect allert");


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
    var profile = new Profile();
    var EC = protractor.ExpectedConditions;

    it ("Add race in past on calendar, and expect alert (popup window), check text on alert window", function() {
        console.log("Add race in past on calendar, and expect alert (popup window), check text on alert window");

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

        //klik na plavi krstic za dodavanje novih trka
        browser.wait(EC.presenceOf(profile.addMoreRaces), 5000);
        expect(profile.addMoreRaces.isDisplayed()).toBeTruthy();
        profile.addMoreRaces.click();

        //provera da li postoji element enter race
        expect(profile.raceName.isDisplayed()).toBeTruthy();

        //provera da li postoji element race date
        expect(profile.raceDate.isDisplayed()).toBeTruthy();

        //provera da li postoji element add race
        expect(profile.addRaceBtn.isDisplayed()).toBeTruthy();

        //provera texta u placeholder-u
        profile.raceName.getAttribute('placeholder').then(function(element){
            expect(element).toEqual('Enter the Race Name');
        });

        //upis u polje enter race
        profile.raceName.sendKeys('123456789 }{ ŽĐŠPOĆČLqweasdfx(/&%$#');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '11', '26', '2016' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera texta na alet-u
        browser.wait(EC.presenceOf(element(by.css('.popup-body span'))), 5000);
        expect(element(by.css('.popup-body span')).getText()).toEqual('The goal can not be in the past');
        //klik na ok na alert-u
        element(by.css("[ng-click='$buttonTapped(button, $event)']")).click();

    });
});
