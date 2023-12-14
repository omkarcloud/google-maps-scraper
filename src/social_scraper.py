from botasaurus import request as rq, bt
from botasaurus.cache import DontCache
import requests
from time import sleep

FAILED_DUE_TO_CREDITS_EXHAUSTED = "FAILED_DUE_TO_CREDITS_EXHAUSTED"
FAILED_DUE_TO_NOT_SUBSCRIBED = "FAILED_DUE_TO_NOT_SUBSCRIBED"
FAILED_DUE_TO_UNKNOWN_ERROR = "FAILED_DUE_TO_UNKNOWN_ERROR"

def update_credits():
    credits_used  = bt.LocalStorage.get_item("credits_used", 0)
    bt.LocalStorage.set_item("credits_used", credits_used + 1)

def do_request(data, retry_count=3):
    
    place_id = data["place_id"]
    website = data["website"]
    key = data["key"]

    if retry_count == 0:
        print(f"Failed to get Social details for {website}, after 3 retries")
        return DontCache(None)

    url = "https://website-contacts-scraper.p.rapidapi.com/scrape-contacts"
    querystring = {"query": website, "match_email_domain": "false"}
    headers = {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "website-contacts-scraper.p.rapidapi.com"
    }

    
    response = requests.get(url, headers=headers, params=querystring)
    response_data = response.json()
    if response.status_code == 200:
        update_credits()

        final = response_data.get('data', [None])[0]
        
        if "pinterest" not in final:
            final["pinterest"] = None

        final["phones"] = final["phone_numbers"]
        

        del final["phone_numbers"]
        del final["domain"]
        del final["query"]

        
        return {
            "place_id": place_id,
            "data": final,
            "error": None
        }
    else: 
        message = response_data.get("message", "")
        if "exceeded the MONTHLY quota" in message:
            return  DontCache({
                        "place_id": place_id,
                        "data":  None,
                        "error":FAILED_DUE_TO_CREDITS_EXHAUSTED
                    })
        elif "exceeded the rate limit per second for your plan" in message or "many requests" in message:
            sleep(2)
            return do_request(data, retry_count - 1)
        elif "You are not subscribed to this API." in message:
            
            return DontCache({
                        "place_id": place_id,
                        "data": None,
                        "error": FAILED_DUE_TO_NOT_SUBSCRIBED
                    })

        print(f"Error: {response.status_code}", response_data)
        return  DontCache({
                        "place_id": place_id,
                        "data":  None,
                        "error":FAILED_DUE_TO_UNKNOWN_ERROR
                    })


@rq(
    close_on_crash=True,
    output=None,
    )
def perform_scrape_social(reqs, data):
    return do_request(data)

@rq(
    close_on_crash=True,
    output=None,
    )
def perform_scrape_social_pro(reqs, data):
    return do_request(data)

def is_free():
    FREE_CREDITS_PLUS_10 = 60
    # Assuming bt.LocalStorage is used to get the credits_used value
    credits_used = bt.LocalStorage.get_item("credits_used", 0)
    return credits_used < FREE_CREDITS_PLUS_10

def scrape_social(social_data, cache):
    free = is_free()
    if free:
        return perform_scrape_social(social_data, cache=cache)
    else:
        return perform_scrape_social_pro(social_data, cache=cache)
