//
// /*
//  * Checking whether the elements are visible on the Login_page
//      * Checking all the elements on the Login_page
//
//  * User login successful
//      * The user has successfully logged
//      * The user has successfully logged using email with the first capital letter
//      * The user has successfully logged using email written in large letters
//      * The user has successfully logged using email written with speaces
//      * The user has successfully logged using email written with some large letters  4x
//
//  * User login failed
//      * The user attempted to login with email without the "@"
//      * The user attempted to login with an incorrect email
//      * The user attempted to login with an email that contains two characters "@"
//      * The user attempted to login with the wrong password
//      * The user attempted to login without a password
//      * The user attempted to login without a username
//      * The user attempted to login even if not registered
//
// */
//
// var Config = require ('../Config/config.js');
// var Login = require ('../Page_Objects/LoginAdmin.js');
// var Calendar = require('../Page_Objects/Calendar.js');
//
// // describe('Checking whether the elements are visible on the Login_page', function () {
// //
// //     var config = new Config();
// //     var login = new Login();
// //     var EC = protractor.ExpectedConditions;
// //
// //     beforeEach(function (){
// //         browser.sleep(500);
// //         browser.get(config.test_url);
// //    });
// //
// //    it ('Checking all the elements on the Login_page', function () {
// //        console.log("Checking all the elements on the Login_page");
// //
// //        browser.wait(EC.presenceOf(login.imageOOB), 5000);
// //        expect(login.imageOOB.isDisplayed()).toBeTruthy();
// //
// //        browser.wait(EC.presenceOf(login.emailInput), 5000);
// //        expect(login.emailInput.isDisplayed()).toBeTruthy();
// //
// //        browser.wait(EC.presenceOf(login.passwordInput), 5000);
// //        expect(login.passwordInput.isDisplayed()).toBeTruthy();
// //
// //        browser.wait(EC.presenceOf(login.showPasswordEye), 5000);
// //        expect(login.showPasswordEye.isDisplayed()).toBeTruthy();
// //
// //        browser.wait(EC.presenceOf(login.forgotPasswordButton), 5000);
// //        expect(login.forgotPasswordButton.isDisplayed()).toBeTruthy();
// //
// //        browser.wait(EC.presenceOf(login.buttonLogin), 5000);
// //        expect(login.buttonLogin.isDisplayed()).toBeTruthy();
// //    });
// // });
//
// describe('User login successful', function () {
//
//     var config = new Config();
//     var login = new Login();
//     var calendar = new Calendar();
//     var EC = protractor.ExpectedConditions;
//
//     beforeEach (function () {
//        browser.get(config.backend_uri);
//     });
//
//     afterEach(function (){
//         browser.sleep(500);
//         // showMenuButton must have SLEEP-a!!!
//         browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
//         calendar.showMenuButtonCalendar.click();
//         browser.wait(EC.presenceOf(calendar.showMenuLogoutButton), 5000);
//         calendar.showMenuLogoutButton.click();
//         browser.wait(EC.presenceOf(login.emailInput), 10000);
//         expect(browser.getCurrentUrl()).toContain(config.test_url);
//
//     });
//
//     it ('The user has successfully logged', function () {
//         console.log("The user has successfully logged");
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('munira@digitalcube.rs');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//
//     });
//
//     it ('The user has successfully logged using email with the first capital letter', function () {
//         console.log("The user has successfully logged using email with the first capital letter");
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('Munira@digitalcube.rs');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//
//     });
//
//     it ('The user has successfully logged using email written in large letters', function () {
//         console.log("The user has successfully logged using email written in large letters");
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('MUNIRA@DIGITALCUBE.RS');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//
//     });
//
//     it ('The user has successfully logged using email written with some large letters', function () {
//         console.log("The user has successfully logged using email written with some large letters");
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('muNiRa@digitalCUBE.rs');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//
//     });
//
//     it ('The user has successfully logged using email written with speaces', function () {
//         console.log("The user has successfully logged using email written with speaces");
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('    munira@digitalcube.rs      ');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//
//     });
//
//     it ('The user has successfully logged using email written with A large letters', function () {
//         console.log("The user has successfully logged using email written with A large letters");
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('MUNira@digitalcube.RS');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//
//     });
//
//     it ('The user has successfully logged using email written with B large letters', function () {
//         console.log("The user has successfully logged using email written with B large letters");
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('MUNira@DigitalCUBE.RS');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//
//     });
//
//     it ('The user has successfully logged using email written with C large letters', function () {
//         console.log("The user has successfully logged using email written with C large letters");
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('munira@DIGITALCUBE.RS');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//
//     });
//
// });
//
// describe('User login failed', function () {
//
//     var config = new Config();
//     var login = new Login();
//     var EC = protractor.ExpectedConditions;
//
//     beforeEach (function () {
//         browser.get(config.test_url);
//     });
//
//     it ('The user attempted to login with email without the "@" ', function () {
//         console.log('The user attempted to login with email without the "@"');
//
//         browser.wait(EC.presenceOf(login.emailInput), 10000);
//         login.emailInput.sendKeys('muniradigitalcube');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Username has to be e mail');
//
//     });
//
//     it ('The user attempted to login with an incorrect email', function () {
//         console.log('The user attempted to login with an incorrect email');
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('munira @ digitalcube.rs');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Username has to be e mail');
//
//     });
//
//     it ('The user attempted to login with an incorrect email', function () {
//         console.log('The user attempted to login with an incorrect email');
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('munira@ digitalcube.rs');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Username has to be e mail');
//
//     });
//
//     it ('The user attempted to login with an incorrect email', function () {
//         console.log('The user attempted to login with an incorrect email');
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('MUNIRA@DIGITALCUBE>RS');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Username has to be e mail');
//
//     });
//
//     it ('The user attempted to login with an incorrect email', function () {
//         console.log('The user attempted to login with an incorrect email');
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('munira@digitalcube');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Wrong Email or Password');
//
//     });
//
//     it ('The user attempted to login with an email that contains two characters "@" ', function () {
//         console.log("The user attempted to login with an email that contains two characters '@'");
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('munira@digital@cube.rs');
//         login.passwordInput.sendKeys('123');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Username has to be e mail');
//
//     });
//
//     it ('The user attempted to login with the wrong password', function () {
//         console.log('The user attempted to login with the wrong password');
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('munira@digitalcube.rs');
//         login.passwordInput.sendKeys('459');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Wrong Email or Password');
//
//     });
//
//     it ('The user attempted to login without a password', function () {
//         console.log('The user attempted to login without a password');
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('munira@digitalcube.rs');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Enter your password');
//
//     });
//
//     it ('The user attempted to login without a username', function () {
//         console.log('The user attempted to login without a username');
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.passwordInput.sendKeys('459');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Username has to be e mail');
//
//     });
//
//     it ('The user attempted to log in even if not registered', function () {
//         console.log('The user attempted to log in even if not registered');
//
//         browser.wait(EC.presenceOf(login.emailInput), 5000);
//         login.emailInput.sendKeys('useruser@digitalcube.rs');
//         login.passwordInput.sendKeys('4759');
//         login.buttonLogin.click();
//         // Nacin da se proveri tekst
//         browser.wait(EC.presenceOf(login.errorMessages), 5000);
//         expect(login.errorMessages.getText()).toEqual('Wrong Email or Password');
//
//     });
//
// });



