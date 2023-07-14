import urllib.parse
from bose import *

from src.scrape_google_maps_places_task import ScrapeGoogleMapsPlacesTask
from .config import queries

class ScrapeGoogleMapsLinksTask(BaseTask):

    task_config = TaskConfig(output_filename = "all", close_on_crash=True)

    browser_config = BrowserConfig(
        is_eager = True,
        headless = True,
    )

    def get_data(self):
        # Reset queries
        LocalStorage.set_item('queries', [])
        return queries

    def run(self, driver, data):
        keyword = data['keyword']
        max_results = data.get('max_results')
        
        def get_links():
            def scroll_till_end(times):
                def visit_gmap():

                    endpoint = f'maps/search/{urllib.parse.quote_plus(keyword)}'
                    url = f'https://www.google.com/{endpoint}'

                    driver.get_by_current_page_referrer(url)

                    if not driver.is_in_page(endpoint, Wait.LONG):
                        if driver.is_in_page("consent.google.com", Wait.SHORT):
                            el = driver.get_element_or_none_by_selector('form:nth-child(2) > div > div > button', Wait.LONG)   
                            el.click()
                        print('Revisiting')
                        visit_gmap()

                visit_gmap()

                number_of_times_not_scrolled = 0
                while True:
                    el = driver.get_element_or_none_by_selector(
                        '[role="feed"]', Wait.LONG)

                    if el is None:
                        visit_gmap()

                        return scroll_till_end(times + 1)
                    else:
                        did_element_scroll = driver.scroll_element(el)

                        end_el = driver.get_element_or_none_by_selector(
                            "p.fontBodyMedium > span > span", Wait.SHORT)
           
                        if end_el is not None:
                            driver.scroll_element(el)
                            return

                        if not did_element_scroll:
                            driver.sleep(0.1)
                            number_of_times_not_scrolled += 1

                            if number_of_times_not_scrolled > 20:
                                print('Google Maps was Stuck in Scrolling. So returning.')
                                return 
                            
                            print('Scrolling...')
                        else:
                            number_of_times_not_scrolled = 0
                            print('Scrolling...')

                        if max_results is None: 
                            pass
                        else: 
                            els = driver.get_elements_or_none_by_selector('[role="feed"] >  div > div > a', Wait.LONG)
                            if len(els) >= max_results:
                                return
            
            scroll_till_end(1)

            def extract_links(elements):
                def extract_link(el):
                    return el.get_attribute("href")

                return list(map(extract_link, elements))

            els = driver.get_elements_or_none_by_selector(
                '[role="feed"] >  div > div > a', Wait.LONG)
            links = extract_links(els)

            if max_results is not None:
                return links[:max_results]
            return links

        driver.get_google()
        links  = get_links()

        print(f'Fetched {len(links)} links.')

        
        queries = LocalStorage.get_item("queries" , [])

        data = {"links": links, "query": data}
        queries.append(data)

        LocalStorage.set_item('queries', queries)

        return ScrapeGoogleMapsPlacesTask().run(driver, data)
        # return [{"link": link} for link in links]