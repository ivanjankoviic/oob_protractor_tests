
module.exports = function() {

    this.buttonOK = element(by.buttonText('OK'));

    this.returnCurrentDate = function() {
        var monthNames = new Array("JAN", "FEB", "MAR",
            "APR", "MAY", "JUN", "JUL", "AUG", "SEP",
            "OCT", "NOV", "DEC");

        var d = new Date();
        var day = d.getDate();
        var monthNumber = d.getMonth()+1;
        var month = monthNames[d.getMonth()];
        var year = d.getFullYear();

        return {
            // d: d,
            day: day,
            month: month,
            monthNumber: monthNumber,
            year: year
        }
    };
    //
    // $(document).ready(function () {
    //     $('#txtDate').datepicker();
    //     $('#follow_Date').datepicker();
    // });

    // this.returnCurrentDate =function () {
    //     // var tt = document.getElementById('txtDate').value;
    //
    //     // var date = new Date(tt);
    //     var newdate = new Date();
    //
    //     newdate.setDate(newdate.getDate() + 3);
    //
    //     var k = 123;
    //     var day = newdate.getDate();
    //     var monthNumber = newdate.getMonth() + 1;
    //     var year = newdate.getFullYear();

        // var someFormattedDate = mm + '/' + dd + '/' + y;
        // document.getElementById('follow_Date').value = someFormattedDate;
    //
    // this.returnCurrentDate = function returnCurrentDate(date) {
    //     var monthNames = [
    //         "January", "February", "March",
    //         "April", "May", "June", "July",
    //         "August", "September", "October",
    //         "November", "December"
    //     ];
    //
    //     var day = date.getDate();
    //     var monthNumber = date.getMonth();
    //     var year = date.getFullYear();
    //
    // };
    //
    //
    //         return {
    //             // d: d,
    //             day: day,
    //             // month: month,
    //             monthNumber: monthNumber,
    //             year: year
    //         }



    this.month =  element(by.binding('vm.dcm.navigator_month')); //vm.dcm.navigator_month  element(by.xpath("//div[@class='navbar-item navbar-text first ng-binding'][1]"));
    this.day = element(by.binding('vm.dcm.navigator_day')); //element(by.xpath("//div[@class='navbar-item navbar-text first ng-binding'][2]"));
    this.year = element(by.binding('vm.dcm.navigator_year')); //element(by.xpath("//div[@class='navbar-item navbar-text first ng-binding'][3]"));
    // this.buttonAddEvent =  element(by.css("#main-body-ui > ion-side-menus > ion-side-menu-content > ion-view > ion-content > ion-nav-view.main-home-content.view-container > div > div")); // element(by.css('on-tap="vm.add_event()"'));
    this.buttonAddEvent =  element(by.css(".add-event-icon")); // element(by.css('on-tap="vm.add_event()"'));
    this.moveDeleteButton= element(by.css('[data-dc-automation="move-delete-event"]'));
    this.deleteButton = element(by.css('[data-dc-automation="menu-delete"]'));
    this.moveButton= element(by.css('[data-dc-automation="menu-move"]'));
    this.moveEventDatePicker = element(by.id('move-event-date-picker'));
    // this.moveEventDatePicker  = element (by.model('vm.move_date'));
    this.moveEventMoveButton = element(by.css('[data-dc-automation="move-event-move-button"]'));
    this.moveEventCancelButton = element(by.css('[data-dc-automation="move-event-cancel-button"]'));
    this.showMenuButtonCalendar = element(by.id('show-menu-button'));
    this.showMenuButton = element(by.css("div.header-controls-holder:nth-child(2) > div:nth-child(2)"));
    this.showMenuProfileButton = element(by.css('div.app-side-menu-item-title.ng-binding'));
    this.showMenuInboxButton = element(by.css('div.app-side-menu-item-icon.message-icon'));
    this.showMenuCalendarButton = element(by.css('div.app-side-menu-item-icon.calendar-icon'));
    this.showMenuStatsButton = element(by.css('div.app-side-menu-item-icon.stats-icon'));
    this.showMenuDisclaimerButton = element(by.css('div.app-side-menu-item-icon.disclaimer-icon'));
    this.showMenuLogoutButton = element(by.css('[ng-click="vm.logged_user.logout()"]'));
    this.accountButton = element(by.binding("'account'|translate"));

    this.profilePictureButton = element(by.css('.profile-pic'));
    // this.profilePictureButton1 = element(by.css('.calendar-pic'));
    this.profilePictureButton1 = element(by.css('[data-dc-automation="calendar-header-pic1"]'));
    this.headerOobLogoButton = element(by.css('img'));
    this.calendArrowRightButton = element(by.css('[data-dc-automation="calendar-nav-right"]'));
    this.calendArrowLeftButton = element(by.css('[data-dc-automation="calendar-nav-left"]'));
    this.today = element(by.id("day-2017-03-27"));
    this.calendarHeaderPic = element(by.css('[data-dc-automation="calendar-header-pic"]'));

    this.marker_more_events_in_one_day = element(by.css('[data-dc-automation="marker-more-events-in-one-day"]'));
};
