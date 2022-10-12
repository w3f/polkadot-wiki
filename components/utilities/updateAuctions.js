let fs = require("fs");
let Polkadot = require("@polkadot/api");

let AuctionVariables = require("./auctionVariables");
const PolkadotSlotLeasePeriod = AuctionVariables.PolkadotSlotLeasePeriod;
const PolkadotSlotLeaseOffset = AuctionVariables.PolkadotSlotLeaseOffset;
const PolkadotLeasePeriodPerSlot = AuctionVariables.PolkadotLeasePeriodPerSlot;
const KusamaSlotLeasePeriod = AuctionVariables.KusamaSlotLeasePeriod;
const KusamaSlotLeaseOffset = AuctionVariables.KusamaSlotLeaseOffset;
const KusamaLeasePeriodPerSlot = AuctionVariables.KusamaLeasePeriodPerSlot;
const FutureBlock = AuctionVariables.FutureBlock;

let API = undefined;

LoadAPI().then(() => {
  fs.readFile("./components/utilities/data/PolkadotAuctions.json", "utf8", async function readFileCallback(err, data) {
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

        // Iterate block types for the given auction
        for (const [key, value] of Object.entries(blocks)) {
          // If cache presents a future block, check to see if it has been recently created and update it
          if (value[1] === FutureBlock) {
            const hash = await BlockToHash(API, startBlock);
            if (hash !== FutureBlock) {
              console.log("Future block replaced!");
              switch (key) {
                case startDate:
                  existingAuctions[i].startHash = hash;
                  break;
                case endPeriodDate:
                  existingAuctions[i].endPeriodHash = hash;
                  break;
                case biddingEndsDate:
                  existingAuctions[i].biddingEndsHash = hash;
                  break;
                case onboardStartDate:
                  existingAuctions[i].onboardStartHash = hash;
                  break;
                case onboardEndDate:
                  existingAuctions[i].onboardEndHash = hash;
                  break;
                default:
                  break;
              }
            }
          }

          // If not a future block at this point and there is not already a timestamp for the given block
          if (value[1] !== FutureBlock && Object.hasOwn(existingAuctions[i], key) === false) {
            const apiAt = await API.at(value[1]);
            const stamp = await apiAt.query.timestamp.now();
            existingAuctions[i][key] = stamp.toPrimitive();
            console.log(`${key}: ${existingAuctions[i][key]} added!`);
          } else {
            console.log("Future block found, no updates required!")
          }
        }
      }

      // Write results
      json = JSON.stringify(existingAuctions); //convert it back to json
      fs.writeFile("./components/utilities/data/PolkadotAuctions.json", json, "utf8", async function writeFileCallback(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Update Complete.");
        }
      });
    }
  })
}
);

async function LoadAPI() {
  const WSProvider = new Polkadot.WsProvider("wss://rpc.polkadot.io");
  API = await Polkadot.ApiPromise.create({ provider: WSProvider });
}

// TODO - update to also return auction bidding start
// Get the auction bidding start, bidding end, lease period start and lease period end blocks from the auction start block
async function GetAuctionBlocks(api, startBlock, chain) {
  const hash = await BlockToHash(startBlock);
  if (hash !== FutureBlock) {
    const apiAt = await api.at(hash);
    const [auctionLeasePeriod, auctionEndBlock] = (await apiAt.query.auctions.auctionInfo()).toJSON();
    if (chain === "Polkadot") {
      const onboardStartBlock = auctionLeasePeriod * PolkadotSlotLeasePeriod + PolkadotSlotLeaseOffset;
      const onboardEndBlock = onboardStartBlock + DaysToBlocks(PolkadotLeasePeriodPerSlot * 12 * 7);
      return [auctionEndBlock, onboardStartBlock, onboardEndBlock]
    }
    else if (chain === "Kusama") {
      const onboardStartBlock = auctionLeasePeriod * KusamaSlotLeasePeriod + KusamaSlotLeaseOffset;
      const onboardEndBlock = onboardStartBlock + DaysToBlocks(KusamaLeasePeriodPerSlot * 6 * 7);
      return [auctionEndBlock, onboardStartBlock, onboardEndBlock]
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