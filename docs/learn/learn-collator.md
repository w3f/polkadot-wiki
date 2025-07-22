---
title: Collators in Polkadot
description: Understand the role of collators in Polkadot, including block production, state transition proofs, and cross-chain messaging.
---

!!!info
    This page provides a general overview of the role of collators' in the Polkadot ecosystem. For more detailed information you can read the [Parachain Protocol Overview](./learn-parachains-protocol.md).

## Collators' Role

### Rollup Maintainers

Collators maintain rollup chains (parachains) by collecting user transactions and producing state transition proofs for Polkadot's validators. In other words, collators aggregate transactions into parachain block candidates and produce state transition
proofs (Proof-of-Validity, PoV) for validators.

Collators maintain a full node for the relay chain and a full node for their particular parachain, meaning they retain all necessary information to author new parablocks and execute transactions like miners do on PoW blockchains. Under normal circumstances, they
will collate and execute transactions to create an unsealed block and provide it with a PoV to one or more validators on a Polkadot core.

Collators are similar to validators on any other blockchain. Still, they do not need to provide security
guarantees because the relay chain provides those as a service to them via [coretime](./learn-agile-coretime.md). If a parachain block is invalid, it will get
rejected by validators.

### Rollup Censorship

The assumption that having more collators is better or more secure is incorrect. On the contrary, too many collators may slow down the network. The only power collators have is transaction censorship. To prevent censorship, a parachain only needs to ensure the collators set is [sufficiently decentralized](../general/web3-and-polkadot.md#decentralization) and that there are some neutral
collators, but not necessarily a majority. Theoretically, the censorship problem is solved by
having just one honest collator.

### Cross-consenus Messaging

Collators are a key element of the [XCM (Cross-Consensus Message Passing Format)](learn-xcm.md). By
being full nodes of the relay chain, they are all aware of each other as peers. This makes it
possible for them to send messages from parachain A to parachain B.

## Collators in the Wild

Blockchains built using Substrate cannot hook onto the relay chain on their own. The
Parity team built the
[Cumulus library](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus/) to address this.
Collators are being used on the [Paseo](https://docs.polkadot.com/develop/parachains/testing/) testnet,
and you can learn more about how they are used with Cumulus via the
[Cumulus](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/polkadot_sdk/cumulus/index.html)
Rust documentation. More information can be found under the
[Cumulus section](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#cumulus) on the build parachain page.

## Guides and Tools

- [Tutorial covering Cumulus and Collators](https://docs.polkadot.com/develop/toolkit/parachains/spawn-chains/zombienet/get-started/)
- [Paseo testnet guide](https://docs.polkadot.com/develop/parachains/testing/)
