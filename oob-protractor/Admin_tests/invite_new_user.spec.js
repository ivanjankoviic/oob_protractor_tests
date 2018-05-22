
var Config = require ('../Config/config.js');
var LoginAdmin = require ('../Page_Objects_Admin/LoginAdmin.js');
var UserSingUp = require ('../Page_Objects/UserSignup.js');
var UserSingUpTwo = require ('../Page_Objects/UserSignupTwo.js');
var UserSingUpThree = require ('../Page_Objects/UserSignupThree.js');
var Login = require ('../Page_Objects/Login.js');
var Questionnaire = require ('../Page_Objects/Questionnaire.js');
var QuestionnaireCyclist = require ('../Page_Objects/QuestionnaireCyclist.js');
var Introduction = require ('../Page_Objects/Introduction.js');
var Calendar = require('../Page_Objects/Calendar.js');
var CreateEvent = require('../Page_Objects/CreateEvent.js');
var Account = require('../Page_Objects/Account.js');

describe('User login successful', function () {

    var config = new Config();
    var loginAdmin = new LoginAdmin();
    var EC = protractor.ExpectedConditions;
    var userSignup = new UserSingUp();
    var userSignupTwo = new UserSingUpTwo();
    var userSignupThree = new UserSingUpThree();
    var dialog;
    var questionnaire = new Questionnaire();
    var introduction = new Introduction();
    var calendar = new Calendar();
    var account = new Account();
    var login = new Login();

    it ('dodavanje novog usera na Admin-u', function () {
        console.log("dodavanje novog usera na Admin-u");

        //poziva se odredjena adresa
        browser.get(config.admin_test1);

        //provera titla
        expect(browser.getTitle()).toBe('OOB ADMIN');
        browser.wait(EC.presenceOf(loginAdmin.emailInput), 10000);

        //upis username-a i sifre
        loginAdmin.emailInput.sendKeys('coach@avalonactive.com');
        loginAdmin.passwordInput.sendKeys('123');
        loginAdmin.buttonLogin.click();

        //kllik na Users
        element(by.css('[md-nav-sref="app.home.users"]')).click();

        //klik na fub dugme za add new user
        element(by.css('.md-fab.md-warn.oob-button-new.md-button.md-ink-ripple')).click();

        //klik na user invitacion
        element(by.css('[ng-click="vm.create_users_invitation()"]')).click();

        //upis u email polje
        element(by.css('[ng-model="user.email"]')).sendKeys('ivanjankovic546@yahoo.com');

        //upis u userName polje i provera teksta
        element(by.css('[ng-model="user.name"]')).sendKeys('11111 _INVITE_TEST');

        // //klik na padajuci meni TYPE
        element(by.css('[ng-model="user.type"]')).click();
        browser.sleep(300);
        element.all(by.repeater('t in vm.types')).get(1).click();
        browser.sleep(100);

        //klik na padajuci meni CLUB i provera teksta
        element(by.css('[ng-model="user.club"]')).click();
        browser.sleep(300);
        element.all(by.repeater('c in vm.clubs')).get(1).click();
        browser.sleep(100);

        // //klik na padajuci meni COACH i provera teksta
        element(by.css('[ng-model="user.coach"]')).click();
        browser.sleep(300);
        element.all(by.repeater('c in user._coaches')).get(1).click();
        browser.sleep(100);
        expect(element(by.css('[ng-model="user.coach"]')).getText()).toEqual('Coach Test');
        // browser.sleep(200);

        //klik na send invitacion
        element(by.css('[ng-click="vm.send_invitation()"]')).click();

        //kllik na Users
        element(by.css('[md-nav-sref="app.home.users"]')).click();

        browser.sleep(1500);

        //klik na side bar na adminu
        browser.actions().mouseMove(element(by.id('logo')), {x: -100, y: 35}).click().perform();
        browser.wait(EC.elementToBeClickable(element(by.css("[ng-click='vm.set_left_sidebar()']"))), 10000);
        element(by.css("[ng-click='vm.set_left_sidebar()']")).click();
        // browser.sleep(1000);

        //klik na CLUBS na side meniu
        browser.wait(EC.presenceOf(element(by.css('[ng-model="vm.dcm.left_sidebar_club_id"]'))), 5000);
        element(by.css('[ng-model="vm.dcm.left_sidebar_club_id"]')).click();

        //kllik na DEVELOPMENT
        browser.wait(EC.presenceOf(element(by.id('select_option_6'))), 5000);
        element(by.id('select_option_6')).click();

        browser.sleep(400);

        // //nacin da se klikne na PRVOG user-a
        element.all(by.repeater("node in vm.theData|filter:vm.filter_search")).then(function(posts1) {
            var titleElement = posts1[0].element(by.css("[ng-click='vm.click_on_node(node,$index)']"));
            titleElement.click()
        });
        browser.sleep(400);

        //klik na INFO u side meniu
        element(by.css('[ng-click="vm.change_user_view(\'profile\')"]')).click();

        browser.sleep(1000);

        //klik na INVITE
        browser.wait(EC.presenceOf(element(by.css("[ng-click='vm.showConfirmInvite()']"))), 5000);
        element(by.css("[ng-click='vm.showConfirmInvite()']")).click();

        //klik na yes
        element(by.css("[ng-click='dialog.hide()']")).click();
        browser.sleep(8000);

        //----------------------------------------------------------------------------
        // otvoriti novi TAB
        browser.executeScript('window.open()').then(function () {
            browser.getAllWindowHandles().then(function (handles) {
                var secondWindow = handles[1];
                browser.switchTo().window(secondWindow).then(function () {
                    return browser.driver.get('https://mail.yahoo.com/');
                });
            });
        });

        browser.sleep(1000);

        browser.driver.findElement(by.id('login-username')).sendKeys('ivanjankovic546');

        browser.driver.findElement(by.id('login-signin')).click();
        browser.sleep(1000);

        browser.driver.findElement(by.id('login-passwd')).sendKeys('pfcpfcpfc');

        browser.driver.findElement(by.id('login-signin')).click();

        browser.sleep(2000);

        // nacin da se refreskuje YAHOO mail - saceka novi mail
        browser.driver.findElement(by.css('#mail-app-component > div.W_6D6F.D_F > div > div.D_F.H_6D6F.ab_FT.em_N.M_0.p_R > div > div.W_6D6F.H_6D6F > div > div.p_R.Z_0.iy_h.iz_A.H_6D6F.W_6D6F.X_6Fd5.N_6Fd5.k_w > div.hd_n.P_0.M_0.p_R > ul:nth-child(1) > li:nth-child(3)')).click();
        browser.sleep(4000);

        //klik na link koji vodi na signup
        browser.driver.findElement(by.css('a[href*="https://u"]')).click();

        browser.sleep(2000);


        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[2]).then(function(){
                browser.driver.findElement(by.css('[ng-model="vm.dcm.signup.password"]')).sendKeys('123');
                browser.driver.findElement(by.css('[ng-model="vm.dcm.signup.password_repeat"]')).sendKeys('123')
            });
        });

        userSignup.buttonNext.click();
        browser.sleep(500);

        //klik next na drugoj stranici signup-a
        browser.wait(EC.presenceOf(userSignupTwo.buttonNext2), 5000);
        userSignupTwo.buttonNext2.click();

        browser.sleep(500);
        //treca strana
        browser.wait(EC.presenceOf(userSignupThree.buttonRegister), 5000);
        userSignupThree.buttonRegister.click();
        browser.sleep(500);
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        expect(element(by.css('.popup-body span')).getText()).toEqual('You are successfully registered');
        dialog.click();
        browser.sleep(500);

        questionnaire.athleteCyclist.click();
        browser.sleep(300);
        element(by.css('[ng-click="vm.go_to()"]')).click();
        browser.sleep(500);

        questionnaire.updateProfile.click();
        browser.driver.sleep(500);
        expect(questionnaire.messages.getText()).toEqual('Profile updated');
        dialog = element(by.buttonText('OK'));
        browser.wait(EC.presenceOf(dialog), 5000);
        dialog.click();
        browser.sleep(500);

        //klik na X da se zatvori introduction
        introduction.X_close_introduction.click();

        browser.wait(EC.elementToBeClickable(calendar.buttonAddEvent), 15000);
        browser.driver.sleep(1000);

        // klik na show Menu Button
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 5000);
        calendar.showMenuButtonCalendar.click();

        //klik na account dugme
        browser.wait(EC.presenceOf(calendar.accountButton), 5000);
        calendar.accountButton.click();
        browser.sleep(1000);

        element(by.css('[on-tap="vm.logged_user.subscribe()"]')).click();

        browser.sleep(1000);

        //klik na pay NOW dugme
        browser.wait(EC.presenceOf(account.payment), 10000);
        element(by.css('.pay-button')).click();

        browser.sleep(500);

        element(by.css('[ng-model="vm.logged_user.billing_info.address"]')).sendKeys('1');
        element(by.css('[ng-model="vm.logged_user.billing_info.zip "]')).sendKeys('2');
        element(by.css('[ng-model="vm.logged_user.billing_info.city "]')).sendKeys('3');
        element(by.css('[ng-model="vm.logged_user.billing_info.country "]')).sendKeys('4');

        //klik na proceed to payment
        browser.wait(EC.presenceOf( element(by.css('.billing-button'))), 10000);
        element(by.css('.billing-button')).click();
        browser.sleep(3000);

        //upis u polje Expiration date
        browser.driver.findElement(by.id('expiration-month')).sendKeys('11');
        browser.sleep(200);

        browser.driver.findElement(by.id('expiration-year')).sendKeys('12');

        browser.sleep(200);
        browser.driver.findElement(by.id('cvd')).sendKeys('123');
        browser.sleep(300);

        //upis broja kreditne kartice u polje
        browser.driver.findElement(by.id('cardnumber')).sendKeys('1000 0000 0000 000');
        browser.driver.findElement(by.id('cardnumber')).sendKeys(protractor.Key.END);
        browser.driver.findElement(by.id('cardnumber')).sendKeys('8');
        browser.sleep(200);

        //klik na dugme za placanje
        browser.driver.findElement(by.css('.btn')).click();

        browser.sleep(3000);
        expect(element(by.css('.invoice-desc')).getText()).toBe("Your invoice has been payed.");

        //prebacuje testove na prvi prozori nastavlja
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[0]).then(function(){
                //kllik na Users
                element(by.css('[md-nav-sref="app.home.users"]')).click();
            });
        });
        // browser.sleep(3000);

        // //kllik na Users
        browser.wait(EC.presenceOf(element(by.css('[md-nav-sref="app.home.users"]'))), 5000);
        element(by.css('[md-nav-sref="app.home.users"]')).click();

        // browser.sleep(3000);
        browser.wait(EC.presenceOf(element(by.css('[title="ivanjankovic546@yahoo.com"]'))), 5000);
        //provera da li je to user kojeg trebamo da obrisemo
        element.all(by.repeater("u in vm.users_from_club| orderBy:['paid_status','display_name']|filter:vm.filter_search")).then(function(posts1) {
            var titleElement2 = posts1[2].element(by.css('[title="ivanjankovic546@yahoo.com"]'));
            expect(titleElement2.getText()).toEqual('ivanjankovic546@yahoo.com');

        });

        // nacin da se klikne na side menu u tabeli users
        element.all(by.repeater("u in vm.users_from_club| orderBy:['paid_status','display_name']|filter:vm.filter_search")).then(function(posts1) {
            var titleElement = posts1[2].element(by.css('[ng-click="$mdOpenMenu()"]'));
            titleElement.click()
        });

        // browser.sleep(2000);



        //TODO: sa locala prebaciti data-dc na prod
        //klik na delete na padajucem meniu
        // element(by.css('[data-dc-automation="delete-user-2"]')).click();
        //



        // //nacin da se zatvori odredjeni tab u ovom slucaju rugi i treci
        // browser.getAllWindowHandles().then(function (handles) {
        //     browser.driver.switchTo().window(handles[1]);
        //     browser.driver.close();
        //     browser.driver.switchTo().window(handles[2]);
        //     browser.driver.close();
        //
        //
        // });
        //
        // browser.sleep(1000);
        //
        // //klik na INFO u side meniu
        // element(by.css('[ng-click="vm.change_user_view(\'profile\')"]')).click();
        //
        //
        // browser.sleep(4000);

    });

});
