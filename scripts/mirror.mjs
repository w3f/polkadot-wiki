import { existsSync, readFileSync, writeFileSync} from "fs";

/*
  The wiki hosts both the Polkadot Wiki and the Kusama User Guide. This means
  that we can "mirror" the same document between the two. However, due to
  a peculiarity in Docusaurus, when we put the same document into both sub-wikis
  in `website/sidebars.json` only the most recent entry is read.

  To solve this, we create an explicit mirror of the document. The process for
  adding content to both wikis is as follows:
 
  1) Create the source document and put it under the relevant sidebar in the
     Polkadot wiki configuration in `sidebars.json`.
  2) Add the source document's name to the `mirrored` array below.
  3) Run `node mirror.js` which duplicates the original markdown file and
     appends 'mirror-' to the file's id and slug to prevent duplicate routes.
  4) Add `mirror-DOCUMENT_NAME` to the sidebar for Kusama in `sidebars.json`.
 */

// List of mirrored files that should be in both the Polkadot wiki and the Kusama
// user guide.

const mirroredDocs = {
  general: [
    "ens",
    "thousand-validators"
  ],
  learn: [
    "learn-identity",
    "learn-balance-transfers",
    "learn-governance",
    "learn-treasury",
    "learn-registrar",
    "learn-auction",
    "learn-parachains",
    "learn-parathreads",
    "learn-crowdloans",
  ],
  build: [
    "build-guide", 
    "build-parachains",
    "build-storage",
    "build-smart-contracts",
    "build-oracle",
    "build-wallets",
    "build-tools-index",
    "build-hackathon",
  ],
  maintain: [
    "maintain-guides-how-to-stop-validating",
    "maintain-errors",
    "maintain-guides-validator-community",
  ],
  "maintain/kusama": [
    "maintain-guides-how-to-nominate-kusama",
    "maintain-guides-how-to-validate-kusama",
  ]
}

for (const [key, value] of Object.entries(mirroredDocs)) {
  buildMirrors(key, value)
}

function buildMirrors(dir, fileNames) {
  fileNames.forEach(file => {
    // Define origin and mirror paths
    const doc = `./docs/${dir}/${file}.md`;
    const mirror = `./docs/${dir}/mirror-${file}.md`;
    
    // Make sure origin file exists
    if (!existsSync(doc)) {
      throw new Error(`${doc} doesn't exist!`);
    }

    // Read origin
    const content = readFileSync(doc, "utf8");

    // Modify content
    const mirroredContent = content
      .split("\n")
      .map((line) => {
        // Append mirror- to id
        if (line.startsWith("id:")) {
          const [before, after] = line.split(" ");
          return `${before} mirror-${after}`;
        }
        // Append mirror- to slug
        else if (line.startsWith("slug:")) {
          let route = line.split("/");
          const trailingRoute = route[route.length - 1];
          const trailingMirrorRoute = `mirror-${trailingRoute}`;
          route.pop();
          route.push(trailingMirrorRoute);
          const slug = route.join('/');
          return slug;
        } else {
          // Keep line as-is
          return line;
        }
      })
      .join("\n");
    
    // Write mirror
    writeFileSync(mirror, mirroredContent);
  });
}