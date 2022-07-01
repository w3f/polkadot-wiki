import * as fs from "fs";
import yargs from "yargs";
import { ApiPromise, WsProvider } from "@polkadot/api";
import replacements from "./inject-dict.json" assert {type: "json"};

const Polkadot = "polkadot";
const Kusama = "kusama";

// Process command line arguments
const argv = yargs(process.argv)
  .option("dry", {
    alias: "d",
    description: "Dry run - check values before replacing",
    type: "boolean",
  })
  .option("isPolkadot", {
    alias: "p",
    description: "Is Polkadot - build dict values for Polkadot or Kusama",
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

let filledDict = {};

// Connect to a node
const wsProvider = new WsProvider(node);
ApiPromise.create({ provider: wsProvider })
  .then(function (instance) {
    console.log(`Connected to node at ${node}`);

    let wiki;
    if (argv.isPolkadot) {
      console.log("Active Project: Polkadot Wiki");
      wiki = Polkadot;
    } else {
      console.log("Active Project: Kusama Guide");
      wiki = Kusama;
    }

    // For every object in inject-dict
    replacements.forEach(async function (replacement) {
      let chainValue = undefined;

      // If the replacement value has a valid path property
      if("path" in replacement && replacement.path.includes('.')) {
        const subPaths = replacement.path.split('.');
        const preFix = subPaths[0];
        
        // Process constants and queries
        switch(preFix) {
          case "consts":
            chainValue = byString(instance, replacement.path);
            break;
          case "query":
            chainValue = byString(instance, replacement.path);
            chainValue = await chainValue();
            break;
          default:
            console.log(`Unknown path prefix in computed dictionary: ${preFix}`);
            break;
        }

        // Convert to human readable number if possible
        if (chainValue !== undefined && typeof chainValue.toNumber === "function") {
          chainValue = chainValue.toNumber();
        }
      }

      // Check if the replacement has any filters
      if (chainValue !== undefined && "filters" in replacement && replacement.filters.length > 0) {
        // Check if the replacement has any filters
        replacement.filters.forEach(filter => {
          chainValue = applyFilter(chainValue, filter, wiki);
        });
      }

      // If the path property is missing or doesn't contain a prefix or failed to retrieve
      if (chainValue === undefined) {
        console.log(`No valid path for ${replacement.tpl}, applying default`);
          // If the default is an object this logic assumes Polkadot & Kusama values are available
          if (typeof replacement.default === "object") {
            if (wiki === Polkadot) {
              chainValue = replacement.default.polkadot;
            } else {
              chainValue = replacement.default.kusama;
            }
          } else {
            // Values are the same despite the project
            chainValue = replacement.default;
          }
      }

      filledDict["{{ " + replacement.tpl + " }}"] = chainValue;
    });
  })
  .catch(function (e) {
    console.log(e);
    console.error(
      "Error connecting! Check your node URL and make sure its websockets are open, secure if remote (wss), and allow RPC from all."
    );
    process.exit(1);
  });

let v = setInterval(function () {
  if (Object.keys(filledDict).length === Object.keys(replacements).length) {
    clearInterval(v);
    const content = JSON.stringify(filledDict, null, 2);

    fs.writeFileSync("./scripts/computed-dict.json", content, { encoding: "utf8" });
    console.log("Save dict values successfully!");
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
  console.log(`Applying ${filter} to ${wiki} value ${value}`);

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

      value = (value / values[wiki].precision).toFixed(decimals) + " " + values[wiki].symbol;
      break;
    case "blocksToDays":
      value = (value * 6) / 86400;
    default:
      break;
  }

  return value;
}