/*
 * Checking whether the elements are visible on the Login_page
 * Checking all the elements on the Login_page

 * User login successful
 * The user has successfully logged
 * The user has successfully logged using email with the first capital letter
 * The user has successfully logged using email written in large letters
 * The user has successfully logged using email written with speaces
 * The user has successfully logged using email written with some large letters  4x

 * User login failed
 * The user attempted to login with email without the "@"
 * The user attempted to login with an incorrect email
 * The user attempted to login with an email that contains two characters "@"
 * The user attempted to login with the wrong password
 * The user attempted to login without a password
 * The user attempted to login without a username
 * The user attempted to login even if not registered

 */

var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var Calendar = require('../Page_Objects/Calendar.js');
var SetupService = require('../setup_service.js');


describe('User login successful', function () {

    var config = new Config();
    var login = new Login();
    var calendar = new Calendar();
    var EC = protractor.ExpectedConditions;
    var setup_service = new SetupService;

    // beforeEach (function () {
    //     browser.get(config.backend_uri);
    // });


    beforeAll(function (){
        // console.log('beforeAll');
        var uri = config.backend_uri +"/user/register?username="+config.username+"&password=123&data="+JSON.stringify(
                {
                    "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
                });
        setup_service.register_user(uri);
    });

    afterEach(function (){
        browser.sleep(500);
        // showMenuButton must have SLEEP-a!!!
        browser.wait(EC.presenceOf(calendar.showMenuButtonCalendar), 10000);
        calendar.showMenuButtonCalendar.click();
        browser.wait(EC.presenceOf(calendar.showMenuLogoutButton), 5000);
        calendar.showMenuLogoutButton.click();
        browser.wait(EC.presenceOf(login.emailInput), 10000);
        expect(browser.getCurrentUrl()).toContain(config.test_url);

    });

    it ('The user has successfully logged', function () {
        console.log("The user has successfully logged");
        browser.get(config.test_url);

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('munira@digitalcube.rs');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();

    });

    it ('The user has successfully logged using email with the first capital letter', function () {
        console.log("The user has successfully logged using email with the first capital letter");
        browser.get(config.test_url);

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('Munira@digitalcube.rs');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();

    });

    it ('The user has successfully logged using email written in large letters', function () {
        console.log("The user has successfully logged using email written in large letters");
        browser.get(config.test_url);

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('MUNIRA@DIGITALCUBE.RS');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();

    });

    it ('The user has successfully logged using email written with some large letters', function () {
        console.log("The user has successfully logged using email written with some large letters");
        browser.get(config.test_url);

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('muNiRa@digitalCUBE.rs');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();

    });

    it ('The user has successfully logged using email written with speaces', function () {
        console.log("The user has successfully logged using email written with speaces");
        browser.get(config.test_url);

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('    munira@digitalcube.rs      ');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();

    });

    it ('The user has successfully logged using email written with A large letters', function () {
        console.log("The user has successfully logged using email written with A large letters");
        browser.get(config.test_url);

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('MUNira@digitalcube.RS');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();

    });

    it ('The user has successfully logged using email written with B large letters', function () {
        console.log("The user has successfully logged using email written with B large letters");

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('MUNira@DigitalCUBE.RS');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();

    });

    it ('The user has successfully logged using email written with C large letters', function () {
        console.log("The user has successfully logged using email written with C large letters");
        browser.get(config.test_url);

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('munira@DIGITALCUBE.RS');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();

    });

});

