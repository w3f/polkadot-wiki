---
id: build-cumulus
title: Cumulus
sidebar_label: Cumulus
---

> Кучевые облака имеют форму точек и находятся в воздухе, как этот проект (поскольку это первоначальный прототип - ожидайте переименования, когда он станет круче.)

[Cumulus](https://github.com/paritytech/cumulus) is an extension to Substrate that makes it easy to make any Substrate built runti me into a Polkadot compatible parachain.

## Компоненты

### Консенсус Cumulus

Cumulus Consensus is a consensus engine for Substrate that follows a Polkadot Relay Chain. This will run a Polkadot node internally, and dictate to the client and synchronization algorithms which chain to follow, finalize, and treat as best.

### Среда исполнения Cumulus

A wrapper around Substrate runtimes to allow them to be validated by Polkadot validators and provide witness generating routines. It adds a `validate_block` API to the Substrate external interface, which will be called by validators.

Интегрировать его в среду исполнения Вашего субстрата так же просто, как импортировать crate и добавить этот однострочный макрос в Ваш код:

```rust
runtime::register_validate_block!(Block, BlockExecutor);
```

### Сборщик Cumulus

Планируемый Polkadot сборщик для парачейна.

## Ресурсы

- [Rob рассказывает на EthCC о создании Cumulus](https://www.youtube.com/watch?v=thgtXq5YMOo)
- [Cumulus: Entering the Substratosphere](https://www.youtube.com/watch?v=thgtXq5YMOo) - Talk from Polkadot co-founder Robert Habermeier at EthCC in March 2019 detailing the latest on building parachains with Cumulus.
