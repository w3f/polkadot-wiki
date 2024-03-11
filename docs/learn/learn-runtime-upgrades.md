---
id: learn-runtime-upgrades
title: Runtime Upgrades
sidebar_label: Runtime Upgrades
description: Forkless Runtime Upgrades on Polkadot.
keywords: [runtime, upgrades, releases, forkless]
slug: ../learn-runtime-upgrades
---

Runtime upgrades allow {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} to change the
logic of the chain without the need for a hard fork.

## Forkless Upgrades

You may have encountered the term "hard fork" before in the blockchain space. A **hard fork** occurs
when a blockchain's logic changes such that nodes that do not include the new changes cannot remain
in consensus with nodes that do. Such changes are backward incompatible. Hard forks can be political
due to the nature of the upgrades and logistically demanding due to the number (potentially
thousands) of nodes in the network that need to upgrade their software. Thus, hard forking is slow,
inefficient, and error-prone due to the levels of offline coordination required and, therefore, the
propensity to bundle many upgrades into one large-scale event.

By using Wasm in Substrate (the framework powering Polkadot, Kusama, and many connecting chains),
parachains are given the ability to upgrade their runtime (a chain's "business logic") without hard
forking.

Rather than encoding the runtime in the nodes,
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} nodes contain a WebAssembly
[execution host](learn-polkadot-host). They maintain consensus on a very low-level and
well-established instruction set. Upgrades can be small, isolated, and very specific by deploying
Wasm on-chain and having nodes auto-enact the new logic at a particular block height.

The {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} runtime is stored on the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} blockchain itself.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can upgrade its runtime by upgrading
the logic stored on-chain and removes the coordination challenge of requiring thousands of node
operators to upgrade in advance of a given block number. Polkadot stakeholders propose and approve
upgrades through the [on-chain governance](./learn-polkadot-opengov.md) system, which also enacts
them autonomously.

As a result of storing the Runtime as part of the state, the Runtime code itself becomes state
sensitive, and calls to Runtime can change the Runtime code itself. Therefore, the Polkadot Host
must always ensure it provides the Runtime corresponding to the state in which the entry point has
been called.

## Client Releases

The existing runtime logic is followed to update the [Wasm](./learn-wasm.md) runtime stored on the
blockchain to a new version. The upgrade is then included in the blockchain itself, meaning that all
the nodes on the network execute it. Generally, there is no need to upgrade your nodes manually
before the runtime upgrade, as they will automatically start to follow the new logic of the chain.
Nodes only need to be updated when the runtime requires new host functions, or there is a change in
networking or consensus.

Transactions constructed for a given runtime version will not work on later versions. Therefore, a
transaction constructed based on a runtime version will not be valid in later runtime versions. If
you can’t submit a transaction before the upgrade, it is better to wait and construct it afterward.

Although upgrading your nodes is generally not necessary to follow an upgrade, we recommend
following the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} releases and upgrading
promptly, especially for high-priority or critical releases.

:::info New Client Releases

