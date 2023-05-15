---
id: learn-validator
title: Validator
sidebar_label: Validator
description: An introduction about validators.
keywords: [validate, validator, maintain, NPoS, stake]
slug: ../learn-validator
---

import RPC from "./../../components/RPC-Connection";

:::info

This page provides a general overview of the role of validators in
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}. For more detailed information you
can read the Protocol Overview Section in
[The Polkadot Parachain Host Implementers' Guide](https://paritytech.github.io/polkadot/book/).

:::

Validators secure the [relay chain](learn-architecture.md#relay-chain) by staking
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}, validating proofs from collators and
participating in consensus with other validators.

Validators play a crucial role in adding new blocks to the relay chain and, by extension, to all
parachains. This allows parties to complete cross-chain transactions via the relay chain. They
guarantee that each parachain follows its unique rules and can pass messages between shards in a
trust-free environment.

## Para-validators

Parachain validators (i.e. para-validators) participate to the
[Parachain Phase of the AnV Protocol](./learn-parachains-protocol.md/#parachain-phase), and submit
[candidate receipts](./learn-parachains-protocol.md/#candidate-receipts) to the Relay Chain
transaction queue so that a block author can include information on the parablock in a fork of of
the Relay Chain.

Para-validators work in groups and are selected by the runtime in every epoch to validate parachain
blocks for all parachains connected to the relay chain. The selected para-validators are one of
{{ polkadot: <RPC network="polkadot" path="query.staking.validatorCount" defaultValue={297}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="query.staking.validatorCount" defaultValue={1000}/> :kusama }}
validators randomly selected (per epoch) to participate in the validation, creating a validator pool
of 200 para-validators.

Para-validators verify that the information contained in an assigned set of parachain blocks is
valid. They receive parachain block candidates from the [collators](./learn-collator.md) together
with a Proof-of-Validity (PoV). The para-validators perform the first round of validity checks on
the block candidates. Candidates that gather enough signed validity statements are considered
_backable_.

## Block Authors

There are validators on the Relay Chain who participate in the consensus mechanism to produce the
relay chain blocks based on validity statements from other validators. These validators are called
block authors, they are selected by [BABE](./learn-consensus.md/#block-production-babe) and can note
up to one backable candidate for each parachain to include in the relay chain. A backable candidate
included in the relay chain is considered _backed_ in that fork of the chain.

In a Relay Chain block, block authors will only include
[candidate receipts](./learn-parachains-protocol.md/#candidate-receipts) that have a parent
candidate receipt in an earlier Relay Chain block. This ensures the parachain follows a valid chain.
Also, the block authors will only include a receipt for which they have an erasure coding chunk,
ensuring that the system can perform the next round of availability and validity checks.

## Other Validators

Validators also contribute to the so-called **availability distribution**. In fact, once the
candidate is backed in a fork of the relay chain, it is still _pending availability_, i.e. it is not
fully included (only tentative included) as part of the parachain until it is proven avaialable
(together with the PoV). Information regarding the availability of the candidate will be noted in
the following relay chain blocks. Only when there is enough information, the candidate is considered
a full parachain block or _parablock_.

Validators also participate in the so-called
[**approval process**](./learn-parachains-protocol.md/#approval-process). Once the parablock is
considered available and part of the parachain, it is still _pending approval_. Because
para-validators are a small subset of all validators, there is a risk that by chance the majority of
para-validators assigned to a parachain might be dishonest. It is thus necessary to run a secondary
verification of the parablock before it can be considered approved. Having a secondary verification
step avoids the allocation of more para-validators that will ultimately reduce the throughput of the
system.

Any instances of non-compliance with the consensus algorithms result in
[**disputes**](./learn-parachains-protocol.md/#disputes) with the punishment of the validators on
the wrong side by removing some or all their staked
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}, thereby discouraging bad actors. Good
performance, however, will be rewarded, with validators receiving block rewards (including
transaction fees) in the form of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} in exchange
for their activities.

Finally, validators participate in the
[chain selection process within GRANDPA](./learn-parachains-protocol.md/#chain-selection), ensuring
that only available and valid blocks end within the finalized Relay Chain.

:::info Within an era roles can change

Within the same era, a Validator can be a para-validator, block author, and participate in the
availability distribution or the approval process. Those roles can change between sessions.

:::

## Further Readings

### Guides

- [How to Validate on Polkadot](../maintain/maintain-guides-how-to-validate-polkadot.md) - Guide on
  how to set up a validator on the Polkadot live network.
- [Validator Payout Overview](../maintain/maintain-guides-validator-payout.md) - A short overview on
  how the validator payout mechanism works.
- [How to run your validator as a systemd process](../maintain/maintain-guides-how-to-systemd.md) -
  Guide on running your validator as a `systemd` process so that it will run in the background and
  start automatically on reboots.
- [How to Upgrade your Validator](../maintain/maintain-guides-how-to-upgrade.md) - Guide for
  securely upgrading your validator when you want to switch to a different machine or begin running
  the latest version of client code.
- [How to Use Validator Setup](../maintain/maintain-guides-how-to-validate-polkadot.md) - Guide on
  how to use Polkadot / Kusama validator setup.

### Other References

- [How to run a Polkadot node (Docker)](https://medium.com/@acvlls/setting-up-a-maintain-the-easy-way-3a885283091f)
- [A Serverless Failover Solution for Web3.0 Validator Nodes](https://medium.com/hackernoon/a-serverless-failover-solution-for-web-3-0-validator-nodes-e26b9d24c71d) -
  Blog that details how to create a robust failover solution for running validators.
- [VPS list](../maintain/kusama/maintain-guides-how-to-validate-kusama.md##vps-list)
- [Polkadot Validator Lounge](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) -
  A place to chat about being a validator.
- [Slashing Consequences](learn-staking#slashing) - Learn more about slashing consequences for
  running a validator node.
- [Why You Should be A Validator on Polkadot and Kusama](https://www.youtube.com/watch?v=0EmP0s6JOW4&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=2)
- [Roles and Responsibilities of a Validator](https://www.youtube.com/watch?v=riVg_Up_fCg&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=15)
- [Validating on Polkadot](https://www.crowdcast.io/e/validating-on-polkadot) - An explanation of
  how to validate on Polkadot, with Joe Petrowski and David Dorgan of Parity Technologies, along
  with Tim Ogilvie from Staked.

### Security / Key Management

- [Validator Security Overview](https://github.com/w3f/validator-security)

### Monitoring Tools

- [PANIC for Polkadot](https://github.com/SimplyVC/panic_polkadot) - A monitoring and alerting
  solution for Polkadot / Kusama node
- [Polkadot Telemetry Service](https://telemetry.polkadot.io/#list/Kusama%20CC3) - Network
  information, including what nodes are running on a given chain, what software versions they are
  running, and sync status.

### Validator Stats

- [HashQuark Staking Strategy](https://polkacube.hashquark.io/#/polkadot/strategy) - The HashQuark
  staking strategy dashboard helps you choose the optimal set-up to maximize rewards, and provides
  other useful network monitoring tools.
- [Polkastats](https://polkastats.io/) - Polkastats is a cleanly designed dashboard for validator
  statistics.
- [YieldScan](https://yieldscan.app/) - Staking yield maximization platform, designed to minimize
  effort.
- [Subscan Validators Page](https://kusama.subscan.io/validator) - Displays information on the
  current validators - not as tailored for validators as the other sites.
