---
id: learn-implementations
title: Polkadot 实现
sidebar_label: Polkadot 实现
---

这里 Rust，C ++，Go 和 JavaScript 开发都是 Polkadot 不同语言的实现。

[** Parity Polkadot **](https://github.com/paritytech/polkadot) - Rust 客户端由 Parity 与他们在[ Substrate ](https://github.com/paritytech/substrate)上的工作。

[ ** Kagome **](https://github.com/soramitsu/kagome) - 由 [ Soramitsu ](https://github.com/soramitsu) 实现 C++ Polkadot Host 环境 ，他们是日本的数字身份识别公司，之前开发了[ Hyperledger Iroha ](https://iroha.tech)。他们获得了 Web3 基金会的资助，并计划在[ 2019年11月](https://medium.com/web3foundation/w3f-grants-soramitsu-to-implement-polkadot-runtime-environment-in-c-cf3baa08cbe6)发布。他们正在用 C ++ 开发 libp2p 网络层。

[** Gossamer ** ](https://github.com/ChainSafeSystems/gossamer) - 由[ ChainSafe Systems ](https://github.com/ChainSafeSystems)，23人组成在多伦多的开发团队也正在开发 Eth2.0 Serenity 客户程序。[拨款公告](https://medium.com/web3foundation/w3f-grants-chainsafe-to-implement-polkadot-runtime-environment-in-go-ca4973c9edaf)。

[ ** Polkadot-JS ** ](https://github.com/polkadot-js) - JavaScript [客户端](https://github.com/polkadot-js/client)和由[ Polkadot JS ](https://polkadot.js.org/)开发的工具。

## 为什么要把 Polkadot 实现多个语言？

如 Soramitsu 拨款公告所述:

> It is critically important to have multiple implementations of the Polkadot protocol for a number of reasons, including decentralization, knowledge dispersion, and better definitions of the protocol... Multiple implementations of Polkadot improves network resilience and adds to the decentralization of the network. The governance of the network is more democratized when multiple teams build clients that run the nodes in the network.
