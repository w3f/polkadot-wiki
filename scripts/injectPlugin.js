const visit = require("unist-util-visit");

const R_POLKADOT = /{{ polkadot: ([\s\S]+?) :polkadot }}/gim;
const R_KUSAMA = /{{ kusama: ([\s\S]+?) :kusama }}/gim;
const R_KUSAMA_HEAD = /{{ kusama: [\s\S]*/gim;
const R_KUSAMA_TAIL = /[\s\S]* :kusama }}/gim;
const R_POLKADOT_HEAD = /{{ polkadot: [\s\S]*/gim;
const R_POLKADOT_TAIL = /[\s\S]* :polkadot }}/gim;

const conditionalReplace = (node, options) => {
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
  return (tree) => {
    visit(tree, ["paragraph", "emphasis", "heading"], (node) => {
      conditionalReplace(node, options);
    });
  };
}

function injectPlugin(param) {
  return [
    transform,
    { isPolkadot: param.isPolkadot, dryRun: false, verbose: false, debug: false },
  ];
}

module.exports = { injectPlugin };
