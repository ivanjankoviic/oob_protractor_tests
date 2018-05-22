/**
 * Created by munira on 29.3.17..
 */
module.exports = function() {

    this.stats = element(by.css('[data-dc-automation="navbar-holder-stats"]'));
    this.week = element (by.css('[data-dc-automation= "stats-item-week"]'));
    this.month = element (by.css('[data-dc-automation= "stats-item-month"]'));
    this.weigthloss = element (by.binding("vm.stats_svc.weight || 0"));
    this.weigthlossText = element (by.binding("'weight'|translate"));
    this.activityCompleted = element (by.binding('vm.activity_completed'));
    this.activityCompletedText = element (by.binding("'activityCompleted'|translate"));
    this.timePlanned = element (by.binding('vm.total_planned'));
    this.timePlannedText = element (by.binding("'timePlanned'|translate"));
    this.timeCompleted = element (by.binding('vm.total_completed'));
    this.timeCompletedText = element (by.binding("'timeCompleted'|translate"));
    this.HHS = element (by.binding('vm.hhs_score'));
    this.happy = element (by.binding('vm.happy_perc'));
    this.healthy = element (by.binding('vm.healthy_perc'));
    this.strong = element (by.binding('vm.strong_perc'));
    this.questionMark = element (by.css('.hhs-desc-icon'));

    this.weekAndMonthCurrentStats = element(by.binding('vm.stats_title'));
    this.leftArrow = element (by.css('.left-arrows'));
    this.rightArrow = element (by.css('.right-arrows'));

};
