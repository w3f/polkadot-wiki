---
id: learn-xcm-docs-multilocation-example
title: Example
sidebar_label: Example
description: A MultiLocation Example.
keywords: [xcm, cross-consensus messaging, multilocation]
slug: ../multilocation-example
---

# Example

In this example we show different `MultiLocation`s for the system hierarchy in the image below.
![Example](./../images/MultiLocation_Example.png)

From the perspective of RelayA

```rust
// ParaA
let _: MultiLocation = Parachain(1000).into();
// AccountId32 in Parachain A
let _: MultiLocation = (Parachain(1000), AccountId32 { network: RELAY_A_NETWORK, id: [0u8; 32]}).into();
// Asset in Parachain A
let _: MultiLocation = (Parachain(1000), PalletInstance(1), GeneralIndex(1)).into();
// Ethereum based account on Parachain B
let _: MultiLocation = (Parachain(2000), AccountKey20 { network: RELAY_A_NETWORK, key: [0u8; 20] }).into();
// Smart Contract
let _: MultiLocation = (Parachain(2000), PalletInstance(1), AccountKey20 { network: RELAY_A_NETWORK, key: [0u8; 20] }).into();
// RelayB
let _: MultiLocation = (Parent, GlobalConsensus(RELAY_B_NETWORK)).into();
// NFT on Parachain C
let _: MultiLocation = (Parent, GlobalConsensus(RELAY_B_NETWORK), Parachain(1000), GeneralIndex(1)).into();
```

From the perspective of Parachain C

```rust
// Relay B
let _: MultiLocation = Parent.into();
// Plurality Example. Many more BodyId/BodyPart combos imaginable
let _: MultiLocation = (Parent, Plurality { id: BodyId::Index(0), part: BodyPart::Members { count: 10 } }).into();
// Account in Relay
let _: MultiLocation = (Parent, AccountId32 { network: None, id: [0u8; 32] }).into();
```

From the perspective of the Smart Contract

```rust
// Asset in Parachain A
let _: MultiLocation = (Parent, Parent, Parachain(1000), PalletInstance(1), GeneralIndex(1)).into();

```
