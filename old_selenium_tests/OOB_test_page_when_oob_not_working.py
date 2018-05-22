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

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Currently we are working to improve your OOB Life experience.', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'We’ll be back soon.', src)
        self.assertNotEqual(text_found, None)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Hello,', src)
        self.assertNotEqual(text_found, None)


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
