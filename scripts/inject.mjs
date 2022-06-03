import replace from "replace-in-file";
import yargs from "yargs";
import replacements from "./inject-dict.json" assert {type: "json"};
import { ApiPromise, WsProvider } from '@polkadot/api';
import * as computed from "./computed.mjs";

const argv = yargs(process.argv)
  .option("node", {
    alias: "n",
    description: "Websocket node URL to query",
    type: "string",
  })
  .option("dry", {
    alias: "d",
    description: "Dry run - check values before replacing",
    type: "boolean",
  })
  .option("rootDir", {
    alias: "r",
    description: "root directory to find files",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

if (!argv.rootDir) {
  throw new Error("Must pass a --rootDir option.");
}

const node = argv.node || "wss://kusama-rpc.polkadot.io/";
console.log("Connecting to node " + node);

let filledDict = {};

// Connect to a node
const wsProvider = new WsProvider(node);
ApiPromise.create({ provider: wsProvider })
  .then(function (instance) {
    console.log("Connected");

    let wiki;
    if (argv.rootDir.indexOf("polkadot-wiki") !== -1) {
      console.log("Working on the Polkadot wiki");
      wiki = "polkadot";
    } else {
      console.log("Working on Kusama Guide");
      wiki = "kusama";
    }

    replacements.forEach(async function (replacement) {
      if (replacement.computed) {
        let result = null;
        try {
          const key = computed.toCamelCase(replacement.tpl);
          console.log("Getting", key);
          result = computed[key];
        } catch (e) {
          console.log(e);
        }
        filledDict["{{ " + replacement.tpl + " }}"] = result || replacement.default;
        return;
      }

      let chainValue = undefined;
      try {
        // Simple const retrieve
        if (replacement.path.indexOf("consts") === 0) {
          console.log("In const for " + replacement.path);
          chainValue = Object.byString(instance, replacement.path);
        }

        // Query calls
        if (replacement.path.indexOf("query") === 0) {
          console.log("In query for " + replacement.path);
          chainValue = Object.byString(instance, replacement.path);
          chainValue = await chainValue();
        }

        // Convert to human readable number if possible
        if (undefined !== chainValue.toNumber) {
          chainValue = chainValue.toNumber();
        }
      } catch (e) {}

      // Activate default mode, depending on wiki being injected into
      if (!chainValue) {
        console.log("No value found, seeking default for " + replacement.tpl);
        if (typeof replacement.default === "object") {
          if (wiki === "polkadot") {
            chainValue = replacement.default.polkadot;
          } else {
            chainValue = replacement.default.kusama;
          }
        } else {
          chainValue = replacement.default;
        }
      } else {
        if (replacement.filters && replacement.filters.length) {
          for (let i = 0; i < replacement.filters.length; i++) {
            chainValue = applyFilter(chainValue, replacement.filters[i], wiki);
          }
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

    // Init template options for replace-in-file
    const options = {
      files: [`${argv.rootDir}/docs/**/**/*.html`],
      from: Object.keys(filledDict).map((el) => {
        return new RegExp(el, "ig");
      }),
      to: Object.values(filledDict),
    };

    console.log("Replacement configuration: ");
    console.log(options);

    if (!argv.dry) {
      try {
        let results = replace.sync(options);

        const changedFiles = results
          .filter((result) => result.hasChanged)
          .map((result) => result.file);
        console.log("Modified files:", changedFiles);

        let from = [/\{\{ kusama: [\s\S]+? :kusama \}\}/gim, /\{\{ polkadot: [\s\S]+? :polkadot \}\}/gim];
        let to =
          argv.rootDir.indexOf("kusama-guide") !== -1
            ? [(match) => match.replace("{{ kusama: ", "").replace(" :kusama }}", ""), ""]
            : ["", (match) => match.replace("{{ polkadot: ", "").replace(" :polkadot }}", "")];
        let results2 = replace.sync({
          files: [`${argv.rootDir}/docs/**/**/*.html`],
          from: from,
          to: to,
        });
        const changedFiles2 = results2
          .filter((result) => result.hasChanged)
          .map((result) => result.file);
        console.log("Modified files for kusama/polkadot difference:", changedFiles2);

        process.exit(0);
      } catch (error) {
        console.error("Error occurred:", error);
        process.exit(1);
      }
    } else {
      console.log("Dry run complete, exiting.");
      process.exit(0);
    }
  }
}, 1000);

Object.byString = function (o, s) {
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
};

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
      value = (value / values[wiki].precision).toFixed(3) + " " + values[wiki].symbol;
      break;
    case "blocksToDays":
      value = (value * 6) / 86400;
    default:
      break;
  }

  return value;
}
