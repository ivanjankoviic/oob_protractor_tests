/**
 * Created by munira on 27.3.17..
 */

module.exports = function() {
    this.fiveKm = element(by.id('five_km'));
    this.tenKm = element(by.id('ten_km'));
    this.halfmarathon = element(by.id('halfmarathon'));
    this.marathon = element(by.id('marathon'));
    this.other = element(by.id('other'));
    this.dateAndNameOfTheRace = element.all(by.repeater('race in vm.run.races'));
    this.addMoreRunRaces = element(by.css('[on-tap="vm.add_run_race()"]'));
    this.removeRunRaces = element(by.css('[on-tap="vm.remove_run_race()"]'));

};
