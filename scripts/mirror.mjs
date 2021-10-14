import fs from "fs";

/**
 * The wiki hosts both the Polkadot Wiki and the Kusama User Guide. This means
 * that we can "mirror" the same document between the two. However, due to
 * a peculiarity in Docusaurus, when we put the same document into both sub-wikis
 * in `website/sidebars.json` only the most recent entry is read.
 *
 * To solve this, we create an explicit mirror of the document. The process for
 * adding content to both wikis is as follows:
 *
 * 1) Create the source document and put it under the relevant sidebar in the
 *    Polkadot wiki configuration in `sidebars.json`.
 * 2) Add the source document's name to the `mirrored` array below.
 * 3) Run `node mirror.js`.
 * 4) Add `mirror-DOCUMENT_NAME` to the sidebar for Kusama in `sidebars.json`.
 *
 */

// List of mirrored files that should be in both the Polkadot wiki and the Kusama
// user guide.

const mirrored_general = ["ens", "thousand-validators"];

const mirrored_learn = [
  "learn-identity",
  "learn-balance-transfers",
  "learn-governance",
  "learn-treasury",
  "learn-registrar",
  "learn-auction",
  "learn-parachains",
  "learn-parathreads",
  "learn-crowdloans",
];

const mirrored_build = [
  "build-guide", 
  "build-parachains",
  "build-storage",
  "build-smart-contracts",
  "build-oracle",
  "build-wallets",
  "build-tools-index",
  "build-hackathon",
];

const mirrored_maintain = [
  "maintain-guides-how-to-stop-validating",
  "maintain-errors",
  "maintain-guides-validator-community",
];

const mirrored_maintain_kusama = [
  "maintain-guides-how-to-nominate-kusama",
  "maintain-guides-how-to-validate-kusama",
];

// Mirror general docs
for (const file of mirrored_general) {
  const doc = "./docs/general/" + file + ".md";
  const mirror = "./docs/general/mirror-" + file + ".md";
  if (!fs.existsSync(doc)) {
    throw new Error(`${doc} doesn't exist!`);
  }

  const content = fs.readFileSync(doc, "utf8");
  const mirroredContent = content
    .split("\n")
    .map((line) => {
      if (line.startsWith("id:")) {
        const [before, after] = line.split(" ");
        return before + " mirror-" + after;
      } else return line;
    })
    .join("\n");

  fs.writeFileSync(mirror, mirroredContent);
}
// Mirror learn docs
for (const file of mirrored_learn) {
  const doc = "./docs/learn/" + file + ".md";
  const mirror = "./docs/learn/mirror-" + file + ".md";
  if (!fs.existsSync(doc)) {
    throw new Error(`${doc} doesn't exist!`);
  }

  const content = fs.readFileSync(doc, "utf8");
  const mirroredContent = content
    .split("\n")
    .map((line) => {
      if (line.startsWith("id:")) {
        const [before, after] = line.split(" ");
        return before + " mirror-" + after;
      } else return line;
    })
    .join("\n");

  fs.writeFileSync(mirror, mirroredContent);
}
// Mirror build docs
for (const file of mirrored_build) {
  const doc = "./docs/build/" + file + ".md";
  const mirror = "./docs/build/mirror-" + file + ".md";
  if (!fs.existsSync(doc)) {
    throw new Error(`${doc} doesn't exist!`);
  }

  const content = fs.readFileSync(doc, "utf8");
  const mirroredContent = content
    .split("\n")
    .map((line) => {
      if (line.startsWith("id:")) {
        const [before, after] = line.split(" ");
        return before + " mirror-" + after;
      } else return line;
    })
    .join("\n");

  fs.writeFileSync(mirror, mirroredContent);
}
// Mirror maintain docs
for (const file of mirrored_maintain) {
  const doc = "./docs/maintain/" + file + ".md";
  const mirror = "./docs/maintain/mirror-" + file + ".md";
  if (!fs.existsSync(doc)) {
    throw new Error(`${doc} doesn't exist!`);
  }

  const content = fs.readFileSync(doc, "utf8");
  const mirroredContent = content
    .split("\n")
    .map((line) => {
      if (line.startsWith("id:")) {
        const [before, after] = line.split(" ");
        return before + " mirror-" + after;
      } else return line;
    })
    .join("\n");

  fs.writeFileSync(mirror, mirroredContent);
}
// Mirror kusama maintain docs
for (const file of mirrored_maintain_kusama) {
  const doc = "./docs/maintain/kusama/" + file + ".md";
  const mirror = "./docs/maintain/kusama/mirror-" + file + ".md";
  if (!fs.existsSync(doc)) {
    throw new Error(`${doc} doesn't exist!`);
  }

  const content = fs.readFileSync(doc, "utf8");
  const mirroredContent = content
    .split("\n")
    .map((line) => {
      if (line.startsWith("id:")) {
        const [before, after] = line.split(" ");
        return before + " mirror-" + after;
      } else return line;
    })
    .join("\n");

  fs.writeFileSync(mirror, mirroredContent);
}
