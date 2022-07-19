import { useState, useEffect, useRef } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';

/*
This component connects to an external web socket and renders the response data.
It can be used in Docusaurus markdown by adding the following lines anywhere within the file.

import Socket from "./../../components/Web-Socket-Sample"
<Socket network="polkadot" path="query.staking.validatorCount" defaultValue="150"/>
*/

function RPCFeed({ network, path, defaultValue, filters=[] }) {
	const [returnValue, setReturnValue] = useState('');

	useEffect(() => {
		// Set default as a fallback if anything fails
		setReturnValue(defaultValue);

		// Set socket connection
		let wsUrl = undefined;
		switch (network) {
			case "polkadot":
				wsUrl = "wss://rpc.polkadot.io";
				break;
			case "kusama":
				wsUrl = "wss://kusama-rpc.polkadot.io/";
				break;
			default:
				console.log(`Unknown network provided, ${net}`);
		}

		// Apply default value if network is not recognized
		if (wsUrl === undefined) {
			console.log("Failed to connect to a valid websocket, applying default");
		} else {
			// Otherwise attempt to connect
			const connect = async () => {
				await syncData(network, path, filters, setReturnValue);
			}
			try {
				connect();
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return (
		returnValue
	)
}

async function syncData(network, path, filters, setReturnValue) {
	let wsUrl = undefined;
	let chainValue = undefined;

	switch (network) {
		case "polkadot":
			wsUrl = "wss://rpc.polkadot.io";
			break;
		case "kusama":
			wsUrl = "wss://kusama-rpc.polkadot.io/";
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
			api = api[param];
		});

		// Process constants and queries based on parameters prefix
		switch (pathParameters[0]) {
			case "consts":
				chainValue = byString(instance, constant.path);
				break;
			case "query":
				chainValue = await api();
				chainValue = chainValue.toString();
				break;
			default:
				console.log(`Unknown path prefix (${pathParameters[0]}) in ${path}`);
		}

		// If no value was retrieved use default
		if (chainValue === undefined) {
			return;
		} else if (filters.length > 0) {
			// TODO apply filters
		}

		setReturnValue(chainValue);
	}
}

export default RPCFeed;