---
id: learn-xcm-docs-multilocation-junctions
title: Junction(s)
sidebar_label: Junction(s)
description: The Junction Type in a MultiLocation Struct.
keywords: [xcm, cross-consensus messaging, multilocation, junctions]
slug: ../multilocation-junctions
---

# Junction(s)

In the section on [MultiLocations](../multilocation/summary.md), we looked at the MultiLocation struct. We talked
about the Multilocation being a way to describe moving from one place in the system hierarchy to
another. The `parents` parameter expresses the number of steps up in the hierarchy. In this section,
we dive further into the MultiLocation struct and explain how we can use the Junctions type to
describe steps in the system hierarchy. Take a look at the MultiLocation struct again:

```rust
pub struct MultiLocation {
    pub parents: u8,
    pub interior: Junctions,
}
```

The system hierarchy consists of 1-to-n relations. Each place in the system hierarchy can only ever
have one parent, so there is only one way up the hierarchy. That is why we can use a `u8` to
describe the number of `parents` we want to move up. But moving down is a bit more difficult, as one
consensus system can encapsulate multiple other consensus systems(e.g. a relay chain can have
multiple parachains). So to describe the correct steps down the hierarchy, we use the `Junctions`
[type](https://paritytech.github.io/polkadot/doc/xcm/v3/enum.Junctions.html).

## Junctions Type

```rust
pub enum Junctions {
    /// The interpreting consensus system.
    Here,
    /// A relative path comprising 1 junction.
    X1(Junction),
    ...
    /// A relative path comprising 8 junctions.
    X8(Junction, Junction, Junction, Junction, Junction, Junction, Junction, Junction),
}
```

The `Junctions` enum can represent zero to eight steps down the hierarchy. When the `Here` variant
is used, it means that we do not have to take steps down the hierarchy. We can for example describe
the current location with `{parents: 0, interior: Here}` or the Parent location with
`{parents: 1, interior: Here}`. If we want to take steps down the hierarchy, we express each step as
a Junction.

## Junction Type

A [Junction](https://paritytech.github.io/polkadot/doc/xcm/v3/enum.Junction.html) describes a step
down in the Hierarchy. The `Junction`s are defined as follows:

```rust
pub enum Junction {
    Parachain(u32),
    AccountId32 {
        network: Option<NetworkId>,
        id: [u8; 32],
    },
    AccountIndex64 {
        network: Option<NetworkId>,
        index: u64,
    },
    AccountKey20 {
        network: Option<NetworkId>,
        key: [u8; 20],
    },
    PalletInstance(u8),
    GeneralIndex(u128),
    GeneralKey {
        length: u8,
        data: [u8; 32],
    },
    OnlyChild,
    Plurality {
        id: BodyId,
        part: BodyPart,
    },
    GlobalConsensus(NetworkId),
}
```

#### Parachain

The `Parachain` junction is used to describe a parachain from the point of a relay chain. Each
parachain has an Id, e.g. Statemine in the Kusama network has Id 1000.

#### PalletInstance

The `PalletInstance` junction is used to describe a pallet in one of the parachains or relay chain.
Each pallet has an Id that can be used for the `PalletInstance`. This junction is mainly used for
FRAME based systems.

#### AccountId32 and AccountKey20

Each of these junctions can be used to describe an account located in the current consensus system.
The `AccountId32` is used to describe substrate-based accounts, while the `AccountKey20` is mainly
used to describe Ethereum or Bitcoin-based accounts or smart contracts. Both junctions express an
account based on the context they are used in. If the current location is the relay chain, then the
junctions describe an account in the relay chain. The same is true for each parachain location.

#### GeneralIndex and GeneralKey

Non-descript indices and keys within the current context location. The usage will vary widely owing
to its generality. An example use case for the `GeneralIndex` is to describe an Asset within an
Assets Parachain.

NOTE: If possible, try to avoid using this and instead use a more specific junction.

#### AccountIndex64

The `AccountIndex64` can be used to describe an account index. This may be used when the context is
a Frame-based chain and includes e.g. an indices pallet.

#### OnlyChild

The `OnlyChild` junction can be used to describe the child of a location if there exists a 1-to-1
relation between the parent and child in the system hierarchy. The `OnlyChild` junction is currently
not used except as a fallback when deriving context.

#### Plurality

The `Plurality` junction is used to describe a pluralistic body existing within the current
consensus location. Typical to be used to represent a governance origin of a chain, but could in
principle be used to represent things such as multisigs also. See the
[BodyId documentation](https://paritytech.github.io/polkadot/doc/xcm/v3/enum.BodyId.html) for a
better understanding of the bodies that the `Plurality` junction can represent.

#### GlobalConsensus

A global network (e.g. Polkadot or Kusama) is capable of externalizing its own consensus. This is
not generally meaningful outside of the universal level. An example would be describing the Kusama
relay chain from the perspective of the Polkadot relay chain as
`{parents: 1, interior: GlobalConsensus(Kusama)}`. An example use case could be routing XCMs between
global consensus networks using bridges.

## Multiple ways to create a MultiLocation

```rust
// Current Location
MultiLocation {parents: 0, interior: Here};
MultiLocation::new(0, Here);
MultiLocation::here();
MultiLocation::default();
let _: MultiLocation = Here.into();

// Parent Location
MultiLocation {parents: 1, interior: Here};
MultiLocation::parent();
let _: MultiLocation = Parent.into();

// Conversion
MultiLocation { parents: 2, interior: X2(Parachain(1), GeneralIndex(1))};
let _: MultiLocation = (Parent, Parent, Parachain(1), GeneralIndex(1)).into();
```
