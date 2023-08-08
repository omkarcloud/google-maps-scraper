from bose import *
from bose.utils import merge_dicts_in_one_dict, remove_nones
import selenium

class ScrapeGoogleMapsPlacesTask(BaseTask):
    task_config = TaskConfig(output_filename="all", 
                                                          log_time = False,

                             close_on_crash=True)

    browser_config = BrowserConfig(
        headless=True,

    )

    def get_data(self):
        return LocalStorage.get_item('queries', [])

    def run(self, driver, data):
        links = data['links']
        query = data['query']

        def get_maps_data(links):
            
            def get_data(link):
               

                def get_heading_text(max_attempts):
                    for attempt in range(1, max_attempts + 1):
                        heading = driver.get_element_or_none_by_selector('h1', Wait.SHORT)

                        if heading is not None:
                            title = heading.text
                        else:
                            title = ''

                        if title == '':
                            if attempt < max_attempts:
                                print("Did Not Get Heading. Retrying ...", link)
                                driver.get(link)
                                driver.short_random_sleep()
                            else:
                                print("Failed to retrieve heading text after 5 attempts.")
                                print("Skipping...", link)
                        else:
                            return title

                    return ''

                driver.get_by_current_page_referrer(link)
                out_dict = {}
                title = get_heading_text(5)

                if title == '':
                    return None

                out_dict['link'] = link
                try:
                    additional_data = driver.execute_file('get_more_data.js')
                except selenium.common.exceptions.JavascriptException as E:
                            if driver.is_in_page("consent.google.com", Wait.LONG):
                                el = driver.get_element_or_none_by_selector('form:nth-child(2) > div > div > button', Wait.LONG)
                                el.click()
                                print('Revisiting')
                                return get_data(link)
                            else: 
                                print(driver.current_url)
                                driver.save_screenshot()
                                raise E 
                
                out_dict = merge_dicts_in_one_dict(out_dict, additional_data)

                print('Done: ' + out_dict.get('title', ''))
                return out_dict

            ls = remove_nones(list(map(get_data, links)))

            return ls

        driver.get_google()

        results = get_maps_data(links)

        return results
