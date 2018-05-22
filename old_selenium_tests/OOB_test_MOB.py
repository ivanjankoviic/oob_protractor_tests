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
        # klik na dugme level 1
        time.sleep(1)

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

        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        time.sleep(1)

        # kucanje u search polje
        driver.find_element_by_id("search-activities").send_keys("")
        driver.find_element_by_id("search-activities").send_keys("run")
        time.sleep(1)
        Activities_click = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, """//*[@id="main-body-ui"]/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content[2]/div[1]/div[4]/div[2]"""))).click()
        time.sleep(1)

        driver.find_element_by_xpath("//input[@type='number']").clear()
        driver.find_element_by_xpath("//input[@type='number']").send_keys("")
        driver.find_element_by_xpath("//input[@type='number']").send_keys("145")
        driver.find_element_by_id("ems-medium").click()
        driver.find_element_by_css_selector("div.note-icon").click()
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view[3]/ion-content/div/textarea").send_keys("!#@!$#@$%$#%^$%^&&^()(**(_  1233645409686507 WQRWERERTYUIYO HGSFHAGFHASGDFAA<ZXCB<kasdagsf;aiuwer;ed.sajsd.asc")
        time.sleep(1)
        driver.find_element_by_css_selector("div.scroll > input.disable-user-behavior").click()

        time.sleep(2)
        # HAMBURGER menu logout dugme
        # hanburger_menu = WebDriverWait(driver, 10).until(
        #     EC.presence_of_element_located((By.CSS_SELECTOR,"""div.app-menu.header-item"""))).click()
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/ion-header-bar/ion-nav-view/div[2]/div").click()

        time.sleep(2)
        # logout = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, """//oob-side-menu/div[2]/div[5]"""))).click()
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-side-menus/ion-side-menu-content/ion-view/oob-side-menu/div[3]/div[5]").click()


        time.sleep(1)

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
