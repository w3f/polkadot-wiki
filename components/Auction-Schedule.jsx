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
	KusamaLeasePeriodPerSlot,
	FutureBlock
} from './utilities/auctionVariables';

let API = undefined;
let ChainState =  {
	Header: undefined,
	BlockNumber: undefined,
	BlockDate: undefined,
	AuctionStatus: undefined,
	AuctionIndex: undefined,
}
let Options = [];

// Component for displaying auction data
function AuctionSchedule() {
	const [auctions, setAuctions] = useState("Loading Auctions...");

	useEffect(async () => {
		const title = document.title;
		if (title === "Parachain Slot Auctions · Polkadot Wiki") {
			const chain = "Polkadot";
			const wsProvider = new WsProvider("wss://rpc.polkadot.io");
			await LoadOptions(PolkadotAuctions, wsProvider);
			await SetCurrentBlockData();
			[ChainState.AuctionIndex, ChainState.AuctionStatus] = GetCurrentOrNextAuction(chain, PolkadotAuctions, ChainState.BlockNumber);
			await LoadBlockCacheThenUpdate(chain, PolkadotAuctions, setAuctions, { target: { value: ChainState.AuctionIndex } });
		}
		else if (title === "Parachain Slot Auctions · Guide") {
			const chain = "Kusama";
			const wsProvider = new WsProvider("wss://kusama-rpc.polkadot.io");
			await LoadOptions(KusamaAuctions, wsProvider);
			await SetCurrentBlockData();
			[ChainState.AuctionIndex, ChainState.AuctionStatus] = GetCurrentOrNextAuction(chain, KusamaAuctions, ChainState.BlockNumber);
			await LoadBlockCacheThenUpdate(chain, KusamaAuctions, setAuctions, { target: { value: ChainState.AuctionIndex } });
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

// Set current chain block data
async function SetCurrentBlockData() {
	ChainState.Header = await API.rpc.chain.getHeader();
	ChainState.BlockNumber = ChainState.Header.number.toPrimitive();
	const timestamp = (await API.query.timestamp.now()).toPrimitive();
	ChainState.BlockDate = new Date(timestamp)
}

// Loads drop-down selections
async function LoadOptions(auctions, wsProvider) {
	for (let i = 0; i < auctions.length; i++) {
		const option = <option value={i} key={i}>{`Auction #${i + 1}`}</option>
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
		// Estimate block date for future blocks
		if (value[1] === FutureBlock) {
			auctions[index][key] = EstimateBlockDate(ChainState.BlockDate, ChainState.BlockNumber, value[0]);
		} else {
			auctions[index][key] = new Date(auctions[index][key]).toDateString();
		}
	}

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
	let currentBlockNumber = ChainState.BlockNumber;
	let currentBlockDate = ChainState.BlockDate;
	if (currentBlockNumber !== undefined) {
		currentBlockDate = currentBlockDate.toDateString();
	} else {
		currentBlockNumber = 0;
		currentBlockDate = "Connecting...";
	}
	
	// On-boarding range
	let onboarding = <div>
		{`${auctions[index].onboardStartDate} - `}
		<a href={`${explorerUrl}${auctions[index].onboardStartBlock}`}>
			Block #{auctions[index].onboardStartBlock}
		</a>
		{` to `}
		{`${auctions[index].onboardEndDate} - `}
		<a href={`${explorerUrl}${auctions[index].onboardEndBlock}`}>
			Block #{auctions[index].onboardEndBlock}
		</a>
	</div>
	// If onboarding is too far in the future to calculate
	if (auctions[index]["onboardStartBlock"] === 0 || auctions[index]["onboardEndBlock"] === 0) {
		onboarding = <div>
			On-boarding cannot yet be determined for this future event.
		</div>
	}

	// Set dates for current auction in status
	[ChainState.AuctionIndex, ChainState.AuctionStatus] = GetCurrentOrNextAuction(chain, auctions, ChainState.BlockNumber);

	const content = <div>
		<div>{ChainState.AuctionStatus}</div>
		<br />
		<select 
			id = "AuctionSelector"
			defaultValue = {ChainState.AuctionIndex}
			onChange = {(e) => LoadBlockCacheThenUpdate(chain, auctions, setAuctions, e)}
			style = {{ border: '2px solid #e6007a', height: '40px' }}
		>
			{Options.map((option) => (option))}
		</select>
		<hr />
		<b>Auction Starts:</b>
		<br />
		{`${auctions[index].startDate} - `}
		<a href={`${explorerUrl}${auctions[index].startBlock}`}>
			Block #{auctions[index].startBlock}
		</a>
		<hr />
		<b>Bidding Starts:</b>
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
		<b>Lease Period:</b>
		<br />
		{onboarding}
		<hr />
		<p style={{ color: "#6c757d" }}>
			The dates and block numbers listed above can change based on network block production and the potential for skipped blocks.
			Dates for finalized blocks are pulled from on-chain, while future blocks are estimated using 6 second average block times.
			The current block is <a href={`${explorerUrl}${currentBlockNumber}`}> Block #{currentBlockNumber}</a>.
		</p>
	</div>

	setAuctions(content);
	return auctions;
}

function GetCurrentOrNextAuction(chain, auctions, currentBlock) {
	let index = 0;
	let status = "";
	for (let i = 0; i < auctions.length; i++) {
		if (currentBlock === 0) {
			status = "Current block is still loading...";
			return [index, status];
		}
		if (auctions[i].biddingEndsBlock > currentBlock) {
			if (auctions[i].startBlock > currentBlock) {
				status = `Auction #${i + 1} on ${chain} will start on ${auctions[i].startDate} and ends on ${auctions[i].biddingEndsDate}.
				For the full schedule of the auctions on ${chain}, use the dropdown below.`;
			} else {
				status = `Auction #${i + 1} is in progress on ${chain}, which started on ${auctions[i].startDate} and ends on ${auctions[i].biddingEndsDate}.
				For the full schedule of the auctions on ${chain}, use the dropdown below:`;
			}
			index = i;
			return [index, status];
		}
	}
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

export default AuctionSchedule;
