
// click on add more races
//
// check if enter race field exist
// check if enter date field exist
// check if add button exist
//
// check does the text "Enter the Race Name" is in a placeholder
// click on the "Enter the Race Name"button
//
//
// Enter some text in "Enter the race name" field
// Enter date in date field
// click on add button
//
// check if trophy icon exist
// check if upcoming goal date exists
// check if date matches the date that we previously entered
// check if name of the race matches the name of the race that we previously entered
//
// check if three dots button exist on the right from the upcoming goal date
// click on three dots button
// check if delete button is shown
// click on delete button
// check is the race deleted - icon name and date of the race shouldn't exist


var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var Profile = require('../Page_Objects/Profile.js');


describe ("Profile page, Add more races", function(){
    console.log("Profile page, Add more races");


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

    it ("click on add more races check if enter race field exist, check if enter date field exist,check if add button exist, check does the text 'Enter the Race Name' is in a placeholder, click on the 'Enter the Race Name'button, Enter some text in 'Enter the race name' field, Enter date in date field, click on add button, check if trophy icon exist, check if upcoming goal date exists, check if date matches the date that we previously entered, check if name of the race matches the name of the race that we previously entered,check if three dots button exist on the right from the upcoming goal date, click on three dots button,check if delete button is shown, click on delete button, check is the race deleted - icon name and date of the race shouldn't exist. ", function() {
        console.log("click on add more races check if enter race field exist, check if enter date field exist,check if add button exist, check does the text 'Enter the Race Name' is in a placeholder, click on the 'Enter the Race Name'button, Enter some text in 'Enter the race name' field, Enter date in date field, click on add button, check if trophy icon exist, check if upcoming goal date exists, check if date matches the date that we previously entered, check if name of the race matches the name of the race that we previously entered,check if three dots button exist on the right from the upcoming goal date, click on three dots button,check if delete button is shown, click on delete button, check is the race deleted - icon name and date of the race shouldn't exist. ");

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
        profile.raceName.sendKeys(protractor.Key.TAB, '11', '26', '2018' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        browser.wait(EC.presenceOf(profile.trophyIcon), 5000);
        expect(profile.trophyIcon.isDisplayed()).toBeTruthy();

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function() {
            expect(element(by.className('upcoming-goal-date')).getText()).toEqual('Upcoming goal: 26. Nov 2018.');
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[0].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('1. 123456789 }{ ŽĐŠPOĆČLqweasdfx(/&%$#');
        });

        //proveriti da li je element prisutan(tri tackice za delete)
        expect(profile.threeDotsDeleteRaceBtn.isDisplayed()).toBeTruthy();

        //Nacin da se klikne na tri tackice za delete
        profile.upcomingGoalDate.then(function() {
            profile.threeDotsDeleteRaceBtn.click();
        });

        //proveriti da li je element prisutan(delete dugme)
        expect(profile.deleteRaceBtn.isDisplayed()).toBeTruthy();

        //Nacin da se klikne na delete
        profile.upcomingGoalDate.then(function() {
            profile.deleteRaceBtn.click();
        });

        //provera da li NE postoji ikonica pehara
        expect(profile.trophyIcon.isPresent()).toBeFalsy( );

    });
});
