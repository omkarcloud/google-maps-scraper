from botasaurus import bt
from typing import List, Tuple
import requests
import traceback
from datetime import datetime
import time
import math
import urllib.parse
from lxml import html
from bs4 import BeautifulSoup, Tag
import regex as re
import re as rex
from .time_utils import parse_relative_date

default_request_interval = 0.2
default_n_retries = 10
default_retry_time = 30

sort_by_enum = {
    "most_relevant": "qualityScore",  # the most relevant reviews
    "newest": "newestFirst",  # the most recent reviews
    "highest_rating": "ratingHigh",  # the highest rating reviews
    "lowest_rating": "ratingLow",  # the lowest rating reviews
}



review_default_result = {
            "response_text_date":None,
        "text_date":None,
    "translated_text": "",  # review text if exists
    "translated_response_text": "",  # review text if exists
    "token": "",  # pagination token
    "review_id": "",  # review unique id
    "retrieval_date": "",
    "rating": 0,  # float usually 1-5
    "rating_max": 0,  # float usually 5
    "relative_date": "",  # string containing the localized relative date
    "likes": -1,  # review likes if exists
    "other_ratings": "",  # other ratings such as rooms, service, placing, etc
    "trip_type_travel_group": "",
    "user_name": "",
    "user_is_local_guide": None,
    "user_reviews": "",  # total number of reviews made by the user
    "user_photos": "",  # total number of photos added by the user
    "user_url": "",
    "text": "",  # review text if exists
    "response_text": "",  # owner response text if exists
    "response_relative_date": "",  # string containing the localized relative date
    "errors": [],  # list of errors parsing review
}

metadata_default = {
    "name": "",  # hotel name in hotels manual input
    "feature_id": "",  # hotel unique id
    "retrieval_date": "",
    "place_name": "",  # Place name extracted from response
    "address": "",
    "overall_rating": 0,  # float usually 1-5
    "n_reviews": -1,  # number of reviews of hotel
    "topics": "",  # topics separated by number of reviews
    "url": "",  # hotel url
}



def extract_google_maps_contributor_url(input_url):
    # Define a regular expression pattern to match the desired URL
    pattern = r'https://www\.google\.com/maps/contrib/\d+'
    
    # Use re.search to find the first match in the input_url
    match = rex.search(pattern, input_url)
    
    if match:
        # Extract the matched URL
        contributor_url = match.group(0)
        
        # Add "/reviews?entry=ttu" to the end of the URL
        contributor_url += '/reviews?entry=ttu'
        
        return contributor_url
    else:
        return None

def extract_reviews_and_photos(text):
    # Regular expression pattern to extract numbers that may represent reviews and photos
    pattern = r'\d+'

    # Find all matches of numbers in the text
    matches = re.findall(pattern, text)

    # Initialize variables to store the number of reviews and photos
    num_reviews = 0
    num_photos = 0

    # Determine the number of reviews and photos based on the matches
    if len(matches) >= 1:
        num_reviews = int(matches[0])
    if len(matches) >= 2:
        num_photos = int(matches[1])

    # Return the extracted numbers as a tuple
    return (num_reviews, num_photos)

