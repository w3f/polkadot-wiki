---
id: learn-xcm
title: 跨链消息传递 (XCMP)
sidebar_label: 跨链消息传递 (XCMP)
---

Polkadot 使用基于 Merkle 树的简单排队机制实现跨链交易，并确保其真实性。中继链验证者应负责将某一平行链上输出队列中的交易移至目标平行链上的输入队列中。然而，在此过程中，中继链仅存储相关元数据的哈希值。

通常在代码库和相关文档中将输入和输出队列分别成为“入口”和“出口”消息。

## XCMP 概述

XCMP 目前仍处于开发阶段，其具体细节可能改变。但是，其总体架构的设计决定如下：

- 跨链消息将*不会*转发至中继链。
- 跨链消息有长度限制
- 平行链可以拒绝接收从其它平行链发出的信息，在这种情况下，发送方会意识到有障碍
- 收集人节点负责把平行链之间的信息传递
- 收集人产生"出口"列表信息並会在"入口"接收到其它平行链信息
- 平行链在每个区块中，将会传递所有其它平行链信息
- 当收集人产生了区块并提交给验证人，它会收集最新入口队列信息并且处理它
- 验证人将会对收集人提交的平行链区块进行验证，包括处理到该平行链预期入口的信息

XCMP queues must be initiated by first opening a channel between two parachains. The channel is identified by both the sender and recipient parachains, meaning that it's a one-way channel. A pair of parachains can have at most two channels between them, one for sending messages to the other chain and another for receiving messages. The channel will require a deposit in DOT to be opened, which will get returned when the channel is closed.

## 水平中继消息传递（HRMP）

当 XCMP 协议处于部署阶段时，HRMP 协议将作为其替代方案存在。HRMP 协议与 XCMP 协议具有相同的接口及功能，但是其对资源的需求明显高于 XCMP，原因在于其将所有消息都存储在中继链中。当 XCMP 完成部署时，HRMP 将被逐步淘汰。

> 注：stop-gap 协议是原协议功能未完全实现时的临时替代。当 XCMP 仍处于开发过程中时，HRMP 即为其替代协议。

## 垂直消息传递

垂直消息传递分为两种形式，上行消息传递（UMP）和下行消息传递（DMP）。当消息由一平行链或平行线程产生并传递至中继链时使用 UMP。当中继链产生的信息需传递至平行链时使用 UMP。通过 DMP 传递的信息可能在平行链中产生。在此情况下，第一个 UMP 将被用于向中继链传递消息，DMP 用于将该信息下传至另一平行链。

## XCMP 消息格式

关于 XMCP 消息格式的描述，请参阅 GitHub 上的[xcm-format](https://github.com/paritytech/xcm-format) 库。

## XCMP 实例

平行链 A 上存在的智能合约会将一条消息路由到平行链 B，在该消息中调用另一个智能合约，该合约在该链中转移某些资产。

查理(Charlie) 在平行链 A 上执行智能合约，这会为平行链 B 上智能合约的目的地发起新的跨链消息。

平行链 A 的收集人节点会将这个新的跨链消息以及`目的地`和`时间戳`放入其出站消息队列。

平行链 B 的收集人节点会定期 ping 所有其他收集人节点以询问新消息 (通过`destination`字段过滤)。当平行链 B 的收集人进行下一次 ping 时，它将在平行链 A 上看到此新消息，并将其添加到自己的入站队列中，以便将它处理到下一个块中。

平行链 A 的验证者还将读取出站队列并知晓消息。平行链 B 的验证者将执行相同的操作。这样，他们便可以验证消息传输是否发生。

当平行链 B 的收集人正在构建其链上的下一个区块时，它将处理入站队列中的新消息以及可能已找到/接收到的任何其他消息。

在处理期间，该消息将在平行链 B 上执行智能合约并按预期完成资产转移。

收集人现在将此块交给验证程序，验证程序它自己将验证此消息是否已处理。如果消息已处理且该区块的所有其他方面均有效，则验证人会将该平行链 B 的区块包含于中继链中。

请查看下面的动画视频，它探讨了 XCMP 的工作原理。

<!-- Made with Adobe Animate and Canvas -->

<video 
      controls="controls"  
      name="XCMP Animated Video" 
      width="560" height="315"
      src="https://storage.googleapis.com/w3f-tech-ed-contents/XCMP.mp4"> 抱歉，您的浏览器不支持嵌入式视频。 </video>

<style>
video::-webkit-media-controls-fullscreen-button
{
        display: none !important;
}
</style>

## 资源

- [XCMP 方案](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Web3 基金会研究维基上的跨链通信的完整技术描述。
- [消息传递概述](https://w3f.github.io/parachain-implementers-guide/messaging.html) - 一份来自平行链开发者指南中的消息传递方案概述。
- [XCM 格式](https://github.com/paritytech/xcm-format) - XCMP 格式的说明。
