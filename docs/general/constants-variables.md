---
id: constants-variables
title: Constants and Variables
sidebar_label: Constants and Variables
description: Constants and Variables.
keywords: [polkadot, kusama, constants, variables]
slug: ../constants-variables
---

import RPC from "./../../components/RPC-Connection";

## Treasury Spending Period

The spending period on Polkadot is currently
{{ polkadot: <RPC network="polkadot" path="consts.treasury.spendPeriod" defaultValue={345600} filter="blocksToDays"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.treasury.spendPeriod" defaultValue={86400} filter="blocksToDays"/> :kusama }}
days.

## Minimum Bond to Participate in Staking

The minimum bond to nominate on Polkadot is
{{ polkadot: <RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={2500000000000} filter="humanReadable"/> :polkadot }}{{ kusama: <RPC network="kusama" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/> :kusama }}
while the minimum amount to join a pool is
{{ polkadot: <RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable"/> :polkadot }}{{ kusama: <RPC network="kusama" path="query.nominationPools.minJoinBond" defaultValue={1667000000} filter="humanReadable"/> :kusama }}.

## Existential Deposit

The minimum number of tokens to keep an account alive on the blockchain is
{{ polkadot: <RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/> :kusama }}.

## Minimum Active Bond

The minimum amount of tokens to nominate is
{{ polkadot: <RPC network="polkadot" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/> :polkadot }}{{ kusama: <RPC network="kusama" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/> :kusama }}.
