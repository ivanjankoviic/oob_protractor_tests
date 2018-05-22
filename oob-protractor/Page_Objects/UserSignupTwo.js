/**
 * Created by munira on 23.3.17..
 */
module.exports = function () {
    this.countryNubmer = element(by.model('vm.dcm.signup.country_number'));
    this.number = element(by.model('vm.dcm.signup.phone_number'));
    this.homeTown = element(by.model('vm.dcm.signup.address'));
    this.birthdate = element(by.model('vm.dcm.signup.birthdate'));
    this.language = element.all(by.options('l.value as l.title for l in vm.language'));
    // this.buttonNext2 = element(by.css('#main-body-ui > ion-view > ion-content > div > ion-nav-view > ion-nav-view:nth-child(2) > ion-view > ion-content > div > div > div.signup-item.next-item > input[type="button"]'));    // ovako nece
    // this.buttonNext2 = element(by.css('[data-dc-automation="signup-next-button-two"]'));
    this.nameOfTheRace = element.all(by.options('l.value as l.title for l in vm.language'));

    this.buttonNext2 = element(by.css('[ng-click="vm.go_to(2)"]'));


};