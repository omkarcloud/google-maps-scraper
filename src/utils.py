from botasaurus import bt
from unidecode import unidecode
from casefy import kebabcase

def unicode_to_ascii(text):
    """
    Convert unicode text to ASCII, replacing special characters.
    """
    # Replacing 'ë' with 'e' and return the ASCII text
    return unidecode(text).replace("ë", "e")

def applyTransformer(data, transformer):
    """
    Apply a transformer function to all strings in a nested data structure.

    :param data: The data structure (dict, list, nested dicts) to transform.
    :param transformer: A function that takes a string and returns a transformed string.
    :return: The transformed data structure.
    """
    if isinstance(data, dict):
        # If the item is a dictionary, apply the transformer to each value.
        return {key: applyTransformer(value, transformer) for key, value in data.items()}
    elif isinstance(data, list):
        # If the item is a list, apply the transformer to each element.
        return [applyTransformer(element, transformer) for element in data]
    elif isinstance(data, str):
        # If the item is a string, apply the transformer directly.
        return transformer(data)
    else:
        # If the item is not a dict, list, or string, return it as is.
        return data


def convert_unicode_dict_to_ascii_dict(data):
    """
    Convert unicode data to ASCII, replacing special characters.
    """
    return applyTransformer(data, unicode_to_ascii)


def kebab_case(s):
    return kebabcase(s)

def unique_strings(lst):
    # Use a set to remove duplicates, then convert back to a list
    return list(dict.fromkeys(lst))


def sort_dict_by_keys(dictionary, keys):
    new_dict = {}
    
    try:
        for key in keys:
            new_dict[key] = dictionary[key]
    except:
        bt.write_json(dictionary, "Failed")
        raise Exception("Failed to sort dict by keys")
    return new_dict
if __name__ == "__main__":
    xs = ['वेबसाइट डिज़ाइनर', 'ई कॉमर्स एजेंसी', 'ग्राफ़िक डिज़ाइनर', 'इंटरनेट विपणन सेवा', 'विपणन एजेंसी', 'सॉफ़्टवेयर कंपनी', 'वेब होस्टिंग कंपनी']
    print(', '.join(xs[0]))
    print(convert_unicode_dict_to_ascii_dict(xs))