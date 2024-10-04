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
        min_reviews = filter_data.get("min_reviews")
        reviews = i.get('reviews')

        if min_reviews is not None and (reviews == '' or reviews is None or reviews < min_reviews):
            return False

        return True

    return list(filter(fn, ls))

