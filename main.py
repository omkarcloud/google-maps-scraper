import importlib
if __name__ == "__main__":
    task = 'src.scraper'
    
    Task = importlib.import_module(task).Task
    t = Task()
    t.begin_task()