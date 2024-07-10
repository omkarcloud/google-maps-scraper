from botasaurus.task import task
import traceback
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
    try:
        response = requests.get(url, headers=headers, params=querystring)
        response_data = response.json()
    except Exception as e:
        traceback.print_exc()
        return DontCache({"data": None, "error": FAILED_DUE_TO_UNKNOWN_ERROR})
    if response.status_code == 200:
        update_credits()

        final = response_data
        # .get('data', [None])[0]
        
        if "pinterest" not in final:
            final["pinterest"] = None

        return {
            "data": final,
            "error": None
        }
    else: 
        message = response_data.get("message", "")
        if "exceeded the MONTHLY quota" in message:
            return  DontCache({
                        "data":  None,
                        "error":FAILED_DUE_TO_CREDITS_EXHAUSTED
                    })
        elif "exceeded the rate limit per second for your plan" in message or "many requests" in message:
            sleep(2)
            return get_website_contacts(data, retry_count - 1)
        elif "You are not subscribed to this API." in message:
            
            return DontCache({
                        "data": None,
                        "error": FAILED_DUE_TO_NOT_SUBSCRIBED
                    })

        print(f"Error: {response.status_code}", response_data)
        return  DontCache({
                        "data":  None,
                        "error":FAILED_DUE_TO_UNKNOWN_ERROR
                    })    

@task(
    close_on_crash=True,
    create_error_logs= False, 
    output=None,
    parallel=5,
    cache=True
    )
def get_website_contacts(data, metadata):
    return do_request({"website":data, "key":metadata})


@task(
    close_on_crash=True,
    create_error_logs= False, 
    output=None,
    parallel=5,
    )
def scrape_social(data):
    result = get_website_contacts(data["website"], metadata=data["key"])
    result["place_id"] = data["place_id"]
    return result

# `python -m src.social_scraper`
if __name__ == "__main__":
    print(get_website_contacts("https://www.seekneo.com/", "d"))