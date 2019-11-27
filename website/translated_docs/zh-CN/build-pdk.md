---
id: build-pdk
title: 平行链开发套件 (PDKs)
sidebar_label: 平行链开发套件 (PDKs)
---

平行链开发工具包(PDK)是一套便于开发者创建兼容[ Polkadot ](learn-parachains)平行链的工具。

## 为什么要创建平行链？

在深入了解什么是 PDK 以及它如何使用之前，让我们回顾一下*为什么*开发者希望创建平行链并将其连接到 Polkadot 中。

平行链拥有两个关键的附加功能，是开发者创建独立链的不二选择：

- *共享安全性* - 去除了自举链的验证人集的必要性。
- _Interchain communication_ - allows parachains to interoperate with each other through the XCMP protocol.

平行链通过为其插槽绑定 [DOT](learn-DOT) 来[出租 Polkadot 网络的安全性](learn-security)，这意味着项目在构建社区和说服验证人参与网络安全性中的社会成本*将有所降低*。预计 Polkadot 的安全性会十分强大，届时想从一安全性中获益的去中心化应用程序将会希望成为平行链。有关通过蜡烛拍卖出租平行链插槽的更多信息，请[点击此处](learn-auction)。

Any decentralized application or chain that wants to enable trustless messaging to other parachains already connected to Polkadot would want to become a parachain. Interoperability between sovereign chains involves certain constraints and complex protocols to enable across a wide breadth of chains. With Polkadot, you will get this feature out of the box if your build your application as a parachain. The [XCMP protocol](learn-interchain) will allow any parachains to interoperate by passing messages between them. Furthermore, as bridges to other chains are launched (such as those to Bitcoin or Ethereum) the parachains will be able to operate with these as well.

## 什么是PDK？

如上所述，PDK是一套便于开发者创建兼容Polkadot的平行链的工具。实际上，这意味着PDK将包含以下几个关键成分：

- _状态转变函数(State transition function)_ - 把你应用程序数据状态状变成另一个状态。
- *收集人节点 (Collator node)* - Polkadot 网络的另一类点对点节点，专门负责平行链。

状态转换函数(STF)是应用程序从某状态转换到另一状态的抽象方法。Polkadot对此STF的唯一限制要求是其必须易于验证——也就是通常我们所说的_见证_或_证明_。STF必须满足此要求，因为中继链验证器需要检查它从校验人节点接收的每个状态是否正确，但不必切实运行整个计算过程。这些证明可能包括有效性证明区块或zk-SNARK（验证所需的计算资源低于生成时的需求量）。STF证明生成的验证不对称是Polkadot能够在确保高安全性的同时进行扩展的重要原因之一。

A collator node is one of the types of network maintainers in the Polkadot protocol. They are responsible for **keeping availability** of the state of the parachain and the new states returned from iteration of the state transition function. They must remain online in order to keep track of the state and also of the XCMP messages that it will route between itself and other parachains. Collator nodes are responsible for passing the succinct proofs to the relay chain validators, and tracking the latest blocks from the relay chain. In essence, a collator node also acts as a light client for the Polkadot relay chain. For more on collator nodes see [here](maintain-collator).

## 目前存在哪些 PDK？

目前唯一存在的 PDK 是 Parity [Substrate](https://github.com/paritytech/substrate) & [Cumulus](https://github.com/paritytech/cumulus)。Substrate 作为区块链框架，提供了区块链的基本构建区块（例如网络层、共识和 Wasm 解释器），以及创建运行时的直观方法。Substrate 旨在简化创建新链，但它并不直接支持 Polkadot 兼容性。因此 Cumulus 附加库将包含所有 Polkadot 兼容性代码。Cumulus 目前还在开发之中，计划做到只通过导入 crate 以及添加一行代码便把你的 Substrate 链变成平行链。

Substrate 和 Cumulus 通过区块链格式的抽象化中提供 PDK，但平行链实际上甚至不必是区块链。例如平行链只需满足上文列出的两个要求：_状态转换函数_和_收集人节点_。其它一切功能取决于 PDK 的实现者。

一个有趣的PDK 想法是有[ roll_up ](https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675) 套件，使允许开发者开发 snark 类型的应用。如果我们看 roll_up 文章，系统使用两个角色: 更新用户的**状态**和操作员**汇合新状态**到链上进行单次更新。这应该直接看成如何将其编译为平行链。类似于 roll up 的平行链状态转换函数将根据用户输入更新状态(实际上很容易验证默克尔树)。操作员将充当收集人节点，将状态汇集并创建 zk-SNARK 证明，并将其交给中继链验证人进行验证。

## 创建 PDK

如果您或您的团队对开发 PDK 感兴趣，请随时在 [W3F 合作库](https://github.com/w3f/Web3-collaboration) 上创建 issue。 Web3 基金会可以为这类工作提供资助。
