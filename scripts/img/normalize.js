const fs = require("fs");

const recursivelyGetAllPaths = (dir) => {
  const allPaths = [];

  const contents = fs.readdirSync(dir);
  for (const file of contents) {
    const fullPath = `${dir}/${file}`;
    const isDir = fs.lstatSync(fullPath).isDirectory();
    if (isDir) {
      allPaths.push(...recursivelyGetAllPaths(fullPath));
    } else {
      allPaths.push(fullPath);
    }
  }

  return allPaths;
}

const main = () => {
  const dirs = [
    "docs/assets",
  ];

  let pathMap = new Map();

  for (const dir of dirs) {
    for (const path of recursivelyGetAllPaths(dir)) {
      pathMap.set(path, false);
      for (const file of fs.readdirSync("docs")) {
        const filePath = `docs/${file}`;
        if (!fs.lstatSync(filePath).isFile()) continue;
        const contents = fs.readFileSync(filePath, { encoding: "utf-8" });
        if (contents.indexOf(path.slice(5)) !== -1) {
          pathMap.set(path, true);
        }
      }
    }
  }

  for (const [path,found] of pathMap) {
    if (!found) {
      console.log(path);
      fs.unlinkSync(path)
    }
  }
}

main();
