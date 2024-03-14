---
id: maintain-guides-how-to-nominate-polkadot
title: Become a Nominator on Polkadot
sidebar_label: Nominator Guides
description: Steps on how to nominate on Polkadot.
keywords: [nominate, how to nominate, nominator, stake]
slug: ../maintain-guides-how-to-nominate-polkadot
---

:::tip New to Staking?

Start your staking journey or explore more information about staking on
[Polkadot's Home Page](https://polkadot.network/staking/). You can learn how staking works by
reading [this dedicated page](../learn/learn-staking.md).

Discover the new [**Staking Dashboard**](https://staking.polkadot.network/#/overview) that makes
staking much easier and check this
[extensive article list](https://support.polkadot.network/support/solutions/articles/65000182104) to
help you get started.
{{ kusama: All the examples presented on Polkadot also apply to Kusama. :kusama }}

:::

Nominators are one type of participant in the staking subsystem of
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}. They appoint their stake to the
validators, the second type of participant. By appointing their stake, they can elect the active set
of validators and share in the rewards that are paid out.

While the [validators](maintain-guides-how-to-validate-polkadot.md) are active participants in the
network that engage in the block production and finality mechanisms, nominators take a slightly more
passive role. Being a nominator does not require running a node of your own or worrying about online
uptime. However, a good nominator performs due diligence on the validators that they elect. When
looking for validators to nominate, a nominator should pay attention to their own reward percentage
for nominating a specific validator - as well as the risk that they bear of being slashed if the
validator gets slashed.

If you are a beginner, please watch the video below for detailed instructions.

[![Staking Tutorial](https://img.youtube.com/vi/F59N3YKYCRs/0.jpg)](https://www.youtube.com/watch?v=F59N3YKYCRs)

## Setting up Stash and Staking Proxy Accounts

Nominators are recommended to set up separate stash and staking proxy accounts. Explanation and the
reasoning for generating distinct accounts for this purpose is elaborated in the
[keys](../learn/learn-cryptography.md#keys) section of the Wiki.

You can generate your stash and staking proxy account via any of the recommended methods, which are
detailed on the [account generation](../learn/learn-accounts.md#account-generation) page.

Starting with runtime version v23 natively included in the client version
[0.8.23](https://github.com/paritytech/polkadot/releases/tag/v0.8.23), payouts can go to any custom
address. If you'd like to redirect payments to an account that is neither the staking proxy nor the
stash account, set one up. Note that setting an exchange address as the recipient of the staking
rewards is extremely unsafe.
