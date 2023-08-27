from bose.launch_tasks import launch_tasks
from bose import LocalStorage
from src import tasks_to_be_run

msg = '''
Google Maps Leads have been successfully scraped! 

Would you help a complete stranger if it didn’t cost money and you didn’t get any credit??
If you answered yes, I want to ask to star our repository ⭐ at https://github.com/omkarcloud/google-maps-scraper/, it will help one more entrepreneur like you change their life for the better :)

'''

def print_pro_bot():
    global msg
    print(msg) 

if __name__ == "__main__":

    launch_tasks(*tasks_to_be_run)
    count = LocalStorage.get_item('count', 0)
    
    if count % 5 == 0:
        print_pro_bot()
