/**
 * Created by munira on 28.3.17..
 */

module.exports = function() {

    this.editPicture = element (by.css('[ng-click="vm.edit_picture()"]'));
    this.closeButton = element(by.css('[ng-click="vm.close_image_upload()"]'));
    this.savePictureButton = element(by.css ('[ng-click="vm.save_profile_picture()"]'));
    this.weight = element(by.model('vm.user_weight'));
    this.height = element(by.model('vm.user_height'));
    this.saveButton = element(by.css('[data-dc-automation="profile-info-save-button"]'));
    this.language = element (by.model('vm.language_selected'));
    this.languages = element.all(by.options('vm.languages.indexOf(g) as g for g in vm.languages'));
    this.sport = element(by.model('vm.sport_selected'));
    this.sports = element.all(by.options('vm.sports.indexOf(s) as s for s in vm.sports'));
    this.password = element (by.css('[data-dc-automation="profile-info-password-menu"]'));
    this.oldPassword = element(by.model('vm.user_old_password'));
    this.newPassword = element (by.model('vm.user_new_password'));
    this.retypePassword = element (by.model('vm.user_new_password2'));
    this.savePasswordButton = element(by.css('[data-dc-automation="profile-info-save-password"]'));
    this.email= element (by.css('[data-dc-automation="profile-info-email-menu"]'));
    this.oldPasswordEmail = element(by.model('vm.user_old_password2'));
    this.newEmail = element (by.model('vm.user_new_email'));
    this.repeatNewEmail = element (by.model('vm.user_new_email2'));
    this.saveEmailButton = element (by.css('[data-dc-automation="profile-info-save-email"]'));
    this.weeklySummary = element (by.css('[data-dc-automation="profile-info-email-weekly"]'));
    this.dailySummary = element(by.css('[data-dc-automation="profile-info-email-daily"]'));
    this.noneSummary = element(by.css('[data-dc-automation="profile-info-email-none"]'));
    this.connectApplications = element(by.css('[data-dc-automation="profile-info-connect-app-menu"]'));
    this.connectStrava = element (by.css('[data-dc-automation="profile-info-connect-strava"]'));
    this.disconnectStrava = element (by.css('[data-dc-automation="profile-info-disconnect-strava"]'));
    this.connectGoogleFit = element (by.css('[data-dc-automation="profile-info-connect-gfit"]'));
    this.disconnectGoogleFit= element (by.css('[data-dc-automation="profile-info-disconnect-gfit"]'));

    this.editForm = element (by.css('[on-tap="vm.open_edit_form()"]'));
    this.addMoreRaces = element(by.css('[data-dc-automation="add-more-races"]'));
    this.raceName = element (by.model('vm.new_race[1]'));
    this.raceDate = element (by.model('vm.new_race[0]'));
    this.addRaceBtn = element (by.css ('[on-tap="vm.save_changes(4)"]'));
    this.deleteRaceBtn = element(by.className('item disable-user-behavior'));
    this.threeDotsDeleteRaceBtn = element(by.className('vertical-dots disable-user-behavior'));
    this.editHomeTown  = element (by.model('vm.logged_user.billing_info.city'));
    this.editBirthDate  = element (by.model('vm.birth_date'));
    this.editPhone  = element (by.model('vm.logged_user.telephone'));
    this.editGender  = element.all(by.options('g.value as g.title for g in vm.gender'));
    this.saveForm  = element(by.css('[ng-click="vm.save_form_data()"]'));



    this.trophyIcon  = element(by.css('.upcoming-goal-icon'));

    this.upcomingGoalDate = element.all(by.repeater('race in vm.logged_user.races'));

    this.homeTown  = element (by.css('[data-dc-automation="profile-details-home-town"]'));
    this.birthDate  = element (by.css('[data-dc-automation="profile-details-birth-date"]'));
    this.phone  = element (by.css('[data-dc-automation="profile-details-phone"]'));
    this.gender  = element (by.css('[data-dc-automation="profile-details-gender"]'));

    this.profileInfoUsermail = element (by.css('[data-dc-automation="profile-info-usermail"]'));
    this.summaryReceive = element (by.css('[data-dc-automation="summary-receive"]'));

};

