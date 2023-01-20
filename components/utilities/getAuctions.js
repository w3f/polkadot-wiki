const fs = require("fs");
const Polkadot = require("@polkadot/api");
const { PolkadotParameters, KusamaParameters } = require("./auctionVariables");

let API = undefined;

// Search for newly scheduled Polkadot auctions
LoadAPI(PolkadotParameters).then(() => {
  console.log(`Searching ${PolkadotParameters.name}'s scheduler for new auctions.`)
  GetNewAuctions(PolkadotParameters).then(() => {
    // Repeat the process searching for newly scheduled Kusama auctions
    LoadAPI(KusamaParameters).then(() => {
      console.log(`Searching ${KusamaParameters.name}'s scheduler for new auctions.`)
      GetNewAuctions(KusamaParameters)
    });
  });
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
async function GetNewAuctions(chain) {
  return new Promise(async (resolve) => {
    let futureStartingBlocks = [];
    const agenda = await API.query.scheduler.agenda.entries();
    agenda.forEach(([key, values]) => {
      // Block number of the scheduled event
      const blockNumber = key.toHuman()[0];
      // Attempt to extract auction info if the event is a "newAuction" call
      if (values.toHuman()[0] !== null) {
        try {
          let isNewAuction = false;
          // NOTE - this will likely need to align with Kusama's schema when OpenGov hits Polkadot
          // Currently the Polkadot schema for identifying scheduled methods is different when compared w/ Kusama
          if (chain.name === PolkadotParameters.name) {
            isNewAuction = values.toHuman()[0].call.Value.method === "newAuction";
          } else { // Kusama
            const call = API.registry.createType('Call', values.toHuman()[0].call.Inline);
            isNewAuction = call.toHuman().method === "newAuction";
          }
          if (isNewAuction) {
            const blockString = blockNumber.replaceAll(",", "");
            const block = parseInt(blockString);
            futureStartingBlocks.push(block);
          }
        } catch (error) {
          // Do nothing - this scheduled item is not a newly scheduled auction
        }
      }
    });

    // If auctions are in scheduler check if they also exist in the cache, if not append
    if (futureStartingBlocks.length !== 0) {
      await AppendNewAuctions(chain, futureStartingBlocks);
    }
    return resolve();
  });
}

async function AppendNewAuctions(chain, blocks) {
  // Load existing cache
  fs.readFile(`./components/utilities/data/${chain.cache}`, "utf8", async function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      // Parse existing cache
      const existingAuctions = JSON.parse(data);
      let latestIndex = 0;
      let existingStartBlocks = [];
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
      // Only attempt to update JSON if blocks from scheduler were not added from previous scan
      if (addedStartBlocks.length === 0) {
        if (chain.name === "Kusama") {
          process.exit(0);
        }
        return;
      }
      const updatedAuctions = existingAuctions.concat(addedStartBlocks);
      // Write results
      const json = JSON.stringify(updatedAuctions, null, 2);
      fs.writeFile(`./components/utilities/data/${chain.cache}`, json, "utf8", async function writeFileCallback(err) {
        // Once both async processes have completed terminate the script
        if (err) {
          console.log(err);
          if (chain.name === "Kusama") {
            process.exit(1);
          }
        } else {
          console.log(`Updating of ${chain.name} cache complete.`);
          if (chain.name === "Kusama") {
            process.exit(0);
          }
        }
      });
    }
  });
}