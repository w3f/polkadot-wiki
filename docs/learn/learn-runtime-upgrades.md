---
id: learn-runtime-upgrades
title: Runtime Upgrades
sidebar_label: Runtime Upgrades
slug: ../learn-runtime-upgrades
---

# Runtime Upgrades

Runtime upgrades allow Polkadot to change the logic of the chain, without the need for a hard fork.

## Forking vs Forkless

When we talk about "forking", we are referring to the act of invoking the `fork` system call [within
a system], where a process creates a copy of itself. In software development, this is the act of
forking source code from one software package that creates a separate piece of that software.

You may have come across the terms "hard fork" and "soft fork" before in the blockchain space.

A **hard fork** sees the blockchain's underlying technology (i.e. the protocol) radically changed
and exists as a _different_ or _new_ version. This version is meant to be incompatible with the
original version. This means that both blockchains exist simultaneously. Henceforth, a hard fork
requires node operators to manually upgrade their nodes to the latest runtime version. In a
distributed system, this is a complex process to coordinate and communicate.

A **soft fork** sees an upgrade or update in the blockchain's underlying technology. Unlike a hard
fork, a soft fork is a backward-compatible upgrade; the upgraded nodes can communicate with the
non-upgraded ones.

Upgrading conventional blockchains often requires forking the network, which is time-consuming and
can break up communities. Something that conventional networks also lack is the ability to perform
thought-through governance that would allow for effective decision-making and signalling for runtime
upgrades.

Polkadot sees itself as a next-generation blockchain because it addresses these obstacles in a
meaningful way - revolutionizing the runtime upgrading process by enabling blockchains to upgrade
themselves without the need to fork the chain. These forkless upgrades are enacted through
Polkadot’s transparent [on-chain governance](learn-governance.md) system.

## New [Client Release](https://github.com/paritytech/polkadot/releases)

The existing runtime logic is followed to update the [Wasm](learn-wasm.md) runtime stored on the
blockchain to a new version. The upgrade is then included in the blockchain itself, meaning that all
the nodes on the network execute it. Generally, there is no need to upgrade your nodes manually
before the runtime upgrade as they will automatically start to follow the new logic of the chain.
Nodes only need to be updated when the runtime requires new host functions or there is a change in
networking or consensus.

Transactions constructed for a given runtime version will not work on later versions. Therefore, a
transaction constructed based on a runtime version will not be valid in later runtime versions. If
you don't think you can submit a transaction before the upgrade, it is better to wait and construct
it after the upgrade takes place.

Although upgrading your nodes is generally not necessary to follow an upgrade, we recommend
following the Polkadot releases and upgrading promptly, especially for high priority or critical
releases.

### For Infrastructure Providers

Infrastructure services including but not limited to the following:

- [Validators](../maintain/maintain-guides-how-to-upgrade.md)
- API services
- Node-as-a-Service (NaaS)
- General infrastructure management (e.g. block explorers, exchanges)

For validators, keeping in sync with the network is key. At times, upgrades will require validators
to upgrade within a specific time frame to ensure continued sync with their node. It is essential to
check the release notes, starting with the upgrade priority and acting accordingly.

For general infrastructure providers, aside from following the Polkadot releases and upgrading in a
timely manner, somethings to keep an eye out on is updating your parsing logic and acknowledging
changes to the available RPC clients, such as the
[Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar).

### For [Nominators](../maintain/maintain-guides-how-to-nominate-polkadot.md)

Runtime upgrades don't require any actions by a nominator, though, it is always encouraged to keep
up-to-date and participate with the latest runtime upgrade motions and releases, while keeping an
eye on how the nodes on the network are reacting to a new upgrade.

### For [Wallets](../build/build-wallets.md)

Wallets should look out for updates to the transaction lifecycle, such as tx broadcasting. An
example would be constructing a transaction with a new spec, "n", but broadcasting it with a spec
" > n " - transactions could be propagated, or even rejected by peers on the network.

## Monitoring Changes

Using a Polkadot blockchain explorer, you can monitor the chain for on-chain changes. The following
steps relate to [subscan](https://polkadot.subscan.io/).

> In general, an action has two components: the module (such as `democracy`) and the event (such as
> `Started`).

Monitor the chain for:

1. `democracy(Started)` events and log `index` and `blockNumber`. Get
   `pallets/democracy/storage/ReferendumInfoOf?key1=index&at=blockNumber` from `Sidecar` to get the
   referendum info. It should have a status of `Ongoing`. Find the ending block number (`end`) and
   the enactment `delay` (delay), where the execution block number will be `end + delay`.

2. `democracy(Passed)`, `democracy(NotPassed)`, or, `democracy(Cancelled)` events citing the index.
   If `Passed`, you need to look at the `scheduler(Scheduled)` event in the same block for the
   enactment block.

3. `democracy(PreimageNoted)` events with the same hash as the `ReferendumInfoOf(index)` item. This
   may be up to the last block before execution, but it will not work if this is missing.
4. `democracy(Executed)` events for actual execution. In the case of a runtime upgrade, there will
   also be a `system(CodeUpdated)` event.
