from typing import List
from botasaurus import bt
import geonamescache
import random

from .utils import kebab_case, unicode_to_ascii

# Initialize GeonamesCache
geo_cache = geonamescache.GeonamesCache()

# Get countries data
countries_data = geo_cache.get_countries()

# Function to convert unicode text to ASCII, replacing specific characters



# Function to get the country name from its country code


def get_country_name_from_code(country_code):
    """
    Convert country code to country name after converting to ASCII.
    """
    for code, data in countries_data.items():
        if code == country_code:
            return unicode_to_ascii(data['name'])

# Function to generate a file name for cities data based on country name


def generate_cities_file_name(country):
    """
    Generate a file name from the country name for storing cities data.
    """
    return kebab_case(country) + "-cities.json"

# Function to prepend a string to each element in a list of strings


def prepend_to_strings(prepend_str, strings_list):
    """
    Prepend a given string to each item in a list of strings.
    """
    # Ensure the prepend_str ends with a space
    prepend_str = prepend_str.strip() + " "
    return [prepend_str + s for s in strings_list]

# Function to get cities by country code


def fetch_cities_by_country_code(country_code):
    """
    Fetch and return city names for a given country code.
    """
    # Retrieve a dictionary of all cities
    # cities_dict = geo_cache.get_cities()
    cities = geo_cache.get_cities()

    # Filter cities by country code
    cities = {id: city for id, city in cities.items(
    ) if city['countrycode'] == country_code}

    # Print the names of the cities
    ls = []
    for _, city_data in cities.items():
        ls.append(unicode_to_ascii(city_data['name']).lower())

    return ls


# Factory function to create functions to handle city data retrieval and processing
def create_city_handler(country_code: str):
    """
    Factory to create functions to manage city data based on country code.
    """
    def handle_city_data(_, prepend: str) -> List[str]: 
        country_name = get_country_name_from_code(country_code)
        filename = generate_cities_file_name(country_name)
        # Check if file exists and read data
        if bt.file_exists(filename):
            cities = bt.read_json(filename)
            return prepend_to_strings(prepend, cities)

        # If file does not exist, fetch and write city data
        cities = fetch_cities_by_country_code(country_code)
        random.shuffle(cities)

        bt.write_json(cities, filename)
        return prepend_to_strings(prepend, cities)

    return handle_city_data


