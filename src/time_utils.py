from unidecode import unidecode
import re
from dateutils import relativedelta
from datetime import datetime


relative_date_maps = {
    "pt-br": {
        "one_regex": "^uma?",
        "ago_regex": "\satras",
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
        "one_regex": "^a",
        "ago_regex": "\sago",
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
        "regex": "\(Tradução do Google\)|\(Original\).*?$",
    },
    "en": {
        "flag": "Translated by Google",
        "regex": "\(Translated by Google\)|\(Original\).*?$",
    },
}

def parse_relative_date(relative_date, retrieval_date, hl="en"):
    """Transforma data relativa do google maps em datetime"""
    if (not isinstance(relative_date, str)) or relative_date == "":
        return None
    # Normaliza texto
    text = unidecode(relative_date).lower().strip()
    # Transforma {"um","uma"} no número 1
    text = re.sub(relative_date_maps[hl]["one_regex"], "1", text)
    # Remove terminação "atrás"
    text = re.sub(relative_date_maps[hl]["ago_regex"], "", text)

    number, time_unit = text.split(" ")
    number = float(number)
    kwargs = {relative_date_maps[hl]["time_unit"][time_unit]: number}
    review_date = datetime.strptime(retrieval_date, '%Y-%m-%d %H:%M:%S.%f')    - relativedelta(**kwargs)
    return str(review_date)

# date_string = "2023-11-14 15:22:45.374751"
# datetime_object = datetime.strptime(date_string, '%Y-%m-%d %H:%M:%S.%f')

