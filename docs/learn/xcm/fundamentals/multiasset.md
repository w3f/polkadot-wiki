---
id: learn-xcm-docs-fundamentals-multiasset
title: MultiAsset
sidebar_label: MultiAsset
description: The MultiAsset Datatype.
keywords: [xcm, cross-consensus messaging, multilocation]
slug: ../fundamentals-multiasset
---

# MultiAsset

When working with XCM, it is often needed to represent an asset of some sort. This is because
practically all public blockchains in existence rely on some native digital asset to provide the
backbone for its internal economy and security mechanism. For example, the native asset for the
Polkadot relay chain is DOT.

Some blockchains manage multiple assets, e.g. Ethereum’s ERC-20 framework allows for many different
assets to be managed on-chain. Some manage assets that are not fungible, such as Ethereum’s
Crypto-kitties — each kitty is a one-of-a-kind instance. It was an early example of such
non-fungible tokens or NFTs.

XCM is designed to be able to describe all such assets without breaking a sweat. For this purpose,
there is the `MultiAsset` datatype, along with its related types `MultiAssets`, `WildMultiAsset`,
and `MultiAssetFilter`.

## MultiAsset Breakdown

Let's take a look at the MultiAsset struct:

```rust
pub struct MultiAsset {
    pub id: AssetId,
    pub fun: Fungibility,
}
```

So two fields define our asset: id and fun. These fields are indicative of how XCM approaches
assets. Firstly, an overall asset identity must be provided. For fungible assets, this is simply a
symbol that identifies the asset. For NFTs this identifies the overall asset “class” — different
asset instances may be within this class.

```rust
enum AssetId {
   Concrete(MultiLocation),
   Abstract([u8; 32]),
}
```

The asset identity is expressed in one of two ways; either Concrete or Abstract. Abstract identities
allow assets to be specified by a 32-byte blob. This is convenient, but it relies on the receiver to
interpret the blob in the way that the sender expects, which will require a common definition
between the sender and the receiver, and may not be simple to achieve. Concrete identities use a
`MultiLocation` to identify an asset unambiguously. For native assets (such as DOT), the asset is
identified as the chain which mints the asset (the Polkadot relay chain in this case, which would be
the location `..` from one of its parachains). Other assets (e.g. non-native assets or NFTs) can be
identified by a `GeneralIndex` junction. Depending on the implementation of the encapsulating
consensus system, the exact location may differ (e.g. `GeneralIndex(AssetID)` or
`PalletInstance(PalletID)/GeneralIndex(AssetID)` can both be valid asset identities).

```rust
enum Fungibility {
   // Fungible cannot be 0
   Fungible(u128),
   NonFungible(AssetInstance),
}
```

Secondly, they must be either fungible or non-fungible. If they’re fungible, then there should be
some associated non-zero amount of assets specified. If they’re not fungible, then instead of an
amount, there should be some indication of which
[AssetInstance](https://paritytech.github.io/polkadot/doc/xcm/v3/enum.AssetInstance.html) they are.
(This is commonly expressed with an index, but XCM also allows arrays.)

## How to use Multiple Assets Together?

There are multiple ways to group Assets. In this section, we go over these methods.

### MultiAssets

One way to group a set of `MultiAsset` items is the
[MultiAssets](https://paritytech.github.io/polkadot/doc/xcm/v3/struct.MultiAssets.html) type.

```rust
struct MultiAssets(Vec<MultiAsset>);
```

This structure must uphold some rules:

- It may not contain duplicate `MultiAsset`s (`Fungible` assets are considered the same if their IDs
  match. However, `NonFungible` assets are different if the `AssetInstance` is different);
- All items must be ordered;
- The number of items should grow no larger than MAX_ITEMS_IN_MULTIASSETS (currently set to 20).

### WildMultiAsset

Then we have WildMultiAsset; this is a wildcard that can be used to match against one or more
MultiAsset items. All the WildMultiAsset wildcards can be used to select/filter assets in the
[Holding register](../overview/xcvm.md).

```rust
pub enum WildMultiAsset {
    /// All assets in Holding.
    All,
    /// All assets in Holding of a given fungibility and ID.
    AllOf { id: AssetId, fun: WildFungibility },
    /// All assets in Holding, up to `u32` individual assets (different instances of non-fungibles
    /// are separate assets).
    AllCounted(#[codec(compact)] u32),
    /// All assets in Holding of a given fungibility and ID up to `count` individual assets
    /// (different instances of non-fungibles are separate assets).
    AllOfCounted {
        id: AssetId,
        fun: WildFungibility,
        #[codec(compact)]
        count: u32,
    },
}
```

### MultiAssetFilter

Finally, there is `MultiAssetFilter`. This is used most often and is just a combination of
MultiAssets and WildMultiAsset allowing either a wildcard or a list of definite (i.e. not wildcard)
assets to be specified.

```rust
pub enum MultiAssetFilter {
    /// Specify the filter as being everything contained by the given `MultiAssets` inner.
    Definite(MultiAssets),
    /// Specify the filter as the given `WildMultiAsset` wildcard.
    Wild(WildMultiAsset),
}
```

## Examples

### MultiAsset

For more information about the MultiLocations used to define concrete assets, see
[MultiLocation](multilocation/summary.md) and [Junction](multilocation/junction.md).

```rust
// Location relay chain
// 100 Native Asset (three ways)
MultiAsset {id: Concrete(MultiLocation {parents: 0, interior: Here}), fun: Fungible(100u128)};
MultiAsset {id: Here.into(), fun: 100.into()};
let _: MultiAsset = (Here, 100u128).into();

// 100 Parachain's Native Asset
let _: MultiAsset = (X1(Parachain(1000)), 100u128).into();
// 100 Fungible assets in Parachain 1000 with id 1234
let _: MultiAsset = (X2(Parachain(1000), GeneralIndex(1234)), 100u128).into();
// Non Fungible asset with asset class 1234 containing only one nft instance in Parachain 1000
let _: MultiAsset = (X2(Parachain(1000), GeneralIndex(1234)), Undefined).into();
// Non Fungible asset with asset class 1234 and AssetInstance 1 in Parachain 1000
let _: MultiAsset = (X2(Parachain(1000), GeneralIndex(1234)), Index(1)).into();
```

### MultiAssetFilter

```rust
let a1: MultiAssets = MultiAssets::from(vec![MultiAsset {id: Here.into(), fun: 100u128.into()}]);
let b1: MultiAssets = (Here, 100u128).into();
assert_eq!(a1, b1);

let a2: MultiAssetFilter = a1.into();
let b2 = MultiAssetFilter::Definite((Here, 100u128).into());
assert_eq!(a2, b2);

let a3 = MultiAssetFilter::Wild(WildMultiAsset::All);
let b3: MultiAssetFilter = All.into();
assert_eq!(a3, b3);
```
