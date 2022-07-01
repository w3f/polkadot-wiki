import { writeFileSync } from "fs";
import yargs from "yargs";
import { ApiPromise, WsProvider } from "@polkadot/api";
import constants from "./inject-dict.json" assert {type: "json"};

const Polkadot = "polkadot";
const Kusama = "kusama";

let constantsDict = {};

// Process command line arguments
const argv = yargs(process.argv)
  .option("isPolkadot", {
    alias: "p",
    description: "Is Polkadot - build constant values for Polkadot or Kusama",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

// Assumes isPolkadot is true for Polkadot and false for Kusama
if (argv.isPolkadot === undefined) {
  throw new Error("Must pass a --isPolkadot option.");
}

// Connect to the appropriate rpc based on flag value
const node = argv.isPolkadot ? "wss://rpc.polkadot.io" : "wss://kusama-rpc.polkadot.io/";

// Connect to a node
const wsProvider = new WsProvider(node);
ApiPromise.create({ provider: wsProvider })
  .then(function (instance) {
    console.log(`Connected to node at ${node}`);

    // Set active project
    let wiki;
    if (argv.isPolkadot) {
      console.log("Active Project: Polkadot Wiki");
      wiki = Polkadot;
    } else {
      console.log("Active Project: Kusama Guide");
      wiki = Kusama;
    }

    // For every object in inject-dict
    constants.forEach(async function (constant) {
      let chainValue = undefined;

      // If the constant value has a valid path property
      if("path" in constant && constant.path.includes('.')) {
        const subPaths = constant.path.split('.');
        const preFix = subPaths[0];
        
        // Process constants and queries
        switch(preFix) {
          case "consts":
            chainValue = byString(instance, constant.path);
            break;
          case "query":
            chainValue = byString(instance, constant.path);
            chainValue = await chainValue();
            break;
          default:
            console.log(`Unknown path prefix in computed dictionary: ${preFix}`);
        }

        // Convert to human readable number if possible
        if (chainValue !== undefined && typeof chainValue.toNumber === "function") {
          chainValue = chainValue.toNumber();
        }
      }

      // If the path property is missing or doesn't contain a prefix or failed to retrieve
      if (chainValue === undefined) {
        //console.log(`No valid path for ${constant.tpl}, applying default`);
        // If the default is an object this logic assumes Polkadot & Kusama values are available
        if (typeof constant.default === "object") {
          if (wiki === Polkadot) {
            chainValue = constant.default.polkadot;
          } else {
            chainValue = constant.default.kusama;
          }
        } else {
          // Values are the same despite the project
          chainValue = constant.default;
        }
      }

      // At this point chainValue should be valid but unformatted (default or fetched value)
      // Check if the constant has any filters
      if ("filters" in constant && constant.filters.length > 0) {
        // Apply filter formatting
        constant.filters.forEach(filter => {
          chainValue = applyFilter(chainValue, filter, wiki);
        });
      }

      // Update 
      constantsDict[`{{ ${constant.tpl} }}`] = chainValue;
    });
  })
  .catch(function (e) {
    console.log(e);
    process.exit(1);
  });

let v = setInterval(function () {
  if (Object.keys(constantsDict).length === Object.keys(constants).length) {
    clearInterval(v);
    const content = JSON.stringify(constantsDict, null, 2);

    writeFileSync("./scripts/computed-dict.json", content, { encoding: "utf8" });
    console.log("Updated global constants in computed-dict.json");
    process.exit(0);
  }
}, 1000);

function byString(o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

function applyFilter(value, filter, wiki) {
  //console.log(`Applying ${filter} to ${wiki} value ${value}`);
  const values = {
    polkadot: {
      precision: 1e10,
      symbol: "DOT",
    },
    kusama: {
      precision: 1e12,
      symbol: "KSM",
    },
  };

  switch (filter) {
    case "humanReadableToken":
      let decimals = 6
      if (wiki === Polkadot) {
        decimals = 3;
      }

      // TODO: defaults should assume the same formatted outcome
      value = (value / values[wiki].precision).toFixed(decimals) + " " + values[wiki].symbol;
      break;
    case "blocksToDays":
      value = (value * 6) / 86400;
    default:
      break;
  }

  return value;
}
