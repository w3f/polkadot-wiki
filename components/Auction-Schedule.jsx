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
		// Set http link for indexer, as well as the explorer based on network
		const networkInfo = setHttpLinkAndExplorer(network);
		// The indexer utilizes a GraphQL Api
		const client = new ApolloClient({
			cache: new InMemoryCache(),
			link: ApolloLink.from([networkInfo.httpLink]),
		});
		const res = await client.query({
			query: AUCTIONS
		}).catch(e => handleAndRenderError(e, setAuctions));

		if (res !== undefined) {
			let height = res.data.squidStatus.height;
			let squidAuctions = res.data.auctions;
			// If the network has no auctions to report
			if (squidAuctions.length == 0) {
				setAuctions(<div>No auctions found on this network.</div>)
			} else {
				ChainState.BlockNumber = height;
				// Populate options from latest to oldest auction
				await LoadOptions(squidAuctions);
				// Get the initial index for the latest auction
				let id = squidAuctions.length - 1;
				// Render component with the auctions, starting from the latest
				Render(networkInfo.explorer, squidAuctions, setAuctions, id);
			}
		}
	}, []);

	// Render
	if (auctions !== undefined) {
		return auctions;
	}
	else {
		return (<div>Loading auction data...</div>)
	}
}

// This is meant to handle the case where there is an error fetching data from the indexer API
// The error is logged in the console.
function handleAndRenderError(e, setAuctions) {
	console.log("There was a problem fetching from with your query: ", e);
	setAuctions(
		<div>There was a problem with the query used to fetch auction data.
			If this issue persists, please submit an issue at the
			<a href="https://github.com/w3f/polkadot-wiki/" target="_blank"> Polkadot Wiki repository on Github</a>
		</div>)
}

// Sets initial network info for the component based on the network supplied
function setHttpLinkAndExplorer(network) {
	switch (network) {
		case supportedNetworks.POLKADOT:
			return {
				httpLink: new HttpLink({
					uri: "https://squid.subsquid.io/polkadot-wiki-squid/v/v1/graphql",
				}),
				explorer: "https://polkadot.subscan.io/block/"
			};
		case supportedNetworks.KUSAMA:
			return {
				httpLink: new HttpLink({
					uri: "https://squid.subsquid.io/kusama-guide-squid/v/v1/graphql",
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

// Re-renders component based on the selected information - used for the <select> element
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

	const auctionNumber = parseInt(index) + 1;

	let auctionsUrl = explorerUrl.startsWith("https://polkadot") ? "https://polkadot.subscan.io/auction/" : "https://kusama.subscan.io/auction/"
	const content = <div>
		<div><a target="_blank" href={`${auctionsUrl}${auctionNumber}`}>Auction #{auctionNumber} is {auctions[index].status}</a></div>
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
		<b>Ending Period Starts:</b>
		<br />
		{`${biddingStartsDate} - `}
		<a href={`${explorerUrl}${auctions[index].biddingStartBlock.height}`}>
			Block #{auctions[index].biddingStartBlock.height}
		</a>
		<hr />
		<b>Auction Ends:</b>
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