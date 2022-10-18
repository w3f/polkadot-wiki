const fs = require("fs");
const Polkadot = require("@polkadot/api");
const {
  PolkadotSlotLeasePeriod,
  PolkadotSlotLeaseOffset,
  PolkadotLeasePeriodPerSlot,
  PolkadotStartingPhase,
  PolkadotEndingPeriod,
  KusamaSlotLeasePeriod,
  KusamaSlotLeaseOffset,
  KusamaLeasePeriodPerSlot,
  KusamaStartingPhase,
  KusamaEndingPeriod,
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

      // Get current block data
      const header = await API.rpc.chain.getHeader();
      const currentBlock = header.number.toPrimitive();

      // Iterate existing auctions
      for (let i = 0; i < existingAuctions.length; i++) {
        let auction = existingAuctions[i];

        // First check if all block numbers are defined (0 indicates not available in cache)
        if (auction.onboardStartBlock === null || auction.onboardEndBlock === null) {
          // Use the startBlock recalculate remaining relevant block numbers
          const [endPeriodBlock, auctionEndBlock, onboardStartBlock, onboardEndBlock] = await GetAuctionBlocks(API, currentBlock, auction.startBlock, params.chain);
          existingAuctions[i].endPeriodBlock = endPeriodBlock;
          existingAuctions[i].biddingEndsBlock = auctionEndBlock;
          existingAuctions[i].onboardStartBlock = onboardStartBlock;
          existingAuctions[i].onboardEndBlock = onboardEndBlock;
        }

        // Check to see if all block numbers have an associated hash or are future blocks
        existingAuctions[i].startHash = await UpdateBlockHash(currentBlock, auction.startBlock, auction.startHash);
        existingAuctions[i].endPeriodHash = await UpdateBlockHash(currentBlock, auction.endPeriodBlock, auction.endPeriodHash);
        existingAuctions[i].biddingEndsHash = await UpdateBlockHash(currentBlock, auction.biddingEndsBlock, auction.biddingEndsHash);
        existingAuctions[i].onboardStartHash = await UpdateBlockHash(currentBlock, auction.onboardStartBlock, auction.onboardStartHash);
        existingAuctions[i].onboardEndHash = await UpdateBlockHash(currentBlock, auction.onboardEndBlock, auction.onboardEndHash);

        // Check to see if dates exists, if this is a future block or a date can be retrieved from on-chain
        existingAuctions[i].startDate = await UpdateBlockDate(auction, auction.startHash, "startDate");
        existingAuctions[i].endPeriodDate = await UpdateBlockDate(auction, auction.endPeriodHash, "endPeriodDate");
        existingAuctions[i].biddingEndsDate = await UpdateBlockDate(auction, auction.biddingEndsHash, "biddingEndsDate");
        existingAuctions[i].onboardStartDate = await UpdateBlockDate(auction, auction.onboardStartHash, "onboardStartDate");
        existingAuctions[i].onboardEndDate = await UpdateBlockDate(auction, auction.onboardEndHash, "onboardEndDate");
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

async function UpdateBlockDate(auction, hash, dateKey) {
  // If timestamp already exists in cache
  if (Object.hasOwn(auction, dateKey) === true && auction[dateKey] !== null) {
    return auction[dateKey];
  } else if (hash === FutureBlock) {
    // If future block return null
    return null
  } else {
    const apiAt = await API.at(hash);
    const stamp = await apiAt.query.timestamp.now();
    return stamp.toPrimitive();
  }
}

async function UpdateBlockHash(currentBlock, blockNumber, currentHash) {
  if (blockNumber === null) {
    return FutureBlock
  } else if (currentHash !== FutureBlock) {
    return currentHash;
  } else if (blockNumber < currentBlock) {
    const hash = await BlockToHash(blockNumber);
    return hash;
  } else {
    return FutureBlock;
  }
}

async function LoadAPI(chain) {
  const WSProvider = new Polkadot.WsProvider(chain.ws);
  API = await Polkadot.ApiPromise.create({ provider: WSProvider });
}

// Get the auction bidding start, bidding end, lease period start and lease period end blocks from the auction start block
async function GetAuctionBlocks(api, currentBlock, startBlock, chain) {
  // We are dealing with a future auction start block so a hash will not yet exist
  if (startBlock > currentBlock) {
    // On-boarding start and end will not yet be available on-chain
    if (chain === "Polkadot") {
      const biddingStarts = startBlock + PolkadotStartingPhase;
      const auctionEndBlock = biddingStarts + PolkadotEndingPeriod;
      return [biddingStarts, auctionEndBlock, null, null]
    }
    else if (chain === "Kusama") {
      const biddingStarts = startBlock + KusamaStartingPhase;
      const auctionEndBlock = biddingStarts + KusamaEndingPeriod;
      return [biddingStarts, auctionEndBlock, null, null]
    }
  } else {
    const hash = await BlockToHash(startBlock);
    const apiAt = await api.at(hash);
    // If the starting block has already been produced all values are available on-chain
    const auctionLeasePeriod = (await apiAt.query.auctions.auctionInfo()).toJSON()[0];
    if (chain === "Polkadot") {
      const biddingStarts = startBlock + PolkadotStartingPhase;
      const auctionEndBlock = biddingStarts + PolkadotEndingPeriod;
      const onboardStartBlock = auctionLeasePeriod * PolkadotSlotLeasePeriod + PolkadotSlotLeaseOffset;
      const onboardEndBlock = onboardStartBlock + DaysToBlocks(PolkadotLeasePeriodPerSlot * 12 * 7);
      return [biddingStarts, auctionEndBlock, onboardStartBlock, onboardEndBlock]
    }
    else if (chain === "Kusama") {
      const biddingStarts = startBlock + KusamaStartingPhase;
      const auctionEndBlock = biddingStarts + KusamaEndingPeriod;
      const onboardStartBlock = auctionLeasePeriod * KusamaSlotLeasePeriod + KusamaSlotLeaseOffset;
      const onboardEndBlock = onboardStartBlock + DaysToBlocks(KusamaLeasePeriodPerSlot * 6 * 7);
      return [biddingStarts, auctionEndBlock, onboardStartBlock, onboardEndBlock]
    }
  }
}

// Block number to block hash
async function BlockToHash(block) {
  const hash = await API.rpc.chain.getBlockHash(block);
  return hash;
}

// Convert an integer representing number of days block count for that time span
function DaysToBlocks(days) {
  const blocks = (days / 6) * 86400;
  return blocks;
}