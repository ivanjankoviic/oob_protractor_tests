/**
 * Created by munira on 28.3.17..
 */

module.exports = function() {
    this.grandFondos = element(by.id('grand-fondos'));
    this.criterium = element(by.id('criterium'));
    this.otherTypeOfRace = element(by.id('other'));
    this.dateAndNameOfTheRace = element.all(by.repeater('race in vm.cycle.races'));
    this.addMoreCycleRaces = element(by.css('[on-tap="vm.add_cycle_race()"]'));
    this.removeCycleRaces = element(by.css('[on-tap="vm.remove_cycle_race()"]'));

};