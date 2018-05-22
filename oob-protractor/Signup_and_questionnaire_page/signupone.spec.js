

/*
 * Checking whether the elements are visible on the first Sign up page
    * Check all elements on the first Sign up page

 * User successfully fulfilled all on the first page Sign up
     * User successfully fulfilled all on the first Sign up page and choose Mr for gender
     * User successfully fulfilled all on the first Sign up page and choose Miss for gender
     * User successfully fulfilled all on the first Sign up page and choose Mrs for gender
     * User successfully fulfilled all on the first Sign up page and choose Mx for gender

 * User incorrectly filled out the first Sign up page
     * The user attempted to sign up on the first page without a filled any fields
     * The user attempted to sign up on the first page without a filled the field for "First Name"
     * The user attempted to sign up on the first page without a filled the field for "Last Name"
     * The user attempted to sign up on the first page without a filled the field for "Email"
     * The user attempted to sign up on the first page without a filled the fields for "Password" and "Repeat password"
     * The user attempted to sign up on the first page without a filled the field for "Repeat password"
     * The user attempted to sign up on the first page with wrong email
     * The user attempted to sign up on the first page with wrong repeat password

 */

var Config = require ('./../Config/config.js');
var UserSingUp = require ('../Page_Objects/UserSignup.js');
var UserSingUpTwo = require ('../Page_Objects/UserSignupTwo.js');

describe('User incorrectly filled out the first Sign up page', function () {

    var config = new Config();
    var userSignup = new UserSingUp();
    var userSignupTwo = new UserSingUpTwo();
    var EC = protractor.ExpectedConditions;

    function getSelectedText(select) {
        return select.getAttribute('value')
            .then(function (i) {
                return select.element(by.css('option[value="' + i + '"]')).getText();
            });
    }

    beforeEach (function () {
        browser.get(config.test_url_signup);
    });
    it ('The user attempted to sign up on the first page without a filled any fields', function () {
        console.log('The user attempted to sign up on the first page without a filled any fields');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.buttonNext.click();
        expect(userSignupTwo.homeTown.isPresent()).toBeFalsy();
        expect(userSignup.lastName.isDisplayed()).toBeTruthy();
        //* provera da li klikom na Next preslo na drugu stranu za singup
        // expect(browser.getCurrentUrl()).toContain('http://localhost:9910/signup/two');
    });

    it ('The user attempted to sign up on the first page without a filled the field for "First Name"', function () {
        console.log('The user attempted to sign up on the first page without a filled the field for "First Name"');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Miss');
        userSignup.lastName.sendKeys('Test01');
        userSignup.email.sendKeys('usertest010digitalcube.rs');
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('123');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        expect(userSignupTwo.homeTown.isPresent()).toBeFalsy();
        expect(userSignup.lastName.isDisplayed()).toBeTruthy();
        //* provera da li klikom na Next preslo na drugu stranu za singup
        // expect(browser.getCurrentUrl()).toContain('http://localhost:9910/signup/two');
    });

    it ('The user attempted to sign up on the first page without a filled the field for "Last Name"', function () {
        console.log('The user attempted to sign up on the first page without a filled the field for "Last Name"');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Miss');
        userSignup.firstName.sendKeys('User01');
        userSignup.email.sendKeys('usertest010digitalcube.rs');
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('123');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        expect(userSignupTwo.homeTown.isPresent()).toBeFalsy();
        expect(userSignup.lastName.isDisplayed()).toBeTruthy();
        //* provera da li klikom na Next preslo na drugu stranu za singup
        // expect(browser.getCurrentUrl()).toContain('http://localhost:9910/signup/two');
    });

    it ('The user attempted to sign up on the first page without a filled the field for "Email"', function () {
        console.log('The user attempted to sign up on the first page without a filled the field for "Email"');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Miss');
        userSignup.firstName.sendKeys('User01');
        userSignup.lastName.sendKeys('Test01');
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('321');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.buttonNext), 5000);
        expect(userSignupTwo.homeTown.isPresent()).toBeFalsy();
        expect(userSignup.lastName.isDisplayed()).toBeTruthy();
        // browser.wait(EC.presenceOf(userSignup.gender), 5000);
        //* provera da li klikom na Next preslo na drugu stranu za singup
        // expect(browser.getCurrentUrl()).toContain('http://localhost:9910/signup/two');
    });

    it ('The user attempted to sign up on the first page without a filled the fields for "Password" and "Repeat password"', function () {
        console.log('The user attempted to sign up on the first page without a filled the fields for "Password" and "Repeat password"');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Miss');
        userSignup.firstName.sendKeys('User01');
        userSignup.lastName.sendKeys('Test01');
        userSignup.email.sendKeys('usertest010@digitalcube.rs');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        expect(userSignupTwo.homeTown.isPresent()).toBeFalsy();
        expect(userSignup.lastName.isDisplayed()).toBeTruthy();
        //* provera da li klikom na Next prelo na drugu stranu za singup
        // expect(browser.getCurrentUrl()).toContain('http://localhost:9910/signup/two');
    });

    it ('The user attempted to sign up on the first page without a filled the field for "Repeat password"', function () {
        console.log('The user attempted to sign up on the first page without a filled the field for "Repeat password"');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Miss');
        userSignup.firstName.sendKeys('User01');
        userSignup.lastName.sendKeys('Test01');
        userSignup.email.sendKeys('usertest010@digitalcube.rs');
        userSignup.password.sendKeys('321');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        expect(userSignupTwo.homeTown.isPresent()).toBeFalsy();
        expect(userSignup.lastName.isDisplayed()).toBeTruthy();
        //* provera da li klikom na Next prelo na drugu stranu za singup
        // expect(browser.getCurrentUrl()).toContain('http://localhost:9910/signup/two');
    });

    it ('The user attempted to sign up on the first page with wrong email', function () {
        console.log('The user attempted to sign up on the first page with wrong email');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Miss');
        userSignup.firstName.sendKeys('User01');
        userSignup.lastName.sendKeys('Test01');
        userSignup.email.sendKeys('usertest010digitalcube.rs');
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('321');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.buttonNext), 5000);
        expect(userSignupTwo.homeTown.isPresent()).toBeFalsy();
        expect(userSignup.lastName.isDisplayed()).toBeTruthy();
        // browser.wait(EC.presenceOf(userSignup.gender), 5000);
        //* provera da li klikom na Next preslo na drugu stranu za singup
        // expect(browser.getCurrentUrl()).toContain('http://localhost:9910/signup/two');
    });

    it ('The user attempted to sign up on the first page with wrong repeat password', function () {
        console.log('The user attempted to sign up on the first page with wrong repeat password');

        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        userSignup.gender.get(1).click();
        expect(getSelectedText(element(by.model('vm.dcm.signup.gender_chosen')))).toBe('Miss');
        userSignup.firstName.sendKeys('User01');
        userSignup.lastName.sendKeys('Test01');
        userSignup.email.sendKeys('usertest010@digitalcube.rs');
        userSignup.password.sendKeys('321');
        userSignup.repeatPassword.sendKeys('123');
        userSignup.buttonNext.click();
        browser.wait(EC.presenceOf(userSignup.gender), 5000);
        expect(userSignupTwo.homeTown.isPresent()).toBeFalsy();
        expect(userSignup.lastName.isDisplayed()).toBeTruthy();
        //* provera da li klikom na Next prelo na drugu stranu za singup
        // expect(browser.getCurrentUrl()).toContain('http://localhost:9910/signup/two');
    });
});



