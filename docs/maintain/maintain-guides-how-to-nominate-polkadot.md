---
id: maintain-guides-how-to-nominate-polkadot
title: Become a Nominator on Polkadot
sidebar_label: Nominator Guides
description: Steps on how to nominate on Polkadot.
keywords: [nominate, how to nominate, nominator, stake]
slug: ../maintain-guides-how-to-nominate-polkadot
---

import RPC from "./../../components/RPC-Connection";

:::tip New to Staking?

Start your staking journey or explore more information about staking on
[Polkadot's Home Page](https://polkadot.network/staking/). You can learn how staking works by reading [this dedicated page](../learn/learn-staking.md). 

Discover the new
[**Staking Dashboard**](https://staking.polkadot.network/#/overview) that makes staking much easier and
check this
[extensive article list](https://support.polkadot.network/support/solutions/articles/65000182104) to
help you get started.
{{ kusama: All the examples presented on Polkadot also apply to Kusama. :kusama }}

:::

:::info

The following information applies to the Polkadot network. If you want to nominate on Kusama, check
out the [Kusama guide](https://guide.kusama.network/docs/maintain-guides-how-to-nominate-kusama/) instead.

:::

Nominators are one type of participant in the staking subsystem of Polkadot. They appoint their stake to the validators, the second type of participant. By appointing
their stake, they can elect the active set of validators and share in the rewards that are
paid out.

While the [validators][] are active participants in the network that engage in the block production
and finality mechanisms, nominators take a slightly more passive role. Being a nominator does not
require running a node of your own or worrying about online uptime. However, a good nominator
performs due diligence on the validators that they elect. When looking for validators to nominate, a
nominator should pay attention to their own reward percentage for nominating a specific validator -
as well as the risk that they bear of being slashed if the validator gets slashed.

If you are a beginner, please watch the video below for detailed instructions.

<iframe width="560" height="315" src="https://youtube.com/embed/F59N3YKYCRs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/><br/>

## Setting up Stash and Controller Accounts

Nominators are recommended to set up separate stash and controller accounts. Explanation and
the reasoning for generating distinct accounts for this purpose is elaborated in the [keys][] section of
the Wiki.

You can generate your stash and controller account via any of the recommended methods, which are
detailed on the [account generation][] page.

Starting with runtime version v23 natively included in the client version
[0.8.23](https://github.com/paritytech/polkadot/releases/tag/v0.8.23), payouts can go to any custom
address. If you'd like to redirect payments to an account that is neither the controller nor the
stash account, set one up. Note that setting an exchange address as the
recipient of the staking rewards is extremely unsafe.

## Nominating vs Joining a Pool

Nominating is the action of choosing validators. It does not simply involve bonding tokens. Nominating is an active task, which implies that you regularly monitor that your stake is backing an active validator in all the eras and check if you are receiving your staking rewards. More importantly, ensure that the validators you chose always act in the best interests of the network protocol and have less chance of getting slashed. To nominate, you need a minimum of 10 DOT, and to receive rewards, you need at least a balance greater than the minimum active bond. Depending on your validators, if your active validator is oversubscribed, you will earn rewards only if your stake is within that of the top 256 nominators. If the validator misbehaves, It is worth noting that your stake is subject to slashing, irrespective of whether you are in the top 256 nominators or not.

As the minimum active bond is a dynamic value, it can make your nomination inactive when the threshold goes above your bonded balance. Hence, to be eligible to earn rewards while nominating, you would need to stake a much higher balance than the minimum active bond.

Nomination pools are a way to participate in staking with as little as 1 DOT and earn staking rewards. Nomination pools differ from custodial solutions (like staking through central exchanges) because they are non-custodial, native to Polkadot's protocol, permissionless, transparent, and run in a decentralized way by the community. Before joining a nomination pool, you must ensure that the pool is earning rewards and nominating the validators that match your preferences. Participating in pools is more of a set-and-forget action than nominating by yourself. It is worth noting that it is the pool operator that maintains the list of validators nominated by the pool, and so, in a way, you are trusting the pool operator to act in your best interests. However, it is advised to check the validators nominated by the pool from time to time and change the pool if necessary.

| Nominating | Joining a Pool|
|:--------:|:----------:|
| Minimum 10 DOT to nominate. | Minimum 1 DOT to be a member. |
| Unlimited bonding period. | Unlimited bonding period until the pool exists. |
| Unbonding period of 28 days. | Unbonding period of 28 days. |
| Maximum uncapped. | Maximum uncapped. |
| Staking rewards not guaranteed. | Staking rewards guaranteed. |
| Nominate and regularly check up to 16 validators. | No nomination. |
| Rewards paid out regularly every 2-3 days by the active validator or any of the nominators. | Rewards must be claimed by the pool member. |
| Bonded funds remain in your account. | Bonded funds are transferred to a pool account not accessible by anyone (only accessible by the pool's internal logic). |
| Non-custodial, native to Polkadot | Non-custodial, native to Polkadot |

## Using the Polkadot Staking Dashboard

:::info Walk-through Video Tutorials

- [**Nominating**](https://youtu.be/F59N3YKYCRs): Stake your tokens, choose your best validators, and start your staking journey on Polkadot.
- [**Becoming a Pool Member**](https://youtu.be/dDIG7QAApig): Start becoming a part of the Polkadot movement, keep Polkadot secure by staking minimum 1 DOT and receiving staking rewards. 
- [**Dashboard Walkthrough**](https://youtu.be/hvXLc4H7rA4): Become a Pro using the Staking Dashboard.
- [**After Staking**](https://youtu.be/58pIe8tt2o4): Nominating on Polkadot is not a set-and-forget action, learn what you can do with the dashboard after you started staking.

:::

## Why am I not receiving Staking Rewards?

:::info Bags List & Minimum Active Bond

See [**this video tutorial**](https://youtu.be/hIIZRJLrBZA) and read [**this support article**](https://support.polkadot.network/support/solutions/articles/65000181018-i-have-more-than-the-minimum-bonded-but-i-m-not-getting-rewards) to understand why in some cases you might not receive staking rewards and how to avoid those situations.

:::

## Using Polkadot-JS UI

:::info Using Polkadot-JS UI as a Nominator

Here is the list of basic nominator actions that can be performed using the Polkadot-JS UI.

- [How to Bond Tokens and Nominate](https://support.polkadot.network/support/solutions/articles/65000168057-polkadot-js-ui-how-do-i-stake-nominate-on-polkadot-)
- [How to Select Validators](https://support.polkadot.network/support/solutions/articles/65000150130-how-do-i-know-which-validators-to-choose-)
- [How to Stop Nominating & Unbond Tokens](https://support.polkadot.network/support/solutions/articles/65000167902-how-can-i-unstake-my-tokens-again-)
- [How to Rebond Tokens](https://support.polkadot.network/support/solutions/articles/65000170241-polkadot-js-ui-how-to-rebond-tokens-during-the-unbonding-period)

:::

:::info Video Tutorials

- [How to Nominate/Stake](https://youtu.be/FCXC0CDhyS4?t=219)
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

After a few seconds, you should see the hash of the transaction, and if you would like to verify the
nomination status, you can check that on the Polkadot-JS UI as well.

[validators]: maintain-guides-how-to-validate-polkadot.md
[keys]: ../learn/learn-cryptography.md#keys
[account generation]: ../learn/learn-account-generation.md

