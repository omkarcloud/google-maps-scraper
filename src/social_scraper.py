from botasaurus.task import task
from botasaurus.local_storage import LocalStorage
from botasaurus.cache import DontCache
import requests
from time import sleep

FAILED_DUE_TO_CREDITS_EXHAUSTED = "FAILED_DUE_TO_CREDITS_EXHAUSTED"
FAILED_DUE_TO_NOT_SUBSCRIBED = "FAILED_DUE_TO_NOT_SUBSCRIBED"
FAILED_DUE_TO_UNKNOWN_ERROR = "FAILED_DUE_TO_UNKNOWN_ERROR"

def update_credits():
    credits_used  = LocalStorage.get_item("credits_used", 0)
    LocalStorage.set_item("credits_used", credits_used + 1)

def do_request(data, retry_count=3):
    
    place_id = data["place_id"]
    website = data["website"]
    key = data["key"]

    if retry_count == 0:
        print(f"Failed to get Social details for {website}, after 3 retries")
        return DontCache(None)

    url = "https://website-social-scraper-api.p.rapidapi.com/contacts"
    querystring = {"website": website}
    headers = {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "website-social-scraper-api.p.rapidapi.com"
    }

    
    response = requests.get(url, headers=headers, params=querystring)
    response_data = response.json()
    if response.status_code == 200:
        update_credits()

        final = response_data
        # .get('data', [None])[0]
        
        if "pinterest" not in final:
            final["pinterest"] = None

     
        
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


@task(
    close_on_crash=True,
    create_error_logs= False, 
    cache=True, 
    output=None,
    parallel=5,
    )
def scrape_social( data):
    print(data)
    return do_request(data)
