/**
 * Created by munira on 27.3.17..
 */

module.exports = function() {

    this.olympicTriathlon = element(by.id('olympic'));
    this.halfIronman = element(by.id('half-ironman'));
    this.ironman = element(by.id('ironman'));
    this.other = element(by.id('other'));
    this.dateAndNameOfTheRace = element.all(by.repeater('race in vm.triathlete.races'));
    this.addMoreTriathleteRaces = element(by.css('[on-tap="vm.add_triathlete_race()"]'));
    this.removeTriathleteRaces = element(by.css('[on-tap="vm.remove_triathlete_race()"]'));

};
