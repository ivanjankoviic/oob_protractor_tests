
module.exports = function() {

    this.eventTitleDefault = element(by.css('[data-dc-automation="add-event-title"]'));
    this.dateField = element(by.model('vm.event.date'));
    this.durationField = element(by.model('vm.event.fdata.duration'));
    this.orderField = element.all(by.options('g.value as g.title for g in vm.day_positions'));
    this.orderText = element(by.xpath('//*[@id="main-body-ui"]/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view[2]/ion-content/div[1]'));
    this.addNoteField = element(by.css('.note-icon'));
    this.addNoteInputText =  element(by.css('.add-event-editor'));
    this.sendButtonAddNote = element(by.css('[data-dc-automation="save-add-note"]'));
    this.checkTextAddNote =  element(by.css('[data-dc-automation="check-text-add-note"]'));

    this.strengthsField = element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));
    this.easyRadioButton = element(by.id('ems-easy'));
    this.mediumRadioButton = element(by.id('ems-medium'));
    this.hardRadioButton = element(by.id('ems-hard'));
    this.createEventButton = element(by.css('[data-dc-automation="create-event-button"]'));
    this.messageField = element(by.model('vm.event.fdata[requirement.name.toLowerCase()]'));

    //sluzi za dodavanja  teksta u poljima (event title, run distance, bike distance, swim distance, run distance second, weight loss)
    this.requirements = element.all(by.repeater('requirement in vm.requirements'));

};

//sluzi za dodavanja  teksta u poljima (event title, run distance, bike distance, run distance second)
// element.all(by.repeater('requirement in vm.requirements')).then(function(posts) {
//     var titleElement = posts[3].element(by.model('vm.event.fdata[requirement.name.toLowerCase()]')).sendKeys('5645454');
// });



