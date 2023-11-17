from src.gmaps import Gmaps
from botasaurus import bt
from botasaurus.cache import Cache
message = '''Love It? Star It! ⭐ https://github.com/omkarcloud/google-maps-scraper/'''

# Cache.clear()

# links = [
#    "https://www.google.com/maps/place/Zinavo-+Web+Development,+Web+Design+Company+in+Bangalore,+SEO+Services,+Digital+Marketing+Agency,+eCommerce+Web+Development/@13.01443,77.6480612,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae172f3e7069f1:0xbcac5b2d393c2aa2!8m2!3d13.01443!4d77.6480612!16s%2Fg%2F11h0l3y9l?authuser=0&hl=en&entry=ttu",
#    "https://www.google.com/maps/place/SeekNEO+-+Web+Development,+Web+Design+Company+in+Bangalore,+eCommerce+Web+Development,+SEO+Services,+Digital+Marketing+Agency/@12.9863763,77.5473899,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae13ac4bcc6641:0x1bf48a7dee3d5a51!8m2!3d12.9863763!4d77.5473899!16s%2Fg%2F11g2338zrl?authuser=0&hl=en&entry=ttu"
# ]
# output_folder = "my-awesome-places"

# Gmaps.links(links, output_folder)


m = [
    Gmaps.Fields.PLACE_ID, 
    Gmaps.Fields.NAME, 
    Gmaps.Fields.MAIN_CATEGORY, 
    Gmaps.Fields.RATING, 
    Gmaps.Fields.REVIEWS, 
    Gmaps.Fields.WEBSITE, 
    Gmaps.Fields.PHONE, 
    Gmaps.Fields.ADDRESS,
    Gmaps.Fields.LINK, 

]


queries = Gmaps.Cities.India("web developers in")[0:100]
queries= [
    "web developers in Mumbai",
    "web developers in Delhi",
    "web developers in Bangalore",
    "web developers in Hyderabad",
    "web developers in Ahmedabad",
    "web developers in Chennai",
    "web developers in Kolkata",
    "web developers in Surat",
    "web developers in Pune",
    "web developers in Jaipur",
    "web developers in Lucknow",
    "web developers in Kanpur",
    "web developers in Nagpur",
    "web developers in Indore",
    "web developers in Thane",
    "web developers in Bhopal",
    "web developers in Visakhapatnam",
    "web developers in Pimpri-Chinchwad",
    "web developers in Patna",
    "web developers in Vadodara"
]

Gmaps.places(queries, fields=Gmaps.ALL_FIELDS) 

# # key = "e1428d8a72msh6b95a69d261ff5bp1c00c5jsnbebdad2a9983"
# # key = "9cd29602c4mshd467ab71cfcb1e0p1c8e02jsnac18255dfa0d"
# key = "168224a069mshae35d4f36ba451fp1e3d46jsna5e000bac71b"

# queries = ["web developers in  gurgaon"]
# result = Gmaps.places(queries,  
#                       # lang="es",
#                       # fields=Gmaps.ALL_FIELDS,  
#                       # max=5,
#                         # scrape_reviews=True, 
#                       # key=key
#                       )
# bt.write_json(result, "result.json")
