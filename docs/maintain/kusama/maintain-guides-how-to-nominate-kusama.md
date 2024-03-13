---
id: maintain-guides-how-to-nominate-kusama
title: Become a Nominator on Kusama
sidebar_label: How to Nominate on Kusama
description: Steps on how to nominate on Kusama.
keywords: [nominate, nominator, kusama, stake, staking]
slug: ../../maintain-guides-how-to-nominate-kusama
---

import RPC from "./../../../components/RPC-Connection";

:::info

The following information applies to the Kusama network. If you want to nominate on Polkadot, check
out the [Polkadot guide](../maintain-guides-how-to-nominate-polkadot.md) instead.

:::

Nominators are one type of participant in the staking subsystem of Kusama. They are responsible for
appointing their stake to the validators who are the second type of participant. By appointing their
stake, they are able to elect the active set of validators and share in the rewards that are paid
out.

While the [validators](maintain-guides-how-to-validate-kusama.md) are active participants in the
network that engage in the block production and finality mechanisms, nominators take a slightly more
passive role. Being a nominator does not require running a node of your own or worrying about online
uptime. However, a good nominator performs due diligence on the validators that they elect. When
looking for validators to nominate, a nominator should pay attention to their own reward percentage
for nominating a specific validator - as well as the risk that they bear of being slashed if the
validator gets slashed.

:::note Explainer videos on staking

If you prefer a video format for the tutorials, the following videos related to staking on Kusama
are available:

- [How to Stake on Polkadot (and Kusama)](https://youtu.be/FCXC0CDhyS4)
- [Staking with Kusama App on Ledger and PolkadotJS Apps UI](https://www.youtube.com/watch?v=7VlTncHCGPc&t=305s)

:::

## Setting up Stash and Staking Proxy Keys

Nominators are recommended to set up two separate stash and staking proxy accounts. Explanation and
reasoning for generating distinct accounts for this purpose is elaborated in the
[keys](../../learn/learn-cryptography.md) section.

You can generate your stash and staking proxy account via any of the recommended methods that are
detailed on the [account generation](../../learn/learn-accounts.md#account-generation) page.

Starting with runtime version v2023 natively included in client version
[0.8.23](https://github.com/paritytech/polkadot/releases/tag/v0.8.23), payouts can go to any custom
address. If you'd like to redirect payments to an account that is neither the staking proxy nor the
stash account, set one up. Note that it is extremely unsafe to set an exchange address as the
recipient of the staking rewards.
