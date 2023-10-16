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
  
🌟 Get 120 Potential Customers in 2.5 Minutes! 🤖

Hola! 🌟

I am Google Maps Scraper, created to help you find new customers and grow your sales. 🚀

Why Scrape Google Maps, you may ask? 
Here's why it's the perfect ground for hunting B2B customers:

- 📞 **Direct Access to Phone Numbers**: Connect with potential clients directly, drastically reducing the time it takes to seal a deal.

- 🌟 **Target the Cream of the Crop**: Target rich business owners based on their reviews, and supercharge your sales.

- 🎯 **Tailored Pitching**: With access to categories and websites, you can customize your pitch to cater to specific businesses and maximize your sales potential.

Countless entrepreneurs have achieved remarkable success by prospecting leads from Google Maps, and now it's your turn!

Let's delve into some of my remarkable features that entrepreneurs love:

1. 💪 **Rapid Lead Generation**: I can scrape a whopping **1200 Google Map Leads** in just **25** minutes, flooding you with potential sales prospects.

2. 🚀 **Effortless Multi-Query Scraping**: Easily scrape multiple queries in one go, saving you valuable time and effort.

3. 🌐 **Unlimited Query Potential**: There's no limit to the number of queries you can scrape, ensuring you never run out of leads.

In the next 5 minutes, you'll witness the magic as I extract **120 Leads** from Google Maps for you, opening up a world of opportunities.

![Google Maps Data Scraper CSV Result](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/gmap_result.png)

Ready to supercharge your business growth? Let's get started! 💼🌍

## Video Demo

If you'd like to see my capabilities in action before using me, I encourage you to watch this short video.

