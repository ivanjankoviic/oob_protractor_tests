/**
 * Created by munira on 31.3.17..
 */

module.exports = function() {

    this.reportEvent = element (by.css('.event-title'));
    this.plannedActivity = element (by.css('.planned-open'));
    this.completedActivity = element (by.css('.completed-open'));
    this.completed=element(by.css('[data-dc-automation="task-completed"]'));
    this.notCompleted=element(by.css('[data-dc-automation="task-not-completed"]'));
    this.createEvent = element (by.binding ('vm.add_button'));
    this.answerYes = element (by.id('answer-yes'));
    this.answerNo = element (by.id('answer-no'));
    this.skip = element (by.id('s0'));
    this.notMotivated = element (by.id('s1'));
    this.tired = element (by.id('s2'));
    this.injury = element (by.id('s3'));
    this.sick = element (by.id('s4'));
    this.messages = element(by.css('.popup-body span'));
    this.happy20 = element (by.css('[on-tap="vm.choose_feeling(0,20)"]'));
    this.happy40 = element (by.css('[on-tap="vm.choose_feeling(0,40)"]'));
    this.happy60 = element (by.css('[on-tap="vm.choose_feeling(0,60)"]'));
    this.happy80 = element (by.css('[on-tap="vm.choose_feeling(0,80)"]'));
    this.happy100 = element (by.css('[on-tap="vm.choose_feeling(0,100)"]'));
    this.healthy20 = element (by.css('[on-tap="vm.choose_feeling(1,20)"]'));
    this.healthy40 = element (by.css('[on-tap="vm.choose_feeling(1,40)"]'));
    this.healthy60 = element (by.css('[on-tap="vm.choose_feeling(1,60)"]'));
    this.healthy80 = element (by.css('[on-tap="vm.choose_feeling(1,80)"]'));
    this.healthy100 = element (by.css('[on-tap="vm.choose_feeling(1,100)"]'));
    this.strong20 = element (by.css('[on-tap="vm.choose_feeling(2,20)"]'));
    this.strong40 = element (by.css('[on-tap="vm.choose_feeling(2,40)"]'));
    this.strong60 = element (by.css('[on-tap="vm.choose_feeling(2,60)"]'));
    this.strong80 = element (by.css('[on-tap="vm.choose_feeling(2,80)"]'));
    this.strong100 = element (by.css('[on-tap="vm.choose_feeling(2,100)"]'));
    this.timeCompletedWithoutHours = element (by.css('[data-dc-automation="time-completed-without-hours"]'));
    this.timeCompleted = element (by.css('[data-dc-automation="time-completed-with-hours"]'));
    this.timeHours = element(by.model('vm.range_inputs.hours'));
    this.timeMinutes = element (by.model('vm.range_inputs.minutes'));
    this.timeSeconds = element (by.model('vm.range_inputs.seconds'));
    this.setButton = element (by.css('button.button:nth-child(2)'));
    this.cancelButton = element (by.css('button.button:nth-child(1)'));
    this.testPower = element (by.model('vm.event.test_average_powers[_i]'));
    this.testHr = element (by.model('vm.event.test_average_hrs[_i]'));
    this.testDistance = element (by.model('vm.event.test_distance[_i]'));

    this.weightInput = element(by.css('[ng-model="vm.event.report_weight"]'));

    this.writeMessage = element (by.css ('[on-tap="vm.open_messages()"]'));
    this.discardMessage = element (by.css ('[on-tap="vm.discard_message()"]'));
    // this.sendMessage = element (by.css ('[on-tap="vm.save_message()"]'));
    this.sendMessage1 = element(by.className('start-editor-send'));
    this.sendMessage = element(by.css('[data-dc-automation="send-message"]'));
    // this.sendMessage = element(by.css('[on-tap="vm.save_message()"]'));



    this.newMessage = element (by.model('vm.new_message'));
    this.messageContent = element(by.css('[data-dc-automation="event-message-content"]'));
    this.saveTest = element (by.className ('report-test'));

    this.eventMessages = element (by.css (".event-message-time"));


    this.goalDistance = element (by.model ('vm.event.goal_distance'));
    this.goalAverageHr = element (by.model ('vm.event.goal_average_hrs'));
    this.goalAveragePower = element (by.model ('vm.event.goal_average_power'));
    this.goalSwimDistance = element (by.model('vm.event.goal_swim_distance'));
    this.goalBikeDistance = element (by.model('vm.event.goal_bike_distance'));
    this.goalRunDistance = element (by.model('vm.event.goal_run_distance'));
    this.goalRunSecondDistance = element (by.model('vm.event.goal_run_second_distance'));
    this.goalTriathlonSwimTime = element (by.css('[data-dc-automation="goal-triathlon-swim-time"]'));
    this.goalTriathlonRunTime = element (by.css('[data-dc-automation="goal-triathlon-run-time"]'));
    this.goalTriathlonBikeTime = element (by.css('[data-dc-automation="goal-triathlon-bike-time"]'));
    this.goalDuathlonRunTime = element (by.css('[data-dc-automation="goal-duathlon-run-time"]'));
    this.goalDuathlonBikeTime = element (by.css('[data-dc-automation="goal-duathlon-bike-time"]'));
    this.goalDuathlonRunSecondTime = element (by.css('[data-dc-automation="goal-duathlon-run-second-time"]'));
    this.goalAquathlonSwimTime = element (by.css('[data-dc-automation="goal-aquathlon-swim-time"]'));
    this.goalAquathlonRunTime = element (by.css('[data-dc-automation="goal-aquathlon-run-time"]'));
    this.goalBikePower = element (by.model ('vm.event.goal_average_bike_power'));
    this.goalBikeHr = element (by.model ('vm.event.goal_average_bike_hr'));
    this.goalRunHr = element (by.model ('vm.event.goal_average_run_hr'));
    this.goalRunSecondHr = element (by.model('vm.event.goal_average_run_second_hr'));

    this.testRunDistance = element(by.model('vm.event.test_distance[_i]'));
    this.testRunHr = element(by.model('vm.event.test_average_hrs[_i]'));

    this.reportMotivation20 = element (by.css ('[on-tap="vm.choose_full_range(20)"]'));
    this.reportMotivation40 = element (by.css ('[on-tap="vm.choose_full_range(40)"]'));
    this.reportMotivation60 = element (by.css ('[on-tap="vm.choose_full_range(60)"]'));
    this.reportMotivation80 = element (by.css ('[on-tap="vm.choose_full_range(80)"]'));
    this.reportMotivation100 = element (by.css ('[on-tap="vm.choose_full_range(100)"]'));
    this.reportStressGreat = element (by.id('s0'));
    this.reportStressGood = element (by.id('s1'));
    this.reportStressOk = element (by.id('s2'));
    this.reportStressSwamped = element (by.id('s3'));
    this.reportStressHopeless = element (by.id('s4'));
    this.reportWeight = element (by.model ('vm.event.report_weight'));
    this.reportSystolicPressure = element (by.model ('vm.event.systolic'));
    this.reportDiastolicPressure = element (by.model ('vm.event.diastolic'));
    this.reportHeartRate = element (by.model('vm.event.hart_rate'));
    this.reportMorning = element (by.id('s0'));
    this.reportDuringDay = element (by.id('s1'));
    this.reportEvening = element (by.id('s2'));
    this.reportSleep4H = element (by.css ('[on-tap="vm.choose_full_range(4)"]'));
    this.reportSleep8H = element (by.css ('[on-tap="vm.choose_full_range(8)"]'));
    this.reportSleep12H = element (by.css ('[on-tap="vm.choose_full_range(12)"]'));
    this.reportSleep16H = element (by.css ('[on-tap="vm.choose_full_range(16)"]'));
    this.reportSleep20H = element (by.css ('[on-tap="vm.choose_full_range(20)"]'));
    this.reportSleep23H = element (by.css ('[on-tap="vm.choose_full_range(23)"]'));
    this.reportSleep10Min = element (by.css('[on-tap="vm.choose_full_range2(10)"]'));
    this.reportSleep10Min = element (by.css('[on-tap="vm.choose_full_range2(20)"]'));
    this.reportSleep10Min = element (by.css('[on-tap="vm.choose_full_range2(30)"]'));
    this.reportSleep10Min = element (by.css('[on-tap="vm.choose_full_range2(40)"]'));
    this.reportSleep10Min = element (by.css('[on-tap="vm.choose_full_range2(50)"]'));
    this.reportSleep10Min = element (by.css('[on-tap="vm.choose_full_range2(59)"]'));
    this.reportSleepBad = element (by.id('s0'));
    this.reportSleepNormal = element (by.id('s1'));
    this.reportSleepGreat = element (by.id('s2'));
    this.reportInjuryBetter = element (by.id('s0'));
    this.reportInjurySame = element (by.id('s1'));
    this.reportInjuryWorse = element (by.id('s2'));
    this.reportSicknessBug = element (by.id('s0'));
    this.reportSicknessFever = element (by.id('s1'));
    this.reportSicknessSick = element (by.id('s2'));

    this.nutritionFull20 = element (by.css('[on-tap="vm.choose_full_range(20)"]'));
    this.nutritionFull40 = element (by.css('[on-tap="vm.choose_full_range(40)"]'));
    this.nutritionFull60 = element (by.css('[on-tap="vm.choose_full_range(60)"]'));
    this.nutritionFull80 = element (by.css('[on-tap="vm.choose_full_range(80)"]'));
    this.nutritionFull100 = element (by.css('[on-tap="vm.choose_full_range(100)"]'));
    this.nutritionDrink250 = element (by.id('s0'));
    this.nutritionDrink500 = element (by.id('s1'));
    this.nutritionDrink1 = element (by.id('s2'));
    this.nutritionDrink15 = element (by.id('s3'));
    this.nutritionDrinkMore = element (by.id('s4'));

    this.systolicInput = element(by.model('vm.event.systolic'));
    this.diastolicInput = element(by.model('vm.event.diastolic'));
    this.heartRateInput = element(by.model('vm.event.hart_rate'));
    this.radio1Label = element(by.css('label[for="s0"]'));
    this.radio2Label = element(by.css('label[for="s1"]'));
    this.radio3Label = element(by.css('label[for="s2"]'));
    this.radio4Label = element(by.css('label[for="s3"]'));
    this.radio5Label = element(by.css('label[for="s4"]'));

    // // za ng-repeter
    //
    // element.all(by.repeater('requirement in vm.requirements')).then(
    //     function(posts) {
    //         posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).sendKeys('5645454');
    //     }
    // );

};
