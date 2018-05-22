/**
 * Created by munira on 23.3.17..
 */

module.exports = function() {

        this.athleteRunner = element(by.id('runner'));
        this.athleteCyclist = element(by.id('cyclist'));
        this.athleteTriathlete = element(by.id('triathlete'));
        this.level1 = element(by.id('level1'));
        this.level2 = element(by.id('level2'));
        this.level3 = element(by.id('level3'));
        this.guidance = element(by.id('guidance'));
        this.updateProfile = element (by.css('[ng-click="vm.update()"]'));
        this.buttonNext = element(by.buttonText('Next'));
        this.messages = element(by.css('.popup-body span'));
};
