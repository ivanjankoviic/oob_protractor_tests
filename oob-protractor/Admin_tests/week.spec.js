/**
 * Created by ivan on 26.9.17..
 */


var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects_Admin/LoginAdmin.js');

describe('User login successful', function () {

    var config = new Config();
    var login = new Login();
    var EC = protractor.ExpectedConditions;

    it ('bla bla', function () {
        console.log("bla bla");

        // browser.ignoreSynchronization = true;
        // browser.waitForAngular();
        // browser.sleep(300);

        //poziva se odredjena adresa
        browser.get(config.admin_test2);
        //provera titla
        expect(browser.getTitle()).toBe('OOB ADMIN');
        browser.wait(EC.presenceOf(login.emailInput), 10000);

        //upis username-a i sifre
        login.emailInput.sendKeys('coach@avalonactive.com');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        browser.sleep(400);

        //provera teksta
        browser.wait(EC.presenceOf(element(by.css('.title-page'))), 10000);
        expect(element(by.css('.title-page')).getText()).toEqual('Welcome to OOB Admin');
        browser.sleep(500);

        //odlazak na kalendar odredjenog usera
        browser.get('http://staging-coachcenter.ooblife.com/user/u00000zEi5/calendar/2017/09');

        browser.sleep(5000);

        // // //klik na side bar na adminu
        // browser.actions().mouseMove(element(by.id('logo')), {x: -100, y: 35}).click().perform();
        // browser.wait(EC.elementToBeClickable(element(by.css("[ng-click='vm.set_left_sidebar()']"))), 10000);
        // element(by.css("[ng-click='vm.set_left_sidebar()']")).click();
        // browser.sleep(1000);
        // element(by.css("[ng-model='vm.dcm.switch_list[4]']")).click();
        // browser.sleep(1000);
        //

        // //nacin da se proveri tekst za WEEK
        // element.all(by.repeater('w in vm.weeks')).then(function(posts) {
        //     var titleElement = posts[1].element(by.css(".week-report"));
        //     expect(titleElement.getText()).toEqual('28 Aug - 3 Sep\nHHS: 0.00%\nTotal planed: 00:00:00 (N/A)\nTotal completed: 00:00:00 (N/A)');
        // });

        // //nacin da se proveri tekst za WEEK
        // element.all(by.repeater('d in vm.week.days')).then(function(posts) {
        //     var titleElement = posts[9].element(by.css(".content1"));
        //     expect(titleElement.getText()).toEqual('leted: 00:00:00 (N/A)');
        // });



        //nacin da misem ode do plavog krstica za evente
        element.all(by.repeater('d in vm.week.days')).then(function(posts) {
            var titleElement = posts[9].element(by.css("[ng-click='vm.open_modal_add_event(vm.day)']"));
            // element(by.css(".header-day-add")).click();
            browser.actions().mouseMove(titleElement).perform();
            // browser.sleep(500);
        });

        //nacin da se klikne na plavi krstic
        element.all(by.repeater('d in vm.week.days')).then(function(posts1) {
            var titleElement = posts1[9].element(by.css(".header-day-add"));
            // element(by.css(".header-day-add")).click();
            titleElement.click();
        });

        browser.sleep(500);

        //upis u search polje kada se klikne na plavi krstic
        element(by.css("[ng-model='vm.search_argument']")).sendKeys('jogging');
        //klilk na event koji smo trazili u search-u prvi po redu
        element(by.css("[ng-click='vm.go_add(e)']")).click();

        //nacin da se klikne na neku grupu evenata (Activity, Goal...)
        // element.all(by.repeater('e in vm.menuItems')).get(2).click();
        // browser.sleep(500);

        //nacin da se upise vreme u polje duration
        element(by.css("[ng-value='vm.utils.time_from_sec(vm.event.data.duration)']")).click();


        //nacin da se obrisu polja kada se klikne na duration
        element(by.css("[ng-model='vm.hrs']")).clear();
        element(by.css("[ng-model='vm.mins']")).clear();
        element(by.css("[ng-model='vm.secs']")).clear();

        //nacin da se upise vreme u duration
        element(by.css("[ng-model='vm.hrs']")).sendKeys('15');
        element(by.css("[ng-model='vm.mins']")).sendKeys('23');
        element(by.css("[ng-model='vm.secs']")).sendKeys('45');

        //klik na Set dugme u duration
        element(by.css("[ng-click='vm.set_date()']")).click();


        //promena datuma
        element(by.css("[ng-model='vm.date']")).sendKeys('09152017');

        browser.sleep(500);

        //klik na ADD button
        element(by.css("[ng-click='vm.add_event()']")).click();

        browser.sleep(1000);

        expect(element(by.css('[ng-if="::!dialog.mdHtmlContent"]')).getText()).toBe("The event cannot be assigned to the user whose payments are due");

        browser.sleep(500);

        element(by.css("[ng-click='dialog.hide()']")).click();


        // TODO kada se napravi event u nekom odredjenom danu da ga izvucemo preko id pa ng repeat-a, proveriti kako
        // browser.actions().click(element.all(by.repeater("e in vm.eventS.events[vm.day]| orderBy: 'plan_head'")), protractor.Button.RIGHT).perform();

        // //nacin da se klikne na plavi krstic
        // element.all(by.repeater('d in vm.week.days')).then(function(posts1) {
        //     var titleElement = posts1[9].element(by.css(".header-day-add"));
        //     // element(by.css(".header-day-add")).click();
        //     titleElement.click();
        // });


        // browser.sleep(3000);












        // //klik na side bar na adminu
        // browser.actions().mouseMove(element(by.id('logo')), {x: -100, y: 35}).click().perform();
        // browser.wait(EC.elementToBeClickable(element(by.css("[ng-click='vm.set_left_sidebar()']"))), 10000);
        // element(by.css("[ng-click='vm.set_left_sidebar()']")).click();
        //
        // browser.sleep(1000);
        //
        // //klik na clubs
        // element(by.css("[ng-model='vm.dcm.left_sidebar_club_id']")).click();
        // browser.sleep(300);
        //
        // //klik na development
        // element(by.id("select_option_12")).click();
        //
        // browser.wait(EC.elementToBeClickable(element(by.css("[ng-model='vm.filter_search']"))), 10000);
        // // upis u search polje levi side menu
        // element(by.css("[ng-model='vm.filter_search']")).sendKeys('aaaaaa');
        //
        // browser.sleep(300);
        // // element(by.css(".flex-100")).click();
        // // element(by.id("sb-u00000zEi5")).click();
        // element(by.css("[ng-click='vm.click_on_node(node,$index)']")).click();
        //
        // browser.sleep(8000);
        //

        // //klik na profilnu sliku trenera i logout
        // element(by.css('.parent-tooltip-header')).click();
        // browser.sleep(400);
        // element(by.css("[ng-click='vm.logged_user.logout();ACT=false']")).click();

        // browser.sleep(1000);
    });

});
