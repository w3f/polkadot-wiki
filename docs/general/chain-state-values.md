---
id: chain-state-values
title: Chain State Values
sidebar_label: Chain State
description:
  Chain constants and storage values that can be queried from the live network nodes of Polkadot,
  Kusama and their system chains.
keywords: [polkadot, kusama, constants, storage, values]
slug: ../chain-state-values
---

import RPC from "./../../components/RPC-Connection"; import Tabs from "@theme/Tabs"; import TabItem
from "@theme/TabItem";

<!-- prettier-ignore-start -->
<Tabs groupId="chains" values={[ {label: 'Polkadot', value: 'polkadot'}, { label: 'Kusama', value: 'kusama'}, {label: 'Polkadot Asset Hub', value: 'ahp'}, {label: 'Kusama Asset Hub', value: 'ahk'}, {label: 'Polkadot People', value: 'pp'}, {label: 'Kusama People', value: 'kp'} ]}>

<TabItem value="polkadot">

:::info What to do with DOT

- __<RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={10000000000} filter="humanReadable"/>:__
  the minimum balance required to have an active account on Polkadot Network. If your account
  balance drops below the minimum, your account will be reaped. Learn more about
  [Accounts](../learn/learn-accounts.md) and the
  [Existential Deposit](../learn/learn-accounts.md#existential-deposit-and-reaping) requirement.

- __<RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable"/>:__
  the minimum contribution required to join a [nomination pool](../learn/learn-nomination-pools.md)
  and earn staking rewards for contributing to the security of the network. Learn more about
  [nomination pools](../learn/learn-nomination-pools.md).

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

#### Block Hash Count

On Polkadot, the maximum number of block hashes retained on-chain at any given time is <RPC network="polkadot" path="consts.system.blockHashCount" defaultValue={4096}/> (which maps to seven hours given 6-second block times).

#### Bounty Curator Deposit

On Polkadot, the bounty curator deposit is calculated by multiplying the curator fee by the bounty curator deposit multiplier set to <RPC network="polkadot" path="consts.bounties.curatorDepositMultiplier" defaultValue={500000} filter="permillToPercent"/>%. The deposit can range between a minimum of <RPC network="polkadot" path="consts.bounties.curatorDepositMin" defaultValue={100000000000} filter="humanReadable"/> and a maximum of <RPC network="polkadot" path="consts.bounties.curatorDepositMax" defaultValue={2000000000000} filter="humanReadable"/>.

#### Bounty Deposit

The deposit to submit a bounty on Polkadot is <RPC network="polkadot" path="consts.bounties.bountyDepositBase" defaultValue={10000000000} filter="humanReadable"/>.

#### Bounty Duration

A Polkadot bounty has a predetermined duration of <RPC network="polkadot" path="consts.bounties.bountyUpdatePeriod" defaultValue={1296000} filter="blocksToDays"/> days.

#### Conviction Voting Lock Period

One conviction voting lock period on Polkadot equals <RPC network="polkadot" path="consts.convictionVoting.voteLockingPeriod" defaultValue={100800} filter="blocksToDays"/> days.

#### Existential Deposit

The minimum number of tokens to keep an account alive on the Polkadot relay chain is <RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/>.

#### Inactive Issuance

Polkadot's inactive issuance is <RPC network="polkadot" path="query.balances.inactiveIssuance" defaultValue="20115636146084858300" filter= "humanReadable"/> in the era <RPC network="polkadot" path="query.staking.currentEra" defaultValue="1553"/>.

#### Index Deposit

The deposit to reserve an index on Polkadot is <RPC network="polkadot" path="consts.indices.deposit" defaultValue={100000000000} filter="humanReadable"/>.

#### Maximum Number of Nominators

The maximum number of nominators on Polkadot is uncapped and the current value is <RPC network="polkadot" path="query.staking.counterForNominators" defaultValue={36793}/>.

#### Maximum Number of Proxies per Account

The maximum number of proxies per Polkadot account is <RPC network="polkadot" path="consts.proxy.maxProxies" defaultValue={32}/>. You can have the same proxy for multiple accounts.

#### Maximum Votes per Nominator

A nominator on Polkadot can select up to <RPC network="polkadot" path="consts.electionProviderMultiPhase.minerMaxVotesPerVoter" defaultValue={16} /> validators.

#### Minimum Active Bond

The minimum amount of tokens to nominate on Polkadot is <RPC network="polkadot" path="query.staking.minimumActiveStake" defaultValue={5521439075539} filter="humanReadable"/>.

#### Minimum Bond to Create a Nomination Pool

The minimum bond to create a Polkadot nomination pool is <RPC network="polkadot" path="query.nominationPools.minCreateBond" defaultValue={5000000000000} filter="humanReadable" />.

#### Minimum Bond to Join a Nomination Pool

The minimum bond to join a Polkadot nomination pool is <RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable" />.

#### Minimum Bond to Participate in Staking

The minimum bond to nominate on Polkadot is <RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={2500000000000} filter="humanReadable"/> while the minimum amount to join a pool is <RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable"/>.

#### Minimum Crowdloan contribution

The minimum amount to participate to a Polkadot crowdloan is <RPC network="polkadot" path="consts.crowdloan.minContribution" defaultValue={50000000000} filter="humanReadable"/>.

#### Minimum Validator Bond

To start a validator instance on Polkadot, the
minimum bond required is <RPC network="polkadot" path="query.staking.minValidatorBond" defaultValue="0" filter= "humanReadable"/>.

#### Minimum Validator Commission

The minimum commission a Polkadot Validator can set is <RPC network="polkadot" path="query.staking.minCommission" filter = "percentage" defaultValue="0"/>%. [This does not guarantee entry into the active set and earning rewards](../maintain/maintain-guides-how-to-validate-polkadot.md#how-many-dot-do-i-need-to-become-an-active-validator).

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

Reserving a `ParaID` on Polkadot requires a deposit of <RPC network="polkadot" path="consts.registrar.paraDeposit" defaultValue={1000000000000} filter="humanReadable"/>.

#### Parachain Genesis State Registration Deposit

Registering the genesis state and WASM code of a Polkadot parachain requires a deposit <RPC network="polkadot" path="consts.registrar.dataDepositPerByte" defaultValue={10000000} filter="humanReadable"/> per byte.

#### Proxy Deposits

The creation of proxies on Polkadot requires a **proxy deposit base** of <RPC network="polkadot" path="consts.proxy.proxyDepositBase" defaultValue={200080000000} filter="humanReadable"/> and a **proxy deposit factor** of <RPC network="polkadot" path="consts.proxy.proxyDepositFactor" defaultValue={330000000} filter="humanReadable"/> that is multiplied by the number of proxies under the same proxied account.

In case of time-delayed proxies, there is an **announcement deposit base** of <RPC network="polkadot" path="consts.proxy.announcementDepositBase" defaultValue={200080000000} filter="humanReadable"/> for announcing a call and an **announcement deposit factor** of <RPC network="polkadot" path="consts.proxy.announcementDepositFactor" defaultValue={660000000} filter="humanReadable"/> for each proxy call.

#### Staking Miner Deposit and Reward

Staking miners on Polkadot are required to reserve a deposit to submit their solutions. The the deposit is the sum of a **signed deposit base** of <RPC network="polkadot" path="consts.electionProviderMultiPhase.signedDepositBase" defaultValue={400000000000} filter="humanReadable"/>, a **signed deposit per byte** of  <RPC network="polkadot" path="consts.electionProviderMultiPhase.signedDepositByte" defaultValue={97656} filter="precise"/> (a solution weighing 200KB would yield 200 x 0.0000097656 = 0.00195312 DOT), and a **signed deposit weight** set to 0.

The **signed reward base** on Polkadot is <RPC network="polkadot" path="consts.electionProviderMultiPhase.signedRewardBase" defaultValue={10000000000} filter="humanReadable"/> which is a fixed amount.

#### Staking Miner Max Submissions

The maximum number of submission for a staking miner on Polkadot is <RPC network="polkadot" path="consts.electionProviderMultiPhase.signedMaxSubmissions" defaultValue={16}/>.

#### Staking Reward Retention

Polkadot staking rewards are kept available for 84 eras. The following calculation can be used to
approximate this length in days:

`84 eras` × `24 hours in a single era` ÷ `24 hours in a day` = `84 days`

#### Total Issuance

Polkadot's total issuance is  <RPC network="polkadot" path="query.balances.totalIssuance" defaultValue="14883815224560918110" filter= "humanReadable"/> in the era <RPC network="polkadot" path="query.staking.currentEra" defaultValue="1553"/>.

#### Treasury Burn Factor

At the end of every spending period on Polkadot, <RPC network="polkadot" path="consts.treasury.burn" defaultValue={10000} filter="permillToPercent"/>% of the available funds are burned.

#### Treasury Spending Period

The spending period on Polkadot is currently <RPC network="polkadot" path="consts.treasury.spendPeriod" defaultValue={345600} filter="blocksToDays"/> days.

#### Unbonding Duration

The unbonding duration on Polkadot is set to <RPC network="polkadot" path="consts.staking.bondingDuration" defaultValue={28} filter="erasToDays"/> days. This is
calculated by taking the **bonding duration** (in eras), multiplying it by the **length of a single
era** (in hours), and dividing by the **hours in a day** (24). Example: 28 × 24 ÷ 24 = 28 days.

</TabItem>
<TabItem value="kusama">

:::info What to do with KSM

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

#### Block Hash Count

On Kusama, the maximum block number to block hash mappings to keep is <RPC network="kusama" path="consts.system.blockHashCount" defaultValue={4096}/> (which maps to seven hours given 6-second block times).

#### Bounty Curator Deposit

On Kusama, the bounty curator deposit is calculated by multiplying the curator fee by the bounty curator deposit multiplier set to <RPC network="kusama" path="consts.bounties.curatorDepositMultiplier" defaultValue={500000} filter="permillToPercent"/>%. The deposit can range between a minimum of <RPC network="kusama" path="consts.bounties.curatorDepositMin" defaultValue={3333333330} filter="humanReadable"/> and a maximum of <RPC network="kusama" path="consts.bounties.curatorDepositMax" defaultValue={166666666500} filter="humanReadable"/>.

#### Bounty Deposit

The deposit to submit a bounty on Kusama is <RPC network="kusama" path="consts.bounties.bountyDepositBase" defaultValue={33333333300} filter="humanReadable"/>.

#### Bounty Duration

A Kusama bounty has a predetermined duration of <RPC network="kusama" path="consts.bounties.bountyUpdatePeriod" defaultValue={1296000} filter="blocksToDays"/> days.

#### Conviction Voting Lock Period

One conviction voting lock period on Kusama equals <RPC network="kusama" path="consts.convictionVoting.voteLockingPeriod" defaultValue={100800} filter="blocksToDays"/> days.

#### Existential Deposit

The minimum number of tokens to keep an account alive on the Kusama relay chain is <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/>.

#### Inactive Issuance

Kusama's inactive issuance is <RPC network="kusama" path="query.balances.inactiveIssuance" defaultValue="288091772937830827" filter= "humanReadable"/> in the era <RPC network="kusama" path="query.staking.currentEra" defaultValue="7061"/>.

#### Index Deposit

The deposit to reserve an index on Kusama is <RPC network="kusama" path="consts.indices.deposit" defaultValue={100000000000} filter="humanReadable"/>.

#### Maximum Number of Nominators

The maximum number of nominators on Kusama is capped at <RPC network="kusama" path="query.staking.maxNominatorsCount" defaultValue={20000}/> and currently sits at <RPC network="kusama" path="query.staking.counterForNominators" defaultValue={15560}/>.

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

#### Minimum Validator Bond

To start a validator instance on Kusama, the
minimum bond required is <RPC network="kusama" path="query.staking.minValidatorBond" defaultValue="0" filter= "humanReadable"/>.

#### Minimum Validator Commission

The minimum commission a Kusama Validator can set is <RPC network="kusama" path="query.staking.minCommission" filter = "percentage" defaultValue="10"/>%.

#### Multisig Deposit Base

The multisig deposit base on Kusama is <RPC network="kusama" path="consts.multisig.depositBase" defaultValue={669599996400} filter="humanReadable"/>.

#### Multisig Deposit Factor

The multisig deposit factor on Kusama is <RPC network="kusama" path="consts.multisig.depositFactor" defaultValue={1066665600} filter="humanReadable"/>.

#### Nomination Pool Max Commission

The maximum commission that can be set for a Kusama nomination pool is <RPC network="kusama" path="query.nominationPools.globalMaxCommission" defaultValue={100000000} filter="percentage"/>%.

#### Nomination Pool Members

There are currently <RPC network="kusama" path="query.nominationPools.counterForPoolMembers" defaultValue={3442} /> members in <RPC network="kusama" path="query.nominationPools.lastPoolId" defaultValue={202} /> Kusama nomination pools. There is no limit to the number of pools or pool members per pool.

#### OpenGov Referendum Timeout

A Kusama referendum is timeout for not submitting the Decision Deposit within <RPC network="kusama" path="const.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> days since its creation.

#### OpenGov Submission Deposit

A deposit of <RPC network="kusama" path="consts.referenda.submissionDeposit" defaultValue={33333333333} filter="humanReadable"/> is needed to submit a referendum on Kusama.

#### Parachain ID Registration Deposit

Reserving a `ParaID` on Kusama requires a deposit of <RPC network="kusama" path="consts.registrar.paraDeposit" defaultValue={40000000000000} filter="humanReadable"/>.

#### Parachain Genesis State Registration Deposit

Registering the genesis state and WASM code of a Kusama parachain requires a deposit <RPC network="kusama" path="consts.registrar.dataDepositPerByte" defaultValue={333333333} filter="humanReadable"/> per byte.

#### Proxy Deposits

The creation of proxies on Kusama requires a **proxy deposit base** of <RPC network="kusama" path="consts.proxy.proxyDepositBase" defaultValue={666933332400} filter="humanReadable"/> and a **proxy deposit factor** of <RPC network="kusama" path="consts.proxy.proxyDepositFactor" defaultValue={1099998900} filter="humanReadable"/> that is multiplied by the number of proxies under the same proxied account.

In case of time-delayed proxies, there is an **announcement deposit base** of <RPC network="kusama" path="consts.proxy.announcementDepositBase" defaultValue={666933332400} filter="humanReadable"/> for announcing a call and an **announcement deposit factor** of <RPC network="kusama" path="consts.proxy.announcementDepositFactor" defaultValue={2199997800} filter="humanReadable"/> for each proxy call.

#### Staking Miner Deposit and Reward

Staking miners on Kusama are required to reserve a deposit to submit their solutions. The the deposit is the sum of a **signed deposit base** of <RPC network="kusama" path="consts.electionProviderMultiPhase.signedDepositBase" defaultValue={133333332000} filter="humanReadable"/>, a **signed deposit per byte** of  <RPC network="kusama" path="consts.electionProviderMultiPhase.signedDepositByte" defaultValue={32551} filter="precise"/> (a solution weighing 200KB would yield 200 x 0.00000032551 = 0.000065102 KSM), and a **signed deposit weight** set to 0 and has no effect.

The **signed reward base** on Kusama is <RPC network="kusama" path="consts.electionProviderMultiPhase.signedRewardBase" defaultValue={100000000000} filter="humanReadable"/> which is a fixed amount.

#### Staking Miner Max Submissions

The maximum number of submission for a staking miner on Kusama is <RPC network="kusama" path="consts.electionProviderMultiPhase.signedMaxSubmissions" defaultValue={16}/>.

#### Staking Reward Retention

Kusama staking rewards are kept available for 84 eras. The following calculation can be used to
approximate this length in days:

`84 eras` × `6 hours in a single era` ÷ `24 hours in a day` = `21 days`

#### Total Issuance

Kusama's total issuance is  <RPC network="kusama" path="query.balances.totalIssuance" defaultValue="15410382600026732448" filter= "humanReadable"/> in the era <RPC network="kusama" path="query.staking.currentEra" defaultValue="7061"/>.

#### Treasury Burn Factor

At the end of every spending period on Kusama, <RPC network="kusama" path="consts.treasury.burn" defaultValue={2000} filter="permillToPercent"/>% of the available funds are burned, with the amount currently going to [Society](../maintain/kusama/maintain-guides-society-kusama.md) rather than being burned.

#### Treasury Spending Period

The spending period on Kusama is currently <RPC network="kusama" path="consts.treasury.spendPeriod" defaultValue={86400} filter="blocksToDays"/> days.

#### Unbonding Duration

The unbonding duration on Kusama is set to <RPC network="kusama" path="consts.staking.bondingDuration" defaultValue={28} filter="erasToDays"/> days. This is
calculated by taking the **bonding duration** (in eras), multiplying it by the **length of a single
era** (in hours), and dividing by the **hours in a day** (24). Example: 28 × 6 ÷ 24 = 7 days.

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

The creation of a Kusama identity required a deposit of <RPC network="kusamapeople" path="consts.identity.basicDeposit" defaultValue={6672333321} filter="humanReadable"/> and <RPC network="kusamapeople" path="consts.identity.byteDeposit" defaultValue={333333} filter="humanReadable"/> (per byte) per each field beyond the legal name.

#### Sub-identity Deposit

The creation of a Kusama sub-identity required a deposit of <RPC network="kusamapeople" path="consts.identity.subAccountDeposit" defaultValue={6684333309} filter="humanReadable"/>.

</TabItem>

</Tabs>

<!-- prettier-ignore-end -->
