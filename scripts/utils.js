const path = require("path");
const fs = require("fs-extra");
const recursiveReaddir = require("recursive-readdir");

const baseUrlPattern = "/_baseUrlPattern_/";
const baseUrlRegExp = new RegExp(baseUrlPattern, "g");

const relativify = (content, filePath) =>
  content.replace(baseUrlRegExp, () => {
    const result = `${path
      .relative(`${path.dirname(filePath)}`, "")
      // Normalize Windows path separators to Unix ones
      .replace(/\\/g, "/")}/`;
    return result === "/" ? "" : result;
  });

const websiteTextualFileExtensions = [".css", ".js", ".html", ".xml"];

const isNotWebsiteTextualFile = (filePath, stats) =>
  !(stats.isDirectory() || websiteTextualFileExtensions.includes(path.extname(filePath)));

const postProcess = async (buildDirectory) => {
  const filePaths = await recursiveReaddir(buildDirectory, [isNotWebsiteTextualFile]);
  await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await fs.readFile(filePath);
      const relativePath = path.relative(buildDirectory, filePath);
      await fs.writeFile(filePath, relativify(String(content), relativePath));
    })
  );
};

module.exports = {
  baseUrlPattern,
  postProcess,
};
