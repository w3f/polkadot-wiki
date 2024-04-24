---
id: learn-xcm-docs-config-deep-dive
title: Executor Configuration
sidebar_label: Executor Configuration
description: Deep Dive into the Configuration of the XCM-Executor.
keywords: [xcm, cross-consensus messaging, config]
slug: ../config-deep-dive
---

# Executor Config

As previously mentioned, the xcm-executor is a Cross-Consensus Virtual Machine (XCVM)
implementation. It provides an opinionated interpretation and execution of XCMs. Each chain that
uses the xcm-executor, can configure it for their use case. In this chapter we will go over this
configuration, explain each config item and give some examples of the tools and types that can be
used to configure these items.

## XCM Executor Configuration

Below we list the [Config](https://paritytech.github.io/polkadot/doc/xcm_executor/trait.Config.html)
trait of the xcm-executor. The Config trait expects multiple associated types. Each type has a trait
bound which the concrete type must implement. Some of these types will use a default implementation
in most situations (e.g. RuntimeCall). Other types have a default implementation specified by the
unit type `()`. Most types you'll want to carefully choose which implementation they get. For most
of these types there are pre-defined solutions and building blocks you can use and adapt to your
scenario. These solutions are listed in the xcm-builder
[folder](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm/xcm-builder/src).

We will now explain each type and go over some of the implementations of the type:

```rust, noplayground
/// The trait to parameterize the `XcmExecutor`.
pub trait Config {
	type RuntimeCall: Parameter + Dispatchable<PostInfo = PostDispatchInfo> + GetDispatchInfo;
	type XcmSender: SendXcm;
	type AssetTransactor: TransactAsset;
	type OriginConverter: ConvertOrigin<<Self::RuntimeCall as Dispatchable>::RuntimeOrigin>;
	type IsReserve: ContainsPair<MultiAsset, MultiLocation>;
	type IsTeleporter: ContainsPair<MultiAsset, MultiLocation>;
	type UniversalLocation: Get<InteriorMultiLocation>;
	type Barrier: ShouldExecute;
	type Weigher: WeightBounds<Self::RuntimeCall>;
	type Trader: WeightTrader;
	type ResponseHandler: OnResponse;
	type AssetTrap: DropAssets;
	type AssetClaims: ClaimAssets;
	type AssetLocker: AssetLock;
	type AssetExchanger: AssetExchange;
	type SubscriptionService: VersionChangeNotifier;
	type PalletInstancesInfo: PalletsInfoAccess;
	type MaxAssetsIntoHolding: Get<u32>;
	type FeeManager: FeeManager;
	type MessageExporter: ExportXcm;
	type UniversalAliases: Contains<(MultiLocation, Junction)>;
	type CallDispatcher: CallDispatcher<Self::RuntimeCall>;
	type SafeCallFilter: Contains<Self::RuntimeCall>;
}
```

## How to use multiple implementations.

Some associated types in the Config trait are highly configurable and in certain cases will have
multiple implementations (e.g. Barrier). These implementations are then grouped using a tuple
`(impl_1, impl_2, ..., impl_n)`. The execution of the tuple type is sequential, meaning that each
item is executed one after another. Each item is checked to see whether it fails to pass, then the
next item is checked, and so on. The execution is halted when one of these items returns positive
(Ok or true, etc.). The next example of the Barrier type shows how the grouping works (understanding
each item in the tuple is not necessary).

```rust
pub type Barrier = (
	TakeWeightCredit,
	AllowTopLevelPaidExecutionFrom<Everything>,
	AllowKnownQueryResponses<XcmPallet>,
	AllowSubscriptionsFrom<Everything>,
);

pub struct XcmConfig;
impl xcm_executor::Config for XcmConfig {
    ...
	type Barrier = Barrier;
    ...
}
```

In the above example, when checking the barrier, we'll first check the TakeWeightCredit type. If it
fails, we'll go on to check the `AllowTopLevelPaidExecutionFrom<Everything>` and so on until one of
them gives a positive. If they all fail, a `Barrier` error is thrown.

## Config Items

We now go over each config item to explain what the associate type does and how it is used in the
xcm-executor. Many of these types have pre-defined solutions that can be found in the xcm-builder
and a good way to understand these configurations is to look at example configurations. On the
bottom of this page we listed some examples.

### RuntimeCall

The `RuntimeCall` type is equal to the RuntimeCall created in the `construct_runtime!` macro. It is
an enum of all the callable functions of each of the implemented pallets.

### XcmSender

The `XcmSender` type implements the `SendXcm` trait, and defines how the xcm_executor can send XCMs
(which transport layer it can use for the XCMs). This type normally implements a tuple for one or
more [transport layer(s)](https://wiki.polkadot.network/docs/learn-xcm-transport). For example a
parachain can implement the XcmSender as:

```rust
 (
	// Two routers - use UMP to communicate with the relay chain:
	cumulus_primitives_utility::ParentAsUmp<ParachainSystem, PolkadotXcm, ()>,
	// ..and XCMP to communicate with the sibling chains.
	XcmpQueue,
);
```

If a runtime does not contain the XcmpQueue pallet as a config item for XcmSender, it will not be
able to send messages to other parachains. This can be useful for controlling the destinations that
an XCM can be sent to.

### AssetTransactor

The `AssetTransactor` type implements the `TransactAsset` trait and defines how the xcm-executor can
convert `MultiAsset`s from and to on chain assets and how to transfer these assets between accounts,
or from and to the holding register. As chains can support different types of currencies (native
tokens), fungibles and non-fungibles, we can configure the AssetTransactor in different ways,
depending on the chains implementation fo these types. Three default implementations are provided in
the xcm-builder, namely the `CurrencyAdapter`, `FungiblesAdapter` and `NonFungiblesAdapter`.

### OriginConverter

The `OriginConverter` type implements the `ConvertOrigin` trait and defines how the xcm-executor can
convert a `MultiLocation` into a `RuntimeOrigin`. Most xcm-executors take multiple implementations
in a tuple for this configuration as there are many different MLs we would like to convert. When
multiple `OriginConverter`s conflict, the
[OriginKind](https://paritytech.github.io/polkadot/doc/xcm/v2/enum.OriginKind.html) that is passed
to the `convert_origin` function is used to distingues which `OriginConverter` to use. There are
four different `OriginKind`s :

```rust
pub enum OriginKind {
	Native,
	SovereignAccount,
	Superuser,
	Xcm,
}
```

An example of the use of `OriginKind`s are the `SovereignSignedViaLocation` and
`SignedAccountId32AsNative` OriginConverters (defined in xcm-builder). The first converts an
sovereign account into a `Signed` RuntimeOrigin (uses `SovereignAccount` OriginKind) while the
second converts a local native account into a `Signed` RuntimeOrigin (uses `Native` OriginKind).

```rust
pub type SovereignAccountOf = AccountId32Aliases<ThisNetwork, AccountId>;
(
	// A `Signed` origin of the sovereign account that the original location controls.
	SovereignSignedViaLocation<SovereignAccountOf, RuntimeOrigin>,
	// The AccountId32 location type can be expressed natively as a `Signed` origin.
	SignedAccountId32AsNative<ThisNetwork, RuntimeOrigin>,
);

```

### IsReserve

The `IsReserve` type must be set to specify which `<MultiAsset, MultiLocation>` pair we trust to
deposit reserve assets on our chain. We can also use the unit type `()` to block
`ReserveAssetDeposited` instructions. An example implementation is the `NativeAsset` struct, that
accepts an asset iff it is a native asset.

### IsTeleporter

The `IsTeleporter` type must be set to specify which `<MultiAsset, MultiLocation>` pair we trust to
teleport assets to our chain. We can also use the unit type `()` to block `ReceiveTeleportedAssets`
instruction. An example implementation is the `NativeAsset` struct, that accepts an asset iff it is
a native asset.

### UniversalLocation

The `UniversalLocation` type describes the location of the runtime implementing the xcm-executor in
the consensus universe. Below we give some examples of `UniversalLocation` implementations.

```rust
//Polkadot
X1(GlobalConsensus(NetworkId::Polkadot))
//Kusama
X1(GlobalConsensus(NetworkId::Kusama))
//Statemint
X2(GlobalConsensus(NetworkId::Polkadot), Parachain(1000))
```

### Barrier

Before any XCMs are executed in the XCM executor, they need to pass the `Barrier`. The `Barrier`
type implements the `ShouldExecute` trait and can be seen as the firewall of the xcm-executor. Each
time the xcm-executor receives an XCM, it check with the barrier if the XCM should be executed. We
can also define multiple barriers for our `Barrier` type by using a tuple. During execution, each
barrier is checks, and if one of them succeed, the XCM is executed. Example of a `Barrier`
implementations is `AllowTopLevelPaidExecutionFrom<T>` that accepts the XCM if the `T` contains the
origin of the XCM and the XCM contains the `BuyExecution` instruction. To accept all XCMs that pay
for execution we could set the barrier to `AllowTopLevelPaidExecutionFrom<Everything>`. There are
multiple pre-defined barrier implementations in the xcm-builder.

### Weigher

The `Weigher` is responsible for weighing full XCMs and individual instructions. This weight is
calculated before the XCM execution, and this calculated weight is checked against the weight_limit.
If the weight is more than weight_limit, the xcm will not be executed. The weight is also passed to
each `Barrier`, as certain barriers execute weight-based checks. After the execution of the XCM,
unused weight is refunded (if possible). There are pre-defined `Weigher` solutions in the
xcm-builder. The most used is the `FixedWeightBounds`:

```rust
// BaseXcmWeight is a const weight.
FixedWeightBounds<BaseXcmWeight, RuntimeCall, MaxInstructions>;
```

Note: [More information](../fundamentals/weight_and_fees.md) about weight.

### Trader

The `Trader` type is responsible for buying weight in the `BuyExecution` instruction using assets in
the holding register and to refund unspend weight. One of the first implementations of the `Trader`
is defined in the xcm-builder, namely the `UsingComponents` trader.

### ResponseHandler

The `ResponseHandler` type is responsible for handling the `QueryResponse` instructions. A
`ResponseHandler` implementation has to implement the `OnResponse` trait. One of the implementations
of the `ResponseHandler` is the `pallet-xcm`. This will be the main implementation for most
FRAME-based systems that implement the XCM-executor. Another option is to use the unit type `()` if
you do not want to support `QueryResponse`.

### AssetTrap

The `AssetTrap` type is responsible for handling the funds left over in holding after the execution
of the XCM. The assets are stored in the AssetTrap and can be claimed using the ClaimAsset
instruction. One of the implementations of the `AssetTrap` type is the `pallet-xcm`. Another option
is to use the unit type `()` if you do not want to support asset trapping. In this case, the assets
that are left in holding are burned.

### AssetClaims

The `AssetClaims` type is responsible for claiming trapped assets. It is during execution of the
`ClaimAsset` instruction. One of the implementations of the `AssetClaims` type is the `pallet-xcm`.
Another option is to use the unit type `()` if you do not want to support asset claiming.

### AssetLocker

The `AssetLocker` type is responsible with handling locking and unlocking assets. One of the
implementations of the `AssetLocker` type is the `pallet-xcm`. Another option is to use the unit
type `()` if you do not want to support asset locking.

### AssetExchanger

The `AssetExchanger` type implements the `AssetExchange` trait and handles the exchange of assets
for the ExchangeAsset instruction. An option is to use the unit type `()` if you do not want to
support asset exchanging.

### SubscriptionService

The `SubscriptionService` type implements the `VersionChangeNotifier` trait and is used for the
execution of the (Un)SubscribeVersion instructions. When a chain receives the `SubscribeVersion`
instruction, the `SubscriptionService` should send back a `QueryResponse` with the XCM version that
the chain uses. One of the implementations of the `SubscriptionService` is the `pallet-xcm`. This
will be the main implementation for most FRAME-based systems that implement the XCM-executor.

### PalletInstancesInfo

The `PalletInstancesInfo` type implements the `PalletsInfoAccess` trait and is used in the
`QueryPallet` and `ExpectPallet` instructions. It supplies the information of all the pallets in the
Runtime, and is therefore FRAME specific. The unit type `()` can be used if you do not want to
support pallet information.

### MaxAssetsIntoHolding

The `MaxAssetsIntoHolding` type is used to set a limit on the number of assets in the Holding
Register. In the worse case, the Holding Register may contain up to twice as many assets as this
limit.

### FeeManager

The `FeeManager` type is used to manage what happens with the fees that need to be paid for certain
XCM instructions. A `FeeManager` implementation implements the `FeeManager` trait. The FeeManager
determines if fees should be paid (or if they are waived) and what to do with the paid fees. The
unit type `()` can be used if you want to waive every fee.

### MessageExporter

The `MessageExporter` type implements the `ExportXcm` trait and is used to export a message to
another consensus system. The `MessageExporter` is different from the `XcmSender`. The
`MessageExporter` is able to spoof the origin of the message, meaning it can represent a different
origin then the local (i.e. the caller chain's) location. The MessageExporter will mainly be used to
send XCMs over bridges. For a more in depth explanation, see the
[ExportXcm trait](https://paritytech.github.io/polkadot/doc/xcm_executor/traits/trait.ExportXcm.html).
The unit type `()` can be used if you do not want to support XCM exporting.

### UniversalAliases

The `UniversalAliases` type is used to list the origin locations and specific universal junctions to
which they are allowed to elevate themselves. `UniversalAliases` is used in the `UniversalOrigin`
instruction. To not allow any alliasing of origins, `Nothing` can be used.

### CallDispatcher

The `CallDispatcher` type is used by xcm-executor to dispatch calls that are passed in the
`Transact` instruction with the given origin. When no special call dispatcher is required, this can
be set to the same type as `RuntimeCall`. However, `CallDispatcher` can be used to customize call
dispatch, such as adapting the origin based on the call or modifying the call.

### SafeCallFilter

The `SafeCallFilter` type is used by the xcm-executor to whitelist calls that can be made in the
`Transact` instruction. This is a temporary measure until proof size weights for XCM instructions
are properly account for. If you want to allow all calls in `Tansact`, use `Everything`.

## What Next

Check out the
[Kusama](https://github.com/polkadot-fellows/runtimes/blob/main/relay/kusama/src/xcm_config.rs),
[Statemine](https://github.com/polkadot-fellows/runtimes/blob/main/system-parachains/asset-hubs/asset-hub-kusama/src/xcm_config.rs),
or [Trappist](https://github.com/paritytech/trappist/blob/main/runtime/trappist/src/xcm_config.rs)
for examples of how to implement the xcm-executor config.
