/**
 * Created by ivan on 11.9.17..
 */

//TODO:napraviti test za adminov login
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects_Admin/LoginAdmin.js');

describe('User login successful', function () {

    var config = new Config();
    var login = new Login();
    var EC = protractor.ExpectedConditions;

    it ('bla bla', function () {
        console.log("bla bla");

        browser.get(config.admin_test);

        expect(browser.getTitle()).toBe('OOB ADMIN');

        browser.wait(EC.presenceOf(login.emailInput), 10000);
        expect(login.emailInputPlaceholder.getText()).toEqual('Username');
        expect(login.passwordInputPlaceholder.getText()).toEqual('Password');

        login.emailInput.sendKeys('munira@digi41talcube.rs');

        login.passwordInput.sendKeys('123');
        login.forgotPasswordButton.click();
        // login.buttonLogin.click();

        browser.sleep(400);
        login.emailInput.sendKeys('munira@digi41talcube.rs');
        login.buttonLogin.click();


        //TODO: kada se popravi bug odkomentarisati, ako se ukuca pogresan mail ne izbacuje alert
        // expect(login.errorMessages.getText()).toEqual('Wrong username/password');




        browser.sleep(3000);
    });

});
