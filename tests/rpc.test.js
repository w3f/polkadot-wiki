import React from "react";
import { render, act, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RPC from "../components/RPC-Connection";
import { ApiPromise, WsProvider } from "@polkadot/api";

// Set max test duration before failing
jest.setTimeout(120000); // 2 min

test("Retrieves and applies RPC value", async () => {
	
	
	const { container, debug } = render(<RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue="0" />);
	await act(async () => {
		await waitFor(async () => {
			let validationError = await screen.findByText("10000000000");
			console.log(validationError);
			//expect(validationError).toBeInTheDocument();
		}, {timeout:6000});
	})
	debug();
});

test("RPC falls back to default", () => {
	const { container } = render(<RPC network="polkadot" path="BAD.PATH" defaultValue="150" />);
	const content = container.firstChild.textContent;
	expect(content).toEqual("150");
});

test("Human readable filter with integer value", () => {
	const { container } = render(<RPC network="polkadot" path="BAD.PATH" defaultValue={50000000000} filter="humanReadable" />);
	const content = container.firstChild.textContent;
	expect(content).toEqual("5 DOT");
});

test("Human readable filter with float value", () => {
	const { container } = render(<RPC network="polkadot" path="BAD.PATH" defaultValue={202580000000} filter="humanReadable" />);
	const content = container.firstChild.textContent;
	expect(content).toEqual("20.258 DOT");
});

test("All leveraged RPC paths are valid", async () => {
	const paths = [
		// Polkadot & Kusama
		{ networks: ["polkadot", "kusama"], path: "query.staking.validatorCount" },
		{ networks: ["polkadot", "kusama"], path: "consts.staking.maxNominatorRewardedPerValidator" },
		{ networks: ["polkadot", "kusama"], path: "consts.identity.basicDeposit" },
		{ networks: ["polkadot", "kusama"], path: "consts.identity.subAccountDeposit" },
		{ networks: ["polkadot", "kusama"], path: "consts.balances.existentialDeposit" },
		{ networks: ["polkadot", "kusama"], path: "consts.identity.basicDeposit" },
		{ networks: ["polkadot", "kusama"], path: "consts.crowdloan.minContribution" },
		{ networks: ["polkadot", "kusama"], path: "consts.staking.maxNominations" },
		{ networks: ["polkadot", "kusama"], path: "consts.democracy.voteLockingPeriod" },
		{ networks: ["polkadot", "kusama"], path: "consts.identity.fieldDeposit" },
		{ networks: ["polkadot", "kusama"], path: "consts.electionProviderMultiPhase.maxElectingVoters" },
		{ networks: ["polkadot", "kusama"], path: "query.staking.maxNominatorsCount" },
		{ networks: ["polkadot", "kusama"], path: "consts.proxy.proxyDepositBase" },
		{ networks: ["polkadot", "kusama"], path: "consts.proxy.proxyDepositFactor" },
		{ networks: ["polkadot", "kusama"], path: "query.staking.minNominatorBond" },
		{ networks: ["polkadot", "kusama"], path: "query.staking.maxNominatorsCount" },
		{ networks: ["polkadot", "kusama"], path: "consts.treasury.spendPeriod" },
		{ networks: ["polkadot", "kusama"], path: "consts.treasury.proposalBondMinimum" },
		{ networks: ["polkadot", "kusama"], path: "consts.treasury.proposalBondMaximum" },
		{ networks: ["polkadot", "kusama"], path: "consts.tips.tipReportDepositBase" },
		{ networks: ["polkadot", "kusama"], path: "consts.tips.tipFindersFee" },
		// Statemine & Statemint
		{ networks: ["statemine", "statemint"], path: "consts.assets.assetDeposit" },
		{ networks: ["statemine", "statemint"], path: "consts.assets.metadataDepositBase" },
	]

	let attemptedConnections = 0;
	let successfulResponses = 0;

	for (let i = 0; i < paths.length; i++) {
		const testObject = paths[i];
		for (let j = 0; j < testObject.networks.length; j++) {
			attemptedConnections += 1;
			let chainValue = undefined;
			try {
				const network = testObject.networks[j];
				const path = testObject.path;
				let wsUrl = undefined;

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
						fail("Unknown socket url provided, no connection made.");

				}

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
						chainValue = api.toString();
						break;
					case "query":
						chainValue = await api();
						chainValue = chainValue.toString();
						break;
					default:
						fail(`Unknown path prefix (${pathParameters[0]}) in ${path}`);
				}
			} catch (error) {
				console.log(error);
			}

			// TODO - check chain value before marking successful response
			if(chainValue !== undefined) { successfulResponses += 1; }
		}
	}

	// All RPC paths should return valid responses
	expect(attemptedConnections === successfulResponses).toEqual(true);
});