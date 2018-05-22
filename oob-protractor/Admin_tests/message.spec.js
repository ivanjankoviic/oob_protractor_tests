


var Config = require ('../Config/config.js');
var LoginAdmin = require ('../Page_Objects_Admin/LoginAdmin.js');
var Calendar = require('../Page_Objects/Calendar.js');
var Login = require ('../Page_Objects/Login.js');


describe('@USER and BZ1', function () {

    var config = new Config;
    var loginAdmin = new LoginAdmin();
    var calendar = new Calendar();
    var login = new Login();
    var EC = protractor.ExpectedConditions;


    it ('check messages for admin and user', function () {
        console.log("check messages for admin and user");

        //poziva se odredjena adresa
        browser.get(config.admin_test2);

        browser.wait(EC.presenceOf(loginAdmin.emailInput), 10000);

        //upis username-a i sifre
        loginAdmin.emailInput.sendKeys('coach@avalonactive.com');
        loginAdmin.passwordInput.sendKeys('123');
        loginAdmin.buttonLogin.click();

        // provera teksta
        browser.wait(EC.presenceOf(element(by.css('.title-page'))), 10000);
        expect(element(by.css('.title-page')).getText()).toEqual('Welcome to OOB Admin');

        //odlazak na kalendar odredjenog usera
        browser.get('http://staging-coachcenter.ooblife.com/user/u00000iter/calendar/2018/03');

        //klik na side bar na adminu
        browser.actions().mouseMove(element(by.id('logo')), {x: -100, y: 35}).click().perform();
        browser.wait(EC.elementToBeClickable(element(by.css("[ng-click='vm.set_left_sidebar()']"))), 10000);
        element(by.css("[ng-click='vm.set_left_sidebar()']")).click();
        browser.sleep(200);

        // nacin da misem ode do plavog krstica za evente
        element.all(by.repeater('d in vm.week.days')).then(function(posts) {
            var titleElement = posts[10].element(by.css("[ng-click='vm.open_modal_add_event(vm.day)']"));
            browser.actions().mouseMove(titleElement).perform();
        });

        browser.sleep(200);

        //nacin da se klikne na plavi krstic
        element.all(by.repeater('d in vm.week.days')).then(function(posts1) {
            var titleElement = posts1[10].element(by.css(".header-day-add"));
            titleElement.click();
        });

        browser.sleep(200);

        //upis u search polje kada se klikne na plavi krstic
        element(by.css("[ng-model='vm.search_argument']")).sendKeys('jogging');

        //klilk na event koji smo trazili u search-u prvi po redu
        element(by.css("[ng-click='vm.go_add(e)']")).click();

        //klik na ADD button
        element(by.css("[ng-click='vm.add_event()']")).click();

        // browser.sleep(1000);
        browser.wait(EC.presenceOf(element(by.css("[ng-click='vm.click_on_event(e.id,e.event_name)']"))), 5000);

        //nacin da se klikne na PRVI napravljeni event
        element.all(by.repeater("e in vm.eventS.events[vm.day]| orderBy: 'plan_head'")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css("[ng-click='vm.click_on_event(e.id,e.event_name)']"));
            titleElement.click();
        });

        browser.sleep(200);
        browser.wait(EC.presenceOf(element(by.id("send-message-area"))), 5000);

        //upis u polje za poruke
        element(by.id("send-message-area")).sendKeys('123234  !@@#@#$@#$&^$% \n IOUOIUWQE m,n,mnmnbnmb :) :( :P');

        //klik na send message
        element(by.css("[ng-click='vm.send_message()']")).click();

        browser.sleep(200);
        browser.wait(EC.presenceOf(element(by.css(".message-view-list"))), 5000);

        //provera teksta poruke
        element.all(by.repeater("m in vm.event.messages")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css(".message-view-list"));
            expect(titleElement.getText()).toEqual('123234  !@@#@#$@#$&^$% \n IOUOIUWQE m,n,mnmnbnmb :) :( :P');
        });

        //klik na X da se zatvori prozor od eventa
        element(by.css(".header-event-view-right")).click();

        browser.sleep(200);

        //----------------------------------------------------------------------------
        // otvoriti novi TAB
        browser.executeScript('window.open()').then(function () {
            browser.getAllWindowHandles().then(function (handles) {
                var secondWindow = handles[1];
                browser.switchTo().window(secondWindow).then(function () {
                    return browser.get(config.test_url);
                });
            });
        });

        browser.sleep(1000);

        //login
        // browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('test@test.com');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);

        //provera da li se pojavio crveni krugic koji pokazuje broj poruka
        browser. wait(EC.presenceOf(element(by.css(".message-notification"))), 5000);

        //klik na crveni krugic koji broji poruke
        element(by.css(".message-notification")).click();

        browser.sleep(200);

        //klik na poruku
        element.all(by.repeater("msg in vm.dcm.messages")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css(".message-content"));
            titleElement.click();
        });

        browser.sleep(1000);

        //provera teksta poruke
        element.all(by.repeater("message in vm.event.messages")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css("[data-dc-automation='event-message-content']"));
            expect(titleElement.getText()).toEqual('123234  !@@#@#$@#$&^$% \n IOUOIUWQE m,n,mnmnbnmb :) :( :P');
        });

        //klik na write message...
        browser.wait(EC.presenceOf(element(by.css('[on-tap="vm.open_messages()"]'))), 5000);
        element(by.css('[on-tap="vm.open_messages()"]')).click();

        //upis poruke
        browser.wait(EC.presenceOf(element(by.css('[ng-model="vm.new_message"]'))), 15000);
        element(by.css('[ng-model="vm.new_message"]')).sendKeys('123 $%^ (*& \n :) :( :P qwe POI ][');
        browser.sleep(200);

        //klik na send messges
        element(by.css('[data-dc-automation="send-message"]')).click();

        browser.sleep(200);

        //provera teksta poruke na user-u
        element.all(by.repeater("message in vm.event.messages")).then(function(posts1) {
            var titleElement = posts1[1].element(by.css("[data-dc-automation='event-message-content']"));
            expect(titleElement.getText()).toEqual('123 $%^ (*& \n :) :( :P qwe POI ][');
        });

        //provera da li NE POSTOJI brojac za poruke
        expect(element(by.css('.message-notification')).isDisplayed()).toBe(false);

        // user se izloguje sa completed activity
        browser.wait(EC.presenceOf(calendar.showMenuButton), 10000);
        calendar.showMenuButton.click();
        browser.wait(EC.presenceOf(calendar.showMenuLogoutButton), 5000);
        calendar.showMenuLogoutButton.click();
        browser.wait(EC.presenceOf(login.emailInput), 10000);
        expect(browser.getCurrentUrl()).toContain(config.test_url);

        //NACIN DA SE VRATI NA PRETHODNI TAB
        //------------------------------------------------------------------------------------------------
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]);
        });

        browser.wait(EC.presenceOf(element(by.css('.header-message-notification'))), 10000);
        browser.sleep(200);

        // nacin da se proveri BOJA na brojacu za poruke (gornji desni ugao)
        browser.wait(EC.presenceOf(element(by.css('.header-message-notification'))), 10000);
        expect(element(by.css('.header-message-notification')).getCssValue('background-color')).toEqual('rgba(235, 0, 139, 0.6)');

        // nacin da se proveri BOJA na eventu za poruke
        expect(element(by.repeater("e in vm.eventS.events[vm.day]| orderBy: 'plan_head'")).getCssValue('background-color')).toEqual('rgba(255, 255, 255, 1)');

        browser.sleep(200);
        //
        //klik na CLUBS na side meniu
        element(by.css('[ng-model="vm.dcm.left_sidebar_club_id"]')).click();

        //kllik na DEVELOPMENT
        browser.wait(EC.presenceOf(element(by.id('select_option_6'))), 5000);
        element(by.id('select_option_6')).click();

        browser.sleep(200);
        browser.wait(EC.presenceOf(element(by.css('.user-msgs'))), 10000);

        // //provera da li pored imena usera stoji ikonica koverte
        element.all(by.repeater("node in vm.theData|filter:vm.filter_search")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css(".user-msgs"));
            browser.wait(EC.presenceOf(titleElement), 5000);
        });


        //nacin da se klikne na PRVI napravljeni event
        element.all(by.repeater("e in vm.eventS.events[vm.day]| orderBy: 'plan_head'")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css("[ng-click='vm.click_on_event(e.id,e.event_name)']"));
            titleElement.click();
        });

        browser.sleep(200);
        browser.wait(EC.presenceOf(element(by.css('.message-view-list'))), 10000);

        //provera teksta poruke na user-u
        element.all(by.repeater("m in vm.event.messages")).then(function(posts1) {
            var titleElement = posts1[1].element(by.css(".message-view-list"));
            expect(titleElement.getText()).toEqual('123 $%^ (*& \n :) :( :P qwe POI ][');
        });

        //klik na X da se zatvori prozor od eventa
        element(by.css(".header-event-view-right")).click();

        browser.sleep(300);

        //provera da li NE POSTOJI brojac za poruke
        expect(browser.isElementPresent(element(by.css('.header-message-notification')))).toBe(true);


        // browser.sleep(2000);

        // // nacin da se proveri BOJA na eventu za poruke (ne sme da bude roze)
        expect(element(by.repeater("e in vm.eventS.events[vm.day]| orderBy: 'plan_head'")).getCssValue('background-color')).toEqual('rgba(255, 255, 255, 1)');



        // browser.navigate().refresh();
        // browser.sleep(20200);

        // // //provera da li pored imena usera NE stoji ikonica koverte
        // element.all(by.repeater("node in vm.theData|filter:vm.filter_search")).then(function(posts1) {
        //     var titleElement = posts1[0].element(by.css(".user-msgs"));
        //     expect(browser.isElementPresent(titleElement)).toBe(false);
        //     // expect(titleElement.isDisplayed()).toBe(false);
        //
        // });



        //nacin da se klikne na PRVI napravljeni event DESNIM KLIKOM
        element.all(by.repeater("e in vm.eventS.events[vm.day]| orderBy: 'plan_head'")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css("[ng-click='vm.click_on_event(e.id,e.event_name)']"));
            browser.actions().click(titleElement, protractor.Button.RIGHT).perform();
        });

        browser.sleep(200);

        //TODO: pronaci bolji nAcin da se izvuce element
        //klik na delete posle klika desnim dugmetom misa
        element.all(by.tagName('li')).get(9).click();

        //TODO: NAPRAVITI TEKST ZA PROVERU PORUKA SA TEMPLATE-A NA NEKOM DODATOM PLANU
        //TODO: NAPRAVITI TEKST ZA PROVERU PORUKA SA TEMPLATE-A NA NEKOM DODATOM PLANU
        //TODO: NAPRAVITI TEKST ZA PROVERU PORUKA SA TEMPLATE-A NA NEKOM DODATOM PLANU









        // browser.sleep(2200);







    });

});
