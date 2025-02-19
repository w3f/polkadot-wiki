---
id: build-integrate-assets
title: Using AssetHub
sidebar_label: Using AssetHub
description: Tools that you can use for integrating assets.
keywords: [assets, integration, api, operations]
slug: ../build-integrate-assets
---

The relay chain does not natively support assets beyond its native token. This functionality exists
in parachains. On both Polkadot and Kusama, this parachain is called Asset Hub.

The Asset Hub provides a first-class interface for creating, managing, and using fungible and
non-fungible assets. The fungible interface is similar to Ethereum's ERC-20 standard. However, the
data structures and stateful operations are encoded directly into the chain's runtime, making
operations fast and fee-efficient.

Beyond merely supporting assets, integrating an Asset Hub into your systems has several benefits for
infrastructure providers and users:

- Support for on-chain assets.
- Significantly lower transaction fees (about 1/10) than the relay chain.
- Significantly lower deposits (1/100) than the relay chain. This includes the existential deposit
  and deposits for proxy/multisig operations.
- Ability to pay transaction fees in certain assets. As in, accounts would **not** need DOT to exist
  on-chain or pay fees.

The Asset Hub will use DOT as its native currency. Users can transfer DOT from the relay chain into
the Asset Hub and use it natively. The relay chain will also accept DOT transfers from the Asset Hub
back to the relay chain for staking, governance, or any other activity.

Using the Asset Hub for DOT/KSM balance transfers will be much more efficient than the relay chain
and is highly recommended. Until domain-specific parachains are built, the relay chain will still
need to be used for staking and governance.

## Assets Basics

See the
[Assets pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/assets) for
the most up-to-date info and reference documentation.

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

The Assets pallet has its interface for dealing with assets. See the [Integration](#integration)
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
[pure proxies](../learn/learn-proxies-pure.md)) on the Asset Hub that
you use on the relay chain. The SS58 encodings are the same; only the chain information (genesis
hash, etc.) will change on transaction construction.

#### Paying Transaction Fees in Another Asset

Users in the Asset Hub can pay the fees of their transactions with assets other than DOT. The only
requirement is that a liquidity pool of the relevant asset against DOT should already exist as a
storage entry of [the Asset Conversion pallet](../learn/learn-asset-conversion-assethub.md).

