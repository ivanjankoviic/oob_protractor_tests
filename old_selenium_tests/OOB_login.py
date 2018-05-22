from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re
import requests
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.common.action_chains import ActionChains
# import selenium.webdriver.support.ui as ui
# from selenium.common.exceptions import TimeoutException
# from requests.auth import HTTPBasicAuth
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# from selenium-avalon.OOB.test_cfg import mob_url

api_url = 'staging-api.avalonactive.com'
mob_url = 'sm.avalonactive.com'

class Proba(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(3)
        # self.base_url = "http://avalonactive.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
        # self.username = "test0001@test.digitalcube.rs"

    def test_proba(self):
        driver = self.driver
        driver.get(" http://{}/".format(mob_url))
        time.sleep(2)

        # provera TITLA
        print(driver.title)
        assert "OOB Life" in driver.title
        time.sleep(8)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Email', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Password', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'forgot password?', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'login', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        # src = driver.page_source
        # text_found = re.search(r'signup!', src)
        # self.assertNotEqual(text_found, None)

        # Nacin da se proveri da li je element prisutan na stranici
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "img"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.oob-logo"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "oob-logo"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.login-form"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.username-holder"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.pass-holder"))
        # self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.login-message.ng-binding"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "ion-view.main-login-view.pane > ion-content.scroll-content.ionic-scroll > div.scroll"))
        self.assertTrue(self.is_element_present(By.XPATH, "//input[@type='password']"))

        # REFRESH stranice
        driver.refresh()
        time.sleep(5)

        # provera TITLA
        print(driver.title)
        assert "OOB Life" in driver.title

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Email', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Password', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'forgot password?', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'login', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        # src = driver.page_source
        # text_found = re.search(r'signup!', src)
        # self.assertNotEqual(text_found, None)

        # Nacin da se proveri da li je element prisutan na stranici
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "img"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.oob-logo"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "oob-logo"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.login-form"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.username-holder"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.pass-holder"))
        # self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.login-message.ng-binding"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "ion-view.main-login-view.pane > ion-content.scroll-content.ionic-scroll > div.scroll"))
        self.assertTrue(self.is_element_present(By.XPATH, "//input[@type='password']"))


    def is_element_present(self, how, what):
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e:
            return False
        return True

    def is_alert_present(self):
        try:
            self.driver.switch_to_alert()
        except NoAlertPresentException as e:
            return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally:
            self.accept_next_alert = True

    #
    def tearDown(self):

        # url = "http://api.avalonactive.com/avl/user"
        # querystring = {"username": self.username}
        # headers = {
        #     'cache-control': "no-cache",
        #     'postman-token': "e06e9d9d-82b6-c21f-a327-8369f5c9677b"
        # }
        # response = requests.request("DELETE", url, headers=headers, params=querystring)
        # print(response.text)
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()