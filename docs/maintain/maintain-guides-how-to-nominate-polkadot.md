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

[![Stake on Polkadot/Kusama](https://img.youtube.com/vi/KTBUOFq0KO4/0.jpg)](https://youtu.be/KTBUOFq0KO4)

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

## Using Polkadot-JS UI

:::info Support Articles

If you need to use the Polkadot-JS UI, clicking on the topics below will take you to the relevant support articles.

- [How to Bond Tokens and Nominate](https://support.polkadot.network/support/solutions/articles/65000168057-polkadot-js-ui-how-do-i-stake-nominate-on-polkadot-)
- [How to Select Validators](https://support.polkadot.network/support/solutions/articles/65000150130-how-do-i-know-which-validators-to-choose-)
- [How to Monitor the Bags List](https://support.polkadot.network/support/solutions/articles/65000181018-i-have-more-than-the-minimum-bonded-but-i-m-not-getting-rewards)
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
[keys]: ../learn/learn-keys.md#keys
[account generation]: ../learn/learn-account-generation.md

