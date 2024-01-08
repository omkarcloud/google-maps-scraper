import os
import json
import requests
import re
import csv
from botasaurus import browser, AntiDetectDriver, bt
from bs4 import BeautifulSoup
from urllib.parse import unquote, urlparse
from validate_email import validate_email
import pandas as pd
from alert_AntiDetectorDriver import CustomAntiDetectDriver
from alert_browser import custom_browser_decorator


# --- Utility Functions ---
def read_common_email_domains(file_path):
    common_email_domains = []
    try:
        with open(file_path, 'r') as file:
            common_email_domains = [line.strip().lower() for line in file if line.strip()]
    except FileNotFoundError:
        print(f"Common emails file not found: {file_path}")
    return common_email_domains

def split_emails(input_file, output_file_with_email, output_file_without_email):
    try:
        # Read the CSV with explicit quote character
        df = pd.read_csv(input_file, quotechar='"')
        
        # Split into two DataFrames based on email presence
        df_with_email = df[df['email'].notna() & (df['email'] != '')]
        df_without_email = df[df['email'].isna() | (df['email'] == '')]

        # Write to separate CSV files
        df_with_email.to_csv(output_file_with_email, index=False)
        df_without_email.to_csv(output_file_without_email, index=False)
        print("Data split into two files successfully.")

    except Exception as e:
        print(f"Error reading the CSV file: {e}")



def update_email_addresses(input_file, output_file):
    # Read the CSV data from the input file
    df = pd.read_csv(input_file)

    # Check if 'email' column exists
    if 'email' not in df.columns:
        print("Error: No 'email' column found in the input file.")
        return

    # Define a function to replace emails
    def replace_email(email):
        if pd.isna(email) or '@' not in email:
            print(f"Not updating email {email}")

            return email  # Return as is if the email is NaN or not a valid email
        if 'www.' in email:
            new_email = email.replace('www.', '')
            print(f"Updating email from {email} to {new_email}")
            return new_email
        return email

    # Update the email addresses
    df['email'] = df['email'].apply(replace_email)

    # Write the updated DataFrame to the output CSV file
    df.to_csv(output_file, index=False)
    print("Email addresses updated and saved to", output_file)

def load_valid_tlds(file_path):
    """Loads valid TLDs from a file. gotten from https://data.iana.org/TLD/tlds-alpha-by-domain.txt"""
    
    with open(file_path, 'r') as file:
        return {line.strip().lower() for line in file if line[0].isalpha()}

def is_valid_email_tld(email, valid_tlds):
    """Checks if the email's TLD is valid."""
    
    tld = email.split('.')[-1].lower()
    return tld in valid_tlds

