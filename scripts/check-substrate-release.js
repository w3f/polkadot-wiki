const { Octokit } = require("@octokit/rest");
const axios = require("axios");
const fs = require("fs");

try {
  (async () => {
    const ghApi = new Octokit();
    const releases = await ghApi.repos.listReleases({
      owner: "paritytech",
      repo: "substrate",
    });
    let latestTag = releases.data[0].tag_name;
    let pass = false;
    while (!pass) {
      let testUrl = `http://substrate.dev/rustdocs/${latestTag}/sc_service/index.html`;
      try {
        const res = await axios.get(testUrl);
        if (res.status === 200) pass = true;
      } catch (err) {
        latestTag = latestTag.slice(0, -1);
      }
    }

    console.log("Latest tag:", latestTag);
    // Now read through all files.
    const dir = fs.readdirSync("docs");
    for (const file of dir) {
      if (!file.endsWith(".md")) continue;

      const readFile = fs.readFileSync(`docs/${file}`, { encoding: "utf-8" });
      for (const line of readFile.split("\n")) {
        if (line.indexOf("substrate.dev/rustdocs") !== -1) {
          if (line.indexOf(latestTag) === -1) {
            console.log(line);
            throw Error(`${file} does not have the latest tag`);
          }
        }
      }
    }
  })();
} catch(err) { console.error(err); process.exit(1); }
