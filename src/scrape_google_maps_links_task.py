import hashlib
import os
import urllib.parse
from bose import *
from src.scrape_google_maps_places_task import ScrapeGoogleMapsPlacesTask
from .config import number_of_scrapers, queries
from bose.utils import read_json
import pydash


def divide_list(input_list, num_of_groups=6, skip_if_less_than=20):
    if skip_if_less_than is not None and len(input_list) < skip_if_less_than:
        return [input_list]

    group_size = len(input_list) // num_of_groups
    remainder = len(input_list) % num_of_groups

    divided_list = []
    for i in range(num_of_groups):
        start_index = i * group_size
        end_index = start_index + group_size
        divided_list.append(input_list[start_index:end_index])

    if remainder:
        for i in range(remainder):
            element = input_list[-i - 1]
            idx = i % num_of_groups
            print(idx, element)
            divided_list[idx].append(element)

    return divided_list


def sort_dict_by_keys(dictionary, keys):
    new_dict = {}
    for key in keys:
        new_dict[key] = dictionary[key]
    return new_dict


def clean(data_list, query):
    keys = 'ALL'

    if keys == 'ALL':
        keys = ["title", "link", "main_category", "rating", "reviews",  "address"]
    new_results = data_list

    new_results = [sort_dict_by_keys(x, keys) for x in new_results]

    return new_results


class ScrapeGoogleMapsLinksTask(BaseTask):

    task_config = TaskConfig(output_filename="all",
                             log_time=False,
                             close_on_crash=True
                             )

    browser_config = BrowserConfig(
        block_images_fonts_css=True,
        # Do not make it eager as it leads to the loss of fields and previous data get used instead of new one.
        # is_eager=True,
        headless=True,
    )

    def save_google(self, driver: BoseDriver, data):
        data = {"links": data, "query": {
            'keyword': 'rama',
            "sort": {
                "by": "title",
                "order": "desc"
            }
        }}

        return ScrapeGoogleMapsPlacesTask().run(driver, data)

    def get_data(self):
        result = []
        
        for query in queries:
            keyword = query["keyword"]
            keyword_kebab = pydash.kebab_case(keyword)
            filepath = os.path.join("output", keyword_kebab + ".json")
            stored = LocalStorage.get_item(keyword_kebab)
            if stored is None:
                result.append(query)
            else:
                if os.path.exists(filepath):
                    with open(filepath, 'r') as f:
                        file_content = f.read()
                        file_hash = hashlib.md5(file_content.encode()).hexdigest()                      

                    stored_query = stored['query']
                    stored_hash = stored['hash']

                    if stored_query == query and stored_hash == file_hash:
                        print(f'Skipping query "{keyword}" as it is already scraped.') 
                        result.append({"filepath": filepath})
                    else:
                        result.append(query)
                else:
                    result.append(query)
                
        return result
        
    def run(self, driver, data):
        if "filepath" in data:
            new_results =  read_json(data["filepath"])
            return new_results

        keyword = data['keyword']
        keyword_kebab = pydash.kebab_case(keyword)
        max_results = data.get('max_results')
        ns = number_of_scrapers if number_of_scrapers is not None else 4

        def get_links():
            def scroll_till_end(times):
                def visit_gmap():
                    endpoint = f'maps/search/{urllib.parse.quote_plus(keyword)}'
                    url = f'https://www.google.com/{endpoint}'

                    driver.get_by_current_page_referrer(url)

                    if not driver.is_in_page(endpoint, Wait.LONG):
                        if driver.is_in_page("consent.google.com", Wait.SHORT):
                            el = driver.get_element_or_none_by_selector(
                                'form:nth-child(2) > div > div > button', Wait.LONG)
                            el.click()
                        print('Revisiting')
                        visit_gmap()

                visit_gmap()

                number_of_times_not_scrolled = 0
                while True:
                    el = driver.get_element_or_none_by_selector(
                        '[role="feed"]', Wait.LONG)

                    if el is None:                   
                        rst = [driver.current_url]
                        return True, rst
                    else:
                        did_element_scroll = driver.scroll_element(el)

                        end_el = driver.get_element_or_none_by_selector(
                            "p.fontBodyMedium > span > span", Wait.SHORT)

                        if end_el is not None:
                            driver.scroll_element(el)
                            return False, []

                        if not did_element_scroll:
                            driver.sleep(0.1)
                            number_of_times_not_scrolled += 1

                            if number_of_times_not_scrolled > 20:
                                print(
                                    'Google Maps was Stuck in Scrolling. So returning.')
                                return False, []

                            print('Scrolling...')
                        else:
                            number_of_times_not_scrolled = 0
                            print('Scrolling...')

                        if max_results is None:
                            pass
                        else:
                            els = driver.get_elements_or_none_by_selector(
                                '[role="feed"] >  div > div > a', Wait.LONG)
                            if len(els) >= max_results:
                                return False, []

            
            should_exit, result = scroll_till_end(1)
            

            if should_exit:
                return result
            
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
        links = get_links()

        # Don't know why but google maps sometimes give duplicate links.
        links  = pydash.uniq(links)
        print(f'Fetched {len(links)} links.')     
        skip_if_less_than = 12
        divided_list = divide_list(links, ns, skip_if_less_than)

        result = self.parallel(
            self.save_google, divided_list, len(divided_list))
        fetched_results = pydash.flatten(result)

        new_results = clean(fetched_results, data)

        print(
            f'Filtered {len(new_results)} links from {len(fetched_results)}.')

        Output.write_json(new_results, pydash.kebab_case(keyword))
        Output.write_csv(new_results, pydash.kebab_case(keyword))

        filepath = os.path.join("output", keyword_kebab + ".json")
        with open(filepath, 'r') as f:
                file_content = f.read()
                file_hash = hashlib.md5(file_content.encode()).hexdigest()                      

        data_to_store = {
            "query": data,
            "hash": file_hash
        }
        LocalStorage.set_item(keyword_kebab, data_to_store)

        return new_results
