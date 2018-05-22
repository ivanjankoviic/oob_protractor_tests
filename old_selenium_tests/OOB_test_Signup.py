from selenium import webdriver
import requests
import json
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class Test36(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(3)
        self.base_url = "https://www.google.rs/"
        self.verificationErrors = []
        self.accept_next_alert = True


    def test_proba(self):
        driver = self.driver
        driver.get("http://m.ooblife.com/signup/")
        time.sleep(1)
        # time.sleep(6)
        #  Klik na Signup dugme
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view/ion-content/div/div/button[2]").click()


        # Klik na mx, dugme da se izabere kog si pola
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-nav-view/ion-view/ion-content/div/div/div/select").click()
        # driver.find_elements_by_link_text("Miss").append()
        # padajuci meni izabir pola
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-nav-view/ion-view/ion-content/div/div/div/select/\option[2]").click()

        # click_menu = WebDriverWait(self.driver, 20).until(EC.presence_of_element_located((By.XPATH,"""//*[@id="main-body-ui"]/ion-view/ion-content/div/ion-nav-view/ion-nav-view/ion-view/ion-content/div/div/div[1]/select"""))).click()
        # time.sleep(1)
        # click_mrs = WebDriverWait(self.driver, 20).until(EC.presence_of_element_located((By.XPATH,"""//*[@id="main-body-ui"]/ion-view/ion-content/div/ion-nav-view/ion-nav-view/ion-view/ion-content/div/div/div[1]/select/option[3]"""))).click()
        # time.sleep(1)

        # driver.find_element_by_xpath("//*[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-nav-view/ion-view/ion-content/div/div/div[1]/select").click()
        # time.sleep(1)
        # driver.find_element_by_xpath("//*[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-nav-view/ion-view/ion-content/div/div/div[1]/select/option[3]").click()



        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'first-name', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'last-name', src)
        self.assertNotEqual(text_found, None)
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
        text_found = re.search(r'Repeat password', src)
        self.assertNotEqual(text_found, None)

        # ukucavanje podataka
        driver.find_element_by_id("first-name").send_keys("111111")
        driver.find_element_by_id("last-name").send_keys("222222222")
        driver.find_element_by_css_selector("div.signup-item > #username").send_keys("iavnnnn@digitalcube.rs")
        driver.find_element_by_css_selector("div.signup-item > #password").send_keys("IsJ50111")
        driver.find_element_by_id("password-repeated").send_keys("IsJ50111")

        # klik na Next dugme
        driver.find_element_by_css_selector("div.signup-item.next-item").click()
        time.sleep(1)

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'381', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Number', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Home Town', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Birthday', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Englis', src)
        self.assertNotEqual(text_found, None)

        # Ukucavanje podataka stranica 2
        # driver.find_element_by_xpath("//*[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-nav-view/ion-view[2]/ion-content/div/div/div[2]/input[1]").send_keys("+381")
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-nav-view[2]/ion-view/ion-content/div/div/div[2]/input[2]").send_keys("2456345")
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-nav-view[2]/ion-view/ion-content/div/div/div[3]/input").send_keys("BEOGRAD")
        # klik na Next dugme
        driver.find_element_by_xpath("(//input[@value='Next'])[2]").click()

        time.sleep(1)
        # klik na checkout
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view/div/div[4]/div[2]/div/label").click()

        driver.find_element_by_css_selector("label.ng-binding").click()
        time.sleep(1)

        # klik na next dugme
        driver.find_element_by_css_selector("div.signup-item.register-item > input[type='button']").click()
        time.sleep(1)

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'you are successfully registered', src)
        self.assertNotEqual(text_found, None)
        # klik na alert dugme
        driver.find_element_by_xpath("//button").click()
        time.sleep(1)


        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'What type of athlete are you?', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'I am a runner.', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'I am a cyclist.', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'I am a triathlete.', src)
        self.assertNotEqual(text_found, None)
        # klik na checkpoint runner
        driver.find_element_by_id("runner").click()

        # klik na next dugme
        driver.find_element_by_css_selector("div.signup-item.next-item").click()
        time.sleep(1)

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Which distance are you training for?', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'When is your main race?', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Add more races', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'OOB running program you want to use?', src)
        self.assertNotEqual(text_found, None)

        # klik na button 5 km
        driver.find_element_by_id("five_km").click()
        time.sleep(1)
        # upisivanje datuma
        # driver.find_element_by_xpath("//input[@type='date']").clear()
        # driver.find_element_by_xpath("//input[@type='date']").send_keys("")
        # driver.find_element_by_xpath("//input[@type='date']").send_keys("2018-12-09")
        # driver.find_element_by_xpath("//input[@type='text']").send_keys(";MN;MN&%$&%$&%32534")
        # # klik na crveni krstic
        # driver.find_element_by_css_selector("div.add-race.disable-user-behavior").click()
        # driver.find_element_by_css_selector("div.add-race.disable-user-behavior").click()
        # driver.find_element_by_xpath("(//input[@type='date'])[2]").clear()
        # # upisivanje datuma i evenata
        # driver.find_element_by_xpath("(//input[@type='date'])[2]").send_keys("")
        # driver.find_element_by_xpath("(//input[@type='date'])[2]").send_keys("2017-07-15")
        # driver.find_element_by_xpath("(//input[@type='date'])[3]").clear()
        # driver.find_element_by_xpath("(//input[@type='date'])[3]").send_keys("")
        # driver.find_element_by_xpath("(//input[@type='date'])[3]").send_keys("2017-11-15")
        # driver.find_element_by_xpath("(//input[@type='text'])[2]").send_keys("MARATON 21321&%$&%")
        # driver.find_element_by_xpath("(//input[@type='text'])[3]").send_keys(u"4 x 100m ŠTAFETA )(/)(/)(654654654")
        # klik na dugme level 1
        # SCROLL SCROLL SCROLL SCROLL SCROLL
        # time.sleep(2)
        # driver.execute_script("window.scrollBy(0, -150);")
        # driver.find_element_by_id("level1").click()
        # time.sleep(10)

        # klik na Update Profile (next dugme)
        driver.find_element_by_xpath("//input[@value='Update Profile']").click()
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-nav-view/ion-view[2]/ion-content/div/div/div[11]/input").click()
        # driver.find_element_by_css_selector("input.activated").click()
        time.sleep(1)

        # klik na Success (eror dugme)
        driver.find_element_by_xpath("//button").click()
        time.sleep(1)

        # HAMBURGER menu logout dugme
        hanburger_menu = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH,"""//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div/div"""))).click()
        time.sleep(2)
        # logout = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, """//oob-side-menu/div[2]/div[5]"""))).click()
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[5]").click()
        driver.find_element_by_css_selector("div.app-side-menu-item.activated > div.app-side-menu-item-title.ng-binding").click()
        time.sleep(1)

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
        self.driver.close()
        # self.driver.quit()
        # self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()

