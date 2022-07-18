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
		let wssUrl = undefined;
		switch (network) {
			case "polkadot":
				wssUrl = "wss://rpc.polkadot.io";
				break;
			case "kusama":
				wssUrl = "wss://kusama-rpc.polkadot.io/";
				break;
			default:
				console.log(`Unknown network provided, ${net}`);
		}

		// Apply default value if network is not recognized
		if (wssUrl === undefined) {
			console.log("Failed to connect to a valid websocket, applying default");
		} else {
			// Otherwise attempt to connect
			const connect = async () => {
				await getData(network, path, defaultValue, filters, setReturnValue);
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

async function getData(network, path, defaultValue, filters, setReturnValue) {
	let wssUrl = undefined;
	let chainValue = undefined;

	switch (network) {
		case "polkadot":
			wssUrl = "wss://rpc.polkadot.io";
			break;
		case "kusama":
			wssUrl = "wss://kusama-rpc.polkadot.io/";
			break;
		default:
			console.log("Unknown socket url provided, no connection made.");
	}

	// If no valid socket url is provided
	if (wssUrl === undefined) {
		return;
	} else {
		// Connect
		const wsProvider = new WsProvider(wssUrl);
		let api = await ApiPromise.create({ provider: wsProvider });

		// Build API call
		const prefix = path.substring(0, path.indexOf('.'));
		const pathParameters = path.split(".");
		pathParameters.forEach(param => {
			api = api[param];
		});

		// Process constants and queries
		switch (prefix) {
			case "consts":
				chainValue = byString(instance, constant.path);
				break;
			case "query":
				chainValue = await api();
				chainValue = chainValue.toString();
				break;
			default:
				console.log(`Unknown path prefix (${prefix}) in ${path}`);
		}

		// If no value was retrieved use default
		if (chainValue === undefined) {
			console.log(chainValue);
			chainValue = defaultValue;
		} else if (filters.length > 0) {
			// TODO apply filters
		}

		setReturnValue(chainValue);
	}
}

export default RPCFeed;