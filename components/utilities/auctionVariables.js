/*
There are utility functions in updateAuction.js to retrieve all these values on-chain.
To further reduce latency in the Auction Schedule tool we hard-code them as they have yet 
to change w/ time or are derived from blocks that have already reach finality.
A regularly scheduled GitHub action will be used to cache future auction blocks data.
*/

const DotAuctions = require("./data/PolkadotAuctions.json");
const KsmAuctions = require("./data/KusamaAuctions.json");

// consts.slots.leasePeriod
const PolkadotSlotLeasePeriod = 1209600;
const KusamaSlotLeasePeriod = 604800;

// consts.slots.leaseOffsets
const PolkadotSlotLeaseOffset = 921600;
const KusamaSlotLeaseOffset = 0;

// consts.auctions.leasePeriodsPerSlot
const PolkadotLeasePeriodPerSlot = 8;
const KusamaLeasePeriodPerSlot = 8;

// Auction starting phases (45 hours)
const PolkadotStartingPhase = 27000;
const KusamaStartingPhase = 27000;

// const.auctions.endingPeriod (5 days)
const PolkadotEndingPeriod = 72000;
const KusamaEndingPeriod = 72000;

// GetAuctionBlocks() in Auction-Schedule.jsx can generate all these values from a starting block number
const PolkadotAuctions = DotAuctions;
const KusamaAuctions = KsmAuctions;

// A future block that does not yet have an associated hash
const FutureBlock = "0x0000000000000000000000000000000000000000000000000000000000000000";

// RPC variables for connecting to respective APIs
const PolkadotParameters = {
  name: "Polkadot",
  cache: "PolkadotAuctions.json",
  ws: "wss://rpc.polkadot.io"
}
const KusamaParameters = {
  name: "Kusama",
  cache: "KusamaAuctions.json",
  ws: "wss://kusama-rpc.polkadot.io",
}

module.exports = {
  PolkadotSlotLeasePeriod,
  KusamaSlotLeasePeriod,
  PolkadotSlotLeaseOffset,
  KusamaSlotLeaseOffset,
  PolkadotLeasePeriodPerSlot,
  KusamaLeasePeriodPerSlot,
  PolkadotStartingPhase,
  KusamaStartingPhase,
  PolkadotEndingPeriod,
  KusamaEndingPeriod,
  PolkadotAuctions,
  KusamaAuctions,
  FutureBlock,
  PolkadotParameters,
  KusamaParameters
}