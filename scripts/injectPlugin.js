const fs = require("fs");
const path = require("path");
const visit = require("unist-util-visit");
const { yellow, cyan } = require("chalk");

const R_POLKADOT = /{{ polkadot: ([\s\S]+?) :polkadot }}/gim;
const R_KUSAMA = /{{ kusama: ([\s\S]+?) :kusama }}/gim;
const R_KUSAMA_HEAD = /{{ kusama: [\s\S]*/gim;
const R_KUSAMA_TAIL = /[\s\S]* :kusama }}/gim;
const R_POLKADOT_HEAD = /{{ polkadot: [\s\S]*/gim;
const R_POLKADOT_TAIL = /[\s\S]* :polkadot }}/gim;

const logger = (file, dryRun, subStr, replaceStr) => {
  console.log(
    cyan(
      `${dryRun ? "[dryRun]" : ""}[${file.basename}] ${yellow(subStr)} => ${yellow(
        replaceStr ? replaceStr : `""`
      )}`
    )
  );
};

const unconditionalReplace = (node, file, options) => {
  const { dict, dryRun = false, verbose = true } = options;

  Object.entries(dict).forEach(([key, value]) => {
    node.value = node.value.replace(new RegExp(key, "ig"), (match) => {
      verbose && logger(file, dryRun, key, value);
      return dryRun ? match : value;
    });
  });
};

const conditionalReplace = (node, file, options) => {
  const { isPolkadot, debug } = options;
  let foundTarget = false,
    foundDelete = false;
  const children = [];

  const TARGET = isPolkadot ? "polkadot" : "kusama";
  const R_TARGET = isPolkadot ? R_POLKADOT : R_KUSAMA;
  const R_TARGET_HEAD = isPolkadot ? R_POLKADOT_HEAD : R_KUSAMA_HEAD;
  const R_TARGET_TAIL = isPolkadot ? R_POLKADOT_TAIL : R_KUSAMA_TAIL;

  const R_DELETE = isPolkadot ? R_KUSAMA : R_POLKADOT;
  const R_DELETE_HEAD = isPolkadot ? R_KUSAMA_HEAD : R_POLKADOT_HEAD;
  const R_DELETE_TAIL = isPolkadot ? R_KUSAMA_TAIL : R_POLKADOT_TAIL;

  node.children.forEach((childNode) => {
    if (childNode.type !== "text") {
      if (!foundDelete) {
        children.push(childNode);
      }
      return;
    }

    let text = childNode.value;

    debug && console.log(`Before ${JSON.stringify({ foundTarget, foundDelete })}:`, `[${text}]`);

    text = text.replace(R_DELETE, "").replace(R_TARGET, "$1");

    let foundSomething = false;
    if (R_TARGET_HEAD.test(text)) {
      foundTarget = true;
      foundSomething = true;
      text = text.replace(`{{ ${TARGET}: `, "");
    }

    if (R_TARGET_TAIL.test(text)) {
      foundTarget = false;
      foundSomething = true;
      text = text.replace(` :${TARGET} }}`, "");
    }

    if (R_DELETE_HEAD.test(text)) {
      foundDelete = true;
      foundSomething = true;
      text = text.replace(R_DELETE_HEAD, "");
    }

    if (R_DELETE_TAIL.test(text)) {
      foundDelete = false;
      foundSomething = true;
      text = text.replace(R_DELETE_TAIL, "");
    }

    if (foundDelete && !foundSomething) {
      text = "";
    }

    debug && console.log(`After ${JSON.stringify({ foundTarget, foundDelete })}:`, `[${text}]`);
    children.push({ ...childNode, value: text });
  });

  node.children = children;
};

function transform(options) {
  return (tree, file) => {
    visit(tree, "paragraph", (node) => {
      conditionalReplace(node, file, options);
    });

    visit(tree, "text", (node) => {
      unconditionalReplace(node, file, options);
    });

    visit(tree, "code", (node) => {
      unconditionalReplace(node, file, options);
    });
  };
}

function injectPlugin(param) {
  const dictPath = path.resolve(__dirname, "computed-dict.json");
  const dict = JSON.parse(fs.readFileSync(dictPath, "utf8"));
  return [
    transform,
    { dict, isPolkadot: param.isPolkadot, dryRun: false, verbose: false, debug: false },
  ];
}

module.exports = { injectPlugin };
