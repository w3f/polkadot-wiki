---
title: Validator
description: Validators secure Polkadot's relay chain by staking tokens, validating proofs, and participating in consensus to ensure network security.
---

!!!info
    This page provides a general overview of the role of validators in the Polkadot network. For more detailed information you can read the [Parachain Protocol Overview](./learn-parachains-protocol.md).

Validators secure the [relay chain](learn-architecture.md#relay-chain) by staking DOT,
validating proofs from [collators](./learn-collator.md) and participating in consensus with other validators.

Validators play a crucial role in adding new blocks to the relay chain. They also
guarantee that each rollup chain (or parachain) follows its unique rules and can pass messages with other rollups in a secure environment.

Polkadot's validators perform multiple tasks in the cores and on the chain. This in-core/on-chain dualism is specific to Polkadot and is key to its scalability.

## In-Core Validators

In-core validators (or para-validators) participate in the
[Parachain Phase of the AnV Protocol](./learn-parachains-protocol.md#parachain-phase), and submit
[candidate receipts](./learn-parachains-protocol.md#candidate-receipts) to the relay chain
transaction queue so that a [block author](#block-authors) can include information on the rollup blocks in a fork of the relay chain.

In-core validators work in groups and are selected by the runtime in every epoch to validate rollup blocks for all rollups connected to Polkadot cores. In-core validators are part of the [active validators](../general/chain-state-values.md) randomly selected (per
epoch) to participate in the validation process.

In-core validators verify that the information contained in an assigned set of rollup block candidates is valid. The validators are required to check the validity of submitted candidates,
followed by issuing and collecting statements about the validity of candidates to other validators.
This process is known as **candidate backing** and is described on [the Polkadot's Security Protocol page](./learn-parachains-protocol.md). Validators receive an arbitrary number of rollup block candidates with associated PoV from untrusted collators. A candidate is considered _backable_ when at least 2/3 of all assigned in-core validators have issued a valid statement about that candidate.

The in-core validator must successfully verify the following conditions in the following order:

1. The candidate does not exceed any parameters in the persisted validation data.

2. The signature of the collator is valid.

3. Validate the candidate by executing the rollup runtime stored on the relay chain.

Once a rollup block candidate meets the criteria for backing, the selected relay chain block author
chooses any backable candidates for each rollup chain and adds them to the relay
chain block. We say the candidate blocks are _backed_.

## Block Authors

There are validators on the relay chain who participate in the consensus mechanism to produce the
relay chain blocks based on validity statements from other validators. These validators are called
block authors. They are selected by [BABE](./learn-consensus.md#block-production-babe) and can note
up to one backable candidate for each rollup chain to include in the relay chain. A backable candidate added to a relay chain block is considered _backed_ in that chain fork.

In a relay chain block, block authors will only include
[candidate receipts](./learn-parachains-protocol.md#candidate-receipts) that have a parent candidate
receipt in an earlier relay chain block. This ensures the rollup chain follows a valid relay chain. Also, the
block authors will only include a receipt for which they have an erasure coding chunk (from the data availability scheme), ensuring that
the system can perform the next round of availability and validity checks.

## Data Availability

Once the
candidate is backed in a fork of the relay chain, it is still _pending availability_, i.e., it is not
fully included (only tentatively included) as part of the relay chain until it is proven available
(together with the PoV). Validators also contribute to the so-called **availability distribution**. The data availability scheme consists in the distribution by in-core validators of the candidate block information in the form of erasure codes. Information regarding the candidate's availability will be noted in
the following relay chain blocks. Only when there is enough information the candidate is considered available and can be included.

## Secondary Checkers

Validators also participate in the so-called
[**approval process**](./learn-parachains-protocol.md#approval-process). Once the parablock is
considered available and included, it is still _pending approval_. Because
in-core validators are a small subset of all validators, there is a risk that the majority of those validators assigned to a core might be dishonest by chance. It is thus necessary to run a secondary verification of the rollup block before it can be considered **approved**. Having a secondary verification step avoids the allocation of more in-core validators that will ultimately reduce the system's throughput. If no disputes arise, the candidate block will be approved.

## Disputes

Any instances of non-compliance with the consensus algorithms result in
[**disputes**](./learn-parachains-protocol.md#disputes) with the [punishment](./learn-offenses.md) of the validators on the
wrong side by removing some or all their staked tokens, thereby discouraging bad actors. Good
performance, however, will be rewarded, with validators receiving block rewards (including
transaction fees) in the form of native tokens in exchange for their activities.

## Deterministic Finality

Finally, validators participate in the
[chain selection process within GRANDPA](./learn-parachains-protocol.md#chain-selection), ensuring that only available and valid blocks end within the finalized relay chain, and all histories converge on one canonical chain.

!!!info "Within an era, roles can change."
    Within the same era, a validator can be on a core or a block author and participate in the availability distribution or approval process. Those roles can change between sessions.

## Path of a Rollup Chain Block

The start of a new block candidate is initiated with a block creation time. The [collator](./learn-collator.md) aggregates
all new transactions and puts them into a rollup chain block candidate. When doing so, the collator signs the _rollup chain block candidate_ and produces state transition proofs (Proof-of-Validity, PoV), a summary
of the final account balances caused by the transactions in the candidate block. The collator sends
the candidate block and PoV to the [in-core validators](#in-core-validators) on a Polkadot core that has been reserved by the rollup chain via [coretime](./learn-agile-coretime.md). The in-core validators verify the transactions within the block candidate. Upon verification, and
if all is well, the candidate becomes _backable_, and some in-core validators share the candidate block with other in-core validators for additional checking. Upon successful checks by 2/3 of in-core validators, a block author can back the candidate into the relay chain. The data availability scheme ensures all validators can verify the validity of the candidate. If no disputes arise, the block can be included in the relay chain every 6 seconds after secondary checks.

The validators on the relay chain will try to reach a consensus on the block candidate. Upon
reaching consensus, the now validated block candidate is shared with the validators and collators,
and the process repeats for new transactions. With the new [pipelining feature (also called asynchronus backing)](./learn-async-backing.md), a collator can continue building new blocks on a rollup while the previous block candidate they proposed to the relay chain validators is being backed. A block is included in the relay chain every 6 seconds.

## Further Readings

- [How to Validate on Polkadot](https://docs.polkadot.com/infrastructure/running-a-validator/#running-a-validator) - Guide on
  how to set up a validator on the Polkadot live network.
- [Validator Payout Overview](https://docs.polkadot.com/infrastructure/staking-mechanics/rewards-payout/) - A short overview on
  how the validator payout mechanism works.
- [How to run your validator as a systemd process](https://docs.polkadot.com/infrastructure/running-a-validator/onboarding-and-offboarding/start-validating/#run-a-validator-using-systemd) -
  Guide on running your validator as a `systemd` process so that it will run in the background and
  start automatically on reboots.
- [How to Upgrade your Validator](https://docs.polkadot.com/infrastructure/running-a-validator/operational-tasks/upgrade-your-node) - Guide for
  securely upgrading your validator when you want to switch to a different machine or begin running
  the latest version of client code.
- [How to Use Validator Setup](https://docs.polkadot.com/infrastructure/running-a-validator/#running-a-validator) - Guide on
  how to use Polkadot / Kusama validator setup.
- [Slashing Consequences](./learn-offenses.md) - Learn more about slashing consequences for running a validator node.

### Other References

- [VPS list](https://docs.polkadot.com/infrastructure/running-a-validator/onboarding-and-offboarding/set-up-validator)
- [Polkadot Validator Lounge](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) -
  A place to chat about being a validator.
- [Polkadot Telemetry Service](https://telemetry.polkadot.io/) - Network
  information, including what nodes are running on a given chain, what software versions they are
  running, and sync status.
- [Subscan Validators Page](https://kusama.subscan.io/validator) - Displays information on the
  current validators - not as tailored for validators as the other sites.
