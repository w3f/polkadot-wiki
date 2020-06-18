---
id: build-cumulus
title: Cumulus
sidebar_label: Cumulus
---

> Cumulus clouds are shaped sort of like dots and are up in the air, like this project (as it is an initial prototype -- expect a rename when it gets cooler.)

[Cumulus](https://github.com/paritytech/cumulus) is an extension to Substrate that makes it easy to make any Substrate built runtime into a Polkadot compatible parachain.

## 컴포넌트(Components)

### 뭉게구름 컨센서스 (Cumulus Consensus)

Cumulus Consensus is a consensus engine for Substrate that follows a Polkadot Relay Chain. This will run a Polkadot node internally, and dictate to the client and synchronization algorithms which chain to follow, finalize, and treat as best.

### 뭉게구름 런타임 (Cumulus Runtime)

A wrapper around Substrate runtimes to allow them to be validated by Polkadot validators and provide witness generating routines. It adds a `validate_block` API to the Substrate external interface, which will be called by validators.

Integrating it into your substrate runtime will be as easy as importing the crate and adding this one line macro to your code.

```rust
runtime::register_validate_block!(Block, BlockExecutor);
```

### 뭉게구름 검사기 (Cumulus Collator)

패러체인을 위한 폴카닷(Polkadot) 검사기(collator)가 준비중입니다.

## Resources

- [EthCC에서 Cumulus를 소개하는 Rob의 발표](https://www.youtube.com/watch?v=thgtXq5YMOo)