Technically speaking, this is enabled by
[the `ChargeAssetTxPayment` signed-extension](https://github.com/polkadot-fellows/runtimes/blob/bb52c327360d1098d3b3d36f4eafb40a74636e80/system-parachains/asset-hubs/asset-hub-polkadot/src/lib.rs#L1016)
implemented in the Asset Hub runtime. This signed-extension extends transactions to include an
optional `AssetId` that specifies the asset to be used for payment of both the execution fees and
the optional tip. It defaults to the native token when it is set to `None`. In case it is given,
this `AssetId` has to be an
[XCM `Multilocation`](../learn/xcm/fundamentals/multilocation/summary.md). Once the transaction
is executed in the block, it will emit an `AssetTxFeePaid` event, informing of the account paying
the fees, the amount in the asset paid as fee, the tip (if any), and the asset ID of the asset
paying the fees.

**Handling Pools with Low Liquidity**

Wallets and UIs enabling this functionality should ensure that the user is prompted with the
necessary warnings, such that they do not accidentally spend all of their funds to perform a swap on
a pool with no or low liquidity.

##### How to Build Transactions Paying Fees with Other Assets

- [This repository](https://github.com/bee344/asset-conversion-example/tree/main) contains the
  complete workflow on how to create a liquidity pool for a given asset, add liquidity to it and
  then build a transaction to pays fees with this asset (including fees estimation). It is done with
  several libraries: Polkadot-JS API and Subxt.
- [Example using Asset Transfer API](https://github.com/paritytech/asset-transfer-api/blob/main/examples/polkadot/assetHub/paysWithFeeOriginTransfers/dotToHydrationPaysWithGLMR.ts)
  to do a cross-chain transfer in Polkadot Asset Hub paying fees with GLMR.
- [A simple script](https://github.com/bee344/asset-hub-examples/blob/main/polkadot-js-example/src/foreignAssetTransferWithFee.ts)
  using Polkadot-JS API to do a local transfer of bridged KSM in Polkadot Asset Hub paying fees with
  USDT.

### Foreign Assets

Foreign assets are those assets in Asset Hub whose native blockchain is not Asset Hub. These are
mainly native tokens from other parachains or bridged tokens from other consensus systems (such as
Ethereum). Once a foreign asset has been registered in Asset Hub (by its root origin), users are
enabled to send this token from its native blockchain to Asset Hub and operate with it as if it were
any other asset.

Practically speaking, foreign assets are handled by the `foreign-assets` pallet in Asset Hub, which
is an instance of the Assets pallet. Hence, this pallet exposes the same interface to users and
other pallets as the Assets pallet.

The main difference to take into account for foreign assets is their identifier. Instead of using
integers as identifiers like in the Assets pallet, assets stored in the `foreign-assets` pallet are
identified by
[their XCM multilocation](https://wiki.polkadot.network/docs/learn/xcm/fundamentals/multilocation-summary).

## Integration

The Asset Hub will come with the same tooling suite that Parity Technologies provides for the Relay
Chain, namely [API Sidecar](https://github.com/paritytech/substrate-api-sidecar) and
[TxWrapper Polkadot](https://github.com/paritytech/txwrapper-core/tree/main/packages/txwrapper-polkadot),
as well as the [Asset Transfer API](https://github.com/paritytech/asset-transfer-api). If you have a
technical question or issue about how to use one of the integration tools, please file a GitHub
issue so a developer can help.

### Parachain Node

Using the Asset Hub will require running a parachain node to sync the chain. This is very similar to
running a relay chain node, with the addition of some extra flags. You can follow
[these guidelines](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus#asset-hub-) to set
up an Asset Hub node.

### Asset Transfer API

Asset-transfer-api is a library focused on simplifying the construction of asset transfers for
Substrate-based chains that involve system parachains like Asset Hub (Polkadot and Kusama). It
exposes a reduced set of methods that facilitate users to send transfers to other (para) chains or
locally. You can refer to
[this table](https://github.com/paritytech/asset-transfer-api/tree/main#current-cross-chain-support)
for the current cross-chain support and [here](https://paritytech.github.io/asset-transfer-api/) for
the complete documentation, including installation guide and usage examples.

### Sidecar

API Sidecar is a REST service for relay chain and parachain nodes. It comes with endpoints to query
information about assets and asset balances on the Asset Hub.

- Asset lookups always use the `AssetId` to refer to an asset class. On-chain metadata is subject to
  change and thus unsuitable as a canonical index.
- Please refer to [docs](https://paritytech.github.io/substrate-api-sidecar/dist/) for full usage
  information. Details on options like how to make a historical query are not included here.

Here are the available public instances:

- [Sidecar connected to Polkadot Asset Hub](https://polkadot-asset-hub-public-sidecar.parity-chains.parity.io)
  and
- [Sidecar connected to Kusama Asset Hub](https://kusama-asset-hub-public-sidecar.parity-chains.parity.io)

The purpose of these instances is to allow anyone to check and get a quick overview of the info that
the asset-related endpoints provide.

!!!caution
    These instances should only be used for ad-hoc checks or tests and not for production, heavy testing
    or any other critical purpose.

### Tx Wrapper Polkadot

TxWrapper Polkadot is a library designed to facilitate transaction construction and signing in
offline environments. It comes with asset-specific functions to use on the Asset Hub. When
constructing parachain transactions, you can use `txwrapper-polkadot` exactly as on the relay chain,
but construct transactions with the appropriate parachain metadata like genesis hash, spec version,
and type registry.

### XCM Transfer Monitoring

#### Monitoring of XCM deposits

Thanks to XCM and a growing number of parachains, the relay chain native token can exist across
several blockchains, which means the providers need to monitor cross-chain transfers on top of local
transfers and corresponding `balances.transfer` events.

Usually, DOT is sent and received in the relay chain and in the Asset Hub either with a
[Teleport](https://wiki.polkadot.network/docs/learn-teleport) from
[system parachains](https://wiki.polkadot.network/docs/learn-system-chains) or with a
[Reserve Backed Transfer](https://wiki.polkadot.network/docs/learn-xcm-pallet#transfer-reserve-vs-teleport)
from any other parachain. In both cases, the event emitted when processing the transfer is the
`balances.minted` event. Hence, providers should listen to these events, pointing to an address in
their system. For this, the service provider must query every new block created, loop through the
events array, filter for any `balances.minted` event, and apply the appropriate business logic.

In some special cases, DOT may be sent to the relay chain or the Asset Hub using other XCM instructions, 
like [`Transact`](../learn/xcm/journey/transact.md).
In these cases, the event emitted when processing the transact instruction in the destination chain is 
`balances.transfer`, which is usually emitted during the finalization of the block execution process.

#### Tracking back XCM information

What has been mentioned earlier should be sufficient to confirm that DOT has arrived in a given
account via XCM. However, in some cases, it may be interesting to identify the cross-chain message
that emitted the relevant `balances.minted` event. This can be done as follows:

1. Query the relevant chain `at` the block the `balances.minted` event was emitted.
2. Filter for `messageQueue(Processed)` events. These can be emitted during any phase of the block,
   not just initialization. This event has a parameter `Id`. The value of `Id` identifies the
   cross-chain message received in the relay chain or in the Asset Hub. It can be used to track back
   the message in the origin parachain if needed. Note that a block may contain several
   `messageQueue(Processed)` events corresponding to several cross-chain messages processed for this
   block.

#### Additional Examples of Monitoring XCM Transfers

The two previous sections outline the process of monitoring XCM deposits to specific account(s) and
then tracing back the origin of these deposits. However, the process of tracking an XCM transfer
(hence the events to look for) may vary based on the direction of the XCM message. Here are some
examples to showcase the slight differences:

1. For an XCM transfer from a Parachain to a relay chain
   _([example](https://polkadot.subscan.io/xcm_message/polkadot-3effaf637dd2a3ac5a644ccc693cbf58a6957d84))_:

   - The [event](https://hydradx.subscan.io/extrinsic/5136464-2?event=5136464-7) to look for in the
     Parachain side is called `parachainsystem (UpwardMessageSent)`, and the parameter
     `message_hash` in this event identifies the XCM transfer.
   - The [event](https://polkadot.subscan.io/block/20810935?tab=event&&event=20810935-4) to track in
     the relay chain side is called `messagequeue (Processed)`, and the parameter `id` of the event
     should be the same as the `message_hash` found in the Parachain event.

2. For an XCM transfer from a relay chain to a parachain
   _([example](https://polkadot.subscan.io/xcm_message/polkadot-b2f455ed6ca1b4fdea746dfe8d150c10ec74440e))_:

   - The [event](https://polkadot.subscan.io/extrinsic/20810793-2?event=20810793-53) to look for in
     the relay chain side is called `xcmPallet (sent)`, and the parameter `message_id` in this event
     identifies the XCM transfer.
   - The [event](https://moonbeam.subscan.io/extrinsic/6174523-0?event=6174523-5) to look for in the
     Parachain side is called `dmpqueue (ExecutedDownward)`, and the parameter that identifies the
     XCM message is either called `message_hash` or `message_id`.

3. For an XCM transfer from a System Parachain to a Parachain
   _([example](https://polkadot.subscan.io/xcm_message/polkadot-72ed4496d1cb793e10084170548d5caf622ea338))_:

   - The [event](https://assethub-polkadot.subscan.io/extrinsic/6275027-4?event=6275027-22) to look
     for in the System Parachain side is called `xcmpqueue (XcmpMessageSent)`, and again the
     `message_hash` is one of the parameters of the event.
   - The corresponding [event](https://hydradx.subscan.io/extrinsic/5135860-1?event=5135860-6) in
     the Parachain side is the `xcmpqueue (Success)` and the `message_hash` found in that event
     should have the same value as the one in the System parachain.

#### Monitoring of Failed XCM Transfers

In case that an XCM transfer fails to complete successfully, then we will notice some different
parameters in the events emitted or different events. Below are some examples:

1. From a relay chain to a System Parachain
   _([example](https://polkadot.subscan.io/xcm_message/polkadot-c8d7186edb43a592d65b3b5a87c4ecaac38c5aa2))_:

   - We will see the
     [event](https://assethub-polkadot.subscan.io/extrinsic/4671081-0?event=4671081-1)
     `dmpqueue (ExecutedDownward)` in the System Parachain side with the following parameters:
     - `outcome` with value `Incomplete` and with the type of error which in this example is
       [UntrustedReserveLocation](https://github.com/paritytech/polkadot-sdk/blob/c54ea64af43b522d23bfabb8d917a490c0f23217/polkadot/xcm/src/v2/traits.rs#L43).
     - `message_id` which shows the hash of the XCM Transfer.

2. From a Parachain to another Parachain
   _([example](https://polkadot.subscan.io/xcm_message/polkadot-3e74e95204faa6ecf3c81f5129b85f498b89cff2))_:

   - We will see the [event](https://interlay.subscan.io/extrinsic/3627057-1?event=3627057-8)
     `xcmpqueue (Fail)` in the destination Parachain with the following parameters:
     - `error` which in this example is
       [TooExpensive](https://github.com/paritytech/polkadot-sdk/blob/c54ea64af43b522d23bfabb8d917a490c0f23217/polkadot/xcm/src/v2/traits.rs#L98).
     - `message_hash` which identifies the XCM Transfer.
   - **Note**: there might be another
     [event](https://interlay.subscan.io/extrinsic/3627057-1?event=3627057-7) called
     `polkadotxcm (AssetsTrapped)` which indicates that some assets have been trapped (and hence can
     be claimed).

A great resource to learn more about Error Management in XCM is the Polkadot blog post from Gavin
Wood,
[XCM Part III: Execution and Error Management](https://www.polkadot.network/blog/xcm-part-three-execution-and-error-management).
