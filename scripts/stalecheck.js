const fs = require("fs");
const cp = require("child_process");
const core = require("@actions/core");
const github = require("@actions/github");

const dir = "docs";
const maxAgeDays = 21;
// Rigged to leave Bill alone
const techedu = ["swader", "swader", "lsaether", "lsaether", "ansonla3", "ansonla3", "laboon"];

async function stalecheck() {
  const myToken = process.env.GITHUB_TOKEN;
  if (!myToken) {
    console.error("Invalid token or no token provided: " + myToken);
    process.exit(1);
  }
  let oldFiles = agePerPage();
  if (oldFiles === {}) {
    console.log("No old files found");
    process.exit(0);
  }
  const octokit = github.getOctokit(myToken);
  const staleIssues = await octokit.issues
    .listForRepo({
      owner: "w3f",
      repo: "polkadot-wiki",
      state: "open",
      labels: "stale",
    })
    .catch((error) => {
      console.log(error);
    });
  let currentStaleTitles = [];
  for (issue of staleIssues.data) {
    if (!issue["pull_request"]) {
      currentStaleTitles.push(issue.title);
    }
  }
  console.log("Old files found:");
  console.log(oldFiles);
  let created = 0;
  for (file of Object.keys(oldFiles)) {
    sleep(500);
    // Check if issue for file exists

    console.log(`Checking existing issues for ${file}`);
    let title = `[STALE] ${file}`;
    if (currentStaleTitles.includes(title)) continue;
    // Pick a random technical educator
    let assignee = techedu[Math.floor(Math.random() * techedu.length)];
    // Create issue
    // let creation = await octokit.issues
    //   .create({
    //     owner: "w3f",
    //     repo: "polkadot-wiki",
    //     title: title,
    //     body: `Last edit happened ${oldFiles[file]} days ago 😬`,
    //     assignees: [assignee],
    //     labels: ["stale"],
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     process.exit(1);
    //   });

    console.log(`Created issue for ${file}`);
    created++;
    if (created == 2) {
      process.exit(0);
    }
  }
}

stalecheck();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

function agePerPage() {
  let oldFiles = {};
  files = fs.readdirSync(dir);
  console.log("Files in docs:");
  console.log(files);

  for (file of files) {
    if (file.indexOf("mirror") === 0 || !file.endsWith(".md")) {
      //console.log(`Skipping ${file}`);
    } else {
      try {
        let output = cp.execSync('git log -1 --pretty="format:%ct" ' + dir + "/" + file);
        console.log(output.toString());
        let age = Math.round((Date.now() / 1000 - output) / 86400);
        //console.log(`${file} is ${age} days old`);
        if (age >= maxAgeDays) {
          oldFiles[file] = age;
        }
      } catch (Error) {
        console.error(Error);
      }
    }
  }
  return oldFiles;
}
