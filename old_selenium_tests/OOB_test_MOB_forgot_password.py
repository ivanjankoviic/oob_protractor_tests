from selenium import webdriver
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
        your_user_agent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.90 Safari/537.36"
        profile.set_preference("general.useragent.override", your_user_agent)
        self.driver = webdriver.Firefox(profile)
        self.driver.set_window_position(0,0)
        self.driver.implicitly_wait(4)

        # Galaxy_S5 = self.driver.set_window_size(360, 640)
        # Lumnia_520= self.driver.set_window_size(320, 533)
        # Nexus_5X = self.driver.set_window_size(412, 732)
        # iPhone5 = self.driver.set_window_size(320, 568)
        iPhone6 = self.driver.set_window_size(375, 667)
        # iPhone6 = self.driver.set_window_size(412, 736)
        # iPad = self.driver.set_window_size(768, 1024)

    def test_login_user_1(self):
        driver = self.driver

        driver.get(" http://{}/".format(mob_url))
        driver.find_element_by_id("username").send_keys("ivan@digitalcube.rs")
        driver.find_element_by_xpath("//input[@type='password']").send_keys("1234")
        driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view/ion-content/div/div/button").click()

        # bilo bi dobro da se proveri da li je oko na password prisutno!!!

        time.sleep(1)

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Wrong Email or Password', src)
        self.assertNotEqual(text_found, None)

        # klik na forgot password
        # driver.find_element_by_xpath("//*[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view/ion-content/div/div/a").click()
        driver.find_element_by_css_selector("a").click()

        time.sleep(1)

        # provera TITLA
        print(driver.title)
        assert "OOB Life" in driver.title

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Please enter email address registrated on your account.', src)
        self.assertNotEqual(text_found, None)
        # klik na Back to login dugme
        driver.find_element_by_xpath(
            "//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view[2]/ion-content/div/div/div[7]/button").click()
        time.sleep(1)
        # klik na forgot password
        driver.find_element_by_css_selector("a").click()
        time.sleep(1)
        # klik na Submit dugme
        driver.find_element_by_xpath(
            "//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view[2]/ion-content/div/div/div[4]/button").click()
        #
        time.sleep(1)
        # klik na Error, Success dugme koje izlazi posle submita
        # driver.find_element_by_xpath("//div[3]/button").click()

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Username has to be e mail', src)
        self.assertNotEqual(text_found, None)

        time.sleep(1)
        driver.find_element_by_xpath("(//input[@id='username'])[2]").send_keys("ivan@digitalcube.rs")

        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Please enter email address registrated on your account.', src)
        self.assertNotEqual(text_found, None)
        # klik na Submit dugme
        # driver.find_element_by_xpath("//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view[2]/ion-content/div/div/button").click()
        driver.find_element_by_xpath(
            "//div[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view[2]/ion-content/div/div/div[4]/button").click()

        time.sleep(1)
        # klik na Error, Success dugme koje izlazi posle submita
        driver.find_element_by_class_name("button button-calm login disable-user-behavior").click()

        # driver.find_element_by_xpath("//div[3]/button").click()
        time.sleep(1)

        driver.get("https://mail.google.com/mail")
        # ulazak na E-mail
        time.sleep(2)
        driver.find_element_by_id("Email").send_keys("ivan@digitalcube.rs")
        driver.find_element_by_id("next").click()
        time.sleep(1)
        driver.find_element_by_id("Passwd").send_keys("pfcpfcpfc")
        driver.find_element_by_id("signIn").click()
        time.sleep(20)
        # refresh dugme na Email u
        driver.find_element_by_xpath("//div[@id=':5']/div/div/div/div/div/div[4]/div").click()
        time.sleep(1)
        # klik na prvi e mail
        driver.find_element_by_css_selector("td.yX.xY").click()
        time.sleep(1)
        # klik na link po poziciju na ekranu, zato sto se ime linka menja
        driver.find_element_by_xpath("//div[7]/div/a").click()
        # driver.find_element_by_link_text("http://m.ooblife.com/reset-password").click()

        # klikom na link ostaje na e-mail stranici, naci nacin da prebaci na set new password stranicu!!!
        # promena na aktivni tab

        # pera = self.driver.find_element_by_tag_name('body')
        # pera.send_keys(Keys.CONTROL + Keys.TAB)
        # Menjanje na novi TAB
        time.sleep(3)
        driver.switch_to_window(driver.window_handles[1])
        time.sleep(2)

        # klik na set new password
        # driver.find_element_by_xpath("//button").send_keys()
        # time.sleep(3)
        # # nacin da pronadje da li postoji tekst na stranici
        # src = driver.page_source
        # text_found = re.search(r'Missing password', src)
        # self.assertNotEqual(text_found, None)
        # time.sleep(1)

        # upisivanje nove šifre
        driver.find_element_by_xpath("//input[@type='password']").send_keys("123")

        driver.find_element_by_xpath("//button").click()
        time.sleep(1)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Missing repeated password', src)
        self.assertNotEqual(text_found, None)
        time.sleep(1)
        driver.find_element_by_xpath("(//input[@type='password'])[2]").send_keys("123")
        driver.find_element_by_xpath("//button").click()
        time.sleep(3)

        # ponovo logovanje sa novom šifrom
        driver.find_element_by_id("username").send_keys("ivan@digitalcube.rs")
        time.sleep(1)
        driver.find_element_by_xpath(
            "//*[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view[2]/ion-content/div/div/button").click()
        time.sleep(1)
        # nacin da pronadje da li postoji tekst na stranici
        src = driver.page_source
        text_found = re.search(r'Enter your password', src)
        self.assertNotEqual(text_found, None)
        # driver.find_element_by_xpath("//div[3]/button").click()
        time.sleep(1)
        driver.find_element_by_xpath("(//input[@type='password'])[3]").send_keys("123")
        time.sleep(1)
        driver.find_element_by_xpath(
            "//*[@id='main-body-ui']/ion-view/ion-content/div/ion-nav-view/ion-view[2]/ion-content/div/div/button").click()
        time.sleep(1)
        # provera TITLA
        print(driver.title)
        assert "OOB Life" in driver.title

        time.sleep(2)

        driver.get("https://mail.google.com/mail")
        # ulazak na E-mail
        time.sleep(3)
        driver.find_element_by_css_selector("td.yX.xY").click()
        time.sleep(1)
        driver.find_element_by_xpath("//div[@id=':5']/div/div/div/div[2]/div[3]").click()

        time.sleep(1)

    def tearDown(self):
        self.driver.close()