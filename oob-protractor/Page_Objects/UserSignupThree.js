/**
 * Created by munira on 23.3.17..
 */

module.exports = function() {
    this.disclaimer = element(by.css('[data-dc-automation="checkbox-disclaimer"]'));
    this.termsAndConditions = element(by.css('[data-dc-automation="checkbox-terms-and-conditions"]'));
    this.disclaimerText = element(by.xpath("//span[contains(text(),'I agree')]"));
    this.termsAndConditionsText = element(by.xpath("//span[contains(text(),'I agree')]"));
    this.buttonRegister = element(by.css('[ng-click="vm.register()"]'));

};