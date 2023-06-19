# Google Maps Scraper

![Google Maps Scraper CSV Result](https://www.omkar.cloud/bose/assets/images/gmap_result-1cb8f15de2fdf7c01f246d81f97aef7c.png)

This is a Python script that allows you to scrape information from Google Maps, including business names, addresses, phone numbers, websites, ratings, and reviews. The script can be configured to search for specific queries and can scrape either the first page of results or all pages of results.

## Installation

1. Clone Starter Template
```
git clone https://github.com/omkarcloud/google-maps-scraper
cd google-maps-scraper
```
2. Install dependencies
```
python -m pip install -r requirements.txt
```
3. Run Project
```
python main.py
```

The script will start running and output progress updates to the console. When the scraper is complete, it will generate a CSV file named `finished.csv` in the `output` directory. The CSV file will contain the business name, address, phone number, website, rating, and review for each result.

*Additionaly, you don't have to configure the Selenium driver as this bot is built with bose framework which automatically download the appropriate driver based on your Chrome browser version.*

## Configuration

- To specify the Google search queries to be used in the scraper, open the `src/scraper.py` file in your preferred text editor and update the `Task.queries` list with your desired queries.

- To specify whether to scrape the first page of Google Maps results or all pages of results, open the `src/scraper.py` file and set the `Task.GET_FIRST_PAGE` variable to `True` or `False` as appropriate.

- In order to filter the results of Google Maps, you can utilize the Task.filter_data property and specify the following parameters:

1. min_rating
2. min_reviews
3. max_reviews
4. has_phone
5. has_website

For instance, if you wish to obtain results with a minimum of 5 reviews, a maximum of 100 reviews, and a phone number, you can use the following configuration:

```python
class Task(BaseTask):

    filter_data = {
        "min_reviews": 5 ,
        "max_reviews": 100,
        "has_phone": True,
    }
```
## Why is there no need to specify the Chrome Driver Location in the Bot?

The Google Maps Scraper is built using the Bose Framework, which takes care of downloading the correct driver, has anti-blocking features to evade bot detectors and greatly helps us in debugging.

I believe Bose Framework is a great tool that will greatly help you in Bot Development. I encourage you to learn about bose by visiting their [docs](https://www.omkar.cloud/bose/).

## Get Custom Bot 🤖

We are professional scrapers who scrape for a living.

In fact, we have successfully scraped over 300 million LinkedIn profiles.

If you're interested in creating a Bot and saving yourself valuable development time, please contact us at chetan@omkar.cloud.

Our pricing starts at $150 for a Custom Bot and includes a 100% refund guarantee.

<!-- 


We are professional Scrapers who scrape for living. We have experience scraping over 300 Million LinkedIn Profiles. 

If you are interested to save yourself Development Time. Kindly contact us at chetan@omkar.cloud. 

Our Pricing starts at $150 and is full refunadable.  -->

<!-- ## I've created a project capable of parallely running hundreds of bots to scrape Google Maps at scale. If you're interested in saving hours of development time by scraping Google Maps at scale, kindly contact via WhatsApp at https://www.omkar.cloud/l/whatsapp or email me at chetan@omkar.cloud and I would be happy to help. -->


## Love It? Star It! ⭐

<!-- ## I've created a project capable of parallely running hundreds of bots to scrape Google Maps at scale. If you're interested in saving hours of development time by scraping Google Maps at scale, kindly contact via WhatsApp at https://www.omkar.cloud/l/whatsapp or email me at chetan@omkar.cloud and I would be happy to help. -->

![Google Maps Scraper CSV Result](https://www.omkar.cloud/bose/assets/images/gmap_result-1cb8f15de2fdf7c01f246d81f97aef7c.png)
<!-- ### I am an IITian with a perfectionist attitude to work, open to projects. See my projects at [https://dev.to/chetanan/chetan-jains-portfolio-cl6](https://dev.to/chetanan/chetan-jains-portfolio-cl6)  -->
