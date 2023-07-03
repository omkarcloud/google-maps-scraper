<p align="center">
  <img src="https://www.omkar.cloud/images/favicon/prod/favicon-256x256.png" alt="omkar" />
</p>
  <div align="center" style="margin-top: 0;">
  <h1>✨ Google Maps Scraper 🤖</h1>
  <p>💦 Enjoy the Rain of Google Maps Leads 💦</p>
</div>
<em>
  <h5 align="center">(Programming Language - Python 3)</h5>
</em>
<p align="center">
  <a href="#">
    <img alt="google-maps-scraper forks" src="https://img.shields.io/github/forks/omkarcloud/google-maps-scraper?style=for-the-badge" />
  </a>
  <a href="#">
    <img alt="Repo stars" src="https://img.shields.io/github/stars/omkarcloud/google-maps-scraper?style=for-the-badge&color=yellow" />
  </a>
  <a href="#">
    <img alt="google-maps-scraper License" src="https://img.shields.io/github/license/omkarcloud/google-maps-scraper?color=orange&style=for-the-badge" />
  </a>
  <a href="https://github.com/omkarcloud/google-maps-scraper/issues">
    <img alt="issues" src="https://img.shields.io/github/issues/omkarcloud/google-maps-scraper?color=purple&style=for-the-badge" />
  </a>
</p>
<p align="center">
  <img src="https://views.whatilearened.today/views/github/omkarcloud/google-maps-scraper.svg" width="80px" height="28px" alt="View" />
</p>

---

🌟 Get 120 Leads in 10 Minutes! 🤖

## 🚀 Getting Started

_If you are not a techy person or don't know how to use git. You can follow [this video](https://www.youtube.com/watch?v=zOlvYakogSU) to make bot run._


1️⃣ Clone the Magic 🧙‍♀️:
```shell
git clone https://github.com/omkarcloud/google-maps-scraper
cd google-maps-scraper
```
2️⃣ Install Dependencies 📦:
```shell
python -m pip install -r requirements.txt
```
3️⃣ Let the Rain of Google Map Leads Begin 😎:
```shell
python main.py
```

Once the scraping process is complete, you can find your leads in the `output` directory. 

![Google Maps Data Scraper CSV Result](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/gmap_result.png)

## Video Demo 

Watch this video to see the bot in action!

[![Google Maps Video Tutorial](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/video.png)](https://www.youtube.com/watch?v=zOlvYakogSU)

## 🤔 FAQs

### ❓ The scraper is only retrieving 5 results. How can I scrape all Google Maps search results?
A: Open the file `src/config.py` and comment out the line that sets the `max_results` parameter. 

By doing so, you can scrape all the search results from Google Maps. For example, to scrape all restaurants in Delhi, modify the code as follows:
```python
queries = [
    {
        "keyword": "restaurants in delhi",
        # "max_results" : 5,
    },
]
```

### ❓ I want to scrape search results for a specific business in a particular location. How can I achieve that?
A: Open the file `src/config.py` and update the `keyword` with your desired search query. 

For example, if you want to scrape data about stupas in Kathmandu 🇳🇵, modify the code as follows:
```python
queries = [
    {
        "keyword": "stupas in kathmandu",
    },
]
```


### ❓ How can I filter google map search results?

A: You have the option to apply filters to your Google Maps search results using the following parameters:

1. min_rating
2. min_reviews
3. max_reviews
4. has_phone
5. has_website


To specify filters, open `src/config.py` and specify your filters. 

The Following example will scrape only those listings with a minimum of 5 reviews, a maximum of 100 reviews, and a phone number.

```python
queries = [
    {
        "keyword": "restaurants in delhi",
        "min_reviews": 5 ,
        "max_reviews": 100,
        "has_phone": True,
    },
]

### ❓ Can I scrape more than one query using this script?
A: Absolutely! Open `src/config.py` and add as many queries as you like. 

For example, if you want to scrape restaurants in both Delhi 😎 and Bangalore 👨‍💻, use the following code:
```python
queries = [
    {
        "keyword": "restaurants in delhi",
        "max_results": 5,
    },
    {
        "keyword": "restaurants in bangalore",
        "max_results": 5,
    }
]
```
### ❓ How much time does it take to scrape "n" searches?

On average, each Google Maps search gives 120 listings. It takes approximately 10 minutes to scrape these 120 listings.

To calculate the number of **hours** it takes to scrape "n" searches, you can **google search** this formula substituting `n` with number of searches you want to conduct:

`n * 10 minutes in hour`

For example, if you want to scrape 10 google map queries or 1200 listings, it will take around 1.6 hours.

![](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/search-time.png)

### ❓ How can I utilize the data obtained from Google Maps?
A: Most people scrape Google Maps Listings to sell things!

For example, you can search for restaurants in Amritsar and pitch your web development services to them.

You can also find real estate listings in Delhi and promote your exceptional real estate software.

Google Maps is seriously a great platform to find B2B customers to sell things to!


### ❓ What services do you provide?
A: We specialize in developing professional bots. Some of our popular Ready Made Bots, are:

1. **LinkedIn Messaging Bot**: Connect with thousands of LinkedIn users to promote and sell your products.
2. **Gmail Email Sending Bot**: Reach out to thousands of people through email to market your products.
3. **Discord Messaging Bot**: Engage with a large audience on Discord and promote your offerings.
4. **Reddit Messaging Bot**: Communicate with thousands of individuals on Reddit to showcase your products.
5. **Instagram Messaging Bot**: Connect with a wide user base on Instagram and promote your brand.
6. **Realtors Scraping**: Extract real-time home listings from realtors websites.

In addition, we offer Custom Bot Solutions tailored to your specific requirements. 

Let's discuss your requirements further! Feel free to reach out to me at chetan@omkar.cloud.

### ❓ The code looks well-structured and organized. Most Selenium codebases are messy. How did you do it?

A: I use the Bose Framework, a Bot Development Framework that greatly simplifies the process of creating bots.

The Google Maps Scraper uses Bose to:

1. Enable running the bot multiple times
2. Maintain code structure
3. Save the data as JSON and CSV
4. Incorporate anti-bot detection features
5. Utilize the enhanced Selenium Driver to reduce code.

You can see `scrape_google_maps_links_task.py` to understand the simplicity Bose Brings.

Without Bose Framework, it would be 2x more harder to make this Google Maps Scraper.

Explore the Bose Framework [here](https://www.omkar.cloud/bose/).

<!-- 
### ❓ How can I express my gratitude?
A: If this bot has saved you valuable development time and you are financially able, consider [sponsoring me](https://github.com/sponsors/omkarcloud). Your support is greatly appreciated.
-->

### ❓ How can I thank you?

Star ⭐ the repository.

Your star will send me a Telegram Notification, and it will bring a smile to my face :)


---

*PS: If you're interested in getting an enhanced version of this scraper capable of extracting 8x more data in the same time, you can reach out to me at chetan@omkar.cloud. The cost is $75, and it will save you 8x more time.*

## Love It? Star It! ⭐