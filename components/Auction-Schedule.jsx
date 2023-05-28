import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';
import { AUCTIONS, supportedNetworks } from './utilities/auctionVariables';

let ChainState = {
	BlockNumber: undefined,
}

let Options = [];

// Component for displaying auction data
function AuctionSchedule({ network }) {
	const [auctions, setAuctions] = useState("Loading Auctions...");
	useEffect(async () => {

		const networkInfo = setHttpLinkAndExplorer(network);
		const client = new ApolloClient({
			cache: new InMemoryCache(),
			link: ApolloLink.from([networkInfo.httpLink]),
		});

		const res = await client.query({
			query: AUCTIONS
		});

		let height = res.data.squidStatus.height;
		ChainState.BlockNumber = height;
		let squidAuctions = res.data.auctions;
		await LoadOptions(squidAuctions);
		let id = parseInt(squidAuctions[squidAuctions.length - 1].id) - 1;
		Render(networkInfo.explorer, squidAuctions, setAuctions, id);
	}, []);

	// Render
	if (auctions !== undefined) {
		return auctions;
	} else {
		return (<div>Loading auction data...</div>)
	}
}

function setHttpLinkAndExplorer(network) {
	switch (network) {
		case supportedNetworks.POLKADOT:
			return {
				httpLink: new HttpLink({
					uri: "http://localhost:4350/graphql",
				}),
				explorer: "https://polkadot.subscan.io/block/"
			};
		case supportedNetworks.KUSAMA:
			return {
				httpLink: new HttpLink({
					uri: "http://localhost:4350/graphql",
				}),
				explorer: "https://kusama.subscan.io/block/"
			};
	}
}

// Loads drop-down selections
async function LoadOptions(auctions) {
	auctions.map((a) => parseInt(a.id)).reverse().forEach((id) => {
		const option = <option value={id} key={id}>{`Auction #${id}`}</option>
		Options.push(option);
	})
}


function switchAuctions(chain, auctions, setAuctions, e) {
	Render(chain, auctions, setAuctions, parseInt(e.target.value) - 1)
}

// Update JSX
function Render(explorerUrl, auctions, setAuctions, index) {
	// Current block information
	let currentBlockNumber = ChainState.BlockNumber;

	const onboardStartDate = new Date(parseInt(auctions[index].onboardStartBlock.timestamp)).toDateString();
	const onboardEndDate = new Date(parseInt(auctions[index].onboardEndBlock.timestamp)).toDateString();
	const biddingStartsDate = new Date(parseInt(auctions[index].biddingStartBlock.timestamp)).toDateString();
	const biddingEndsDate = new Date(parseInt(auctions[index].biddingEndsBlock.timestamp)).toDateString();

	// On-boarding range
	let onboarding = <div>
		{`${onboardStartDate} - `}
		<a href={`${explorerUrl}${auctions[index].onboardStartBlock.height}`}>
			Block #{auctions[index].onboardStartBlock.height}
		</a>
		{` to `}
		{`${onboardEndDate} - `}
		<a href={`${explorerUrl}${auctions[index].onboardEndBlock.height}`}>
			Block #{auctions[index].onboardEndBlock.height}
		</a>
	</div>

	const content = <div>
		<div>Auction #{parseInt(index) + 1} is {auctions[index].status}</div>
		<br />
		<select
			id="AuctionSelector"
			onChange={(e) => switchAuctions(explorerUrl, auctions, setAuctions, e)}
			style={{ border: '2px solid #e6007a', height: '40px' }}
		>
			{Options.map((option) => (option))}
		</select>
		<hr />
		<b>Auction Starts:</b>
		<br />
		{`${new Date(parseInt(auctions[index].startBlock.timestamp)).toDateString()} - `}
		<a href={`${explorerUrl}${auctions[index].startBlock.height}`}>
			Block #{auctions[index].startBlock.height}
		</a>
		<hr />
		<b>Bidding Starts:</b>
		<br />
		{`${biddingStartsDate} - `}
		<a href={`${explorerUrl}${auctions[index].biddingStartBlock.height}`}>
			Block #{auctions[index].biddingStartBlock.height}
		</a>
		<hr />
		<b>Bidding Ends:</b>
		<br />
		{`${biddingEndsDate} - `}
		<a href={`${explorerUrl}${auctions[index].biddingEndsBlock.height}`}>
			Block #{auctions[index].biddingEndsBlock.height}
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