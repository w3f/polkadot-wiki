---
id: learn-validator
title: Validator
sidebar_label: Validator
description: An introduction about validators.
keywords: [validate, validator, maintain, NPoS, stake]
slug: ../learn-validator
---

import RPC from "./../../components/RPC-Connection";

## Validators' Role

:::info

This page provides a general overview of the role of validators in
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}. For more detailed information you
can read the Protocol Overview Section in
[The Polkadot Parachain Host Implementers' Guide](https://paritytech.github.io/polkadot/book/protocol-overview.html).

:::

Validators secure the [relay chain](learn-architecture.md#relay-chain) by staking
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}, validating proofs from collators and
participating in consensus with other validators.

Validators play a crucial role in adding new blocks to the relay chain and, by extension, to all
parachains. This allows parties to complete cross-chain transactions via the relay chain. Parachain
validators (i.e. para-validators) participate in some form of off-chain consensus, and submit
candidate receipts to the tx pool for a block producer to include on-chain. The relay chain
validators guarantee that each parachain follows its unique rules and can pass messages between
shards in a trust-free environment.

Para-validators work in groups and are selected in every epoch to validate parachain blocks for all
parachains connected to the relay chain.

The selected para-validators are one of
{{ polkadot: <RPC network="polkadot" path="query.staking.validatorCount" defaultValue={297}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="query.staking.validatorCount" defaultValue={1000}/> :kusama }}
validators randomly selected (per epoch) to participate in the validation, creating a validator pool
of 200 para-validators.

Validators perform two main functions:

1. **Verifying** that the information contained in an assigned set of parachain blocks is valid.
   They receive parachain block candidates from the [collators](./learn-collator.md) together with a
   Proof-of-Validity (PoV). The para-validators then check if the block candidates are valid.
   Candidates that gather enough signed validity statements are considered _backable_.
2. **Participating** in the consensus mechanism to produce the relay chain blocks based on validity
   statements from other validators. These validators are called block authors, they are selected by
   [BABE](./learn-consensus.md/#block-production-babe) and can note up to one backable candidate for
   each parachain to include in the relay chain. A backable candidate included in the relay chain is
   considered _backed_ in that fork of the chain.

Validators also participate to the so-called **availability distribution**. In fact, once the
candidate is backed in a fork of the relay chain, it is still _pending availability_, i.e. it is not
included as part of the parachain until it is proven avaialable (together with the PoV). Information
regarding the availability of the candidate will be noted in the following relay chain blocks. Only
when there is enough information, the candidate is considered a full parachain block or _parablock_.

Validators also participate to the so-called [**approval process**](#approval-process). Once the
parablock is considered available and part of the parachain, it is still _pending approval_. Because
para-validators are a small subset of all validators, there a risk that by chance the majority of
para-validators assigned to a parachain might be dishonest. It is thus necessary to run a secondary
verification of the parablock before it can be considered approved. Having a secondary verification
step avoids the allocation of more para-validators that will ultimately reduce the throughput of the
system.

Any instances of non-compliance with the consensus algorithms result in **disputes** with the
punishment of the validators on the wrong side by removing some or all their staked
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}, thereby discouraging bad actors. Good
performance, however, will be rewarded, with validators receiving block rewards (including
transaction fees) in the form of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} in exchange
for their activities.

:::info

For detailed information about disputes see dedicated section in
[The Polkadot Parachain Host Implementers' Guide](https://paritytech.github.io/polkadot/book/protocol-disputes.html).

:::

## Approval Process

Having a bad parablock on the relay chain is not catastrophic as long as the block is not approved
and finalized by the finality gadget [GRANDPA](./learn-consensus.md/#finality-gadget-grandpa). If
the block is not finalized, the fork on the chain containing that block can be ignored in favor of
another fork containing good blocks. Dealing with a bad parablock includes the following stages:

- Detection: the bad block must be detected by honest validators.
- Escalation: the honest validators must send that block for checks to all validators. A dispute
  starts.
- Consequences: the chain is reverted and all malicious validators are slashed.

The result of the dispute must be transplantable to all other forks so that malicious validators are
slashed in all possible histories and so that honest validators will ignore any forks containing
that parablock.

The Approval Process is divided into two parts:

- **Assignments** determine which validators perform approval checks on which candidates, ensuring
  each candidate receives enough random checkers. This stage tracks approval votes to identify when
  "no show" approval checks takes suspiciously long. It also tracks relay chain
  [equivocations](../maintain/maintain-guides-best-practices-to-avoid-slashes.md/#equivocation) to
  determine when adversaries possibly gained foreknowledge about assignments and adding more checks
  in those cases.
- **Approval checks** performs the checks by obtaining the candidate, verify its validity, and
  sending out the approval vote or initiating a dispute.

These two steps first run as off-chain consensus protocols using messages gossiped among all
validators, and then as on-chain record of those protocols' progress. The on-chain protocol is
needed to provide rewards for the off-chain protocol. The gossiped messages are of two types,
assignment notices and approval votes, and are singed with
[session keys](./learn-cryptography.md/#session-keys).

:::info

For detailed information about the approval process see dedicated section in
[The Polkadot Parachain Host Implementers' Guide](https://paritytech.github.io/polkadot/book/protocol-approval.html).

:::

Accepting a parablock is the end result of having passed through the detection stage without
dispute, or having passed through and escalation/dispute stage with a positive outcome.

### Parablocks vs Relay-Chain blocks

It is important to understand that a relay chain block contains many parablocks. Thus, it makes more
sense to think of relay-chain blocks as having been approvead instead of parablocks have been
approved. A rely-chain block containing a bad parablock must be reverted, while a relay-chain block
containing only approved parablocks can be considered approved as long as its parent relay-chain
block is also approved. Thus, the validity of a relay-chain block depends on the validity of its
ancestry.

## Guides

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
- [How to Use Validator Setup](../maintain/maintain-guides-how-to-use-polkadot-validator-setup.md) -
  Guide on how to use Polkadot / Kusama validator setup.

## Other References

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

## Security / Key Management

- [Validator Security Overview](https://github.com/w3f/validator-security)

## Monitoring Tools

- [PANIC for Polkadot](https://github.com/SimplyVC/panic_polkadot) - A monitoring and alerting
  solution for Polkadot / Kusama node
- [Polkadot Telemetry Service](https://telemetry.polkadot.io/#list/Kusama%20CC3) - Network
  information, including what nodes are running on a given chain, what software versions they are
  running, and sync status.

## Validator Stats

- [HashQuark Staking Strategy](https://polkacube.hashquark.io/#/polkadot/strategy) - The HashQuark
  staking strategy dashboard helps you choose the optimal set-up to maximize rewards, and provides
  other useful network monitoring tools.
- [Polkastats](https://polkastats.io/) - Polkastats is a cleanly designed dashboard for validator
  statistics.
- [YieldScan](https://yieldscan.app/) - Staking yield maximization platform, designed to minimize
  effort.
- [Subscan Validators Page](https://kusama.subscan.io/validator) - Displays information on the
  current validators - not as tailored for validators as the other sites.
