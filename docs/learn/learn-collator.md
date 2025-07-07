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
guarantees because the relay chain provides those as a service to them via coretime. If a parachain block is invalid, it will get
rejected by validators. The validators are required to check the validity of submitted candidates,
followed by issuing and collecting statements about the validity of candidates to other validators.
This process is known as **candidate backing**. Validators receive an arbitrary number of parachain
candidates with associated PoV from untrusted collators. A candidate is considered _backable_ when
at least 2/3 of all assigned validators have issued a valid statement about that candidate.

The validator must successfully verify the following conditions in the following order:

1. The candidate does not exceed any parameters in the persisted validation data.

2. The signature of the collator is valid.

3. Validate the candidate by executing the parachain Runtime stored on the relay chain.

Once a candidate meets the criteria for inclusion, the selected relay chain block author
chooses any backable candidates for each parachain and includes them in the relay
chain block. We say the candidate blocks are _backed_.

### Rollup Censorship

The assumption that having more collators is better or more secure is incorrect. On the contrary, too many collators may slow down the network. The only power collators have is transaction censorship. To prevent censorship, a parachain only needs to ensure the collators set is sufficiently decentralized and that there are some neutral
collators, but not necessarily a majority. Theoretically, the censorship problem is solved by
having just one honest collator.

### Cross-consenus Messaging

Collators are a key element of the [XCM (Cross-Consensus Message Passing Format)](learn-xcm.md). By
being full nodes of the relay chain, they are all aware of each other as peers. This makes it
possible for them to send messages from parachain A to parachain B.

## Taking the Case for One Parachain

The start of a new block candidate is initiated with a block creation time. The collator aggregates
all new transactions at the end of the process. When doing so, the collator signs the _parachain
block candidate_ and produces state transition proofs (Proof-of-Validity, PoV), a summary
of the final account balances caused by the transactions in the candidate block. The collator sends
the candidate block and PoV to the parachain validators, so-called para-validators. The
para-validators verify the transactions within the parachain block candidate. Upon verification, and
if all is well, the candidate becomes _backable_ and a para-validator shares the candidate block
with the relay chain.

![parachain candidate block diagram](../assets/polkadot-consensus-example-1.png)

The validators on the relay chain will try to reach a consensus on the block candidate. Upon
reaching consensus, the now validated block candidate is shared with the validators and collators,
and the process repeats for new transactions. A collator cannot continue building blocks on a
parachain until the block candidate they proposed to the relay chain validators has been validated.
A block is produced every 6 seconds.

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
- [polkadot-launch](https://github.com/shawntabrizi/polkadot-launch) - a tool to quickly spin up a local Polkadot testnet.
