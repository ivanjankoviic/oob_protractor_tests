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

api_url = 'staging-api.avalonactive.com'
mob_url = 'sm.avalonactive.com'


class OOB_life_login(unittest.TestCase):
    def setUp(self):
        profile = webdriver.FirefoxProfile()
        self.driver = webdriver.Firefox(profile)

        self.driver.implicitly_wait(4)
        self.api_url = "http://{}".format(api_url)
        self.username = 'user1@test.digitalcube.rs'
        try:
            self.delete_user()
        except Exception as e:
            print('Ne mogu da izbrisem users')
        self.user_register()

    def user_register(self):
        url = "{}/user/register".format(self.api_url)
        querystring = {
            'username': self.username,
            'password': '123',
            'data': json.dumps({
                "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
            })
        }
        response = requests.request("POST", url, params=querystring)
        # print(response.text)
        self.assertEqual(response.status_code, 200)
        self.fill_questionnaire()

    def fill_questionnaire(self):
        driver = self.driver
        driver.get("http://{}".format(mob_url))
        # ukucavanje username i password-a na login stranici
        driver.find_element_by_id("username").send_keys(self.username)
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
        time.sleep(1)
        # klik na dugme level 1
        driver.find_element_by_id("level1").click()
        time.sleep(1)
        # klik na Update Profile (next dugme)
        driver.find_element_by_xpath("//input[@value='Update Profile']").click()
        time.sleep(1)
        # klik na Success (eror dugme)
        driver.find_element_by_xpath("//button").click()
        time.sleep(1)
        pass

    def test_login_user_1(self):
        driver = self.driver

        # provera TITLA
        print(driver.title)
        assert "OOB Life" in driver.title

        # REFRESH stranice
        # driver.refresh()
        # time.sleep(2)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Joggimg
        driver.find_element_by_css_selector("span.ng-binding").click()
        time.sleep(1)
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Jogging', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na LSD run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'LSD run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Race pace run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Race pace run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Short interval run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[7]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Short interval run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Power run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[9]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Power run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Treadmill
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[11]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Treadmill', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Recovery run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[13]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Recovery run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Trail run
        driver.find_element_by_xpath( "//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[15]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Trail run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Endurance run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[2]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Endurance run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Tempo run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[4]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Tempo run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Long interval run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[6]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Long interval run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Speed work run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[8]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Speed work run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Fartlek run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[10]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Fartlek run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Running technique
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[12]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Running technique', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Ultra run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[14]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Ultra run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        # Other Run
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[16]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Other Run', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Reports
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # Motivation
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Motivation', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Reports
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # Weight
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Weight', src)
        self.assertNotEqual(text_found, None)

        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Reports
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # Sleep
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Sleep', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Reports
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # Injury
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[7]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Injury', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Reports
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # Stress
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[2]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Jogging', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Reports
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # Blood pressure
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[4]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Blood pressure', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Reports
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # Resting heart rate
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[6]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Resting heart rate', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na Reports
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # Sickness
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[8]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Sickness', src)
        self.assertNotEqual(text_found, None)

        time.sleep(0.5)
        # klik na strelicu ya kalendar '<'
        driver.find_element_by_css_selector("div.navbar-item.nav-arrow-left").click()
        time.sleep(0.5)
        # klik na drugi datum
        driver.find_element_by_css_selector("#day-2017-02-06 > oob-day").click()
        time.sleep(0.5)

        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # klik na Webinar
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Webinar', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Lecture
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[3]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Lecture', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Group training session
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Group training session', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # klik na other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[7]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Others', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Travel
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[9]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Travel', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Travel by train
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[11]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Travel by train', src)
        self.assertNotEqual(text_found, None)

        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Message
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[13]/div[2]/span").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Message', src)
        self.assertNotEqual(text_found, None)

        time.sleep(1)
        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Meeting
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[2]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Meeting', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Shopping
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[4]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Shopping', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Workshop
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[6]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Workshop', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Recovery
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[8]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Recovery', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Travel by car
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[10]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Travel by car', src)
        self.assertNotEqual(text_found, None)


        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Travel by airplane
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[12]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Travel by airplane', src)
        self.assertNotEqual(text_found, None)

        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        # Other
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[5]/div[2]/span").click()
        # Active hobby
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content/div/ion-nav-view/div[14]/div[2]/span").click()
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Active hobby', src)
        self.assertNotEqual(text_found, None)



        time.sleep(2)
        # HAMBURGER menu logout dugme
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div/div").click()
        # time.sleep(2)
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[5]").click()
        # time.sleep(1)



    def tearDown(self):
        self.delete_user()
        self.driver.close()
        # self.driver.quit()

    def delete_user(self):
        url = "http://{}/avl/user".format(api_url)
        querystring = {"username": self.username}
        response = requests.request("DELETE", url, params=querystring)
        print(response.text)

        res = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', res)
        self.assertIn('debug', res)


if __name__ == "__main__":
    unittest.main()
