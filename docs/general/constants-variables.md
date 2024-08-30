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

:::info What to do with my DOT

- __<RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={10000000000} filter="humanReadable"/>:__
  the minimum balance required to have an active account on Polkadot Network. If your account
  balance drops below the minimum, your account will be reaped. Learn more about
  [Accounts](../learn/learn-accounts.md) and the
  [Existential Deposit](../learn/learn-accounts.md#existential-deposit-and-reaping) requirement.

- __<RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable"/>:__
  the minimum contribution required to join a [nomination pool](../learn/learn-nomination-pools.md)
  and earn staking rewards for contributing to the security of the network. Learn more about
  [nomination pools](../learn/learn-nomination-pools.md).

- __<RPC network="polkadot" path="consts.crowdloan.minContribution" defaultValue={50000000000} filter="humanReadable"/>:__
  the minimum contribution required to participate in [crowdloans](../learn/learn-crowdloans.md) for
  [parachain slot auctions](../learn/learn-auction.md).

- __<RPC network="polkadotpeople" path="consts.identity.basicDeposit" defaultValue={2001700000} filter="humanReadable"/>:__
    register an [on-chain identity](../learn/learn-identity.md)

- __<RPC network="polkadot" path="consts.proxy.proxyDepositBase" defaultValue={200080000000} filter="humanReadable"/>:__
    create a [proxy account](../learn/learn-proxies.md).

- __<RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={2500000000000} filter="humanReadable"/>:__
  the minimum stake required to submit your intent to directly nominate validators.
- __<RPC network="polkadot" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/>:__
  the minimum amount of DOT required to become an active nominator and earn rewards, i.e. the
  minimum active bond. To increase the chance of earning staking rewards, your stake should not be
  less than the minimum stake among the active nominators, which is a dynamic threshold. If you have
  lesser DOT than the minimum active nomination, please consider contributing to
  [nomination pools](../learn/learn-nomination-pools.md). Learn more about
  [becoming a nominator](../learn/learn-nominator.md).

- __<RPC network="polkadot" path="query.nominationPools.minCreateBond" defaultValue={5000000000000} filter="humanReadable"/>:__
  you can create your own [nomination pool](../learn/learn-nomination-pools.md).

:::

#### Active Validator Count

The number of Polkadot validators in the active set is <RPC network="polkadot" path="query.staking.validatorCount" defaultValue={297}/>.

#### Auction Ending Period

The auction ending period on Polkadot is <RPC network="polkadot" path="consts.auctions.endingPeriod" defaultValue={72000} filter="blocksToDays"/> days long.

#### Bounty Curator Deposit

On Polkadot, the bounty curator deposit is calculated by multiplying the curator fee by the bounty curator deposit multiplier set to <RPC network="polkadot" path="consts.bounties.curatorDepositMultiplier" defaultValue={500000} filter="permillToPercent"/>%. The deposit can range between a minimum of <RPC network="polkadot" path="consts.bounties.curatorDepositMin" defaultValue={100000000000} filter="humanReadable"/> and a maximum of <RPC network="polkadot" path="consts.bounties.curatorDepositMax" defaultValue={2000000000000} filter="humanReadable"/>.

#### Bounty Deposit

The deposit to submit a bounty on Polkadot is <RPC network="polkadot" path="consts.bounties.bountyDepositBase" defaultValue={10000000000} filter="humanReadable"/>.

#### Bounty Duration

A Polkadot bounty has a predetermined duration of <RPC network="polkadot" path="consts.bounties.bountyUpdatePeriod" defaultValue={1296000} filter="blocksToDays"/> days.

#### Child Bounty Payout Delay

The waiting time before claiming a Polkadot child bounty reward is <RPC network="polkadot" path="consts.bounties.bountyDepositPayoutDelay" defaultValue={115200} filter="blocksToDays"/> days.

#### Conviction Voting Lock Period

One conviction voting lock period on Polkadot equals <RPC network="polkadot" path="consts.convictionVoting.voteLockingPeriod" defaultValue={100800} filter="blocksToDays"/> days.

#### Existential Deposit

The minimum number of tokens to keep an account alive on the Polkadot Relay Chain is <RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/>.

#### Inactive Issuance

Polkadot's inactive issuance is <RPC network="polkadot" path="query.balances.inactiveIssuance" defaultValue="1784854324418488473" filter= "humanReadable"/> in the era <RPC network="polkadot" path="query.staking.currentEra" defaultValue="1200"/>.

#### Index Deposit

The deposit to reserve an index on Polkadot is <RPC network="polkadot" path="consts.indices.deposit" defaultValue={100000000000} filter="humanReadable"/>.

#### Maximum Number of Nominators

The maximum number of nominators on Polkadot is uncapped and currently sits at <RPC network="polkadot" path="query.staking.counterForNominators" defaultValue={50000}/>.

#### Maximum Number of Proxies per Account

The maximum number of proxies per Polkadot account is <RPC network="polkadot" path="consts.proxy.maxProxies" defaultValue={32}/>. You can have the same proxy for multiple accounts.

#### Maximum Votes per Nominator

A nominator on Polkadot can select up to <RPC network="polkadot" path="consts.electionProviderMultiPhase.minerMaxVotesPerVoter" defaultValue={16} /> validators.

#### Minimum Active Bond

The minimum amount of tokens to nominate on Polkadot is <RPC network="polkadot" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/>.

#### Minimum Bond to Create a Nomination Pool

The minimum bond to create a Polkadot nomination pool is <RPC network="polkadot" path="query.nominationPools.minCreateBond" defaultValue={5000000000000} filter="humanReadable" />.

#### Minimum Bond to Join a Nomination Pool

The minimum bond to join a Polkadot nomination pool is <RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable" />.

#### Minimum Bond to Participate in Staking

The minimum bond to nominate on Polkadot is <RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={2500000000000} filter="humanReadable"/> while the minimum amount to join a pool is <RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable"/>.

#### Minimum Crowdloan contribution

The minimum amount to participate to a Polkadot crowdloan is <RPC network="polkadot" path="consts.crowdloan.minContribution" defaultValue={50000000000} filter="humanReadable"/>.

#### Multisig Deposit Base

The multisig deposit base on Polkadot is <RPC network="polkadot" path="consts.multisig.depositBase" defaultValue={200880000000} filter="humanReadable"/>.

#### Multisig Deposit Factor

The multisig deposit factor on Polkadot is <RPC network="polkadot" path="consts.multisig.depositFactor" defaultValue={320000000} filter="humanReadable"/>.

#### Nomination Pool Max Commission

The maximum commission that can be set for a Polkadot nomination pool is <RPC network="polkadot" path="query.nominationPools.globalMaxCommission" defaultValue={100000000} filter="percentage"/>%.

#### Nomination Pool Members

There are currently <RPC network="polkadot" path="query.nominationPools.counterForPoolMembers" defaultValue={46378} /> members in <RPC network="polkadot" path="query.nominationPools.lastPoolId" defaultValue={285} /> Polkadot nomination pools. There is no limit to the number of pools or pool members per pool.

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

#### Proxy Deposits

The creation of proxies on Polkadot requires a **proxy deposit base** of <RPC network="polkadot" path="consts.proxy.proxyDepositBase" defaultValue={200080000000} filter="humanReadable"/> and a **proxy deposit factor** of <RPC network="polkadot" path="consts.proxy.proxyDepositFactor" defaultValue={330000000} filter="humanReadable"/> that is multiplied by the number of proxies under the same proxied account.

In case of time-delayed proxies, there is an **announcement deposit base** of <RPC network="polkadot" path="consts.proxy.announcementDepositBase" defaultValue={200080000000} filter="humanReadable"/> for announcing a call and an announcement deposit factor of <RPC network="polkadot" path="consts.proxy.announcementDepositFactor" defaultValue={660000000} filter="humanReadable"/> for each proxy call.

#### Total Issuance

Polkadot's total issuance is  <RPC network="polkadot" path="query.balances.totalIssuance" defaultValue="13557639805348170350" filter= "humanReadable"/> in the era <RPC network="polkadot" path="query.staking.currentEra" defaultValue="1200"/>.

#### Treasury Burn Factor

At the end of every spending period on Polkadot, <RPC network="polkadot" path="consts.treasury.burn" defaultValue={10000} filter="permillToPercent"/>% of the available funds are burned.

#### Treasury Spending Period

The spending period on Polkadot is currently <RPC network="polkadot" path="consts.treasury.spendPeriod" defaultValue={345600} filter="blocksToDays"/> days.

#### Unbonding Duration

The unbonding duration on Polkadot is set to <RPC network="polkadot" path="consts.staking.bondingDuration" defaultValue={28} filter="erasToDays"/> days.

</TabItem>
<TabItem value="kusama">

:::info What to do with my KSM

- __<RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333333333} filter="humanReadable"/>:__
  the minimum balance required to have an active account on Kusama Network. If your account balance
  drops below the minimum, your account will be reaped. Learn more about
  [Accounts](../learn/learn-accounts.md) and the
  [Existential Deposit](../learn/learn-accounts.md#existential-deposit-and-reaping) requirement.

- __<RPC network="kusama" path="query.nominationPools.minJoinBond" defaultValue={1666666650} filter="humanReadable"/>:__
  the minimum contribution required to join a
  [nomination pool](../learn/learn-nomination-pools.md) and earn staking rewards for contributing
  to the security of the network. Learn more about
  [nomination pools](../learn/learn-nomination-pools.md).

- __<RPC network="kusama" path="consts.crowdloan.minContribution" defaultValue={999999999000} filter="humanReadable"/>:__
  the minimum contribution required to participate in [crowdloans](../learn/learn-crowdloans.md)
  for [parachain slot auctions](../learn/learn-auction.md).

- __<RPC network="kusamapeople" path="consts.identity.basicDeposit" defaultValue={6672333321} filter="humanReadable"/>:__
  register an [on-chain identity](../learn/learn-identity.md)

- __<RPC network="kusama" path="consts.proxy.proxyDepositBase" defaultValue={666933332400} filter="humanReadable"/>:__
  create a [proxy account](../learn/learn-proxies.md).

- __<RPC network="kusama" path="query.nominationPools.minCreateBond" defaultValue={1000000000000} filter="humanReadable"/>:__
  you can create your own [nomination pool](../learn/learn-nomination-pools.md).

- __<RPC network="kusama" path="query.staking.minimumActiveStake" defaultValue={0} filter="humanReadable"/>:__
  the minimum amount of KSM required to become an active nominator and earn rewards.

:::

#### Active Validator Count

The number of Kusama validators in the active set is <RPC network="kusama" path="query.staking.validatorCount" defaultValue={297}/>.

#### Auction Ending Period

The auction ending period on Kusama is <RPC network="kusama" path="consts.auctions.endingPeriod" defaultValue={72000} filter="blocksToDays"/> days long.

#### Bounty Curator Deposit

On Kusama, the bounty curator deposit is calculated by multiplying the curator fee by the bounty curator deposit multiplier set to <RPC network="kusama" path="consts.bounties.curatorDepositMultiplier" defaultValue={500000} filter="permillToPercent"/>%. The deposit can range between a minimum of <RPC network="kusama" path="consts.bounties.curatorDepositMin" defaultValue={3333333330} filter="humanReadable"/> and a maximum of <RPC network="kusama" path="consts.bounties.curatorDepositMax" defaultValue={166666666500} filter="humanReadable"/>.

#### Bounty Deposit

The deposit to submit a bounty on Kusama is <RPC network="kusama" path="consts.bounties.bountyDepositBase" defaultValue={33333333300} filter="humanReadable"/>.

#### Bounty Duration

A Kusama bounty has a predetermined duration of <RPC network="kusama" path="consts.bounties.bountyUpdatePeriod" defaultValue={1296000} filter="blocksToDays"/> days.

#### Child Bounty Payout Delay

The waiting time before claiming a Kusama child bounty reward is <RPC network="kusama" path="consts.bounties.bountyDepositPayoutDelay" defaultValue={57600} filter="blocksToDays"/> days.

#### Conviction Voting Lock Period

One conviction voting lock period on Kusama equals <RPC network="kusama" path="consts.convictionVoting.voteLockingPeriod" defaultValue={100800} filter="blocksToDays"/> days.

#### Existential Deposit

The minimum number of tokens to keep an account alive on the Kusama Relay Chain is <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/>.

#### Inactive Issuance

Kusama's inactive issuance is <RPC network="kusama" path="query.balances.inactiveIssuance" defaultValue="320302796457002024" filter= "humanReadable"/> in the era <RPC network="kusama" path="query.staking.currentEra" defaultValue="5649"/>.

#### Index Deposit

The deposit to reserve an index on Kusama is <RPC network="kusama" path="consts.indices.deposit" defaultValue={100000000000} filter="humanReadable"/>.

#### Maximum Number of Nominators

The maximum number of nominators on Kusama is capped at <RPC network="kusama" path="query.staking.maxNominatorsCount" defaultValue={20000}/> and currently sits at <RPC network="kusama" path="query.staking.counterForNominators" defaultValue={50000}/>.

#### Maximum Number of Proxies per Account

The maximum number of proxies per Kusama account is <RPC network="kusama" path="consts.proxy.maxProxies" defaultValue={32}/>. You can have the same proxy for multiple accounts.

#### Maximum Votes per Nominator

A nominator on Kusama can select up to <RPC network="kusama" path="consts.electionProviderMultiPhase.minerMaxVotesPerVoter" defaultValue={24} /> validators.

#### Minimum Active Bond

The minimum amount of tokens to nominate on Kusama is <RPC network="kusama" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/>.

#### Minimum Bond to Create a Nomination Pool

The minimum bond to create a Kusama nomination pool is <RPC network="kusama" path="query.nominationPools.minCreateBond" defaultValue={1000000000000} filter="humanReadable" />.

#### Minimum Bond to Join a Nomination Pool

The minimum bond to join a Kusama nomination pool is <RPC network="kusama" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable" />.

#### Minimum Bond to Participate in Staking

The minimum bond to nominate on Kusama is <RPC network="kusama" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/> while the minimum amount to join a pool is <RPC network="kusama" path="query.nominationPools.minJoinBond" defaultValue={1667000000} filter="humanReadable"/>.

#### Minimum Crowdloan contribution

The minimum amount to participate to a Kusama crowdloan is <RPC network="kusama" path="consts.crowdloan.minContribution" defaultValue={100000000000} filter="humanReadable"/>.

#### Multisig Deposit Base

The multisig deposit base on Kusama is <RPC network="kusama" path="consts.multisig.depositBase" defaultValue={669599996400} filter="humanReadable"/>.

#### Multisig Deposit Factor

The multisig deposit factor on Kusama is <RPC network="kusama" path="consts.multisig.depositFactor" defaultValue={1066665600} filter="humanReadable"/>.

#### Nomination Pool Max Commission

The maximum commission that can be set for a Kusama nomination pool is <RPC network="kusama" path="query.nominationPools.globalMaxCommission" defaultValue={100000000} filter="percentage"/>%.

#### Nomination Pool Members

There are currently <RPC network="kusama" path="query.nominationPools.counterForPoolMembers" defaultValue={3433} /> members in <RPC network="kusama" path="query.nominationPools.lastPoolId" defaultValue={202} /> Kusama nomination pools. There is no limit to the number of pools or pool members per pool.

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

#### Proxy Deposits

The creation of proxies on Kusama requires a **proxy deposit base** of <RPC network="kusama" path="consts.proxy.proxyDepositBase" defaultValue={666933332400} filter="humanReadable"/> and a **proxy deposit factor** of <RPC network="kusama" path="consts.proxy.proxyDepositFactor" defaultValue={1099998900} filter="humanReadable"/> that is multiplied by the number of proxies under the same proxied account.

In case of time-delayed proxies, there is an **announcement deposit base** of <RPC network="kusama" path="consts.proxy.announcementDepositBase" defaultValue={666933332400} filter="humanReadable"/> for announcing a call and an announcement deposit factor of <RPC network="kusama" path="consts.proxy.announcementDepositFactor" defaultValue={2199997800} filter="humanReadable"/> for each proxy call.

#### Total Issuance

Kusama's total issuance is  <RPC network="kusama" path="query.balances.totalIssuance" defaultValue="14017001595616667835" filter= "humanReadable"/> in the era <RPC network="kusama" path="query.staking.currentEra" defaultValue="5649"/>.

#### Treasury Burn Factor

At the end of every spending period on Kusama, <RPC network="kusama" path="consts.treasury.burn" defaultValue={2000} filter="permillToPercent"/>% of the available funds are burned.

#### Treasury Spending Period

The spending period on Kusama is currently <RPC network="kusama" path="consts.treasury.spendPeriod" defaultValue={86400} filter="blocksToDays"/> days.

#### Unbonding Duration

The unbonding duration on Kusama is set to <RPC network="kusama" path="consts.staking.bondingDuration" defaultValue={28} filter="erasToDays"/> days.

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

The creation of a Polkadot identity required a deposit of <RPC network="polkadotpeople" path="consts.identity.basicDeposit" defaultValue={2001700000} filter="humanReadable"/> and <RPC network="polkadotpeople" path="consts.identity.byteDeposit" defaultValue={100000} filter="humanReadable"/> (per byte) per each field beyond the legal name.

#### Sub-identity Deposit

The creation of a Polkadot sub-identity required a deposit of <RPC network="polkadotpeople" path="consts.identity.subAccountDeposit" defaultValue={2005300000} filter="humanReadable"/>.

</TabItem>
<TabItem value="kp">

#### Identity Deposit

The creation of a Polkadot identity required a deposit of <RPC network="kusamapeople" path="consts.identity.basicDeposit" defaultValue={6672333321} filter="humanReadable"/> and <RPC network="kusamapeople" path="consts.identity.byteDeposit" defaultValue={333333} filter="humanReadable"/> (per byte) per each field beyond the legal name.

#### Sub-identity Deposit

The creation of a Polkadot sub-identity required a deposit of <RPC network="kusamapeople" path="consts.identity.subAccountDeposit" defaultValue={6684333309} filter="humanReadable"/>.

</TabItem>

</Tabs>

<!-- prettier-ignore-end -->
