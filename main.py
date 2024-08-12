from typing import Optional

from fastapi import FastAPI, Query
from botasaurus_api import Api

api = Api(create_response_files=False)
app = FastAPI()


@app.get("/health")
def get_properties():
    return {"status": "ok"}


@app.get("/single_task")
def create_task(
    query: str = Query(description="query to scrape"),
    max_reviews: Optional[int] = Query(default=100, description="max qty of reviews"),
):
    data = {
        'queries': [query],
        'country': None,
        'business_type': '',
        'max_cities': None,
        'randomize_cities': True,
        'api_key': '',
        'enable_reviews_extraction': False,
        'max_reviews': max_reviews,
        'reviews_sort': 'newest',
        'lang': 'en',
        'max_results': None,
        'coordinates': '',
        'zoom_level': 14,
    }
    task = api.create_sync_task(data=data, scraper_name='google_maps_scraper')

    return task



if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080)
