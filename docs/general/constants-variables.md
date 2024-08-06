---
id: constants-variables
title: Constants and Variables
sidebar_label: Constants and Variables
description: Constants and Variables.
keywords: [polkadot, kusama, constants, variables]
slug: ../constants-variables
---

<!-- prettier-ignore -->
import RPC from "./../../components/RPC-Connection"; import Tabs from "@theme/Tabs"; import TabItem
from "@theme/TabItem";

<Tabs groupId="clients" values={[ {label: 'Polkadot', value: 'polkadot'}, { label: 'Kusama', value:
'kusama'} ]}>

<TabItem value="polkadot">

## Treasury Spending Period

The spending period on Polkadot is currently
<RPC network="polkadot" path="consts.treasury.spendPeriod" defaultValue={345600} filter="blocksToDays"/>
days.

## Minimum Bond to Participate in Staking

The minimum bond to nominate on Polkadot is
<RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={2500000000000} filter="humanReadable"/>
while the minimum amount to join a pool is
<RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable"/>.

## Existential Deposit

The minimum number of tokens to keep an account alive on the blockchain is
<RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/>.

## Minimum Active Bond

The minimum amount of tokens to nominate is
<RPC network="polkadot" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/>.

</TabItem>
<TabItem value="kusama">

## Treasury Spending Period

The spending period on Polkadot is currently
<RPC network="kusama" path="consts.treasury.spendPeriod" defaultValue={86400} filter="blocksToDays"/>
days.

## Minimum Bond to Participate in Staking

The minimum bond to nominate on Polkadot is
<RPC network="kusama" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/>
while the minimum amount to join a pool is
<RPC network="kusama" path="query.nominationPools.minJoinBond" defaultValue={1667000000} filter="humanReadable"/>.

## Existential Deposit

The minimum number of tokens to keep an account alive on the blockchain is
<RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/>.

## Minimum Active Bond

The minimum amount of tokens to nominate is
<RPC network="kusama" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/>.

</TabItem>

</Tabs>
