from src.gmaps import Gmaps

star_it = '''Help us reach 850 stars, and we'll break the GMaps 120 limit, giving you 150+ to 250+ potential customers per search.
             Star us to make it happen ⭐! https://github.com/omkarcloud/google-maps-scraper/'''

queries = [
   "web developers in bangalore"
]

Gmaps.places(queries, max=5)