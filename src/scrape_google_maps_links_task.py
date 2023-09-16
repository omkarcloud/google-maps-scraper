import urllib.parse
from bose import *
from src.scrape_google_maps_places_task import ScrapeGoogleMapsPlacesTask
from .config import number_of_scrapers, queries
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


def do_sort(data, config):
    if config.get('sort') is None:
        return data

    def sorting_key(item):
        sorting_by = config["sort"].get("by")
        result = item.get(sorting_by, 0)

        if result is None:
            return 0

        return result

    sorting_order = config["sort"].get("order", "desc")

    sorted_data = sorted(data, key=sorting_key,
                         reverse=(sorting_order == "desc"))

    return sorted_data
#


def do_filter(ls, filter_data):
    def fn(i):
        min_rating = filter_data.get("min_rating")
        min_reviews = filter_data.get("min_reviews")
        max_reviews = filter_data.get("max_reviews")
        has_phone = filter_data.get("has_phone")
        has_website = filter_data.get("has_website")

        rating = i.get('rating')
        reviews = i.get('reviews')
        web_site = i.get("website")
        phone = i.get("phone")

        if min_rating is not None and (rating == '' or rating is None or rating < min_rating):
            return False

        if min_reviews is not None and (reviews == '' or reviews is None or reviews < min_reviews):
            return False

        if max_reviews is not None and (reviews == '' or reviews is None or reviews > max_reviews):
            return False

        if has_website is not None and (has_website is False and web_site is not None):
            return False

        if has_phone is not None and (has_phone is True and (phone is None or phone == '')):
            return False

        return True

    return list(filter(fn, ls))


def sort_dict_by_keys(dictionary, keys):
    new_dict = {}
    for key in keys:
        new_dict[key] = dictionary[key]
    return new_dict


def clean(data_list, query):
    keys = query.get("select", 'ALL')

    if keys == 'ALL':
        keys = ["title",
                "link",
                "main_category",
                "rating",
                "reviews",
                "website",
                "phone",
                "address",
                "place_id",
                "status",
                "price_range",
                "description",
                "reviews_per_rating",
                "reviews_link",
                "thumbnail",
                "images",
                "hours",
                "menu",
                "order_online_links",
                "reservations",
                "owner",
                "categories",
                "coordinates",
                "plus_code",
                "complete_address",
                "time_zone",
                "about",
                "user_reviews",
                "cid",
                "data_id"
                ]
    new_results = do_filter(data_list, query)
    new_results = do_sort(new_results, query)

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
        # Reset queries
        return queries

    def run(self, driver, data):
        keyword = data['keyword']
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

        return new_results
