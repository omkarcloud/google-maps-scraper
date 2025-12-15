# Google Maps Scraper Fields


Below is the complete list of fields (schema) present in every data record.

**Important:**
- Normal Places like Restaurants, Gyms, etc., will not have fields like `checkin_date`, `bedrooms`, `hotel_stars`. These fields are specific to rentals/hotels and are determined by the `is_rental` field.
- The value for `kgmid` is the unique identifier for each data record. It is guaranteed to be present in every data point and unique.
- Do not use `place_id` as a unique identifier. It is possibly but rarely missing, like in this place: 
  https://www.google.com/maps/place/Rural+house+%28full+rental%29+Finca+El+Gato+for+6+people/data=!4m9!3m8!5m2!4m1!1i2!8m2!3d37.8847923!4d-6.5552788!16s%2Fg%2F11x8cdnxp8!17BQ0FF?authuser=0&hl=en&rclk=1
- All data points are guaranteed to be 100% accurate and match Google Maps data.

---

## Place Fields

### Core Identifiers & Info
- PLACE_ID
- KGMID (Knowledge Graph Machine ID) - unique id for each business on Google Maps
- CID
- DATA_ID
- NAME
- DESCRIPTION
- LINK
- MAIN_CATEGORY
- CATEGORIES

### Contact & Business Info
- WEBSITE
- PHONE
- ADDRESS
- DETAILED_ADDRESS
- COORDINATES
- PLUS_CODE
- TIME_ZONE

### Ratings & Reviews
- RATING
- REVIEWS
- REVIEWS_PER_RATING
- REVIEWS_LINK
- REVIEW_KEYWORDS
- FEATURED_REVIEWS

### Social Media
- LINKEDIN
- TWITTER
- FACEBOOK
- YOUTUBE
- INSTAGRAM
- PINTEREST
- GITHUB
- SNAPCHAT
- TIKTOK

### Ownership & Listing Status
- OWNER
- OWNER_POSTS
- CAN_CLAIM
- IS_SPENDING_ON_ADS
- STATUS
- IS_TEMPORARILY_CLOSED
- IS_PERMANENTLY_CLOSED

### Media & Visuals
- FEATURED_IMAGE
- FEATURED_IMAGES
- IMAGE_COUNT
- IMAGES

### Business Hours & Timing
- WORKDAY_TIMING
- CLOSED_ON
- HOURS
- MOST_POPULAR_TIMES
- POPULAR_TIMES

### Services & Ordering
- MENU
- RESERVATIONS
- ORDER_ONLINE_LINKS
- PRICE_RANGE

### Additional Details
- ABOUT
- ON_SITE_PLACES
- GAS_PRICES
- CUSTOMER_UPDATES
- FEATURED_QUESTION
- COMPETITORS
- LOCATION_SUMMARY

---

## Rental Fields

### Core Identifiers & Info
- IS_RENTAL [Determines if the place is a rental or a normal business]
- PLACE_ID
- KGMID (Knowledge Graph Machine ID) - unique id for each business on Google Maps
- CID
- DATA_ID
- NAME
- DESCRIPTION
- LINK
- MAIN_CATEGORY
- CATEGORIES
- HOTEL_STARS
- PRICE

### Contact & Business Info
- WEBSITE
- PHONE
- ADDRESS
- DETAILED_ADDRESS
- COORDINATES
- PLUS_CODE
- TIME_ZONE

### Ratings & Reviews
- RATING
- REVIEWS
- REVIEWS_PER_RATING
- REVIEWS_LINK
- REVIEW_KEYWORDS
- FEATURED_REVIEWS
- FEATURED_PARTNER_REVIEWS

### Social Media
- LINKEDIN
- TWITTER
- FACEBOOK
- YOUTUBE
- INSTAGRAM
- PINTEREST
- GITHUB
- SNAPCHAT
- TIKTOK

### Ownership & Listing Status
- OWNER
- OWNER_POSTS
- CAN_CLAIM
- IS_SPENDING_ON_ADS
- STATUS
- IS_TEMPORARILY_CLOSED
- IS_PERMANENTLY_CLOSED

### Media & Visuals
- FEATURED_IMAGE
- FEATURED_IMAGES
- IMAGE_COUNT
- IMAGES

### Property Details
- SLEEPS
- BEDROOMS
- BEDS
- BATHROOMS
- MIN_NIGHTS
- AMENITIES

### Check-in/Check-out
- CHECKIN_DATE
- CHECKOUT_DATE
- CHECKIN_TIME
- CHECKOUT_TIME

### Booking & Availability
- BOOKING_PLATFORMS
- ADDITIONAL_RESULTS_FROM_WEB

### Additional Details
- ABOUT
- ON_SITE_PLACES
- CUSTOMER_UPDATES
- FEATURED_QUESTION
- COMPETITORS
- LOCATION_SUMMARY
- NEARBY_RENTALS
- NEARBY_HOTELS