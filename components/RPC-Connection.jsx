import { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { HumanReadable, BlocksToDays} from "./utilities/filters";

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
	network = network.toLowerCase();

	useEffect(() => {
		// Set default as a fallback if anything fails
		if (filter !== undefined) {
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
				console.log(`Unknown network provided, ${network}`);
		}

		// Apply default value if network is not recognized
		if (wsUrl === undefined) {
			console.log("Failed to connect to a valid websocket, applying default");
		} else {
			// Otherwise attempt to connect to RPC
			const connect = async () => {
				const newValue = await syncData(network, path, setReturnValue);
				if (newValue === undefined) {
					 // There was an issue with the request, use default
					return;
				} else if (filter !== undefined) {
					// Apply filter to retrieved value if a filter is provided
					applyFilter(newValue, filter, network, setReturnValue)
				} else {
					// Apply value as-is
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

// Fetch chain data
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
			if (param in api){
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

// Post-processing functions
function applyFilter(value, filter, network, setReturnValue) {
	switch (filter) {
		case "humanReadable":
			HumanReadable(value, network, setReturnValue)
    	break;
		case "blocksToDays":
			BlocksToDays(value, setReturnValue);
			break;
		default:
			console.log("Ignoring unknown filter type");
			return;
	}
}

export default RPC;