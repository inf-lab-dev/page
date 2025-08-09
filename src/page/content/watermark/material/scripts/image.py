#!/usr/local/bin/python3

#
# Cool, you are interested in python?
# After the entire module, you might be able to write some of this file's content on your own!
#
# Currenty you do not have to understand ANYTHING thats written inside this file.
# However, if you have any questions on it's content, I'm happy to answer them.
#

import os
import urllib.request
import http.cookiejar
import tempfile
from PIL import Image

# ANSI color codes for use on the terminal
TERMINAL_RED = '\033[31m'
TERMINAL_GREEN = '\033[32m'
TERMINAL_YELLOW = '\033[33m'
TERMINAL_BLUE = '\033[34m'
TERMINAL_RESET = '\033[0m'

# some decently new user agent to not get blocked by CDNs
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

# directory for BMP files
BMP_DIRECTORY = "./images"


def success(message):
    print(f'{TERMINAL_GREEN}✅ {message}{TERMINAL_RESET}')


def error(message):
    print(f'{TERMINAL_RED}❌ {message}{TERMINAL_RESET}')


def info(message):
    print(f'{TERMINAL_BLUE}ℹ️  {message}{TERMINAL_RESET}')


def save_to_tempfile(data, suffix):
    try:
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        temp_file.write(data)
        temp_file.close()

        return temp_file.name

    except Exception as e:
        error(f'Failed to create temporary file: {e}')

        return None


def download_image(url):
    try:
        # user probably copied something off google images directly
        if url.startswith('data:image/'):
            error(
                f'Cannot download data urls, please pass some url starting with "http"!')

            return None

        # user did pass an actual url
        else:
            info(f'Downloading from "{url}"...')
            request = urllib.request.Request(url)

            # Support cookies to avoid being blocked
            cookie_jar = http.cookiejar.CookieJar()
            opener = urllib.request.build_opener(
                urllib.request.HTTPCookieProcessor(cookie_jar))
            request.add_header('User-Agent', USER_AGENT)

            with opener.open(request) as response:
                return save_to_tempfile(response.read(), '.img')

    except Exception as e:
        error(f'Could not download image at "{url}": {e}')

        return None


def convert_to_bmp(input_file, output_file):
    try:
        # Open the input image file
        with Image.open(input_file) as img:
            # Ensure the image is in RGB mode (24-bit)
            img = img.convert('RGB')

            # Save as 24-bit uncompressed BMP
            img.save(output_file, format='BMP')

            success(f'Successfully converted to BMP: "{output_file}"')

    except Exception as e:
        error(f'Could not convert to BMP: {e}')


def main():
    print(f'{TERMINAL_BLUE}🎉 Download images as BMP!\n{TERMINAL_RESET}')

    # Ensure the BMP directory exists
    os.makedirs(BMP_DIRECTORY, exist_ok=True)

    while True:
        try:
            # Ask the user for input
            target = input(
                f'{TERMINAL_YELLOW}👉 Enter URL (press Enter to quit): {TERMINAL_RESET}\n   ')

            if len(target.strip()) == 0:
                break

            # if input is a URL
            if target.startswith('data:image/') or target.startswith('http'):
                temp_file = download_image(target)

                if not temp_file:
                    continue

                # define BMP filename
                filename = target.split('/')[-1].split('?')[0]
                bmp_filename = os.path.join(
                    BMP_DIRECTORY, f'{os.path.splitext(filename)[0]}.bmp')

                # convert the temporary file to BMP
                convert_to_bmp(temp_file, bmp_filename)

                # remove the temporary file
                os.remove(temp_file)

            # otherwise
            else:
                error(
                    'Could not determine what you want to download or convert, please try again.')

                continue

        except KeyboardInterrupt:
            print()  # add an empty line so outputs match for both abort modes
            break

    print(f'{TERMINAL_BLUE}👋  Goodbye!{TERMINAL_RESET}')


if __name__ == '__main__':
    main()