[![Google Maps Video Tutorial](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/video.png)](https://www.youtube.com/watch?v=6UZhTlkCb9A)

## 🚀 Getting Started

Let's get started generating Google Maps Leads by following these simple steps:

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

## 🤔 FAQs

<!-- ### ❓ The scraper is only retrieving 5 results. How can I scrape all Google Maps search results?
A: Open the file `src/config.py` and delete the line that sets the `max_results` parameter.

By doing so, you can scrape all the Google Maps Listing. For example, to scrape all restaurants in Delhi, modify the code as follows:
```python
queries = [
    {
        "keyword": "restaurants in delhi",
    },
]
```
Note: You will be able to scrape up to 120 leads per search due to Google's scrolling limitation. Technically, there is no way possible to bypass this limitation. -->

### ❓ I want to scrape search results for a specific search query. How can I do that?
A: Open the file `src/config.py` and update the `keyword` with your desired search query.

For example, if you want to scrape leads about Digital Marketers in Kathmandu 🇳🇵, modify the code as follows:
```python
queries = [
    {
        "keyword": "digital marketers in kathmandu",
    },
]
```

Note: You will be able to scrape up to 120 leads per search due to Google's scrolling limitation. Technically, there is no way possible to bypass this limitation.

### ❓ Can I scrape more than one query using this script?
A: Easy! Open `src/config.py` and add as many queries as you like.

For example, if you want to scrape restaurants in both Delhi 😎 and Bangalore 👨‍💻, use the following code:
```python
queries = [
    {
        "keyword": "restaurants in delhi",
    },
    {
        "keyword": "restaurants in bangalore",
    }
]
```

### ❓ I want to scrape only the first 5 results. How can I do that?

Absolutely! Open `src/config.py` and modify the `max_results` parameter.

For example, if you want to scrape the first 5 restaurants in Bangalore, use the following code:

```python
queries = [
    {
        "keyword": "restaurants in Bangalore",
        "max_results": 5,
    }
]
```

### ❓ How to Scrape Additional Information like Website, Phone, Geo Coordinates, Price Range?

You may upgrade to the Pro Version of the Google Maps Scraper to scrape additional data points, like:

- 🌐 **Website**
- 📞 **Phone Numbers**
- 🌍 **Geo Coordinates**
- 💰 **Price Range**
- And **26 more data points** like Owner details, Photos, About Section, and [many more](https://github.com/omkarcloud/google-maps-scraper/blob/master/pro-docs.md#-what-data-points-are-scraped-by-the-pro-version)!

Below is a sample lead scraped by the Pro Version:

![Pro Lead](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/paid-lead.png)
*View sample leads scraped by the Pro Version [here](https://drive.google.com/file/d/19745V8flLE3-m1xSRAB9msv89AiI82_Q/view)*

But that's not all! The Pro Version comes loaded with advanced features, allowing you to:

- 🌟 **Sort by Reviews and Ratings**: Target top businesses by sorting your leads in descending/ascending order of reviews and ratings.

- 🧐 **Filter Your Leads**: Use filters to narrow down prospects based on minimum/maximum reviews, ratings, website availability, and more.

- 📋 **Select Specific Fields**: Customize your data output by selecting only the fields you need, such as title, rating, reviews, and phone numbers.

To learn more about how to use these Pro Version features, read the Pro Version docs [here](./pro-docs.md).

🔍 **Comparison**:

See how the Pro Version stacks up against the free version in this comparison image:

![Comparison Image](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/comparision-image.png)

And here's the best part - the Pro Version offers great ROI because it helps you land new customers bringing hundreds and thousands of dollars, all with zero risk. That's right because, we offer a **30-Day Refund Policy**!

### ❓ How to Get the Pro Version?

Visit the Sponsorship Page [here](https://github.com/sponsors/omkarcloud?frequency=one-time) and pay $28 by selecting Google Maps Scraper Pro Option.

![Pay](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/pay.gif)

After payment, you'll see a success screen with instructions on how to use the Pro Version:

![Success Screen](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/success-screen.png)

### ❓What if I Don't Get Value from It?

We wholeheartedly believe in the value our product brings, especially since it has successfully worked for hundreds of entrepreneurs like you.
 
But, we also understand the reservations you might have.

That's why we've put the ball in your court: If, within the next 30 days, you feel that our product hasn’t met your expectations, don't hesitate. Reach out to us, and We will gladly refund your money, no questions and no hassles.

The risk is entirely on us because we're confident in what we've created.


### ❓ How Do I Get a Refund?

Requesting a refund is a simple process that should only take about 5 minutes. To request a refund, ensure you have one of the following:

- **A PayPal Account (e.g., "myname@example.com" or "chetan@gmail.com")**
- **or a UPI ID (India only) (e.g., 'myname@bankname" or "chetan@okhdfc")**

Next, follow these steps to initiate a refund:

1. Send an email to `chetan@omkar.cloud` using the following template:

   - To request a refund via PayPal:
     ```
     Subject: Request Refund
     Content: Please send a refund to my PayPal email: myname@example.com
     ```

   - To request a refund via UPI (India Only):
     ```
     Subject: Request Refund
     Content: Please send a refund to my UPI ID: myname@bankname
     ```

   ![Email Image](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/email.png)

2. Next, go to the discussion [here](https://github.com/omkarcloud/google-maps-scraper/discussions/44) and comment to request a refund using this template:
   ```
   I have sent a refund request from my email: myname@example.com.
   ```

   ![Discussion Image](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/discussion.png)

3. You can expect to receive your refund within 1 day. We will also update you in the GitHub Discussion [here](https://github.com/omkarcloud/google-maps-scraper/discussions/44) :)

   ![PayPal Image](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/paypal.png)

<!-- ### ❓ I Need Setup Support for scraper installation and usage?

Happy to help :), All Pro users who need help with scraper installation and usage can book a meeting with us [here](https://www.omkar.cloud/l/meet-chetan/). -->

### ❓ How to increase the speed of the Scraper?

To boost the scraping speed, the scraper launches multiple browsers simultaneously. Here's how you can increase the speed further:

- Adjust the `number_of_scrapers` variable in the configuration file. Recommended values are:
  - Standard laptop: 4 or 8
  - Powerful laptop: 12 or 16

Note: Avoid setting `number_of_scrapers` above 16, as Google Maps typically returns only 120 results. Using more than 16 scrapers may lead to a longer time spent on launching the scrapers than on scraping the places. Hence, it is best to stick to 4, 8, 12, or 16.

In case you encounter any issues, like the scraper crashing due to low-end PC specifications, follow these recommendations:

- Reduce the `number_of_scrapers` by 4 points.
- Ensure you have sufficient storage (at least 4 GB) available, as running multiple browser instances consumes storage space.
- Close other applications on your computer to free up memory.

Additionally, consider improving your internet speed to further enhance the scraping process.
<!-- 
### ❓ How much time does it take to scrape "n" searches?

On average, each Google Maps search gives 120 listings. It takes approximately 2.5 minutes to scrape these 120 listings.

To calculate the number of **hours** it takes to scrape "n" searches, you can **google search** this formula substituting `n` with the number of searches you want to conduct:

`n * 2.5 minutes`

For example, if you want to scrape 10 Google Map queries or 1200 listings, it will take around 25 minutes.

![](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/search-time.png) -->

### ❓ I don't have Python, or I'm facing errors when setting up the scraper on my PC. How to solve it?

You can easily run the scraper in Gitpod, a browser-based environment. Set it up in just 5 minutes by following these steps:

1. Visit [this link](https://gitpod.io/#https://github.com/omkarcloud/google-maps-scraper) and sign up using your GitHub account.
   
   ![Screenshot (148)](https://github.com/omkarcloud/google-maps-scraper/assets/53407137/f498dda8-5352-4f7a-9d70-c717859670d4)
  
2. In the terminal, run the following command:

   ```bash
   docker-compose build && docker-compose up
   ```
  
3. Once the scraper has finished running, download the leads from the `output` folder.

   ![Screenshot (219)](https://github.com/omkarcloud/google-maps-scraper/assets/53407137/bade4001-12dc-4191-972e-cba0466f3e3f)

<!-- ### ❓ The Turkish characters aren't rendering properly?

You can find a solution [here](https://github.com/omkarcloud/google-maps-scraper/discussions/48). -->

### ❓ I have more questions or need further assistance?

Reach out to us on WhatsApp! We'll solve your problem within 24 hours.

[![Whatsapp](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/mwa.png)](https://wa.me/message/3WED4FYQRDPNE1)


<!-- ### ❓ How to Run it in Docker?

Run the following command to build and run the Docker Image:

```bash
docker-compose build && docker-compose up
```

Please make sure you rebuild the image every time you want to run the scraper by running above command, Failing to do so will result in error. -->


## Love It? [Star It! ⭐](https://github.com/omkarcloud/google-maps-scraper)

[![Stargazers for @omkarcloud/google-maps-scraper](https://reporoster.com/stars/omkarcloud/google-maps-scraper)](https://github.com/omkarcloud/google-maps-scraper/stargazers)
