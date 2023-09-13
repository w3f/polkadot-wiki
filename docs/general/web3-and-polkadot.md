---
id: web3-and-polkadot
title: Web3 and Polkadot
sidebar_label: Web3 and Polkadot
description: Introduction to Web3 and Polkadot's Role in shaping the Web3 Vision.
keywords: [web3, polkadot, light clients, decentralization]
slug: ../web3-and-polkadot
---

Web3 is an interactive and collaborative web where users can read, write and **own** data.

## Data Ownership

In web3, ownership is achieved through cryptography. Each user has a digital identity bound to a set
of cryptographic keys usually based on the public key cryptographic scheme, i.e. the famous **public
and private key pair**.

Users onboarding into the web3 journey must generate a key pair. The public key is the identity that
can be shared with anybody to send you messages, while the private key is used to access your
account, sign messages, transfer funds, edit identity details, etc.
[Keeping your private key secure](./scams.md) and inaccessible to third parties is essential to
avoid identity theft with consequent loss of funds, and it is one of the main factors hindering web3
adoption.

Nobody will ever ask you to share your private key, and who will attempts to do so will likely
attempt to steal your digital identity and anything you own related to it.

To mitigate risks of key mismanagement (for **non-custodial** accounts, i.e. when you have custody
of your keys) there are the following two main options:

- account abstraction solutions that separate the key management from the user experience
- cold wallet solutions where the private key is generated on dedicated devices that cannot connect
  to the internet (see [Ledger](./ledger.md)), or dedicated applications that can be installed on
  air-gapped devices such as phones (see [Polkadot Vault](./polkadot-vault.md))

For **custodial** option you trust third parties to manage your keys and give you access to them
whenever you need.

To sum up, data ownership comes from the fact that any message you sign with your private key comes
from your digital identity, and the signature proof can be cryptographically verified. Unless
someone else stole your identity, you and only you signed that message.

## Blockchain

But what if we own our data
