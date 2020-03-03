---
id: learn-implementations
title: Polkadot 不同程序语言实现
sidebar_label: Polkadot 不同程序语言实现
---

这里 Rust，C ++，Go 和 JavaScript 开发都是 Polkadot 不同语言的实现。

[** Parity Polkadot **](https://github.com/paritytech/polkadot)-Rust 客户端由 Parity  与他们在[ Substrate ](https://github.com/paritytech/substrate)上的工作。

[**Kagome**](https://github.com/soramitsu/kagome) - C++ implementation of the Polkadot Host being built by [Soramitsu](https://github.com/soramitsu), a Japanese digital identity company that previously developed [Hyperledger Iroha](https://iroha.tech). They were awarded a grant from the Web3 Foundation and plan to release Kagome by [November 2019](https://medium.com/web3foundation/w3f-grants-soramitsu-to-implement-polkadot-runtime-environment-in-c-cf3baa08cbe6). As part of the process they are developing a libp2p networking layer in C++.

[** Gossamer ** ](https://github.com/ChainSafeSystems/gossamer) - 由[ ChainSafe Systems ](https://github.com/ChainSafeSystems)，23人组成在多伦多的开发团队也正在开发 Eth2.0 Serenity 客户程序。[拨款公告](https://medium.com/web3foundation/w3f-grants-chainsafe-to-implement-polkadot-runtime-environment-in-go-ca4973c9edaf)。

[ ** Polkadot-JS ** ](https://github.com/polkadot-js) - JavaScript [客户端](https://github.com/polkadot-js/client)和由[ Polkadot JS ](https://polkadot.js.org/)开发的工具。

## 为什么要把 Polkadot 实现多个语言？

如 Soramitsu 拨款公告所述:

> 由于多种原因，包括去中心化，知识分散和更好的协议定义，实现 Polkadot 协议极之 重要。实现多个 Polkadot 版本提高了网络的弹性，并增加了网络的去中心化。当多个团队在网络中运行开发节点的客户端时，网络的治理将更加民主化。
