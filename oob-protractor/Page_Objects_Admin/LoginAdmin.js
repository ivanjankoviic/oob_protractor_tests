/**
 * Created by ivan on 11.9.17..
 */
module.exports = function() {

    this.emailInput = element(by.id('username-input'));
    this.passwordInput = element(by.id('username-password'));
    this.forgotPasswordButton = element(by.id('forgot-password'));
    this.emailInputPlaceholder = element(by.css('label[for="username-input"]'));
    this.passwordInputPlaceholder = element(by.css('label[for="username-password"]'));
    this.buttonLogin = element(by.id('login-button'));
    this.errorMessages = element(by.css('.text-center'));
    // this.adminPicture = element(by.css("img[src*='mypic.png']")); trbalo bi izvuci sliku





};