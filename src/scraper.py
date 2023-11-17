from botasaurus import *
from src.extract_data import extract_data
from src.scraper_utils import create_search_link, perform_visit
from src.utils import convert_unicode_dict_to_ascii_dict, unique_strings
from .reviews_scraper import GoogleMapsAPIScraper
from time import sleep
def process_reviews(reviews):
    processed_reviews = []

    for review in reviews:
        # Convert user_photos and user_reviews to integers, handling None and commas
        user_photos = review.get("user_photos")
        number_of_photos_by_reviewer = user_photos
        # int(user_photos.replace(",", "").replace(".", "")) if user_photos else 0

        user_reviews = review.get("user_reviews")
        number_of_reviews_by_reviewer = user_reviews
        # int(user_reviews.replace(",", "").replace(".", "")) if user_reviews else 0

        lk = review.get("likes")
        processed_review = {
            "review_id": review.get("review_id"),
            "reviewer_name": review.get("user_name"),
            "rating": int(review.get("rating")),
            "review_text": review.get("text"),
            "published_at": review.get("relative_date"),
            "published_at_date": review.get("text_date"),
            "response_from_owner_text": review.get("response_text"),
            "response_from_owner_ago": review.get("response_relative_date"),
            "response_from_owner_date": review.get("response_text_date"),
            "review_likes_count": 0 if lk == -1 else lk,
            "total_number_of_reviews_by_reviewer": number_of_reviews_by_reviewer,
            "total_number_of_photos_by_reviewer": number_of_photos_by_reviewer,
            "reviewer_url": review.get("user_url"),
            "is_local_guide": review.get("user_is_local_guide"),
            "review_translated_text": review.get("translated_text"),
            "response_from_owner_translated_text": review.get("translated_response_text"),
            # "extracted_at": review.get("retrieval_date")
        }
        processed_reviews.append(processed_review)

    return convert_unicode_dict_to_ascii_dict(processed_reviews)


@request(

    cache=True,
    close_on_crash=True,
    output=None,

)
def scrape_reviews(requests: AntiDetectRequests, data):
    place_id = data["place_id"]
    link = data["link"]
    n_reviews = data["reviews"]

    reviews_max = data["reviews_max"]
    reviews_sort = data["reviews_sort"]
    lang = data["lang"]
    
    processed = []
    with GoogleMapsAPIScraper() as scraper:
        if reviews_max is None:
            max_r = n_reviews
        else:
            max_r = min(reviews_max, n_reviews)

        result = scraper.scrape_reviews(
            link,  max_r, lang, sort_by=reviews_sort
        )
        processed = process_reviews(result)
    
    return {"place_id":place_id, "reviews": processed}


cookies = None
def get_cookies():
         global cookies
         return cookies

def set_cookies(ck):
         global cookies
         cookies = ck

@request(
    parallel=5,
    async_queue=True,

    cache=True,
    close_on_crash=True,
    output=None,

    # TODO: IMPLEMENT AND UNCOMMENT
    max_retry=5,
    # retry_wait=30, {ADD}
    # request_interval=0.2, {ADD}

)
def scrape_place(requests: AntiDetectRequests, link):
        cookies = get_cookies()
        html =  requests.get(link,cookies=cookies,).text
        # Splitting HTML to get the part after 'window.APP_INITIALIZATION_STATE='
        initialization_state_part = html.split(';window.APP_INITIALIZATION_STATE=')[1]

        # Further splitting to isolate the APP_INITIALIZATION_STATE content
        app_initialization_state = initialization_state_part.split(';window.APP_FLAGS')[0]

        # Extracting data from the APP_INITIALIZATION_STATE
        data = extract_data(app_initialization_state, link)
        # data['link'] = link

        data['is_spending_on_ads'] = False
        cleaned = convert_unicode_dict_to_ascii_dict(data)
        return cleaned  


