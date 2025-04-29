import requests
import xml.etree.ElementTree as ET

# Path to the sitemap.xml file
sitemap_path = './wiki_sitemap.xml'

# Base URL for testing
base_url = 'https://wiki.polkadot.network'

# Parse the sitemap.xml file
tree = ET.parse(sitemap_path)
root = tree.getroot()

# Namespace for the sitemap
namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

# Define blanket URLs and their expected redirects with status codes
blanket_urls = [
    ('/general/web3-and-polkadot', 200),
    ('/build/build-guide', 200),
    ('/maintain', 200),
    ('/learn', 200),
    ('/general/getting-started', 200),
]

# Extract URLs and check their status
for url in root.findall('ns:url', namespace):
    loc = url.find('ns:loc', namespace).text
    # Replace the base URL with localhost for testing
    test_url = loc.replace('https://wiki.polkadot.network', base_url)
    try:
        response = requests.get(test_url, allow_redirects=True)
        final_url = response.url
        status_code = response.status_code

        # Check if the final URL matches any blanket URL and status code
        for expected_redirect, expected_status in blanket_urls:
            if final_url.endswith(expected_redirect):
                print(f'{test_url}')
                break
    except requests.exceptions.RequestException as e:
        print(f'{test_url} - Error: {e}')
