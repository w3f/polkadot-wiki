---
id: learn-availability
title: Availability and Validity
sidebar_label: Availability and Validity
description: Learn about Polkadot's approach to sharding.
keywords: [availability, validity, sharding, AnV]
slug: ../learn-availability
---

The [Availability and Validity](https://spec.polkadot.network/#chapter-anv) (AnV) protocol of
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} allows the network to be efficiently
sharded among parachains while maintaining strong security guarantees.

## Phases of the AnV protocol

There are five phases of the Availability and the Validity protocol.

1. Parachain phase.
2. Relay Chain submission phase.
3. Availability and unavailability subprotocols.
4. Secondary GRANDPA approval validity checks.
5. Invocation of a Byzantine fault tolerant _finality gadget_ to cement the chain.

### Parachain phase

The parachain phase of AnV is when the _collator_ of a parachain proposes a _candidate block_ to the
validators that are currently assigned to the parachain.

:::note Candidate block

A candidate block is a new block from a parachain collator that may or may not be valid and must go
through validity checks before being included into the Relay Chain.

:::

### Relay Chain submission phase

The validators then check the candidate block against the verification function exposed by that
parachain's registered code. If the verification succeeds, then the validators will pass the
candidate block to the other validators in the gossip network. However, if the verification fails,
the validators immediately reject the candidate block as invalid.

Validators need to determine their assignments for each parachain and issue approvals for valid
candidates, respectively disputes for invalid candidates. Since it cannot be expected that each
validator verifies every single parachain candidate, this mechanism ensures that enough honest
validators are selected to verify parachain candidates in order prevent the finalization of invalid
blocks. If an honest validator detects an invalid block which was approved by one or more
validators, the honest validator must issue a disputes which wil cause escalations, resulting in
consequences for all malicious parties.

When more than half of the parachain validators agree that a particular parachain block candidate is
a valid state transition, they prepare a _candidate receipt_. The candidate receipt is what will
eventually be included into the Relay Chain state. It includes:

- The parachain ID.
- The collator's ID and signature.
- A hash of the parent block's candidate receipt.
- A Merkle root of the block's erasure-coded pieces.
- A Merkle root of any outgoing messages.
- A hash of the block.
- The state root of the parachain before block execution.
- The state root of the parachain after block execution.

This information is **constant size** while the actual PoV block of the parachain can be variable
length. It is enough information for anyone that obtains the full PoV block to verify the state
transition contained inside of it.

### Availability and unavailability subprotocols

During the availability and unavailability phases, the validators gossip the
[erasure coded](#erasure-codes) pieces among the network. At least 1/3 + 1 validators must report
that they possess their piece of the code word. Once this threshold of validators has been reached,
the network can consider the PoV block of the parachain _available_.

## Erasure Codes

Erasure coding transforms a message into a longer _code_ that allows for the original message to be
recovered from a subset of the code and in absence of some portion of the code. A code is the
original message padded with some extra data that enables the reconstruction of the code in the case
of erasures.

The type of erasure codes used by {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s
availability scheme are [Reed-Solomon][reed solomon] codes, which already enjoys a battle-tested
application in technology outside the blockchain industry. One example is found in the compact disk
industry. CDs use Reed-Solomon codes to correct any missing data due to inconsistencies on the disk
face such as dust particles or scratches.

In {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, the erasure codes are used to
keep parachain state available to the system without requiring all validators to keep tabs on all
the parachains. Instead, validators share smaller pieces of the data and can later reconstruct the
entire data under the assumption that 1/3+1 of the validators can provide their pieces of the data.

:::note

The 1/3+1 threshold of validators that must be responsive in order to construct the full parachain
state data corresponds to {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s security
assumption in regard to Byzantine nodes.

:::

## Fishermen: Deprecated

The idea of Fishermen is that they are full nodes of parachains, like collators, but perform a
different role in relation to the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
network. Instead of packaging the state transitions and producing the next parachain blocks as
collators do, fishermen will watch this process and ensure no invalid state transitions are
included.

**Fishermen are not available on Polkadot or Kusama and are not planned for formal implementation,
despite previous proposals in the
[AnV protocol](https://w3f-research.readthedocs.io/en/latest/polkadot/Availability_and_Validity.html).**

To address the motivation behind the Fishermen design consideration, the current secondary backing
checkers perform a similar role in relation to the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network. From a security standpoint,
security is based on having at least one honest validator either among parachain validators or
secondary checker.

## Further Resources

- [Path of a Parachain Block][life of] - Article by Parity analyst Joe Petrowski expounding on the
  validity checks that a parachain block must pass in order to progress the parachain.
- [Availability and Validity][anv paper] - Paper by the W3F Research Team that specifies the
  availability and validity protocol in detail.

[reed solomon]: https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction
[pruning]: https://example.org
[life of]: https://polkadot.network/the-path-of-a-parachain-block/
[anv paper]:
  https://github.com/w3f/research/tree/85cd4adfccb7d435f21cd9fd249cd1b7f5167537/docs/papers/AnV
