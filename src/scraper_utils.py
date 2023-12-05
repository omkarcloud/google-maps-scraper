import urllib.parse
from botasaurus import AntiDetectDriver

def perform_visit(driver: AntiDetectDriver, link:str):
    def visit_gmap_with_consent():
                    driver.organic_get(link, accept_cookies=True)
                    
                    # if driver.is_in_page("https://consent.google.com/"):
                    #     agree_button_selector = 'form:nth-child(2) > div > div > button'
                    #     driver.click(agree_button_selector)
                        # driver.organic_get(link)


                    # if not driver.is_in_page('maps/search/', bt.Wait.LONG):
                    #     if driver.is_in_page("consent.google.com", bt.Wait.SHORT):
                    #         el = driver.get_element_or_none_by_selector(
                    #             'form:nth-child(2) > div > div > button', bt.Wait.LONG)
                    #         el.click()
                    #     visit_gmap_with_consent()

    def visit_gmap_simple():
                    driver.get_by_current_page_referrer(link)
     

    if driver.about.is_new:
        visit_gmap_with_consent()
    else: 
        visit_gmap_simple()
        
def remove_spaces(input_string):
    # Use str.replace() to replace spaces with an empty string
    result_string = input_string.replace(" ", "")
    return result_string

def create_search_link(query: str, lang, geo_coordinates, zoom):
    # Check for invalid combination of geo_coordinates and zoom
    if geo_coordinates is None and zoom is not None:
        raise ValueError("geo_coordinates must be provided along with zoom")

    # URL encoding the query
    endpoint = urllib.parse.quote_plus(query)

    # Basic parameters
    params = {
            'authuser': '0',
            'hl': lang,
            'entry': 'ttu',

    } if lang is not None else {
            'authuser': '0',
            'entry': 'ttu',
          
    }


    # Constructing the geo-coordinates string
    geo_str = ""
    if geo_coordinates is not None:
        if zoom is not None:
            geo_str = f'/@{remove_spaces(geo_coordinates)},{zoom}z'
        else:
            geo_str = f'/@{remove_spaces(geo_coordinates)}'

    # Constructing the final URL
    url = f'https://www.google.com/maps/search/{endpoint}'
    if geo_str:
        url += geo_str
    url += f'?{urllib.parse.urlencode(params)}'

    return url

