<p align="center">
  <img src="https://www.omkar.cloud/images/favicon/prod/favicon-256x256.png" alt="omkar" />
</p>
  <div align="center" style="margin-top: 0;">
  <h1>✨ Google Maps Scraper 🤖</h1>
  <p>💦 Find New Customers and Grow Your Buisness 💦</p>
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

<p align="center">
  <a href="https://gitpod.io/#https://github.com/omkarcloud/google-maps-scraper">
    <img alt="Open in Gitpod" src="https://gitpod.io/button/open-in-gitpod.svg" />
  </a>
</p>
  
---
  
⚡ Get 120 Leads in next 5 Minutes! ⚡

Hello, Hola, Namaste And Sat Sri Akal! 🙏

I am Google Maps Scraper, created to help you find new customers and grow your sales. 🚀

*Why Scrape Google Maps?* 
Here's why Google Maps is the perfect *hunting ground* for B2B customers:

- 📞 Connect with potential clients directly, drastically reducing the time it takes to seal a deal.

- 🌟 Target rich business owners based on their reviews, and supercharge your sales.

- 🎯 With access to categories and websites, you can customize your pitch to cater to specific businesses and maximize your sales potential.

Countless entrepreneurs like you have achieved remarkable success by prospecting leads solely from Google Maps, and now it's your turn to make an Impact!

## ⚡ Benefits

Let's delve into some of my remarkable features that you will love:

1. Scrape emails, Facebook, Twitter, and LinkedIn to deliver your message directly to the customer.

2. Limitless Scraping, Say No to costly subscriptions or pay-per-lead fees.

3. Sort, select, and filter leads to find those most relevant to your business.

4. Book resources and strategize on how to reach out to leads effectively.

5. Supports Scraping Thousands of Customer Reviews.

6. Scrape cities across all countries, to make your product reach every corner of the World.

In the next 5 minutes, you'll witness the magic as I extract **120 Leads** from Google Maps for you, opening up a world of opportunities.

![Google Maps Data Scraper CSV Result](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/gmap_result.png)

Ready to skyrocket your customer base? Let's get started! 💼🌍

## 🎥 Video Demo

If you'd like to see my powerful capabilities in action before using me, I encourage you to watch this short video.

