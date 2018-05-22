
var SetupService = require('../setup_service.js');
var Config = require('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var Profile = require('../Page_Objects/Profile.js');


describe ("Profile page, Add more races x10", function(){
    console.log("Profile page, Add more races x10");

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

    it ("RACE 1, click on add more races, and check fields and text", function() {
        console.log("RACE 1, click on add more races, and check fields and text");

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
        profile.raceName.sendKeys(protractor.Key.TAB, '09', '21', '2018' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[0].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[0].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 21. Sep 2018.');
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[0].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('1. 123456789 }{ ŽĐŠPOĆČLqweasdfx(/&%$#');
        });

    });

    it ("RACE 2, click on add more races, and check fields and text", function() {
        console.log("RACE 2, click on add more races, and check fields and text");

        browser.sleep(500);

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
        profile.raceName.sendKeys('QWEERTTUUOIO<NXBV');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '11', '26', '2018' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[1].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });


        //provera texta
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[1].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 26. Nov 2018.');
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[1].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('2. QWEERTTUUOIO<NXBV');
        });

    });

    it ("RACE 3, click on add more races, and check fields and text", function() {
        console.log("RACE 3, click on add more races, and check fields and text");

        browser.sleep(500);

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
        profile.raceName.sendKeys('~!@#$%^&*()_+|}{POIUIITYTERWEQASDAZCXZ>VCBVN');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '11', '27', '2018' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[2].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[2].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('3. ~!@#$%^&*()_+|}{POIUIITYTERWEQASDAZCXZ>VCBVN');
        });
        //provera texta
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[2].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 27. Nov 2018.');
        });
    });

    it ("RACE 4, click on add more races, and check fields and text", function() {
        console.log("RACE 4, click on add more races, and check fields and text");

        browser.sleep(500);

        //klik na plavi krstic za dodavanje novih trka
        browser.wait(EC.presenceOf(profile.addMoreRaces), 5000);
        expect(profile.addMoreRaces.isDisplayed()).toBeTruthy();
        profile.addMoreRaces.click();

        //provera da li postoji element enter race
        expect(profile.raceName.isDisplayed()).toBeTruthy();

        //provera da li postoji element bla bla bla race date
        expect(profile.raceDate.isDisplayed()).toBeTruthy();

        //provera da li postoji element add race
        expect(profile.addRaceBtn.isDisplayed()).toBeTruthy();

        //provera texta u placeholder-u
        profile.raceName.getAttribute('placeholder').then(function(element){
            expect(element).toEqual('Enter the Race Name');
        });

        //upis u polje enter race
        profile.raceName.sendKeys('DIGITAL CUBE');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '01', '01', '2034' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[3].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[3].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('4. DIGITAL CUBE');
        });
        //provera texta
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[3].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 01. Jan 2034.');
        });
    });

    it ("RACE 5, click on add more races, and check fields and text", function() {
        console.log("RACE 5, click on add more races, and check fields and text");

        browser.sleep(500);

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
        profile.raceName.sendKeys('tteyhg64564569879');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '02', '28', '2022' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[4].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[4].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('5. tteyhg64564569879');
        });
        //provera texta
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[4].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 28. Feb 2022.');
        });
        // SCROOL za ADD EVENT do dna stranice
        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="profile-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="profile-menu-scroll"]'+"').scrollHeight;");
    });

    it ("RACE 6, click on add more races, and check fields and text", function() {
        console.log("RACE 6, click on add more races, and check fields and text");

        browser.sleep(500);

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
        profile.raceName.sendKeys('asdfasfhjlgl bmw65y6w5');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '04', '01', '2024' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[5].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[5].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('6. asdfasfhjlgl bmw65y6w5');
        });

        //provera texta
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[5].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 01. Apr 2024.');
        });
    });
    it ("RACE 7, click on add more races, and check fields and text", function() {
        console.log("RACE 7, click on add more races, and check fields and text");

        browser.sleep(500);

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
        profile.raceName.sendKeys('150km unazad');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '04', '01', '2023' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[6].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[6].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('7. 150km unazad');
        });
        //provera texta
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[6].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 01. Apr 2023.');
        });
    });
    it ("RACE 8, click on add more races, and check fields and text", function() {
        console.log("RACE 8, click on add more races, and check fields and text");

        browser.sleep(500);

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
        profile.raceName.sendKeys('Beogradski maraton 2017.05.19');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '04', '01', '2021' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[7].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[7].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('8. Beogradski maraton 2017.05.19');
        });

        //provera texta
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[7].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 01. Apr 2021.');
        });
    });

    it ("RACE 9, click on add more races, and check fields and text", function() {
        console.log("RACE 9, click on add more races, and check fields and text");

        browser.sleep(500);

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
        profile.raceName.sendKeys('pera peric zika mikic ');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '04', '01', '2020' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[8].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[8].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('9. pera peric zika mikic');
        });
        //provera texta
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[8].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 01. Apr 2020.');
        });
        // SCROOL za ADD EVENT do dna stranice
        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="profile-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="profile-menu-scroll"]'+"').scrollHeight;");
    });
    it ("RACE 10, click on add more races, and check fields and text", function() {
        console.log("RACE 10, click on add more races, and check fields and text");


        browser.sleep(500);

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
        profile.raceName.sendKeys('.,masdaudwehefsdmnvnvbnbksugh.,.,.,.');

        //upis datuma u kalendar( prvo mesec pa dan)
        profile.raceName.sendKeys(protractor.Key.TAB, '07', '11', '2035' );

        //klik na add dugme
        profile.addRaceBtn.click();

        //provera da li postoji ikonica pehara
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[9].element(by.className('upcoming-goal-icon'));
            expect(titleElement.isDisplayed()).toBeTruthy();
        });

        //Nacin da se proveri tekst unutra ng-repeat
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[9].element(by.css('[data-dc-automation="name-add-more-races"]'));
            expect(titleElement.getText()).toEqual('10. .,masdaudwehefsdmnvnvbnbksugh.,.,.,.');
        });
        //provera texta
        profile.upcomingGoalDate.then(function(posts) {
            var titleElement = posts[9].element(by.className('upcoming-goal-date'));
            expect(titleElement.getText()).toEqual('Upcoming goal: 11. Jul 2035.');
        });
        // SCROOL za ADD EVENT do dna stranice
        browser.executeScript("document.querySelector('"+'ion-content[data-dc-automation="profile-menu-scroll"]'+"').scrollTop = document.querySelector('"+'ion-content[data-dc-automation="profile-menu-scroll"]'+"').scrollHeight;");
    });
});