class GoogleMapsAPIScraper:
    def __init__(
        self,
        request_interval: float = default_request_interval,
        n_retries: int = default_n_retries,
        retry_time: float = default_retry_time,
    ):
        
        self.request_interval = request_interval
        self.n_retries = n_retries
        self.retry_time = retry_time
        self._reset_logger_filter()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, tb):
        self._reset_logger_filter()
        if exc_type is not None:
            traceback.print_exception(exc_type, exc_value, tb)

        return True

    def _reset_logger_filter(self, url_name=""):
        pass

    def _ts(self) -> str:
        """Returns timestamp formatted as string safe for file naming"""
        return datetime.now().strftime("%Y-%m-%d_%H-%M-%S_%f")

    def _parse_url_to_feature_id(self, url: str) -> str:
        return re.findall("0[xX][0-9a-fA-F]+:0[xX][0-9a-fA-F]+", url)[0]

    def _parse_sort_by(self, sort_by: str) -> int:
        """Default to newest"""
        return sort_by_enum.get(sort_by, 1)

    def _decode_response(self, response) -> str:
        """Decodes response bytes in unicode escape encoding"""
        try:
            response_text = response.text
        except UnicodeDecodeError as e:
            tb = re.sub(r"\s", " ", traceback.format_exc())  # Corrected
            response_text = response.content.decode(
                encoding="unicode_escape", errors="replace"
            )
        if response_text is None or response_text == "":
            raise Exception(
                "Response text is none. Try request again."
                f"Response: {response} Status: {response.status_code}"
            )
        return response_text

    def _cut_response_text(self, text: str) -> str:
        """Cut response text to remove css and js from extremities"""
        idx_first_div = text.find("<div")
        if idx_first_div == -1:
            
            idx_first_div = 0
        match = re.search("</div", text, flags=re.REVERSE)
        if match:
            idx_last_div = match.span()[1] + 1
        else:
            
            idx_last_div = -1
        text = text[idx_first_div:idx_last_div]
        return "<html><body>" + text + "</body></html>"

    def _format_response_text(self, response_text: str):
        """Transforms text into soup and extract list of reviews"""
        response_soup = reviews_soup = review_count = next_token = None
        try:
            # Send page to soup and trees
            response_soup = BeautifulSoup(response_text, "lxml")
            tree = html.document_fromstring(response_text)
            # bt.write_html(response_text , "fff.html")
            # Encontrando número de reviews e token de próxima página
            metadata_node = tree.xpath("//*[@data-google-review-count]")[0]
            review_count = int(metadata_node.attrib["data-google-review-count"])
            next_token = metadata_node.attrib["data-next-page-token"]

            # Iterando sobre texto de cada review
            # reviews_tree = tree.xpath('//*[contains(@class, "gws-localreviews__google-review")]')
            
            reviews_soup = response_soup.find_all(True, class_="gws-localreviews__google-review")
            
            # reviews_soup = [
            #     response_soup.find("div", dict(r.attrib)) for r in reviews_tree
            # ]
        except Exception as e:
            tb = re.sub(r"\s", " ", traceback.format_exc())  # Corrected
            
            if next_token is None:
                next_token = self._get_response_token(response_text)
        
        return response_text, response_soup, reviews_soup, review_count, next_token

    def _get_response_token(self, response_text: str) -> str:
        """Searches for token in response text using regex, in case other methods fail"""
        match = re.search(r'(data-next-page-token\s*=\s*")([\w=]*)', response_text)  # Corrected
        if match:
            return match.groups()[1]
        

    def _get_request(
        self,
        feature_id: str,
        async_: str = "",
        hl: str = "",
        sort_by_id: int = "",
        associated_topic: str = "",
        token: str = "",
    ) -> Tuple[BeautifulSoup, List[BeautifulSoup], int, str]:
        """Makes and formats get request in google's api"""
        query = f"https://www.google.com/async/reviewSort?authuser=0&hl={hl}&yv=3&cs=1&async=feature_id:{feature_id},review_source:All%20reviews,sort_by:{sort_by_id},is_owner:false,filter_text:,associated_topic:,next_page_token:{token},_pms:s,_fmt:pc"
        # query = (
        #     "https://www.google.com/async/reviewDialog?"
        #     f"hl={hl}&"
        #     f"async={async_}"
        #     f"feature_id:{feature_id},"
        #     f"sort_by:{sort_by_id},"
        #     f"next_page_token:{token},"
        #     f"associated_topic:{associated_topic},"
        #     f"_fmt:pc"
        # )
        # Make request
        response = requests.get(query)
        response.raise_for_status()
        # Decode response
        response_text = self._decode_response(response)

        # Cut response to remove css
        response_text = self._cut_response_text(response_text)
        # bt.write_html(response_text , "fff.html")
        # Format response into list of reviews
        return self._format_response_text(response_text)

    def _parse_place(
        self,
        response: BeautifulSoup,
    ) -> dict:
        """Parse place html"""
        metadata = metadata_default.copy()
        return metadata
        # Parse place_name
        try:
            metadata["place_name"] = response.find(True, class_="P5Bobd").text
        except Exception as e:
            pass
            

        # Parse address
        try:
            metadata["address"] = response.find(True, class_="T6pBCe").text
        except Exception as e:
            pass    
            

        # Parse overall_rating
        try:
            rating_text = response.find(True, class_="Aq14fc").text.replace(",", ".")
            metadata["overall_rating"] = float(rating_text)
        except Exception as e:
            pass
            

        # Parse n_reviews
        try:
            n_reviews_text = response.find(True, class_="z5jxId").text
            n_reviews_text = re.sub("[.]|,| reviews| comentários", "", n_reviews_text)
            metadata["n_reviews"] = int(n_reviews_text)
        except Exception as e:
            pass
            

        # Parse topics
        try:
            topics = response.find("localreviews-place-topics")
            s = " ".join([s for s in topics.stripped_strings])
            metadata["topics"] = re.sub(r"\s+", " ", s)  # Corrected
        except Exception as e:
            pass

        metadata["retrieval_date"] = str(datetime.now())

        return metadata

    def _parse_review_text(self, text_block) -> str:
        """Parse review text html, removing unwanted characters"""
        text = ""
        for e, s in zip(text_block.contents, text_block.stripped_strings):
            if isinstance(e, Tag) and e.has_attr(
                "class"
            ):  #  and e.attrs["class"] in ["review-snippet","k8MTF",]:
                break
            text += s + " "

        text = re.sub(r"\s", " ", text)  # Corrected
        text = re.sub("'|\"", "", text)
        text = text.strip()
        return text

    def _handle_review_exception(self, result, review, name) -> dict:
        # Error log
        tb = re.sub(r"\s", " ", traceback.format_exc())  # Corrected
        msg = f"review {name}: {tb}"
        
        # Appending to line
        tb = re.sub("['\"]", " ", tb)
        result["errors"].append(tb)
        # Saving file
        with open(
            f"errors/review_{name}_{self._ts()}.html", "w", encoding="utf-8"
        ) as f:
            f.writelines(str(review) + "\n\n" + msg)
        return result

    def _handle_place_exception(self, response_text, name, n) -> dict:
        # Error log
        tb = re.sub(r"\s", " ", traceback.format_exc())  # Corrected
        msg = f"place {name} request {n}: {tb}"
        
        # Saving file
        new_var = f"output/place_{name}_request_{n}_{self._ts()}.html"
        print(new_var)
        with open(
            new_var, "w", encoding="utf-8"
        ) as f:
            f.writelines(str(response_text) + "\n\n" + msg)


    def _parse_review(self, review: Tag, hl) -> dict:
        result = review_default_result.copy()

        # Make timestamp
        result["retrieval_date"] = str(datetime.now())

        # Parse text
        try:
            # Find text block
            text_block = review.find(True, class_="review-full-text")
            if not text_block:
                text_block = review.find(True, {"data-expandable-section": True})
            # Extract text
            if text_block:
                result["text"] = self._parse_review_text(text_block)
        except Exception as e:
            self._handle_review_exception(result, review, "text")
        try:
            # Find text block
            translated_text = review.find_all(True, class_="review-full-text")
            if not translated_text:
                translated_text = review.find_all(True, {"data-expandable-section": True})
            # Extract text
            # print(text_block)
            if len(translated_text) > 1:
                result["translated_text"] = self._parse_review_text(translated_text[1])
                # print("aaaaaa", result["translated_text"])
        except Exception as e:
            self._handle_review_exception(result, review, "translated_text")

        # Parse review rating
        try:
            rating_text = review.find(True, class_="lTi8oc z3HNkc").get("aria-label")
            rating_text = re.sub(",", ".", rating_text)
            rating = re.findall("[0-9]+[.][0-9]*", rating_text)
            result["rating"] = float(rating[0])
            result["rating_max"] = None

        except Exception as e:
            self._handle_review_exception(result, review, "rating")

        # Parse other ratings
        try:
            other_ratings = review.find(True, class_="k8MTF")
            if other_ratings:
                s = " ".join([s for s in other_ratings.stripped_strings])
                result["other_ratings"] = re.sub(r"\s+", " ", s)
        except Exception as e:
            self._handle_review_exception(result, review, "other_ratings")

        # Parse relative date
        try:
            result["relative_date"] = review.find(True, class_="dehysf lTi8oc").text
        except Exception as e:
            self._handle_review_exception(result, review, "relative_date")

        # Parse user name
        try:
            result["user_name"] = review.find(True, class_="TSUbDb").text
        except Exception as e:
            self._handle_review_exception(result, review, "user_name")

        # Parse user metadata
        try:
            user_node = review.find(True, class_="Msppse")
            if user_node:
                result["user_url"] = user_node.get("href")
                result["user_is_local_guide"] = (
                    True if user_node.find(True, class_="QV3IV") else False
                )
                fixed_text = user_node.text.replace(",", "").replace(".", "")
                user_reviews,user_photos =  extract_reviews_and_photos(fixed_text)
                result["user_reviews"] = user_reviews
                result["user_photos"] = user_photos

                # print(text)
                # user_reviews = re.findall(
                #     "[Uuma0-9.,]+(?= comentário| review)", user_node.text
                # )
                # user_photos = re.findall("[Uuma0-9.,]+(?= foto| photo)", user_node.text)
                # if len(user_reviews) > 0:
                # if len(user_photos) > 0:
        except Exception as e:
            self._handle_review_exception(result, review, "user_data")

        # Parse review id
        try:
            # result["review_id"] = review.find(True, {"data-ri": True}).get("data-ri")
            review_id = review.find(True, class_="RvU3D").get("href")
            result["review_id"] = re.findall("(?<=postId=).*?(?=&)", review_id)[0]
        except Exception as e:
            self._handle_review_exception(result, review, "review_id")

        # Parse review likes
        try:
            review_likes = review.find(True, jsname="CMh1ye")
            if review_likes:
                result["likes"] = int(review_likes.text)
        except Exception as e:
            self._handle_review_exception(result, review, "likes")

        # Parse review response
        try:
            response = review.find(True, class_="d6SCIc")
            if response:
                result["response_text"] = self._parse_review_text(response)
            response_date = review.find(True, class_="pi8uOe")
            if response_date:
                result["response_relative_date"] = response_date.text
        except Exception as e:
            self._handle_review_exception(result, review, "response")

        try:
            response = review.find_all(True, class_="d6SCIc")
            if response:
                result["translated_response_text"] = self._parse_review_text(response[1])
        except Exception as e:
            self._handle_review_exception(result, review, "response")

        # Parse trip_type_travel_group
        try:
            trip_type_travel_group = review.find(True, class_="PV7e7")
            if trip_type_travel_group:
                s = " ".join([s for s in trip_type_travel_group.stripped_strings])
                result["trip_type_travel_group"] = re.sub(r"\s+", " ", s)  # Corrected
        except Exception as e:
            self._handle_review_exception(result, review, "trip_type_travel_group")
        
        if "en" in hl:
            if result['relative_date']:
                try:
                    result["text_date"]= parse_relative_date(result['relative_date'], result['retrieval_date'])
                except Exception as e:
                    print(traceback.format_exc())
                    result["text_date"] = None

            if result['response_relative_date']:
                try:
                    result["response_text_date"]= parse_relative_date(result['response_relative_date'], result['retrieval_date'])
                except Exception as e:
                    print(traceback.format_exc())
                    result["response_text_date"] = None
        
        if  result["user_url"]:
            result["user_url"] = extract_google_maps_contributor_url(result["user_url"])

        if not result["translated_text"]:
            result["translated_text"] = None

        if not result["translated_response_text"]:
            result["translated_response_text"] = None

        if not result["user_reviews"]:
            result["user_reviews"] = None

        if not result["user_photos"]:
            result["user_photos"] = None


        return result

    def scrape_reviews(
        self,
        url: str,
        n_reviews: int,
        hl: str = "en",
        sort_by: str = "",
        token: str = "",
    ):
        """Scrape specified amount of reviews of a place, appending results in csv"""
        url_name = re.findall("(?<=place/).*?(?=/)", url)[0]
        url_name = urllib.parse.unquote_plus(url_name)
        self._reset_logger_filter(url_name)
        

        feature_id = self._parse_url_to_feature_id(url)
        sort_by_id = self._parse_sort_by(sort_by)

        results = []
        j = 0

        n_requests = math.ceil((n_reviews) / 10)
        for i in range(n_requests):
            
            n = self.n_retries
            while n > 0:
                next_token = None
                try:
                    response_text = ""

                    (
                        response_text,
                        response_soup,
                        reviews_soup,
                        review_count,
                        next_token,
                    ) = self._get_request(
                        feature_id,
                        hl=hl,
                        sort_by_id=sort_by_id,
                        token=token,
                    )
                    
                    assert isinstance(reviews_soup, list)
                    break
                except Exception as e:
                    # traceback.print_exc()
                    n -= 1
                    self._handle_place_exception(response_text, url_name, i)
                    if n == 0 and next_token is None:
                        
                        raise e
                    elif n == 0:
                        
                        break
                    else:
                        
                        time.sleep(self.retry_time)
            token = next_token
            if n == 0:
                continue

            try:
                # print("reviews_soup", len(reviews_soup))
                for review in reviews_soup:
                    # 
                    result = self._parse_review(review, hl)
                    result["token"] = token


                    results.append(result)
                    # 
                    j += 1
            except Exception as e:
                traceback.print_exc()
                tb = re.sub(r"\s", " ", traceback.format_exc())
                

            if review_count < 10 or token == "":
                
                break

            # Waiting so google wont block this scraper
            time.sleep(self.request_interval)

        
        if n_reviews is not None and n_reviews >=1 :
            return results[:n_reviews]
        return results

    def scrape_place(
        self,
        url: str,
        writer,
        file,
        name,
        hl: str = "",
    ):
        """Scrape place metadata, writing to csv"""
        url_name = re.findall("(?<=place/).*?(?=/)", url)[0]
        url_name = urllib.parse.unquote_plus(url_name)
        self._reset_logger_filter(url_name)
        

        feature_id = self._parse_url_to_feature_id(url)

        
        _, response_soup, _, _, _ = self._get_request(
            feature_id,
            hl=hl,
        )
        metadata = self._parse_place(response=response_soup)
        metadata["feature_id"] = feature_id
        metadata["url"] = url
        metadata["name"] = name

        writer.writerow(metadata.values())
        file.flush()

        return metadata

if __name__ == "__main__":
    try:
        with GoogleMapsAPIScraper() as scraper:
            response_text, response_soup, reviews_soup, review_count, next_token = scraper._format_response_text(bt.read_html("fff"))
            rs = []
            # for review in reviews_soup[:1]:
            for review in reviews_soup:
                result = scraper._parse_review(review, "es")
                rs.append(result)

            bt.write_json(rs, "temp")
    except Exception as e:
        print(f"An error occurred: {e}")