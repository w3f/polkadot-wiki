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
can read the Protocol Overview Section in [The Polkadot Parachain Host Implementers' Guide][].

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

Validators also contribute to the so-called **availability distribution**. In fact, once the
candidate is backed in a fork of the relay chain, it is still _pending availability_, i.e. it is not
included as part of the parachain until it is proven avaialable (together with the PoV). Information
regarding the availability of the candidate will be noted in the following relay chain blocks. Only
when there is enough information, the candidate is considered a full parachain block or _parablock_.

Validators also participate in the the so-called [**approval process**](#approval-process). Once the
parablock is considered available and part of the parachain, it is still _pending approval_. Because
para-validators are a small subset of all validators, there is a risk that by chance the majority of
para-validators assigned to a parachain might be dishonest. It is thus necessary to run a secondary
verification of the parablock before it can be considered approved. Having a secondary verification
step avoids the allocation of more para-validators that will ultimately reduce the throughput of the
system.

Any instances of non-compliance with the consensus algorithms result in [**disputes**](#disputes)
with the punishment of the validators on the wrong side by removing some or all their staked
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}, thereby discouraging bad actors. Good
performance, however, will be rewarded, with validators receiving block rewards (including
transaction fees) in the form of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} in exchange
for their activities.

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

:::info Parablocks vs Relay-Chain blocks

It is important to understand that a relay chain block contains many parablocks. Thus, it makes more
sense to think of relay-chain blocks as having been approvead instead of parablocks that have been
approved. A relay-chain block containing a bad parablock must be reverted, while a relay-chain block
containing only approved parablocks can be considered approved as long as its parent relay-chain
block is also approved. Thus, the validity of a relay-chain block depends on the validity of its
ancestry.

:::

The Approval Process is divided into two parts:

- **[Assignments][]** determine which validators perform approval checks on which candidates,
  ensuring each candidate receives enough random checkers. This stage tracks approval votes to
  identify when [no-show][] approval checks take suspiciously long. It also tracks relay chain
  [equivocations](../maintain/maintain-guides-best-practices-to-avoid-slashes.md/#equivocation) to
  determine when adversaries possibly gained foreknowledge about assignments and adding more checks
  in those cases. Assignees determine their own assignments to check specific candidates using two
  or three [assignment criteria][], which are based upon two possible [stories][] about the relay
  chain block that included the candidate (i.e. declared the candidate available). [Assignment
  notices][] are gossiped among nodes so that all validators know which validators should check
  which candidates, and if any candidate requires more checkers.
- **Approval checks** performs the checks by obtaining the candidate, verify its validity, and
  sending out the approval vote or initiating a dispute. Approval checks have a no-show timeout
  window (i.e. longer than one relay chain slot) to succeed in reconstructing the candidate block,
  redo its erasure coding to check the candidate receipt, and recheck the candidate block itself. A
  validator becomes tagged as no-show if does not approve or dispute within the no-show timeout
  window. Because validators can be overloaded with assignments, they can intentionally delay
  sending their assignment notice to avoid creating no-shows (see more in [Assignment
  postponement][]).

These two steps first run as off-chain consensus protocols using messages gossiped among all
validators, and then as on-chain record of those protocols' progress. The on-chain protocol is
needed to provide rewards for the off-chain protocol. The [on-chain verification][] has two phases:
a) assignments notices and approval votes are recorded in a relay chain block, and b) in another
relay chain block notes are fed into the approval code.

