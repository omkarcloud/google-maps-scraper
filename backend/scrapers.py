from urllib.parse import urlparse
import re
from botasaurus_server.server import Server
from src.gmaps import google_maps_scraper, website_contacts_scraper
import random
from botasaurus_server.ui import View, Field, ExpandDictField, ExpandListField, filters, sorts, CustomField
from botasaurus import cl
import urllib.parse
from .country import get_cities
from .category import category_options
def convert_to_string(input_str):
    return urllib.parse.unquote_plus(input_str).strip()

def create_tasks_for_links(data, links):
    """Creates tasks specifically designed for handling links."""
    task = data.copy()
    task['links'] = links  # Set the links property
    task['query'] = "Links"  # Set a generic query indicating link processing
    return task

def randomize_strings(string_list):
    """
    Randomizes the order of strings in the given list and returns a new list.

    Args:
        string_list (list): A list of strings.

    Returns:
        list: A new list with the strings in a randomized order.
    """
    # Create a copy of the original list to avoid modifying it
    randomized_list = string_list.copy()
    
    # Shuffle the list in-place using the random.shuffle() function
    random.shuffle(randomized_list)
    
    return randomized_list

def prepend_to_strings(strings_list, prepend_str, ):
    """
    Prepend a given string to each item in a list of strings.
    """
    # Ensure the prepend_str ends with a space
    prepend_str = prepend_str + " in "
    return [prepend_str + s for s in strings_list]

def clean_search_string(s):
    if isinstance(s, str):
        return re.sub(r"\s+", " ", s.strip().lower())


def create_tasks_for_queries(data, queries):
    tasks = []
    # Create individual tasks
    for query in queries:
        task = data.copy()  # Shallow copy to preserve other settings
        task["query"] = clean_search_string(query)  # Assign the single query
            # Delete the old "queries" property
        tasks.append(task)
    return tasks

def split_by_gmaps_search_links(links):
    # Lists to hold the divided links
    search_queries = []
    in_place_links = []

    # Iterate over each link in the input list
    for link in links:
        # Parse the link to get its components
        parsed_link = cl.extract_path_from_link(link)

        # Check if the path starts with '/maps/search'
        if parsed_link.startswith('/maps/search'):
            # Add to search queries list if true
            x = convert_to_string(parsed_link.lstrip('/maps/search/').split('/')[0])
            if x:
                search_queries.append((x))
        else:
            # Otherwise, add to in place links list
            in_place_links.append(link)

    return in_place_links, search_queries 

def filter_links(queries):
    return [query for query in queries if query.startswith("http://") or query.startswith("https://")]

def split_and_create_tasks(data, queries):
    alllnks = filter_links(queries)
    places_links, search_queries = split_by_gmaps_search_links(alllnks)
    places_links_set = set(alllnks)
    for query in queries:
        if query not in places_links_set:
            search_queries.append(query)
        # Create tasks for non-link queries
    tasks = create_tasks_for_queries(data, search_queries)

        # Create tasks for links 
    if places_links:
        links_task = create_tasks_for_links(data, places_links)
        tasks.insert(0, links_task)
    return tasks

    
def split_task_by_query(data):
    """Splits a task dictionary into a list of tasks based on queries,
    optionally prepending city names if a country is specified.
    """
    if data["country"]:
        cities = get_cities(data["country"])

        if data["randomize_cities"]:
            cities = randomize_strings(cities)

        if data["max_cities"]:
            cities = cities[:data["max_cities"]]

        queries = prepend_to_strings(cities, data["business_type"], )
        del data["queries"] # Avoid passing potentially big queries object
        return create_tasks_for_queries(data, queries)
    else:
        queries = data["queries"]  # Use queries directly
        del data["queries"] # Avoid passing potentially big queries object
        # Split queries into links and non-links

        tasks = split_and_create_tasks(data, queries) 

        return tasks 
    

def get_task_name(data):
    return data["query"]

featured_reviews_view = View(
    "Featured Reviews",
    fields=[
        Field("place_id"),
        Field("name", output_key="place_name"),
        ExpandListField(
            "featured_reviews",
            fields=[
                Field("review_id"),
                Field("rating"),
                Field("review_text"),
                Field("published_at"),
                Field("published_at_date"),
                Field("response_from_owner_text"),
                Field("response_from_owner_ago"),
                Field("response_from_owner_date"),
                Field("review_likes_count"),
                Field("total_number_of_reviews_by_reviewer"),
                Field("total_number_of_photos_by_reviewer"),
                Field("is_local_guide"),
                Field("review_translated_text"),
                Field("response_from_owner_translated_text"),
                Field("review_photos"),
            ],
        ),
    ],
)

