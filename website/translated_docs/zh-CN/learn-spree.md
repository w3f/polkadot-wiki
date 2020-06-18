---
id: learn-spree
title: SPREE
sidebar_label: SPREE
---

Shared Protected Runtime Execution Enclaves (SPREE) 有时被称为"信任虫洞"，是逻辑的碎片与 Substrate 中的 Runtime 模块类似但位于 Polkadot 中继链上，并且可以通过被平行链选择。

SPREE 简要地描述了以下属性和功能：

- 平行链可以选择加入特殊的 Runtime 逻辑（例如智能合约）。
- 这些碎片有自己的存储空间和自己的 [XCMP](learn-crosschain) 端点。
- 跨链的所有实例具有相同的逻辑。
- 它与平行链一起执行。
- 受保护：存储不能通过平行链逻辑更改，消息不能被平行链伪造。

## 起源

2019年3月28日，波尔社区会员 u/Tawaren在 [r/dot](https://www.reddit.com/r/dot/)上发帖名为 "智能协议理念" 并提出了建议給[智能协议](https://www.reddit.com/r/dot/comments/b6kljn/smartprotocols_idea/)。这篇文章的核心见解是 XCMP 的复杂之处在于难以去信任地验证和证明代码在平行链上执行。一种解决方案是将 SmartProtocols 放在中继链中，将 blobs 代码孤立 ，每个实例具有自己的存储，只能通过每个平行链的接口进行更改。 SmartProtocols 是 SPREE 的前身。

## 什么是 SPREE 模块？

SPREE 模块是逻辑片段（具体而言，它们是 WebAssembly 代码的 blob），通过治理机制或平行链上载到波卡。一旦 blob 上载到波卡，所有其他平行链可以决定选择加入逻辑。SPREE 模块将保留自己的存储与平行链分隔，但会能够通过与平行链的接口调用。平行链将同步向 SPREE 模块发送消息。

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

通过在 A.X 处发起交易以将特定余额减少1，XCMP上的消息可以去信任发送到 B.X 以使余额增加1。

Collators, represented as the green triangle are responsible for relaying this message from parachain A to parachain B, as well as mantaining the storage for each particular instance of A.X and B.X for their respective parachains. They provide proofs of valid state transitions to the Relay Chain validators, represented as blue diamonds.

验证人可以通过提供之前的 SPREE 模块实例的状态根和实例之间的 XCMP 消息的数据以及实例的下一个状态根去验证 SPREE 模块的 A.X 和 B.X 正确状态转换。它们执行此验证是对照 SPREE 模块提供的`验证`函数对其进行检查 API。收集人是需要能够提供此信息，以便处理其平行链。

## 比喻

SPREE 模块就像烹饪书中的食谱。 让我们考虑一个示例比较。 我们在餐厅里，我们命令厨师煮蛋奶酥。 我们对厨师的能力有足够的信心，我们对将要做的事情含糊不清，但是对如何做才没有真正的保证。 如果我们想确定制作蛋奶酥的确切执行方式，那么我们需要事先检查厨师的厨房并验证自己如何制作蛋奶酥。 这类似于在没有 SPREE 的情况下发送 XCMP 消息，因为发送方负责自己验证接收链的代码。

但是假设某位厨师有舒芙蕾制作者手册，在他们的书架上，并承诺只从这本书制作舒芙蕾。 现在大家可以看这本书，并且对我们告诉厨师做舒芙蕾时会发生的事情有准确的了解。 当我们下订单制作第10页上写的舒芙蕾时，我们便确切地知道了厨师厨房中将执行的操作以及最终将返回餐桌的成品。 此外，我们去任何厨房都可以询问厨师是否拥有这本书，如果可以，我们可以订购标准食谱，并确保在厨师的厨房中可以执行。 像本烹饪书中的食谱一样，我们只需验证一次 SPREE 模块即可确保其在所有平行链中的执行。如果我们知道平行链使用特定的 SPREE 模块，则无需了解其它有关平行链如何实现。
