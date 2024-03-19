from src.utils import kebab_case, unicode_to_ascii


def list_contains_string(string_list, target_string):
    target_string_lower = kebab_case(unicode_to_ascii(target_string)).lower()  # Convert target string to lowercase
    for item in string_list:
        if target_string_lower == kebab_case(unicode_to_ascii(item)).lower():  # Compare in a case-insensitive manner
            return True
    return False

def sort_dict_by_keys(dictionary, keys):
    new_dict = {}
    
    try:
        for key in keys:
            new_dict[key] = dictionary[key]
    except:
        raise Exception("Failed to sort dict by keys")
    return new_dict

def filter_places(ls, filter_data):
    def fn(i):

        web_site = i.get("website")
        has_website = filter_data.get("has_website")
        if has_website is not None:
            if (has_website is False and web_site is not None):
                return False

            if (has_website is True and web_site is None):
                return False
        min_rating = filter_data.get("min_rating")
        max_rating = filter_data.get("max_rating")
        min_reviews = filter_data.get("min_reviews")
        max_reviews = filter_data.get("max_reviews")
        has_phone = filter_data.get("has_phone")
        has_can_claim = filter_data.get("can_claim")
        category_in = filter_data.get("category_in")

        rating = i.get('rating')
        reviews = i.get('reviews')
        can_claim = i.get("can_claim")
        
        phone = i.get("phone")
        main_category = i.get("main_category")

        if category_in :
            if not main_category:
                return False

            if (not list_contains_string(category_in, main_category)):
                return False

        if min_rating is not None and (rating == '' or rating is None or rating < min_rating):
            return False
        
        if max_rating is not None and (rating == '' or rating is None or rating > max_rating):
            return False

        if min_reviews is not None and (reviews == '' or reviews is None or reviews < min_reviews):
            return False

        if max_reviews is not None and (reviews == '' or reviews is None or reviews > max_reviews):
            return False

        if has_can_claim is not None:
            if (has_can_claim is False and can_claim is True):
                return False

            if (has_can_claim is True and can_claim is False):
                return False
            
        if has_phone is not None:
            if (has_phone is True and (phone is None or phone == '')):
                return False

            if (has_phone is False and (not (phone is None or phone == ''))):
                return False

        return True

    return list(filter(fn, ls))

