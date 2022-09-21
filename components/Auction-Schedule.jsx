import React, { useEffect, useState } from 'react';
import { PolkadotAuctions, KusamaAuctions } from './utilities/auctions';

// Component for displaying auction data
function AuctionSchedule() {
	const [auctions, setAuctions] = useState("Loading Auctions...");

	useEffect(async () => {
		const title = document.title;
		let chain = undefined;
		if (title === "Parachain Slot Auctions · Polkadot Wiki") {
			chain = "Polkadot"
			LoadDefaults(chain, PolkadotAuctions, setAuctions);
		}
		else if (title === "Parachain Slot Auctions · Guide") {
			chain = "Kusama"
			LoadDefaults(chain, KusamaAuctions, setAuctions, chain);
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

// Loads hard-coded auction default values
function LoadDefaults(chain, auctions, setAuctions) {
	let options = [];
	for (let i = 0; i < auctions.length; i++) {
		const option = <option value={i} key={i}>{auctions[i].option}</option>
		options.push(option);
	}
	Update(chain, options, auctions, setAuctions, { target: { value: 0 } });
}

// Update JSX
function Update(chain, options, auctions, setAuctions, event) {
	const index = event.target.value;
	let content = <div>Failed to load auction data...</div>

	// TODO - this should be the same for both chains, however the original tool
	// only provided limited hard-coded data for Kusama
	if (chain === "Polkadot") {
		content = <div>
			<select id="AuctionSelector" onChange={(e) => Update(chain, options, auctions, setAuctions, e)} style={{ border: '2px solid #e6007a', height: '40px' }}>
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
	} else if (chain === "Kusama") {
		content = <div>
			<select id="AuctionSelector" onChange={(e) => Update(chain, options, auctions, setAuctions, e)} style={{ border: '2px solid #e6007a', height: '40px' }}>
				{options.map((option) => (option))}
			</select>
			<hr />
			<b>Auction Starts:</b>
			<br />
			<a href={`https://kusama.subscan.io/block/${auctions[index].startBlock.substring(1)}`}>
				Block {auctions[index].startBlock}
			</a>
			<hr />
			<b>Bidding Ends:</b>
			<br />
			<a href={`https://kusama.subscan.io/block/${auctions[index].biddingEndsBlock.substring(1)}`}>
				Block {auctions[index].biddingEndsBlock}
			</a>
			<hr />
		</div>
	}

	// Re-render
	setAuctions(content);
}

export default AuctionSchedule;