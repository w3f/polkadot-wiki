---
id: learn-phragmen
title: 顺序弗拉格曼方法
sidebar_label: 顺序弗拉格曼方法
---

## 什么是顺序弗拉格曼(Phragmen)方法 ？

顺序弗拉格曼方法是在1890年 Edvard-Phragmen 提出的一种多赢家选举方法。

下面的引文摘自参考书[ 弗拉格曼论文](https://arxiv.org/pdf/1611.08826.pdf)，总结了顺序弗拉格曼方法的目的：

> 弗拉格曼法在多成员选区的议会选举中讨论了这一问题。当然在地方选举中也可能出现 相同的问题，但在许多情况下，例如在组织中选董事会或委员会时，也会出现同样的问题。

## Polkadot 中哪里使用弗拉格曼方法？

### NPoS: 验证人选举

提名股权证明(NPoS)计划中使用了顺序弗拉格曼方法，根据验证人自身的抵押和提名人投票给他们的抵押来选择验证人。它还会在每个选举回合之后使验证人之间的权重相等。由于验证人在 Polkadot 中的报酬相同，因此分散每个验证人的抵押很重要。每次验证人选举均采用两次均衡方法。第一次迭代将在所有验证人候选者之间进行大概 均衡，以确定将成为下一轮的有效验证人。第二轮迭代仅在当选候选人之间进行，以使当选候选人之间的抵押相等。

### 议会选举

议会选举机制中也使用了弗拉格曼方法。当您在投票选理事会成员时，您最多可以选择16个不同的候选人，然后设置绑定 DOTs 数量，这是您的投票权重。弗拉格曼将会在每次选举中运行一次以选出一个最高票候选人担任理事会职位，然后在最高票候选人之间尽可能平衡他们背后的选票权重。

## 对验证人意味着什么？

尽管弗拉格曼在背后运行，不需要您额外付出，但是最好了解它背后是如何运作，因为并非在选举后，所有抵押都会最终落到您的验证人身上。提名人可能会提名数个他们认为会做得好的验证人。

您可以使用[ 离线 - 弗拉格曼 ](https://github.com/kianenigma/offline-phragmen)脚本来预测在新纪元开始之前验证人选举的结果 。

## 外部资源

- [弗拉格曼在 W3F 研究专页](https://research.web3.foundation/en/latest/polkadot/NPoS/4.%20Sequential%20Phragmén’s%20method/) - 适用于 Polkadot 验证人的弗拉格曼方法。
- [ Python 实现参考](https://github.com/w3f/consensus/tree/master/NPoS)-简单到复杂的弗拉格曼实现。
- [ Substrate 实现](https://github.com/paritytech/substrate/blob/master/core/phragmen/src/lib.rs)-Substrate Runtime 模块库中使用 Rust 的实现。
- [ 弗拉格曼和蒂勒的选举方法](https://arxiv.org/pdf/1611.08826.pdf) - 95页的论文详细解释了弗拉格曼的选举方法。
- [离线弗拉格曼 ](https://github.com/kianenigma/offline-phragmen) - 在一个纪元开始之前运算弗拉格曼验证人选举结果的脚本。
