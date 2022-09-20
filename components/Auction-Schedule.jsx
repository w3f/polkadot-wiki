import React, { useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from "@polkadot/api";
import { PolkadotAuctions, KusamaAuctions } from './utilities/auctions';

// Number of auctions to display in drop-down
const auctionCount = 2;

// First auction blocks for both chains
const firstAuctionBlockDot = 7658910;
const firstAuctionBlockKsm = 7924237;

// Generated at run-time
let chain = undefined;
let wsProvider = undefined;
let api = undefined;
let options = [];

// Component that retrieves and displays on-chain auction data
function AuctionSchedule() {
	const [auctions, setAuctions] = useState("Loading Auctions...");

	useEffect(async () => {
		const title = document.title;
		// Polkadot
		if (title === "Parachain Slot Auctions · Polkadot Wiki") {
			chain = "polkadot";
			LoadDefaults(PolkadotAuctions, setAuctions);
			//wsProvider = new WsProvider("wss://rpc.polkadot.io");
			//await Connect(wsProvider, firstAuctionBlockDot, setAuctions);
		} 
		// Kusama
		else if (title === "Parachain Slot Auctions · Guide") {
			chain = "kusama";
			LoadDefaults(KusamaAuctions, setAuctions);
			//wsProvider = new WsProvider("wss://kusama-rpc.polkadot.io/");
			//await Connect(wsProvider, firstAuctionBlockKsm, setAuctions);
		}
	// Other
		else {
			console.log("Unknown wiki/guide type");
		}
	}, []);

	// Render
	if (chain !== undefined) {
		return auctions;
	} else {
		return (<div>Loading Auctions...</div>)
	}
}

// Loads hard-coded auction default values
function LoadDefaults(auctions, setAuctions) {
	for (let i = 0; i < auctions.length; i++) {
		const option = <option value={i} key={i}>{auctions[i].option}</option>
		options.push(option);
	}
	Update(options, auctions, setAuctions, { target: { value: 0 } });
}

// Connect to a chain, retrieve required values, generate UI output values
async function Connect(wsProvider,  initialBlock, setAuctions) {
	api = await ApiPromise.create({ provider: wsProvider });

	// Get the current block for projection
	const currentBlock = await api.rpc.chain.getBlock();
	const currentBlockNumber = currentBlock.block.header.number.toPrimitive();

	// Get current on-chain date/time
	let chainTimestamp = await api.query.timestamp.now();
	let date = new Date(chainTimestamp.toPrimitive());

	// Add starting block for the given chain
	let auctions = [];
	let auctionBlocks = [];
	auctionBlocks.push(initialBlock);

	// Build auction objects with all required values for UI
	for (let i = 0; i < auctionCount; i++) {
		let auction = {};

		// Blocks
		auction.startBlock = auctionBlocks[auctionBlocks.length - 1];
		auction.startHash = await api.rpc.chain.getBlockHash(auction.startBlock);
		const apiAt = await api.at(auction.startHash.toString());
		const endPeriod = apiAt.consts.auctions.endingPeriod.toPrimitive();
		const [lease, end] = (await apiAt.query.auctions.auctionInfo()).toJSON();
		auction.weeksLeased = lease;
		auction.endPeriodBlock = end;
		auction.biddingEndsBlock = auction.endPeriodBlock + endPeriod;

		// TODO - estimates should only be made for future block, otherwise use on-chain timestamp
		auction.startDate = EstimateBlockDate(date, currentBlockNumber, auction.startBlock);
		auction.endPeriodDate = EstimateBlockDate(date, currentBlockNumber, auction.endPeriodBlock);
		auction.biddingEndsDate = EstimateBlockDate(date, currentBlockNumber, auction.biddingEndsBlock);

		// TODO - how to get his value?
		auction.startOnBoard = "December 17th, 2021";
		auction.endOnBoard = "October 20th, 2023";
		//auction.endOnBoard = auction.weeksLeased * 7 + auction.startOnBoard;

		// Calculate next starting block
		const periodStep = 3600; // TODO: Get on-chain
		auction.nextStartingBlock = auction.biddingEndsBlock + periodStep;
		auctionBlocks.push(auction.nextStartingBlock);
		auctions.push(auction);

		// Drop-down option
		let option = <option value={i} key={i}>{`Auction #${i + 1} - ${auction.startDate.toDateString()}`}</option>
		options.push(option);
	}

	Update(auctions, setAuctions, { target: { value: 0 } });
}

// Update JSX
function Update(options, auctions, setAuctions, event) {
	const index = event.target.value;

	// First child in select is rendered by default
	const content = <div>
		<select id="AuctionSelector" onChange={(e) => Update(options, auctions, setAuctions, e)} style={{ border: '2px solid #e6007a', height: '40px' }}>
			{options.map((option) => (option))}
		</select>
		<hr />
		<b>Auction Starts:</b>
		<br />
		{`${auctions[index].startDate} - `}
		<a href={`https://polkadot.subscan.io/block/${auctions[index].startBlock.substring(1)}`}>
			Block {auctions[index].startBlock}
		</a>
		<hr />
		<b>Auction Ends:</b>
		<br />
		{`${auctions[index].endPeriodDate} - `}
		<a href={`https://polkadot.subscan.io/block/${auctions[index].endPeriodBlock.substring(1)}`}>
			Block {auctions[index].endPeriodBlock}
		</a>
		<hr />
		<b>Bidding Ends:</b>
		<br />
		{`${auctions[index].biddingEndsDate} - `}
		<a href={`https://polkadot.subscan.io/block/${auctions[index].biddingEndsBlock.substring(1)}`}>
			Block {auctions[index].biddingEndsBlock}
		</a>
		<hr />
		<b>Winning parachain(s) onboarded:</b>
		<br />
		{auctions[index].onboard}
		<hr />
	</div>

	setAuctions(content);
}

// Estimate a future blocks date based on 6 second block times
function EstimateBlockDate(date, currentBlock, estimatedBlock) {
	const blockDifference = estimatedBlock - currentBlock;
	const seconds = blockDifference * 6;
	let dateCopy = new Date(date.valueOf())
	dateCopy.setSeconds(dateCopy.getSeconds() + seconds);
	return dateCopy;
}

export default AuctionSchedule;