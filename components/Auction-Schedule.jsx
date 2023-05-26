import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, gql } from '@apollo/client/core';

let ChainState = {
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
		}
		else if (title === "Parachain Slot Auctions · Guide") {
			const chain = "Kusama";

			const httpLink = new HttpLink({
				uri: "http://localhost:4350/graphql",
			});

			const AUCTIONS = gql`
				query AUCTION {
					squidStatus {
						height
					}
					auctions {
						biddingEndsBlock
						endPeriodBlock
						id
						onboardEndBlock
						onboardStartBlock
						startBlock
					}
					}`;

			const client = new ApolloClient({
				cache: new InMemoryCache(),
				link: ApolloLink.from([httpLink]),
			});


			const res = await client.query({
				query: AUCTIONS
			  });

			let height = res.data.squidStatus.height;
			ChainState.BlockNumber = height;
			let squidAuctions = res.data.auctions;
			await LoadOptions(squidAuctions);
			let id = parseInt(squidAuctions[squidAuctions.length-1].id) - 1;
			Render(chain, squidAuctions, setAuctions, id);
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
async function LoadOptions(auctions) {
	for (let i = 0; i < auctions.length; i++) {
		const option = <option value={i} key={i}>{`Auction #${auctions[i].id}`}</option>
		Options.push(option);
	}
}

// Estimate a future blocks date based on 6 second block times
function EstimateBlockDate(date, currentBlock, estimatedBlock) {
	const blockDifference = estimatedBlock - currentBlock;
	const seconds = blockDifference * 6;
	const dateCopy = new Date(date.valueOf())
	dateCopy.setSeconds(dateCopy.getSeconds() + seconds);
	return dateCopy.toDateString();
}


function switchAuctions(chain, auctions, setAuctions, e) {
	Render(chain, auctions, setAuctions, e.target.value)
}

// Update JSX
function Render(chain, auctions, setAuctions, index) {
	let explorerUrl = undefined;
	if (chain === "Polkadot") {
		explorerUrl = "https://polkadot.subscan.io/block/";
	} else if (chain === "Kusama") {
		explorerUrl = "https://kusama.subscan.io/block/";
	}
	// // Current block information
	let currentBlockNumber = ChainState.BlockNumber;
	// let currentBlockDate = ChainState.BlockDate;
	// if (currentBlockNumber !== undefined) {
	// 	currentBlockDate = currentBlockDate.toDateString();
	// } else {
	// 	currentBlockNumber = null;
	// 	currentBlockDate = "Connecting...";
	// }

	const onboardStartDate = auctions[index].onboardStartBlock;
	const onboardEndDate= auctions[index].onboardEndBlock;

	// On-boarding range
	let onboarding = <div>
		{`${onboardStartDate} - `}
		<a href={`${explorerUrl}${auctions[index].onboardStartBlock}`}>
			Block #{auctions[index].onboardStartBlock}
		</a>
		{` to `}
		{`${onboardEndDate} - `}
		<a href={`${explorerUrl}${auctions[index].onboardEndBlock}`}>
			Block #{auctions[index].onboardEndBlock}
		</a>
	</div>
	// If onboarding is too far in the future to calculate
	if (auctions[index]["onboardStartBlock"] === null || auctions[index]["onboardEndBlock"] === null) {
		onboarding = <div>
			On-boarding cannot yet be determined for this future event.
		</div>
	}
	
	let active = 'Complete';
	if (ChainState.BlockNumber < auctions[index].endPeriodBlock) {
		active = 'Ongoing';
	}

	const content = <div>
		<div>Auction #{parseInt(index) + 1} is {active}</div>
		<br />
		<select
			id="AuctionSelector"
			defaultValue={ChainState.AuctionIndex}
			onChange={(e) => switchAuctions(chain, auctions, setAuctions, e)}
			style={{ border: '2px solid #e6007a', height: '40px' }}
		>
			{Options.map((option) => (option))}
		</select>
		<hr />
		<b>Auction Starts:</b>
		<br />
		{/* {`${auctions[index].startDate} - `} */}
		<a href={`${explorerUrl}${auctions[index].startBlock}`}>
			Block #{auctions[index].startBlock}
		</a>
		<hr />
		<b>Bidding Starts:</b>
		<br />
		{/* {`${auctions[index].endPeriodDate} - `} */}
		<a href={`${explorerUrl}${auctions[index].endPeriodBlock}`}>
			Block #{auctions[index].endPeriodBlock}
		</a>
		<hr />
		<b>Bidding Ends:</b>
		<br />
		{/* {`${auctions[index].biddingEndsDate} - `} */}
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

export default AuctionSchedule;