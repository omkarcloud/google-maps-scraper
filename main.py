from bose.launch_tasks import launch_tasks
from bose import LocalStorage
from src import tasks_to_be_run

msg = '''
Google Maps Leads have been successfully scraped! 

Would you help a complete stranger if it didn’t cost money and you didn’t get any credit??
If yes, please star ⭐ us at https://github.com/omkarcloud/google-maps-scraper as most people judge GitHub repositories by their stars. 

Your act of starring will help one more entrepreneur sustain their family and grow their customer base.
'''

def print_pro_bot():
    global msg
    print(msg) 

if __name__ == "__main__":

    launch_tasks(*tasks_to_be_run)
    count = LocalStorage.get_item('count', 0)
    
    print_pro_bot()
