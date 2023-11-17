from unidecode import unidecode
import regex as re
from dateutils import relativedelta
from datetime import datetime


relative_date_maps = {
    "pt-br": {
        "one_regex": r"^uma?",
        "ago_regex": r"\s*atrás$",  # Corrected regex for "atrás"
        "time_unit": {
            "ano": "years",
            "anos": "years",
            "mes": "months",
            "meses": "months",
            "semana": "weeks",
            "semanas": "weeks",
            "dia": "days",
            "dias": "days",
            "hora": "hours",
            "horas": "hours",
            "minuto": "minutes",
            "minutos": "minutes",
            "segundo": "seconds",
            "segundos": "seconds",
        },
    },
    "en": {
        "one_regex": r"^a",
        "ago_regex": r"\s*ago$",  # Corrected regex for "ago"
        "time_unit": {
            "year": "years",
            "years": "years",
            "month": "months",
            "months": "months",
            "week": "weeks",
            "weeks": "weeks",
            "day": "days",
            "days": "days",
            "hour": "hours",
            "hours": "hours",
            "minute": "minutes",
            "minutes": "minutes",
            "second": "seconds",
            "seconds": "seconds",
        },
    },
}



translated_text_maps = {
    "pt-br": {
        "flag": "Tradução do Google",
        "regex": r"\(Tradução do Google\)|\(Original\).*?$",
    },
    "en": {
        "flag": "Translated by Google",
        "regex": r"\(Translated by Google\)|\(Original\).*?$",
    },
}


def parse_relative_date(relative_date, retrieval_date, hl="en"):
    """Transforma data relativa do google maps em datetime"""
    if (not isinstance(relative_date, str)) or relative_date == "":
        return None
    # Normaliza texto
    unidecoded_text = unidecode(relative_date).lower().strip()
    text = unidecoded_text
    # Transforma {"um","uma"} no número 1
    
    text = re.sub(relative_date_maps[hl]["one_regex"], "1", text)
    # Remove terminação "atrás"
    
    text = re.sub(relative_date_maps[hl]["ago_regex"], "", text)

    number, time_unit = text.split(" ")
    
    try:
        number = float(number)
    except:
        if "an" in unidecoded_text:
            number = 1
        else:
            raise
    kwargs = {relative_date_maps[hl]["time_unit"][time_unit]: number}

    review_date = datetime.strptime(retrieval_date, '%Y-%m-%d %H:%M:%S.%f')    - relativedelta(**kwargs)
    return str(review_date)
