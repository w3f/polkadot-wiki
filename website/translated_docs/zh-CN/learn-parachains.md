---
id: learn-parachains
title: Parachains
sidebar_label: Parachains
---

![One parachain](assets/network/one_parachain.png)

## 什么是平行链?

A parachain is an application-specific data structure that is globally coherent and validatable by the validators of the Polkadot relay chain. Most commonly a parachain will take the form of a blockchain, but there is no specific need for them to be actual blockchains. They take their name from the concept of parallelized chains that run parallel to the relay chain. Due to their parallel nature, they are able to parallelize transaction processing and achieve scalability of the Polkadot system. They [share in the security](learn-security) of the entire Polkadot network and can communicate with other parachains through [XCMP](learn-interchain).

平行链由称为[收集人](maintain-collator)的网络维护者维护。 收集人节点的作用是运行平行链的全节点，保留平行链的所有必要信息，并生成新的候选区块，以传递给中继链验证器人进行验证并包含在 Polkadot 的共享状态里。 收集人节点的激励是对平行链的实施细节（请参见[平行链经济](#parachain-economies)）。 除非平行链实施规定这样做，否则它们无需将 DOT 押在中继链或持有代币。

Polkadot runtime 环境（PRE）允许将在平行链上执行的状态转换指定为Wasm可执行文件。 在Polkadot确认在平行链上发生状态转换之前，必须通过验证程序根据在中继链上存储的注册状态转换函数（STF）验证在平行链上发生的新状态转换的证据。允许执行平行链的逻辑的唯一约束是中继链验证程序必须可以验证该逻辑。 验证通常采用状态转换的捆绑式证明的形式，即验证的证明（PoV）区块，该验证从一个或多个平行链的收集人核对提交给验证人，以进行检查。

## 平行链经济学

平行链可能有自己的经济体和自己的原生币。方案像权益证明通常用于选择验证人以便用于验证区块和确定性。平行链并不需要处理以上功能。但是，由于 Polkadot 对于平行链可以实现的内容也是通用的，因此平行链可以选择实现抵押代币，但通常没有必要。

收集人可能通过平行链的原生币通胀来激励。 可能还有其他方法可以激励收集人而不需要通胀平行链原生币。

平行链也可实现使用原生币作为交易费用 。 Polkadot 对平行链如何决定交易的原始有效性没有硬性规定。例如平行链可以实现必须支付小额费用给收集人才能有效。中继链将强制执行此有效性。同样平行链不能包括他们的实现和 Polkadot 仍将强制执行其有效性。

平行链并不需要拥有它们自己的代币。如果它们拥有自己的代币，那将会是平行链决定如何使它们的代币有经济用途，需不是 Polkadot。

## 例子

平行链例子

- **Encrypted Consortium Chains** - These are possibly private chains that do not leak any information to the public, but still can be interacted with trustlessly due to the nature of the XCMP protocol.
- **高频链** - 这些链可以通过进行某些权衡或进行优化，在短时间内大量计算。
- **隐私链** - 这些链通过使用新颖的加密技术不会向公众泄露任何信息。
- **智能合约链** - 这些链可以通过部署称为 _智能合约_的代码来实现额外的逻辑。

## 常见问题

### 平行链共识是什么?

"平行链共识"的特殊之处在于它将遵循 Polkadot 中继链。平行链不能使用其他提供确定性的共识算法。只有主权链 (必须通过转接桥的平行链接到中继链) 能够控制它们的共识。平行链可以控制区块的创作方式和通过谁。

### 平行链插槽如何分配？

平行链插槽通过使用拍卖方式获取。请查看[平行链插槽](learn-auction)文章。如此，一些平行链插槽将会运行[平行线程](learn-parathreads) - 平行线程通过以竞标每个区块方式包括在中继链内。

### 平行链开发套件 (PDKs)

平行链开发套件是一组工具供开发者创造他们创造的他们的应用成为平行链，详细资料请看[这里](build-pdk)。

### 部署平行链

请参阅有关[部署平行链](build-deploy-parachains)的开发者文章。

## 资源

- [Polkadot: 平行链](https://medium.com/polkadot-network/polkadot-the-parachain-3808040a769a) - Polkadot 联合创始人 Rob Habermeier在2017年撰写的博客文章，将平行链介绍为 "一种更简单的区块链形式，它附加于“中继链”提供的安全性，而不是提供其自身的安全性。中继链为附加的平行链提供安全性，但是还为它们之间的安全消息传递提供了保证。"
