country_code_to_cities = {
    "PL": [
        "Katowice", "Częstochowa", "Sosnowiec", "Gliwice", "Bielsko-Biała", "Zabrze", "Bytom", "Rybnik", "Ruda Śląska", "Tychy", 
        "Dąbrowa Górnicza", "Chorzów", "Jaworzno", "Jastrzębie-Zdrój", "Mysłowice", "Siemianowice Śląskie", "Żory", "Tarnowskie Góry", 
        "Będzin", "Piekary Śląskie", "Racibórz", "Zawiercie", "Świętochłowice", "Wodzisław Śląski", "Mikołów", "Knurów", 
        "Czechowice-Dziedzice", "Cieszyn", "Czeladź", "Żywiec", "Myszków", "Czerwionka-Leszczyny", "Pszczyna", "Lubliniec", 
        "Orzesze", "Łaziska Górne", "Rydułtowy", "Bieruń", "Pyskowice", "Radlin", "Lędziny", "Radzionków", "Ustroń", "Skoczów", 
        "Pszów", "Kłobuck", "Wisła", "Imielin", "Blachownia", "Wojkowice", "Kalety", "Poręba", "Miasteczko Śląskie", "Sławków", 
        "Łazy", "Siewierz", "Koniecpol", "Szczyrk", "Kuźnia Raciborska", "Żarki", "Krzepice", "Woźniki", "Ogrodzieniec", "Strumień", 
        "Toszek", "Szczekociny", "Wilamowice", "Olsztyn", "Koziegłowy", "Krzanowice", "Sośnicowice", "Pilica"
    ]
}
def get_cities(value):
    return country_code_to_cities[value]
