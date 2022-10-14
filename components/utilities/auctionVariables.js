/*
There are utility functions in Auction-Schedule.jsx to retrieve all these values on-chain.
To further reduce latency in the Auction Schedule tool we hard-code them as they have yet to change w/ time.
A regularly scheduled GitHub action will be used to add future auction blocks.
*/

let DotAuctions = require("./data/PolkadotAuctions.json");
let KsmAuctions = require("./data/KusamaAuctions.json");

// consts.slots.leasePeriod
const PolkadotSlotLeasePeriod = 1209600;
const KusamaSlotLeasePeriod = 604800;

// consts.slots.leaseOffsets
const PolkadotSlotLeaseOffset = 921600;
const KusamaSlotLeaseOffset = 0;

// consts.auctions.leasePeriodsPerSlot
const PolkadotLeasePeriodPerSlot = 8;
const KusamaLeasePeriodPerSlot = 8;

// GetAuctionBlocks() in Auction-Schedule.jsx can generate all these values from a starting block number
const PolkadotAuctions = DotAuctions;
const KusamaAuctions = KsmAuctions;

// A future block that does not yet have an associated hash
const FutureBlock = "0x0000000000000000000000000000000000000000000000000000000000000000";

module.exports = {
  PolkadotSlotLeasePeriod,
  KusamaSlotLeasePeriod,
  PolkadotSlotLeaseOffset,
  KusamaSlotLeaseOffset,
  PolkadotLeasePeriodPerSlot,
  KusamaLeasePeriodPerSlot,
  PolkadotAuctions,
  KusamaAuctions,
  FutureBlock,
}