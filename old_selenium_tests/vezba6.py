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

        your_user_agent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.90 Safari/537.36"
        profile.set_preference("general.useragent.override", your_user_agent)
        self.driver = webdriver.Firefox(profile)
        self.driver.set_window_position(0, 0)
        self.driver.implicitly_wait(4)
        # Galaxy_Note_3 = self.driver.set_window_size(360, 640)
        Lumnia_520 = self.driver.set_window_size(320, 533)
        # Nexus_5X = self.driver.set_window_size(412, 732)
        # iPhone5 = self.driver.set_window_size(320, 568)
        # iPhone6 = self.driver.set_window_size(375, 667)
        # iPhone6 = self.driver.set_window_size(412, 736)
        # iPad = self.driver.set_window_size(768, 1024)

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
        time.sleep(2)
        # klik na login dugme
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view/ion-content/div/div/button").click()
        time.sleep(2)

        # driver.find_element_by_id("level1").click()
        driver.find_element_by_css_selector("label.ng-binding").click()
        driver.find_element_by_css_selector("div.signup-item.next-item").click()
        time.sleep(2)

        # nacin za sroll-ovanje
        # driver.execute_script("window.scrollTo(0, 400);")
        elm = driver.find_element_by_css_selector("div.signup-form.questionnaire")
        elm.send_keys(Keys.END)

        time.sleep(2)
        # klik na Update Profile (next dugme)
        # driver.find_element_by_xpath("//input[@value='Update Profile']").click()
        # driver.find_element_by_css_selector("input[type='button']").click()
        # driver.find_element_by_xpath("//div[11]/input").click()
        driver.find_element_by_link_text("Update Profile").click()
        driver.find_element_by_link_text()
        time.sleep(2)

        # klik na Success (eror dugme)
        driver.find_element_by_xpath("//button").click()
        time.sleep(1)
        pass

    def test_login_user_1(self):
        driver = self.driver
        driver.get("http://{}".format(test_root_page))
        time.sleep(2)

        # klik na crveni krstic
        driver.find_element_by_css_selector("div.add-event-icon.disable-user-behavior").click()
        time.sleep(1)

        # kucanje u search polje
        driver.find_element_by_id("search-activities").send_keys("")
        driver.find_element_by_id("search-activities").send_keys("run")
        time.sleep(1)
        Activities_click = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH,
                                                                                           """//*[@id="main-body-ui"]/ion-side-menus/ion-side-menu-content/ion-view/ion-content/ion-nav-view[2]/ion-nav-view/ion-view/ion-content[2]/div[1]/div[4]/div[2]"""))).click()
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