describe('User login failed', function () {

    var config = new Config();
    var login = new Login();
    var EC = protractor.ExpectedConditions;

    beforeEach (function () {
        browser.get(config.test_url);
    });

    it ('The user attempted to login with email without the "@" ', function () {
        console.log('The user attempted to login with email without the "@"');

        browser.wait(EC.presenceOf(login.emailInput), 10000);
        login.emailInput.sendKeys('muniradigitalcube');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Username has to be e mail');

    });

    it ('The user attempted to login with an incorrect email', function () {
        console.log('The user attempted to login with an incorrect email');

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('munira @ digitalcube.rs');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Username has to be e mail');

    });

    it ('The user attempted to login with an incorrect email', function () {
        console.log('The user attempted to login with an incorrect email');

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('munira@ digitalcube.rs');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Username has to be e mail');

    });

    it ('The user attempted to login with an incorrect email', function () {
        console.log('The user attempted to login with an incorrect email');

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('MUNIRA@DIGITALCUBE>RS');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Username has to be e mail');

    });

    it ('The user attempted to login with an incorrect email', function () {
        console.log('The user attempted to login with an incorrect email');

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('munira@digitalcube');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Wrong Email or Password');

    });

    it ('The user attempted to login with an email that contains two characters "@" ', function () {
        console.log("The user attempted to login with an email that contains two characters '@'");

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('munira@digital@cube.rs');
        login.passwordInput.sendKeys('123');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Username has to be e mail');

    });

    it ('The user attempted to login with the wrong password', function () {
        console.log('The user attempted to login with the wrong password');

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('munira@digitalcube.rs');
        login.passwordInput.sendKeys('459');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Wrong Email or Password');

    });

    it ('The user attempted to login without a password', function () {
        console.log('The user attempted to login without a password');

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('munira@digitalcube.rs');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Enter your password');

    });

    it ('The user attempted to login without a username', function () {
        console.log('The user attempted to login without a username');

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.passwordInput.sendKeys('459');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Username has to be e mail');

    });

    it ('The user attempted to log in even if not registered', function () {
        console.log('The user attempted to log in even if not registered');

        browser.wait(EC.presenceOf(login.emailInput), 5000);
        login.emailInput.sendKeys('useruser@digitalcube.rs');
        login.passwordInput.sendKeys('4759');
        login.buttonLogin.click();
        // Nacin da se proveri tekst
        browser.wait(EC.presenceOf(login.errorMessages), 5000);
        expect(login.errorMessages.getText()).toEqual('Wrong Email or Password');

    });

});
