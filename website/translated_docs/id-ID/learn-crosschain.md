---
id: learn-crosschain
title: Berlalunya pesan lintas-rantai (XCMP)
sidebar_label: Berlalunya pesan lintas-rantai (XCMP)
---

Cross-chain transactions are resolved using a simple queuing mechanism based around a Merkle tree to ensure fidelity. It is the task of the Relay Chain validators to move transactions on the output queue of one parachain into the input queue of the destination parachain.

The input and output queue are sometimes referred to in the codebase as "ingress" and "egress" messages.

## Tinjauan

- Cross-chain messages will _not_ go on to the Relay Chain.
- Pesan lintas rantai akan dibatasi hingga ukuran maksimum dalam byte.
- Parachains are allowed to block messages from other parachains, in which case the dispatching parachain would be aware of this block.
- Node kolator bertanggung jawab untuk merutekan pesan antar rantai.
- Collators produce a list of "egress" messages and will receive the "ingress" messages from other parachains.
- Di setiap blok, parachains diharapkan untuk merutekan pesan dari beberapa subset dari semua parachain lainnya.
- When a collator produces a new block to hand off to a validator, it will collect the latest ingress queue information and process it.
- Validators will check a proof that the new candidate for the next parachain block includes the processing of the expected ingress messages to that parachain.

## Contoh

A smart contract that exists on parachain A will route a message to parachain B in which another smart contract is called that makes a transfer of some assets within that chain.

Charlie executes the smart contract on parachain A, which initiates a new cross-chain message for the destination of a smart contract on parachain B.

The collator node of parachain A will place this new cross-chain message into its outbound messages queue, along with a `destination` and a `timestamp`.

The collator node of parachain B routinely pings all other collator nodes asking for new messages (filtering by the `destination` field). When the collator of parachain B makes its next ping, it will see this new message on parachain A and add it into its own inbound queue for processing into the next block.

Validators for parachain A will also read the outbound queue and know the message. Validators for parachain B will do the same. This is so that they will be able to verify the message transmission happened.

When the collator of parachain B is building the next block in its chain, it will process the new message in its inbound queue as well as any other messages it may have found/received.

During processing, the message will execute the smart contract on parachain B and complete the asset transfer like intended.

The collator now hands this block to the validator, which itself will verify that this message was processed. If the message was processed and all other aspects of the block are valid, the validator will include this block for parachain B into the Relay Chain.

## Sumber daya

- [XCMP Scheme](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Full technical description of cross-chain communication on the Web3 Foundation research wiki.
