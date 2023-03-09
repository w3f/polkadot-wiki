---
id: learn-xcvm
title: XCM Virtual Machine (XCVM) & XCM Executor
sidebar_label: XCM Virtual Machine (XCVM) & XCM Executor
description: Learn about the design of the XCM executor, and how the XCM Virtual machine works.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcvm
---

At the core of XCM lies the Cross-Consensus Virtual Machine (XCVM). A “message” in XCM is an XCVM
program. The XCVM is a state machine, state is kept track in Registers.

It’s an ultra-high level non-Turing-complete computer whose instructions are designed to be roughly
at the same level as transactions. Messages are one or more XCM instructions. The program executes
until it either runs to the end or hits an error, at which point it finishes up and halts. An XCM
executor following the XCVM specification is provided by Parity, and it can be extended or
customized, or even ignored altogether and users can create their own construct that follows the
XCVM spec.

A _message_ in XCM is simply just a programme that runs on the `XCVM`: in other words, one or more
XCM instructions. To learn more about the XCVM and the XCM Format, see the latest
[blog post](https://medium.com/polkadot-network/xcm-the-cross-consensus-message-format-3b77b1373392)
by Dr. Gavin Wood.

XCM instructions might change a register, they might change the state of the consensus system or
both.

One example of such an instruction would be `TransferAsset` which is used to transfer an asset to
some other address on the remote system. It needs to be told which asset(s) to transfer and to
whom/where the asset is to be transferred.

```
enum Instruction {
    TransferAsset {
        assets: MultiAssets,
        beneficiary: MultiLocation,
    }
    /* snip */
}
```

A `MultiAsset` is a general identifier for an asset. It may represent both fungible and non-fungible
assets, and in the case of a fungible asset, it represents some defined amount of the asset.

A `MultiLocation` is a relative identifier, meaning that it can only be used to define the relative
path between two locations, and cannot generally be used to refer to a location universally. Much
like a relative file-system path will first begin with any "../" components used to ascend into to
the containing directory, followed by the directory names into which to descend, a `MultiLocation`
has two main parts to it: the number of times to ascend into the outer consensus from the local and
then an interior location within that outer consensus.
