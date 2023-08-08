from bose.launch_tasks import launch_tasks
from bose import LocalStorage
from src import tasks_to_be_run

msg = '''
Google Maps Leads have been successfully scraped! 
If you've found our work helpful, please consider starring us at https://github.com/omkarcloud/google-maps-scraper for a token of gratitude on our Discussion Page at https://github.com/omkarcloud/google-maps-scraper/discussions/21
Thanks,
Chetan
'''

def print_pro_bot():
    global msg
    print(msg) 

if __name__ == "__main__":

    launch_tasks(*tasks_to_be_run)
    count = LocalStorage.get_item('count', 0)
    
    print_pro_bot()
