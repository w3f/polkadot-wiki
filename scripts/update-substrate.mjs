import { Octokit } from "@octokit/rest";
import axios from "axios";
import fs from "fs";

(async () => {
  const ghApi = new Octokit();
  const releases = await ghApi.repos.listReleases({
    owner: "paritytech",
    repo: "substrate",
  });
  let latestTag = releases.data[0].tag_name;
  let pastTag = releases.data[1].tag_name;
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

  let passTwo = false;
  while (!passTwo) {
    let testUrl = `http://substrate.dev/rustdocs/${pastTag}/sc_service/index.html`;
    try {
      const res = await axios.get(testUrl);
      if (res.status === 200) passTwo = true;
    } catch (err) {
      pastTag = pastTag.slice(0, -1);
    }
  }

  console.log("Latest tag:", latestTag);
  console.log("Previous tag:", pastTag);

  // Now read through all files.
  const dir = fs.readdirSync("docs");
  outer:
  for (const file of dir) {
    if (!file.endsWith(".md")) continue;

    const readFile = fs.readFileSync(`docs/${file}`, { encoding: "utf-8" });
    let flag = false;
    let lines = [];
    for (const line of readFile.split("\n")) {
      if (line.indexOf("substrate.dev/rustdocs") !== -1) {
        if (line.indexOf(latestTag) === -1) {
          const startIndex = line.indexOf(pastTag);
          if (startIndex === -1) {
            throw new Error("Cannot update automatically since past tag not found. Please update manually.");
          }

          const newLine = line.slice(0, startIndex) + latestTag + line.slice(startIndex + pastTag.length);
          lines.push(newLine);
          flag = true;
        }
      } else {
        lines.push(line);
      }
    }

    if (!flag) continue outer;

    console.log("Updating", file);
    fs.writeFileSync(`docs/${file}`, lines.join("\n"));
  }
  console.log("Done! Please run prettier now ;-)");
})();
