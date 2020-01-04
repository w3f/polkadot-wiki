---
id: learn-spree
title: SPREE
sidebar_label: SPREE
---

Shared Protected Runtime Execution Enclaves (SPREE) 有时被称为"信任虫洞"，是逻辑的碎片与 Substrate 中的 Runtime 模块类似但位于 Polkadot 中继链上，并且可以通过被平行链选择。

SPREE 简要地描述了以下属性和功能：

- 平行链可以选择加入特殊的 Runtime 逻辑（例如智能合约）。
- These fragments have their own storage and own [XCMP](learn-crosschain) endpoint.
- 跨链的所有实例具有相同的逻辑。
- 它与平行链一起执行。
- 受保护：存储不能通过平行链逻辑更改，消息不能被平行链伪造。

## 起源

On 28 March, 2019 u/Tawaren, a member of the Polkadot community, made a post on [r/dot](https://www.reddit.com/r/dot/) called "SmartProtocols Idea" and laid out a proposal for [Smart Protocols](https://www.reddit.com/r/dot/comments/b6kljn/smartprotocols_idea/). The core insight of the post was that XCMP had a complication in that it was difficult to verify and prove code was executed on a parachain without trust. A solution was to install the SmartProtocols in the Relaychain that would be isolated blobs of code with their own storage per instance that could only be changed through an interface with each parachain. SmartProtocols are the precursor to SPREE.

## 什么是 SPREE 模块？

SPREE模块是逻辑片段（具体而言，它们是 WebAssembly 代码的 blob），通过治理机制或平行链上载到波卡。一旦 blob 上载到波卡，所有其他平行链可以决定选择加入逻辑。SPREE模块将保留自己的存储与平行链分隔，但会能够通过与平行链的接口调用。平行链将同步向 SPREE 模块发送消息。

SPREE modules are important to the overall XCMP architecture because they give guarentee to the code that will be executed on destination parachains. While XCMP guarantees the delivery of a message, it does not guarantee what code will be executed, i.e. how the receiving parachain will interpret the message. While XCMP accomplishes trustless message passing, SPREE is the trustless interpenetration of the message and a key part to the usefulness of XCMP.

SPREE modules are like recipes in cookbooks. For example, if we give an order to a cook to make a soufflé, and we’re decently confident in the ability of the cook, we have a vague idea of what will be made but no actually surety how it will be made. However, let’s say that a cook has the “Soufflé Maker’s Manual” on their bookshelf and has committed themselves to only make souffles from this book. Now we can also consult the same book that the cook has, and we have a precise understanding of what will happen when we tell the cook to make a soufflé. In this example, “make a soufflé” was the message in XCMP and the cookbook was the SPREE module.

具体来说 SPREE 模块对于波卡的各种功能非常有用。其中一个 SPREE 模块用例是适用于去中心化交易所，作为提供功能给任何平行链，开发者无需任何额外的工夫。可以想象有 SPREE 模块，该模块会公开了各种资产余额递增和递减唯一标识的接口。

## 为什么?

Sending messages across parachains in XCMP only ensures that the message will be delivered but does not specify the code that will be executed, or how the message will be interpreted by the receiving parachain. There would be ways around this such as requesting a verifiable receipt of the execution from the receiving parachain, but in the naked case the other parachain would have to be trusted. Having shared code which exists in appendices that the parachain can opt-in to resolves the need for trust and makes the execution of the appendices completely trustless.

SPREE 将有助于确保在 SPREE 模块平行链之间共享相同的逻辑。一个特别相关的用例将围绕跨平行链代币转移，在发送和接收平行链就如何更改代币的总供应量和基本接口达成一致非常重要。

## 例子

![spree example](assets/SPREE/spree_module.png)

上图是简化 Polkadot 的系统。

In this diagram we see that the Wasm code for SPREE module "X" has been uploaded to the Polkadot relay chain. The two cylinders "A" and "B" represent two distinct parachains that have both opted-in to this SPREE module creating two distinct instances of it with their own XCMP endpoints "A.X" and "B.X".

在示例中，我们假设此 SPREE 模块 "X" 包含用于递增或递减该模块特定资产的余额。

By initiating a transaction at A.X to decrease a particular balance by 1, a message over XCMP can be trustlessly sent to B.X to increase a balance by 1.

表示为绿色三角形的收集人负责将消息从平行链 A 传递到平行链 B，以及为 A.X 和 B.X 的每个特定实例为其各自的平行链维护存储。 它们向中继链验证人提供有效状态转换的证明，以蓝色菱形表示。

Validators can validate the correct state transitions of SPREE modules A.X and B.X by being provided with the previous state root of the SPREE module instances, the data of the XCMP message between the instances, and the next state root of the instance. They do this validation be checking it against the `validate` function as provided by the SPREE module API. Collators are expected to be able to provide this information in order to progress their parachains.
