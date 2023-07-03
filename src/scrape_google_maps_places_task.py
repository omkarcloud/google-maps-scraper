from bose import *
from pydash import kebab_case

class ScrapeGoogleMapsPlacesTask(BaseTask):
    task_config = TaskConfig(output_filename = "all", close_on_crash=True)

    browser_config = BrowserConfig(
        is_eager = True,
        headless = True,
    )
    
    def get_data(self):
        return LocalStorage.get_item('queries', [])

    def run(self, driver, data):
        links = data['links']
        query = data['query']

        def do_filter(ls, filter_data):
            def fn(i):

                min_rating = filter_data.get("min_rating")
                min_reviews = filter_data.get("min_reviews")
                max_reviews = filter_data.get("max_reviews")
                has_phone = filter_data.get("has_phone")
                has_website = filter_data.get("has_website")

                rating = i.get('rating')
                number_of_reviews = i.get('number_of_reviews')
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
                
                tmp_elem = driver.get_element_or_none("//div[@class='m6QErb']")

                def get_el_text(el):
                    if el is not None:
                        return el.text
                    return ''

                out_dict['address'] = get_el_text(
                    driver.get_element_or_none_by_selector("button[data-item-id='address']"))
                
                website_el = driver.get_element_or_none_by_selector("a[data-item-id='authority']")
                
                if website_el is not None:
                    out_dict['website'] = website_el.get_attribute("href")
                else:
                    out_dict['website'] = ''
                
                phone_el = driver.get_element_or_none(
                    "//button[starts-with(@data-item-id,'phone')]")


                if phone_el is not None:
                    out_dict['phone'] = phone_el.get_attribute("data-item-id").replace("phone:tel:", "")
                else:
                    out_dict['phone'] = ''

                tmp_elem = driver.get_element_or_none_by_selector(
                    ".RZ66Rb.FgCUCc img")

                if tmp_elem is not None:
                    out_dict['img_link'] = tmp_elem.get_attribute("src")

                out_dict['link'] = link
                out_dict['main_category'] = '' if category is None else category.text
                
                data =  driver.execute_script('''
function get_categories() {
    let inputString = window.APP_INITIALIZATION_STATE[3][6]
    let substringToRemove = ")]}'";
    
    let modifiedString
    if (inputString.startsWith(substringToRemove)) {
        modifiedString = inputString.slice(substringToRemove.length);
      } else {
      }
    
    let parsed = JSON.parse (modifiedString);
    
    let categories  = parsed [6][13]
    let place_id  = parsed [6][78]
    return [place_id, categories]
}
return get_categories()
                ''')

                place_id = data[0]
                all_categories = data[1]
                out_dict['place_id'] =  place_id
                out_dict['categories'] =  ', '.join(all_categories)

                print(out_dict)
                # driver.prompt()
                return out_dict

            ls = list(map(get_data, links))
            return ls

        driver.get_google()
        
        a = get_maps_data(links)
        new_results = do_filter(a, query)

        print(f'Filtered {len(new_results)} links from {len(a)}.')
        
        Output.write_json(new_results, kebab_case(query['keyword']))
        Output.write_csv(new_results, kebab_case(query['keyword']))

        return new_results