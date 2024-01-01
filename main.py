from src import Gmaps

love_it_star_it = '''Love It? Star It! ⭐ https://github.com/omkarcloud/google-maps-scraper/'''

queries = [
   "web developers in bangalore"
]

Gmaps.places(queries, max=5)