---
id: learn-availability
title: Availability and Validity
sidebar_label: Availability and Validity
---

The Availability and Validity (AnV) protocol of Polkadot is what allows for the
network to be efficiently sharded among parachains while maintaining strong 
security guarantees.

## Phases of the AnV protocol

There are six phases of the Availability and the Validity protocol.

1. Parachain phase.
2. Relay chain submission phase.
3. Availability and unavailability subprotocols.
4. Secondary GRANDPA approval validity checks.
5. Objection procedure for fishermen.
6. Invokation of a Byzantine fault tolerant _finality gadget_ to cement the chain.

### Parachain phase

The parachain phase of AnV is when the _collator_ of a parachain proposes a 
_candidate block_ to the validators that are currently assigned to the parachain.

> A __candidate block__ is a new block from a parachain collator that may or
> may not be valid and must go through validity checks before being included
> into the Relay Chain.

### Relay chain submission phase

The validators then check the candidate block against the verification function
exposed by that parachain's registered code. If the verification succeeds, then
the validators will pass the candidate block to the other validators in the gossip
network. However, if the verification fails, the validators immediately reject
the candidate block as invalid.

When more than half of the parachain validators agree that a particular parachain
block candidate is a valid state transition, they prepare a _candidate receipt_.
The candidate receipt is what will eventually be included into the Relay Chain
state. It includes:

- The parachain ID.
- The collator's ID and signature.
- A hash of the parent block's candidate receipt.
- A Merkle root of the block's erasure coded pieces.
- A Merkle root of any outgoing messages.
- A hash of the block.
- The state root of the parachain before block execution.
- The state root of the parachain after block execution.

This information is __constant size__ while the actual PoV block of the parachain
can be variable length. It is enough information for anyone that obtains the full
PoV block to verify the state transition contained inside of it.

### Availability and unavailability subprotocols

During the availability and unavailability phases, the validators gossip the
[erasure coded](#erasure-codes) pieces among the network. At least 1/3 + 1
validators must report that they possess their piece of the code word. Once
this threshold of validators has been reached, the network can consider the PoV
block of the parachain _available_.

## Erasure Codes

Erasure coding transforms a message into a longer _code_ that allows for the
original message to be recovered from a subset of the code and in absence
of some portion of the code. A code is the original message padded with some
extra data that enables the reconstruction of the code in the case of erasures.

The type of erasure codes used by Polkadot's availability scheme are
[Reed-Solomon][reed solomon] codes, which already enjoys a battle-tested
application in technology outside the blockchain industry. One example is found
in the compact disk industry. CDs use Reed-Solomon codes to correct any missing
data due to inconsistencies on the disk face such as dust particles or scratches.

In Polkadot, the erasure codes are used to keep parachain state available to the
system without requiring all validators to keep tabs on all the parachains.
Instead, validators share smaller pieces of the data and can later reconstruct
the entire data under the assumption that 1/3+1 of the validators can provide
their individual pieces of the data.

**Note:** The 1/3+1 threshold of validators that must be responsive in order to
construct the full parachain state data corresponds to Polkadot's security
assumption in regard to Byzantine nodes.

## Fishermen

Fishermen are full nodes of parachains, same as collators, but perform a different
role in relationship to the Polkadot network. Instead of packaging the state
transitions and producing the next parachain blocks as collators do, fishermen
will watch this process and ensure no invalid state transitions are included.
Fishermen will be moderately staked on the Relay Chain, unlike collators that 
require no stake on the Relay Chain. Fishermen will submit invalidity reports
if they find that misconduct has occurred during the production of a parachain.
If they are proven right about the reported misconduct, they will be handsomely
rewarded, but they risk losing their stake if they're proven wrong. For this
reason, fishermen are similar to bounty hunters that get a large payout on
completing a job but no steady payout otherwise.

### How to run a fisherman node

It is expected that the requirements of running a fisherman will be moderate
compared to the staking requirements of validator nodes. Some amount of tokens
will be needed to register the "fishing" status on the Relay Chain. These tokens
can be potentially slashed by the protocol if the fisherman submits an incorrect
invalidity report. The slashing risk is to prevent fishermen from spamming the
network since the reconstruction of parachain state is an expensive procedure
for the Relay Chain to process.

On the hardware end of requirements, a moderately powerful machine should be
capable of running a full node of one or more parachains. The biggest requirement
will likely be the storage of data for each of the parachains
that are being fished. However, improvements such as [pruning][pruning] mean
that the eventual storage size needed to maintain a full node of a parachain
will level off at a non-exorbitant amount. RAM and CPU requirements will likely
scale with the amount of parachains being fished, with low to moderate requirements
for fishing one parachain and increasing from there. A $10 or $20 /month cloud
instance will be enough to get started.

**Note:** Fishermen are not available on Kusama or Polkadot yet! This page will
be updated with a guide on setting one up once it becomes possible.

## Further Resources

- [Life of a Parachain Block][life of] - Article by Parity analyst Joe Petrowski
  expounding on the validity checks that a parachain block must pass in order to
  progress the parachain.
- [Availability and Validity][anv paper] - Paper by the W3F Research Team that
  specifies the availability and validity protocol in detail.

[reed solomon]: https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction
[pruning]: https://example.org
[life of]: https://polkadot.network/the-path-of-a-parachain-block/
[anv paper]: https://github.com/w3f/research/tree/85cd4adfccb7d435f21cd9fd249cd1b7f5167537/docs/papers/AnV
