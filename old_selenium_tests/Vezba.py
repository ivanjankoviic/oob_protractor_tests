# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

api_url = 'staging-api.avalonactive.com'
mob_url = 'sm.avalonactive.com'
mob_full_url = 'http://sm.avalonactive.com/signup/'

# IZBACENO SIGNUP DUGME
class Proba(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(3)
        self.base_url = "http://http://sm.avalonactive.com"
        self.accept_next_alert = True
        self.username = "test0001@test.digitalcube.rs"

    def test_proba(self):
        driver = self.driver
        driver.get("http://sm.avalonactive.com")


        # ukucavanje username i password-a na login stranici
        driver.find_element_by_id("username").send_keys("munira@digitalcube.rs")
        driver.find_element_by_xpath("//input[@type='password']").send_keys("123")

        # klik na login dugme
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view/ion-content/div/div/button").click()
        time.sleep(1)

        # driver.find_element_by_id("level1").click()
        driver.find_element_by_css_selector("label.ng-binding").click()

        driver.find_element_by_css_selector("div.signup-item.next-item").click()
        time.sleep(1)

        # klik na button 5 km
        driver.find_element_by_id("five_km").click()
        time.sleep(1)
        # upisivanje datuma
        # driver.find_element_by_xpath("//input[@type='date']").click()
        # driver.find_element_by_xpath("//input[@type='date']").clear()
        # driver.find_element_by_xpath("//input[@type='date']").send_keys("")
        driver.find_element_by_xpath("//input[@type='date']").clear()
        driver.find_element_by_xpath("//input[@type='date']").send_keys("")

        driver.find_element_by_xpath("//input[@type='date']").send_keys("2018-12-09")
        driver.find_element_by_xpath("//input[@type='text']").send_keys(";MN;MN&%$&%$&%32534")
        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-race.disable-user-behavior").click()
        driver.find_element_by_css_selector("div.add-race.disable-user-behavior").click()
        driver.find_element_by_xpath("(//input[@type='date'])[2]").clear()
        # upisivanje datuma i evenata
        driver.find_element_by_xpath("(//input[@type='date'])[2]").send_keys("")
        driver.find_element_by_xpath("(//input[@type='date'])[2]").send_keys("2017-07-15")
        driver.find_element_by_xpath("(//input[@type='date'])[3]").clear()
        driver.find_element_by_xpath("(//input[@type='date'])[3]").send_keys("")
        driver.find_element_by_xpath("(//input[@type='date'])[3]").send_keys("2017-11-15")
        driver.find_element_by_xpath("(//input[@type='text'])[2]").send_keys("MARATON 21321&%$&%")
        driver.find_element_by_xpath("(//input[@type='text'])[3]").send_keys(u"4 x 100m ŠTAFETA )(/)(/)(654654654")
        # klik na dugme level 1
        time.sleep(1)

        driver.find_element_by_id("level1").click()
        time.sleep(1)

        # # klik na Update Profile (next dugme)
        # driver.find_element_by_xpath("//input[@value='Update Profile']").click()
        # # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-nav-view/ion-view[2]/ion-content/div/div/div[11]/input").click()
        # # driver.find_element_by_css_selector("input.activated").click()
        # time.sleep(1)
        #
        # # klik na Success (eror dugme)
        # driver.find_element_by_xpath("//button").click()
        # time.sleep(1)
        pass

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
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
        finally: self.accept_next_alert = True
    
    # def tearDown(self):
    #     self.driver.quit()
    #     self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