The details about the latest client releases can be found in the
[releases section on the Polkadot repository](https://github.com/paritytech/polkadot-sdk/releases).
A detailed analysis for client releases can be viewed on the
[Polkadot Forum](https://forum.polkadot.network/tag/release-analysis).

:::

### Runtime vs Client versions

The runtime and client versions are distinct from each other. The runtime versioning typically looks
like `network-xxxx`, whereas the client versioning looks like `vx.x.xx`. For instance, the runtime
version shown on the top left section of Polkadot-JS UI below is `kusama-9370`, and the client
(node) version shown on the top right section is `v0.9.36`.

![Runtime vs Client versioning](./../assets/runtime-node-version.png)

:::info Querying runtime and client versions

The runtime version can be queried on-chain through Polkadot-JS UI by navigating to the Developer
tab > Chain State > Storage > system and query `lastRuntimeUpgrade()`.

The node version can be queried by navigating to the Developer tab > RPC calls > system and query
`version()`.

:::

## Runtime Upgrades for Various Users

### For Infrastructure Providers

Infrastructure services include but are not limited to the following:

- [Validators](../maintain/maintain-guides-how-to-upgrade.md)
- API services
- Node-as-a-Service (NaaS)
- General infrastructure management (e.g. block explorers, custodians)
- [Wallets](./wallets)

For validators, keeping in sync with the network is key. At times, upgrades will require validators
to upgrade their clients within a specific time frame, for example, if a release includes breaking
changes to networking. It is essential to check the release notes, starting with the upgrade
priority and acting accordingly.

General infrastructure providers, aside from following the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} releases and upgrading in a timely
manner, should monitor changes to runtime events and auxiliary tooling, such as the
[Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar).

Transactions constructed for runtime `n` will not work for any other runtime `>n`. If a runtime
upgrade occurs before broadcasting a previously constructed transaction, you will need to
reconstruct it with the appropriate runtime version and corresponding metadata.

### For [Nominators](../maintain/maintain-guides-how-to-nominate-polkadot.md)

Runtime upgrades don't require any actions by a nominator, though it is always encouraged to keep
up-to-date and participate with the latest runtime upgrade motions and releases while keeping an eye
on how the nodes on the network are reacting to a new upgrade.

## Monitoring Runtime Changes

You can monitor the chain for upcoming upgrades. The client release notes include the hashes of any
proposals related to any on-chain upgrades for easy matching. We recommend keeping track of the
Polkadot Fellowship's
[runtime upgrades](https://github.com/polkadot-fellows/runtimes/releases/latest) to be aware of
changes in the runtime logic.

### Governance V1

Monitor the chain for:

1. `democracy(Started)` events and log `index` and `blockNumber`. This event indicates that a
   referendum has started (although it does not mean it is a runtime upgrade). Get the referendum
   info\*; it should have a status of `Ongoing`. Find the ending block number (`end`) and the
   enactment `delay` (delay). If the referendum passes, it will execute on block number
   `end + delay`.
2. `democracy(Passed)`, `democracy(NotPassed)`, or, `democracy(Cancelled)` events citing the index.
   If `Passed`, you need to look at the `scheduler(Scheduled)` event in the same block for the
   enactment block.
3. `democracy(PreimageNoted)` events with the same hash as the `ReferendumInfoOf(index)` item. This
   may be up to the last block before execution, but it will not work if this is missing.
4. `democracy(Executed)` events for actual execution. In the case of a runtime upgrade, there will
   also be a `system(CodeUpdated)` event.

You can also monitor [Polkassembly](https://polkadot.polkassembly.io/) for discussions on on-chain
proposals and referenda.

\* E.g. via `pallets/democracy/storage/ReferendumInfoOf?key1=index&at=blockNumber` on Sidecar.

### Polkadot OpenGov

Runtime upgrades are voted on and executed via [Polkadot OpenGov](./learn-polkadot-opengov.md). You
should monitor the Relay chain as follows to know when the next runtime upgrade will be enacted:

1. Check each block for `referenda (Submitted)` events and check if `track` is `1`, which means it's
   `whitelistedCaller` - this is the only track that can enact runtime upgrdes - and log its `index`
   and `proposal`, this will help you keep track of the proposal's evolution. With the index you can
   lookup the details of the proposal in
   [Polkassembly.io](https://polkadot.polkassembly.io/whitelisted-caller?trackStatus=all&page=1) to
   see if it corresponds with a runtime upgrade.
2. In the same block, look for the extrinsic `referenda.submit`, which has the `enactment_moment`
   for the proposal in blocks.
3. Check also for `referenda (DecisionDepositPlaced)` events where `index` matches the one
   previously found. This means that the required deposit has been placed.
4. `referenda (DecisionStarted)` indicates that the decision period has started for the referenda of
   that `index`.
5. `referenda (ConfirmStarted)` indicates that `index`'s referenda has entered the confirmation
   period.
   1. `referenda (Confirmed)` indicates that `index`'s referenda has been confirmed and will enter
      the enactment period. With this and `enactment_moment`, you can estimate when the proposal
      will be enacted.
   2. `referenda (Rejected)` indicates that `index`'s referenda has been rejected and will not be
      enacted.
6. Once the enactment period is over, there will be a `system(CodeUpdated)` event confirming the
   execution of the runtime upgrade.
