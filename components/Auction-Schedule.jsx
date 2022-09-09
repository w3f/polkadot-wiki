import React, { useEffect } from 'react';

let chain = undefined;

let auctionBlocks = [

]

let widget =
	<div>
		<select onChange={update} style={{ border: '2px solid #e6007a', height: '40px' }}>
			<option value="No1">1st Auction - Nov 11, 2021</option>
			<option value="No2">2nd Auction - Nov 18, 2021</option>
			<option value="No2">3rd Auction - Nov 25, 2021</option>
		</select>
		<hr />
		<b>Auction Starts:</b>
		<br />
		November 11, 2021 - <a href="https://polkadot.subscan.io/block/7658910">Block #7658910</a>
		<hr />
		<b>Auction Ends:</b>
		<br />
		November 13, 2021 - <a href="https://polkadot.subscan.io/block/7684110">Block #7684110</a>
		<hr />
		<b>Bidding Ends:</b>
		<br />
		November 18, 2021 - <a href="https://polkadot.subscan.io/block/77756110">Block #77756110</a>
		<hr />
		<b>Winning parachain(s) onboarded:</b>
		<br />
		December 17th, 2021 for the period December 17th, 2021 to October 20th, 2023
		<hr />
	</div>

function AuctionSchedule() {
	useEffect(() => {
		const title = document.title;
		if (title === "Parachain Slot Auctions · Polkadot Wiki") {
			chain = "polkadot"
			update();
		} else if (title === "Parachain Slot Auctions · Guide") {
			chain = "kusama";
			update();
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

/*
NOTES:
The entire widget can be calculated using the following operations
From a block number - given (first ever was 7658910)
Get the block hash - rpc.chain.getBlockHash(blockNumber)
Get the lease duration in weeks and ending period block - query.auctions.auctionInfo(blockHash)
Get the bidding end block - consts.auctions.endingPeriod() + ending period block
Estimate date/time based on current block number when page loads for all 3 blocks mentioned above

lease duration * 7 is the amount of days added to find on boarded final date
next auction starts 3600 blocks after previous end

blocks to days:
days = (blocks * 6) / 86400;
*/

function update() {
	console.log('run');
	if (chain === "polkadot") {
		// TODO - get Polkadot chain values
	} else if (chain === "kusama") {
		// TODO - get Kusama chain values
	}
}

export default AuctionSchedule;