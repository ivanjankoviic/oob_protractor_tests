
/*
    - Test reports motivation event report
        - create motivation report
        - check is motivation event in calendar
        - enter the event
        - check are all elements visible
        - click on a completed activity
            - check are elements closed
        - click and check every HHS
        - type a message and discard
            - check if it is discarded when entering message board
        - type a message and click somewhere on the screen to exit the message board
            - check if entered letters are still in a message board
        - type a message with danish serbian and spanish letters and send
            - check if it is displayed that message was sent and check correctness
        - type another message and check


*/


var SetupService = require('../setup_service.js');
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require ('../Page_Objects/Calendar.js');
var AddEvent = require ('../Page_Objects/AddEvent.js');
var CreateEvent = require ('../Page_Objects/CreateEvent.js');
var ReportEvent = require ('../Page_Objects/ReportEvent.js');


describe ('report motivation event', function(){


    beforeEach(function (){
        var duri = config.backend_uri + "/avl/user?username=" + config.username;
        // setup_service.delete_user(duri, function (e, m, b) {

            // browser.driver.sleep(300);
            var uri = config.backend_uri + "/user/register?username=" + config.username + "&password=123&id_coach=" + config.coach_id + "&data=" + JSON.stringify(
                    {
                        "first_name": "user",
                        "last_name": "test",
                        "I_AGREE": "true",
                        "role": 1,
                        "language": 1,
                        "service": 1
                    });
            setup_service.register_user(uri);

            //login
            browser.get(config.test_url);
            browser.wait(EC.presenceOf(login.emailInput), 5000);
            login.emailInput.sendKeys(config.username);
            login.passwordInput.sendKeys('123');
            login.buttonLogin.click();
            //browser.sleep(1000);
            browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        // });

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
    var reportEvent = new ReportEvent();
    var config = new Config();
    var EC = protractor.ExpectedConditions;

    it ("Create report motivation and check", function() {
        console.log("Create report motivation and check");

        browser.sleep(3000);

        //click on add event button
        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(2).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();

        expect(createEvent.eventTitleDefault.getText()).toEqual('Reports Motivation');
        browser.wait(EC.presenceOf(addEvent.addEvent), 5000);
        createEvent.createEventButton.click();


        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.sleep(1000);
        // Add one more event
        browser.wait(EC.presenceOf(calendar.buttonAddEvent), 1000);
        //click on add event button
        calendar.buttonAddEvent.click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();
        browser.sleep(100);
        addEvent.categoris.get(0).click();

        // clcik on create event
        browser.wait(EC.presenceOf(createEvent.createEventButton), 5000);
        createEvent.createEventButton.click();

        //porovera i izlaz iz kada se napravi event za danasnji dan
        browser.wait(EC.presenceOf(reportEvent.sendMessage1), 10000);
        calendar.showMenuButton.click();
        calendar.showMenuCalendarButton.click();

        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        browser.driver.sleep(1000);

        // check if event is present in calendar and is title OK
        browser.findElements(by.id("day-" + calendar.returnCurrentDate().year
                .toString() + "-" + calendar.returnCurrentDate().monthNumber
                .toString() + "-" + calendar.returnCurrentDate().day.toString()))
            .then(function () {
                expect(element.all(by.repeater('event in vm.day.events')).count()).toEqual(4)
            });

        expect(element.all(by.repeater('event in vm.day.events')).get(2).getText()).toBe('Motivation');

        // click on event in calendar
        element(by.css('[on-tap="vm.show_one_event(event)"]')).click();

        browser.sleep(300);

        browser.wait(EC.presenceOf(reportEvent.writeMessage), 5000);
        expect(element(by.css('.task-header.high-cups')).getText()).toEqual('How are you feeling today?');


        // click on a completed and check if elements "How are you feeling today?" and HHS are not visible
        // reportEvent.completedActivity.click();
        //
        // browser.sleep(500);
        // expect(element(by.css('.task-header')).isDisplayed()).toBeFalsy();
        // expect(element(by.css('.task-feeling-value')).isDisplayed()).toBeFalsy();
        //
        // // click on a completed and check HHS buttons
        // reportEvent.completedActivity.click();
        // browser.sleep(500);

        expect(element(by.css('[ng-checked="+vm.event.full_range > 0"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 20"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 40"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 60"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 80"]')).isSelected()).toBeFalsy();

        // click on a first button
        element(by.css('[ng-checked="+vm.event.full_range > 0"]')).click();
        // element(by.css('[on-tap="vm.choose_full_range(20)"]')).click();

        browser.sleep(500);
        expect(element(by.css('[ng-checked="+vm.event.full_range > 0"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 20"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 40"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 60"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 80"]')).isSelected()).toBeFalsy();

        // click on a fifth button
        element(by.css('[ng-checked="+vm.event.full_range > 80"]')).click();
        // element(by.css('[on-tap="vm.choose_full_range(100)"]')).click();
        browser.sleep(500);

        expect(element(by.css('[ng-checked="+vm.event.full_range > 0"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 20"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 40"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 60"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 80"]')).isSelected()).toBeTruthy();

        // click on a second button
        element(by.css('[ng-checked="+vm.event.full_range > 20"]')).click();
        // element(by.css('[on-tap="vm.choose_full_range(40)"]')).click();
        browser.sleep(500);

        expect(element(by.css('[ng-checked="+vm.event.full_range > 0"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 20"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 40"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 60"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 80"]')).isSelected()).toBeFalsy();

        // click on a fourth button
        element(by.css('[ng-checked="+vm.event.full_range > 60"]')).click();
        browser.sleep(500);

        expect(element(by.css('[ng-checked="+vm.event.full_range > 0"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 20"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 40"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 60"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 80"]')).isSelected()).toBeFalsy();

        // click on a third button
        element(by.css('[ng-checked="+vm.event.full_range > 40"]')).click();
        browser.sleep(500);

        expect(element(by.css('[ng-checked="+vm.event.full_range > 0"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 20"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 40"]')).isSelected()).toBeTruthy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 60"]')).isSelected()).toBeFalsy();
        expect(element(by.css('[ng-checked="+vm.event.full_range > 80"]')).isSelected()).toBeFalsy();

        // click on a message, check elements and write a message
        // click na send message
        reportEvent.writeMessage.click();
        browser.sleep(500);
        // check are all elements visible
        browser.wait(EC.presenceOf(reportEvent.newMessage), 5000);
        expect(reportEvent.discardMessage.isDisplayed()).toBeTruthy();
        expect(reportEvent.sendMessage.isDisplayed()).toBeTruthy();

        // Type a message and discard
        reportEvent.newMessage.sendKeys('Ø æ Å Œ Ć ć Č č Đ đ Š š Ž ž ǅ ǆ ǈ ǉ ǋ ǌ');
        reportEvent.discardMessage.click();
        browser.sleep(500);

        // Check if it deleted content
        expect(reportEvent.writeMessage.isDisplayed()).toBeTruthy();
        reportEvent.writeMessage.click();
        browser.sleep(500);
        expect(reportEvent.newMessage.getText()).toEqual('');

        // Click on body and check is the text saved
        reportEvent.newMessage.sendKeys('Ø æ Å Œ Ć ć Č č Đ đ Š š Ž ž ǅ ǆ ǈ ǉ ǋ ǌ');

        // Way to click somewhere on the body
        browser.executeScript("$('.modal-backdrop').click()");
        reportEvent.writeMessage.click();
        reportEvent.sendMessage.click();
        browser.sleep(300);

        // Check the text
        browser.wait(EC.presenceOf(reportEvent.messageContent), 5000);
        expect(reportEvent.messageContent.isDisplayed()).toBeTruthy();
        expect((reportEvent.messageContent).getText()).toEqual('Ø æ Å Œ Ć ć Č č Đ đ Š š Ž ž ǅ ǆ ǈ ǉ ǋ ǌ');

        // check is the time element visible
        expect(element(by.css(".event-message-time")).isPresent()).toBeTruthy();

        // send another message
        reportEvent.writeMessage.click();
        browser.sleep(500);

        reportEvent.newMessage.sendKeys('á, é, í, ó, ú, ü, ñ, ¿, ¡');
        reportEvent.sendMessage.click();

        browser.wait(EC.presenceOf(reportEvent.messageContent), 5000);
        expect(reportEvent.messageContent.isDisplayed()).toBeTruthy();

        expect(element(by.css(".event-messages")).isPresent()).toBeTruthy();

        // expect(element(by.css(".event-message-time")).isPresent()).toBeTruthy();
        expect(reportEvent.eventMessages.isDisplayed()).toBeTruthy();
        
        // Way to check second message
        element.all(by.repeater('message in vm.event.messages')).then(function(posts) {
            var titleElement = posts[1].element(by.className('event-message-content ng-binding'));
            expect(titleElement.getText()).toEqual('á, é, í, ó, ú, ü, ñ, ¿, ¡');
        });

    });
});