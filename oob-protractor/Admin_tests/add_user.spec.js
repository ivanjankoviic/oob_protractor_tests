/**
 * Created by ivan on 4.10.17..
 */
/**
 * Created by ivan on 26.9.17..
 */


var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects_Admin/LoginAdmin.js');

describe('User login successful', function () {

    var config = new Config();
    var login = new Login();
    var EC = protractor.ExpectedConditions;

    it ('dodavanje novog usera na Admin-u', function () {
        console.log("dodavanje novog usera na Admin-u");


        //poziva se odredjena adresa
        browser.get(config.admin_test1);
        //provera titla
        expect(browser.getTitle()).toBe('OOB ADMIN');
        browser.wait(EC.presenceOf(login.emailInput), 10000);

        //upis username-a i sifre
        login.emailInput.sendKeys('coach@avalonactive.com');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();


        //kllik na Users
        element(by.css('[md-nav-sref="app.home.users"]')).click();

        //klik na fub dugme za add new user
        element(by.css('.md-fab.md-warn.oob-button-new.md-button.md-ink-ripple')).click();

        //klik na user invitacion
        element(by.css('[ng-click="vm.create_users_invitation()"]')).click();

        //provera teksta
        expect(element(by.css(".head-color")).getText()).toEqual('EMAIL FIRST AND LAST NAME PACKET TYPE LANGUAGE CLUB COACH');
        //
        //upis u email polje i provera teksta
        element(by.css('[ng-model="user.email"]')).sendKeys('gihsbpmg1@gmail.com');
        expect(element(by.css('[ng-model="user.email"]')).getAttribute('value')).toBe("gihsbpmg1@gmail.com");
        //
        //upis u userName polje i provera teksta
        element(by.css('[ng-model="user.name"]')).sendKeys('BLA bla 123 *&^');
        expect(element(by.css('[ng-model="user.name"]')).getAttribute('value')).toBe("BLA bla 123 *&^");
        //
        //
        // // //klik na padajuci meni PACKET i provera teksta
        element(by.css('[ng-model="user.packages"]')).click();
        browser.sleep(500);






        //VEZBA: MOYE DA SE IZBRISE
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(0).getText()).toBe("Blue Line Running");
        // expect(element.all(by.css('[data-md-container-class="selectdemoSelectHeader"]')).get(0).getText()).toBe("Blue Line Running1");

        // expect(element.all(by.css('.md-text')).get(0).getText()).toBe("Blue Line Running");
        // expect(element(by.id('select_option_281')).getText()).toBe("Blue Line Running");
        // expect(element(by.repeater("t in vm.packages |\nfilter:vm.searchTerm| orderBy:'-name':true")).isPresent()).toBeTruthy();
        //
        // element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).count().then(function(count) {
        //     console.log(count);
        // });
        //
        // element.all(by.id("select_option_281")).count().then(function(count) {
        //     console.log(count);
        // });










        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(0).getText()).toBe("Blue Line Running");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(1).getText()).toBe("Blue Line Running Challenge");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(2).getText()).toBe("Blue Line Running Premium");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(3).getText()).toBe("Blue line Running premium 5 aug to 24 sep");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(4).getText()).toBe("Blue Line Running Premium EUR");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(5).getText()).toBe("Blue Line Running Spain");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(6).getText()).toBe("BLUE LINE RUNNING – EXECUTIVE RUNNER");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(7).getText()).toBe("Free Cycling");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(8).getText()).toBe("Free Running");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(9).getText()).toBe("Free Swimming");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(10).getText()).toBe("Free Triathlon");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(11).getText()).toBe("Front of pack DK");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(12).getText()).toBe("OOB Cycling Premium DKK");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(13).getText()).toBe("OOB Cycling PSC 1");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(14).getText()).toBe("OOB Guidance Cycling");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(15).getText()).toBe("OOB Guidance Cycling - 280dkk");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(16).getText()).toBe("OOB Guidance Running");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(17).getText()).toBe("OOB Guidance Triathlon");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(18).getText()).toBe("OOB Guidance Triathlon - 10 %");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(19).getText()).toBe("OOB Guidance Triathlon - 15%");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(20).getText()).toBe("OOB Guidance Triathlon - special 100dkk");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(21).getText()).toBe("OOB life support");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(22).getText()).toBe("OOB triathlon basic");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(23).getText()).toBe("OOB Triathlon basic - 15%");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(24).getText()).toBe("OOB triathlon Family first");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(25).getText()).toBe("OOB triathlon training");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(26).getText()).toBe("Performance coaching");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(27).getText()).toBe("PSC 1 Cycling");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(28).getText()).toBe("PSC 1 Cycling - 650");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(29).getText()).toBe("PSC 1 Cycling - 750");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(30).getText()).toBe("PSC 1 Running");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(31).getText()).toBe("PSC 1 Running - 750");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(32).getText()).toBe("PSC 1 Running 520 dkk");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(33).getText()).toBe("PSC 1 Triathlon");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(34).getText()).toBe("PSC 1 Triathlon - 10 % (675dkk)");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(35).getText()).toBe("PSC 1 Triathlon - 400 DKK");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(36).getText()).toBe("PSC 1 Triathlon -20%");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(37).getText()).toBe("PSC 2 Cycling");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(38).getText()).toBe("PSC 2 Cycling discount - 649 DKK");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(39).getText()).toBe("PSC 2 Running");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(40).getText()).toBe("PSC 2 Triathlon");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(41).getText()).toBe("PSC 2 Triathlon NO VAT 876 dkk");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(42).getText()).toBe("PSC 3 Running");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(43).getText()).toBe("PSC 3 Triathlon");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(44).getText()).toBe("PSC Level 1 Triathlon - 15% off 637.5 dkk");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(45).getText()).toBe("PSC1 Triathlon - Spain");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(46).getText()).toBe("Running 99 DKK");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(47).getText()).toBe("Triathlon (25% discount)");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(48).getText()).toBe("Triathlon 450 DKK (25% discount)");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(49).getText()).toBe("Triatlon Basic DKK");
        //


        element(by.css('[ng-model="vm.searchTerm"]')).sendKeys('premium');

        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(0).getText()).toBe("Blue Line Running Premium");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(1).getText()).toBe("Blue line Running premium 5 aug to 24 sep");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(2).getText()).toBe("Blue Line Running Premium EUR");
        // expect(element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(3).getText()).toBe("OOB Cycling Premium DKK");

        element(by.css('[ng-model="vm.searchTerm"]')).clear();

        // element.all(by.repeater("t in vm.packages | filter:vm.searchTerm | orderBy:'-name':true")).get(48).click();
        // browser.sleep(100);
        expect(element(by.css('[ng-model="user.packages"]')).getText()).toEqual('OOB life support');

        //klik na pozadinu da se zatrvori padajuci menu
        browser.sleep(300);
        element(by.id('mainCont')).click();
        browser.sleep(300);

        // //klik na padajuci meni TYPE i provera teksta
        element(by.css('[ng-model="user.type"]')).click();
        browser.sleep(300);
        expect(element.all(by.repeater('t in vm.types')).get(0).getText()).toBe("Free");
        expect(element.all(by.repeater('t in vm.types')).get(1).getText()).toBe("Credit Card");
        expect(element.all(by.repeater('t in vm.types')).get(2).getText()).toBe("Bank");
        element.all(by.repeater('t in vm.types')).get(2).click();
        browser.sleep(100);
        expect(element(by.css('[ng-model="user.type"]')).getText()).toEqual('Bank');

        //klik na padajuci meni LANGUAGE i provera teksta
        element(by.css('[ng-model="user.language"]')).click();
        browser.sleep(300);
        expect(element.all(by.repeater('l in vm.languages')).get(0).getText()).toBe("English");
        expect(element.all(by.repeater('l in vm.languages')).get(1).getText()).toBe("Danish");
        expect(element.all(by.repeater('l in vm.languages')).get(2).getText()).toBe("Spanish");
        element.all(by.repeater('l in vm.languages')).get(2).click();
        browser.sleep(100);
        expect(element(by.css('[ng-model="user.language"]')).getText()).toEqual('Spanish');

        //
        //klik na padajuci meni CLUB i provera teksta
        element(by.css('[ng-model="user.club"]')).click();
        browser.sleep(300);
        expect(element.all(by.repeater('c in vm.clubs')).get(0).getText()).toBe("Blue Arrow 2018");
        expect(element.all(by.repeater('c in vm.clubs')).get(1).getText()).toBe("Development");
        expect(element.all(by.repeater('c in vm.clubs')).get(2).getText()).toBe("Fitness dk BIKE 17 -18");
        expect(element.all(by.repeater('c in vm.clubs')).get(3).getText()).toBe("Fitness dk TRI 2017 - 18");
        expect(element.all(by.repeater('c in vm.clubs')).get(4).getText()).toBe("OOB Coaching");
        expect(element.all(by.repeater('c in vm.clubs')).get(5).getText()).toBe("OOB Guidance");
        element.all(by.repeater('c in vm.clubs')).get(5).click();
        browser.sleep(100);
        expect(element(by.css('[ng-model="user.club"]')).getText()).toEqual('OOB Guidance');


        //klik na padajuci meni COACH i provera teksta
        element(by.css('[ng-model="user.coach"]')).click();
        browser.sleep(300);
        expect(element.all(by.repeater('c in user._coaches')).get(0).getText()).toBe("Nikolaj Astrup");
        expect(element.all(by.repeater('c in user._coaches')).get(1).getText()).toBe("Vicenç Castellà");
        expect(element.all(by.repeater('c in user._coaches')).get(2).getText()).toBe("Milos Salaski");
        expect(element.all(by.repeater('c in user._coaches')).get(3).getText()).toBe("Aleksandar Sørensen-Markovic");


        element.all(by.repeater('c in user._coaches')).get(2).click();
        browser.sleep(100);
        expect(element(by.css('[ng-model="user.coach"]')).getText()).toEqual('Milos Salaski');
        browser.sleep(200);

        // klik na zeleni FUB button
        element(by.css('[ng-click="vm.add_user()"]')).click();


        // upis teksta u email 2 input polje i provera teksta
        element.all(by.repeater('user in vm.users')).then(function(posts) {
            var titleElement = posts[1].element(by.css('[ng-model="user.email"]'));
            titleElement.sendKeys('pera@PERIC.peki');
        });
        element.all(by.repeater('user in vm.users')).then(function(posts) {
            var titleElement = posts[1].element(by.css('[ng-model="user.email"]'));
            expect( titleElement.getAttribute('value')).toBe("pera@PERIC.peki");
        });

        //upis teksta u email 2 input polje i provera teksta
        element.all(by.repeater('user in vm.users')).then(function(posts) {
            var titleElement = posts[1].element(by.css('[ng-model="user.name"]'));
            titleElement.sendKeys('PEKIcar!@#654');
        });
        element.all(by.repeater('user in vm.users')).then(function(posts) {
            var titleElement = posts[1].element(by.css('[ng-model="user.name"]'));
            expect(titleElement.getAttribute('value')).toBe("PEKIcar!@#654");
        });

        element(by.repeater('user in vm.users').row(1)).element(by.css('[ng-model="user.type"]')).click();

        // browser.sleep(1000);

        //klik na pozadinu da se zatrvori padajuci menu
        browser.sleep(300);
        element(by.id('mainCont')).click();
        browser.sleep(300);

        //klik na delete drugog reda
        element.all(by.repeater('user in vm.users')).then(function(posts) {
            var deleteRow = posts[1].element(by.css('[ng-click="vm.delete_user_inivation($index)"]'));
            deleteRow.click();
        });




        // var _rw =element(by.repeater('user in vm.users').row(1));
        // element(by.css('md-option[value*="free"]')).click();
        // _rw.element(by.css('.selected md-option[value="card"]')).click();


        // // klik na padajuci meni TYPE 2 i provera teksta
        // element.all(by.repeater('user in vm.users')).then(function(posts) {
        //     posts[1].element(by.css('[ng-model="user.type"]')).click();
        //     // expect(posts[1](element.all(by.repeater('t in vm.types')).get(0).getText()).toBe("Fr123ee");
        //     // expect(posts[1].element.all(by.repeater('t in vm.types')).getText()).toBe("Ba1nk");
        // });
        // element(by.repeater('user in vm.users').row(1)).all(by.repeater('t in vm.types')).get(0).click();

        // browser.sleep(3000);
        //
        // element.all(by.repeater('user in vm.users')).then(function(posts) {
        //     // var titleElement1 = posts[1].element.all(by.repeater('t in vm.types'));
        //     expect(posts[1].(element.all(by.repeater('t in vm.types')).get(0).getText()).toBe("Fr123ee");
        //     // posts[1].element.all(by.repeater('t in vm.types'));
        //     // expect(titleElement1.getText()).toEqual('Upcoming goal: 26. Nov 2018.');
        //     posts[2].element(by.css('[ng-model="user.type"]')).click();
        //
        // });

        //
        // element.all(by.repeater('user in vm.users')).then(function(rows) {
        //     for(var i=0;i<rows.length;i++){
        //         rows[i].all(by.repeater('t in vm.types')).then(function(rows_2) {
        //             console.log(rows_2);
        //             for(var j=0;j<rows_2.length;j++){
        //                 rows_2.getText().then(function(text) {
        //                     console.log(text);
        //                 });
        //             }
        //         });
        //     }
        // });




        // browser.sleep(2000);
    });

});
