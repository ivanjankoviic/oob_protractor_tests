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
api_url = 'staging-api.avalonactive.com'
mob_url = 'sm.avalonactive.com'
class Proba(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(3)
        self.base_url = "http://avalonactive.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
        self.username = "test0001@test.digitalcube.rs"

    def test_proba(self):
        driver = self.driver
        driver.get(" http://{}/".format(mob_url))
        time.sleep(1)

        # provera TITLA
        print(driver.title)
        assert "OOB Life" in driver.title

        # ukucavanje username i password-a na login stranici
        driver.find_element_by_id("username").send_keys("ivan@digitalcube.rs")
        driver.find_element_by_xpath("//input[@type='password']").send_keys("123")
        # klik na login dugme
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view/ion-content/div/div/button").click()
        time.sleep(3)

        # provera TITLA
        print(driver.title)
        assert "OOB Life" in driver.title
        # klik na profil (kalendar) dugme
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div/div[2]").click()

        # REFRESH stranice
        # driver.refresh()
        time.sleep(2)

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Complete Your Profile', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Weight', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Born:', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Sex:', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Run', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'5 km', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'English', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'save', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Password', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Email', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Connect Applications', src)
        self.assertNotEqual(text_found, None)
        time.sleep(1)
        # Nacin da se proveri da li je element prisutan na stranici
        # Profile
        # self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/oob-logo"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/oob-logo/div/img"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div[2]"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]"))
        # self.assertTrue(self.is_element_present(By.XPATH, "///div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[2]"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[3]"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[3]"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[4]"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[5]"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div/div[2]/table/tbody/tr[2]/td"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div/div[2]/table/tbody/tr[3]/td"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div/div[2]/table/tbody/tr/td[2]"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div/div[2]/table/tbody/tr[3]/td[2]"))
        self.assertTrue(self.is_element_present(By.XPATH, "//input[@type='number']"))
        self.assertTrue(self.is_element_present(By.XPATH, "(//input[@type='number'])[2]"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div[2]/div/div[5]/label/select"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div[2]/div/div[2]/label/select"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div[4]/div/div[2]"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.profile-picture"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "h2.ng-binding"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "td.ng-binding"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.profile-info-item.profile-data > h2"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "input.disable-user-behavior"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.profile-menu-header-title"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.profile-info-item.profile-applications > div.profile-menu-header.disable-user-behavior > div.profile-menu-header-title"))

        # REFRESH stranice
        driver.refresh()
        time.sleep(3)

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Complete Your Profile', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Weight', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Born:', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Sex:', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Run', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'5 km', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'English', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'save', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Password', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Email', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Connect Applications', src)
        self.assertNotEqual(text_found, None)

        time.sleep(1)

        # Nacin da se proveri da li je element prisutan na stranici
        # Profile
        # self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/oob-logo"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/oob-logo/div/img"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div[2]"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div"))
        # self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]"))
        # self.assertTrue(self.is_element_present(By.XPATH, "///div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[2]"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[3]"))
        # self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[3]"))
        # self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[4]"))
        self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[5]"))
        self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div/div[2]/table/tbody/tr[2]/td"))
        self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div/div[2]/table/tbody/tr[3]/td"))
        self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div/div[2]/table/tbody/tr/td[2]"))
        self.assertTrue(self.is_element_present(By.XPATH, "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div/div[2]/table/tbody/tr[3]/td[2]"))
        self.assertTrue(self.is_element_present(By.XPATH,"//input[@type='number']"))
        self.assertTrue(self.is_element_present(By.XPATH,"(//input[@type='number'])[2]"))
        self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div[2]/div/div[5]/label/select"))
        self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div[2]/div/div[2]/label/select"))
        self.assertTrue(self.is_element_present(By.XPATH,"//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div/div[4]/div/div[2]"))

        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.profile-picture"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "h2.ng-binding"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "td.ng-binding"))

        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.profile-info-item.profile-data > h2"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "input.disable-user-behavior"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.profile-menu-header-title"))
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.profile-info-item.profile-applications > div.profile-menu-header.disable-user-behavior > div.profile-menu-header-title"))



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
    def tearDown(self):

        url = "http://api.avalonactive.com/avl/user"
        querystring = {"username": self.username}
        headers = {
            'cache-control': "no-cache",
            'postman-token': "e06e9d9d-82b6-c21f-a327-8369f5c9677b"
        }
        response = requests.request("DELETE", url, headers=headers, params=querystring)
        print(response.text)
        self.driver.quit()
if __name__ == "__main__":
    unittest.main()