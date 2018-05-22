/**
 * Created by ivan on 28.12.17..
 */

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


    it ('check @USER and BZ1', function () {
        console.log("check @USER and BZ1");

        //poziva se odredjena adresa
        browser.get(config.admin_test2);
        //provera titla
        expect(browser.getTitle()).toBe('OOB ADMIN');
        browser.wait(EC.presenceOf(loginAdmin.emailInput), 10000);

        //upis username-a i sifre
        loginAdmin.emailInput.sendKeys('coach@avalonactive.com');
        loginAdmin.passwordInput.sendKeys('123');
        loginAdmin.buttonLogin.click();

        // provera teksta
        browser.wait(EC.presenceOf(element(by.css('.title-page'))), 10000);
        expect(element(by.css('.title-page')).getText()).toEqual('Welcome to OOB Admin');


        //TODO: kada prodje mesec promeniti dole u adresi mesec za jedan broj
        //odlazak na kalendar odredjenog usera
        // browser.get('http://staging-coachcenter.ooblife.com/user/u00000pAFR/calendar/2018/03');
        browser.get('http://staging-coachcenter.ooblife.com/user/u00000iter/calendar/2018/03');

        browser.sleep(1000);

        // //klik na side bar na adminu
        // browser.actions().mouseMove(element(by.id('logo')), {x: -100, y: 35}).click().perform();
        // browser.wait(EC.elementToBeClickable(element(by.css("[ng-click='vm.set_left_sidebar()']"))), 10000);
        // element(by.css("[ng-click='vm.set_left_sidebar()']")).click();
        // browser.sleep(200);

        // nacin da misem ode do plavog krstica za evente
        element.all(by.repeater('d in vm.week.days')).then(function(posts) {
            var titleElement = posts[9].element(by.css("[ng-click='vm.open_modal_add_event(vm.day)']"));
            browser.actions().mouseMove(titleElement).perform();
        });
        browser.sleep(1500);

        //nacin da se klikne na plavi krstic
        element.all(by.repeater('d in vm.week.days')).then(function(posts1) {
            var titleElement = posts1[9].element(by.css(".header-day-add"));
            titleElement.click();
        });

        browser.sleep(200);

        //upis u search polje kada se klikne na plavi krstic
        element(by.css("[ng-model='vm.search_argument']")).sendKeys('jogging');

        //klilk na event koji smo trazili u search-u prvi po redu
        element(by.css("[ng-click='vm.go_add(e)']")).click();

        browser.sleep(1000);

        //NACIN ZA TESTIRANJE CKEDITOR-a i IFRAME
        browser.ignoreSynchronization = true;
        browser.sleep(1500);
        browser.switchTo().frame(browser.findElement(By.xpath("//*[@id='cke_3_contents']/iframe")));
        browser.sleep(1000);
        browser.findElement(By.xpath("/html/body")).sendKeys("@USER \n BZ1 \n BZ2 \n BZ3 \n BZ4 \n BZ5 \n BZ6 \n RZ1 \n RZ2 \n RZ3 \n RZ4 \n RZ5 \n RZ6 ")
        browser.ignoreSynchronization = false;

        // Switch back to Default Content
        browser.switchTo().defaultContent();
        browser.waitForAngular();

        //klik na ADD button
        element(by.css("[ng-click='vm.add_event()']")).click();

        browser.sleep(1500);

        //nacin da se klikne na PRVI napravljeni event
        element.all(by.repeater("e in vm.eventS.events[vm.day]| orderBy: 'plan_head'")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css("[ng-click='vm.click_on_event(e.id,e.event_name)']"));
            titleElement.click();
        });

        // provera teksta
        browser.sleep(500);
        browser.wait(EC.presenceOf(element(by.id('event-description-con'))), 10000);

        // //nacin da se izvuce text iz drugog paragrafa
        // expect(element.all(by.tagName('p')).get(0).getText()).toBe('111 ');
        // expect(element.all(by.tagName('p')).get(1).getText()).toBe(' White Zone easy pace and relaxed breathing ');
        // expect(element.all(by.tagName('p')).get(2).getText()).toBe(' Green Zone moderate intensity ');
        // expect(element.all(by.tagName('p')).get(3).getText()).toBe(' Blue Zone steady intensity ');
        // expect(element.all(by.tagName('p')).get(4).getText()).toBe(' Yellow Zone hard intensity ');
        // expect(element.all(by.tagName('p')).get(5).getText()).toBe(' Red Zone very hard intensity ');
        // expect(element.all(by.tagName('p')).get(6).getText()).toBe(' Black Zone power and speed work ');
        // expect(element.all(by.tagName('p')).get(7).getText()).toBe(' White Zone easy pace and relaxed breathing ');
        // expect(element.all(by.tagName('p')).get(8).getText()).toBe(' Green Zone moderate intensity ');
        // expect(element.all(by.tagName('p')).get(9).getText()).toBe(' Blue Zone steady intensity ');
        // expect(element.all(by.tagName('p')).get(10).getText()).toBe(' Yellow Zone hard intensity ');
        // expect(element.all(by.tagName('p')).get(11).getText()).toBe(' Red Zone very hard intensity ');
        // expect(element.all(by.tagName('p')).get(12).getText()).toBe(' Black Zone power and speed work ');

        //klik na X da se zatvori prozor od eventa
        element(by.css(".header-event-view-right")).click();

        browser.sleep(200);

        //nacin da se klikne na PRVI napravljeni event DESNIM KLIKOM
        element.all(by.repeater("e in vm.eventS.events[vm.day]| orderBy: 'plan_head'")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css("[ng-click='vm.click_on_event(e.id,e.event_name)']"));

            browser.actions().click(titleElement, protractor.Button.RIGHT).perform();
        });

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

        browser.sleep(200);

        //login
        // browser.get(config.test_url);
        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('test@test.com');
        login.passwordInput.sendKeys('1234');
        login.buttonLogin.click();
        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);

        //klik na month
        element(by.css('[ng-click="vm.toggle_monthly_view()"]')).click();
        browser.driver.sleep(1500);

        //klik na 10 dan u kalendaru
        element(by.repeater('mday in mweek').row(9)).element(by.css('.mday-number')).click();
        browser.driver.sleep(1500);

        // nacin da se klikne na PRVI napravljeni event na month-u
        element.all(by.css('.day-selected')).get(0).click();

        browser.driver.sleep(2000);

        //TODO: kada se zavrsi jedan mesec mora da se ispravi i prebaci na drugi, zbog pomeranja kalendara

        //klik na event na month-u
        element(by.css('.completition-title')).click();

        browser.driver.sleep(500);

        // //nacin da se izvuce text iz drugog paragrafa
        // expect(element.all(by.tagName('p')).get(0).getText()).toBe('111');
        // expect(element.all(by.tagName('p')).get(1).getText()).toBe(' White Zone 57 watt or 150 bpm or easier  ');
        // expect(element.all(by.tagName('p')).get(2).getText()).toBe(' Green Zone 58 - 79 watt 151 - 177 bpm  ');
        // expect(element.all(by.tagName('p')).get(3).getText()).toBe(' Blue Zone 80 - 94 watt 178 - 202 bpm  ');
        // expect(element.all(by.tagName('p')).get(4).getText()).toBe(' Yellow Zone 95 - 110 watt 203 - 222 bpm  ');
        // expect(element.all(by.tagName('p')).get(5).getText()).toBe(' Red Zone 111 - 126 watt 223 - 233 bpm  ');
        // expect(element.all(by.tagName('p')).get(6).getText()).toBe(' Black Zone 127 watt or 234 bpm or harder  ');
        // expect(element.all(by.tagName('p')).get(7).getText()).toBe(' White Zone ( easy pace and relaxed breathing) ');
        // expect(element.all(by.tagName('p')).get(8).getText()).toBe(' Green Zone (moderate intensity) ');
        // expect(element.all(by.tagName('p')).get(9).getText()).toBe(' Blue Zone (steady intensity) ');
        // expect(element.all(by.tagName('p')).get(10).getText()).toBe(' Yellow Zone (hard intensity) ');
        // expect(element.all(by.tagName('p')).get(11).getText()).toBe(' Red Zone (very hard intensity) ');
        // expect(element.all(by.tagName('p')).get(12).getText()).toBe(' Black Zone (power and speed work) ');

        // showMenuButton must have SLEEP-a!!!
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
        browser.driver.sleep(500);

        browser.wait(EC.presenceOf(element(by.css('.menu-text'))), 10000);

        //TODO: pronaci bolji nAcin da se izvuce element
        //klik na delete posle klika desnim dugmetom misa
        element.all(by.tagName('li')).get(9).click();

        // browser.sleep(3000);
        //
        // //----------------------------------------------------------------------------------------------
    });

});
