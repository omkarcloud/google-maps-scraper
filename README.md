![Google Maps Scraper Feautred Image](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/google-maps-scraper-feautred-image.png)


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

## 👉 Explore Our Other Awesome Products


- ✅ [Botasaurus](https://github.com/omkarcloud/botasaurus): The All-in-One Web Scraping Framework with Anti-Detection, Parallelization, Asynchronous, and Caching Superpowers.

- ✅ [Outlook Account Generator](https://github.com/omkarcloud/outlook-account-generator): Send emails at Google's Scale with Outlook Accounts.


<!-- TODO: UNCOMMENT WHEN DONE -->
<!-- - ✅ [G2 Reviews Scraper](https://github.com/omkarcloud/g2-scraper/): Grow your software's customer base by targeting and converting your competitors' customers. -->

---

⚡ Get 120 Leads in next 5 Minutes! ⚡


I am Google Maps Scraper, created to help you find new customers and grow your sales. 🚀

*Why Scrape Google Maps?* 
Here's why Google Maps is the perfect *hunting ground* for B2B customers:

- 📞 Connect with potential clients directly, drastically reducing the time it takes to seal a deal.

- 🌟 Target rich business owners based on their ```Reviews```, and supercharge your sales.

- 🎯 With access to categories and websites, you can customize your pitch to cater to specific businesses and maximize your sales potential.

Countless entrepreneurs like you have achieved remarkable success by prospecting leads solely from Google Maps, and now it's your turn to make an Impact!

## ⚡ Benefits

Let's delve into some of my remarkable features that you will love:

1. Scrape emails, Facebook, Twitter, and LinkedIn to deliver your message directly to the customer.

2. Limitless Scraping, Say No to costly subscriptions or expensive pay-per-lead fees.

3. Sort, select, and filter leads to find those most relevant to your business.

4. Book resources and strategize on how to reach out to leads effectively.

5. Supports Scraping Thousands of ```Customer Reviews```.

6. Scrape cities across all countries, to make your product reach every corner of the World.

In the next 5 minutes, you'll witness the magic as I extract **120 Leads** from Google Maps for you, opening up a world of opportunities.

![Google Maps Data Scraper CSV Result](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/gmap_result.png)

Ready to skyrocket your customer base? Let's get started! 💼🌍

<!-- ## 🎥 Video Demo

If you'd like to see my powerful capabilities in action before using me, I encourage you to watch this short video.

[![Google Maps Video Tutorial](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/video.png)](https://www.youtube.com/watch?v=6UZhTlkCb9A) -->

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

*Note: If you don't have Python installed or you are facing errors. Follow this Simple FAQ [here](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-i-dont-have-python-or-im-facing-errors-when-setting-up-the-scraper-on-my-pc-how-to-solve-it) and you will have your google maps leads in next 5 Minutes*


## 🤔 Questions

### ❓ How to Scrape a Specific Search Query?
Open the `main.py` file, and update the `queries` list with your desired query.

```python
queries = ["web developers in delhi"]
Gmaps.places(queries, max=5)
```

### ❓ How to Scrape Multiple Queries?
Add multiple queries to the `queries` list as follows:

```python
queries = [
   "web developers in bangalore",
   "web developers in delhi",
]
Gmaps.places(queries, max=5)
```

### ❓ The scraper is only retrieving 5 results. How can I scrape all Google Maps search results?
A: Remove the `max` parameter.

By doing so, you can scrape all the Google Maps Listing. For example, to scrape all web developers in Bangalore, modify the code as follows:
```python
queries = ["web developers in bangalore"]
Gmaps.places(queries)
```

You can scrape a maximum of 120 leads per search, as Google does not display any more search results beyond that. However, don't worry about running out of leads as there are thousands of cities in our world :).

### ❓ How Can I Filter Google Map Search Results?
You can apply filters such as:

1. `min_reviews`/`max_reviews` (e.g., 10)
2. `category_in` (e.g., "Dental Clinic", "Dental Laboratory")
3. `has_website` (e.g., True/False)
4. `has_phone` (e.g., True/False)
5. `min_rating`/`max_rating` (e.g., 3.5)

For instance, to scrape listings with at least 5 reviews and no more than 100 reviews, with a phone number but no website:

```python
Gmaps.places(queries, min_reviews=5, max_reviews=100, has_phone=True, has_website=False)
```

To scrape listings that belong to specific categories:

```python
Gmaps.places(queries, category_in=[Gmaps.Category.DentalClinic, Gmaps.Category.DentalLaboratory])
```

See the list of all supported categories [here](https://github.com/omkarcloud/google-maps-scraper/blob/master/categories.md)

### ❓ How to Sort by Reviews, Rating, or Category?
We want you to have the best chance of making a sale by default, so we sort the listings using a really good sorting order, which is as follows:
  - Reviews [Businesses with richer profiles come first]
  - Website [Businesses more open to technology come first]
  - LinkedIn [Businesses that are easier to contact come first]
  - Is Spending On Ads [Businesses already investing in ads are more likely to invest in your product, so they appear first.]

However, you also have the freedom to sort them according to your preferences as follows:

- To sort by reviews:

  ```python
  Gmaps.places(queries, sort=[Gmaps.SORT_BY_REVIEWS_DESCENDING])
  ```

- To sort by rating:

  ```python
  Gmaps.places(queries, sort=[Gmaps.SORT_BY_RATING_DESCENDING])
  ```

- To sort first by reviews and then by those without a website:

  ```python
  Gmaps.places(queries, sort=[Gmaps.SORT_BY_REVIEWS_DESCENDING, Gmaps.SORT_BY_NOT_HAS_WEBSITE])
  ```

- To sort by name (alphabetically):

  ```python
  Gmaps.places(queries, sort=[Gmaps.SORT_BY_NAME_ASCENDING])
  ```

- To sort by a different field, such as category, in ascending order:

  ```python
  Gmaps.places(queries, sort=[[Gmaps.Fields.CATEGORIES, Gmaps.SORT_ASCENDING]])
  ```

- Or, to sort in descending order:

  ```python
  Gmaps.places(queries, sort=[[Gmaps.Fields.CATEGORIES, Gmaps.SORT_DESCENDING]])
  ```

### ❓ I Need to Reach Out to Leads to Sell My Products/Services. How Do I Scrape Email, Facebook, Twitter, LinkedIn, etc.?

Directly calling potential clients often leads to lower sales success rates, and you may unintentionally come across as fraudulent person.

Instead, use a more effective strategy:
  1. Conduct thorough research on your prospects through their LinkedIn profiles, websites, etc. Then, craft a personalized email. Begin with genuine appreciation for their specific achievements or work, followed by an explanation of how your services can contribute to their business growth.
  2. Send a personalized message to the business owner on LinkedIn.
  3. Reach out via personalized messages on company social media platforms like Twitter and Facebook.

This strategy allows prospects to learn about you before engaging, significantly increasing the likelihood of making a sale.

To gather contact details of leads, please consider using the 'Website Contacts Scraper API' by OpenWeb Ninja. 

Follow these simple steps to integrate the API:

1. Sign up on RapidAPI by visiting [this link](https://rapidapi.com/auth/sign-up).
   
![Sign Up on RapidAPI](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/sign-up.png)

2. Subscribe to the Free Plan by visiting [this link](https://rapidapi.com/letscrape-6bRBa3QguO5/api/website-contacts-scraper/pricing).

![Subscribe to Free Plan](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/subscribe.png)

3. Copy the API key.
![Copy the API Key](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/key.png)

4. Use it in the scraper as follows:
```python
queries = ["web developers in bangalore"]
Gmaps.places(queries, max=5, key="YOUR_API_KEY") 
```
5. Run the script, and you'll find emails, Facebook, Twitter, and LinkedIn details of leads in your output file.

The first 40 emails are free, after which it costs $25 for 10,000 scrapes, which is affordable considering if you land just one B2B client, you could easily make hundreds of dollars, easily covering the investment.

### ❓ How to scrape all cities in my country?

Consider this example, To scrape web developers from 100 cities in India, use the following example:

```python
queries = Gmaps.Cities.India("web developers in")[0:100]
Gmaps.places(queries) 
```

After running the code, an `india-cities.json` file will be generated in the `output` directory with a list of all the Indian cities.

You can prioritize certain cities by editing the cities JSON file in the output folder and moving them to the top of the list.

We recommend scraping only 100 cities at a time, as countries like India have thousands of cities, and scraping them all could take a considerable amount of time. Once you've exhausted the outreach in 100 cities, you can scrape more.

See the list of all supported countries [here](https://github.com/omkarcloud/google-maps-scraper/blob/master/countries.md)

### ❓ Can I Interrupt the Scrape While It's Running?
Yes, you can. The scraper is smart like you and will resume from where it left off if you interrupt the process.


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

### ❓ How to select more fields?

Seeing a lot of fields can be intimidating, so we have only kept the most important fields in the output.

However, you can select from upto **45+** fields.

Also, To select all the **45+** fields, use the following code:

```python
queries = [
   "web developers in bangalore"
]
Gmaps.places(queries, fields=Gmaps.ALL_FIELDS)
```

To select specific fields only, use the following code:
<!-- todo: use fields -->
```python
queries = [
   "web developers in bangalore"
]

fields = [
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

Gmaps.places(queries, fields=fields)
```

Please note that selecting more or fewer fields will not affect the scraping time; it will remain exactly the same. So, don't fall into the trap of selecting fewer fields thinking it will decrease the scraping time, because it won't. 

For examples of CSV/JSON formats containing all fields, you can download [this file](https://drive.google.com/file/d/10qSpi0Jrh7546M1fakjfBbaAS2ImBr8k/view?usp=sharing).

Also, See the list of all supported fields [here](https://github.com/omkarcloud/google-maps-scraper/blob/master/fields.md)

### ❓ Do You Know of an Effective Strategy to Increase the Chances of Selling My Product?

I've personally employed the following strategy to sell my services, which has proven to be highly effective in generating business. By following this approach diligently, I'm confident you can achieve the same successful results that I have experienced.

1. Read [The Cold Email Manifesto](https://www.amazon.com/Cold-Email-Manifesto-pipeline-business-ebook/dp/B0B1DYNNSL) to learn how to write effective cold emails that get responses. 
  - Cold emailing still works in 2023; I say that because I have personally generated $1,000 from sending a personalized cold email to 3-4 contacts at Bright Data (a proxy company), pitching my blog writing services.

2. Draft a compelling cold email template that clearly states your value proposition.

3. Commit to a 21-day goal of reaching out to potential customers. [VERY VERY IMPORTANT]

4. Use the scraper with the contact finding api to gather leads from around 5 cities of your choice, including their emails and social media handles.

5. Send personalized emails to your target businesses and connect with key company personnel on LinkedIn, Facebook, and Twitter.

<!-- **Note:** Avoid cold calling, not because it isn't effective, but because handling rejection over the phone can severely impact your confidence. -->


### ❓ How Does It Work?

For web scrapers interested in understanding how it works, you can read [this tutorial](https://www.omkar.cloud/botasaurus/docs/google-maps-scraping-tutorial/), where we walk you through the creation of a simplified version of a Google Maps Scraper.

### Your Scraper is really Robust. I Tried Many Scrapers, Most Don't Work. How did you build it?

Thanks! we used Botasaurus, which is the secret sauce behind our Google Maps Scraper.

It's a Web Scraping Framework that makes life easier for Web Scrapers.

Botasaurus handled the hard parts of our Google Maps Scraper, such as:
   - Caching
   - Parallel and Asynchronous Scraping
   - Creation and Reuse of Drivers
   - Writing output to CSV and JSON files
   - And Most importantly, defeating Google's Anti-Scraping Measures


If you are a Web Scraper, we highly recommend that you learn about Botasaurus [here](https://github.com/omkarcloud/botasaurus), because Botasaurus will really save you countless hours in your career as a Web Scraper.

<p align="center">
  <a href="https://github.com/omkarcloud/botasaurus">
  <img src="https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/mascot.png" alt="botasaurus" />
</a>
</p>

### ❓ Advanced Questions

Having read this page, you have all the knowledge needed to effectively utilize the scraper and ensure a never ending supply of highly relevant leads.

You may choose to explore the following questions based on your interests:

#### For Knowledge

1. [Why Do You Randomize Cities for Each User?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-why-do-you-randomize-cities-for-each-user)
2. [Do I Need Proxies?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-do-i-need-proxies)
3. [Does running Scraper on Bigger Machine scrapes Data Faster?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-does-running-scraper-on-bigger-machine-scrapes-data-faster)

#### For Technical Usage

1. [I don't have Python, or I'm facing errors when setting up the scraper on my PC. How to solve it?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-i-dont-have-python-or-im-facing-errors-when-setting-up-the-scraper-on-my-pc-how-to-solve-it)
2. [How to Scrape Reviews?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-to-scrape-reviews)
<!-- 3. [How to select more fields?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-to-select-more-fields) -->
3. [What are Popular Snippets for Data Scientists?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-what-are-popular-snippets-for-data-scientists)
4. [How to Change the Language of Output?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-to-change-the-language-of-output)
5. [I have Google Map Places Links, How to Scrape Links?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-i-have-google-map-places-links-how-to-scrape-links)
6. [How to Scrape at Particular Coordinates and Zoom Level?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-to-scrape-at-particular-coordinates-and-zoom-level)
7. [When setting the Lang Attribute to Hindi/Japanese/Chinese, the characters are in English instead of the specified language. How to transform characters to the specified language?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-when-setting-the-lang-attribute-to-hindijapanesechinese-the-characters-are-in-english-instead-of-the-specified-language-how-to-transform-characters-to-the-specified-language)

<!-- 4. [How many Keywords Can It Scrape per Hour?](https://github.com/omkarcloud/google-maps-scraper/blob/master/advanced.md#-how-many-keywords-can-it-scrape-per-hour) -->

### ❓ Need More Help or Have Additional Questions?

For further help, ask your question in GitHub Discussions. We'll be happy to help you out.

[![ask github](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/ask-on-github.png)](https://github.com/omkarcloud/google-maps-scraper/discussions)

## ⚡ Help us reach 850 stars, and we'll break the GMaps 120 limit, giving you 150+ to 250+ potential customers per search. Star us to make it happen ⭐!

<!-- 
Become one of our amazing stargazers by giving us a star ⭐ on GitHub!

It's just one click, but it means the world to me.

[![Stargazers for @omkarcloud/google-maps-scraper](https://bytecrank.com/nastyox/reporoster/php/stargazersSVG.php?user=omkarcloud&repo=google-maps-scraper)](https://github.com/omkarcloud/google-maps-scraper/stargazers) -->

<!-- ## Made with ❤️ using [Botasaurus Web Scraping Framework](https://github.com/omkarcloud/botasaurus) -->
