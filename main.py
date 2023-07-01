from bose.launch_tasks import launch_tasks
from src import tasks_to_be_run

if __name__ == "__main__":
    launch_tasks(*tasks_to_be_run)