detailed_reviews_view = View(
    "Detailed Reviews",
    fields=[
        Field("place_id"),
        Field("name", output_key="place_name"),
        ExpandListField(
            "detailed_reviews",
            fields=[
                Field("review_id"),
                Field("rating"),
                Field("review_text"),
                Field("published_at"),
                Field("published_at_date"),
                Field("response_from_owner_text"),
                Field("response_from_owner_ago"),
                Field("response_from_owner_date"),
                Field("review_likes_count"),
                Field("total_number_of_reviews_by_reviewer"),
                Field("total_number_of_photos_by_reviewer"),
                Field("is_local_guide"),
                Field("review_translated_text"),
                Field("response_from_owner_translated_text"),
            ],
        ),
    ],
)


def competitors_to_string(data):
    # Check if the data is a list
    if isinstance(data, list):
        # Initialize an empty list to hold formatted strings
        formatted_strings = []

        # Iterating through each competitor in the list
        for competitor in data:
            name = competitor.get("name", "No Name")
            link = competitor.get("link", "No Link")
            reviews = competitor.get("reviews", "No Reviews")

            # Formatting each competitor's information and adding it to the list
            formatted_strings.append(
                "Name: " + name + "\n" +
                "Link: " + link + "\n" +
                "Reviews: " + str(reviews) + " reviews" + "\n"
            )

        # Joining all formatted strings with a newline character
        return "\n".join(formatted_strings).strip()
    else:
        # Return data as it is if it's not a list
        return data


def join_review_keywords(data, record):
    if isinstance(data, list):
        return ", ".join([kw["keyword"] for kw in data])
    else:
        return data


def join_closed_on(data, record):
    if isinstance(data, list):
        return ", ".join(data)
    else:
        return data


join_with_commas = lambda value, record:  ", ".join(value or []) if isinstance(value, list) else value

def show_if(input_data):
    return bool(input_data["api_key"])
social_fields = [
    Field("emails", map=join_with_commas, show_if=show_if),
    Field("phones", map=join_with_commas, show_if=show_if),
    Field("linkedin", show_if=show_if),
    Field("twitter", show_if=show_if),
    Field("facebook", show_if=show_if),
    Field("youtube", show_if=show_if),
    Field("instagram", show_if=show_if),
]

overview_view = View(
    "Overview",
    fields=[
        Field("place_id"),
        Field("name"),
        Field("reviews"),
        Field("main_category"),
        Field("categories", map=join_with_commas),
        Field("rating"),
        Field("address"),
        Field("link"),
        Field("query"),

        Field("description"),
        Field("is_spending_on_ads"),
        Field("competitors", map=lambda value, record: competitors_to_string(value)),
        Field("website"),
        Field("can_claim"),
    ]
    + social_fields
    + [
        CustomField("owner_name" ,map=lambda value: "*****"),
        CustomField("owner_profile_link", map=lambda value: "*****"),
        Field("featured_image"),
        Field("workday_timing"),
        Field("closed_on", map=join_closed_on),
        Field("phone"),
        Field("review_keywords", map=join_review_keywords),

    ],
)

best_customers = sorts.Sort(
    label="Best Potential Customers",
    is_default=True,
    sorts=[
        sorts.AlphabeticAscendingSort("name"),
        sorts.NumericDescendingSort("reviews"),
        sorts.TrueFirstSort("website"),
        sorts.TruthyFirstSort(
            "linkedin",
            ),
        #     sorts.TrueFirstSort(
        #     "is_spending_on_ads",
        # ),
    ],
)
try:
    Server.add_scraper(   
        google_maps_scraper,
        create_all_task=True, 
        split_task=split_task_by_query,
        get_task_name=get_task_name,
        filters=[
            filters.MinNumberInput("reviews", label="Min Reviews"),
            filters.MaxNumberInput("reviews", label="Max Reviews"),
            filters.BoolSelectDropdown("website", prioritize_no=True),
            filters.IsTruthyCheckbox("phone"),
            filters.IsTrueCheckbox("is_spending_on_ads"),
            filters.BoolSelectDropdown("can_claim"),
            filters.MultiSelectDropdown(
                "category_in",
                options=category_options,
            ),
            filters.MinNumberInput("rating", label="Min Rating"),
        ],
        sorts=[
            best_customers,
            sorts.NumericDescendingSort("reviews"),
            sorts.NumericAscendingSort("reviews"),
            sorts.NumericAscendingSort("name"),
        ],
        views=[
            overview_view,
            featured_reviews_view,
            detailed_reviews_view,
        ],
        remove_duplicates_by="place_id"
    )
