---
id: build-guides-coretime-start
title: Getting Started - Deploying on Coretime
sidebar_label: Getting Started with Coretime
description: Getting started with Agile Coretime
keywords: [coretime, blockspace, parathread, parachain, cores]
slug: ../build-guides-coretime-start
---

:::warning Only for Kusama and testnets!

The following content is only for the Kusama and testnet networks at the moment, and is not yet
deployed on Polkadot.

:::

## Deploying on a Core

Once you have your runtime and pallets developed, you will be able to deploy it on a
[core](../learn/learn-agile-coretime.md#core), which is how one utilizes the shared security of the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network. One does so by:

1. **Compiling** the runtime (written in Rust) to a WebAssembly blob, thereby defining how your
   state transitions from one state to the next.
2. **Generating** your genesis state.
3. **Obtaining** a core, most likely through a
   [Coretime marketplace](../learn/learn-guides-coretime-marketplaces.md).
4. **Registering** the runtime blob and genesis state with that core.
5. **Ensuring** you have at least one honest, synced collator for your task

:::info What is a task?

You might see the term "task" referenced quite a bit, but in most cases, it refers to a process
utilizing Polkadot's compute. This could be a parachain or any other computational process, provided
that it adheres to the Polkadot protocol.

The full definition can be found here.

:::

## Polkadot SDK Templates
