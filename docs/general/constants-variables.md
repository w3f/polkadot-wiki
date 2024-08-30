---
id: constants-variables
title: Constants and Variables
sidebar_label: Constants and Variables
description: Constants and Variables.
keywords: [polkadot, kusama, constants, variables]
slug: ../constants-variables
---

import RPC from "./../../components/RPC-Connection"; import Tabs from "@theme/Tabs"; import TabItem
from "@theme/TabItem";

<!-- prettier-ignore-start -->
<Tabs groupId="chains" values={[ {label: 'Polkadot', value: 'polkadot'}, { label: 'Kusama', value: 'kusama'}, {label: 'Polkadot Asset Hub', value: 'ahp'}, {label: 'Kusama Asset Hub', value: 'ahk'}, {label: 'Polkadot People', value: 'pp'}, {label: 'Kusama People', value: 'kp'} ]}>

<TabItem value="polkadot">

#### Active Validator Count

The number of Polkadot validators in the active set is <RPC network="polkadot" path="query.staking.validatorCount" defaultValue={297}/>.

#### Auction Ending Period

The auction ending period on Polkadot is <RPC network="polkadot" path="consts.auctions.endingPeriod" defaultValue={72000} filter="blocksToDays"/> days long.

#### Bounty Deposit

The deposit to submit a bounty on Polkadot is <RPC network="polkadot" path="consts.bounties.bountyDepositBase" defaultValue={10000000000} filter="humanReadable"/>.

#### Child Bounty Payout Delay

The waiting time before claiming a Polkadot child bounty reward is <RPC network="polkadot" path="consts.bounties.bountyDepositPayoutDelay" defaultValue={115200} filter="blocksToDays"/> days.

#### Existential Deposit

The minimum number of tokens to keep an account alive on the Polkadot Relay Chain is <RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/>.

#### Inactive Issuance

Polkadot's inactive issuance is <RPC network="polkadot" path="query.balances.inactiveIssuance" defaultValue="1784854324418488473" filter= "humanReadable"/> in the era <RPC network="polkadot" path="query.staking.currentEra" defaultValue="1200"/>.

#### Index Deposit

The deposit to reserve an index on Polkadot is <RPC network="polkadot" path="consts.indices.deposit" defaultValue={100000000000} filter="humanReadable"/>.

#### Minimum Active Bond

The minimum amount of tokens to nominate on Polkadot is <RPC network="polkadot" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/>.

#### Minimum Bond to Participate in Staking

The minimum bond to nominate on Polkadot is <RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={2500000000000} filter="humanReadable"/> while the minimum amount to join a pool is <RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable"/>.

#### Minimum Crowdloan contribution

The minimum amount to participate to a Polkadot crowdloan is <RPC network="polkadot" path="consts.crowdloan.minContribution" defaultValue={50000000000} filter="humanReadable"/>.

#### Multisig Deposit Base

The multisig deposit base on Polkadot is <RPC network="polkadot" path="consts.multisig.depositBase" defaultValue={200880000000} filter="humanReadable"/>.

#### Multisig Deposit Factor

The multisig deposit factor on Polkadot is <RPC network="polkadot" path="consts.multisig.depositFactor" defaultValue={320000000} filter="humanReadable"/>.

#### OpenGov Referendum Timeout

A Polkadot referendum is timeout for not submitting the Decision Deposit within <RPC network="polkadot" path="const.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> days since its creation.

#### OpenGov Submission Deposit

A deposit of <RPC network="polkadot" path="consts.referenda.submissionDeposit" defaultValue={10000000000} filter="humanReadable"/> is needed to submit a referendum on Polkadot.

#### Parachain ID Registration Deposit

Reserving a `ParaID` on Polkadot requires a deposit of <RPC network="polkadot" path="consts.registrar.paraDeposit" defaultValue={0} filter="humanReadable"/>.

#### Parachain Genesis State Registration Deposit

Registering the genesis state and WASM code of a Polkadot parachain requires a deposit <RPC network="polkadot" path="consts.registrar.dataDepositPerByte" defaultValue={0} filter="humanReadable"/> per byte.

#### Period per Slot Auction

The number of period per slot auction on Polkadot is <RPC network="polkadot" path="consts.auctions.leasePeriodsPerSlot" defaultValue={8}/>.

#### Total Issuance

Polkadot's total issuance is  <RPC network="polkadot" path="query.balances.totalIssuance" defaultValue="13557639805348170350" filter= "humanReadable"/> in the era <RPC network="polkadot" path="query.staking.currentEra" defaultValue="1200"/>.

#### Treasury Spending Period

The spending period on Polkadot is currently <RPC network="polkadot" path="consts.treasury.spendPeriod" defaultValue={345600} filter="blocksToDays"/> days.


</TabItem>
<TabItem value="kusama">


#### Active Validator Count

The number of Kusama validators in the active set is <RPC network="kusama" path="query.staking.validatorCount" defaultValue={297}/>.

#### Auction Ending Period

The auction ending period on Kusama is <RPC network="kusama" path="consts.auctions.endingPeriod" defaultValue={72000} filter="blocksToDays"/> days long.

#### Bounty Deposit

The deposit to submit a bounty on Kusama is <RPC network="kusama" path="consts.bounties.bountyDepositBase" defaultValue={33333333300} filter="humanReadable"/>.

#### Child Bounty Payout Delay

