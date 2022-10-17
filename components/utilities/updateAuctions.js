const fs = require("fs");
const Polkadot = require("@polkadot/api");
const {
  PolkadotSlotLeasePeriod,
  PolkadotSlotLeaseOffset,
  PolkadotLeasePeriodPerSlot,
  PolkadotStartingPhase,
  KusamaSlotLeasePeriod,
  KusamaSlotLeaseOffset,
  KusamaLeasePeriodPerSlot,
  KusamaStartingPhase,
  FutureBlock
} = require("./auctionVariables");

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

const chains = [PolkadotParameters, KusamaParameters];

let API = undefined;

chains.forEach(params => {
  LoadAPI(params).then(() => {
    console.log(`Updating ${params.chain} cache.`);
    Update(params);
  });
});

// TODO - end node process when updating of both chains completes

async function Update(params) {
  fs.readFile(`./components/utilities/data/${params.cache}`, "utf8", async function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      const existingAuctions = JSON.parse(data);

      // Iterate existing auctions
      for (let i = 0; i < existingAuctions.length; i++) {
        let auction = existingAuctions[i];

        // All relevant block types for a single auction
        const blocks = {
          startDate: [auction.startBlock, auction.startHash],
          endPeriodDate: [auction.endPeriodBlock, auction.endPeriodHash],
          biddingEndsDate: [auction.biddingEndsBlock, auction.biddingEndsHash],
          onboardStartDate: [auction.onboardStartBlock, auction.onboardStartHash],
          onboardEndDate: [auction.onboardEndBlock, auction.onboardEndHash]
        }

        // TODO - now that the cache is up-to-date this can be
        // simplified greatly and possibly avoid the next iteration

        // Iterate block types for the given auction
        for (const [key, value] of Object.entries(blocks)) {
          // If cache presents a future block, check to see if it has been recently created and update it
          if (value[1] === FutureBlock) {
            // Attempt to handle on-boarding data that was previously unknown
            /*
            if (value[0] === 0 && (key === onboardStartDate || key === onboardEndDate)) {
              // If the start block hash is known we can calculate remaining blocks
              if (existingAuctions[i].startHash !== FutureBlock) {
                const [auctionEndBlock, onboardStartBlock, onboardEndBlock] = GetAuctionBlocks(API, existingAuctions[i].startBlock, params.chain);
              }
            }
            */
            if (value[0] === 0) {
              continue;
            }
            const hash = await BlockToHash(API, value[0]);
            if (hash !== FutureBlock) {
              console.log("Future block replaced!");
              switch (key) {
                case "startDate":
                  existingAuctions[i].startHash = hash;
                  break;
                case "endPeriodDate":
                  existingAuctions[i].endPeriodHash = hash;
                  break;
                case "biddingEndsDate":
                  existingAuctions[i].biddingEndsHash = hash;
                  break;
                case "onboardStartDate":
                  existingAuctions[i].onboardStartHash = hash;
                  break;
                case "onboardEndDate":
                  existingAuctions[i].onboardEndHash = hash;
                  break;
                default:
                  break;
              }
            }
          }

          // If not a future block at this point and there is not already a timestamp for the given block
          // TODO - this should check existingAuctions[i], not value[1]
          if (value[1] !== FutureBlock && Object.hasOwn(existingAuctions[i], key) === false) {
            const apiAt = await API.at(value[1]);
            const stamp = await apiAt.query.timestamp.now();
            existingAuctions[i][key] = stamp.toPrimitive();
            console.log(`${key}: ${existingAuctions[i][key]} added.`);
          } else {
            console.log("Future block found, no updates required.")
          }
        }
      }

      // Write results
      json = JSON.stringify(existingAuctions, null, 2); //convert it back to json
      fs.writeFile(`./components/utilities/data/${params.cache}`, json, "utf8", async function writeFileCallback(err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Updating of ${params.chain} cache complete.`);
        }
      });
    }
  })
}

async function LoadAPI(chain) {
  const WSProvider = new Polkadot.WsProvider(chain.ws);
  API = await Polkadot.ApiPromise.create({ provider: WSProvider });
}

// Get the auction bidding start, bidding end, lease period start and lease period end blocks from the auction start block
async function GetAuctionBlocks(api, startBlock, chain) {
  const hash = await BlockToHash(startBlock);
  if (hash !== FutureBlock) {
    const biddingStarts = startBlock + PolkadotStartingPhase;
    const apiAt = await api.at(hash);
    const [auctionLeasePeriod, auctionEndBlock] = (await apiAt.query.auctions.auctionInfo()).toJSON();
    if (chain === "Polkadot") {
      const onboardStartBlock = auctionLeasePeriod * PolkadotSlotLeasePeriod + PolkadotSlotLeaseOffset;
      const onboardEndBlock = onboardStartBlock + DaysToBlocks(PolkadotLeasePeriodPerSlot * 12 * 7);
      return [biddingStarts, auctionEndBlock, onboardStartBlock, onboardEndBlock]
    }
    else if (chain === "Kusama") {
      const biddingStarts = startBlock + KusamaStartingPhase;
      const onboardStartBlock = auctionLeasePeriod * KusamaSlotLeasePeriod + KusamaSlotLeaseOffset;
      const onboardEndBlock = onboardStartBlock + DaysToBlocks(KusamaLeasePeriodPerSlot * 6 * 7);
      return [biddingStarts, auctionEndBlock, onboardStartBlock, onboardEndBlock]
    }
  }
  else {
    // We are dealing with a future auction start block so a hash will not yet exist
    return [0, 0, 0];
  }
}

// Block number to block hash
async function BlockToHash(api, block) {
  const hash = await api.rpc.chain.getBlockHash(block);
  return hash;
}

// Convert an integer representing number of days block count for that time span
function DaysToBlocks(days) {
  const blocks = (days / 6) * 86400;
  return blocks;
}