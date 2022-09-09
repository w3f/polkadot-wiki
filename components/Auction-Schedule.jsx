import React, { useEffect } from 'react';
import { BlocksToDays } from "./utilities/filters";

// Number of auctions to display in drop-down
const auctionCount = 100;
const firstAuctionBlockDot = 7658910;
const firstAuctionBlockKsm = 7924237;

// Generated at run-time
let chain = undefined;
let auctionBlocks = [];
let widgetData = [];

// Mock sample
const auctionStartDate = "November 11, 2021";
const auctionStartBlock = 7658910;
const auctionEndDate = "November 13, 2021";
const auctionEndBlock = 7684110;
const biddingEndDate = "November 18, 2021";
const biddingEndBlock = 77756110;
const onboardStart = "December 17th, 2021";
const onboardEnd = "October 20th, 2023";

let widget =
	<div>
		<select /*onChange={update}*/ style={{ border: '2px solid #e6007a', height: '40px' }}>
			<option value="No1">1st Auction - Nov 11, 2021</option>
			<option value="No2">2nd Auction - Nov 18, 2021</option>
			<option value="No2">3rd Auction - Nov 25, 2021</option>
		</select>
		<hr />
		<b>Auction Starts:</b>
		<br />
		{auctionStartDate} - <a href={`https://polkadot.subscan.io/block/${auctionStartBlock}`}>Block #{auctionStartBlock}</a>
		<hr />
		<b>Auction Ends:</b>
		<br />
		{auctionEndDate} - <a href={`https://polkadot.subscan.io/block/${auctionEndBlock}`}>Block #{auctionEndBlock}</a>
		<hr />
		<b>Bidding Ends:</b>
		<br />
		{biddingEndDate} - <a href={`https://polkadot.subscan.io/block/${biddingEndBlock}`}>Block #{biddingEndBlock}</a>
		<hr />
		<b>Winning parachain(s) onboarded:</b>
		<br />
		{onboardStart} for the period December {onboardStart} to {onboardEnd}
		<hr />
	</div>

function AuctionSchedule() {
	useEffect(() => {
		const title = document.title;
		if (title === "Parachain Slot Auctions · Polkadot Wiki") {
			// Set chain type
			chain = "polkadot"
			
			/*
			PSEUDO CODE

			// Get ending period for the given chain
			const endPeriod = consts.auctions.endingPeriod();
			
			// Add starting block for the given chain
			auctionBlocks.push(firstAuctionBlockDot);
			
			// Build auction objects with all required values for UI
			for (let i = 0; i < auctionCount; i++) {
				let auction = { };
				auction.startBlock = auctionBlocks[auctionBlocks.length - 1];
				const [leased, end ] = rpc.chain.getBlockHash(startBlock);
				auction.weeksLeased = lease;
				auction.endPeriodBlock = end;
				auction.biddingEndsBlock = auction.endPeriodBlock + endPeriod;

				// TODO: a conversion is still required here (currently only # of days not dates)
				auction.startDate = BlocksToDays(auction.startBlock);
				auction.endPeriodDate = BlocksToDays(auction.endPeriodBlock);
				auction.biddingEndsDate = BlocksToDays(auction.biddingEndsBlock);

				auction.startOnBoard = ??;
				auction.endOnBoard = auction.weeksLeased * 7 + auction.startOnBoard;

				// Calculate next starting block
				auction.nextStartingBlock = auction.biddingEndsBlock + 3600; // TODO: Get 3600 on-chain??
				auctionBlocks.push(nextStartingBlock);
				
				// Add auction to widget for visualization
				widgetData.push(auction);
			}
			*/

		} else if (title === "Parachain Slot Auctions · Guide") {
			chain = "kusama";
		} else {
			console.log("Unknown wiki/guide type");
		}
	}, []);

	if (chain !== undefined) {
		return (widget);
	} else {
		return (<div />)
	}
}

export default AuctionSchedule;