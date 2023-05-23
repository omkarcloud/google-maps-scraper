# Google Maps Scraper

![Google Maps Scraper CSV Result](./img/example_result.png)

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

Additionaly, you don't have to configure the Selenium driver as it will automatically download the appropriate driver based on your Chrome browser version.

## Configuration

- To specify the Google search queries to be used in the scraper, open the `src/scraper.py` file in your preferred text editor and update the `Task.queries` list with your desired queries.

- To specify whether to scrape the first page of Google Maps results or all pages of results, open the `src/scraper.py` file and set the `Task.GET_FIRST_PAGE` variable to `True` or `False` as appropriate.

## Thanks

The Google Maps Scraper project uses the Bose Framework, a web scraping framework that is Swiss Army Knife for web scraping. I encourage you to learn about Bose Framework at https://www.omkar.cloud/bose/

If my code helped you in scraping Google Maps, please take a moment to star the repository. Your act of starring will help developers in discovering our Repository and helping them in their scraping endescraping google maps contribute towards assisting fellow developers in meeting their scraping needs.

## If my Code was able to help you scrape Google Maps. Consider starring the repository by that you will to help fellow Developers discovering this Repository and solve their scraping needs. Dhanyawad 🙏!
