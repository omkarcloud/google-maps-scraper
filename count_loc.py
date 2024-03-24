import os
import json



def count_json_places(root_directory):
    place_count = 0

    # Walk through all directories and files in the root directory
    for root, dirs, files in os.walk(root_directory):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)

                # Attempt to open and parse the JSON file
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        # Count the number of place entries in each JSON file
                        place_count += len(data)
                except Exception as e:
                    print(f"Error reading or parsing file {file_path}: {e}")

    return place_count

# Example usage (replace with your actual directory path)
total_places = count_json_places('output')
print(f"Total places found: {total_places}")
