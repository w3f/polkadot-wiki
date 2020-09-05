---
id: learn-launch
title: Polkadot 上线流程
sidebar_label: Polkadot 上线流程
description: 解释 Polkadot 的上线过程及其各个阶段
---

Polkadot 网络将有一个分阶段的推出计划，每个阶段都将有重要的里程碑。 在删除 Sudo 之前，该链将被视为_候选链 (Chain Candidate - CC)_，并且不会完全启动。 在 CC 阶段，由于严重的错误，代码的重大更改或其他情况，链可能会重置并发生巨大变化。

## 启动 PoA

Web3 Foundation 将以 PoA 模式启动 Polkadot。 链功能将仅限于认领和抵押 DOT。 对于计划运行验证人的用户，他们还可以设置其 session 密钥。

在这段时间内，治理仅限于 Sudo 密钥，它将由 Web3 Foundation 持有，以发布完成启动过程所需的命令和升级。 在此期间没有通货膨胀或奖励。

The purpose of PoA is to ensure the network starts properly and allow community [validators](learn-validator) to claim their tokens, set up their infrastructure, and start receiving nominations.

## 提名权益证明 (NPoS)

Once Web3 Foundation is confident in the stability of the network and there are a sufficient number of validator intentions, Web3 Foundation will use [Sudo](https://youtu.be/InekMjJpVdo) - a superuser account with access to [governance](learn-governance) functions - to initiate the first validator election. This election will transition the network from PoA into its second phase, [Nominated Proof of Stake (NPoS)](learn-staking), where the network is [secured by the economic stake](learn-security) that is bonded to the validators by the [nominators](learn-nominator) and the validators themselves.

在时间上，PoS 的过渡将在很大程度上取决于何时有足够数量的验证人准备接管网络的安全性。 此转换可能至少需要 100个良好验证人的支持。

## 治理

当有足够多的验证人正常运行后，Sudo 密钥将发出 runtime 升级，从而启用 Polkadot 中的治理模块套件。即启用[议会](learn-governance#council)，[技术委员会](learn-governance#technical-committee)和<a href =“ learn-governance＃public-referenda”>全民投票</a>。 一旦建立了议会和治理工具，公众便具有实现系统变革的途径。

## 移除 Sudo

runtime 升级 &mdash; 可以通过治理流程或从 Sudo 本身 &mdash; 将从 runtime 移除 Sudo 模块。

从这一点来看，网络完全掌握在代币持有者手中，不再受任何中央机构的控制。 没有Sudo，该链将不再是候选者(CC)，而是一个真的分散网络。

## 余额转账 (Balance Transfers)

为了实现余额转账，社区将必须团结起来，并[为 runtime 升级提出公开议案](maintain-guides-democracy)，以解除对余额转账的限制。 议案通过全民投票后，将有一个制定期，之后该更改将自动生效。

## 核心功能

一旦启用了余额转账，Polkadot 便可以开始开放其核心功能，例如平行链插槽拍卖，平行线程和跨链消息传递。 这些升级将需要通过 Polkadot 的常规治理流程进行的 runtime 升级。 核心功能不必按顺序解锁 &mdash; 可以用一个议案解锁多个功能。
