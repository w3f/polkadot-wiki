import requests
import xml.etree.ElementTree as ET

# Path to the sitemap.xml file
sitemap_path = './wiki_sitemap.xml'

# Base URL for testing
base_url = 'http://localhost:8888'

# Parse the sitemap.xml file
tree = ET.parse(sitemap_path)
root = tree.getroot()

# Namespace for the sitemap
namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

# Extract URLs and check their status
for url in root.findall('ns:url', namespace):
    loc = url.find('ns:loc', namespace).text
    # Replace the base URL with localhost for testing
    test_url = loc.replace('https://wiki.polkadot.network', base_url)
    
    try:
        response = requests.get(test_url)
        if response.status_code == 404:
            print(f'{test_url} - Status: {response.status_code}')
    except requests.exceptions.RequestException as e:
        print(f'{test_url} - Error: {e}')