def merge_sponsored_links(places, sponsored_links):
    for place in places:
        place['is_spending_on_ads'] = place['link'] in sponsored_links

    return places

@browser(
    block_images=True,
    reuse_driver=True,
    keep_drivers_alive=True, 
    cache=True,
    close_on_crash=True,
    headless=True,
    output=None,
)
def scrape_places_by_links(driver: AntiDetectDriver, data):
    
    search_link = create_search_link("web developers in bangalore", "en", None, None)
    perform_visit(driver, search_link)

    set_cookies(driver.get_cookies_dict())
    
    scrape_place_obj: AsyncQueueResult = scrape_place()
    links = data["links"]
    scrape_place_obj.put(links)
    places = scrape_place_obj.get()

    sponsored_links = []
    places = merge_sponsored_links(places, sponsored_links)

    return places 

def get_lang(data):
     return data['lang']

@browser(
    block_images=True,
    reuse_driver=True,
    keep_drivers_alive=True, 
    cache=True,
    lang=get_lang,
    close_on_crash=True,
    headless=True,
    output=None,
)
def scrape_places(driver: AntiDetectDriver, data):
    
    # This fixes consent Issues in Countries like Spain 
    max_results = data['max']
    is_spending_on_ads = data['is_spending_on_ads']

    scrape_place_obj: AsyncQueueResult = scrape_place()

    sponsored_links = None
    def get_sponsored_links():
         nonlocal sponsored_links
         if sponsored_links is None:
              sponsored_links = driver.execute_file('get_sponsored_links.js')
         return sponsored_links



    def put_links():
                number_of_times_not_scrolled = 0
                set_cookies(driver.get_cookies_dict())
                while True:
                    el = driver.get_element_or_none_by_selector(
                        '[role="feed"]', bt.Wait.LONG)
                    if el is None:
                        if driver.is_in_page("/maps/search/"):
                        # No Feeds Eg: https://www.google.com/maps/search/this+should+retuen+absolutely+mothoing+hahahahahahaha/@37.6,-95.665,4z?entry=ttu
                            rst = []
                        elif driver.is_in_page("/maps/place/"):
                            rst = [driver.current_url]
                            scrape_place_obj.put(rst)
                        return
                    else:
                        did_element_scroll = driver.scroll_element(el)

                        links = None
                        
                        if max_results is None:
                            links = driver.links(
                                '[role="feed"] >  div > div > a', bt.Wait.LONG)
                        else:
                            links = unique_strings(driver.links(
                                '[role="feed"] >  div > div > a', bt.Wait.LONG))[:max_results]
                                                    
                        
                        if is_spending_on_ads:
                            scrape_place_obj.put(get_sponsored_links())
                            return 
                            
                        scrape_place_obj.put(links)


                        if max_results is not None and len(links) >= max_results:
                            return

                        end_el = driver.get_element_or_none_by_selector(
                            "p.fontBodyMedium > span > span", bt.Wait.SHORT)

                        if end_el is not None:
                            driver.scroll_element(el)
                            return

                        if not did_element_scroll:
                            sleep(0.1)
                            number_of_times_not_scrolled += 1

                            MAX_SCROLL_ATTEMPS = 20
                            if number_of_times_not_scrolled > MAX_SCROLL_ATTEMPS:
                                print(
                                    'Google Maps was Stuck in Scrolling. So returning.')
                                return

                            # print('Scrolling...')
                        else:
                            number_of_times_not_scrolled = 0
                            # print('Scrolling...')
    
    search_link = create_search_link(data['query'], data['lang'], data['geo_coordinates'], data['zoom'])
    
    perform_visit(driver, search_link)
    
    # bt.prompt()
    
    put_links()

    places = scrape_place_obj.get()

    sponsored_links = get_sponsored_links() 
    places = merge_sponsored_links(places, sponsored_links)
    
    return {"query": data['query'], "places":places} 

if __name__ == "__main__":
    print(scrape_places(["restaurants in delhi"]))

