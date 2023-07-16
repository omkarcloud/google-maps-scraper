from bose.launch_tasks import launch_tasks
from bose import LocalStorage
from src import tasks_to_be_run

msg = '''
Get access to the Pro Version, offering you:
    - Lightning-fast performance, 6 times faster than the free version.
    - Enhanced data extraction, including Working Hours, Booking Appointment Link, Price Range, and much more.
Contribute just $4 to access the Pro Version. Learn more at https://github.com/omkarcloud/google-maps-scraper#-how-can-i-filter-google-map-search-results'''

def print_pro_bot():
    global msg
    print(msg) 

if __name__ == "__main__":

    launch_tasks(*tasks_to_be_run)
    count = LocalStorage.get_item('count', 0)
    if count > 3:
        print_pro_bot()
