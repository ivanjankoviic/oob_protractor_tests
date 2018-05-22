//
// /**
//  * Created by ivan on 26.9.17..
//  */
//
//
// var Config = require ('../Config/config.js');
// var LoginAdmin = require ('../Page_Objects_Admin/LoginAdmin.js');
// var UserSingUp = require ('../Page_Objects/UserSignup.js');
// var UserSingUpTwo = require ('../Page_Objects/UserSignupTwo.js');
// var UserSingUpThree = require ('../Page_Objects/UserSignupThree.js');
// var Login = require ('../Page_Objects/Login.js');
// var Questionnaire = require ('../Page_Objects/Questionnaire.js');
// var QuestionnaireCyclist = require ('../Page_Objects/QuestionnaireCyclist.js');
// var Introduction = require ('../Page_Objects/Introduction.js');
// var Calendar = require('../Page_Objects/Calendar.js');
// var CreateEvent = require('../Page_Objects/CreateEvent.js');
// var Account = require('../Page_Objects/Account.js');
// var Login = require ('../Page_Objects/Login.js');
//
// describe('User login successful', function () {
//
//     var config = new Config();
//     var loginAdmin = new LoginAdmin();
//     var EC = protractor.ExpectedConditions;
//     var userSignup = new UserSingUp();
//     var userSignupTwo = new UserSingUpTwo();
//     var userSignupThree = new UserSingUpThree();
//     var dialog;
//     var questionnaire = new Questionnaire();
//     var introduction = new Introduction();
//     var calendar = new Calendar();
//     var account = new Account();
//     var login = new Login();
//
//     it ('dodavanje novog usera na Admin-u', function () {
//         console.log("dodavanje novog usera na Admin-u");
//
//
//         //poziva se odredjena adresa
//         browser.get('http://localhost:9921');
//         // browser.get('http://admin.ooblife.com/login/?throwFailures=true');
//
//         //provera titla
//         expect(browser.getTitle()).toBe('OOB ADMIN');
//         browser.wait(EC.presenceOf(loginAdmin.emailInput), 10000);
//
//         //upis username-a i sifre
//         loginAdmin.emailInput.sendKeys('coach@avalonactive.com');
//         loginAdmin.passwordInput.sendKeys('123');
//         loginAdmin.buttonLogin.click();
//
//         //kllik na Users
//         element(by.css('[md-nav-sref="app.home.users"]')).click();
//
//         browser.sleep(2000);
//
//
//         // // nacin da se klikne na side menu u tabeli users
//         // element.all(by.repeater("u in vm.users_from_club| orderBy:['paid_status','display_name']|filter:vm.filter_search")).then(function(posts1) {
//         //     var titleElement = posts1[2].element(by.css('[ng-click="$mdOpenMenu()"]'));
//         //     titleElement.click();
//         // });
//         // browser.waitForAngular();
//         // browser.sleep(2000);
//         // element.all(by.repeater("u in vm.users_from_club| orderBy:['paid_status','display_name']|filter:vm.filter_search")).then(function(posts1) {
//         //     var titleElement2 = posts1[2].element(by.css('[ng-click="vm.showConfirmDelete($event,u.id,$index)"]'));
//         //         titleElement2.click();
//         //     // element(by.css('[ng-click="vm.showConfirmDelete($event,u.id,$index)"]')).click();
//         //
//         // });
//         // element.all(element(by.css('[ng-click="vm.showConfirmDelete($event,u.id,$index)"]'))).then(function(posts1) {
//         //    posts1[2].click();
//         // });
//         // browser.sleep(2000);
//         // browser.waitForAngular();
//
//         //klik na delete na padajucem meniu
//         // element(by.cssContainingText('.ng-scope', 'Delete')).click()
//         // element(by.css('[data-dc-automation="delete-user-2"]')).click();
//         // element(by.xpath('//*[@id="menu_container_105"]/md-menu-content/md-menu-item[5]/button/span')).click();
//         // element(by.css('[ng-click="vm.showConfirmDelete($event,u.id,$index)"]')).click();
//         // element(by.css('[ng-click="vm.showConfirmDelete($event,u.id,$index)"]')).click();
//         // element(by.css('md-menu-item:nth-child(5)')).click();
//         // browser.waitForAngular();
//
//
//
//
//
//         //
//         // element.all(by.repeater("u in vm.users_from_club| orderBy:['paid_status','display_name']|filter:vm.filter_search")).then(function(posts1) {
//         //         var titleElement2 = posts1[2].element(by.css('[title="ivanjankovic546@yahoo.com"]'));
//         //     expect(titleElement2.getText()).toEqual('ivanjankovic546@yahoo.com');
//         //
//         //     });
//
//
//         browser.sleep(2000);
//         // // nacin da se klikne na side menu u tabeli users
//         element.all(by.repeater("u in vm.users_from_club| orderBy:['paid_status','display_name']|filter:vm.filter_search")).then(function(posts1) {
//             var titleElement = posts1[2].element(by.css('[ng-click="$mdOpenMenu()"]'));
//             titleElement.click();
//         });
//
//
//         if (jasmine.version) { //the case for version 2.0.0
//             console.log('jasmine-version1:' + jasmine.version);
//         }
//         else { //the case for version 1.3
//             console.log('jasmine-version:' + jasmine.getEnv().versionString());
//         }
//         element(by.css('[data-dc-automation="delete-user-2"]')).click();
//
//         browser.sleep(2000);
//
//     });
//
// });
