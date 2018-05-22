/**
 * Created by ivan on 20.6.17..
 */

module.exports = function() {
    this.payment = element(by.css('[data-dc-automation="payment-button"]'));
    this.disclamer = element(by.css('[data-dc-automation="disclaimer-button"]'));

    this.paymentInfoText = element(by.css('.info-text'));
    this.paymentReceipts = element(by.css('.invoices-title'));

    this.disclamerTitle = element(by.css('.profile-item-title'));
    this.disclclamerInfoText = element(by.css('.disclaimer-content'));



};