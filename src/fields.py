class Fields:

    PLACE_ID = "place_id"
    NAME = "name"
    DESCRIPTION = "description"
    IS_SPENDING_ON_ADS = "is_spending_on_ads"
    REVIEWS = "reviews"
    COMPETITORS = "competitors"
    WEBSITE = "website"

    EMAILS = "emails"
    PHONES = "phones"

    LINKEDIN = "linkedin"
    TWITTER = "twitter"
    FACEBOOK = "facebook"
    YOUTUBE = "youtube"
    INSTAGRAM = "instagram"
    PINTEREST = "pinterest"
    GITHUB = "github"
    SNAPCHAT = "snapchat"
    TIKTOK = "tiktok"

    OWNER = "owner"
    FEATURED_IMAGE = "featured_image"
    MAIN_CATEGORY = "main_category"
    CATEGORIES = "categories"
    RATING = "rating"
    WORKDAY_TIMING = "workday_timing"
    CLOSED_ON = "closed_on"
    PHONE = "phone"
    ADDRESS = "address"
    REVIEW_KEYWORDS = "review_keywords"
    LINK = "link"
    
    STATUS = "status"
    PRICE_RANGE = "price_range"
    REVIEWS_PER_RATING = "reviews_per_rating"
    FEATURED_QUESTION = "featured_question"
    REVIEWS_LINK = "reviews_link"
    COORDINATES = "coordinates"
    PLUS_CODE = "plus_code"
    DETAILED_ADDRESS = "detailed_address"
    TIME_ZONE = "time_zone"
    CID = "cid"
    DATA_ID = "data_id"

    MENU = "menu"
    RESERVATIONS = "reservations"
    ORDER_ONLINE_LINKS = "order_online_links"

    ABOUT = "about"
    IMAGES = "images"
    HOURS = "hours"
    MOST_POPULAR_TIMES = "most_popular_times"
    POPULAR_TIMES = "popular_times"

    FEATURED_REVIEWS = "featured_reviews"
    DETAILED_REVIEWS = "detailed_reviews"

DEFAULT_FIELDS_WITHOUT_SOCIAL_DATA = [
    Fields.PLACE_ID, 
    Fields.NAME, 
    Fields.DESCRIPTION, 
    Fields.IS_SPENDING_ON_ADS, 
    Fields.REVIEWS, 
    Fields.COMPETITORS, 
    Fields.WEBSITE, 
    Fields.OWNER, 
    Fields.FEATURED_IMAGE, 
    Fields.MAIN_CATEGORY, 
    Fields.CATEGORIES , 
    Fields.RATING, 
    Fields.WORKDAY_TIMING, 
    Fields.CLOSED_ON, 
    Fields.PHONE, 
    Fields.ADDRESS, 
    Fields.REVIEW_KEYWORDS,
    Fields.LINK, 
]

DEFAULT_SOCIAL_FIELDS = [
    Fields.EMAILS,
    Fields.PHONES,

    Fields.LINKEDIN, 
    Fields.TWITTER, 
    Fields.FACEBOOK, 
    Fields.YOUTUBE, 
    Fields.INSTAGRAM, 
]

ALL_SOCIAL_FIELDS = [
    Fields.EMAILS,
    Fields.PHONES,
    Fields.LINKEDIN, 
    Fields.TWITTER, 
    Fields.FACEBOOK, 
    Fields.YOUTUBE, 
    Fields.INSTAGRAM, 
    Fields.GITHUB, 
    Fields.SNAPCHAT, 
    Fields.TIKTOK, 

]

DEFAULT_FIELDS = [
    Fields.PLACE_ID,
    Fields.NAME, 
    Fields.DESCRIPTION, 
    Fields.IS_SPENDING_ON_ADS, 
    Fields.COMPETITORS,
    Fields.WEBSITE, 
    Fields.REVIEWS] + DEFAULT_SOCIAL_FIELDS + [
    Fields.OWNER, 
    Fields.FEATURED_IMAGE, 
    Fields.MAIN_CATEGORY, 
    Fields.CATEGORIES , 
    Fields.RATING, 
    Fields.WORKDAY_TIMING, 
    Fields.CLOSED_ON, 
    Fields.PHONE, 
    Fields.ADDRESS, 
    Fields.REVIEW_KEYWORDS,
    Fields.LINK, 
]

ALL_FIELDS_WITHOUT_SOCIAL_DATA = [
    

Fields.PLACE_ID,
Fields.NAME,
Fields.DESCRIPTION,
Fields.IS_SPENDING_ON_ADS,
Fields.COMPETITORS, 
Fields.REVIEWS,

Fields.WEBSITE,
Fields.OWNER,
Fields.FEATURED_IMAGE,
Fields.MAIN_CATEGORY,
Fields.CATEGORIES,
Fields.RATING,
Fields.WORKDAY_TIMING,
Fields.CLOSED_ON,
Fields.PHONE,
Fields.ADDRESS,
Fields.REVIEW_KEYWORDS,
Fields.LINK,

Fields.STATUS,
Fields.PRICE_RANGE,
Fields.REVIEWS_PER_RATING,
Fields.FEATURED_QUESTION,
Fields.REVIEWS_LINK,
Fields.COORDINATES,
Fields.PLUS_CODE,
Fields.DETAILED_ADDRESS,
Fields.TIME_ZONE,
Fields.CID,
Fields.DATA_ID,

Fields.MENU,
Fields.RESERVATIONS,
Fields.ORDER_ONLINE_LINKS,


Fields.ABOUT,
Fields.IMAGES,
Fields.HOURS,
Fields.MOST_POPULAR_TIMES,
Fields.POPULAR_TIMES,

Fields.FEATURED_REVIEWS,
Fields.DETAILED_REVIEWS,
]


ALL_FIELDS = [
    

Fields.PLACE_ID,
Fields.NAME,
Fields.DESCRIPTION,
Fields.IS_SPENDING_ON_ADS,
Fields.COMPETITORS, 
Fields.REVIEWS,
Fields.WEBSITE,

Fields.EMAILS,
Fields.PHONES,

Fields.LINKEDIN,
Fields.TWITTER,
Fields.FACEBOOK,
Fields.YOUTUBE,
Fields.INSTAGRAM,
Fields.PINTEREST,
Fields.GITHUB,
Fields.SNAPCHAT,
Fields.TIKTOK,

Fields.OWNER,
Fields.FEATURED_IMAGE,
Fields.MAIN_CATEGORY,
Fields.CATEGORIES,
Fields.RATING,
Fields.WORKDAY_TIMING,
Fields.CLOSED_ON,
Fields.PHONE,
Fields.ADDRESS,
Fields.REVIEW_KEYWORDS,
Fields.LINK,

Fields.STATUS,
Fields.PRICE_RANGE,
Fields.REVIEWS_PER_RATING,
Fields.FEATURED_QUESTION,
Fields.REVIEWS_LINK,
Fields.COORDINATES,
Fields.PLUS_CODE,
Fields.DETAILED_ADDRESS,
Fields.TIME_ZONE,
Fields.CID,
Fields.DATA_ID,

Fields.ABOUT,
Fields.IMAGES,
Fields.HOURS,
Fields.MOST_POPULAR_TIMES,
Fields.POPULAR_TIMES,

Fields.MENU,
Fields.RESERVATIONS,
Fields.ORDER_ONLINE_LINKS,

Fields.FEATURED_REVIEWS,
Fields.DETAILED_REVIEWS,
]
