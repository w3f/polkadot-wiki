import React, { useEffect } from 'react';

let table =
	<div>
		<select style={{ border: '2px solid #e6007a', height: '40px'}}>
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
			updateTable("polkadot")
		} else if (title === "Parachain Slot Auctions · Guide") {
			updateTable("kusama");
		} else {
			console.log("Unknown wiki/guide type");
		}
	}, []);

	return (table);
}

function updateTable(network) {
	if (network === "polkadot") {
		// TODO - get Polkadot chain values
	} else if (network === "kusama") {
		// TODO - get Kusama chain values
	}
}

export default AuctionSchedule;