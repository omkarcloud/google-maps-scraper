import sys
from javascript_fixes.errors import JavaScriptError
import requests
from botasaurus import *
from hashlib import md5
from botasaurus import cl
from botasaurus.cache import DontCache
from src.extract_data import extract_data, perform_extract_possible_map_link
from src.scraper_utils import create_search_link, perform_visit
from src.utils import unique_strings
from .reviews_scraper import GoogleMapsAPIScraper
from time import sleep, time
from botasaurus.utils import retry_if_is_error
from selenium.common.exceptions import  StaleElementReferenceException
from botasaurus.create_stealth_driver import create_stealth_driver

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
            "review_id_hash": md5(review.get("review_id").encode('utf-8')).hexdigest(),
            "rating": int(review.get("rating")),
            "review_text": review.get("text"),
            "published_at": review.get("relative_date"),
            "published_at_date": review.get("text_date"),
            "response_from_owner_text": review.get("response_text"),
            "response_from_owner_ago": review.get("response_relative_date"),
            "response_from_owner_date": review.get("response_text_date"),
            "review_likes_count": 0 if lk <= -1 else lk,
            "total_number_of_reviews_by_reviewer": number_of_reviews_by_reviewer,
            "total_number_of_photos_by_reviewer": number_of_photos_by_reviewer,
            "is_local_guide": review.get("user_is_local_guide"),
            "review_translated_text": review.get("translated_text"),
            "response_from_owner_translated_text": review.get("translated_response_text"),
            # "extracted_at": review.get("retrieval_date")
        }
        processed_reviews.append(processed_review)

    return processed_reviews


@request(

    close_on_crash=True,
    output=None,

)
def scrape_reviews(requests: AntiDetectRequests, data):
    place_id = data["place_id"]
    link = data["link"]

    max_r = data["max"]

    reviews_sort = data["reviews_sort"]
    lang = data["lang"]
    
    processed = []
    with GoogleMapsAPIScraper() as scraper:

        result = scraper.scrape_reviews(
            link,  max_r, lang, sort_by=reviews_sort
        )
        processed = process_reviews(result, )
    
    return {"place_id":place_id, "reviews": processed}



@request(
    parallel=5,
    async_queue=True,

    close_on_crash=True,
    output=None,
    use_stealth=True, 

    # TODO: IMPLEMENT AND UNCOMMENT
    max_retry=5,
    retry_wait=5,
    # request_interval=0.2, {ADD}
)
def scrape_place(requests: AntiDetectRequests, link, metadata):
        cookies = metadata["cookies"]
        
        try:
            html =  requests.get(link,cookies=cookies, timeout=12,).text
            # Splitting HTML to get the part after 'window.APP_INITIALIZATION_STATE='
            initialization_state_part = html.split(';window.APP_INITIALIZATION_STATE=')[1]

            # Further splitting to isolate the APP_INITIALIZATION_STATE content
            app_initialization_state = initialization_state_part.split(';window.APP_FLAGS')[0]

            # Extracting data from the APP_INITIALIZATION_STATE
            data = extract_data(app_initialization_state, link)
            # data['link'] = link

            data['is_spending_on_ads'] = False
            cleaned = data
            
            return cleaned  
        except Exception as e:
            raise

def extract_possible_map_link(html):
        try:
            # Splitting HTML to get the part after 'window.APP_INITIALIZATION_STATE='
            initialization_state_part = html.split(';window.APP_INITIALIZATION_STATE=')[1]

            # Further splitting to isolate the APP_INITIALIZATION_STATE content
            app_initialization_state = initialization_state_part.split(';window.APP_FLAGS')[0]
            # Extracting data from the APP_INITIALIZATION_STATE
            link = perform_extract_possible_map_link(app_initialization_state,)
            # print(link)
            if link and cl.extract_path_from_link(link).startswith("/maps/place"):
                return link
        except:
            return None

def merge_sponsored_links(places, sponsored_links):
    for place in places:
        place['is_spending_on_ads'] = place['link'] in sponsored_links

    return places

def get_lang(data):
     return data['lang']

class StuckInGmapsException(Exception):
    pass

def is_running_on_gcp():
    try:
        response = requests.get(
            "http://metadata.google.internal/computeMetadata/v1/instance",
            headers={"Metadata-Flavor": "Google"},
        )
        return response.status_code == 200  # Success
    except requests.exceptions.RequestException:
        return False  # Assume not on GCP if request fails 

t = create_stealth_driver(
        start_url=None,
    )
def wrapperfn(data, options, desired_capabilities):
    try:
        return t(data, options, desired_capabilities)
    except Exception as e:
        isTimeoutError = ("Timed out accessing" in str(e) or "Timed out accessing" in e.js or "Timed out accessing" in e.py)
        if isTimeoutError and is_running_on_gcp():
            print("Connection to node js failed. Exiting.")
            sys.exit(1)
        raise
    
