from botasaurus_server.server import Server
from src.gmaps import get_places
import random
from botasaurus_server.ui import *
from .country import get_cities
from .category import category_options

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

def split_task_by_query(data):
    """Splits a task dictionary into a list of tasks based on queries,
    optionally prepending city names if a country is specified.
    """
    tasks = []
    if data["country"]:
        cities = get_cities(data["country"])

        if data["randomize_cities"]:
            cities = randomize_strings(cities)

        if data["max_cities"]:
            cities = cities[:data["max_cities"]]

        queries = prepend_to_strings(cities, data["business_type"], )

    else:
        queries = data["queries"]  # Use queries directly

    del data["queries"]
    
    # Create individual tasks
    for query in queries:
        task = data.copy()  # Shallow copy to preserve other settings
        task["query"] = query  # Assign the single query
            # Delete the old "queries" property
        tasks.append(task)

    # from botasaurus import bt
    # bt.write_json(tasks, "tasls")
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
                Field("review_id_hash"),
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
                Field("review_id_hash"),
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
                f"Name: {name}\nlink: {link}\nReviews: {reviews} reviews\n"
            )

        # Joining all formatted strings with a newline character
        return "\n".join(formatted_strings).strip()
    else:
        # Return data as it is if it's not a list
        return data


def join_review_keywords(data, record):
    return ", ".join([kw["keyword"] for kw in data])


def join_closed_on(data, record):
    if isinstance(data, list):
        return ", ".join(data)
    else:
        return data


join_with_commas = lambda value, record: ", ".join(value or [])

social_fields = [
    Field("emails", map=join_with_commas),
    Field("phones", map=join_with_commas),
    Field("linkedin"),
    Field("twitter"),
    Field("facebook"),
    Field("youtube"),
    Field("instagram"),
]

overview_view = View(
    "Overview",
    fields=[
        Field("place_id"),
        Field("name"),
        Field("description"),
        Field("is_spending_on_ads"),
        Field("reviews"),
        Field("competitors", map=lambda value, record: competitors_to_string(value)),
        Field("website"),
        Field("can_claim"),
    ]
    + social_fields
    + [
        ExpandDictField(
            "owner",
            fields=[
                Field(
                    "name",
                    output_key="owner_name",
                ),
                Field(
                    "link",
                    output_key="owner_profile_link",
                ),
            ],
        ),
        Field("featured_image"),
        Field("main_category"),
        Field("categories", map=join_with_commas),
        Field("rating"),
        Field("workday_timing"),
        Field("closed_on", map=join_closed_on),
        Field("phone"),
        Field("address"),
        Field("review_keywords", map=join_review_keywords),
        Field("link"),
    ],
)

best_customers = Sort(
    label="Best Potential Customers",
    is_default=True,
    sorts=[
        NumericAscendingSort("name"),
        NumericDescendingSort("reviews"),
        TrueFirstSort("website"),
        TruthyFirstSort(
            "linkedin",
            ),
            TrueFirstSort(
            "is_spending_on_ads",
        ),
    ],
)

Server.add_scraper(
    get_places,
    create_all_task=True, 
    split_task=split_task_by_query,
    get_task_name=get_task_name,
    filters=[
        MinNumberInput("reviews", label="Min Reviews"),
        MaxNumberInput("reviews", label="Max Reviews"),
        IsTruthyCheckbox("website"),
        IsTruthyCheckbox("phone"),
        IsTrueCheckbox("is_spending_on_ads"),
        IsTrueCheckbox("can_claim"),
        MultiSelectDropdown(
            "category_in",
            options=category_options,
        ),
        MinNumberInput("rating", label="Min Rating"),
    ],
    sorts=[
        best_customers,
        NumericDescendingSort("reviews"),
        NumericAscendingSort("reviews"),
        NumericAscendingSort("name"),
    ],
    views=[
        overview_view,
        featured_reviews_view,
        detailed_reviews_view,
    ],
)

Server.set_rate_limit(request=1)
Server.enable_cache()
Server.configure(
     title="Google Maps Scraper",
    header_title="Made with Botasaurus",
    description="Find thousands of new customers personal phone, email and grow your business exponentially.",
    right_header={
        "text": "Love It? Star It! ★",
        "link": "https://github.com/omkarcloud/botasaurus",
    },
)