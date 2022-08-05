import React, { useState, useEffect } from 'react';
/*
This component is specific to Voluntary Locking.
Unfortunately, React components cannot be inserted in certain markdown elements.
If attempted they will just appear as a raw string instead of a rendered element.
To get around this limitation, this component returns the entire formatted table.
It can be used in Docusaurus markdown by adding the following lines anywhere within the file.

import VoluntaryLocking from "./../../components/VoluntaryLocking"
<VoluntaryLocking network="polkadot"/>
*/

let table = <table>
	<tbody>
		<tr>
			<th>Lock Periods</th>
			<th>Vote Multiplier</th>
			<th>Length in Days</th>
		</tr>
		<tr>
			<td>0</td>
			<td>0.1</td>
			<td id="p0"></td>
		</tr>
		<tr>
			<td>1</td>
			<td>1</td>
			<td  id="p1"></td>
		</tr>
		<tr>
			<td>2</td>
			<td>2</td>
			<td id="p2"></td>
		</tr>
		<tr>
			<td>4</td>
			<td>3</td>
			<td id="p4"></td>
		</tr>
		<tr>
			<td>8</td>
			<td>4</td>
			<td id="p8"></td>
		</tr>
		<tr>
			<td>16</td>
			<td>5</td>
			<td id="p16"></td>
		</tr>
		<tr>
			<td>32</td>
			<td>6</td>
			<td id="p32"></td>
		</tr>
	</tbody>
</table>

const lockPeriods = ["p0", "p1", "p2", "p4", "p8", "p16", "p32"]

const dotLocking = {
	p0: 0,
	p1: 28,
	p2: 56,
	p4: 112,
	p8: 224,
	p16: 448,
	p32: 896
}

const ksmLocking = {
	p0: 0,
	p1: 8,
	p2: 16,
	p4: 32,
	p8: 64,
	p16: 128,
	p32: 256
}

function VoluntaryLocking({network}) { 
	const [docType, setDocType] = useState("");

	useEffect(() => {
    // This is a hack to get the document type.
		// It is required because the standard {{ polkadot/kusama: :polkadot/kusama}}
		// can't be used to render a table (can't put a <table> in a <p>).
		// So, we use the same component for Polkadot and Kusama and figure it out here.
  	const title = document.title;
		if (title === "Governance · Polkadot Wiki") {
			updateTable("polkadot")
		} else if (title === "Governance · Guide") {
			updateTable("kusama");
		} else {
			console.log("Unknown wiki/guide type");
		}
    }, []);

	return (table);
}

function updateTable(network) {
	lockPeriods.forEach(id => {
		let el = document.getElementById(id);
		if (network === "polkadot") {
			el.innerText = dotLocking[id];
		} else if (network === "kusama") {
			el.innerText = ksmLocking[id];
		}
	});
}

export default VoluntaryLocking;