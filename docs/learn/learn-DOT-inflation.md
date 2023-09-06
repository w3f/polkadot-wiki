---
id: learn-DOT-inflation
title: DOT Inflation
sidebar_label: DOT Inflation
description: Tokenomics of Polkadot's Native Token DOT.
keywords: [token, DOT, inflation]
slug: ../learn-DOT-inflation
---

import RPC from "./../../components/RPC-Connection";

{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} is an inflationary token. On the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network, inflation is
{{ polkadot: [set to be 10% annually](https://github.com/paritytech/polkadot/blob/756ccc35e93d1a78e3c71a0e67ae4da5f1d09f69/runtime/polkadot/src/lib.rs#L576), :polkadot }}
{{ kusama: [set to be 10% annually](https://github.com/paritytech/polkadot/blob/756ccc35e93d1a78e3c71a0e67ae4da5f1d09f69/runtime/kusama/src/lib.rs#L535), :kusama }}
which is distributed as staking rewards based on the amount staked vs. ideal staking rate, and the remainder goes to the treasury.

:::info

DOT went through [redenomination](./learn-redenomination.md) in 2020 that saw the DOT token supply
increase by 100 times.

The current token supply on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is
{{ polkadot: <RPC network="polkadot" path="query.balances.totalIssuance" defaultValue={12230666300429914781} filter="humanReadable"/> (Over 1.2 Billion DOT). :polkadot }}
{{ kusama: <RPC network="kusama" path="query.balances.totalIssuance" defaultValue={12619256191792480093} filter="humanReadable"/> (Over 12 Million KSM). :kusama }}

:::

It is essential to understand that the primary objective of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} inflation is to incentivize network participants through Nominated Proof of Staking (NPoS) and to grow
the network through funding the on-chain treasury. There is an opportunity cost of keeping the {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} tokens idle with the current inflation model as the tokens get diluted over time. Economics and game theory suggest that setting an ideal inflation rate is essential for incentivizing the network participants as well as the growth of the network, and any deviation from it can have negative effects.  Reducing the inflation rate could limit growth while
increasing the inflation rate could break the incentive model of the token. Hence,
**token inflation rate is not a forever fixed value, and inflation can be updated in the future through [on-chain governance](./learn-polkadot-opengov.md)** based on thorough tokenomics research.


## Inflation Model

The chart below shows the inflation model of the network. Depending on the number of staked tokens,
the distribution of the inflation to validators and nominators versus the treasury will change
dynamically to provide incentives to participate (or not participate) in staking.

There is a [dynamic _ideal staking rate_](#ideal-staking-rate) (in the figure set to 0.5 or 50%)
that the network tries to maintain. The goal is to have the _system staking rate_ meet the _ideal
staking rate_. The system staking rate would be the total amount staked over the total token supply,
where the total amount staked is the stake of all validators and nominators on the network. The
ideal staking rate accounts for having sufficient backing of {{ polkadot: DOT :polkadot }}
{{ kusama: KSM :kusama }} to prevent the possible compromise of security while keeping the native
token liquid.

![staking](../assets/NPoS/staking-rate-with-parachains.png)

<p style={{textAlign:"center"}}>Source: <a href="https://w3f-research.readthedocs.io/en/latest/polkadot/overview/2-token-economics.html">Research - Web3 Foundation</a></p>

- **x-axis**: Proportion of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} staked
- **y-axis**: Inflation, annualized percentage
- **Blue line**: Annual inflation rate of NPoS, i.e. total amount of tokens minted to pay validators
  and nominators.
- **Green line**: Annual rewards rate for stakers. For instance, 0.2 corresponds to 20% of annual
  returns on the staked tokens. You can determine the current annual staking rewards rate by looking
  at the top bar of the staking overview on
  [Polkadot-JS UI](https://polkadot.js.org/apps/#/staking).

Assuming that the ideal staking rate is 50%, all of the inflation would go to the validators and
nominators if 50% of all {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} are staked. Any
deviation from the 50% - positive or negative - sends the proportional remainder to the treasury.
Deviation from the ideal staking rate are referred to as _staking inefficiencies_. Thus, the
treasury does not currently receive a substantial inflow of funds at the ideal staking rate. See
[this page](./learn-polkadot-opengov-treasury.md) for more information about treasury inflow
sources.

For those who are interested in knowing more about the design of the inflation model for the
network, please see [here](https://research.web3.foundation/Polkadot/overview/token-economics).

## Ideal Staking Rate

The ideal staking rate can vary between 45% to 75% based on the number of parachains that acquired a
lease through an auction (this excludes the System parachains), based on the implementation
[here](https://github.com/paritytech/polkadot-sdk/blob/cd901764a52edc04a6d22bea3a526def593ab2a7/polkadot/runtime/common/src/impls.rs#L80).

Briefly, the ideal staking rate can be calculated as follows:

`0.75 - auction_proportion`

where `auction_proportion` is obtained by computing `min(auctioned_slots, 60) / 200`. The
`auctioned_slots` are all the auctioned slots without the slots for system parachains.

Assuming there are 48 filled slots, of which three are dedicated to system parachains (Asset Hub,
Bridge Hub and Collectives), there are 45 auctioned slots. The `auction_proportion` is thus
`45 / 200 = 0.225`. The ideal staking rate is `0.75 - 0.225 = 0.525`.

If the amount of tokens staked goes below 52.5%, then staking rewards for nominators increase,
incentivizing them to stake more tokens on the network. On the contrary, staking rewards drop if
staked tokens exceed the ideal staking rate. This results from the change in the percentage of
staking rewards that go to the Treasury.
