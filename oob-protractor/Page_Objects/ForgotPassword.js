/**
 * Created by ivan on 22.3.17..
 */
module.exports = function() {
    this.emailInput = element(by.css('[data-dc-automation="forgot-password-email-input"]'));
    // this.emailInput = element(by.xpath('(//input[@id="username"])[2]'));
    // this.emailInput = element(by.id('username'));
    // this.emailInput = element(by.css('.input-holder.username-holder in'));
    this.submitButton = element(by.css('[on-tap="vm.forgot()"]'));
    this.backToLoginButton = element(by.css('[on-tap="vm.back_to_login()"]'))
    this.messagePlaceholder = element(by.css('.forgot-title span'))
};