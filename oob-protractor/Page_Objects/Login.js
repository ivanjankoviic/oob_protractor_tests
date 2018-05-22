module.exports = function() {

    this.imageOOB = element(by.xpath('//*[@id="main-body-ui"]/ion-view/ion-content/div/ion-nav-view/ion-view/ion-content/div/oob-logo/div/img'));
    this.emailInput = element(by.model('vm.username'));
    this.passwordInput = element(by.model('vm.password'));
    this.showPasswordEye = element(by.css('.show-password'));
    this.forgotPasswordButton = element(by.css('[ui-sref="ooblogin.forgot"]'));

    this.buttonLogin = element(by.css('.button'));


    this.errorMessages = element(by.binding('vm.error_message'));

    this.email1 = element(by.id('username'));
    this.password1 = element(by.id('password'));

};