The waiting time before claiming a Kusama child bounty reward is <RPC network="kusama" path="consts.bounties.bountyDepositPayoutDelay" defaultValue={57600} filter="blocksToDays"/> days.

#### Existential Deposit

The minimum number of tokens to keep an account alive on the Kusama Relay Chain is <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/>.

#### Inactive Issuance

Kusama's inactive issuance is <RPC network="kusama" path="query.balances.inactiveIssuance" defaultValue="320302796457002024" filter= "humanReadable"/> in the era <RPC network="kusama" path="query.staking.currentEra" defaultValue="5649"/>.

#### Index Deposit

The deposit to reserve an index on Kusama is <RPC network="kusama" path="consts.indices.deposit" defaultValue={100000000000} filter="humanReadable"/>.

#### Minimum Active Bond

The minimum amount of tokens to nominate on Kusama is <RPC network="kusama" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/>.

#### Minimum Bond to Participate in Staking

The minimum bond to nominate on Kusama is <RPC network="kusama" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/> while the minimum amount to join a pool is <RPC network="kusama" path="query.nominationPools.minJoinBond" defaultValue={1667000000} filter="humanReadable"/>.

#### Minimum Crowdloan contribution

The minimum amount to participate to a Kusama crowdloan is <RPC network="kusama" path="consts.crowdloan.minContribution" defaultValue={100000000000} filter="humanReadable"/>.

#### Multisig Deposit Base

The multisig deposit base on Kusama is <RPC network="kusama" path="consts.multisig.depositBase" defaultValue={669599996400} filter="humanReadable"/>.

#### Multisig Deposit Factor

The multisig deposit factor on Kusama is <RPC network="kusama" path="consts.multisig.depositFactor" defaultValue={1066665600} filter="humanReadable"/>.

#### OpenGov Referendum Timeout

A Kusama referendum is timeout for not submitting the Decision Deposit within <RPC network="kusama" path="const.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> days since its creation.

#### OpenGov Submission Deposit

A deposit of <RPC network="kusama" path="consts.referenda.submissionDeposit" defaultValue={33333333333} filter="humanReadable"/> is needed to submit a referendum on Kusama.

#### Parachain ID Registration Deposit

Reserving a `ParaID` on Kusama requires a deposit of <RPC network="kusama" path="consts.registrar.paraDeposit" defaultValue={0} filter="humanReadable"/>.

#### Parachain Genesis State Registration Deposit

Registering the genesis state and WASM code of a Kusama parachain requires a deposit <RPC network="kusama" path="consts.registrar.dataDepositPerByte" defaultValue={0} filter="humanReadable"/> per byte.

#### Period per Slot Auction

The number of period per slot auction on Kusama is <RPC network="kusama" path="consts.auctions.leasePeriodsPerSlot" defaultValue={8}/>.

#### Total Issuance

Kusama's total issuance is  <RPC network="kusama" path="query.balances.totalIssuance" defaultValue="14017001595616667835" filter= "humanReadable"/> in the era <RPC network="kusama" path="query.staking.currentEra" defaultValue="5649"/>.

#### Treasury Spending Period

The spending period on Kusama is currently <RPC network="kusama" path="consts.treasury.spendPeriod" defaultValue={86400} filter="blocksToDays"/> days.

</TabItem>
<TabItem value="ahp">

#### Asset Deposit

To reserve an asset on the Polkadot Asset Hub you need a deposit of <RPC network="statemint" path="consts.assets.assetDeposit" defaultValue={100000000000} filter="humanReadable"/> and <RPC network="statemint" path="consts.assets.metadataDepositBase" defaultValue={668933304} filter="humanReadable"/> for the asset metadata.

#### Existential Deposit

The minimum number of tokens to keep an account alive on the Polkadot Asset Hub is <RPC network="statemint" path="consts.balances.existentialDeposit" defaultValue={100000000} filter="humanReadable"/>.

</TabItem>
<TabItem value="ahk">

#### Asset Deposit

To reserve an asset on the Kusama Asset Hub you need a deposit of <RPC network="statemine" path="consts.assets.assetDeposit" defaultValue={100000000000} filter="humanReadable"/> and <RPC network="statemine" path="consts.assets.metadataDepositBase" defaultValue={668933304} filter="humanReadable"/> for the asset metadata.

#### Existential Deposit

The minimum number of tokens to keep an account alive on the Kusama Asset Hub is <RPC network="statemine" path="consts.balances.existentialDeposit" defaultValue={1000000000} filter="humanReadable"/>.

</TabItem>
<TabItem value="pp">

#### Identity Deposit

The creation of a Polkadot identity required a deposit of <RPC network="polkadotpeople" path="consts.identity.basicDeposit" defaultValue={2001700000} filter="humanReadable"/>.

#### Sub-identity Deposit

The creation of a Polkadot sub-identity required a deposit of <RPC network="polkadotpeople" path="consts.identity.subAccountDeposit" defaultValue={2005300000} filter="humanReadable"/>.

</TabItem>
<TabItem value="kp">

#### Identity Deposit

The creation of a Polkadot identity required a deposit of <RPC network="kusamapeople" path="consts.identity.basicDeposit" defaultValue={6672333321} filter="humanReadable"/>.

#### Sub-identity Deposit

The creation of a Polkadot sub-identity required a deposit of <RPC network="kusamapeople" path="consts.identity.subAccountDeposit" defaultValue={6684333309} filter="humanReadable"/>.

</TabItem>

</Tabs>

<!-- prettier-ignore-end -->