[![Google Maps Video Tutorial](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/video.png)](https://www.youtube.com/watch?v=6UZhTlkCb9A)

## 🚀 Getting Started

Let's get started generating Google Maps Leads by following these super simple steps:

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


If you,

- Don't have Python installed
- Facing installation errors
- Having low internet speed
- Having low RAM

Then you should follow this simple FAQ [here](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-i-dont-have-python-or-im-facing-errors-when-setting-up-the-scraper-on-my-pc-how-to-solve-it), and you'll have your Google Maps leads in the next 5 minutes.

## 🤔 Questions

### ❓ How to Scrape a Specific Search Query?
To scrape a specific query, open `main.py` file and update the `queries` list with your desired query.

```python
queries = ["web developers in Delhi"]
Gmaps.places(queries)
```

**Note:** Due to Google's scrolling limitation, you can scrape up to 120 leads per search.

### ❓ How to Scrape Multiple Queries?
Add multiple queries to the `queries` list as follows:

```python
queries = [
   "web developers in Bangalore",
   "web developers in Delhi",
]
Gmaps.places(queries)
```

### ❓ How Can I Filter Google Map Search Results?
You can apply filters such as:

1. `min_rating`/`max_rating` (e.g., 3.5)
2. `min_reviews`/`max_reviews` (e.g., 10)
3. `has_phone` (e.g., True/False)
4. `has_website` (e.g., True/False)
5. `category_in` (e.g., "Dental Clinic", "Dental Laboratory")

For instance, to scrape listings with at least 5 reviews and no more than 100 reviews, with a phone number but no website:

```python
Gmaps.places(queries, min_reviews=5, max_reviews=100, has_phone=True, has_website=False)
```

To scrape listings that belong to specific categories:

```python
Gmaps.places(queries, category_in=[Gmaps.Category.DentalClinic, Gmaps.Category.DentalLaboratory])
```

All Categories can be found in the `category.py` file.

### ❓ How to Sort by Reviews, Rating, or Category?

- To sort by reviews:

```python
Gmaps.places(queries, sort=Gmaps.SORT_BY_REVIEWS_DESCENDING)
```

- To sort by rating:

```python
Gmaps.places(queries, sort=Gmaps.SORT_BY_RATING_DESCENDING)
```

- To sort by title (alphabetically):

```python
Gmaps.places(queries, sort=Gmaps.SORT_BY_TITLE_ASCENDING)
```

- To sort by a different field, such as category, in ascending order:

```python
Gmaps.places(queries, sort=["category", "asc"])
```

- Or, in descending order:

```python
Gmaps.places(queries, sort=["category", "desc"])
```

### ❓ How to Scrape a Maximum of 5 Results Only?

Set the `max` parameter:

```python
Gmaps.places(queries, max=5)
```

### ❓ I Need to Reach Out to Leads to Sell My Products/Services. How Do I Scrape Email, Facebook, Twitter, LinkedIn, etc.?

Reaching out to potential customers via email, LinkedIn, etc., is an excellent idea.

You will need a contact-finding API. The Website Contacts Scraper is an excellent API to use.

Follow these simple steps to use it:

1. Sign up on RapidAPI by visiting [this link](https://rapidapi.com/auth/sign-up).
   
![Sign Up on RapidAPI](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/sign-up.png)

2. Subscribe to the Free Plan by visiting [this link](https://rapidapi.com/letscrape-6bRBa3QguO5/api/website-contacts-scraper/pricing).

![Subscribe to Free Plan](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/subscribe.png)

3. Copy the API key.
![Copy the API Key](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/key.png)

4. Use it in the scraper as follows:
```python
queries = ["web developers in Bangalore"]
Gmaps.places(queries, max=5, key="YOUR_API_KEY") 
```
5. Run the script, and you'll find emails, Facebook, Twitter, and LinkedIn details of leads in your output file.

The first 40 emails are free, after which it costs $25 for 10,000 scrapes, which is affordable considering if you land just one B2B client, you could easily make hundreds of dollars, easily covering the cost.

### ❓ How to scrape all cities in my country?

For example, To scrape web developers from 100 cities in India, use the following example:

```python
queries = Gmaps.Cities.India("web developers in")[0:100]
Gmaps.places(queries) 
```

After running the code, an `india-cities.json` file will be generated in the `output` directory with a list of all the Indian cities.

You can prioritize certain cities by editing the cities JSON file in the output folder and moving them to the top of the list.

We recommend scraping only 100 cities at a time, as countries like India have thousands of cities, and scraping them all could take a considerable amount of time. Once you've exhausted the outreach in 100 cities, you can scrape more.

### ❓ Can I Interrupt the Scrape While It's Running?
Yes, you can. The scraper will resume from where it left off if you interrupt the process.


### ❓ What are popular use cases for entrepreneurs?

- For selling to B2C businesses like restaurants and clothing shops:
  - They should be affluent enough to afford your services.
  - Avoid very large businesses, as they tend to be bureaucratic and harder to sell to.

```python
queries = Gmaps.Cities.India("your_target_customer in")[0:5]
Gmaps.places(queries,
             min_reviews=60,
             max_reviews=800,
             key="YOUR_API_KEY")
```

- For selling to B2B businesses like web developers, digital marketers, or less frequent B2C businesses such as dentists, doctors, lawyers:
  - They should be affluent enough to afford your services.

```python
queries = Gmaps.Cities.India("your_target_customer in")[0:5]
Gmaps.places(queries, min_reviews=25, key="YOUR_API_KEY") 
```

- For selling web development services to businesses such as restaurants that do not have a website:

```python
queries = Gmaps.Cities.India("your_target_customer in")[0:5]
Gmaps.places(queries, min_reviews=25, has_phone=True, has_website=False, key="YOUR_API_KEY") 
```

Most importantly, avoid the temptation to sell to leads with low reviews, as they may not have the budget for your services and could be a time-consuming prospect.

### ❓ Do You Know of an Effective Strategy to Increase the Chances of Selling My Product?

Here is a brilliant one:

1. Read [The Cold Email Manifesto](https://www.amazon.com/Cold-Email-Manifesto-pipeline-business-ebook/dp/B0B1DYNNSL) to learn how to write effective cold emails that get responses. 
  - Cold emailing still works in 2023; I say that because I have personally generated $1,000 from sending a personalized cold email to 3-4 contacts at Bright Data (a proxy company), pitching my blog writing services.

2. Draft a compelling cold email template that clearly states your value proposition.

3. Commit to a 21-day goal of reaching out to potential customers. If you don't succeed by then, you can consider other strategies. [VERY VERY IMPORTANT]

4. Use the scraper with an email-finding extension to gather leads from around 5 cities of your choice, including their emails and social media handles.

5. Send personalized emails to your target businesses and connect with key company personnel on LinkedIn, Facebook, and Twitter.

**Note:** Avoid cold calling, not because it isn't effective, but because handling rejection over the phone can severely impact your confidence.

### ❓ Advanced Questions

Having read this page, you have all the knowledge needed to effectively utilize the scraper and ensure a never ending supply of highly relevant leads.

You may choose to explore the following questions based on your interests:

#### For Knowledge

1. [Why Do You Randomize Cities for Each User?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-why-do-you-randomize-cities-for-each-user)
2. [Do I Need Proxies?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-do-i-need-proxies)
3. [The Turkish Characters Aren't Rendering Properly in Excel?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-the-turkish-characters-arent-rendering-properly-in-excel)
4. [I am a Web Scraper; The Scraper is Really Impressive with Caching and Parallel Scraping Features?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-i-am-a-web-scraper-the-scraper-is-really-impressive-with-caching-and-parallel-scraping-features)

#### For Technical Usage

1. [I don't have Python, or I'm facing errors when setting up the scraper on my PC. How to solve it?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-i-dont-have-python-or-im-facing-errors-when-setting-up-the-scraper-on-my-pc-how-to-solve-it)
2. [How to Scrape Reviews?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-to-scrape-reviews)
3. [How to select more fields?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-to-select-more-fields)
4. [How many Keywords Can It Scrape per Hour?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-many-keywords-can-it-scrape-per-hour)
5. [What are Popular Snippets for Data Scientists?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-what-are-popular-snippets-for-data-scientists)
6. [How to Change the Language of Output?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-to-change-the-language-of-output)
7. [I have Google Map Places Links, How to Scrape Links?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-i-have-google-map-places-links-how-to-scrape-links)
8. [How to Scrape at Particular Coordinates and Zoom Level?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-to-scrape-at-particular-coordinates-and-zoom-level)


### ❓ Need More Help or Have Additional Questions?

For further assistance, contact us on WhatsApp. We'll reply within 24 hours.

[![Contact Us on WhatsApp](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/mwa.png)](https://wa.me/message/3WED4FYQRDPNE1)

## Love It? [Star It ⭐!](https://github.com/omkarcloud/google-maps-scraper)

Become one of our amazing stargazers by giving us a star ⭐ on GitHub!

It's just one click, but it means the world to me.

[![Stargazers for @omkarcloud/google-maps-scraper](https://bytecrank.com/nastyox/reporoster/php/stargazersSVG.php?user=omkarcloud&repo=google-maps-scraper)](https://github.com/omkarcloud/google-maps-scraper/stargazers)

## Made with *Discipline* for you in Bharat 🇮🇳 - Vande Mataram
