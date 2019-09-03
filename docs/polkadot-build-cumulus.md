---
id: polkadot-build-cumulus
title: Cumulus
sidebar_label: Cumulus
---

> Cumulus clouds are shaped sort of like dots and are up in the air, like this project (as it is an initial prototype -- expect a rename when it gets cooler.)

[Cumulus](https://github.com/paritytech/cumulus) is an extension to Substrate that makes it easy to make any Substrate built runtime into a Polkadot compatible parachain.

## Components

### Cumulus Consensus

*cumulus-consensus* is a consensus engine for Substrate which follows a Polkadot relay chain. This will run a Polkadot node internally, and dictate to the client and synchronization algorithms which chain to follow, finalize, and treat as best.

### Cumulus Runtime

A wrapper around Substrate runtimes to allow them to be validated by Polkadot validators and provide witness generating routines. It adds a `validate_block` API to the Substrate external interface which will be called by validators.

Integrating it into your substrate runtime will be as easy as importing the crate and adding this one line macro to your code.

``` rust
runtime::register_validate_block!(Block, BlockExecutor);
```

### Cumulus Collator

A planned Polkadot collator for a parachain.

## Resources

- [Rob's talk from EthCC introducing Cumulus](https://www.youtube.com/watch?v=thgtXq5YMOo)
