import { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

/*
This component connects to the Polkadot/Kusama APIs and renders the response data.
It can be used in Docusaurus markdown by adding the following lines anywhere within the file.

import RPC from "./../../components/RPC-Connection"
<RPC network="polkadot" path="query.staking.validatorCount" defaultValue="150"/>
*/

const Polkadot = "polkadot";
const Kusama = "kusama";
const Statemine = "statemine";
const Statemint = "statemint";

function RPC({ network, path, defaultValue, filter=undefined }) {
	const [returnValue, setReturnValue] = useState('');

	useEffect(() => {
		// Set default as a fallback if anything fails
		if(filter !== undefined) {
			// Apply filter to default value to match formatting of RPC result
			applyFilter(defaultValue.toString(), filter, network, setReturnValue)
		} else {
			setReturnValue(defaultValue.toString());
		}

		// Set socket connection
		let wsUrl = undefined;
		switch (network) {
			case Polkadot:
				wsUrl = "wss://rpc.polkadot.io";
				break;
			case Kusama:
				wsUrl = "wss://kusama-rpc.polkadot.io/";
				break;
			case Statemine:
				wsUrl = "wss://statemine-rpc.polkadot.io/";
				break;
			case Statemint:
				wsUrl = "wss://statemint-rpc.polkadot.io/";
				break;
			default:
				console.log(`Unknown network provided, ${net}`);
		}

		// Apply default value if network is not recognized
		if (wsUrl === undefined) {
			console.log("Failed to connect to a valid websocket, applying default");
		} else {
			// Otherwise attempt to connect to RPC
			const connect = async () => {
				const newValue = await syncData(network, path, setReturnValue);
				if (newValue === undefined) {
					return; // default
				} else if(filter !== undefined) {
					// Apply filter to retrieved value if a filter is provided
					applyFilter(newValue, filter, network, setReturnValue)
				} else {
					setReturnValue(newValue);
				}
			}
			try {
				connect();
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return (returnValue)
}

async function syncData(network, path, setReturnValue) {
	let wsUrl = undefined;
	let chainValue = undefined;

	switch (network) {
		case "polkadot":
			wsUrl = "wss://rpc.polkadot.io";
			break;
		case "kusama":
			wsUrl = "wss://kusama-rpc.polkadot.io/";
			break;
		case "statemine":
			wsUrl = "wss://statemine-rpc.polkadot.io/";
			break;
		case "statemint":
			wsUrl = "wss://statemint-rpc.polkadot.io/";
			break;
		default:
			console.log("Unknown socket url provided, no connection made.");
	}

	// If no valid socket url is provided
	if (wsUrl === undefined) {
		return;
	} else {
		// Connect
		const wsProvider = new WsProvider(wsUrl);
		let api = await ApiPromise.create({ provider: wsProvider });

		// Build API call
		const pathParameters = path.split(".");
		pathParameters.forEach(param => {
			if(param in api){
				api = api[param];
			}
		});

		// Process constants and queries based on parameters prefix
		switch (pathParameters[0]) {
			case "consts":
				chainValue = api.toString();
				break;
			case "query":
				chainValue = await api();
				chainValue = chainValue.toString();
				break;
			default:
				console.log(`Unknown path prefix (${pathParameters[0]}) in ${path}`);
		}

		return chainValue;
	}
}

function applyFilter(value, filter, network, setReturnValue) {
	//console.log(`Applying ${filter} to ${network} value ${value}`);
	const values = {
		polkadot: {
      		precision: 1e10,
      		symbol: "DOT",
    	},
    	kusama: {
      		precision: 1e12,
      		symbol: "KSM",
    	},
		statemint: {
			precision: 1e10,
			symbol: "DOT",
	  	},
		statemine: {
			precision: 1e12,
			symbol: "KSM",
	  	},
  	};

	switch (filter) {
		case "humanReadable":
      		let decimals = undefined;
      		if (network === Polkadot || network === Statemint) {
        		decimals = 3;
      		} else if (network === Kusama || network === Statemine) {
				decimals = 6;
			} else {
				console.log("Unknown network type found when attempting to apply 'Human Readable' filter");
				return;
			}
			// String to number
			value = parseFloat(value);
			// Apply precision
			if (Number.isInteger(value / values[network].precision)) {
				value = `${value / values[network].precision} ${values[network].symbol}`;
			} else {
				value = `${(value / values[network].precision).toFixed(decimals)} ${values[network].symbol}`;
			}
    		break;
		case "blocksToDays":
			value = (value * 6) / 86400;
			break;
		default:
			console.log("Ignoring unknown filter type");
			return;
	}

	setReturnValue(value.toString());
}

export default RPC;