def append_to_csv(file_path, row_data):
    """Appends a single row of data to a CSV file."""
    with open(file_path, 'a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(row_data)

def get_last_processed_row(output_csv_path, place_id_index):
    """Gets the last processed place_id from the output CSV file."""
    try:
        with open(output_csv_path, 'r', encoding='utf-8') as file:
            last_row = None
            for last_row in csv.reader(file): pass
            return last_row[place_id_index] if last_row else None
    except FileNotFoundError:
        return None

def write_output(data, result):
    print(f"Result: {result}\nData: {data}")

# --- Email Scraping Functions ---

common_email_domains_file = 'common_email_domains.txt' 
common_email_domains = read_common_email_domains(common_email_domains_file)

#@custom_browser_decorator(
@browser(
    block_images=True,
    user_agent=bt.UserAgent.user_agent_106,
    reuse_driver=True,
    output=write_output
)
#def scrape_emails_with_botasaurus(driver: CustomAntiDetectDriver, url, depth=0):
def scrape_emails_with_botasaurus(driver: AntiDetectDriver, url, depth=0):
    print(f"Scraping URL: {url} at depth {depth}")
    if depth > 2:
        print("Depth limit exceeded")
        return set()
    
    # doesn't seem to exist in this version, but its in the newest git commit
    # driver.google_get(url)
    # this achieves the same
    driver.get_google(True)
    driver.get_by_current_page_referrer(url)
    #driver.accept_alert()
    driver.short_random_sleep() # Wait for the page to load
    print(f"Page {url} loaded")
    if driver.is_bot_detected():
        print("scraper detected")
    

    emails = set()
    method = None
    email_regex = r'[\w\.-]+@[\w\.-]+\.\w+'
    valid_tlds = load_valid_tlds('tlds-alpha-by-domain.txt')

    # Extract 'mailto' links
    mailto_links = driver.links('a[href^="mailto:"]')
    print(f"Found mailto links: {mailto_links}")
    for link in mailto_links:
        email = link.replace("mailto:", "").split('?')[0].strip()
        print(f"Extracted email from mailto link: {email}")
        method = "mailto link"
        emails.add(email)

    # Search page source for emails
    page_source = driver.page_source
    found_emails = re.findall(email_regex, page_source)
    print(f"Emails found in page source: {found_emails}")
    method = "page source"
    emails.update(found_emails)

    # Fallback to BeautifulSoup
    if not emails:
        soup = BeautifulSoup(page_source, 'html.parser')
        found_emails_bs4 = soup.find_all(string=re.compile(email_regex))
        for email in found_emails_bs4:
            email = email.strip()
            print(f"Email found by BeautifulSoup: {email}")
            method = "BeautifulSoup"
            emails.add(email)

    # Attempt to find emails on contact pages
    if not emails and depth == 0:
        print("Attempting to find emails on contact pages")
        contact_related_links = ["contact", "kontakt", "impressum"]
        for link_text in contact_related_links:
            contact_link = driver.get_element_or_none_by_text_contains(link_text)
            if driver.exists(contact_link):
                print(f"Clicking on contact link: {link_text}")
                driver.click(contact_link)
                emails = scrape_emails_with_botasaurus(driver.current_url, depth + 1)
                if emails:
                    method = "Found on Contact Page"
                    break
        # Further fallback: try clicking on any potential link and scan
    if not emails and depth < 2:  # Limit this fallback to a depth of 2
        any_link = driver.get_element_or_none_by_selector("a[href]")
        if driver.exists(any_link):
            driver.click(any_link)
            # Recursively call the function
            emails = scrape_emails_with_botasaurus(driver.current_url, depth + 1)
            if emails:
                method = "Found on Linked Page"                
    # Check if emails have been found
    if emails:
        print(f"Emails found: {emails}")
    else:
        print("No emails found with scraping methods")

    # Assume a default email format if none found
    if not emails and depth == 0:
        domain = url.split("//")[-1].split("/")[0]
        if domain.startswith('www.'):
            domain = domain[4:]
        if validate_domain(domain):
            assumed_email = f"info@{domain}"
            emails.add(assumed_email)
            method = "Assumed Email"
            print(f"Assuming email: {assumed_email}")
        else:
            print(f"Invalid domain, not assuming email: {domain}")

    # Clean and validate emails
    def clean_email(email):
        # Decode URL-encoded strings
        decoded_email = unquote(email)

        # Extract the email address portion
        extracted_email = urlparse(decoded_email).path

        # Check if the email is valid and split the email to get the domain
        if '@' in extracted_email:
            local_part, domain = extracted_email.lower().split('@')
        # Check if the domain is in the list of common email domains
            if domain not in common_email_domains:
                return extracted_email.lower()
        return None
    emails = {clean_email(email) for email in emails if email}
    emails.discard(None)
    print(f"Cleaned emails: {emails}")

    # Finalize valid emails
    valid_emails = [(email, method) for email in emails if email and is_valid_email_tld(email, valid_tlds) and validate_email(
        email_address=email,
        check_format=True,
        check_blacklist=True,
        check_dns=False,
        dns_timeout=1,
        check_smtp=False,
        smtp_timeout=1,
        #smtp_helo_host='my.host.name',
        #smtp_from_address='my@from.addr.ess',
        smtp_skip_tls=False,
        smtp_tls_context=None,
        smtp_debug=False
    )]
    emails.discard(None)
    print(f"Final valid method and email: {valid_emails}")
    return list(valid_emails)


    def clean_email(email):
        # Decode URL-encoded strings
        decoded_email = unquote(email)

        # Remove URL parameters
        clean_email = urlparse(decoded_email).path.lower()

        # Validate and return email
        if '@' in clean_email:
            return clean_email
        return None
    emails = {clean_email(email) for email in emails if email}
    emails.discard(None)  # Remove None values from the set

    valid_emails = [(email, method) for email in emails if email and is_valid_email_tld(email, valid_tlds) and validate_email(
        email_address=email,
        check_format=True,
        check_blacklist=True,
        check_dns=False,
        dns_timeout=1,
        check_smtp=False,
        smtp_timeout=1,
        #smtp_helo_host='my.host.name',
        #smtp_from_address='my@from.addr.ess',
        smtp_skip_tls=False,
        smtp_tls_context=None,
        smtp_debug=False
    )]
    print(f"final email: {valid_emails}")
    return list(valid_emails)

def validate_domain(domain):
    # Simple domain validation logic
    return re.match(r"[\w-]+\.\w{2,}", domain) is not None
    
def update_csv_with_emails(input_csv_path, output_csv_path):
    # Load the set of processed place IDs from the output file, if it exists
    processed_place_ids = set()
    if os.path.exists(output_csv_path):
        with open(output_csv_path, 'r', encoding='utf-8') as file:
            output_reader = csv.reader(file)
            output_headers = next(output_reader, None)  # Read headers if file is not empty
            if output_headers:
                place_id_index_in_output = output_headers.index('place_id')
                processed_place_ids = {row[place_id_index_in_output] for row in output_reader}

    with open(input_csv_path, 'r', encoding='utf-8') as file:
        input_reader = csv.reader(file)
        input_headers = next(input_reader)
        email_index = input_headers.index('email')
        website_index = input_headers.index('website')
        place_id_index = input_headers.index('place_id')

        # Append 'scrape_method' to input headers if not already present
        if 'scrape_method' not in input_headers:
            input_headers.append('scrape_method')

        # Check if output file needs headers
        if not os.path.exists(output_csv_path) or os.path.getsize(output_csv_path) == 0:
            with open(output_csv_path, 'w', newline='', encoding='utf-8') as output_file:
                output_writer = csv.writer(output_file)
                output_writer.writerow(input_headers)  # Write headers to new file

        for row in input_reader:
            place_id = row[place_id_index]
            if place_id in processed_place_ids:
                continue  # Skip already processed rows

            website = row[website_index]
            if website and not row[email_index]:
                url = unquote(website, "utf-8")
                email_info = scrape_emails_with_botasaurus(url)
                if email_info:
                    emails, methods = zip(*email_info)
                    row[email_index] = ', '.join(emails)
                    row.append(', '.join(methods))  # Append 'scrape_method' to the row
                else:
                    row.append('')  # Append an empty string if no email_info
            else:
                row.append('')  # Append an empty string if website is not processed
            
            append_to_csv(output_csv_path, row)

# --- Main Execution ---

input_csv_path = 'data-cleaned-dupliate-removed-places-of-all.csv'
output_csv_path = 'v2-emails-added-data-cleaned-dupliate-removed-places-of-all.csv'



#update_csv_with_emails(input_csv_path, output_csv_path)
#update_email_addresses(output_csv_path, "cleaned-" + output_csv_path)
# Parameters
input_csv_file = "cleaned-"+output_csv_path  # Replace with your input file path
output_csv_file_with_email = 'with_email.csv'  # File to save rows with email
output_csv_file_without_email = 'without_email.csv'  # File to save rows without email

# Run the function
#split_emails(input_csv_file, output_csv_file_with_email, output_csv_file_without_email)
split_emails("without-email-scanned-again.csv", "without-email-scanned-again-with-email.csv", "without-email-scanned-again-without-email.csv")
#update_csv_with_emails(output_csv_file_without_email, "without-email-scanned-again.csv")
#update_csv_with_emails("without-email-scanned-again-without-email.csv", "v2-without-email-scanned-again.csv")