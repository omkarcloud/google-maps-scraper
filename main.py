from src.gmaps import Gmaps

love_it_star_it = '''Love It? Star It! ⭐ https://github.com/omkarcloud/google-maps-scraper/'''
queries = [
"tagungsraum",
"seminarraum",
"yogaraum",
"gemeinschaftraum",
"raum mieten",
"räume mieten",
"therapieraaum",
"therapieraum mieten",
"tanzstudio mieten",
"gemeinschaftsraum mieten",
"seminarraum mieten",
"tagungsraum mieten",
"eventraum mieten",
"mietstudio",
"mietraum",
"raum zur miete",
"shares space",
"shared office",
"tagesmiete",
"stundenweise vermietung",
"tageweise vermietung",
"gaststätte mieten",
"veranstaltungsraum",
"bürgerhaus",
"bürgerraum",
"gemeindehaus",
"musikraum",
"konferenzraum mieten",
"space mieten"
]

Gmaps.places(queries, geo_coordinates="48.768684, 9.175138", zoom=11)