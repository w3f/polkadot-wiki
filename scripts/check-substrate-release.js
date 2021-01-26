const { Octokit } = require("@octokit/rest");
const axios = require("axios");
const fs = require("fs");

(async () => {
  const ghApi = new Octokit();
  const releases = await ghApi.repos.listReleases({
    owner: "paritytech",
    repo: "substrate",
  });
  let latestTag = releases.data[0].tag_name;
  let pass = false;
  const maxErrors = 10;
  let numErrors = 0;
  while (!pass) {
    if (numErrors === maxErrors) {
      console.log("max errors reached");
      process.exit(1);
    }
    let testUrl = `http://substrate.dev/rustdocs/${latestTag}/sc_service/index.html`;
    try {
      const res = await axios.get(testUrl);
      if (res.status === 200) pass = true;
    } catch (err) {
      numErrors++;
      latestTag = latestTag.slice(0, -1);
    }
  }

  console.log("Latest tag:", latestTag);
  
  // Now read through all files.
  const dir = fs.readdirSync("docs");
  const foundFiles = [];
  for (const file of dir) {
    if (!file.endsWith(".md")) continue;

    const readFile = fs.readFileSync(`docs/${file}`, { encoding: "utf-8" });
    for (const line of readFile.split("\n")) {
      if (line.indexOf("substrate.dev/rustdocs") !== -1) {
        if (line.indexOf(latestTag) === -1) {
          foundFiles.push(file);
        }
      }
    }
  }

  if (!!foundFiles.length) {
    console.log("\nThe following files need to be updated for latest Substrate release:");
    console.log(foundFiles.join("\n"));
    console.log("\nPlease run `node scripts/update-substrate.js` to update them.");
    process.exit(1);
  }
})();
