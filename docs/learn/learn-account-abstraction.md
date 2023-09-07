---
id: learn-account-abstraction
title: Polkadot's Account Abstraction
sidebar_label: Account Abstraction
description: Polkadot's Native Account Abstraction.
keywords: [account, polkadot account, account abstraction, proxy, multisig, batch]
slug: ../learn-account-abstraction
---

## Your Keys, Your Responsibility

Account abstraction addresses the challenges of managing cryptographic keys representing accounts on
blockchains and, more generally, your digital identity. In Web3, you digitally sign any transaction
or, more generally, any message using your private key. Data is recorded on a public ledger (usually
blockchain-based) whose multiple copies of it are stored in computers participating in a P2P
network.

While the account private keys grant users control and ownership, losing them results in losing
access to digital assets and fragmentation of your digital identity since you will need to create a
new account with a new set of keys. This poses a hurdle for both users and developers regarding
security and adoption.

## Definition of Account Abstraction

The term _abstraction_ refers to separating the user experience from the private key, enabling a
piece of code to dictate account behavior. This allows for increased flexibility of accounts that
originally were not engineered to be flexible, and decreased chances of key mismanagement.

Account abstraction introduces a layer of on-chain logic that controls an account, typically in the
form of a smart contract. Without a smart contract abstracting accounts would require changes in the
core architecture of the protocol.

The highly generic codebase of Polkadot's architecture makes accounts natively flexible and abstract
without the direct need for smart contracts.

## Account Abstraction in Polkadot

In Substrate functions come from Origins. For example OpenGov in Polkadot has diferent origins with
different privileges such as allocating treasury funds, etc. Custom origins can be created while
designing you own chain using the Polkadot SDK. Accounts happen to be one variant of Substrate
origin.

While the [Polkadot SDK](https://github.com/paritytech/polkadot-sdk) does not have a single pallet
(module) for complete account abstraction, it incorporates various pallets that collectively achieve
similar functionalities. These include:

- [proxy accounts](./learn-proxies.md) for role-based representation, and ownership representation
  through [pure proxies](./learn-proxies.md#anonymous-proxy-pure-proxy)
- [multi-signature accounts](./learn-account-multisig.md) to control an account using different ones
- account recovery mechanisms such as social recovery to help regain access to your key using
  trusted third-party accounts
- [batching functionality](./learn-balance-transfers.md#batch-transfers) to submit multiple calls in
  one single transaction
- payments with non-native tokens

All the above can be used together, meaning that, for example, you can create a multi-signature
account of pure proxies to keep the same multi-signature account when signatories change.

Additionally, developers have the flexibility to design their own rules for abstraction.

Adopting a generic design is crucial in scaling Web3 technologies. Abstraction and generalization
like account abstraction are crucial steps towards improving user experience and security in
blockchain adoption.

## Further Readings

- [Hackernoon Article](https://hackernoon.com/abstracting-away-account-abstraction-on-polkadot) by
  [Bader Youssef](../general/contributors.md#bader-youssef) - "Abstracting Away Account Abstraction
  on Polkadot"
- [Parity Blog Post](https://www.parity.io/blog/building-a-hot-wallet-with-substrate-primitives/) by
  Joe Petrowski - "Building a Hot Wallet with Substrate Primitives"