
module.exports = function() {
    this.mostEvents = element.all(by.repeater('mevent in vm.most_used_eventss'));
    this.categoris = element.all(by.repeater('category in vm.event_categories'));
    this.addEvent =  element(by.css("#main-body-ui > ion-side-menus > ion-side-menu-content > ion-view > ion-content > ion-nav-view.main-home-content.view-container > ion-nav-view > ion-view.add-event-content.add-event-form-content.pane > ion-content > div.scroll > div.add-submit > input"));
    this.category = function(category) {
        return element(by.xpath("//span[contains(text()," + category + ")]"));
    };
    this.messageForCoach = element (by.css('[data-dc-automation= "message-for-coach"]'));
    this.other = element (by.css('[data-dc-automation= "other"]'));
    this.search = element(by.id('search-activities'));
    this.searchedEventName = element.all(by.repeater('activity in vm.search_activity_list '));

    // this.activity = element(by.css(".used-event-name category-name span"));
    // this.activity = element(by.binding("Activity"));
    // this.activity = element(by.css("div.add-event-item:nth-child(1) > div:nth-child(2) > span:nth-child(1)"));
    // this.activityButton = element(by.binding('category.name'));
    // this.goalButton = element(by.css('div.add-event-categories:nth-child(2)'));
    // this.reportsButton = element(by.css('div.add-event-categories:nth-child(3)'));
    // this.nutritionButton = element(by.css('div.add-event-categories:nth-child(4)'));
    // this.otherButton = element(by.css('div.add-event-categories:nth-child(5)'));
};