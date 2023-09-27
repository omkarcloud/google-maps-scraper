
## 🤔 Pro Version FAQs

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
```


### ❓ How to sort by reviews, rating, or title?

To sort your results by reviews, rating, or title, follow these steps:

Open the file `src/config.py` and set the `sort` key. 

For example, to sort by reviews in descending order, modify the code as follows:

```python
queries = [
    {
        "keyword": "stupas in kathmandu",
        "sort": {
            "by": "reviews",
            "order": "desc",
        },
    },
]
```

You can sort by any field, such as `reviews`, `main_category`, `title`, `rating`, or any other field. Here are some common sort examples:

1. Sort by `reviews` count in descending order:
```python
        "sort": {
            "by": "reviews",
            "order": "desc",
        },
```

2. Sort by `main_category` in ascending order:
```python
        "sort": {
            "by": "main_category",
            "order": "asc",
        },
```

3. Sort by `title` in ascending order:
```python
        "sort": {
            "by": "title",
            "order": "asc",
        },
```

4. Sort by `rating` in descending order:
```python
        "sort": {
            "by": "rating",
            "order": "desc",
        },
```

### ❓ How to select specific Fields?
If you want to select specific fields to be output in your CSV and JSON files, you can do so by following these steps:

1.  Open `src/config.py`.
2.  Modify the `select` key to include the fields you want to select.

For example, if you want to select "title", "link", "main_category", "rating", "reviews", "website", "phone", and "address", you should adjust the code as follows:

```python
queries = [
    {
        "keyword": "stupas in kathmandu",
        "select": ["title", "link", "main_category", "rating", "reviews",  "website", "phone" , "address"],
    },
]
```

You are free to select any field. Here are a couple of common field selections:

1. Standard field selection:
```python
        "select": ["title", "link", "main_category", "rating", "reviews",  "website", "phone" , "address"],
```

2. Selection of all fields (Default):
```python
        "select": "ALL",
```