The gossiped messages are of two types, assignment notices and approval votes, and are singed with
[approval keys][]. Such keys are part of the [session keys](./learn-cryptography.md/#session-keys)
used by validators. Briefly, approval keys are:

- **Approval assignment keys** that are sr25519 keys used only for assignment criteria
  [VRF](./learn-randomness.md/#vrf).
- **Approval vote keys** that are ed25519 and would only sign off on a candidate parablock validity.

:::info

For detailed information about the approval process see dedicated section in
[The Polkadot Parachain Host Implementers' Guide](https://paritytech.github.io/polkadot/book/protocol-approval.html).

:::

Accepting a parablock is the end result of having passed through the detection stage without
dispute, or having passed through and escalation/dispute stage with a positive outcome.

## Disputes

All parachain blocks that are in the finalized relay chain should be valid. This, does not apply to
backed blocks that are not included. To ensure nothing invalid ends up in the finalized relay chain
there are approval checks (described above) and disputes. The latter ensures that each attempt to
include something invalid is caught and the offending validators are punished.

Disputes are _independent from a particular fork_, while backing and approval operate on particular
forks. The approval voting stops if an alternative fork (which might not contain the
currently-approved candidate) is finalized. In fact, the sole purpose of the approval process is to
make sure invalid blocks are not finalized. However, even though the danger is past and the
offending validators did not manage to get the invalid block approved, those validators need to get
slashed for the attempt.

A dispute stems from a disagreement between two or more validators. For this to happen, a bad actor
needs to distribute an invalid block to honest validators. Scenarios leading to a dispute can be one
of the followings (ordered from most to least important):

- A parablock included on a branch of the relay chain is bad
- A parablock backed on a branch of the relay chain is bad
- A parablock seconded, but not backed on any branch of the relay chain, is bad

Checking a parachain block requires 3 pieces of data: the parachain validator code, the availability
of data, and the candidate receipt. The validator code is available on-chain and published ahead of
time. Thus, a dispute process begins with the availability to ensure the availability of the data.
Such process will conclude quickly if the data is already available, otherwise the initiator of the
dispute must make it available.

Disputes have both off- and on-chain components. Slashing is handled on-chain, so votes by
validators on either sides of the dispute must be placed on-chain. Moreover, a dispute on one branch
of the chain must be transposed to all active branches so that misbehavior can be punished in all
possible histories. There is thus a distinction between _local_ (the one we are looking at) and
_remote_ disputes relative to a particular branch of the relay chain.

Disputes can be divided into three different phases:

- [Dispute initiation][]: Disputes are initiated by any validator who finds their opinion on the
  validity of a parablock in opposition to another issued statement. The initiation begins off-chain
  by only nodes perceiving that a parablock is bad. The validator can be one of the para-validators
  (i.e. one of the backers) or one of the approval checkers. Note that, if the dispute occurs during
  the backing phase, the initiator must make the data available while if the dispute occurs during
  the approval process the data is already available.
- [Dispute participation][]: Once becoming aware of the dispute, all validators must participate.
- [Dispute conclusion][]: Disputes conclude after 2/3 supermajority is reached on either side.
  Disputes may also conclude after a timeout. This will only happen if the majority of validators
  are unable to vote for some reason.

The on-chain component of the dispute can be initiated by providing any two conflicting votes and it
also waits for 2/3 supermajority on either side. The component also tracks which parablocks have
already been disputed so that the same parablock can be disputed only once on any particular branch
of the relay chain. Inclusion is halted for the parachain until the dispute resolves.

:::info

For detailed information about disputes see dedicated section in
[The Polkadot Parachain Host Implementers' Guide](https://paritytech.github.io/polkadot/book/protocol-disputes.html).
In the Guide there are also more details about [disputes' flows][].

:::

## Chain Selection

Chain selection is used to select blocks to build on and finalize. These processes need to
consistent among nodes and resilient to a maximum proportion of malicious nodes. The parachain host
uses a block authoring system and a finality gadget. The chain selection strategy involves a
_[leaf-selection rule][]_ and a set of _[finality constraints][]_.

:::info

For detailed information about chain selection see dedicated section in
[The Polkadot Parachain Host Implementers' Guide](https://paritytech.github.io/polkadot/book/protocol-chain-selection.html).

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
- [How to Use Validator Setup](../maintain/maintain-guides-how-to-use-polkadot-validator-setup.md) -
  Guide on how to use Polkadot / Kusama validator setup.

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

[the polkadot parachain host implementers' guide]: https://paritytech.github.io/polkadot/book/
[assignments]: https://paritytech.github.io/polkadot/book/protocol-approval.html#assignments
[no-show]: https://paritytech.github.io/polkadot/book/protocol-approval.html#no-shows
[assignment criteria]:
  https://paritytech.github.io/polkadot/book/protocol-approval.html#assignment-criteria
[stories]: https://paritytech.github.io/polkadot/book/protocol-approval.html#stories
[approval keys]: https://paritytech.github.io/polkadot/book/protocol-approval.html#approval-keys
[assignment notices]:
  https://paritytech.github.io/polkadot/book/protocol-approval.html#announcements--notices
[assignment postponement]:
  https://paritytech.github.io/polkadot/book/protocol-approval.html#assignment-postponement
[on-chain verification]:
  https://paritytech.github.io/polkadot/book/protocol-approval.html#on-chain-verification
[dispute initiation]: https://paritytech.github.io/polkadot/book/protocol-disputes.html#initiation
[dispute participation]:
  https://paritytech.github.io/polkadot/book/protocol-disputes.html#dispute-participation
[dispute conclusion]:
  https://paritytech.github.io/polkadot/book/protocol-disputes.html#dispute-conclusion
[disputes' flows]: https://paritytech.github.io/polkadot/book/disputes-flow.html
[leaf-selection rule]: https://paritytech.github.io/polkadot/book/protocol-chain-selection.html
[finality constraints]:
  https://paritytech.github.io/polkadot/book/protocol-chain-selection.html#the-best-chain-containing-rule
