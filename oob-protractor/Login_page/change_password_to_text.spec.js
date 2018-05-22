
var Config = require ('../Config/config.js');
var Login = require ('../Page_Objects/Login.js');

describe ("Check funcion button show-password - ", function(){

    var config = new Config();
    var login = new Login();
    var EC = protractor.ExpectedConditions;

    it ("Check 'EYE' show-password funcionality, whether is type password or text ", function() {

        browser.get(config.test_url);
        browser.sleep(1000)
        //TIME OUT
        browser.wait(EC.presenceOf(login.passwordInput), 5000);
        //upis password-a
        login.passwordInput.sendKeys('123456');
        //nacin da se proveri da li je element 'oko' prisutano
        expect(login.showPasswordEye.isPresent()).toBeTruthy();
        //provera da je 'oko' TYPE
        expect(login.passwordInput.getAttribute('type')).toBe('password');
        //klik na 'oko'
        login.showPasswordEye.click();
        //provera da je 'oko' TEXT
        expect(login.passwordInput.getAttribute('type')).toBe('text');

    });
});
