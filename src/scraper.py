from selenium.webdriver.common.by import By
import urllib.parse
from selenium.webdriver.common.by import By
from bose import BaseTask, Wait, Output


def write(result):
    Output.write_finished(result)
    Output.write_csv(result, "finished.csv")


def do_filter(ls, filter_data):
    def fn(i):

        min_rating = filter_data.get("min_rating")
        min_reviews = filter_data.get("min_reviews")
        max_reviews = filter_data.get("max_reviews")
        has_phone = filter_data.get("has_phone")
        has_website = filter_data.get("has_website")

        rating = i.get('rating')
        number_of_reviews = i.get('number_of_reviews')
        title = i.get("title")
        category = i.get("category")
        web_site = i.get("website")
        phone = i.get("phone")

        if min_rating != None:
            if rating == '' or rating is None or rating < min_rating:
                return False

        if min_reviews != None:
            if number_of_reviews == '' or number_of_reviews is None or number_of_reviews < min_reviews:
                return False


        if max_reviews != None:
            if number_of_reviews == '' or number_of_reviews is None or number_of_reviews > max_reviews:
                return False

        if has_website is not None:
            if has_website == False:
                if web_site is not None:
                    return False

        if has_phone is not None:
            if has_phone == True:
                if phone is None or phone == '':
                    return False

        return True

    return list(filter(fn, ls))


class Task(BaseTask):
    
    
    filter_data = {
            #  "min_rating" : 3, 
            #  "min_reviews" : 5, 
            #  "max_reviews" : 100, 
            #  "has_phone" : True, 
            #  "has_website" : False, 
        }

    GET_FIRST_PAGE = True
    queries = [
        "restaurants in jhajjar",
    ]
    
    def run(self, driver):
        def get_links(query):
            def scroll_till_end(times):
                def visit_gmap():

                    endpoint = f'maps/search/{urllib.parse.quote_plus(query)}'
                    url = f'https://www.google.com/{endpoint}'

                    driver.get_by_current_page_referrer(url)

                    if not driver.is_in_page(endpoint, Wait.LONG * 3):
                        print('Revisiting')
                        visit_gmap()

                visit_gmap()

                while True:
                    el = driver.get_element_or_none_by_selector(
                        '[role="feed"]', Wait.LONG)

                    if el is None:
                        visit_gmap()

                        return scroll_till_end(times + 1)
                    else:
                        has_scrolled = driver.scroll_element(el)

                        end_el = driver.get_element_or_none_by_text_contains(
                            "You've reached the end of the list.", Wait.SHORT)
                        if end_el is not None:
                            driver.scroll_element(el)
                            return

                        if not has_scrolled:
                            driver.sleep(0.1)
                            print('Scrolling...')
                        else:
                            print('Scrolling...')
                        if self.GET_FIRST_PAGE:
                            return
            scroll_till_end(1)

            def extract_links(elements):
                def extract_link(el):
                    return el.get_attribute("href")

                return list(map(extract_link, elements))

            els = driver.get_elements_or_none_by_selector(
                '[role="feed"]  [role="article"] > a', Wait.LONG)
            links = extract_links(els)

            Output.write_pending(links)

            print('Done Filter')

            return links

        def get_maps_data(links):
            def get_data(link):

                driver.get_by_current_page_referrer(link)

                tmp_elem = driver.get_element_or_none(
                    "//div[@class='TIHn2']", Wait.SHORT)
                out_dict = {}
                heading = driver.get_element_or_none_by_selector(
                    'h1', Wait.SHORT)

                if heading is not None:
                    out_dict['title'] = heading.text

                else:
                    out_dict['title'] = ''

                rating = driver.get_element_or_none_by_selector(
                    'div.F7nice', Wait.SHORT)

                if rating is not None:
                    val = rating.text
                else:
                    val = None

                if (val is None) or (val == ''):
                    out_dict['rating'] = None
                    out_dict['number_of_reviews'] = None
                else:
                    out_dict['rating'] = float(val[:3].replace(',', '.'))
                    num = ''
                    for c in val[3:]:
                        if c.isdigit():
                            num = num + c
                    if len(num) > 0:
                        out_dict['number_of_reviews'] = int(num)
                    else:
                        out_dict['number_of_reviews'] = None

                category = driver.get_element_or_none_by_selector(
                    'button[jsaction="pane.rating.category"]')
                out_dict['category'] = '' if category is None else category.text
                tmp_elem = driver.get_element_or_none("//div[@class='m6QErb']")

                def get_el_text(el):
                    if el is not None:
                        return el.text
                    return ''

                out_dict['address'] = get_el_text(
                    driver.get_element_or_none("//button[@data-item-id='address']"))
                out_dict['website'] = get_el_text(
                    driver.get_element_or_none("//a[@data-item-id='authority']"))
                out_dict['phone'] = get_el_text(driver.get_element_or_none(
                    "//button[starts-with(@data-item-id,'phone:tel:')]"))

                tmp_elem = driver.get_element_or_none_by_selector(
                    ".RZ66Rb.FgCUCc img")

                if tmp_elem is not None:
                    out_dict['img_link'] = tmp_elem.get_attribute("src")

                out_dict['link'] = link

                print(out_dict)

                return out_dict

            ls = list(map(get_data, links))
            return ls


        
        queries =  self.queries 

        def get_data():
            result = []

            driver.get_google()

            for q in queries:
                links = get_links(q)

                print(f'Fetched {len(links)} links.')

                # filter_data = {
                #     "min_reviews": 5,
                #     "has_website": False,
                # }

                a = get_maps_data(links)
                new_results = do_filter(a, self.filter_data)

                print(f'Filtered {len(new_results)} links from {len(a)}.')

                result = result + new_results

            return result

        result = get_data()
        write(result)
