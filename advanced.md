## 🤔 Advanced Questions

### ❓ I don't have Python, or I'm facing errors when setting up the scraper on my PC. How to solve it?

You can easily run the scraper in Gitpod, a browser-based development environment. Set it up in just 5 minutes by following these steps:

1. Visit [this link](https://gitpod.io/#https://github.com/omkarcloud/google-maps-scraper) and sign up using your GitHub account.
   
   ![Screenshot (148)](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/open-in-gitpod.png)
  
2. Once signed up, open it in Gitpod.   

   ![gp-continue](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/gp-continue.png)

3. In the terminal, run the following command:
   ```bash
   python3 run.py
   ```
4. You will see a popup notification with the heading "A service is available on port 3000". In the popup notification, click the **"Open Browser"** button to open the UI Dashboard in your browser

   ![open-browser.png](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/open-browser.png)

5. Now, you can enter your search queries and press the Run button to get the results.

   ![gitpod-image](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/gitpod-image.png)

Note, that it's important to regularly interact with the Gitpod environment, such as clicking within it every 30 minutes, to keep the machine active and prevent automatic shutdown. 

If you don't want to click every 30 minutes, then we encourage you to install Python and Node.js on your PC and run it locally. 

### ❓ Do I Need Proxies?

No, you do not need to use proxies, you're free to run as many queries as you like.

### ❓ How to Update the Scraper to the Latest Version?

To update the **Free Version**, run these commands in the root directory:

```bash
git pull
python3 -m pip install --upgrade bota botasaurus botasaurus-api botasaurus-requests botasaurus-driver botasaurus-proxy-authentication botasaurus-server
```

---

To update the **Pro Version**, run these commands:

```bash 
python3 -m pip install --upgrade bota botasaurus botasaurus-api botasaurus-requests botasaurus-driver botasaurus-proxy-authentication botasaurus-server
```

And then, please follow these instructions:

1.⁠ ⁠Download the scraper from the link which was sent to your GitHub email address when you purchased Pro Version.

2.⁠ ⁠Extract the downloaded ZIP file.

3.⁠ ⁠Open a terminal in the extracted folder.

4.⁠ ⁠Install Dependencies by running: python3 run.py install

5.⁠ ⁠Launch the UI Dashboard by running: python3 run.py

6.⁠ ⁠Now, Run Queries as you like.

### ❓ How to run Pro Version in Gitpod?

You can easily run the pro version in Gitpod, by following these steps:

1. Visit [this link](https://gitpod.io/#https://github.com/omkarcloud/google-maps-scraper) and sign up using your GitHub account.
   
   ![Screenshot (148)](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/open-in-gitpod.png)
  
2. Once signed up, open the repository in Gitpod.   

   ![gp-continue](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/gp-continue.png)

3. Replace YOUR_GOOGLE_MAPS_SCRAPER_PRO_DOWNLOAD_LINK with the download link for the pro version in the second line of the command's below. Then, paste the command into the terminal to set up the scraper:
   ```bash
   # Download the ZIP file and name it 'google-maps-scraper.zip'
   wget YOUR_GOOGLE_MAPS_SCRAPER_PRO_DOWNLOAD_LINK -O google-maps-scraper.zip

   # Unzip the downloaded file
   unzip google-maps-scraper.zip

   # Remove the original ZIP file
   rm -rf google-maps-scraper.zip

   # Change directory to the renamed folder
   cd google-maps-scraper-pro
   ```
  
4. Install Dependencies by running: `python3 run.py install`
5. Launch the UI Dashboard by running: `python3 run.py`
6. Now, Run Queries as you like.

### ❓ Need More Help or Have Additional Questions?

For further help, feel free to reach out to us through:

- **WhatsApp:** If you prefer WhatsApp, simply send a message [here](https://api.whatsapp.com/send?phone=918295042963&text=Hi,%20I%20would%20like%20to%20learn%20more%20about%20your%20products). Also, to help me provide the best possible answer, please include as much detail as possible.

  [![Contact Us on WhatsApp about Google Maps Scraper](https://raw.githubusercontent.com/omkarcloud/assets/master/images/whatsapp-us.png)](https://api.whatsapp.com/send?phone=918295042963&text=Hi,%20I%20would%20like%20to%20learn%20more%20about%20your%20products)


- **GitHub Discussions:** If you believe your question could benefit the community, feel free to post it in our GitHub discussions [here](https://github.com/omkarcloud/google-maps-scraper/discussions).

  [![Contact Us on GitHub Discussion](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/ask-on-github.png)](https://github.com/omkarcloud/google-maps-scraper/discussions)

- **Email:** If you prefer email, kindly send your queries to [chetan@omkar.cloud](mailto:chetan@omkar.cloud). Also, to help me provide the best possible answer, please include as much detail as possible.

  [![Contact Us on Email about Google Maps Scraper](https://raw.githubusercontent.com/omkarcloud/google-maps-scraper/master/screenshots/ask-on-email.png)](mailto:chetan@omkar.cloud)

We look forward to helping you and will respond to emails and WhatsApp messages within 24 hours.

Good Luck!

## Love It? [Star It ⭐!](https://github.com/omkarcloud/google-maps-scraper)

Become one of our amazing stargazers by giving us a star ⭐ on GitHub!

It's just one click, but it means the world to me.

[![Stargazers for @omkarcloud/google-maps-scraper](https://bytecrank.com/nastyox/reporoster/php/stargazersSVG.php?user=omkarcloud&repo=google-maps-scraper)](https://github.com/omkarcloud/google-maps-scraper/stargazers)

## Made with ❤️ using [Botasaurus Web Scraping Framework](https://github.com/omkarcloud/botasaurus)
