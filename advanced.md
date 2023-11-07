## 🤔 Advanced Questions

### ❓ I don't have Python, or I'm facing errors when setting up the scraper on my PC. How to solve it?

You can easily run the scraper in Gitpod, a browser-based development environment. Set it up in just 5 minutes by following these steps:

1. Visit [this link](https://gitpod.io/#https://github.com/omkarcloud/google-maps-scraper) and sign up using your GitHub account.
   
   ![Screenshot (148)](https://github.com/omkarcloud/google-maps-scraper/assets/53407137/f498dda8-5352-4f7a-9d70-c717859670d4.png)
  
2. To speed up scraping, select the Large 8 Core, 16 GB Ram Machine and click the `Continue` button.   

   ![16gb select](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/16gb-select.png)

3. In the terminal, run the following command to start scraping:
   ```bash
   python main.py
   ```
  
4. Once the scraper has finished running, download the leads from the `output` folder.

   ![Screenshot (219)](https://github.com/omkarcloud/google-maps-scraper/assets/53407137/bade4001-12dc-4191-972e-cba0466f3e3f.png)

Please understand:
   - The internet speed in Gitpod is extremely fast at around 180 Mbps.

      ![speedtest](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/speedtest.png)

   - You need to interact with Gitpod, such as clicking within the environment, every 30 minutes to prevent the machine from automatically closing.

### ❓ How to Scrape Reviews?
Set the `scrape_reviews` argument to true.

```python
queries = [
   "web developers in bangalore"
]

gmaps.places(queries, scrape_reviews=True)
```

You can also configure the following options:
- reviews_max (Defaults: 20)
- reviews_sort (Defaults: Newest)
   - Options are Newest, Oldest, Relevance, Highest Rated, Lowest Rated

Here is an example that scrapes the Lowest Rated, 100 Reviews.
```python
queries = [
   "web developers in bangalore"
]

gmaps.places(queries, scrape_reviews=True, reviews_max=100, reviews_sort=Gmaps.LowestRated)
```

To scrape all reviews without any limit, you can set `reviews_max` to `Gmaps.ALL_REVIEWS`. 

```python
queries = [
   "web developers in bangalore"
]

gmaps.places(queries, scrape_reviews=True, reviews_max=Gmaps.ALL_REVIEWS, reviews_sort=Gmaps.LowestRated)
```

Please understand that some places may have thousands of reviews, so scraping all reviews may take a long time. 

It's best to limit the number of reviews to scrape to a number like 100 or 1000.

### ❓ How to select more fields?

Seeing a lot of fields can be intimidating, so we have only kept the most important fields in the output.

However, you can select 28 more fields which are highlighted_reviews.

To select all fields, use the following code:

```python
queries = [
   "web developers in bangalore"
]
gmaps.places(queries, lang=bt.Lang.Spanish, fields=Gmaps.ALL_FIELDS)
```

To select specific fields only, use the following code:

```python
queries = [
   "web developers in bangalore"
]
gmaps.places(queries, lang=bt.Lang.Spanish, fields=["title", "link", "main_category", "rating", "reviews", "website", "phone", "address"])
```

Please note that selecting more or fewer fields will not affect the scraping time; it will remain exactly the same.

So, don't fall into the trap of selecting fewer fields thinking it will decrease the scraping time, because it won't. 

### ❓ How many Keywords Can It Scrape per Hour?

- If you have 4 GB of free RAM then, n Keywords per Hour
- If you have 8 GB of free RAM then, n Keywords per Hour

Also, you don't need to worry about the scraping speed because even if you run it for an hour with 4 GB free RAM, you can scrape thousands of leads.

Reaching out to thousands of leads can easily keep you busy for 2 weeks.

So, simply run the scraper while you are doing other things on your PC, and you will have thousands of leads in no time.

### ❓ What are Popular Snippets for Data Scientists?

- Scrape 100 Newest Google Maps Places Reviews of a Country.

```python
queries = Gmaps.Cities.India("your_target in")

gmaps.places(queries, scrape_reviews=True, reviews_max=100, reviews_sort=Gmaps.Newest)
```

### ❓ How to Change the Language of Output?
Pass the `lang` argument.

For example, if you want to scrape results in Hindi, you can do so by passing `lang="bt.Lang.Hindi"`.

```python
queries = [
   "web developers in bangalore"
]
gmaps.places(queries, lang=bt.Lang.Hindi)
```

All Google Maps languages are supported. Some popular languages you may want to use are:
- bt.Lang.Hindi
- bt.Lang.Spanish
- bt.Lang.English
- bt.Lang.Japanese
- bt.Lang.German

### ❓ I have Google Map Places Links, How to Scrape Links?

Use the `links` method to scrape information from specific Google Maps place links. Here's an example:

```python
links = [
   "https://www.google.com/maps/place/Zinavo-+Web+Development,+Web+Design+Company+in+Bangalore,+SEO+Services,+Digital+Marketing+Agency,+eCommerce+Web+Development/@13.01443,77.6480612,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae172f3e7069f1:0xbcac5b2d393c2aa2!8m2!3d13.01443!4d77.6480612!16s%2Fg%2F11h0l3y9l?authuser=0&hl=en&entry=ttu",
   "https://www.google.com/maps/place/SeekNEO+-+Web+Development,+Web+Design+Company+in+Bangalore,+eCommerce+Web+Development,+SEO+Services,+Digital+Marketing+Agency/@12.9863763,77.5473899,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae13ac4bcc6641:0x1bf48a7dee3d5a51!8m2!3d12.9863763!4d77.5473899!16s%2Fg%2F11g2338zrl?authuser=0&hl=en&entry=ttu"
]
gmaps.links(links)
```

### ❓ How to Scrape at Particular Coordinates and Zoom Level?

Provide the coordinates to the scraper as follows:

```python
queries = [
   "web developers in bangalore"
]

gmaps.places(queries, geo_coordinates="12.900490, 77.571466")
```

You can also adjust the zoom level, which will zoom in to the location before scraping:

- 1 (Whole Planet)
- 21 (House Level)

Zooming results in more places being scraped within a smaller area. Below is the same map at different zoom levels, yielding different numbers of results.

![Comparison Image](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/zoom-level.png)

*Image Credits: Apify*

For example, to scrape places in Bangalore at zoom level 16:

```python
queries = [
   "web developers in bangalore"
]

gmaps.places(queries, geo_coordinates="12.900490, 77.571466", zoom=16)
```

### ❓ Why Do You Randomize Cities for Each User?

We randomize cities for each user to increase the chances of sales. 

If multiple users are targeting the same leads in the same cities, it reduces the opportunity for each. 

Randomizing cities spreads them among our users, giving each user a better chance to make a sale.

### ❓ Do I Need Proxies?

No, you do not need proxies. You can scrape hundreds of thousands of leads without needing them.

### ❓ The Turkish Characters Aren't Rendering Properly in Excel?

This issue occurs only in Excel, which does not render Turkish characters properly. The easiest solution is to upload the CSV to Google Sheets, which should render the characters correctly.

![turkish-character-fix](https://github.com/omkarcloud/google-maps-scraper/assets/53407137/1362b910-7102-4c74-9231-c18cb4504161)

### ❓ I am a Web Scraper; The Scraper is Really Impressive with Caching and Parallel Scraping Features?

Yes, it includes advanced features that enhance efficiency and user experience, such as:

- Parallel scraping to save time.
- Keeping drivers alive for quick task initiation.
- Automatic calculation of the number of scrapers to run in parallel based on system resources.
- Asynchronous scraping, allowing for data scraping in the background.
- Caching results so you can pick up where you left off in case of interruption.

The scraper leverages the Botasaurus Web Scraping Framework, which simplifies the implementation of these features. We encourage you to:

1. Read the code in `TODO.py` to appreciate how beautifully these features have been implemented.
2. Learn about the Botasaurus Framework to save countless hours in your career as a web scraper, [here](https://github.com/omkarcloud/botasaurus).

<p align="center">
  <a href="https://github.com/omkarcloud/botasaurus">
  <img src="https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/mascot.png" alt="botasaurus" />
</a>
</p>

## Love It? [Star It ⭐!](https://github.com/omkarcloud/google-maps-scraper)

Become one of our amazing stargazers by giving us a star ⭐ on GitHub!

It's just one click, but it means the world to us.

[![Stargazers for @omkarcloud/google-maps-scraper](https://bytecrank.com/nastyox/reporoster/php/stargazersSVG.php?user=omkarcloud&repo=google-maps-scraper)](https://github.com/omkarcloud/google-maps-scraper/stargazers)

## Made with *Discipline* for you in Bharat 🇮🇳 - Vande Mataram
