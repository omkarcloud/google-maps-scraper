from botasaurus.decorators_utils import create_directory_if_not_exists
from botasaurus.decorators import print_filenames
from botasaurus import bt

from src.fields import Fields
from src.utils import kebab_case, sort_dict_by_keys, unicode_to_ascii


def make_folders(query_kebab):
  create_directory_if_not_exists(f"output/{query_kebab}/")
  create_directory_if_not_exists(f"output/{query_kebab}/json/")
  create_directory_if_not_exists(f"output/{query_kebab}/csv/")
  pass


def can_create_places_csv(selected_fields):
    return True

def transform_about(about_list):
    transformed_about = {}

    for item in about_list:
        id = item["id"]
        enabled_options = []
        disabled_options = []

        for option in item["options"]:
            if option["enabled"]:
                enabled_options.append(option["name"])
            else:
                disabled_options.append(option["name"])

        enabled_key = f"{id}_enabled"
        disabled_key = f"{id}_disabled"

        transformed_about[enabled_key] = ", ".join(enabled_options) if enabled_options else ""
        transformed_about[disabled_key] = ", ".join(disabled_options) if disabled_options else ""

    return transformed_about

def featured_question_to_string(data):
    # Check if the data is a dictionary
    if isinstance(data, dict):
        # Extracting required fields
        question = data.get("question", "No Question")
        answer = data.get("answer", "No Answer")
        question_ago = data.get("question_ago", "")
        answer_ago = data.get("answer_ago", "")

        # Formatting the output string
        formatted_string = f"Question: {question} ({question_ago})\n\nAnswer: {answer} ({answer_ago})"
        return formatted_string
    else:
        # Return data as it is if it's not a dictionary
        return data

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
            formatted_strings.append(f"Name: {name}\nlink: {link}\nReviews: {reviews} reviews\n")

        # Joining all formatted strings with a newline character
        return '\n'.join(formatted_strings).strip()
    else:
        # Return data as it is if it's not a list
        return data

def popular_times_to_string(data):
    # Check if the data is a dictionary
    if isinstance(data, dict):
        # Initialize an empty string to hold the formatted output
        formatted_output = ""

        # Iterating through each day
        for day, times in data.items():
            formatted_output += f"{day}:\n"
            for time_slot in times:
                time_label = time_slot.get("time_label", "No Time Label")
                popularity_percentage = time_slot.get("popularity_percentage", 0)
                popularity_description = time_slot.get("popularity_description", "No description")

                # Formatting each time slot's information
                formatted_output += f"    {time_label}: {popularity_percentage}% | {popularity_description}\n"

            # Add a newline for separation between days
            formatted_output += "\n"

        return formatted_output.strip()
    else:
        # Return data as it is if it's not a dictionary
        return data

def most_popular_times_to_string(data):
    # Check if the data is a dictionary
    if isinstance(data, list):
        # Initialize an empty list to hold formatted strings
        formatted_strings = []

        # Iterating through each competitor in the list
        xs = []
        for el in data:
            average_popularity = el.get("average_popularity", "No Average Popularity")
            time_label = el.get("time_label", "No Time Label")
            xs.append(time_label)
            # Formatting each competitor's information and adding it to the list
            formatted_strings.append(f"Time Label: {time_label}\nAverage Popularity: {average_popularity}\n")

        # Joining all formatted strings with a newline character
        return ', '.join(xs) + '\n---\n' + '\n'.join(formatted_strings).strip()
    else:
        # Return data as it is if it's not a list
        return data


