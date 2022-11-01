import os
import re
import requests

Root = "./docs"
PolkadotUrl = "https://wiki.polkadot.network/docs/"

# Frequently occurring false positives
Whitelist = [
    "https://wiki.polkadot.network/docs/community/",
    "https://crates.io/crates/diener",
    "https://www.notion.so/web3foundation/Polkadot-Meetup-Hub-4511c156770e4ba9936386d8be5fe5be",
    "https://www.linode.com/",
    "https://opensea.io/assets/ethereum/0x2127fe7ffce4380459cced92f2d4793f3af094a4/12598",
]

# Read markdown content from a file path
def parseMarkdown(fullPath):

    links = {}
    slug = ""

    linkRegEx = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")

    with open(fullPath) as f:
        md = f.read()
        links = dict(linkRegEx.findall(md))

        # Extract page slug
        lines = md.split("\n")
        for line in lines:
            if line.startswith("slug:"):
                line = line.replace("slug: ", "")
                line = line.replace("../", "")
                slug = line
                continue

    return [links, slug]

# Make a http request to the url and analyze the resulting status code
def testLink(link):
    result = [False, 404]
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
        }
        results = requests.get(link, headers=headers, allow_redirects=False)
        code = results.status_code
        result[1] = code
        if code == 200:
            result[0] = True
        else:
            result[1] = code
    except Exception as e:
        _ = str(e)

    return result

# Add url failures to log table
def logger(test, log, shortPath, links, key):
    # Check for 400 errors - lots of 300 redirects that are still valid
    if test[1] == 400 or test[1] == 403 or test[1] == 404:
        log += "|" + shortPath + "|" + str(test[1]) + "|" + key + "|" + links[key] + "|\n"

# Retrieve a page slug from page path
def getRefSlug(fullPath):
    with open(fullPath) as f:
        md = f.read()
        lines = md.split("\n")
        for line in lines:
            if line.startswith("slug:"):
                line = line.replace("slug: ", "")
                line = line.replace("../", "")
                slug = line
                return slug
        return None

def main():
    # Table header
    log = ""
    log += "|File|Error|Tag|Url|\n"
    log += "|---|---|---|---|\n"

    for path, subdirs, files in os.walk(Root):
        for name in files:
            if name[-3:] == ".md":
                fullPath = os.path.join(path, name)
                shortPath = fullPath.split("docs")[1]
                results = parseMarkdown(fullPath)
                links = results[0]
                slug = results[1]
                if links != {}:
                    for key in links:
                        print("Validating: " + key + " - " + links[key])

                        # Url not supported by regex parser
                        if links[key][0] == "<":
                            continue

                        # Regular http(s) - external link
                        if links[key][:4] == "http":
                            # Check if url is Whitelisted
                            if links[key] not in Whitelist:
                                test = testLink(links[key])
                                logger(test, log, shortPath, links, key)
                            else:
                                continue

                        # Current local page reference
                        elif links[key][0] == "#":
                            url = PolkadotUrl + slug + links[key]
                            test = testLink(url)
                            logger(test, log, shortPath, links, key)

                        # Reference to another local md document
                        elif ".md" in links[key]:

                            if "#" in links[key]:
                                fileDir = os.path.dirname(fullPath)
                                keyBeforeHash = links[key].split("#")[0]
                                keyBeforeHash = keyBeforeHash.rstrip("/")
                                linkedFile = os.path.join(fileDir, keyBeforeHash)
                                if os.path.isfile(linkedFile):
                                    refSlug = getRefSlug(linkedFile)
                                    if refSlug is not None:
                                        keyAfterHash = links[key].rsplit("#", 1)[-1]
                                        url = PolkadotUrl + refSlug + "#" + keyAfterHash
                                        test = testLink(url)
                                        logger(test, log, shortPath, links, key)
                                    else:
                                        log += "|" + shortPath + "|failed to get ref slug|" + key + "|" + links[key] + "|\n"
                                else:
                                    log += "|" + shortPath + "|no local file|" + key + "|" + links[key] + "|\n"
                            else:
                                fileDir = os.path.dirname(fullPath)
                                linkedFile = os.path.join(fileDir, links[key])
                                if not os.path.isfile(linkedFile):
                                    log += "|" + shortPath + "|no local file|" + key + "|" + links[key] + "|\n"

                        # Local image reference
                        elif links[key][-4:] == ".png" or links[key][-4:] == ".jpg":
                            continue

                        # Link to an email address
                        elif "mailto:" in links[key]:
                            continue

                        # Last effort
                        else:
                            url = PolkadotUrl + links[key]
                            test = testLink(url)
                            logger(test, log, shortPath, links, key)

    print()
    print("Audit Complete.")
    print()
    print("Results:")
    print(log)

    emptyLog = "|File|Error|Tag|Url|\n"
    emptyLog += "|---|---|---|---|\n"

    if log == emptyLog:
        return False
    else:
        return log

if __name__ == "__main__":
    main()