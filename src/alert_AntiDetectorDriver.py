from botasaurus import AntiDetectDriver
from selenium.webdriver.common.alert import Alert as SeleniumAlert
from selenium.common.exceptions import NoAlertPresentException, UnexpectedAlertPresentException
from time import sleep


class CustomAntiDetectDriver(AntiDetectDriver):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Additional initialization if needed


class ExtendedAntiDetectDriver(AntiDetectDriver):
    def get_by_current_page_referrer(self, link, wait=None):
        current_url = self.current_url
        try:
            self.execute_script(f"window.location.href = '{link}';")
            changed = False
            while not changed:
                if current_url != self.current_url:
                    changed = True
                sleep(0.1)
            if wait is not None and wait != 0:
                sleep(wait)
        except NoAlertPresentException:
            # Handle the case if an alert pops up immediately after execute_script
            alert = self.switch_to.alert
            alert.accept()
            print("Alert accepted after navigation.")

    def get_alert(self):
        try:
            return SeleniumAlert(self)
        except NoAlertPresentException:
            return None

    def accept_alert(self):
        try:
            alert = SeleniumAlert(self)
            alert.accept()
        except NoAlertPresentException:
            pass  # No alert to accept

    # Additional overrides or new methods

# More customizations if needed
