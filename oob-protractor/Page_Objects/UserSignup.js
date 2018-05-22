/**
 * Created by munira on 23.3.17..
 */
module.exports = function () {

    this.gender = element.all(by.options('g.value as g.title for g in vm.gender'));
    this.firstName = element(by.model('vm.dcm.signup.first_name'));
    this.lastName = element(by.model('vm.dcm.signup.last_name'));
    this.email = element(by.model('vm.dcm.signup.username'));
    this.password = element(by.model('vm.dcm.signup.password'));
    this.repeatPassword = element(by.model('vm.dcm.signup.password_repeat'));
    this.buttonNext = element(by.css('[ng-click="vm.go_to(1)"]'));

};
