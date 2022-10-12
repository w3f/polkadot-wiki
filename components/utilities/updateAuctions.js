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
				
				for (const [key, value] of Object.entries(blocks)) {
					if (value[1] !== FutureBlock) {
						const apiAt = await API.at(value[1]);
						const stamp = await apiAt.query.timestamp.now();
						existingAuctions[i][key] = stamp.toPrimitive();
						console.log(`${key}: ${existingAuctions[i][key]}`);
					}
				}
			}

			// Write
			json = JSON.stringify(existingAuctions); //convert it back to json
			fs.writeFile("auctions-sample.json", json, "utf8", async function writeFileCallback(err) {
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

// Get the auction end, on-board start and end blocks from auction start block
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
		// We are dealing with future blocks - TODO use subscan instead of PolkadotJS?
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