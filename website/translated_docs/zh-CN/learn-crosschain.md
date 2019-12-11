---
id: learn-crosschain
title: Cross-chain Message Passing (XCMP)
sidebar_label: Cross-chain Message Passing (XCMP)
---

Cross-chain transactions are resolved using a simple queuing mechanism based around a Merkle tree to ensure fidelity. It is the task of the relay-chain validators to move transactions on the output queue of one parachain into the input queue of the destination parachain.

入口和出口队列在代码中通常称为"入口(ingress)"和"出口(egress)"信息。

## 概述

- Cross-chain messages will *not* go on to the relay chain.
- Cross-chain messages will be constrained to a maximum size in bytes.
- 平行链可以拒绝接收从其它平行链发出的信息，在这种情况下，发送方会意识到有障碍
- 校对人负责把平行链之间的信息传递
- 校对人产生"出口"列表信息並会在"入口"接收到其它平行链信息
- 平行链在每个区块中，将会传递所有其它平行链信息
- 当校对人产生了区块并提交给验证人，它会收集最新入口队列信息并且处理它
- 验证人将会对校对人提交的平行链区块进行验证，包括处理到该平行链预期入口的信息

## 例子

从平行链A里的智能合约发送信息到平行链B里的另一个智能合约，达到链与链之间资产转移。

Charlie executes the smart contract on parachain A which initiates a new cross-chain message for the destination of a smart contract on parachain B.

The collator node of parachain A will place this new cross-chain message into its outbound messages queue, along with a `destination` and a `timestamp`.

平行链B的校对人会持续地问其它校对人节点是否有新信息(通过筛选`目的地`)，当平行链B的校对人问是否有新信息时，它会看到从平行链A发送过来的信息并且把它加到下一个区块中的入口队列。

平行链A和B的验证人同样也会读取出口队列并且发现该信息，这样它们就可以验证传输中信息。

当平行链B的校对人在打包区块的时候，它会处理在入口队列中的新信息和其它发现或接收到的信息。

在处理时，平行链B里的智能合约会执行该信息并且完成资产转移。

然后校对人提交该区块给验证人，并且核对信息是否处已经处理。如果信息经已处理好和区块中其它方面是有效，验证人便会把该区块包括到中继链上。

## 资源

- [XCMP Scheme](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Full technical description of cross-chain communication on the Web3 Foundation research wiki.