class Cities:
    Afghanistan = create_city_handler("AF")
    AlandIslands = create_city_handler("AX")
    Albania = create_city_handler("AL")
    Algeria = create_city_handler("DZ")
    AmericanSamoa = create_city_handler("AS")
    Andorra = create_city_handler("AD")
    Angola = create_city_handler("AO")
    Anguilla = create_city_handler("AI")
    Antarctica = create_city_handler("AQ")
    AntiguaAndBarbuda = create_city_handler("AG")
    Argentina = create_city_handler("AR")
    Armenia = create_city_handler("AM")
    Aruba = create_city_handler("AW")
    Australia = create_city_handler("AU")
    Austria = create_city_handler("AT")
    Azerbaijan = create_city_handler("AZ")
    Bahamas = create_city_handler("BS")
    Bahrain = create_city_handler("BH")
    Bangladesh = create_city_handler("BD")
    Barbados = create_city_handler("BB")
    Belarus = create_city_handler("BY")
    Belgium = create_city_handler("BE")
    Belize = create_city_handler("BZ")
    Benin = create_city_handler("BJ")
    Bermuda = create_city_handler("BM")
    Bhutan = create_city_handler("BT")
    Bolivia = create_city_handler("BO")
    BonaireSaintEustatiusAndSaba = create_city_handler("BQ")
    BosniaAndHerzegovina = create_city_handler("BA")
    Botswana = create_city_handler("BW")
    BouvetIsland = create_city_handler("BV")
    Brazil = create_city_handler("BR")
    BritishIndianOceanTerritory = create_city_handler("IO")
    BritishVirginIslands = create_city_handler("VG")
    Brunei = create_city_handler("BN")
    Bulgaria = create_city_handler("BG")
    BurkinaFaso = create_city_handler("BF")
    Burundi = create_city_handler("BI")
    CaboVerde = create_city_handler("CV")
    Cambodia = create_city_handler("KH")
    Cameroon = create_city_handler("CM")
    Canada = create_city_handler("CA")
    CaymanIslands = create_city_handler("KY")
    CentralAfricanRepublic = create_city_handler("CF")
    Chad = create_city_handler("TD")
    Chile = create_city_handler("CL")
    China = create_city_handler("CN")
    ChristmasIsland = create_city_handler("CX")
    CocosIslands = create_city_handler("CC")
    Colombia = create_city_handler("CO")
    Comoros = create_city_handler("KM")
    CookIslands = create_city_handler("CK")
    CostaRica = create_city_handler("CR")
    Croatia = create_city_handler("HR")
    Cuba = create_city_handler("CU")
    Curacao = create_city_handler("CW")
    Cyprus = create_city_handler("CY")
    Czechia = create_city_handler("CZ")
    DemocraticRepublicOfTheCongo = create_city_handler("CD")
    Denmark = create_city_handler("DK")
    Djibouti = create_city_handler("DJ")
    Dominica = create_city_handler("DM")
    DominicanRepublic = create_city_handler("DO")
    Ecuador = create_city_handler("EC")
    Egypt = create_city_handler("EG")
    ElSalvador = create_city_handler("SV")
    EquatorialGuinea = create_city_handler("GQ")
    Eritrea = create_city_handler("ER")
    Estonia = create_city_handler("EE")
    Eswatini = create_city_handler("SZ")
    Ethiopia = create_city_handler("ET")
    FalklandIslands = create_city_handler("FK")
    FaroeIslands = create_city_handler("FO")
    Fiji = create_city_handler("FJ")
    Finland = create_city_handler("FI")
    France = create_city_handler("FR")
    FrenchGuiana = create_city_handler("GF")
    FrenchPolynesia = create_city_handler("PF")
    FrenchSouthernTerritories = create_city_handler("TF")
    Gabon = create_city_handler("GA")
    Gambia = create_city_handler("GM")
    Georgia = create_city_handler("GE")
    Germany = create_city_handler("DE")
    Ghana = create_city_handler("GH")
    Gibraltar = create_city_handler("GI")
    Greece = create_city_handler("GR")
    Greenland = create_city_handler("GL")
    Grenada = create_city_handler("GD")
    Guadeloupe = create_city_handler("GP")
    Guam = create_city_handler("GU")
    Guatemala = create_city_handler("GT")
    Guernsey = create_city_handler("GG")
    Guinea = create_city_handler("GN")
    GuineaBissau = create_city_handler("GW")
    Guyana = create_city_handler("GY")
    Haiti = create_city_handler("HT")
    HeardIslandAndMcDonaldIslands = create_city_handler("HM")
    Honduras = create_city_handler("HN")
    HongKong = create_city_handler("HK")
    Hungary = create_city_handler("HU")
    Iceland = create_city_handler("IS")
    India = create_city_handler("IN")
    Indonesia = create_city_handler("ID")
    Iran = create_city_handler("IR")
    Iraq = create_city_handler("IQ")
    Ireland = create_city_handler("IE")
    IsleOfMan = create_city_handler("IM")
    Israel = create_city_handler("IL")
    Italy = create_city_handler("IT")
    IvoryCoast = create_city_handler("CI")
    Jamaica = create_city_handler("JM")
    Japan = create_city_handler("JP")
    Jersey = create_city_handler("JE")
    Jordan = create_city_handler("JO")
    Kazakhstan = create_city_handler("KZ")
    Kenya = create_city_handler("KE")
    Kiribati = create_city_handler("KI")
    Kosovo = create_city_handler("XK")
    Kuwait = create_city_handler("KW")
    Kyrgyzstan = create_city_handler("KG")
    Laos = create_city_handler("LA")
    Latvia = create_city_handler("LV")
    Lebanon = create_city_handler("LB")
    Lesotho = create_city_handler("LS")
    Liberia = create_city_handler("LR")
    Libya = create_city_handler("LY")
    Liechtenstein = create_city_handler("LI")
    Lithuania = create_city_handler("LT")
    Luxembourg = create_city_handler("LU")
    Macao = create_city_handler("MO")
    Madagascar = create_city_handler("MG")
    Malawi = create_city_handler("MW")
    Malaysia = create_city_handler("MY")
    Maldives = create_city_handler("MV")
    Mali = create_city_handler("ML")
    Malta = create_city_handler("MT")
    MarshallIslands = create_city_handler("MH")
    Martinique = create_city_handler("MQ")
    Mauritania = create_city_handler("MR")
    Mauritius = create_city_handler("MU")
    Mayotte = create_city_handler("YT")
    Mexico = create_city_handler("MX")
    Micronesia = create_city_handler("FM")
    Moldova = create_city_handler("MD")
    Monaco = create_city_handler("MC")
    Mongolia = create_city_handler("MN")
    Montenegro = create_city_handler("ME")
    Montserrat = create_city_handler("MS")
    Morocco = create_city_handler("MA")
    Mozambique = create_city_handler("MZ")
    Myanmar = create_city_handler("MM")
    Namibia = create_city_handler("NA")
    Nauru = create_city_handler("NR")
    Nepal = create_city_handler("NP")
    Netherlands = create_city_handler("NL")
    NetherlandsAntilles = create_city_handler("AN")
    NewCaledonia = create_city_handler("NC")
    NewZealand = create_city_handler("NZ")
    Nicaragua = create_city_handler("NI")
    Niger = create_city_handler("NE")
    Nigeria = create_city_handler("NG")
    Niue = create_city_handler("NU")
    NorfolkIsland = create_city_handler("NF")
    NorthernMarianaIslands = create_city_handler("MP")
    NorthKorea = create_city_handler("KP")
    NorthMacedonia = create_city_handler("MK")
    Norway = create_city_handler("NO")
    Oman = create_city_handler("OM")
    Pakistan = create_city_handler("PK")
    Palau = create_city_handler("PW")
    PalestinianTerritory = create_city_handler("PS")
    Panama = create_city_handler("PA")
    PapuaNewGuinea = create_city_handler("PG")
    Paraguay = create_city_handler("PY")
    Peru = create_city_handler("PE")
    Philippines = create_city_handler("PH")
    Pitcairn = create_city_handler("PN")
    Poland = create_city_handler("PL")
    Portugal = create_city_handler("PT")
    PuertoRico = create_city_handler("PR")
    Qatar = create_city_handler("QA")
    RepublicOfTheCongo = create_city_handler("CG")
    Reunion = create_city_handler("RE")
    Romania = create_city_handler("RO")
    Russia = create_city_handler("RU")
    Rwanda = create_city_handler("RW")
    SaintBarthelemy = create_city_handler("BL")
    SaintHelena = create_city_handler("SH")
    SaintKittsAndNevis = create_city_handler("KN")
    SaintLucia = create_city_handler("LC")
    SaintMartin = create_city_handler("MF")
    SaintPierreAndMiquelon = create_city_handler("PM")
    SaintVincentAndTheGrenadines = create_city_handler("VC")
    Samoa = create_city_handler("WS")
    SanMarino = create_city_handler("SM")
    SaoTomeAndPrincipe = create_city_handler("ST")
    SaudiArabia = create_city_handler("SA")
    Senegal = create_city_handler("SN")
    Serbia = create_city_handler("RS")
    SerbiaAndMontenegro = create_city_handler("CS")
    Seychelles = create_city_handler("SC")
    SierraLeone = create_city_handler("SL")
    Singapore = create_city_handler("SG")
    SintMaarten = create_city_handler("SX")
    Slovakia = create_city_handler("SK")
    Slovenia = create_city_handler("SI")
    SolomonIslands = create_city_handler("SB")
    Somalia = create_city_handler("SO")
    SouthAfrica = create_city_handler("ZA")
    SouthGeorgiaAndTheSouthSandwichIslands = create_city_handler("GS")
    SouthKorea = create_city_handler("KR")
    SouthSudan = create_city_handler("SS")
    Spain = create_city_handler("ES")
    SriLanka = create_city_handler("LK")
    Sudan = create_city_handler("SD")
    Suriname = create_city_handler("SR")
    SvalbardAndJanMayen = create_city_handler("SJ")
    Sweden = create_city_handler("SE")
    Switzerland = create_city_handler("CH")
    Syria = create_city_handler("SY")
    Taiwan = create_city_handler("TW")
    Tajikistan = create_city_handler("TJ")
    Tanzania = create_city_handler("TZ")
    Thailand = create_city_handler("TH")
    TimorLeste = create_city_handler("TL")
    Togo = create_city_handler("TG")
    Tokelau = create_city_handler("TK")
    Tonga = create_city_handler("TO")
    TrinidadAndTobago = create_city_handler("TT")
    Tunisia = create_city_handler("TN")
    Turkey = create_city_handler("TR")
    Turkmenistan = create_city_handler("TM")
    TurksAndCaicosIslands = create_city_handler("TC")
    Tuvalu = create_city_handler("TV")
    Uganda = create_city_handler("UG")
    Ukraine = create_city_handler("UA")
    UnitedArabEmirates = create_city_handler("AE")
    UnitedKingdom = create_city_handler("GB")
    UnitedStates = create_city_handler("US")
    UnitedStatesMinorOutlyingIslands = create_city_handler("UM")
    Uruguay = create_city_handler("UY")
    USVirginIslands = create_city_handler("VI")
    Uzbekistan = create_city_handler("UZ")
    Vanuatu = create_city_handler("VU")
    Vatican = create_city_handler("VA")
    Venezuela = create_city_handler("VE")
    Vietnam = create_city_handler("VN")
    WallisAndFutuna = create_city_handler("WF")
    WesternSahara = create_city_handler("EH")
    Yemen = create_city_handler("YE")
    Zambia = create_city_handler("ZM")
    Zimbabwe = create_city_handler("ZW")

if __name__ == "__main__":
    print(Cities.India("web developers in"))