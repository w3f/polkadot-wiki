---
id: build-guides-coretime-start
title: Getting Started - Intro to the Polkadot SDK
sidebar_label: Intro to the Polkadot SDK
description: Introduction to the Polkadot SDK
keywords: [coretime, blockspace, parathread, parachain, cores]
slug: ../build-guides-coretime-start
---

!!!warning
    This section is under construction.

<!-- TODO: INDEX CARDS -->

## Using the Polkadot SDK

The Polkadot SDK is comprised of **three** important repositories:

- [**Polkadot**](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/polkadot_sdk/index.html#polkadot) -
  This included both client implementation and runtime until the runtime was moved to the Polkadot
  Fellows organization.
- [**Substrate**](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/polkadot_sdk/index.html#substrate) -
  The underlying core primitives and libraries for building blockchains (any blockchain, not just
  one for Polkadot). Much of Polkadot is built with Substrate.
- [**Cumulus**](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/polkadot_sdk/index.html#cumulus) -
  A set of libraries and tools pertaining specifically to connecting blockchains to Polkadot, known
  as parachains.

> For an in-depth dive into the monorepo, it is highly recommended that you look into the
> [Polkadot SDK Docs, which explains everything.](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/polkadot_sdk/index.html)

!!!info "What is a task?"
    You might see the term "task" referenced often in place of "parachain". In most cases, it refers to
    a process utilizing the relay chain's compute. This could be a parachain or any other computational
    process, provided that it adheres to the Polkadot protocol interface.

    The full definition can be found [here](../learn/learn-agile-coretime.md#task).

1. **Reserving** a [`ParaId`](../general/glossary.md#paraid), where you will upload your runtime and
   genesis state.
2. **Compiling** the runtime (written in Rust) to a [WebAssembly](../learn/learn-wasm.md) blob,
   thereby defining how your state transitions from one state to the next. This runtime is created
   using the Polkadot SDK.
3. **Ensure** your chain spec is viable and ready to be deployed as a live, working parachain.
4. **Generating** your genesis state and wasm.
5. **Obtaining** a core, most likely through a
   [Coretime marketplace](../learn/learn-guides-coretime-marketplaces.md).
6. **Assigning** that core to your[ `ParaId`](../general/glossary.md#paraid).
7. **Ensuring** you have at least one honest, synced collator for your task

## Deploying on a Core

Once you have your runtime and pallets developed, you will be able to deploy it on a
[core](../learn/learn-agile-coretime.md#core), which is how one utilizes the shared security of the
Polkadot network. One does so by:

```mermaid
%%{
 init: {
 'theme': 'base',
 'themeVariables': {
 'fontFamily': 'Unbounded',
 'primaryColor': '#E6007A',
 'fontSize': '16px',
 'primaryTextColor': '#fff',
 'primaryBorderColor': '#7C0000',
 'lineColor': '#140523',
 'secondaryColor': '#552BBF',
 'tertiaryColor': '#fff'
 }
 }
}%%
flowchart TD
    subgraph GA["Generate Artifacts"]
        direction LR
        A["Creating a runtime"]-->B["Compiling to Wasm"]-->C["Generate Genesis State"]
    end

    subgraph PC["Procure ParaId & Core"]
        direction LR
        PARAID["Reserve ParaId"]
        PARAID-->D["Buy Bulk Coretime"]
        PARAID-->E["Issue On-Demand Coretime Extrinsic"]
    end


    subgraph DEP["Deploying"]
        direction LR
        F["Register artifacts to ParaId"]-->assign["Assign Core"]-->G["Sync collator"]-->H["Begin generating blocks!"]
    end

GA-->PC
PC-->DEP
```

### Install dependencies

Make sure you have everything you need for your target system
[here](build-guides-install-deps.md).

Be sure you also install the `polkadot-parachain` and `chain-spec-builder` binaries, as they needed
to start and run your chain!

### Deployment Example - Adder Collator

Try out the above by deploying the
[adder collator, a straightforward "counter" parachain implementation](../learn/learn-guides-coretime-parachains.md).

## OpenZeppelin Templates & Guides

OpenZeppelin offers a
[generic parachain template](https://github.com/OpenZeppelin/polkadot-generic-runtime-template),
which has support for:

- Proxy Pallet
- Multisig Pallet
- Governance support - a treasury, referenda (OpenGov!), and assets configuration
- Collation/Parachain Support
- XCM (Cross Consensus Messaging) Configuration and Support

For more information, check their
[Substrate parachain runtime guide.](https://docs.openzeppelin.com/substrate-runtimes/1.0.0/)

## Polkadot SDK Parachain Template

If you wish to the
[Polkadot SDK's Parachain template](https://github.com/paritytech/polkadot-sdk/tree/master/templates/parachain),
please follow the [Template to Core guide.](build-guides-template-basic.md)
