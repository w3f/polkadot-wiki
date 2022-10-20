---
id: maintain-guides-how-to-nominate-polkadot
title: Become a Nominator on Polkadot
sidebar_label: Nominate
description: Steps on how to nominate on Polkadot.
keywords: [nominate, how to nominate, nominator, stake]
slug: ../maintain-guides-how-to-nominate-polkadot
---

import RPC from "./../../components/RPC-Connection";

:::tip New to Staking?

Start your staking journey or explore more information about staking on
[Polkadot's Home Page](https://polkadot.network/staking/). Discover the new
[Staking Dashboard](https://staking.polkadot.network/#/overview) that makes staking much easier and
check this
[extensive article list](https://support.polkadot.network/support/solutions/articles/65000182104) to
help you get started.
{{ kusama: All the examples presented on Polkadot apply to Kusama as well. :kusama }}

:::

:::info

The following information applies to the Polkadot network. If you want to nominate on Kusama, check
out the [Kusama guide](https://guide.kusama.network/docs/maintain-guides-how-to-nominate-kusama/) instead.

:::

Nominators are one type of participant in the staking subsystem of Polkadot. They are responsible
for appointing their stake to the validators who are the second type of participant. By appointing
their stake, they are able to elect the active set of validators and share in the rewards that are
paid out.

While the [validators][] are active participants in the network that engage in the block production
and finality mechanisms, nominators take a slightly more passive role. Being a nominator does not
require running a node of your own or worrying about online uptime. However, a good nominator
performs due diligence on the validators that they elect. When looking for validators to nominate, a
nominator should pay attention to their own reward percentage for nominating a specific validator -
as well as the risk that they bear of being slashed if the validator gets slashed.

If you are a beginner, please watch the video below for detailed instructions

[![Stake on Polkadot/Kusama](https://img.youtube.com/vi/FCXC0CDhyS4/0.jpg)](https://youtu.be/FCXC0CDhyS4)

## Setting up Stash and Controller keys

Nominators are recommended to set up separate stash and controller accounts. Explanation and
reasoning for generating distinct accounts for this purpose is elaborated in the [keys][] section of
the Wiki.

You can generate your stash and controller account via any of the recommended methods that are
detailed on the [account generation][] page.

Starting with runtime version v23 natively included in client version
[0.8.23](https://github.com/paritytech/polkadot/releases/tag/v0.8.23), payouts can go to any custom
address. If you'd like to redirect payments to an account that is neither the controller nor the
stash account, set one up. Note that it is extremely unsafe to set an exchange address as the
recipient of the staking rewards.

## Using Polkadot-JS UI

### Step 1: Bond your tokens

On the [Polkadot-JS UI](https://polkadot.js.org/apps) navigate to the "Staking" tab (within the
"Network" menu).

The "Staking Overview" subsection will show you all the active validators and their information -
their identities, the amount of DOT that are staking for them, amount that is their own provided
stake, how much they charge in commission, the era points they've earned in the current era, and the
last block number that they produced. If you click on the chart button it will take you to the
"Validator Stats" page for that validator that shows you more detailed and historical information
about the validator's stake, rewards and slashes.

The "Account actions" subsection ([link](https://polkadot.js.org/apps/#/staking/actions)) allows you
to stake and nominate.

The "Payouts" subsection ([link](https://polkadot.js.org/apps/#/staking/payouts)) allows you to
claim rewards from staking.

The "Targets" subsection ([link](https://polkadot.js.org/apps/#/staking/targets)) will help you
estimate your earnings and this is where it's good to start picking favorites. For additional
information on content provided in this table checkout
[What to take into consideration when nominating](learn-nominator#what-to-take-into-consideration-when-nominating).

The "Waiting" subsection ([link](https://polkadot.js.org/apps/#/staking/waiting)) lists all pending
validators that are awaiting more nominations to enter the active validator set. Validators will
stay in the waiting queue until they have enough DOT backing them (as allocated through the
[Phragmén election mechanism](../learn/learn-phragmen.md)). It is possible validator can remain in
the queue for a very long time if they never get enough backing.

The "Validator Stats" subsection ([link](https://polkadot.js.org/apps/#/staking/query)) allows you
to query a validator's stash address and see historical charts on era points, elected stake,
rewards, and slashes.

Pick "Account actions", then click the "+ Nominator" button.

You will see a modal window that looks like the below:
![nominator-update-1](../assets/polkadotjs_nominate_button.png)

Select a "value bonded" that is **less** than the total amount of DOT you have, so you have some
left over to pay transaction fees. Transaction fees are currently around 0.01 DOT, but they are
dynamic based on a variety of factors including the load of recent blocks.

Also be mindful of the reaping threshold - the amount that must remain in an account lest it be
burned. That amount is 1 DOT on Polkadot, so it's recommended to keep at least 1.5 DOT in your
account to be on the safe side.

Choose whatever payment destination that makes sense to you. If you're unsure, you can choose "Stash
account (increase amount at stake)" to simply accrue the rewards into the amount you're staking and
earn compound interest.

![Payout account selection dropdown with the custom account option highlighted](../assets/payout/01.png)

:::note

These concepts have been further explained in Polkadot's
[UI Walkthrough Video](https://youtu.be/FCXC0CDhyS4?t=219)

:::

### Step 2: Nominate a validator

You are now bonded. Being bonded means your tokens are locked and could be
[slashed](../learn/learn-staking.md#slashing) if the validators you nominate misbehave. All bonded
funds can now be distributed to up to
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominations" defaultValue={16}/> :polkadot }}
{{ kusama: <RPC network="polkadot" path="consts.staking.maxNominations" defaultValue={16}/> :kusama }}
validators. Be careful about the validators you choose since you will be slashed if your validator
commits an offence.

Click on "Nominate" on an account you've bonded and you will be presented with another popup asking
you to select up to 16 validators. Although you may choose up to 16 validators, due to the
[Phragmén](../learn/learn-phragmen.md) election algorithm your stake may be dispersed in different
proportions to any subset or all of the validators your choose.

![Nominating validators](../assets/polkadotjs_setup_nominator2.png)

Select them, confirm the transaction, and you're done - you are now nominating. Your nominations
will become active in the next era. Eras last twenty-four hours on Polkadot - depending on when you
do this, your nominations may become active almost immediately, or you may have to wait almost the
entire twenty-four hours before your nominations are active. You can check how far along Polkadot is
in the current era on the [Staking page](https://polkadot.js.org/apps/#/staking).

Assuming at least one of your nominations ends up in the active validator set, you will start to get
rewards allocated to you. In order to claim them (i.e., add them to your account), you must manually
claim them. See the [Claiming Rewards](../learn/learn-staking.md#claiming-rewards) section of the
Staking wiki page for more details.

### Step 3: Monitoring Bags list

This step is highly relevant if the staked DOT is close to the dynamic minimum active nomination
threshold on the network, which can be viewed on
[Polkadot JS Apps > Network > Staking > Targets page](https://polkadot.js.org/apps/#/staking/targets).
For instance, the minimum active nomination receiving staking rewards is 124.575 DOT in the snapshot
below. See the [Bags List](../learn/learn-nominator.md#bags-list) section of the Nominator wiki page
for more details.

![Minimum Active Nomination](../assets/staking/min-active-nomination.png)

The nominations within a bag are sorted based on the insertion order and not based on the stake. If
your stake is close to this dynamic threshold, it is advised that you monitor your bag across the
staking eras on
[Polkadot JS Apps > Network > Staking > Bags ](https://polkadot.js.org/apps/#/staking/bags). If any
action is required, the respective buttons (Move up/rebag) will appear beside your stash account.

![PutInFrontOf Extrinsic](../assets/staking/put-infront-of.png)

### Step 4: Stop nominating

At some point, you might decide to stop nominating one or more validators. You can always change who
you're nominating, but you cannot withdraw your tokens unless you unbond them. Detailed instructions
are available [here](maintain-guides-how-to-unbond.md).

:::note Explainer videos on staking

The following videos related to staking are also available for your reference:

- [Staking with a Ledger and PolkadotJS Apps](https://youtu.be/7VlTncHCGPc)
- [Staking with a Ledger and Ledger Live](https://www.youtube.com/watch?v=jL-N_IWiYVA)

:::

## Using Command-Line Interface (CLI)

Apart from using Polkadot-JS Apps to participate in staking, you can do all these things in CLI
instead. The CLI approach allows you to interact with the Polkadot network without going to the
Polkadot-JS Apps dashboard.

### Step 1: Install @polkadot/api-cli

We assume you have installed [NodeJS with npm](https://nodejs.org). Run the following command to
install the `@polkadot/api-cli` globally:

```bash
npm install -g @polkadot/api-cli
```

### Step 2. Bond your DOT

Executing the following command:

```bash
polkadot-js-api --seed "MNEMONIC_PHRASE" tx.staking.bond CONTROLLER_ADDRESS NUMBER_OF_TOKENS REWARD_DESTINATION --ws WEBSOCKET_ENDPOINT
```

`CONTROLLER_ADDRESS`: An address you would like to bond to the stash account. Stash and Controller
can be the same address but it is not recommended since it defeats the security of the two-account
staking model.

`NUMBER_OF_TOKENS`: The number of DOT you would like to stake to the network.

:::note Decimal places

DOT has ten decimal places and is always represented as an integer with zeroes at the end. So 1 DOT
= 10_000_000_000 Plancks.

:::

`REWARD_DESTINATION`:

- `Staked` - Pay into the stash account, increasing the amount at stake accordingly.
- `Stash` - Pay into the stash account, not increasing the amount at stake.
- `Account` - Pay into a custom account, like so:
  `Account DMTHrNcmA8QbqRS4rBq8LXn8ipyczFoNMb1X4cY2WD9tdBX`.
- `Controller` - Pay into the controller account.

Example:

```bash
polkadot-js-api --seed "xxxx xxxxx xxxx xxxxx" tx.staking.bond DMTHrNcmA8QbqRS4rBq8LXn8ipyczFoNMb1X4cY2WD9tdBX 1000000000000 Staked --ws wss://rpc.polkadot.io
```

Result:

```bash
...
...
    "status": {
      "InBlock": "0x0ed1ec0ba69564e8f98958d69f826adef895b5617366a32a3aa384290e98514e"
    }
```

You can check the transaction status by using the value of the `InBlock` in
[Polkascan](https://polkascan.io/polkadot-cc1). Also, you can verify the bonding state under the
[Staking](https://polkadot.js.org/apps/#/staking/actions) page on the Polkadot-JS Apps Dashboard.

### Step 3. Nominate a validator

To nominate a validator, you can execute the following command:

```bash
polkadot-js-api --seed "MNEMONIC_PHRASE" tx.staking.nominate '["VALIDATOR_ADDRESS"]' --ws WS_ENDPOINT
```

```bash
polkadot-js-api --seed "xxxx xxxxx xxxx xxxxx" tx.staking.nominate '["CmD9vaMYoiKe7HiFnfkftwvhKbxN9bhyjcDrfFRGbifJEG8","E457XaKbj2yTB2URy8N4UuzmyuFRkcdxYs67UvSgVr7HyFb"]' --ws wss://rpc.polkadot.io
```

After a few seconds, you should see the hash of the transaction and if you would like to verify the
nomination status, you can check that on the Polkadot-JS UI as well.

[validators]: maintain-guides-how-to-validate-polkadot.md
[keys]: ../learn/learn-keys.md###"controller"-and-"stash"-keys
[account generation]: ../learn/learn-account-generation.md