@browser(
    create_driver= wrapperfn,      
    lang=get_lang,
    close_on_crash=True,
    max_retry = 3,
    headless=True,
    output=None,
)
def scrape_places(driver: AntiDetectDriver, data):
    # This fixes consent Issues in Countries like Spain 
    max_results = data['max']

    scrape_place_obj: AsyncQueueResult = scrape_place()

    sponsored_links = None
    def get_sponsored_links():
         nonlocal sponsored_links
         if sponsored_links is None:
              sponsored_links = driver.execute_script('''function get_sponsored_links() {
  try {

    // Get all elements with the "Sponsored" text in the h1 tag.
    const sponsoredLinks = [...document.querySelectorAll('.kpih0e.f8ia3c.uvopNe')]
    
    // Extract the parent <div> elements of the sponsored links.
    const sponsoredDivs = sponsoredLinks.map(link => link.closest('.Nv2PK'));
    
    // Extract the links (href) from the sponsored <a> tags.
    const sponsoredLinksList = sponsoredDivs.map(div => div.querySelector('a').href);

    return sponsoredLinksList    
  } catch (error) {
    return []
  }
}

return get_sponsored_links()''')
         return sponsored_links



    def put_links():
                start_time = time()
                
                WAIT_TIME = 40 # WAIT 40 SECONDS

                metad = {"cookies":driver.get_cookies_dict()}
                if data['links']:
                  scrape_place_obj.put(data['links'], metadata = metad)
                  return
                while True:
                    el = driver.get_element_or_none_by_selector(
                        '[role="feed"]', bt.Wait.LONG)
                    if el is None:
                        if driver.is_in_page("/maps/search/"):
                            link = extract_possible_map_link(driver.page_source)
                            if link:
                                rst = [link]
                                scrape_place_obj.put(rst, metadata = metad)
                            rst = []
                        elif driver.is_in_page("/maps/place/"):
                            rst = [driver.current_url]
                            scrape_place_obj.put(rst, metadata = metad)
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
                                                    
                        
                            
                        scrape_place_obj.put(links, metadata = metad)


                        if max_results is not None and len(links) >= max_results:
                            return

                        # TODO: If Proxy is Given Wait for None, and only use wait to Make it Faster, Example Code 
                        # end_el_wait = bt.Wait.SHORT if driver.about.is_retry else None

                        end_el_wait = bt.Wait.SHORT
                        end_el = driver.get_element_or_none_by_selector(
                            "p.fontBodyMedium > span > span", end_el_wait)

                        if end_el is not None:
                            driver.scroll_element(el)
                            return
                        elapsed_time = time() - start_time

                        if elapsed_time > WAIT_TIME :
                            print('Google Maps was stuck in scrolling. Retrying after a minute.')
                            sleep(63)
                            raise StuckInGmapsException()                           
                            # we increased speed so occurence if higher than 
                            #   - add random waits
                            #   - 3 retries  
                             
                        if did_element_scroll:
                            start_time = time()
                        else:
                            sleep_time = 0.1
                            sleep(sleep_time)
    
    search_link = create_search_link(data['query'], data['lang'], data['geo_coordinates'], data['zoom'])
    
    perform_visit(driver, search_link)
    
    
    STALE_RETRIES = 5
    # TODO
    # I need to ask to restart browser 
    # use proxy addition
    failed_to_scroll = False
    def on_failed_after_retry_exhausted(e):
        nonlocal failed_to_scroll
        failed_to_scroll = True
        print('Failed to scroll after 5 retries. Skipping.')

#         print('''Google has silently blocked IP. Kindly follow these Steps to change IP.
# # If using Wifi:
# #     - Turn Router off and on 
# # If using Mobile Data
# #     - Connect your PC to the Internet via a Mobile Hotspot.
# #     - Toggle airplane mode off and on on your mobile device. This will assign you a new IP address.
# #     - Turn the hotspot back on.                      
# # ''')
    try:
      retry_if_is_error(put_links, [StaleElementReferenceException], STALE_RETRIES, raise_exception=False
                    #   , on_failed_after_retry_exhausted=on_failed_after_retry_exhausted
                      )
    # todo remove check later      
      if driver.about.is_retry:
          print("This time, Google Maps did not get stuck while scrolling and successfully scrolled to the end.")
    
    except StuckInGmapsException as e:
      if driver.about.is_last_retry:
          on_failed_after_retry_exhausted(e)
      else:
          raise e
    
    


    places = scrape_place_obj.get()

    hasnone = False
    for place in places:
      if place is None:
        hasnone = True
        break
    
    places = bt.remove_nones(places)

    
    sponsored_links = [] if data['links'] else get_sponsored_links() 
    places = merge_sponsored_links(places, sponsored_links)
    

    result = {"query": data['query'], "places": places}
    
    if failed_to_scroll:
        return DontCache(result)

    if hasnone:
        return DontCache(result)

    return result 

# python -m src.scraper
if __name__ == "__main__":
    print(scrape_places({'query': 'Web Developers   in Bangalore', 'max': 1, 'lang': None, 'geo_coordinates': '', 'zoom': 14, 'links':[]}))
    # print(scrape_place(["https://www.google.com/maps/place/Hisn+Yakka/@38.6089019,-1.1214893,17z/data=!3m1!4b1!4m6!3m5!1s0xd63fd22e0c22e1f:0xc2d606310f68bc26!8m2!3d38.6089019!4d-1.1214893!16s%2Fg%2F11p06xtf82?authuser=0&entry=ttu"] , metadata={}))