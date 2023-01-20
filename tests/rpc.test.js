import React from "react";
import { render, screen, waitFor, fail } from "@testing-library/react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import "@testing-library/jest-dom";
import RPC from "../components/RPC-Connection";

test("Retrieves and applies a 'const' RPC value", async () => {
	render(<RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={0} />);
	await waitFor(() => expect(screen.getByText("10000000000")).toBeInTheDocument(), { timeout: 5000 });
});

test("Retrieves and applies a 'query' RPC value", async () => {
	render(<RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={0} filter="humanReadable" />);
	await waitFor(() => expect(screen.getByText("100 DOT")).toBeInTheDocument(), { timeout: 5000 });
});

test("RPC falls back to default", async () => {
	render(<RPC network="polkadot" path="BAD.PATH" defaultValue={150} />);
	await waitFor(() => expect(screen.getByText("150")).toBeInTheDocument(), { timeout: 5000 });
});

test("Human readable filter with integer value", async () => {
	render(<RPC network="polkadot" path="BAD.PATH" defaultValue={50000000000} filter="humanReadable" />);
	await waitFor(() => expect(screen.getByText("5 DOT")).toBeInTheDocument(), { timeout: 5000 });
});

test("Human readable filter with float value", async () => {
	render(<RPC network="polkadot" path="BAD.PATH" defaultValue={202580000000} filter="humanReadable" />);
	await waitFor(() => expect(screen.getByText("20.258 DOT")).toBeInTheDocument(), { timeout: 5000 });
});

// Test all active RPC paths in individual tests
const paths = [
	// Add new RPC paths here for testing coverage
	{ path: 'consts.system.blockHashCount', network: 'kusama' },
	{ path: 'consts.balances.existentialDeposit', network: 'kusama' },
	{ path: 'query.staking.validatorCount', network: 'kusama' },
	{ path: 'consts.staking.maxNominatorRewardedPerValidator', network: 'kusama' },
	{ path: 'consts.identity.basicDeposit', network: 'kusama' },
	{ path: 'query.staking.currentEra', network: 'kusama' },
	{ path: 'consts.phragmenElection.votingBondBase', network: 'kusama' },
	{ path: 'query.staking.minNominatorBond', network: 'kusama' },
	{ path: 'consts.staking.maxNominations', network: 'kusama' },
	{ path: 'consts.democracy.votingPeriod', network: 'kusama' },
	{ path: 'consts.crowdloan.minContribution', network: 'kusama' },
	{ path: 'query.nominationPools.minJoinBond', network: 'kusama' },
	{ path: 'consts.auctions.endingPeriod', network: 'kusama' },
	{ path: 'consts.democracy.enactmentPeriod', network: 'kusama' },
	{ path: 'consts.electionProviderMultiPhase.signedMaxSubmissions', network: 'kusama' },
	{ path: 'consts.multisig.depositBase', network: 'kusama' },
	{ path: 'consts.proxy.maxProxies', network: 'kusama' },
	{ path: 'query.nominationPools.minJoinBond', network: 'kusama' },
	{ path: 'consts.democracy.voteLockingPeriod', network: 'kusama' },
	{ path: 'consts.treasury.spendPeriod', network: 'kusama' },
	{ path: 'consts.electionProviderMultiPhase.maxElectingVoters', network: 'kusama' },
	{ path: 'query.staking.chillThreshold', network: 'kusama' },
	{ path: 'query.nominationPools.counterForPoolMembers', network: 'kusama' },
	{ path: 'query.nominationPools.lastPoolId', network: 'kusama' },
	{ path: 'query.nominationPools.maxPoolMembers', network: 'kusama' },
	{ path: 'query.nominationPools.maxPools', network: 'kusama' },
	{ path: 'query.nominationPools.maxPoolMembersPerPool', network: 'kusama' },
	{ path: 'query.nominationPools.minJoinBond', network: 'kusama' },
	{ path: 'consts.assets.assetDeposit', network: 'statemint' },
]

jest.setTimeout(10000);

for (let i = 0; i < paths.length; i++) {
	test(`RPC Path Test: ${paths[i].path}`, async () => {
		let chainValue = undefined;

		try {
			let wsUrl = undefined;
			switch (paths[i].network) {
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
					fail("Unknown network provided, no connection made.");
			}

			const wsProvider = new WsProvider(wsUrl);
			let api = await ApiPromise.create({ provider: wsProvider });

			// Build API call
			const pathParameters = paths[i].path.split(".");
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
					fail(`Unknown path prefix (${pathParameters[0]}) in ${paths[i].path}`);
			}
		} catch (error) {
			console.log(error);
		}

		console.log(`${paths[i].path} on-chain value: ${chainValue}`);

		if (chainValue === undefined) {
			fail(`Undefined value returned from ${paths[i].path}`);
		}
	});
}