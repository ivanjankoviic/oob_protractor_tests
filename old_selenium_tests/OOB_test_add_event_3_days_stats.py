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
test_root_page = 'sm.avalonactive.com/#testing_2000-02-15'
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
        time.sleep(1)
        # klik na login dugme
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view/ion-content/div/div/button").click()
        time.sleep(1)

        # driver.find_element_by_id("level1").click()
        driver.find_element_by_css_selector("label.ng-binding").click()
        driver.find_element_by_css_selector("div.signup-item.next-item").click()
        # time.sleep(1)

        # klik na Update Profile (next dugme)
        driver.find_element_by_xpath("//input[@value='Update Profile']").click()
        time.sleep(1)

        # klik na Success (eror dugme)
        driver.find_element_by_xpath("//button").click()
        time.sleep(1)
        pass

    def test_add_event_3_days_and_stats(self):
        driver = self.driver
        driver.get("http://{}".format(test_root_page))

        # refresh stranice
        driver.refresh()
        time.sleep(3)
        # HAMBURGER menu logout dugme
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div/div").click()
        time.sleep(1)
        # klik na stats
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[4]").click()
        # driver.find_element_by_css_selector("div.app-side-menu-item.activated").click()
        # driver.find_element_by_xpath("//*[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[3]").click()

        time.sleep(1)

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Happy 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Healthy 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Strong 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Activity completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Time completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Time planned', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 kg', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 %', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 h', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Happy/Healthy/Strong 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'HHS Score', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Week', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Month', src)
        self.assertNotEqual(text_found, None)

        #klik na Month
        # NE HVATA PREKO CSS-a
        # driver.find_element_by_css_selector("input.disable-user-behavior.active").click()
        driver.find_element_by_xpath("//input[@value='Month']").click()

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Happy 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Healthy 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Strong 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Activity completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Time completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Time planned', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 kg', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 %', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 h', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Happy/Healthy/Strong 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'HHS Score', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Week', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Month', src)
        self.assertNotEqual(text_found, None)

        # klik na kalendar
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div[2]").click()
        time.sleep(1)
        # klik na 14.02.2000
        driver.find_element_by_css_selector("#day-2000-02-14 > oob-day > div.day-events.disable-user-behavior > div.day-empty-event").click()
        time.sleep(1)

        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        time.sleep(0.5)
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()

        # klik na Joggimg
        driver.find_element_by_css_selector("span.ng-binding").click()
        time.sleep(1)
        # upisati u kalendar novi datum
        driver.find_element_by_xpath("//input[@type='date']").clear()
        driver.find_element_by_xpath("//input[@type='date']").send_keys("")
        driver.find_element_by_xpath("//input[@type='date']").send_keys("2000-02-14")
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        # driver.find_element_by_xpath("//input[@value='Add Event']").click()

        time.sleep(0.5)

        # NE MOZE DA SE HVATA PREKO CSS-a, PROVERITI!!!
        # klik na 14.02.2000 sa napravljenim jednim eventom
        # driver.find_element_by_css_selector("#day-2000-02-14 > oob-day.day-opened > div.day-events.disable-user-behavior").click()
        driver.find_element_by_xpath("//ion-item[@id='day-2000-02-14']/oob-day/div[2]").click()

        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Jogging', src)
        self.assertNotEqual(text_found, None)
        time.sleep(0.5)

        # klik na side button, ya napravljeni event (Jogong)
        driver.find_element_by_css_selector("div.event-menu-button.disable-user-behavior").click()

        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'delete', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'move', src)
        self.assertNotEqual(text_found, None)

        # klik sa strane da nestane delete i move
        driver.find_element_by_css_selector("div.popover-backdrop.active").click()
        time.sleep(1)
        # klik na kalendar
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div[2]").click()
        time.sleep(0.5)

        # klik na danasnji dan (15.02.2000)
        driver.find_element_by_css_selector("oob-day.current-day").click()

        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        time.sleep(0.5)
        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        time.sleep(0.5)
        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        time.sleep(0.5)
        # klik na Joggimg
        driver.find_element_by_css_selector("span.ng-binding").click()
        time.sleep(0.5)
        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.5)


        # klik na side button, za napravljeni event (Joging) !!!
        # driver.find_element_by_css_selector("#day-2000-02-15 > oob-day").click()
        # driver.find_element_by_xpath("//ion-item[@id='day-2000-02-16']/oob-day/div[3]/div/div[2]").click()
        driver.find_element_by_css_selector(".current-day > div:nth-child(3) > div:nth-child(1)").click()


        time.sleep(1)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Planned activity', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Completed activity', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'60 min', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Time completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Happy', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Healthy', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Strong', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Write a message...', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'15 Feb', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Jogging', src)
        self.assertNotEqual(text_found, None)

        # klik na kalendar
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div[2]").click()
        time.sleep(0.5)

        # klik na buduci dan (16.02.2000)
        driver.find_element_by_css_selector("#day-2000-02-16>oob-day.day-opened>div.day-events.disable-user-behavior>div.day-empty-event").click()

        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        time.sleep(0.3)

        # klik na Activity
        driver.find_element_by_css_selector("span.ng-binding").click()
        time.sleep(0.3)

        # klik na Run
        driver.find_element_by_css_selector("span.ng-binding").click()
        time.sleep(0.3)

        # klik na Joggimg
        driver.find_element_by_css_selector("span.ng-binding").click()
        time.sleep(0.3)

        # klik na add event
        driver.find_element_by_css_selector("input.disable-user-behavior").click()
        time.sleep(0.3)

        # klik na buduci dan (16.02.2000), da ga oznaci
        # driver.find_element_by_xpath("//ion-item[@id='day-2000-02-16']/oob-day/div[2]").click()

        # klik na buduci dan (16.02.2000)
        driver.find_element_by_css_selector("#day-2000-02-16 > oob-day:nth-child(1) > div:nth-child(3) > div:nth-child(1)").click()

        time.sleep(1)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Planned activity', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Completed activity', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'60 min', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Completed?', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Write a message...', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'16 Feb', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Jogging', src)
        self.assertNotEqual(text_found, None)
        # klik na No
        driver.find_element_by_id("answer-no").click()

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Why?', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'SKIP', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'NOT MOTIVATED', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'TIRED', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'INJURY', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'SICK', src)
        self.assertNotEqual(text_found, None)

        # klik na No
        driver.find_element_by_id("answer-no").click()

        # klik na kalendar
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div[2]").click()
        time.sleep(1)
        # klik na 14.02.2000
        driver.find_element_by_css_selector("#day-2000-02-14 > oob-day.day-opened").click()

        # klik na  14.02.2000
        driver.find_element_by_css_selector("#day-2000-02-14 > oob-day:nth-child(1) > div:nth-child(3) > div:nth-child(1)").click()
        time.sleep(0.5)
        # klik na Happy 20%
        driver.find_element_by_css_selector("div.task-happy.disable-user-behavior > input[type=\"radio\"]").click()
        # klik na Healthy 40%
        driver.find_element_by_xpath("(//input[@value='40'])[2]").click()
        # klik na Strong 60%
        driver.find_element_by_xpath("(//input[@value='60'])[3]").click()

        # klik na kalendar
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div[2]").click()
        time.sleep(1)

        # # HAMBURGER menu logout dugme
        # driver.find_element_by_xpath("//*[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[3]/div[1]").click()
        # time.sleep(1)
        # # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[3]").click()
        time.sleep(0.5)
        # HAMBURGER menu logout dugme
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div/div").click()
        driver.find_element_by_css_selector("div.app-menu.header-item").click()

        time.sleep(1)
        # klik na stats
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[4]").click()
        # driver.find_element_by_css_selector("div.app-side-menu-item.activated").click()
        # driver.find_element_by_xpath("//*[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[3]").click()
        # klik na Profil
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[5]").click()
        driver.find_element_by_xpath("//*[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[1]").click()
        # driver.find_element_by_css_selector("div.app-side-menu-item.activated").click()

        time.sleep(0.5)

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
        # klik na Password
        driver.find_element_by_css_selector("div.profile-menu-header-title").click()

        # klik na email
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content[2]/div/div[4]/div/div[2]").click()
        driver.find_element_by_xpath("//*[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-content/div[1]/div[4]/div[1]/div[2]").click()

        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'user1@test.digitalcube.rs', src)
        self.assertNotEqual(text_found, None)

        # klik na Achiments(zvezda)
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[4]").click()
        time.sleep(0.5)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Achievements page coming soon', src)
        self.assertNotEqual(text_found, None)

        # klik na Running Zones
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view/div[2]/div[3]").click()
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Your Running Zones will be here after you save the test results.', src)
        self.assertNotEqual(text_found, None)


        driver.get('http://sm.avalonactive.com/#testing_2000-01-01')
        time.sleep(1)
        # refresh stranice
        driver.refresh()
        time.sleep(3)
        # HAMBURGER menu logout dugme
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div/div").click()
        # time.sleep(1)
        # klik na stats
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[3]").click()
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[3]").click()
        # HAMBURGER menu logout dugme
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div/div").click()
        time.sleep(1)
        # klik na stats
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[4]").click()
        time.sleep(0.5)

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Happy 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Healthy 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Strong 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Activity completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Time completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Time planned', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 kg', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 %', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 h', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Happy/Healthy/Strong 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'HHS Score', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Week', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Month', src)
        self.assertNotEqual(text_found, None)

        # klik na Month
        # NE HVATA PREKO CSS-a
        # driver.find_element_by_css_selector("input.disable-user-behavior.active").click()
        driver.find_element_by_xpath("//input[@value='Month']").click()

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Happy 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Healthy 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Strong 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Activity completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Time completed', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Time planned', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 kg', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 %', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'0 h', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Happy/Healthy/Strong 0%', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'HHS Score', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Week', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Month', src)
        self.assertNotEqual(text_found, None)

        driver.get("http://{}".format(test_root_page))

        # refresh stranice
        driver.refresh()
        time.sleep(3)
        # HAMBURGER menu logout dugme
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div/div").click()
        time.sleep(1)
        # klik na logout
        driver.find_element_by_xpath("//div[3]/div[6]").click()
        # time.sleep(0.5)




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
