import React, { useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from "@polkadot/api";
import { 
	PolkadotAuctions,
	PolkadotSlotLeasePeriod,
	PolkadotSlotLeaseOffset,
	KusamaAuctions,
	KusamaSlotLeasePeriod,
	KusamaSlotLeaseOffset
} from './utilities/auctions';

let api = undefined;
let options = [];

// Component for displaying auction data
function AuctionSchedule() {
	const [auctions, setAuctions] = useState("Loading Auctions...");

	useEffect(async () => {
		const title = document.title;
		if (title === "Parachain Slot Auctions · Polkadot Wiki") {
			const chain = "Polkadot";
			const wsProvider = new WsProvider("wss://rpc.polkadot.io");
			await LoadOptions(PolkadotAuctions,wsProvider);
			await LoadBlockCacheThenUpdate(chain, PolkadotAuctions, setAuctions, { target: { value: 0 } })
		}
		else if (title === "Parachain Slot Auctions · Guide") {
			const chain = "Kusama";
			const wsProvider = new WsProvider("wss://kusama-rpc.polkadot.io");
			await LoadOptions(KusamaAuctions, wsProvider);
			await LoadBlockCacheThenUpdate(chain, KusamaAuctions, setAuctions, { target: { value: 0 } })
		}
		else {
			console.log("Unknown wiki/guide type");
		}
	}, []);

	// Render
	if (auctions !== undefined) {
		return auctions;
	} else {
		return (<div>Loading auction data...</div>)
	}
}

// Loads drop-down selections
async function LoadOptions(auctions, wsProvider) {
	for (let i = 0; i < auctions.length; i++) {
		const option = <option value={i} key={i}>{`Auction #${i + 1} at Block #${auctions[i]["startBlock"]}`}</option>
		options.push(option);
	}
	api = await ApiPromise.create({ provider: wsProvider });
}

// Renders default value prior to initializing on-chain retrieval
async function LoadBlockCacheThenUpdate(chain, defaultAuctions, setAuctions, e) {
	const index = e.target.value;
	const auctions = Render(chain, defaultAuctions, setAuctions, index);
	await GetChainData(chain, auctions, setAuctions, index)
}

// Connect to a chain, retrieve required values, re-render
async function GetChainData(chain, auctions, setAuctions, index) {
	// Get the current block for projection
	const currentBlock = await api.rpc.chain.getBlock();
	const currentBlockNumber = currentBlock.block.header.number.toPrimitive();

	// Get current on-chain date/time
	const chainTimestamp = await api.query.timestamp.now();
	const date = new Date(chainTimestamp.toPrimitive());

	// TODO - estimates should only be made for future block, otherwise use on-chain timestamp
	// Should we also cache block hashes to avoid having to make multiple rpc invocations?
	if (currentBlockNumber > auctions[index].startBlock) {
		console.log("start block has already occurred");
	} else {
		console.log("start block has not yet occurred");
	}
	auctions[index].startDate = EstimateBlockDate(date, currentBlockNumber, auctions[index].startBlock);
	auctions[index].endPeriodDate = EstimateBlockDate(date, currentBlockNumber, auctions[index].endPeriodBlock);
	auctions[index].biddingEndsDate = EstimateBlockDate(date, currentBlockNumber, auctions[index].biddingEndsBlock);
	auctions[index].onboardStartDate = EstimateBlockDate(date, currentBlockNumber, auctions[index].onboardStartBlock);
	auctions[index].onboardEndDate = EstimateBlockDate(date, currentBlockNumber, auctions[index].onboardEndBlock);
	
	Render(chain, auctions, setAuctions, index);
}

// Estimate a future blocks date based on 6 second block times
function EstimateBlockDate(date, currentBlock, estimatedBlock) {
	const blockDifference = estimatedBlock - currentBlock;
	const seconds = blockDifference * 6;
	const dateCopy = new Date(date.valueOf())
	dateCopy.setSeconds(dateCopy.getSeconds() + seconds);
	return dateCopy.toDateString();
}

// Update JSX
function Render(chain, auctions, setAuctions, index) {
	let explorerUrl = undefined;
	if (chain === "Polkadot") {
		explorerUrl = "https://polkadot.subscan.io/block/";
	} else if (chain === "Kusama") {
		explorerUrl = "https://kusama.subscan.io/block/";
	}

	// If still calculating date estimation, inform user
	if (auctions[index].hasOwnProperty("startDate") === false) {
		const msg = "Estimating block date...";
		auctions[index]["startDate"] = msg;
		auctions[index]["endPeriodDate"] = msg;
		auctions[index]["biddingEndsDate"] = msg;
		auctions[index]["onboardStartDate"] = msg;
		auctions[index]["onboardEndDate"] = msg;
	}

	const content = <div>
		<select id="AuctionSelector" onChange={(e) => LoadBlockCacheThenUpdate(chain, auctions, setAuctions, e)} style={{ border: '2px solid #e6007a', height: '40px' }}>
			{options.map((option) => (option))}
		</select>
		<hr />
		<b>Auction Starts:</b>
		<br />
		{`${auctions[index].startDate} - `}
		<a href={`${explorerUrl}${auctions[index].startBlock}`}>
			Block #{auctions[index].startBlock}
		</a>
		<hr />
		<b>Auction Ends:</b>
		<br />
		{`${auctions[index].endPeriodDate} - `}
		<a href={`${explorerUrl}${auctions[index].endPeriodBlock}`}>
			Block #{auctions[index].endPeriodBlock}
		</a>
		<hr />
		<b>Bidding Ends:</b>
		<br />
		{`${auctions[index].biddingEndsDate} - `}
		<a href={`${explorerUrl}${auctions[index].biddingEndsBlock}`}>
			Block #{auctions[index].biddingEndsBlock}
		</a>
		<hr />
		<b>Winning parachain(s) onboarded:</b>
		<br />
		{`${auctions[index].onboardStartDate} - `}
		<a href={`${explorerUrl}${auctions[index].onboardStartBlock}`}>
			Block #{auctions[index].onboardStartBlock}
		</a>
		{` to`}
		<br />
		{`${auctions[index].onboardEndDate} - `}
		<a href={`${explorerUrl}${auctions[index].onboardEndBlock}`}>
			Block #{auctions[index].onboardEndBlock}
		</a>
		<hr />
		<p style={{ color: "#6c757d" }}>
			The dates (based on UTC) and block numbers listed above can change based on network block production and the potential for skipped blocks.
			Click on the block number for an up-to-date estimate.
		</p>
	</div>

	setAuctions(content);
	return auctions;
}

// TODO - these functions will be used by the GitHub action when adding new values to auctions.js

async function OnboardingBlocks(api, hash, chain) {

	if (hash !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
		const apiAt = await api.at(hash);
		const [auctionLeasePeriod, auctionEndBlock] = (await apiAt.query.auctions.auctionInfo()).toJSON();
		if (chain === "Polkadot") {
			const onboardStartBlock = auctionLeasePeriod * PolkadotSlotLeasePeriod + PolkadotSlotLeaseOffset;
			const onboardEndBlock = onboardStartBlock + DaysToBlocks(8 * 12 * 7);
			return [onboardStartBlock, onboardEndBlock]
		}
		else if (chain === "Kusama") {
			const onboardStartBlock = auctionLeasePeriod * KusamaSlotLeasePeriod + KusamaSlotLeaseOffset;
			const onboardEndBlock = onboardStartBlock + DaysToBlocks(8 * 6 * 7);
			return [onboardStartBlock, onboardEndBlock]
		}
	}
	else {
		return [0, 0];
	}
}

async function BlockToHash(api, block) {
	const hash = await api.rpc.chain.getBlockHash(block);
	return hash;
}

function DaysToBlocks(days) {
	const blocks = (days / 6) * 86400;
	return blocks;
}

export default AuctionSchedule;