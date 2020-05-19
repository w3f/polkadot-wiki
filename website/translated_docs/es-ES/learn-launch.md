---
id: learn-launch
title: Polkadot Launch Timeline
sidebar_label: Polkadot Launch Timeline
description: An explanation of Polkadot's launch process and its individual phases
---

The Polkadot network will have a phased roll-out plan, with important milestones toward decentralization marking each phase. Up until the final phase, the chain will be considered a _chain candidate_ (CC), and not fully launched. During the CC phase, the chain may reset and change dramatically due to critical bugs, important changes in the code, or other circumstances.

## The PoA Launch

A PoA (Proof of Authority) chain is a permissioned type of blockchain in which a set of pre-approved entities produce blocks. There is no game theory or [incentivization](learn-staking), no competition between the authority nodes and no [randomness](learn-randomness). The authorities take turns in producing blocks for the chain. During this phase, the Web3 Foundation will be managing all six authorities.

Even though there will be no community-run [validators](maintain-validator) securing the network at this point, potential validators can start joining the network and signaling their intention to participate in [consensus](learn-consensus).

No other functionality will be enabled. It will not be possible to transfer tokens, register [identities](learn-identity), create [democracy](maintain-guides-democracy) or [treasury](learn-treasury) proposals, lease [parachain](learn-parachains) slots, or send [cross-chain messages](learn-crosschain).

## PoA to NPoS

Once Web3 Foundation is confident in the stability of the network and there are a sufficient number of validator intentions, Web3 Foundation will use [Sudo](https://youtu.be/InekMjJpVdo) - a superuser account with access to [governance](learn-governance) functions - to initiate the first validator election. This election will transition the network from PoA into its second phase, [Nominated Proof of Stake (NPoS)](learn-staking), where the network is [secured by the economic stake](learn-security) that is bonded to the validators by the [nominators](maintain-nominator) and the validators themselves.

Time-wise, the transition to Proof-of-Stake will largely depend on when a sufficient number of validators have registered and are ready to take over the security of the network. This number can be as low as 50 but probably closer to 100, as it was with [Kusama](https://kusama.network).

## Sudo to Governance

After the chain has been running well with a sufficiently large validator set, the [Sudo](https://youtu.be/InekMjJpVdo) key will enable the suite of governance modules in Polkadot; namely, the modules to enable a [Council](learn-governance#council), a [Technical Committee](learn-governance#technical-committee), and [public referenda](learn-governance#public-referenda). Once a Council and governance tools are in place, the public has the avenues to effect changes in the system.

From this point, the network is entirely in the hands of the token holders and no longer under control of any centralized authority. Without Sudo, the chain will no longer be a candidate (CC) and will be a live, decentralized network.

This period will last approximately three months: ~28 days to table the proposal and turn it into a referendum, if seconded enough. ~28 days to vote on the proposal, and ~28 more days as the enactment delay.

## Balances

To enable balance transfers, the community will have to come together and [make a public proposal](maintain-guides-democracy) which would then turn into a referendum. Once the referendum is voted in, there will be an enactment period after which the change will automatically come into effect.

This entire period will also last approximately three months: ~28 days to table the proposal and turn it into a referendum, if seconded enough. ~28 days to vote on the proposal, and ~28 more days as the enactment delay.

## Core Functionality

For other core functionality to be enabled, the community will follow the same process. A proposal, then voting on a referendum, then an enactment delay. The time periods remain the same.

The core functionality does not have to be unlocked sequentially - several features can be unlocked with a single proposal. However, increasing the maximum number of validators will also require a public referendum, and given that only a [single referendum can be tabled at any one time](learn-governance#council-referenda), the timeline may stretch based on community priorities and preferences.
