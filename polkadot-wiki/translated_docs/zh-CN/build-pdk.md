---
id: build-pdk
title: 平行链开发套件 (PDKs)
sidebar_label: 平行链开发套件 (PDKs)
---

平行链开发工具包(PDK)是一套便于开发者创建兼容[ Polkadot ](learn-parachains)平行链的工具。

## 为什么要创建平行链？

在深入了解什么是 PDK 以及它如何使用之前，让我们回顾一下*为什么*开发者希望创建平行链并将其连接到 Polkadot 中。

平行链拥有两个关键的附加功能，是开发者创建独立链的不二选择：

- _共享安全性_ - 去除了自举链的验证人集的必要性。
- _跨链通信_ - 使得平行链之间通过 ICMP 协议交互操作。

Parachains can [lease the security](learn-security) of the Polkadot network by bonding [DOT](learn-DOT) for a parachain slot. This means that the social costs of building a community around your project and convincing validators to participate in your network security are reduced. It is anticipated that Polkadot will have strong security, and decentralized application projects wishing to benefit from this security would want to become a parachain. For more information on the mechanic of leasing a parachain slot through a candle auction see [here](learn-auction).

所有去中心化的应用程序或链，若想要向其它已连接到 Polkadot 的平行链去信任地传递信息，都会希望成为平行链。主权链之间的互操作性需借助约束和复杂的协议才可广泛实现。在 Polkadot 中，一旦将应用程序构建为平行链，便会立即获得这一特性。[XCMP 协议](learn-xcm)将传递平行链之间的信息，实现其互操作性。此外，连接其它链的转接桥(例如比特币或以太坊)纷纷推出，平行链也可以与它们进行交互。

## 什么是 PDK？

如上所述，PDK 是一套便于开发者创建兼容 Polkadot 的平行链的工具。实际上，这意味着 PDK 将包含以下几个关键成分：

- _状态转变函数(State transition function)_ - 把你应用程序数据状态状变成另一个状态。
- _收集人节点 (Collator node)_ - Polkadot 网络的另一类点对点节点，专门负责平行链。

The state transition function (STF) can be any abstract way for an application to go from one state to another state. The only constraint that Polkadot places on this STF is that it must be easily verifiable -- usually though what we call a _witness_ or _proof_. It must be so because the Relay Chain validators will need to check that each state it receives from the collator node is correct without actually running through the entire computation. Some examples of these proofs include the Proof-of-Validity blocks or zk-SNARKs, which require less computational resources to verify than they do to generate. The verification asymmetry in proof generation of the STF is one of the integral insights that allows Polkadot to scale while keeping high security guarantees.

A collator node is one of the types of network maintainers in the Polkadot protocol. They are responsible for **keeping availability** of the state of the parachain and the new states returned from iteration of the state transition function. They must remain online in order to keep track of the state and also of the XCMP messages that it will route between itself and other parachains. Collator nodes are responsible for passing the succinct proofs to the Relay Chain validators, and tracking the latest blocks from the Relay Chain. In essence, a collator node also acts as a light client for the Polkadot Relay Chain. For more on collator nodes see [here](learn-collator).

## 目前存在哪些 PDK？

目前唯一存在的 PDK 是 Parity [Substrate](https://github.com/paritytech/substrate) & [Cumulus](https://github.com/paritytech/cumulus)。Substrate 作为区块链框架，提供了区块链的基本构建区块（例如网络层、共识和 Wasm 解释器），以及创建运行时的直观方法。Substrate 旨在简化创建新链，但它并不直接支持 Polkadot 兼容性。因此 Cumulus 附加库将包含所有 Polkadot 兼容性代码。Cumulus 目前还在开发之中，计划做到只通过导入 crates 以及添加一行代码便把你的 Substrate 链变成平行链。

Substrate 和 Cumulus 通过区块链格式的抽象化中提供 PDK，但平行链实际上甚至不必是区块链。例如平行链只需满足上文列出的两个要求：*状态转换函数*和*收集人节点*。其它一切功能取决于 PDK 的实现者。

One interesting idea for a PDK that would be nice to see is to have a [roll-up](https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675) kit that allowed developers to create snark-based parachains. If we review the roll-up write-up, we see that the system uses two roles: users that update **state** and an operator that **aggregates the state updates** into a single on-chain update. It should be straightforward to see how we can translate this to the parachain terms. The state transition function for a roll-up-like parachain would be updating the state (in practice, most likely a merkle tree, which would be easily verifiable) from the user inputs. The operator would act as the collator node, which would aggregate the state and create the zk-SNARK proof that it would hand to the Relay Chain validators for verification.

## 创建 PDK

如果您或您的团队对开发 PDK 感兴趣，请随时在 [W3F 合作库](https://github.com/w3f/Web3-collaboration) 上创建 issue。 Web3 基金会可以为这类工作提供资助。
