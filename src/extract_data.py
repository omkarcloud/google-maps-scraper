import re as rex
import json
from datetime import datetime

from src.scraper_utils import create_search_link

def toiso(date):
    return date.isoformat() 

def convert_timestamp_to_iso_date(timestamp):
    # Convert from microseconds to milliseconds
    milliseconds = int(timestamp) / 1000
    # Create a new Date object
    date = datetime.utcfromtimestamp(milliseconds)
    # Return the date in the specified format
    return toiso(date)


def clean_link(link):
    if link is not None:
        # Remove everything starting from "&opi"
        opi_index = link.find('&opi')
        if opi_index != -1:
            link = link[:opi_index]

        # Remove "/url?q=" if it's at the start of the link
        if link.startswith('/url?q='):
            link = link[len('/url?q='):]

    return link
def safe_get(data, *keys):
    for key in keys:
        try:
            data = data[key]
        except (IndexError, TypeError, KeyError):
            return None
    return data

def get_categories(data):
    return safe_get(data, 6, 13)

def get_place_id(data):
    return safe_get(data, 6, 78)



def get_hl_from_link_competitors(link):
        # Regular expression to find the 'hl' parameter in the URL
        match = rex.search(r"[?&]hl=([^&]+)", link)
        
        # If found, return the value, otherwise return 'en'
        return match.group(1) if match else None

def extract_google_maps_contributor_url(input_url):
    if input_url is not None:
        # Define a regular expression pattern to match the desired URL
        pattern = r'https://www\.google\.com/maps/contrib/\d+'
        
        # Use re.search to find the first match in the input_url
        match = rex.search(pattern, input_url)
        
        if match:
            # Extract the matched URL
            contributor_url = match.group(0)
            
            # Add "/reviews?entry=ttu" to the end of the URL
            contributor_url += '/reviews?entry=ttu'
            
            return contributor_url
        else:
            return None

def get_rating(data):
    return safe_get(data, 6, 4, 7)

def get_reviews(data):
    return safe_get(data, 6, 4, 8)

def get_price_range(data):
    rs = safe_get(data, 6, 4, 2)
    
    if rs is not None:
        return len(rs) * "$" 

def get_title(data):
    return safe_get(data, 6, 11)

def get_address(data):
    return safe_get(data, 6, 18)

def get_website(data):
    return clean_link(safe_get(data, 6, 7, 0))

def get_main_category(data):
    return safe_get(data, 6, 13, 0)

def parse(data):
    # Assuming 'input_string' is provided to the function in some way
    input_string = json.loads(data)[3][6]  # Replace with actual input
    substring_to_remove = ")]}'"

    modified_string = input_string
    if input_string.startswith(substring_to_remove):
        modified_string = input_string[len(substring_to_remove):]

    return json.loads(modified_string)

def get_hl_from_link(link):
    # Regular expression to find the 'hl' parameter in the URL
    match = rex.search(r"[?&]hl=([^&]+)", link)
    
    # If found, return the value, otherwise return 'en'
    return match.group(1) if match else 'en'

def extract_business_name(url):
    # Regular expression to match the pattern in the URL
    match = rex.search(r"maps/place/([^/]+)", url)
    if match:
        return match.group(1)
    return None


def find_most_common_element(ls):
    if not ls:
        return None  # Handle empty list case

    # Dictionary to count occurrences of each element
    element_count = {}
    for element in ls:
        if element in element_count:
            element_count[element] += 1
        else:
            element_count[element] = 1

    # Find the most common element
    max_count = max(element_count.values())
    common_elements = [k for k, v in element_count.items() if v == max_count]

    # Return the first element if all occur equally, else return the most common one
    return common_elements[0]


def parse_extract_possible_map_link(data):
    # Assuming 'input_string' is provided to the function in some way
    loaded = json.loads(data)
    
    input_string = safe_get(loaded,3,-1)   # Replace with actual input
    substring_to_remove = ")]}'"

    modified_string = input_string
    if input_string.startswith(substring_to_remove):
        modified_string = input_string[len(substring_to_remove):]

    return json.loads(modified_string)

def perform_extract_possible_map_link(input_str):
    data = parse_extract_possible_map_link(input_str)
    return safe_get(data, 6, 27) or safe_get(data, 0, 1, 0, 14, 27)

def extract_data(input_str, link):
    data = parse(input_str)

    categories = get_categories(data)
    place_id = get_place_id(data)
   

    title = get_title(data)
    
    rating = get_rating(data)
    reviews = get_reviews(data)
    address = get_address(data)
    website = get_website(data)
    main_category = get_main_category(data)
    return {
        'place_id': place_id,
        'name': title,
        'link':link,
        'main_category': main_category,
        'categories': categories,
        'rating': rating,
        'reviews': reviews,
        'address': address,
        'website':website
    }