def transform_places(places, fields):
    transformed_places = []

    for place in places:
        transformed_place = {}
        
        for field in fields:
            if field == Fields.REVIEWS_PER_RATING:
                # Transforming reviews_per_rating
                for key, value in place['reviews_per_rating'].items():
                    transformed_place[f'reviews_per_rating_{key}'] = value

            elif field == Fields.MENU:
                # Adding menu link
                transformed_place['menu_link'] = place['menu']['link'] if 'menu' in place and 'link' in place['menu'] else None

            elif field == Fields.FEATURED_QUESTION:
                transformed_place[Fields.FEATURED_QUESTION] = featured_question_to_string(place[Fields.FEATURED_QUESTION])

            elif field == Fields.COMPETITORS:
                transformed_place[Fields.COMPETITORS] = competitors_to_string(place[Fields.COMPETITORS])

            elif field == Fields.POPULAR_TIMES:
                transformed_place[Fields.POPULAR_TIMES] = popular_times_to_string(place[Fields.POPULAR_TIMES])

            elif field == Fields.MOST_POPULAR_TIMES:
                transformed_place[Fields.MOST_POPULAR_TIMES] = most_popular_times_to_string(place[Fields.MOST_POPULAR_TIMES])

            elif field == Fields.ORDER_ONLINE_LINKS:
                # Concatenating online links
                links = '\n'.join([link['link'] for link in place['order_online_links']])
                transformed_place[Fields.ORDER_ONLINE_LINKS] = links

            elif field == Fields.RESERVATIONS:
                # Concatenating reservation links
                links = '\n'.join([link['link'] for link in place['reservations']])
                transformed_place[Fields.RESERVATIONS] = links

            elif field == Fields.OWNER:
                # Adding owner name and profile link
                transformed_place['owner_name'] = place['owner']['name']
                transformed_place['owner_profile_link'] = place['owner']['link']

            elif field == Fields.EMAILS:
                emails = [email["value"] for email in place.get("emails", [])]
                emails_with_sources = [f"{email['value']}: {len(email['sources'])}" for email in place.get("emails", [])]
                transformed_place[Fields.EMAILS] = ", ".join(emails)
                transformed_place["emails_with_number_of_sources"] = "\n".join(emails_with_sources)

            elif field == Fields.PHONES:
                phones = [phone["value"] for phone in place.get("phones", [])]
                phones_with_sources = [f"{phone['value']}: {len(phone['sources'])}" for phone in place.get("phones", [])]
                transformed_place[Fields.PHONES] = ", ".join(phones)
                transformed_place["phones_with_number_of_sources"] = "\n".join(phones_with_sources)

            elif field == Fields.CATEGORIES:
                # Concatenating categories
                categories = ', '.join(place[Fields.CATEGORIES] or [])
                transformed_place[Fields.CATEGORIES] = categories
            elif field == Fields.REVIEW_KEYWORDS:
                # Concatenating review_keywords
                review_keywords = ', '.join([kw['keyword'] for kw in place[Fields.REVIEW_KEYWORDS]])
                transformed_place[Fields.REVIEW_KEYWORDS] = review_keywords

            elif field == Fields.COORDINATES:
                # Formatting coordinates
                coords = f"{place[Fields.COORDINATES]['latitude']},{place[Fields.COORDINATES]['longitude']}"
                transformed_place[Fields.COORDINATES] = coords

            elif field == Fields.CLOSED_ON:
                if isinstance(place[Fields.CLOSED_ON], list):
                    transformed_place[Fields.CLOSED_ON] = ', '.join(place[Fields.CLOSED_ON])
                else:
                    transformed_place[Fields.CLOSED_ON] = place[Fields.CLOSED_ON]

            elif field == Fields.HOURS:
                # Formatting hours
                hours = '\n'.join([f"{day['day']}: {', '.join(day['times'])}" for day in place['hours']])
                transformed_place[Fields.HOURS] = unicode_to_ascii(hours)

            elif field == Fields.DETAILED_ADDRESS:
                # Adding detailed address
                address = place.get(Fields.DETAILED_ADDRESS, {})
                for key in address.keys():
                    transformed_place[f'address_{key}'] = address.get(key)

            elif field == Fields.ABOUT:
                # Add transformed about data
                transformed_about = transform_about(place[Fields.ABOUT])
                transformed_place.update(transformed_about)
            elif field == Fields.STATUS:
                transformed_place[Fields.STATUS] = place[Fields.STATUS]

            elif field in [Fields.DETAILED_REVIEWS, Fields.IMAGES, Fields.FEATURED_REVIEWS]:
                pass  
            else:
                # Adding other fields directly
                if field in place:
                    transformed_place[field] = place[field]

        transformed_places.append(transformed_place)

    return transformed_places

def create_places_csv(path, places, fields):
    data = transform_places(places, fields)
    bt.write_csv(data, path, False)

def can_create_detailed_reviews_csv(fields):
    return Fields.DETAILED_REVIEWS in fields

def transform_detailed_reviews(places):
    # Initialize an empty list to hold the transformed reviews
    transformed_reviews = []

    # Iterate over each place in the places dictionary
    for place in places:
        # Extract the place_id and name
        place_id = place[Fields.PLACE_ID]
        place_name = place['name']

        for review in place[Fields.DETAILED_REVIEWS]:
                # Create a dictionary to store the transformed review data
                transformed_review = {
                    Fields.PLACE_ID: place_id,
                    'place_name': place_name,
                    **review, 

                }

                # Add the transformed review to the list
                transformed_reviews.append(transformed_review)

    # Return the list of transformed reviews
    return transformed_reviews


def create_detailed_reviews_csv(path, places, fields):
    data = transform_detailed_reviews(places)
    bt.write_csv(data, path , False)

def can_create_email_phone_details_csv(fields):
    return Fields.EMAILS in fields or Fields.PHONES in fields

def transform_email_phone_details_csv(places):
    contact_details = []

    for place in places:
        place_id = place.get(Fields.PLACE_ID)
        name = place.get(Fields.NAME)

        # Process emails
        for email in place.get(Fields.EMAILS, []):
            email_entry = {
                Fields.PLACE_ID: place_id,
                'place_name': name,
                'type': 'email',
                'value': email.get('value'),
                'number_of_sources': len(email.get('sources', [])),
                'sources': '\n'.join(email.get('sources', []))
            }
            contact_details.append(email_entry)

        # Process phone numbers
        for phone in place.get(Fields.PHONES, []):
            phone_entry = {
                Fields.PLACE_ID: place_id,
                'place_name': name,
                'type': 'phone',
                'value': phone.get('value'),
                'number_of_sources': len(phone.get('sources', [])),
                'sources': '\n'.join(phone.get('sources', []))
            }
            contact_details.append(phone_entry)

    return contact_details

