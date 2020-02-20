---
id: learn-availability
title: Availability and Validity
sidebar_label: Availability and Validity
---

The Availability and Validity protocol of Polkadot is what allows for the network
to be efficiently sharded among parachains while maintaining strong security
guarantees.

## Erasure Codes

Erasure coding transforms a message into a longer _code word_ that allows for the
original message to be recovered from a subset of the code word and in absence
of some portion of the code word.

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
assumption that no more than 2/3 of the validators can be Byzantine. 

## Fishermen

Fishermen are full nodes of parachains, same as collators, but perform a different
role in relationship to the Polkadot network. Instead of packaging the state
transitions and producing the next parachain blocks as collators do, fishermen
will watch this process and ensure no invalid state transitions are included.
Fishermen will be moderately staked on the Relay Chain, unlike collators that 
require no stake on the Relay Chain. Fishermen will submit invalidity reports
if they find a misconduct has occurred during the production of a parachain.
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
will likely be the storage of maintaining the data for each of the parachains
that are being fished. However, improvements such as [pruning][pruning] mean
that the eventual storage size needed to maintain a full node of a parachain
will level off at a non-exorbitant amount. RAM and CPU requirements will likely
scale with the amount of parachains being fished, with low to moderate requirements
for fishing one parachain and increasing from there. A $10 or $20 /month cloud
instance will be enough to get started.

**Note:** Fishermen are not available on Kusama or Polkadot yet! This page will
be updated with a guide on setting one up once it becomes possible.

### On submission of an invalidity report


[reed solomon]: https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction
[pruning]: https://example.org