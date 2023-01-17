import React from "react";
import { render, act, screen, waitFor, fail } from "@testing-library/react";
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
	'consts.system.blockHashCount',
	'consts.balances.existentialDeposit',
	'query.staking.validatorCount',
	'consts.staking.maxNominatorRewardedPerValidator',
	'consts.identity.basicDeposit',
	'query.staking.currentEra',
	'consts.phragmenElection.votingBondBase',
	'query.staking.minNominatorBond',
	'consts.staking.maxNominations',
	'consts.democracy.votingPeriod',
	'consts.crowdloan.minContribution',
	'query.nominationPools.minJoinBond',
	'consts.auctions.endingPeriod',
	'consts.democracy.enactmentPeriod',
	'consts.electionProviderMultiPhase.signedMaxSubmissions',
	'query.multisig.depositBase',
	'consts.proxy.maxProxies',
	'query.nomiationPools.minJoinBond',
	'consts.democracy.voteLockingPeriod',
	'consts.assets.assetDeposit',
	'consts.treasury.spendPeriod',
	'consts.electionProviderMultiPhase.maxElectingVoters'
]

for (let i = 0; i < paths.length; i++) {
	test(`RPC Path Test: ${paths[i]}`, async () => {
		let chainValue = undefined;
		
		try {
			const wsUrl = "wss://kusama-rpc.polkadot.io/";
			const wsProvider = new WsProvider(wsUrl);
			let api = await ApiPromise.create({ provider: wsProvider });

			// Build API call
			const pathParameters = paths[i].split(".");
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
					fail(`Unknown path prefix (${pathParameters[0]}) in ${paths[i]}`);
			}
		} catch (error) {
			console.log(error);
		}

		if (chainValue === undefined) {
			fail(`Undefined value returned from ${paths[i]}`);
		}
	});
}