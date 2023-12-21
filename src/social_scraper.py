import re
import requests
from bs4 import BeautifulSoup
from email_validator import validate_email, EmailNotValidError
import phonenumbers

# Default values
DEFAULT_WEBSITE = "https://example.com"
DEFAULT_PLACE_ID = "123"
FAILED_DUE_TO_CREDITS_EXHAUSTED = "FAILED_DUE_TO_CREDITS_EXHAUSTED"
FAILED_DUE_TO_NOT_SUBSCRIBED = "FAILED_DUE_TO_NOT_SUBSCRIBED"
FAILED_DUE_TO_UNKNOWN_ERROR = "FAILED_DUE_TO_UNKNOWN_ERROR"
def extract_emails(html_content):
    emails = set()

    # Using a more comprehensive email pattern for extraction
    email_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
    emails.update(re.findall(email_pattern, html_content))

    # Additional validation using email_validator library
    for email in re.findall(email_pattern, html_content):
        try:
            validate_email(email)
            emails.add(email)
        except EmailNotValidError:
            pass

    return list(emails)

def extract_phone_numbers(html_content):
    phone_numbers = set()

    # Using phonenumbers library for more accurate phone number extraction
    for match in re.finditer(r'\b(\+?\d{1,4}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,9}[-.\s]?\d{1,9}\b', html_content):
        phone_number_str = match.group(0)
        try:
            phone_number = phonenumbers.parse(phone_number_str, None)  # Set the default region to None for international numbers
            if phonenumbers.is_valid_number(phone_number):
                formatted_number = phonenumbers.format_number(phone_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
                phone_numbers.add(formatted_number)
        except phonenumbers.NumberParseException:
            pass

    return list(phone_numbers)

def extract_social_profiles(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')

    social_profiles = {
        "linkedin": get_social_link(soup, r'linkedin\.com'),
        "twitter": get_social_link(soup, r'twitter\.com'),
        "facebook": get_social_link(soup, r'facebook\.com'),
        "youtube": get_social_link(soup, r'youtube\.com'),
        "instagram": get_social_link(soup, r'instagram\.com'),
        "github": get_social_link(soup, r'github\.com'),
        "snapchat": get_social_link(soup, r'snapchat\.com'),
        "tiktok": get_social_link(soup, r'tiktok\.com'),
    }

    return social_profiles

def get_social_link(soup, pattern):
    link = soup.find('a', href=re.compile(pattern, re.IGNORECASE))
    return link.get('href') if link else None

def do_request(data):
    try:
        # Use default values if not provided
        website = data.get("website", DEFAULT_WEBSITE)
        place_id = data.get("place_id", DEFAULT_PLACE_ID)

        if website is None:
            raise ValueError("Invalid URL: 'None'")

        # Fetch HTML content from the website
        html_content = fetch_html_content(website)

        # Extract emails, phone numbers, and social profiles
        emails = extract_emails(html_content)
        phone_numbers = extract_phone_numbers(html_content)
        social_profiles = extract_social_profiles(html_content)

        # Prepare the output in a format similar to the old API
        result = {
            "place_id": place_id,
            "data": {
                "emails": emails,
                "phones": phone_numbers,
                "linkedin": social_profiles.get("linkedin"),
                "twitter": social_profiles.get("twitter"),
                "facebook": social_profiles.get("facebook"),
                "youtube": social_profiles.get("youtube"),
                "instagram": social_profiles.get("instagram"),
                "github": social_profiles.get("github"),
                "snapchat": social_profiles.get("snapchat"),
                "tiktok": social_profiles.get("tiktok"),
            },
            "error": None
        }
        return result
    except Exception as e:
        # Handle exceptions gracefully
        error_result = {
            "place_id": data.get("place_id", DEFAULT_PLACE_ID),
            "data": None,
            "error": str(e)
        }
        return error_result

def fetch_html_content(website):
    # Implement your logic to fetch HTML content from the website
    # You can use the requests library or any other method to get the HTML
    # Replace the following line with your implementation
    response = requests.get(website)
    response.raise_for_status()
    return response.text

def scrape_social(social_data_list, cache):
    # Assuming social_data_list is a list of dictionaries
    results = []
    for social_data in social_data_list:
        result = do_request(social_data)
        results.append(result)
    return results
social_data_list = [{"place_id": "1", "website": "https://apple.com"}
                 ]

results = scrape_social(social_data_list, cache=None)
print(results)
