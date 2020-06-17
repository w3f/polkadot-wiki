---
id: learn-crosschain
title: 跨链消息传递 (XCMP)
sidebar_label: 跨链消息传递 (XCMP)
---

Cross-chain transactions are resolved using a simple queuing mechanism based around a Merkle tree to ensure fidelity. It is the task of the Relay Chain validators to move transactions on the output queue of one parachain into the input queue of the destination parachain.

入口和出口队列在代码中通常称为"入口(ingress)"和"出口(egress)"信息。

## 概述

- Cross-chain messages will _not_ go on to the Relay Chain.
- 跨链消息有长度限制
- 平行链可以拒绝接收从其它平行链发出的信息，在这种情况下，发送方会意识到有障碍
- 收集人节点负责把平行链之间的信息传递
- 收集人产生"出口"列表信息並会在"入口"接收到其它平行链信息
- 平行链在每个区块中，将会传递所有其它平行链信息
- 当收集人产生了区块并提交给验证人，它会收集最新入口队列信息并且处理它
- 验证人将会对收集人提交的平行链区块进行验证，包括处理到该平行链预期入口的信息

## 例子

从平行链 A 里的智能合约发送信息到平行链 B 里的另一个智能合约，达到链与链之间资产转移。

Charlie executes the smart contract on parachain A, which initiates a new cross-chain message for the destination of a smart contract on parachain B.

平行链 A 的校对人会把跨链信息连同`目的地(destination)`和`时间(timestamp)`放到出口信息队列中。

平行链 B 的收集人会持续地问其它收集人节点是否有新信息(通过筛选`目的地`)，当平行链 B 的收集人问是否有新信息时，它会看到从平行链 A 发送过来的信息并且把它加到下一个区块中的入口队列。

平行链 A 和 B 的验证人同样也会读取出口队列并且发现该信息，这样它们就可以验证传输中信息。

当平行链 B 的收集人在打包区块的时候，它会处理在入口队列中的新信息和其它发现或接收到的信息。

在处理时，平行链 B 里的智能合约会执行该信息并且完成资产转移。

The collator now hands this block to the validator, which itself will verify that this message was processed. If the message was processed and all other aspects of the block are valid, the validator will include this block for parachain B into the Relay Chain.

## 资源

- [XCMP 方案](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Web3 基金会研究维基上的跨链通信的完整技术描述。
