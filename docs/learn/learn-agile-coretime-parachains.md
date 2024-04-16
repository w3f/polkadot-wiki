---
id: learn-agile-coretime-parachains
title: Agile Coretime for Parachains
sidebar_label: Agile Coretime Parachains
description: Agile Coretime from Parachains perspective
keywords: [coretime, blockspace, parathread, parachain, cores]
slug: ../learn-agile-coretime-parachains
---

The landscape for parachains on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
changes with the rollout of [Agile Coretime](./learn-agile-coretime.md). With
[auctions](./learn-auction.md) being phased out in favor of direct coretime sales, the existing
parachains on the relaychain and the prospective parachains are presented with the following
scenarios:

- Migrating from a legacy lease into a bulk coretime model
- Starting with bulk coretime model from scratch
- Running a parachain with on-demand coretime purchases

The parachain lease auctions will stop on-chain with the enactment of the
[runtime upgrade 1.2.0](https://github.com/polkadot-fellows/runtimes/releases/tag/v1.2.0) and the
existing leases will be migrated to bulk coretime automatically. Leases that are yet to be started
will be cancelled and the locked {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}  
will be refunded. The existing parachains benefit from
[coretime renewals](https://docs.lastic.xyz/coretime/renewals.html) which allows for the continued
assignment of bulk coretime for a core without going through the regular purchasing process.

## Run a Parachain with Bulk Coretime

## Run a Parachain with On-demand Coretime

The first step is to register a `ParaID`for the on-demand parachain. This can be done through
Polkadot-JS UI by navigating to Network > Parachains > Parathreads and clicking on ParaID button.
Ensure that you have sufficient tokens to successfully reserve the displayed `ParaID`

![coretime-reserve-paraID](../assets/coretime/coretime-reserve-paraID.png)

The next step is to register the parachain's genesis code and state.

![coretime-register-parathread](../assets/coretime/coretime-register-parathread.png)

After successful registration, the parachain starts onboarding as a parathread.

![coretime-onboarding-parathread](../assets/coretime/coretime-parachain-onboarding.png)
