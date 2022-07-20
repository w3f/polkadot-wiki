---
id: learn-spree
title: SPREE
sidebar_label: SPREE
---

Shared Protected Runtime Execution Enclaves (SPREE) sometimes referred to as "trust wormholes," are fragments of logic comparable to runtime modules in Substrate, but live on the Polkadot Relay Chain and may be opted into by parachains.

SPREE 简要地描述了以下属性和功能：

- 平行链可以选择加入特殊的 Runtime 逻辑（例如智能合约）。
- 这些碎片有自己的存储空间和自己的 [XCMP](learn-xcm) 端点。
- 跨链的所有实例具有相同的逻辑。
- It executes alongside parachain logic.
- 受保护：存储不能通过平行链逻辑更改，消息不能被平行链伪造。

## 起源

On 28 March, 2019 u/Tawaren, a member of the Polkadot community, made a post on [r/dot](https://www.reddit.com/r/dot/) called "SmartProtocols Idea" and laid out a proposal for [Smart Protocols](https://www.reddit.com/r/dot/comments/b6kljn/smartprotocols_idea/). The core insight of the post was that XCMP had a complication in that it was difficult to verify and prove code was executed on a parachain without trust. A solution was to install the SmartProtocols in the Relay Chain that would be isolated blobs of code with their own storage per instance that could only be changed through an interface with each parachain. SmartProtocols are the precursor to SPREE.

## 什么是 SPREE 模块？

SPREE modules are fragments of logic (in concrete terms they are blobs of [WebAssembly](learn-wasm) code) that are uploaded onto Polkadot through a governance mechanism or by parachains. Once the blob is uploaded to Polkadot, all other parachains can decide to opt-in to the logic. The SPREE module would retain its own storage independent of the parachain, but would be callable through an interface with the parachain. Parachains will send messages to the SPREE module synchronously.

SPREE 模块对整个 XCMP 结构非常重要，因为它为将在目标平行链上执行。虽然 XCMP 保证消息的传递，但它不保证什么代码将执行，即接收平行链将如何解释消息。XCMP 实现去信任传递消息，SPREE 是 XCMP 效用的关键部分。

SPREE 模块就像食谱。 例如如果我们向厨师下令制作舒芙蕾，对厨师的能力非常有信心，我们对将要做的事情有模糊的想法，但实际上并不确定如何做。 但是假设某位厨师的书架上有 "SouffléMaker's 手册"，自己只能从这本书制作舒芙蕾。 现在我们还可以查阅厨师所拥有的一本书，了解当我们告诉厨师做舒芙蕾时会发生什么。 在此示例中" 制作舒芙蕾" 是 XCMP 的信息而菜谱是 SPREE 模块。

In concrete terms, SPREE modules could be useful for various functionality on Polkadot. One suggested use case of SPREE modules is for a trustless decentralized exchange that is offered as functionality to any parachain without any extra effort from parachain developers. One can imagine this working by having a SPREE module that exposes the interface for the incrementing and decrementing of balances of various assets based on a unique identifier.

## 为什么?

Sending messages across parachains in XCMP only ensures that the message will be delivered but does not specify the code that will be executed, or how the message will be interpreted by the receiving parachain. There would be ways around this such as requesting a verifiable receipt of the execution from the receiving parachain, but in the naked case the other parachain would have to be trusted. Having shared code that exists in appendices that the parachain can opt-in to resolves the need for trust and makes the execution of the appendices completely trustless.

SPREE 将有助于确保在 SPREE 模块平行链之间共享相同的逻辑。一个特别相关的用例将围绕跨平行链代币转移，在发送和接收平行链就如何更改代币的总供应量和基本接口达成一致非常重要。

## 例子

![spree example](assets/SPREE/spree_module.png)

上图是简化 Polkadot 的系统。

In this diagram we see that the Wasm code for SPREE module "X" has been uploaded to the Polkadot Relay Chain. The two cylinders "A" and "B" represent two distinct parachains that have both opted-in to this SPREE module creating two distinct instances of it with their own XCMP endpoints "A.X" and "B.X".

在示例中，我们假设此 SPREE 模块 "X" 包含用于递增或递减该模块特定资产的余额。

通过在 A.X 处发起交易以将特定余额减少 1，XCMP 上的消息可以去信任发送到 B.X 以使余额增加 1。

Collators, represented as the green triangle are responsible for relaying this message from parachain A to parachain B, as well as mantaining the storage for each particular instance of A.X and B.X for their respective parachains. They provide proofs of valid state transitions to the Relay Chain validators, represented as blue diamonds.

验证人可以通过提供之前的 SPREE 模块实例的状态根和实例之间的 XCMP 消息的数据以及实例的下一个状态根去验证 SPREE 模块的 A.X 和 B.X 正确状态转换。它们执行此验证是对照 SPREE 模块提供的`验证`函数对其进行检查 API。收集人是需要能够提供此信息，以便处理其平行链。