except:
    Server.add_scraper(   
        google_maps_scraper,
        create_all_task=True, 
        split_task=split_task_by_query,
        get_task_name=get_task_name,
        filters=[
            filters.MinNumberInput("reviews", label="Min Reviews"),
            filters.MaxNumberInput("reviews", label="Max Reviews"),
            filters.BoolSelectDropdown("website", prioritize_no=True),
            filters.IsTruthyCheckbox("phone"),
            filters.IsTrueCheckbox("is_spending_on_ads"),
            filters.BoolSelectDropdown("can_claim"),
            filters.MultiSelectDropdown(
                "category_in",
                options=category_options,
            ),
            filters.MinNumberInput("rating", label="Min Rating"),
        ],
        sorts=[
            best_customers,
            sorts.NumericDescendingSort("reviews"),
            sorts.NumericAscendingSort("reviews"),
            sorts.NumericAscendingSort("name"),
        ],
        views=[
            overview_view,
            featured_reviews_view,
            detailed_reviews_view,
        ],
    )

def process_domain(url):
    stripped_url = url[4:] if url.startswith("www.") else url

    # Split the url by "."
    parts = stripped_url.split(".")
    
    # If there is only one "." in the url
    if len(parts) == 1:
        return stripped_url
    elif len(parts) == 2:
        return parts[0]
    else:
        # Remove the last TLD and join the remaining parts
        return ".".join(parts[:-1])
def get_website_contacts_scraper_task_name(data):
    websites = data["websites"]
    
    # Extract main domain info
    domains = [process_domain(urlparse(url).netloc) for url in websites]
    
    if len(domains) == 1:
        return domains[0]
    elif len(domains) <= 2:
        d1 = domains[0]
        d2 = domains[1]
        return d1 + " and " + d2
    else:
        d1 = domains[0]
        d2 = domains[1]
        n = len(domains) - 2
        return d1 + ", " + d2 + " and " + str(n) + " more"

social_media_filters = [
    "emails", "phones", "linkedin", "twitter", "facebook",
    "youtube", "instagram", "github", "snapchat", "tiktok"
]

Server.add_scraper(
    website_contacts_scraper,
    get_task_name=get_website_contacts_scraper_task_name,
    filters=[
        filters.SearchTextInput("website"),
        *[filters.BoolSelectDropdown(social_media) for social_media in social_media_filters]
    ],
    sorts=[
        sorts.AlphabeticAscendingSort("website"),
        sorts.AlphabeticDescendingSort("website"),
    ],
)
Server.set_rate_limit(request=1,task=1)
Server.enable_cache()
Server.configure(
     title="Google Maps Scraper",
    header_title="Made with Botasaurus",
    description="Find thousands of new customers personal phone, email and grow your business exponentially.",
    right_header={
        "text": "Love It? Star It! ★",
        "link": "https://github.com/omkarcloud/google-maps-scraper",
    },
)
# python -m backend.scrapers
if __name__ == "__main__":
    # print(split_by_gmaps_search_links(["https://www.google.com/maps/search/food+restaurant+in+++washingtk/@40.7338104,-74.0287773,13z/data=!3m1!4b1?entry=ttu", "https://www.google.com/maps/place/Top+App+%26+Web+Development+company+in+ahmedabad.Summer+internship+in+Php,Flutter,Python,AngularJS,React+JS,Node+JS+,UI%2FUx/data=!4m7!3m6!1s0x395e9b4922484c6f:0xe077cfffcd90ee87!8m2!3d23.0372919!4d72.5118722!16s%2Fg%2F11fzb0hl8n!19sChIJb0xIIkmbXjkRh-6Qzf_Pd-A?authuser=0&hl=en&rclk=1"]))
    print(process_domain("www.webshark.in"))