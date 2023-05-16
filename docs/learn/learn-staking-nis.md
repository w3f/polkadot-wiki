---
id: learn-staking-nis
title: Non-Interactive Staking
sidebar_label: Non-Interactive Staking
description: A high level introduction to non-interactive staking
keywords: [staking, stake, NPoS, NIS]
slug: ../learn-staking-nis
---

:::info

Non-interactive staking is live on Kusama. The implementation of this feature is at an early stage,
use it with caution.

:::

Non-interactive staking (NIS) provides a [staking](./learn-staking.md) solution for token holders to
withstand {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}
[inflation](./learn-staking-advanced.md#inflation) without being a [nominator](./learn-nominator.md)
or a [nomination pool](./learn-nomination-pools.md) member.

Nominating and being a pool member will always provide higher returns, in the sense that stakers
will receive beyond-inflation staking rewards. NIS offers zero beyond-inflation rewards but it does
not require you being a member of a pool or a nominator.

## Mechanics

With NIS you get a receipt as an NFT, stating that the tokens you locked correspond to a specific
percentage of the total issuance. That receipt can be transferred or taken back to NIS after some
point in time to claim back your tokens that a this time will be more than those you locked in the
first place. The idea is that you will always claim back the percentage of the total issuance you
locked.

In addition to the NFT there is also a fungible counterpart that will be given also as a percentage
of the total issuance that was locked in the first place. This opens up a new asset that when
combined with an appropriate receipt can be tradable for a percentage of the total issuance of
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}.
