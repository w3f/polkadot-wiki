import os
import re
from pathlib import Path
import uuid

Dir_Name = os.path.dirname(__file__)
Assets_Root = os.path.join(Dir_Name, "./../docs/assets")
Markdown_Root = os.path.join(Dir_Name, "./../docs")
Legacy_Root = os.path.join(Dir_Name, "./../docs/assets/_legacy")

Extensions = [".png", ".jpg", ".svg", ".gif", ".jpeg"]

# These manage to not be found due to formatting style (ex <img> tag used in md file)
FalsePositives = [
    "VRF_babe.png",
    "creating-pull-request.png",
    "polkawallet-accounts-page.jpg",
    "contributing.png",
    "polkawallet-create-account.jpg",
    "polkawallet-copy-address.jpg",
    "kusama-gifs.gif",
    "polkadot_view_proxies.png",
    "creating-pull-request-2.png",
    "xcm-reserve-asset-transfer.png",
    "polkadot-translate-feature.png",
    "crowdin-translate-1.png",
    "crowdin-translate-9.png",
    "crowdin-translate-7.png",
    "crowdin-translate-2.png",
    "crowdin-translate-4.png",
    "crowdin-translate-5.png",
    "crowdin-translate-6.png",
    "crowdin-translate-8.png",
    "crowdin-translate-3.png",
    "adaptive-quorum-biasing.png",
    "approval-vote.png",
    "nominate.png",
    "test_bid.jpg",
    "polkadotjs_removeVoter.png",
    "social-recovery-6.png",
    "social-recovery-10.png",
    "social-recovery-14.png",
    "social-recovery-11.png",
    "social-recovery-8.png",
    "social-recovery-7.png",
    "social-recovery-9.png",
    "social-recovery-diag-1.png",
    "social-recovery-12.png",
    "social-recovery-diag-2.png",
    "social-recovery-15.png",
    "social-recovery-13.png",
    "avalanche-network.png",
    "uniques.png",
    "kanaria.png",
    "nft-statemine.png",
    "claim_3.png",
    "kusama_polkadotjs_mnemonicseed.jpg",
    "polkawallet-accounts-page.jpg",
    "kusama_polkadotjs_add_account-1.png",
    "polkawallet-create-account.jpg",
    "kusama_polkadotjs_create.png",
    "kusama_society_page2.png",
    "polkawallet-copy-address.jpg",
    "kusama_polkadotjs_uncheck.png",
    "kusama_polkadotjs_final_account.png",
    "claim_3.png",
    "proposal.jpg",
    "4-configure-data-source.png",
    "1-grafana-login.png",
    "2-add-data-source.png",
    "5-import-dashboard-2.png",
    "2-add-data-source-2.png",
    "5-import-dashboard.png",
    "3-select-prometheus.png",
    "Voting.png",
    "polkadot-dashboard-validate-1.png",
    "polkadot-dashboard-telemetry.png",
    "kusama_society_page.png",
]

# Read markdown content from a file path
def parseMarkdown(fullPath):
    links = {}
    linkRegEx = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")

    # Attempt to open file and extract links
    with open(fullPath) as f:
        md = f.read()
        links = dict(linkRegEx.findall(md))
    
    return links

def main():
    Exclude = ["_legacy"]
    Images = []
    Image_References = []
    Diff = []
    # Walk the assets directory looking for image files
    for path, subdirs, files in os.walk(Assets_Root, topdown=True):
        # Skip _legacy folder containing previously removed assets
        subdirs[:] = [d for d in subdirs if d not in Exclude]
        for name in files:
            filename, ext = os.path.splitext(name)
            if ext.lower() in Extensions:
                Images.append(name)

    # Walk the docs directory looking for markdown files
    for path, subdirs, files in os.walk(Markdown_Root):
        for name in files:
            filename, ext = os.path.splitext(name)
            if ext.lower() == ".md":
                fullPath = os.path.join(path, name)
                links = parseMarkdown(fullPath)
                if links != {}:
                    # For each link
                    for key in links:
                        # Local image reference
                        base = Path(links[key]).stem
                        linkName, linkExt = os.path.splitext(links[key])
                        if linkExt in Extensions:
                            Image_References.append(base + linkExt)

    for image in Images:
        if image not in Image_References: #and image not in FalsePositives:
            Diff.append(image)

    for path, subdirs, files in os.walk(Assets_Root):
        subdirs[:] = [d for d in subdirs if d not in Exclude]
        for name in files:
            if name in Diff:
                fullPath = os.path.join(path, name)
                if os.path.isfile(os.path.join(Legacy_Root, name)):
                    # Since the files are copied from nested directories there can be naming overlap
                    newName = os.path.join(Legacy_Root, str(uuid.uuid4()) + "-" + name)
                    os.rename(fullPath, newName)
                else:
                    os.rename(fullPath, os.path.join(Legacy_Root, name))


if __name__ == "__main__":
    main()