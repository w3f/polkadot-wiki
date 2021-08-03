---
id: learn-comparisons-dfinity
title: Dfinity 与 Polkadot 区别
sidebar_label: Dfinity
---

Dfinity 自称 "互联网计算机" 并与以太坊定位为姐妹项目。 Dfinity 一直自2016年起开发，该产品的发布版本 "Copper" 本应于2017年问世，但似乎从未发布。 2019年大众尚未看到 Dfinity 的大部分客户端代码，因为他们仅在 [GitHub](https://github.com/dfinity) 发布帮助库。 封闭代码的开发本質与 Polkadot 从2017年初开始在[ GitHub 上开放](https://github.com/paritytech/polkadot)了 Rust 参考实现。

### 算法治理

Dfinity 是算法治理的有力支持者，已经发布了[两篇](https://medium.com/dfinity/the-dfinity-blockchain-nervous-system-a5dd1783288e#.duzxztt9k)关于该主题的[博客文章](https://medium.com/dfinity/future-governance-integrating-traditional-ai-technology-into-the-blockchain-nervous-system-825ababf9d9)。

Dfinitiy 提出了称为 "区块链神经系统(BNS)" 的治理框架，但是它们没有在2018年发布前两篇博客文章后，确定使用任何的算法或更多信息。

与 Polkadot 广泛的治理机制相比，博客文章中描述的 BNS 简化了链上治理， 它仅通过 "信任专家" 跟随最重神经元的方法来决定分叉链。

Polkadot 允许通过投票机制，三权分立制衡模型以及无需更新客户端即可链上升级的管理机制，来更细化治理机制。

### 共识

Dfinity 使用由身份层，随机信标层，区块链层和公证层组成的四层共识。

身份层处理共识协议的股权证明注册和反女巫攻击机制。在 Polkadot 我们会将身份层与 NPoS 部份功能进行比较，该功能会处理存放抵押和抵抗女巫攻击，同时还可以用作选择节点的算法。 Dfinity 预计需要存入固定的抵押，所以他们不会实现选择节点集，因为它本身 PoS 中內有。当帐户存入金后便成为验证者。 Polkadot 更加灵活，允许可变的抵押，并具有提名人角色参与抵押，而无需自己运行验证人架构。

在 Dfinity 中随机信标层用于创造随机数，这是区块链和公证层的基础。它采用基于 BLS 阈值签名的可验证随机函数(VRF)，并且需要生成分布式密钥(DKG)。基于 BLS 阈值的 VRF 能够解决 "最后参与者" 问题，在该问题中，协议的最终参与者可以通过预测随机性而不发布它来中止。尽管 Polkadot 在 BABE 生产区块协议中也采用了 VRF，但它没有遇到 "最后参与者" 问题，因为它使用了另一种在本地产生随机性的 VRF，但仍允许全局进行验证。随机信标是从两个区块前的 VRF 中提取，可以证明是安全的。

The blockchain and fork resolution layer used in Dfinity is known as _probablistic slot protocol_ and uses the randomness from the random beacon to give priority to each proposer for a particular block. Within a constant block time, all proposals generated are sent to notaries, which sign the block from the heaviest weighted proposal that they see and broadcast it. Forks are then decided based on the weight that was assigned to proposers in that round, with the heaviest proposer's block taking priority. Polkadot's BABE block production uses the random beacon from the previous VRF outputs to assign weights to producers too. The individual producers then create local randomness and if it beats a threshold as determined by their weight, that producer will produce a new block. BABE achieves constant block time by having a fallback to the Aura round robin style block assignment if for a particular slot no producer generated a random number that fell below their threshold. In BABE forks can happen if more than one producer pulls a correct "lottery ticket" random number, and in this case will rely on the chain selection rule, which uses the last finalized chain from GRANDPA to build on.

Finally, in the notarization and _near-instant finality_ layer of Dfinity, the blocks that are produced in the previous layer are notarized by the committee of validators. The notarization is a timestamp and a proof that the block has been published to the network, which prevents a malicious validator from creating a private chain and revealing it later. The notarization mechanism aims to solve the selfish mining attack and the nothing at stake problem. The notarized blocks are then agreed on in a further finalization mechanism.

大家不用太在意术语_接近即时确认性_，因为这术语跟"即时确认性"基本上只是拜占庭协议的营销术语，并且掩盖了确认性工具的实际功能。例如可以将 Dfinity 共识的公证和最终回合与标准 BFT 协议的 pre-commit 和 pre-vote 进行比较。虽然由于 Dfinity 具有用于生成和最终确认区块的两步机制(跟 Polkadot 在 BABE 和 GRANDPA 上的做法非常类似)，因此两种协议的最终确认时间应该是可比的。 GRANDPA 有不错的性能，例如可以一次确认整个链的区块，而不是一次一个区块，这使其对 Dfinity 概述的最终确认性机制有所改进。
