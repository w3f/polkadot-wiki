---
id: multisig-apps
title: Polkadot Multisig Apps
sidebar_label: Multisig Apps
description: Multisig Apps in the Polkadot Ecosystem.
keywords: [account, signer, balance, multisig]
slug: ../multisig-apps
---

:::info Community Page

This page is open to contributions from the community. Please follow the
[Wiki contribution guidelines](https://github.com/w3f/polkadot-wiki#contributing-to-documentation)
and add your Governance app to this page.

:::

## Polkasafe

![Polkasafe](https://github.com/w3f/polkadot-wiki/assets/874046/586bf051-a7fb-43c0-957e-0b659d50c9ab)

[Polkasafe](https://polkasafe.xyz) - Your gateway to the Ultimate MultiSig experience on Polkadot.

Gone are the days of cumbersome MultiSig transactions. PolkaSafe redefines the way you interact with
the Polkadot Blockchain, making MultiSig operations not just safer but also incredibly
user-friendly.

- Seamless MultiSig Transactions: With PolkaSafe, initiating, approving, and executing MultiSig
  transactions is a breeze. Whether you're managing funds, delegating responsibilities, or simply
  securing your assets, the platform's intuitive design ensures every step is straightforward.
- Collaborative Asset Management: Engage in collective decision-making with stakeholders, team
  members, or partners. PolkaSafe's collaborative tools make it easy to propose, discuss, and
  finalize MultiSig transactions, ensuring transparency and consensus. Extrinsic Management: Beyond
  standard transactions, PolkaSafe simplifies extrinsics – specialized instructions or functions on
  the Polkadot Blockchain.
- Whether you're interacting with smart contracts, parachains, or other advanced features,
  PolkaSafe's MultiSig capabilities ensure every extrinsic is secure and efficient.
- User-Centric Design: Every feature, from initiating a transaction to diving deep into extrinsics,
  is designed for clarity and ease.

## Multix

:::info Walk-Through Video Tutorial

See [this video tutorial](https://www.youtube.com/watch?v=APxPsawebJw) and
[this article](https://blog.chainsafe.io/multix-a-simple-interface-to-manage-complex-multisigs-on-polkadot-97328be26f9d)
for more information about using [Multix](https://multix.chainsafe.io/) for multisig accounts.

:::

The [Multix tool](https://multix.chainsafe.io/) is an easy-to-use interface to manage complex
multisigs. The tool is part of
[the open-source Polkadot/Kusama Tech Stack](https://wiki.polkadot.network/docs/build-open-source#user-interface).
Besides being user-friendly, Multix provides several benefits compared to the Polkadot-JS UI:

- When one person creates the multisig account, all the signatories see the multisig account on
  their interface.
- There is no need to pass around the call data to confirm a transaction. Such information is
  retrieved from the chain and displayed to the users.
- Thanks to the power of [pure proxies](../learn/learn-proxies-pure.md#anonymous-proxy-pure-proxy),
  adding and removing signatories or adjusting the threshold is now possible without creating new
  multisigs and Multix provides an intuitive interface to work with pure proxies.

The pure proxy setup used by [MultiX](https://github.com/ChainSafe/Multix) can be seen on the
[pure proxy page](../learn/learn-proxies-pure.md#scenario-three-multisig-controlling-a-pure-proxy).
