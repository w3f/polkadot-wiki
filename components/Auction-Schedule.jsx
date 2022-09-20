import React, { useEffect, useState } from 'react';
import { PolkadotAuctions, KusamaAuctions } from './utilities/auctions';

// Drop-down auction selector options
let options = [];
let chain = undefined;

// Component that retrieves and displays on-chain auction data
function AuctionSchedule() {
	const [auctions, setAuctions] = useState("Loading Auctions...");

	useEffect(async () => {
		const title = document.title;
		// Polkadot
		if (title === "Parachain Slot Auctions · Polkadot Wiki") {
			chain = "Polkadot"
			LoadDefaults(PolkadotAuctions, setAuctions);
		} 
		// TODO - Kusama needs schema changes in JSX
		else if (title === "Parachain Slot Auctions · Guide") {
			chain = "Kusama"
			LoadDefaults(KusamaAuctions, setAuctions);
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

export default AuctionSchedule;