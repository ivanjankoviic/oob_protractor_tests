
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');
var ForgotPassword = require('../Page_Objects/ForgotPassword.js');

describe ("User forgot password - ", function(){
    console.log("User forgot password -  ");

    var config = new Config();
    var login = new Login();
    var forgotPassword = new ForgotPassword();
    var EC = protractor.ExpectedConditions;

    beforeEach(function (){
        browser.get(config.test_url);
    });

    it ("Forgot password check visibility and text of element Forgot Password?", function() {
        console.log("Forgot password check visibility and text of element Forgot Password?");

        browser.wait(EC.presenceOf(login.forgotPasswordButton), 5000);

        // Provera da li je element prisutan
        expect(login.forgotPasswordButton.isPresent()).toBeTruthy();
        // Nacin da se proveri tekst
        expect(login.forgotPasswordButton.getText()).toBe('Forgot Password?');
        // Klik na forgot password
        login.forgotPasswordButton.click();
    });

    it ("Forgot password check alerts when you click submit without text in e-mail field ", function() {
        console.log("Forgot password check alerts when you click submit without text in e-mail field ");

        browser.wait(EC.presenceOf(login.forgotPasswordButton), 5000);
        //Klik na forgot password
        login.forgotPasswordButton.click();
        //Nacin da se proveri tekst
        expect(forgotPassword.messagePlaceholder.getText()).toBe('Please enter email address registrated on your account.');
        //klik na Submit dugme
        forgotPassword.submitButton.click();
        //Nacin da se proveri tekst
        expect(forgotPassword.messagePlaceholder.getText()).toBe('Username has to be e mail');

    });

    it ("Forgot password check alerts when you enter e-mail without @ in e-mail input field", function() {
        console.log("Forgot password check alerts when you enter e-mail without @ in e-mail input field");

        browser.wait(EC.presenceOf(login.forgotPasswordButton), 5000);
        //Klik na forgot password
        login.forgotPasswordButton.click();
        //upis u polje Email
        forgotPassword.emailInput.sendKeys('ivandigitalcube.rs');
        //Nacin da se proveri tekst
        expect(forgotPassword.messagePlaceholder.getText()).toBe('Please enter email address registrated on your account.');
        //klik na Submit dugme
        forgotPassword.submitButton.click();
        //Nacin da se proveri tekst
        expect(forgotPassword.messagePlaceholder.getText()).toBe('Username has to be e mail');

    });

    it ("Forgot password check alerts when you enter nonexistent e-mail in e-mail input field", function() {
        console.log("Forgot password check alerts when you enter nonexistent e-mail in e-mail input field");

        browser.wait(EC.presenceOf(login.forgotPasswordButton), 5000);
        //Klik na forgot password
        login.forgotPasswordButton.click();
      // upis u polje Email
        forgotPassword.emailInput.sendKeys('ivan@digitalcube.rssssssssxssss');
        //Nacin da se proveri tekst
        expect(forgotPassword.messagePlaceholder.getText()).toBe('Please enter email address registrated on your account.');
        //klik na Submit dugme
        forgotPassword.submitButton.click();
        browser.sleep(400);
        //Nacin da se proveri tekst
        expect(forgotPassword.messagePlaceholder.getText()).toBe('Sorry, there is no account associated with this address.');

    });

    it ("Forgot password check alerts when you enter good email in e-mail input field (before that check funcionality of 'Back To Login' button)", function() {
        console.log("Forgot password check alerts when you enter good email in e-mail input field (before that check funcionality of 'Back To Login' button)");

        browser.wait(EC.presenceOf(login.forgotPasswordButton), 5000);
        //Klik na forgot password
        login.forgotPasswordButton.click();
        //nacin da se vrati na prethodnu stranicu (back dugme)
        browser.navigate().back();
        browser.sleep(300);
        //Klik na forgot password
        login.forgotPasswordButton.click();
        //upis u polje Email
        forgotPassword.emailInput.sendKeys('ivan@digitalcube.rs');
        //klik na Submit dugme
        forgotPassword.submitButton.click();
        browser.wait(EC.presenceOf(element(by.css('.popup-body span'))), 5000);
        //Nacin da se proveri tekst
        expect(element(by.css('.popup-body span')).getText()).toBe('We have sent reset info to ivan@digitalcube.rs');
    });
});