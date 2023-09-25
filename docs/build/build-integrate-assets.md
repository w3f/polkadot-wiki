---
id: build-integrate-assets
title: Assets on Polkadot
sidebar_label: Integrating Assets
description: Tools that you can use to integrating assets.
keywords: [assets, integration, api, operations]
slug: ../build-integrate-assets
---

The {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Relay Chain does not natively
support assets beyond {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. This functionality
exists in parachains. On both Polkadot and Kusama, this parachain is called Asset Hub.

The Asset Hub provides a first-class interface for creating, managing, and using both fungible and
non-fungible assets. The fungible interface is similar to Ethereum's ERC-20 standard. However, the
data structures and stateful operations are encoded directly into the chain's runtime, making
operations fast and fee-efficient.

Beyond merely supporting assets, integrating an Asset Hub into your systems has several benefits for
infrastructure providers and users:

- Support for on-chain assets.
- Significantly lower transaction fees (about 1/10) than the Relay Chain.
- Significantly lower deposits (1/10) than the Relay Chain. This includes the existential deposit
  and deposits for proxy/multisig operations.
- Ability to pay transaction fees in certain assets. As in, accounts would **not** need DOT in order
  to exist on-chain nor to pay fees.

The Asset Hub will use DOT as its native currency. Users can transfer DOT from the Relay Chain into
the Asset Hub and use it natively. The Relay Chain will also accept DOT transfers from the Asset Hub
back to the Relay Chain to use for staking, governance, or any other activity taking place there.

Using the Asset Hub for DOT/KSM balance transfers will be much more efficient than the Relay Chain
and is highly recommended. Until domain specific parachains are built, the Relay Chain will still
need to be used for staking and governance.

## Assets Basics

See the [Assets pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/assets)
for the most up-to-date info and reference documentation.

Assets are stored as a map from an ID to information about the asset, including a management team,
total supply, total number of accounts, its sufficiency for account existence, and more.
Additionally, the asset owner can register metadata like the name, symbol, and number of decimals
for representation.

Some assets, as determined by on-chain governance, are regarded as “sufficient”. Sufficiency means
that the asset balance is enough to create the account on-chain, with no need for the DOT/KSM
existential deposit. Likewise, you cannot send a non-sufficient asset to an account that does not
exist. Sufficient assets can be used to pay transaction fees (i.e. there is no need to hold DOT/KSM
on the account).

Assets do have a minimum balance (set by the creator), and if an account drops below that balance,
the dust is lost.

### Asset Operations

The Assets pallet has its own interface for dealing with assets. See the [Integration](#integration)
section below for how to fetch information and construct transactions.

The main functions you will probably interact with are `transfer` and `transfer_keep_alive`. These
functions transfer some `amount` (balance) of an `AssetId` (a `u32`, not a contract address) to
another account.

The Assets pallet also provides an `approve_transfer`, `cancel_approval`, and `transfer_approved`
interface for non-custodial operations.

Asset transfers will result in an `assets.transferred` event. The same instructions for
[monitoring events and **not** transactions](build-protocol-info.md#events) applies to asset
transfers.

Note that you can use the same addresses (except
[pure proxies](../learn/learn-proxies-pure.md#anonymous-proxy-pure-proxy)!) on the Asset Hub that
you use on the Relay Chain. The SS58 encodings are the same, only the chain information (genesis
hash, etc.) will change on transaction construction.

## Integration

The Asset Hub will come with the same tooling suite that Parity Technologies provides for the Relay
Chain, namely [API Sidecar](https://github.com/paritytech/substrate-api-sidecar) and
[TxWrapper Polkadot](https://github.com/paritytech/txwrapper-core/tree/main/packages/txwrapper-polkadot),
as well as the [Asset Transfer API](https://github.com/paritytech/asset-transfer-api).
If you have a technical question or issue about how to use one of the integration tools please file
a GitHub issue so a developer can help.

### Parachain Node

Using the Asset Hub will require running a parachain node to sync the chain. This is very similar to
running a {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} node, with the addition of
some extra flags. You can follow
[these guidelines](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus#asset-hub-) to set up
an Asset Hub node.

### Asset Transfer API

Asset-transfer-api is a library focused on simplifying the construction of asset transfers for Substrate 
based chains that involves system parachains like Asset Hub (Polkadot and Kusama). It exposes a reduced 
set of methods which facilitates users to send transfers to other (para) chains or locally. You can refer
to [this table](https://github.com/paritytech/asset-transfer-api/tree/main#current-cross-chain-support)
for the current cross-chain support and [here](https://paritytech.github.io/asset-transfer-api/) for the
full documentation, including installation guide and usage examples.

### Sidecar

API Sidecar is a REST service for Relay Chain and parachain nodes. It comes with endpoints to query
information about assets and asset balances on the Asset Hub.

- Asset lookups will always use the `AssetId` to refer to an asset class. On-chain metadata is
  subject to change and thus not suitable as a canonical index.
- Please refer to [docs](https://paritytech.github.io/substrate-api-sidecar/dist/) for full usage
  information. Details on options like how to make a historical query are not included here.

Here are the available public instances:

- [Sidecar connected to Polkadot Asset Hub](https://polkadot-asset-hub-public-sidecar.parity-chains.parity.io)
  and
- [Sidecar connected to Kusama Asset Hub](https://kusama-asset-hub-public-sidecar.parity-chains.parity.io)

The purpose of these instances is to allow anyone to check and get a quick overview of the info that
the asset-related endpoints provide.

:::caution

These instances should only be used for ad-hoc checks or tests and not for production, heavy testing
or any other critical purpose.

:::

### Tx Wrapper Polkadot

TxWrapper Polkadot is a library designed to facilitate transaction construction and signing in
offline environments. It comes with a set of asset-specific functions to use on the Asset Hub. When
constructing parachain transactions, you can use `txwrapper-polkadot` exactly as on the Relay Chain,
but construct transactions with the appropriate parachain metadata like genesis hash, spec
version, and type registry.
