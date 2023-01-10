const fs = require("fs");
const Polkadot = require("@polkadot/api");

const PolkadotParameters = {
  chain: "Polkadot",
  cache: "PolkadotAuctions.json",
  ws: "wss://rpc.polkadot.io"
}

const KusamaParameters = {
  chain: "Kusama",
  cache: "KusamaAuctions.json",
  ws: "wss://kusama-rpc.polkadot.io",
}

let API = undefined;

// Search for newly scheduled Polkadot auctions
LoadAPI(PolkadotParameters).then(async () => {
  console.log(`Searching ${PolkadotParameters.chain}'s scheduler for new auctions.`)
  GetNewAuctions().then((blocks) => {
    AppendNewAuctions(PolkadotParameters, blocks).then(() => {
      // Repeat the process searching for newly scheduled Kusama auctions
      LoadAPI(KusamaParameters).then(async () => {
        console.log(`Searching ${KusamaParameters.chain}'s scheduler for new auctions.`)
        GetNewAuctions().then((blocks) => {
          AppendNewAuctions(KusamaParameters, blocks);
        });
      });
    });
  })
});

// Load appropriate API based on provided chain type
async function LoadAPI(chain) {
  return new Promise(async (resolve) => {
    const WSProvider = new Polkadot.WsProvider(chain.ws);
    API = await Polkadot.ApiPromise.create({ provider: WSProvider });
    return resolve();
  });
}

// Returns the block number(s) of any scheduled auctions currently in the scheduler queue
async function GetNewAuctions() {
  let futureStartingBlocks = [];
  const agenda = await API.query.scheduler.agenda.entries();
  agenda.forEach(([key, values]) => {
    // Block number of the scheduled event
    const blockNumber = key.toHuman()[0];
    // Attempt to extract auction info if the event is a "newAuction" call
    try {
      const call = API.registry.createType('Call', values.toHuman()[0].call.Inline);
      const isNewAuction = call.toHuman().method === "newAuction";
      if (isNewAuction) {
        const blockString = blockNumber.replaceAll(",", "");
        const block = parseInt(blockString);
        futureStartingBlocks.push(block);
      }
    } catch (error) {
      // Do nothing
    }
  });
  return futureStartingBlocks;
}

async function AppendNewAuctions(chain, blocks) {
  return new Promise(async (resolve) => {
    // If no new blocks are available, bail
    if (blocks.length === 0) {
      return resolve();
    }
    // Load existing cache
    fs.readFile(`./components/utilities/data/${chain.cache}`, "utf8", async function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        // Parse existing cache
        const existingAuctions = JSON.parse(data);
        let latestIndex = 0;
        let existingStartBlocks = [];
        let addedStartBlockIndices = [];
        let addedStartBlocks = [];
        // Iterate existing auctions
        for (let i = 0; i < existingAuctions.length; i++) {
          const index = existingAuctions[i].index;
          const startBlock = existingAuctions[i].startBlock;
          if (index > latestIndex) {
            latestIndex = index;
          }
          existingStartBlocks.push(startBlock);
        }

        // Make sure blocks are sorted before appending
        blocks.sort(function (a, b) {
          return a - b;
        });

        // Check if blocks from scheduler need to be added to the cache
        for (let i = 0; i < blocks.length; i++) {
          if (existingStartBlocks.includes(blocks[i]) === false) {
            latestIndex += 1;
            addedStartBlockIndices.push(latestIndex);
            // Add it to the cache
            const newStartBlock = {
              "index": latestIndex,
              "startBlock": blocks[i],
              "startHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "endPeriodBlock": null,
              "endPeriodHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "biddingEndsBlock": null,
              "biddingEndsHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "onboardStartBlock": null,
              "onboardStartHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "onboardEndBlock": null,
              "onboardEndHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "startDate": null,
              "endPeriodDate": null,
              "biddingEndsDate": null,
              "onboardStartDate": null,
              "onboardEndDate": null
            }

            addedStartBlocks.push(newStartBlock);
          }
        }

        // Only attempt to update JSON if changes are available
        if (addedStartBlocks.length === 0) {
          if (params.chain === "Kusama") {
            process.exit(0);
          }
          return resolve();
        }

        const updatedAuctions = existingAuctions.concat(addedStartBlocks);
        // Write results
        const json = JSON.stringify(updatedAuctions, null, 2);
        fs.writeFile(`./components/utilities/data/${chain.cache}`, json, "utf8", async function writeFileCallback(err) {
          // Once both async processes have completed terminate the script
          if (err) {
            console.log(err);
            if (params.chain === "Kusama") {
              process.exit(1);
            }
          } else {
            console.log(`Updating of ${chain.chain} cache complete.`);
            if (chain.chain === "Kusama") {
              process.exit(0);
            }
          }
        });

        return resolve();
      }
    });
  });
}