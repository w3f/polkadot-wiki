import os
import re
import requests

Root = "./docs"
PolkadotUrl = "https://wiki.polkadot.network/docs/"
ReporUrl = "https://github.com/w3f/polkadot-wiki/tree/master/docs/"

Whitelist = [
    "https://wiki.polkadot.network/docs/community/",
    "https://crates.io/crates/diener",
    "https://www.notion.so/web3foundation/Polkadot-Meetup-Hub-4511c156770e4ba9936386d8be5fe5be",
    "https://www.linode.com/",
    "https://opensea.io/assets/ethereum/0x2127fe7ffce4380459cced92f2d4793f3af094a4/12598",
]

def parseMarkdown(fullPath):
    linkRegEx = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
    with open(fullPath) as f:
        md = f.read()
        links = dict(linkRegEx.findall(md))
    return [links]

def testLink(link):
    result = [False, 404]
    try:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }
        results = requests.get(link, headers=headers, allow_redirects=False)
        code = results.status_code
        result = [code == 200, code]
    except Exception:
        pass
    return result

def logger(test, log, shortPath, links, key):
    if test[1] in [400, 403, 404]:
        log += f"|[{shortPath}]({ReporUrl}{shortPath})|{test[1]}|{key}|{links[key]}|\n"
    return log

def getRefSlug(fullPath):
    if "docs/" in fullPath:
        slug = fullPath.split("docs/")[-1].replace(".md", "").replace("\\", "/")
        return slug
    return None

def main():
    emptyLog = "|File|Error|Tag|Url|\n|---|---|---|---|\n"
    log = emptyLog

    for path, subdirs, files in os.walk(Root):
        for name in files:
            if name.endswith(".md"):
                fullPath = os.path.join(path, name)
                shortPath = fullPath.split("docs")[1]
                results = parseMarkdown(fullPath)
                links = results[0]
                slug = getRefSlug(fullPath)

                for key in links:
                    print(f"Validating: {key} - {links[key]}")

                    url = links[key]

                    if url.startswith("<"):
                        continue
                    elif url.startswith("http"):
                        if url not in Whitelist:
                            test = testLink(url)
                            log = logger(test, log, shortPath, links, key)
                    elif url.startswith("#"):
                        if slug:
                            test = testLink(PolkadotUrl + slug + url)
                            log = logger(test, log, shortPath, links, key)
                    elif ".md" in url:
                        fileDir = os.path.dirname(fullPath)
                        linkedFile = os.path.join(fileDir, url.split("#")[0].rstrip("/"))
                        if os.path.isfile(linkedFile):
                            refSlug = getRefSlug(linkedFile)
                            if refSlug:
                                if "#" in url:
                                    keyAfterHash = url.split("#", 1)[-1]
                                    test = testLink(PolkadotUrl + refSlug + "#" + keyAfterHash)
                                else:
                                    test = testLink(PolkadotUrl + refSlug)
                                log = logger(test, log, shortPath, links, key)
                            else:
                                log += f"|[{shortPath}]({ReporUrl}{shortPath})|failed to get ref slug|{key}|{url}|\n"
                        else:
                            log += f"|[{shortPath}]({ReporUrl}{shortPath})|no local file|{key}|{url}|\n"
                    elif url.endswith((".png", ".jpg")) or "mailto:" in url:
                        continue
                    else:
                        test = testLink(PolkadotUrl + url)
                        log = logger(test, log, shortPath, links, key)

    print("\nAudit Complete.\n\nResults:\n")
    print(log)

    if log == emptyLog:
        return False
    else:
        with open("Audit-Results.md", "w") as text_file:
            ghIssue = "---\n"
            ghIssue += "title: Monthly Audit of Wiki/Guide Links\n"
            ghIssue += "labels: audit\n"
            ghIssue += "---\n"
            ghIssue += "# Audit Results\n"
            ghIssue += log
            text_file.write(ghIssue)
        return True

if __name__ == "__main__":
    main()
