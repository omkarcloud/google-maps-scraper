from botasaurus import browser as original_browser
from alert_AntiDetectorDriver import CustomAntiDetectDriver

def custom_browser_decorator(*browser_args, **browser_kwargs):
    def decorator(func):
        original_decorated_func = original_browser(*browser_args, **browser_kwargs)(func)

        def wrapper(*args, **kwargs):
            # Initialize your custom driver here
            custom_driver = CustomAntiDetectDriver()

            # Call the original decorated function with the custom driver
            return original_decorated_func(custom_driver, *args, **kwargs)

        return wrapper

    return decorator