---
id: learn-collator
title: Collator
sidebar_label: Collator
---

Collators maintain parachains by collecting parachain transactions from users and producing state
transition proofs for Relay Chain validators. In other words, collators maintain parachains by
aggregating parachain transactions into parachain block candidates and producing state transition
proofs for validators based on those blocks.

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

Collators are a key element of [XCMP (Cross-Chain Message Passing)](learn-crosschain). By being
full-nodes of the Relay Chain, they are all aware of each other as peers. This makes it possible for
them to send messages from parachain A to parachain B.

### Guides and Tools

- [Workshop covering Cumulus and Collators](https://substrate.dev/cumulus-workshop/)
- [Rococo tesnet guide](https://wiki.polkadot.network/docs/en/build-parachains-rococo)
- [polkadot-launch](https://github.com/shawntabrizi/polkadot-launch) - a tool to quickly spin up a
  local Polkadot testnet based on some parameters like number of parachains, collator setup, etc.
