---
id: learn-collator
title: Collator
sidebar_label: Collator
---

Collators maintain [parachains](learn-parachains) by collecting parachain transactions from users
and producing state transition proofs for Relay Chain validators. In other words, collators
maintain parachains by aggregating parachain transactions into parachain block candidates and
producing state transition proofs for validators based on those blocks.

A collator cannot continue building blocks on a parachain until the block candidate they proposed to
the Relay Chain validators has been validated.

Collators maintain a full-node for the Relay Chain, and a full-node for their particular parachain;
meaning they retain all necessary information to be able to author new blocks and execute
transactions in much the same way as miners do on current PoW blockchains. Under normal
circumstances, they will collate and execute transactions to create an unsealed block and provide
it, together with a proof of state transition, to one or more validators responsible for proposing a
parachain block.

Unlike validators, collator nodes do not secure the network. If a parachain block is invalid, it
will get rejected by validators. Therefore the assumption that having more collators is better or
more secure is not correct. On the contrary, too many collators may slow down the network. The only
nefarious power collators have is transaction censorship. To prevent censorship, a parachain only
need ensure that there exist some neutral collators - but not necessarily a majority. Theoretically
the censorship problem is solved with having just one honest collator.

### XCMP

Collators are a key element of [XCMP (Cross-Chain Message Passing)](Due to the way the [Phragmen algorithm](learn-phragmen) generates the solution set, there _may_
exist a minimum number of DOT needed to nominate with in order to receive staking
rewards due to the fact that the solution set needs to be both processed and stored within
a single block: [a target of 6 seconds on Polkadot](faq#what-is-the-block-time-of-the-relay-chain).

A [runtime upgrade](build-protocol-info#runtime-upgrades) moved the logic to process the rewards
for nominators to an [off-chain worker](learn-phragmen#off-chain-phragmén), and now the minimum
DOT required is only limited by the [existential deposit](build-protocol-info#existential-deposit).
If the number of nominators increases dramatically, the solution will be pruned and nominators with
the least amount of stake will once again be pruned and receive no staking rewards to ensure that 
block times remain on target.

See the [Election Solution Set](learn-nominator#the-election-solution-set) section on the
nominator page for more details.
). By being
full-nodes of the Relay Chain, they are all aware of each other as peers. This makes it possible for
them to send messages from parachain A to parachain B.

### Collators in the Wild

Collators are being used on by parachains on many
[Polkadot ecosystem networks](build-guide#polkadot-ecosystem-networks).

### Further Resources

- The primary collator reference implementation is in the 
  [Cumulus repository](https://github.com/paritytech/cumulus/)
- Build a collator in the [Cumulus Workshop](https://substrate.dev/cumulus-workshop/)
- [Parachain Builders guide](build-parachains)
- [polkadot-launch](https://github.com/paritytech/polkadot-launch) - a tool to quickly spin up a
  local Polkadot testnet based on some parameters like number of parachains, collator setup, etc.
