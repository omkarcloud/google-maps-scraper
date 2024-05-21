import urllib.parse

def perform_visit(driver, link:str):
    def visit_gmap_with_consent():
                    driver.google_get(link, accept_google_cookies=True)


    def visit_gmap_simple():
                    driver.get_via_this_page(link)
     

    if driver.config.is_new:
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
        geo_coordinates = remove_spaces(geo_coordinates)
        if zoom is not None:
            geo_str = f'/@{geo_coordinates},{zoom}z'
        else:
            geo_str = f'/@{geo_coordinates}'

    # Constructing the final URL
    url = f'https://www.google.com/maps/search/{endpoint}'
    if geo_str:
        url += geo_str
    url += f'?{urllib.parse.urlencode(params)}'

    return url

