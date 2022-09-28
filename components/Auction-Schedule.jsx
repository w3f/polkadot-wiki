import React, { useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from "@polkadot/api";
import { 
	PolkadotAuctions,
	PolkadotSlotLeasePeriod,
	PolkadotSlotLeaseOffset,
	PolkadotLeasePeriodPerSlot,
	KusamaAuctions,
	KusamaSlotLeasePeriod,
	KusamaSlotLeaseOffset,
	KusamaLeasePeriodPerSlot
} from './utilities/auctionVariables';

let API = undefined;
let ChainState =  {
	block: undefined,
	blockNumber: undefined,
	blockDate: undefined,
}
let Options = [];
const FutureBlock = "0x0000000000000000000000000000000000000000000000000000000000000000";

// Component for displaying auction data
function AuctionSchedule() {
	const [auctions, setAuctions] = useState("Loading Auctions...");

	useEffect(async () => {
		const title = document.title;
		if (title === "Parachain Slot Auctions · Polkadot Wiki") {
			const chain = "Polkadot";
			const wsProvider = new WsProvider("wss://rpc.polkadot.io");
			await LoadOptions(PolkadotAuctions,wsProvider);
			await LoadBlockCacheThenUpdate(chain, PolkadotAuctions, setAuctions, { target: { value: 0 } });
		}
		else if (title === "Parachain Slot Auctions · Guide") {
			const chain = "Kusama";
			const wsProvider = new WsProvider("wss://kusama-rpc.polkadot.io");
			await LoadOptions(KusamaAuctions, wsProvider);
			await LoadBlockCacheThenUpdate(chain, KusamaAuctions, setAuctions, { target: { value: 0 } });
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
		Options.push(option);
	}
	API = await ApiPromise.create({ provider: wsProvider });
}

// Renders default value prior to initializing on-chain retrieval
async function LoadBlockCacheThenUpdate(chain, defaultAuctions, setAuctions, e) {
	const index = e.target.value;
	const auctions = Render(chain, defaultAuctions, setAuctions, index);
	await GetChainData(chain, auctions, setAuctions, index)
}

// Connect to a chain, retrieve required values, re-render
async function GetChainData(chain, auctions, setAuctions, index) {
	// Check if current block was already retrieved
	if(ChainState.block === undefined) {
		// Get the current block for projection
		ChainState.block = await API.rpc.chain.getBlock();
		ChainState.blockNumber = ChainState.block.block.header.number.toPrimitive();
		// Get current on-chain date/time
		ChainState.blockDate = GetBlockTimestamp(ChainState.block);
	}

	const selection = auctions[index];
	const selectedBlocks = {
		startDate: [selection.startBlock, selection.startHash],
		endPeriodDate: [selection.endPeriodBlock, selection.endPeriodHash],
		biddingEndsDate: [selection.biddingEndsBlock, selection.biddingEndsHash],
		onboardStartDate: [selection.onboardStartBlock, selection.onboardStartHash],
		onboardEndDate: [selection.onboardEndBlock, selection.onboardEndHash]
	}

	// If a block is finalized get the on-chain timestamp, otherwise estimate it
	let promises = [];
	let keys = [];

	for (const [key, value] of Object.entries(selectedBlocks)) {
		if (value[1] !== FutureBlock) {
			promises.push(API.rpc.chain.getBlock(value[1]));
			keys.push(key);
		} else {
			auctions[index][key] = EstimateBlockDate(ChainState.blockDate, ChainState.blockNumber, value[0]);
		}
	}

	await Promise.all(promises)
		.then((blocks) => {
			for(let i = 0; i < promises.length; i++) {
				auctions[index][keys[i]] = GetBlockTimestamp(blocks[i]).toDateString();
			}
		})
		.catch((error) => {
			console.log(error);
		})
	
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

	// Current block information
	let currentBlockNumber = ChainState.blockNumber;
	let currentBlockDate = ChainState.blockDate;
	if (currentBlockNumber !== undefined) {
		currentBlockDate = currentBlockDate.toDateString();
	} else {
		currentBlockNumber = 0;
		currentBlockDate = "Connecting...";
	}

	// If still calculating date estimation, inform user
	if (auctions[index].hasOwnProperty("startDate") === false) {
		const msg = "Retrieving date...";
		auctions[index]["startDate"] = msg;
		auctions[index]["endPeriodDate"] = msg;
		auctions[index]["biddingEndsDate"] = msg;
		auctions[index]["onboardStartDate"] = msg;
		auctions[index]["onboardEndDate"] = msg;
	}

	const content = <div>
		<select id="AuctionSelector" onChange={(e) => LoadBlockCacheThenUpdate(chain, auctions, setAuctions, e)} style={{ border: '2px solid #e6007a', height: '40px' }}>
			{Options.map((option) => (option))}
		</select>
		<hr />
		<b>Current Chain State:</b>
		<br />
		{`${currentBlockDate} - `}
		<a href={`${explorerUrl}${currentBlockNumber}`}>
			Block #{currentBlockNumber}
		</a>
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
		{` to `}
		{`${auctions[index].onboardEndDate} - `}
		<a href={`${explorerUrl}${auctions[index].onboardEndBlock}`}>
			Block #{auctions[index].onboardEndBlock}
		</a>
		<hr />
		<p style={{ color: "#6c757d" }}>
			The dates and block numbers listed above can change based on network block production and the potential for skipped blocks.
			Dates for finalized blocks are pulled from on-chain, while future blocks are estimated using 6 second average block times.
		</p>
	</div>

	setAuctions(content);
	return auctions;
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

// Decode block extrinsics - first item is always a timestamp
function GetBlockTimestamp(signedBlock) {
	const ex = signedBlock.block.extrinsics[0];
	const { isSigned, meta, method: { args, method, section } } = ex;
	const timestamp = `${args.map((a) => a.toString()).join(', ')}`;
	const date = new Date(parseInt(timestamp));
	return date;
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

export default AuctionSchedule;