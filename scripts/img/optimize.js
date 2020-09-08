const fs = require("fs");
const sharp = require("sharp");
const Jimp = require("jimp");

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

const deleteUnusedImages = () => {
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

const optimize = async () => {
  const dir = "docs/assets";

  const images = recursivelyGetAllPaths(dir);
  for (const path of images) {
    sharp(path)
      .resize(800, 600, { fit: "inside" })
      .toFile(path + ".testing", (err) => {
        console.log(err);
      });
  }
  
  await Promise.all(
    images.map(img => img+".testing").map(async img => {
      const image = await Jimp.read(img);
      await image.quality(80);
    })
  );
}

switch (process.argv[2]) {
  case "delete": deleteUnusedImages(); break;
  case "optimize": optimize(); break;
  case "other": break;
  default: console.log("Use either `delete` or `normalize`.");
}
