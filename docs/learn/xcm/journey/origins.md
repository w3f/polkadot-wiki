---
id: learn-xcm-docs-journey-origin
title: Origin Manipulation
sidebar_label: Origin Manipulation
description: Manipulating the Origin of XCM.
keywords: [xcm, cross-consensus messaging, origin]
slug: ../journey-origin
---

# Origin manipulation

An XCVM contains contextual information while executing XCM instructions. It uses the `XcmContext`
struct to provide them. `XcmContext` contains information such as the origin of the corresponding
XCM, the hash of the message, and the topic of the XCM.

```rust
pub struct XcmContext {
	/// The `MultiLocation` origin of the corresponding XCM.
	pub origin: Option<MultiLocation>,
	/// The hash of the XCM.
	pub message_hash: XcmHash,
	/// The topic of the XCM.
	pub topic: Option<[u8; 32]>,
}
```

In the XCVM, the origin field of the XcmContext indicates which `MultiLocation`'s privilege level
that the current program is using to execute. The origin is important for enforcing restrictions and
ensuring appropriate execution of the instructions.

There are multiple instructions in XCM that can alter the XcmContext origin field:

- `ClearOrigin`
- `DescendOrigin`
- `UniversalOrigin`
- `AliasOrigin`

## ClearOrigin

```rust
ClearOrigin
```

The `ClearOrigin` instruction clears the origin register in the XCVM. Specifically, it sets the
origin field of the XCM context to None. This ensures that subsequent instructions in the XCM cannot
use the privilege level of the cleared origin to execute operations.

## DescendOrigin

```rust
DescendOrigin(InteriorMultiLocation),
```

The `DescendOrigin` instruction is used to change the XcmContext origin to an interior location of
the current origin.

This can be useful when executing instructions that require a specific location within the current
origin.

Note that the XcmContext origin is a `MultiLocation` containing an `InteriorMultiLocation` enum; it
can only hold up to a maximum of 8 `Junction`s, so when we try to execute multiple `DescendOrigin`
instructions which would result in an `InteriorMultiLocation` containing more than 8 `Junction`s, a
`LocationFull` error is thrown.

## UniversalOrigin

```rust
UniversalOrigin(Junction)
```

The UniversalOrigin XCM instruction sets the Origin Register to be a child of the Universal
Location. The Junction parameter should generally be a `GlobalConsensus` variant since only these
are children of the Universal Location.

Safety Note: Should only be usable if the Origin is trusted to represent a child of the Universal
location. In general, no Origin should be able to represent the Universal Location's child which is
the root of the local consensus system since it would by extension allow it to act as any location
within the local consensus, but it is necessary when bridging XCMs between `GlobalConsensus`
systems.

## AliasOrigin

```rust
AliasOrigin(MultiLocation)
```

The AliasOrigin instruction is similar to the UniversalOrigin instruction, but it is primarily used
for account IDs. When executed, it switches out the current origin for the given MultiLocation. THe
AliasOrigin instruction would allow to remove certain prefix patterns such as Parent/Parachain(X)/
for certain values of X (thereby allowing sibling chains to use the same account IDs) or
Parachain(X)/ (allowing a relay chain to use the account IDs native to its child parachains) or just
Parent/ (allowing parachains to use AccountIds of the relay chain).
