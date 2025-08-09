from urllib import request
from bs4 import BeautifulSoup
import re
import sys
from urllib.parse import urlparse

# ANSI color codes
CYAN = '\033[96m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
MAGENTA = '\033[95m'
RED = '\033[91m'
RESET = '\033[0m'

# special mapping for non-ascii characters
SPECIAL_CHARS = {
    ord('ä'): 'ae',
    ord('ü'): 'ue',
    ord('ö'): 'oe',
    ord('ß'): 'ss',
    ord('_'): ''
}

# the maximum length for words, so they still can be loaded inside the C program
MAX_WORD_LENGTH = 255


def fetch_website_content(url):
    print(f'{CYAN}🌐 Fetching website...{RESET}')

    with request.urlopen(url) as response:
        print(f'{GREEN}✅ Successfully fetched the website!{RESET}')

        return response.read()


def extract_unique_words(html_content):
    print(f'{CYAN}🧹 Cleaning up HTML content...{RESET}')

    soup = BeautifulSoup(html_content, 'html.parser')
    main_element = soup.find('main')

    if not main_element:
        print(f'{RED}❌ No <main> element found on the page!{RESET}')
        return set()

    text = main_element.get_text()
    print(f'{GREEN}✅ Extracted text content!{RESET}')

    # find all words and lowercase them
    words = re.findall(r'\b[^\d\W]+\b', text.lower())

    # translate special characters inside the words
    words = [word.translate(SPECIAL_CHARS) for word in words]

    # only keep words that arent longer as allowed
    words = [word for word in words if len(word) <= MAX_WORD_LENGTH]

    # only keep unique words
    unique_words = set(words)

    print(f'{CYAN}📋 Found {len(unique_words)} unique words!{RESET}')

    return unique_words


def save_words_to_file(words, filename):
    print(f'{CYAN}💾 Saving unique words to {filename}...{RESET}')

    with open(filename, 'w', encoding='utf-8') as file:
        for word in words:
            file.write(word + '\n')

    print(f'{GREEN}✅ Successfully saved words to file!{RESET}')


def generate_filename_from_url(url):
    parsed_url = urlparse(url)
    path = parsed_url.path.strip('/') or 'index'
    sanitized_path = path.replace('/', '-')

    return f'words-{sanitized_path}.txt'


def main():
    print(f'{MAGENTA}🚀 Welcome to Word List Scraper!{RESET}')

    if len(sys.argv) < 2:
        print(f'{RED}❌ Usage: python3 word-list.py <URL>{RESET}')
        sys.exit(1)

    url = sys.argv[1]
    filename = generate_filename_from_url(url)

    # fetch website content
    html_content = fetch_website_content(url)
    if not html_content:
        return

    # extract unique words
    unique_words = extract_unique_words(html_content)
    if not unique_words:
        print(f'{RED}❌ No words extracted from the <main> element!{RESET}')
        return

    # save to file
    save_words_to_file(unique_words, filename)

    print(f'{GREEN}🎉 Done! Words saved to {filename}. 🎉{RESET}')


if __name__ == '__main__':
    main()
