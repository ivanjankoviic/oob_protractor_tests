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

import json

api_url = 'staging-api.avalonactive.com'
mob_url = 'sm.avalonactive.com'

# IZBACENO SIGNUP DUGME
class Proba(unittest.TestCase):
    def setUp(self):

        self.base_url = "http://{}/".format(mob_url)
        self.api_url = "http://{}".format(api_url)
        self.verificationErrors = []
        self.accept_next_alert = True
        self.username = "test0001@test.digitalcube.rs"



    def test_proba(self):
        url = "{}/user/register".format(self.api_url)
        querystring = {
            'username': self.username,
            'password': '123',
            'data': json.dumps({
                "first_name": "user", "last_name": "test", "I_AGREE": "true", "role": 1, "language": 1, "service": 1
            })
        }
        response = requests.request("POST", url, params=querystring)
        # print(response)
        # print(response.text)
        # print('STATUS', response.status_code)

        self.assertEqual(response.status_code, 200)




    def tearDown(self):

        url = "http://{}/avl/user".format(api_url)
        querystring = {"username": self.username}
        response = requests.request("DELETE", url, params=querystring)
        # print('type', type(response.text))
        res = response.json()
        # print('res', res)

        self.assertEqual(response.status_code, 200)
        self.assertIn('id', res)
        self.assertIn('debug', res)


if __name__ == "__main__":
    unittest.main()
