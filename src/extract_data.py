import re as rex
import json
from datetime import datetime
from botasaurus import bt

def get_image_id(img):
    return bt.extract_path_from_link(img).split("/")[-1].split("=")[0]

def change_image_to_high_res(img):
    if img:
        domain = bt.extract_domain_from_link(img)
        if "googleusercontent." in domain:
            id = get_image_id(img)
            return f"https://lh3.ggpht.com/p/{id}=s1024"
        return img
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

def get_complete_address(data):
    ward = safe_get(data, 6, 183, 1, 0)
    street = safe_get(data, 6, 183, 1, 1)
    city = safe_get(data, 6, 183, 1, 3)
    postal_code = safe_get(data, 6, 183, 1, 4)
    state = safe_get(data, 6, 183, 1, 5)
    country_code = safe_get(data, 6, 183, 1, 6)

    result = {
        "ward": ward,
        "street": street,
        "city": city,
        "postal_code": postal_code,
        "state": state,
        "country_code": country_code,
    }
    return result

def get_reviews_link(data):
    return clean_link(safe_get(data, 6, 4, 3, 0))

def get_title(data):
    return safe_get(data, 6, 11)

def get_rating(data):
    return safe_get(data, 6, 4, 7) or 0

def get_reviews(data):
    return safe_get(data, 6, 4, 8) or 0

def get_address(data):
    return safe_get(data, 6, 39) or safe_get(data, 6, 37,0,0,17,0)

def get_website(data):
    return clean_link(safe_get(data, 6, 7, 0))

def get_main_category(data):
    return safe_get(data, 6, 13, 0)

def clean_link(link):
    if link is not None:
        # Remove everything starting from "&opi"
        opi_index = link.find("&opi")
        if opi_index != -1:
            link = link[:opi_index]

        # Remove "/url?q=" if it's at the start of the link
        if link.startswith("/url?q="):
            link = link[len("/url?q=") :]

    return link

def parse(data):
    # Assuming 'input_string' is provided to the function in some way
    input_string = json.loads(data)[3][6]  # Replace with actual input
    substring_to_remove = ")]}'"

    modified_string = input_string
    if input_string.startswith(substring_to_remove):
        modified_string = input_string[len(substring_to_remove) :]

    return json.loads(modified_string)

def get_hl_from_link(link):
    # Regular expression to find the 'hl' parameter in the URL
    match = rex.search(r"[?&]hl=([^&]+)", link)

    # If found, return the value, otherwise return 'en'
    return match.group(1) if match else "en"

def extract_business_name(url):
    # Regular expression to match the pattern in the URL
    match = rex.search(r"maps/place/([^/]+)", url)
    if match:
        return match.group(1)
    return None

def generate_google_reviews_url(placeid, query, authuser, hl, gl):
    base_url = "https://search.google.com/local/reviews"
    params = {"placeid": placeid, "q": query, "authuser": authuser, "hl": hl, "gl": gl}
    query_string = "&".join(f"{key}={value}" for key, value in params.items())
    full_url = f"{base_url}?{query_string}"
    return full_url

def get_user_reviews(data):
    rvs = safe_get(data, 6, 175, 9, 0, 0) or []
    ls = []

    for element in rvs:
        element = element[0]
        when, rating, description = (
            safe_get(element,1, 6),
            safe_get(element,2, 0, 0),
            safe_get(element, 2, 15, 0, 0),
        )
        images = get_review_images(safe_get(element, 2, 2) or [])
        review_id = element[0]

        review_translated_text = safe_get(element, 2, 15, 1, 0)
        response_from_owner_translated_text = safe_get(element, 3 ,14, 1, 0) or None
        response_from_owner_text = safe_get(element, 3 ,14, 0, 0) or None

        published_at_date = safe_get(element, 1,2) or safe_get(element, 1,3) or None
        if published_at_date:
            published_at_date = convert_timestamp_to_iso_date(published_at_date/1000)

        response_from_owner_ago = safe_get(element, 3, 3) or safe_get(element, 3, 4) or None
        response_from_owner_date = (
            safe_get(element, 3,1) or safe_get(element, 3,2) or None
        )
        
        if response_from_owner_date:
            response_from_owner_date = convert_timestamp_to_iso_date(
                response_from_owner_date/1000
            )

        total_number_of_reviews_by_reviewer = safe_get(element, 1,4, 0, 1)
        total_number_of_photos_by_reviewer = safe_get(element, 1,4, 0, 2)
        review_likes_count = safe_get(element, 4,1)

        is_local_guide = safe_get(element, 1, 4, 0, 12,0)
        if is_local_guide is not None:
            is_local_guide = "local " in is_local_guide.lower()
        else:
            is_local_guide = False
        
        item = {
                "review_id": review_id,
                "rating": rating,
                "review_text": description,
                "published_at": when,
                "published_at_date": published_at_date,
                "response_from_owner_text": response_from_owner_text,
                "response_from_owner_ago": response_from_owner_ago,
                "response_from_owner_date": response_from_owner_date,
                "review_likes_count": review_likes_count,
                "total_number_of_reviews_by_reviewer": total_number_of_reviews_by_reviewer,
                "total_number_of_photos_by_reviewer": total_number_of_photos_by_reviewer,
                "is_local_guide": is_local_guide,
                "review_translated_text": review_translated_text,
                "response_from_owner_translated_text": response_from_owner_translated_text,
                "review_photos": images,
            }
        ls.append(item)
    return ls

def get_review_images(data):
    ls = []
    for x in data:
            img = safe_get(x, 1,6,0)
            ls.append(change_image_to_high_res(img))
    return ls

def convert_timestamp_to_iso_date(timestamp):
    # Convert from microseconds to milliseconds
    milliseconds = int(timestamp/1000) 
    # Create a new Date object
    date = datetime.utcfromtimestamp(milliseconds)
    # Return the date in the specified format
    return toiso(date)

def toiso(date):
    return date.isoformat()

def parse_extract_possible_map_link(data):
    # Assuming 'input_string' is provided to the function in some way
    loaded = json.loads(data)

    input_string = safe_get(loaded, 3, -1)  # Replace with actual input
    substring_to_remove = ")]}'"

    modified_string = input_string
    if input_string.startswith(substring_to_remove):
        modified_string = input_string[len(substring_to_remove) :]

    return json.loads(modified_string)


def perform_extract_possible_map_link(input_str):
    data = parse_extract_possible_map_link(input_str)
    return safe_get(data, 6, 27) or safe_get(data, 0, 1, 0, 14, 27)

def extract_data(input_str, link):
    data = parse(input_str)

    categories = get_categories(data)
    place_id = get_place_id(data)
    complete_address = get_complete_address(data)
    reviews_link = get_reviews_link(data)
    if reviews_link is None:
        gl = complete_address["country_code"]
        hl = get_hl_from_link(link)
        query = extract_business_name(link)
        reviews_link = generate_google_reviews_url(place_id, query, 0, hl, gl)

    title = get_title(data)

    rating = get_rating(data)
    reviews = get_reviews(data)
    address = get_address(data)
    website = get_website(data)
    main_category = get_main_category(data)

    user_reviews = get_user_reviews(data)
    
    return {
        "place_id": place_id,
        "name": title,
        "reviews": reviews,
        "website": website,
        "main_category": main_category,
        "categories": categories,
        "rating": rating,
        "address": address,
        "link": link,
        "featured_reviews": user_reviews,
    }