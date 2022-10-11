/*
There are utility functions in Auction-Schedule.jsx to retrieve all these values on-chain.
To further reduce latency in the Auction Schedule tool we hard-code them as they have yet to change w/ time.
A regularly scheduled GitHub action will be used to add future auction blocks.
*/

import * as DotAuctions from "./data/PolkadotAuctions.json";
import * as KsmAuctions from "./data/KusamaAuctions.json";

// consts.slots.leasePeriod
export const PolkadotSlotLeasePeriod = 1209600;
export const KusamaSlotLeasePeriod = 604800;

// consts.slots.leaseOffsets
export const PolkadotSlotLeaseOffset = 921600;
export const KusamaSlotLeaseOffset = 0;

// consts.auctions.leasePeriodsPerSlot
export const PolkadotLeasePeriodPerSlot = 8;
export const KusamaLeasePeriodPerSlot = 8;

// GetAuctionBlocks() in Auction-Schedule.jsx can generate all these values from a starting block number
export const PolkadotAuctions = DotAuctions;
export const KusamaAuctions = KsmAuctions;