def create_email_phone_details_csv(path, places, fields):
    data = transform_email_phone_details_csv(places)
    bt.write_csv(data, path, False)

def can_create_featured_reviews_csv(fields):
    return Fields.FEATURED_REVIEWS in fields

def transform_featured_reviews_csv(places):
    # Initialize an empty list to hold the transformed reviews
    transformed_reviews = []

    # Iterate over each place in the places dictionary
    for place in places:
        # Extract the place_id and name
        place_id = place['place_id']
        place_name = place['name']

        for review in place[Fields.FEATURED_REVIEWS]:
                # Create a dictionary to store the transformed review data
                transformed_review = {
                    'place_id': place_id,
                    'place_name': place_name,
                    **review, 

                }

                # Add the transformed review to the list
                transformed_reviews.append(transformed_review)

    # Return the list of transformed reviews
    return transformed_reviews

def create_featured_reviews_csv(path, places, fields):
    data = transform_featured_reviews_csv(places)
    bt.write_csv(data, path, False)

def can_create_images_csv(fields):
    return Fields.IMAGES in fields

def transform_images_csv(places, fields):
    # Initialize an empty list to hold the transformed reviews
    transformed = []

    # Iterate over each place in the places dictionary
    for place in places:
        # Extract the place_id and name
        place_id = place['place_id']
        place_name = place['name']

        for review in place[Fields.IMAGES]:
                # Create a dictionary to store the transformed review data
                transformed_review = {
                    'place_id': place_id,
                    'place_name': place_name,
                    **review, 

                }

                # Add the transformed review to the list
                transformed.append(transformed_review)

    # Return the list of transformed reviews
    return transformed

def create_images_csv(path, places, fields):
    data = transform_images_csv(places, fields)
    bt.write_csv(data, path , False)

# def can_create_hours_csv(fields):
#     return Fields.HOURS in fields

# def transform_hours_csv(places, fields):
#     pass

# def create_hours_csv(path, places, fields):
#     data = transform_hours_csv(places, fields)
#     bt.write_csv(data, path)


def transform_places_json(places, fields):
    new_results = [sort_dict_by_keys(x, fields) for x in places]
    return new_results

def create_places_json(path, places, fields):
    data = transform_places_json(places, fields)
    bt.write_json(data, path, False )


def format(query_kebab, type, name):
    return f"{name}-of-{query_kebab}.{type}"

def create(places, selected_fields, csv_path, json_path, query_kebab):
        
    # try:
        written = []
        places_json = json_path + format(query_kebab, "json", "places") 
        create_places_json(places_json, places, selected_fields)

        if can_create_places_csv(selected_fields):
            places_path_csv = csv_path + format(query_kebab, "csv", "places") 
            written.append(places_path_csv)
            create_places_csv(places_path_csv, places, selected_fields)

        
        if can_create_email_phone_details_csv(selected_fields):
            email_phone_details_path = csv_path  + format(query_kebab, "csv", "email-phone-details") 
            # ".csv"
            written.append(email_phone_details_path)
            create_email_phone_details_csv(email_phone_details_path, places, selected_fields)

        if can_create_detailed_reviews_csv(selected_fields):
            detailed_reviews_path = csv_path + format(query_kebab, "csv", "detailed-reviews") 
            # "detailed-reviews.csv"
            written.append(detailed_reviews_path)
            create_detailed_reviews_csv(detailed_reviews_path, places, selected_fields)
        
        if can_create_featured_reviews_csv(selected_fields):
            new_var1 = csv_path  + format(query_kebab, "csv", "featured-reviews") 
            # + "featured-reviews.csv"
            written.append(new_var1)
            create_featured_reviews_csv(new_var1, places, selected_fields)
        
        if can_create_images_csv(selected_fields):
            new_var = csv_path + format(query_kebab, "csv", "images") 
            # + "images.csv"
            written.append(new_var)
            create_images_csv(new_var, places, selected_fields)

        written.append(places_json)

        print_filenames(written)

    # except PermissionError:
    #   bt.prompt("The file is currently open in another application (e.g., Excel). Please close the file and then press 'Enter' to save.")
    #   create(places, selected_fields, csv_path, json_path)
    
def write_output(query, places, selected_fields):
    

    query_kebab = kebab_case(query)
    make_folders(query_kebab)

    csv_path = f"output/{query_kebab}/csv/" 
    json_path = f"output/{query_kebab}/json/"
    # + query_kebab + "-"


    create(places, selected_fields, csv_path, json_path, query_kebab)
