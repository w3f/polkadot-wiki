let fs = require("fs");
let Polkadot = require("@polkadot/api");

let API = undefined;
const FutureBlock = "0x0000000000000000000000000000000000000000000000000000000000000000";

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
			fs.writeFile("auctions-sample.json", json, "utf8", callback);
		}
	})
}
);

async function LoadAPI() {
	const WSProvider = new Polkadot.WsProvider("wss://rpc.polkadot.io");
	API = await Polkadot.ApiPromise.create({ provider: WSProvider });
}

function callback() {
  console.log("Done.");
}