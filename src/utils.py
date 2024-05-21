from unidecode import unidecode
from casefy import kebabcase

def unicode_to_ascii(text):
    """
    Convert unicode text to ASCII, replacing special characters.
    """
    
    if text is None:
        return None

    # Replacing 'ë' with 'e' and return the ASCII text
    return unidecode(text).replace("ë", "e")

def kebab_case(s):
    return kebabcase(s)

def unique_strings(lst):
    # Use a set to remove duplicates, then convert back to a list
    return list(dict.fromkeys(lst))
