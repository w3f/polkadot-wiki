---
id: learn-randomness
title: 随机性
sidebar_label: 随机性
---

## VRFs

BABE 根据抵押金额并使用 Polkadot 随机周期为验证者分配区块生产时段。

Polkadot 中使用的 VRF 与 Ouroboros Praos 中使用的 VRF 大致相同。Ouroboros 的随机性对于区 块生产来和 BABE 来说效果很好。因为攻击者可以操纵这种随机性并影响验证人对于平行链的选择，  所以 Polkadot 需要产生更强大的随机性。

目前已有提出了被认为具有更强随机性的解决方案，但是每种解决方案都有其自身的弱点（请参阅[本节](https://research.web3.foundation/en/latest/polkadot/BABE/sortition/)在 Web3 研究维基中获得更完整的说明）。因此 Polkadot 使用基于 VRF 的随机性。

## 可验证延迟函数 (VDFs)

[可验证延迟函数](https://vdfresearch.org/)即使在并行计算机上，也是需要指定时间才能完成的计算。 它们产生独特的输出使可以在公开设置中独立有效地进行验证。

## 其他区块链随机性的方法

- [ RANDAO ](https://github.com/randao/randao) - RANDAO 要求每个验证人通过对某些种子执行一系列哈希操作来进行准备。 验证人然后在一个回合中发布最终的哈希值，加上随机数是从每个参与者进入游戏中得出。只要有一名诚实的验证人参加，随机性就被认为是安全（在经济上进行攻击是不可行）。Polkadot 不选用 VRF 的随机性方法是因为从每个区块生产者处揭示每个时隙的哈希值需要二次带宽或至少二次计算。

## 资源

- [关于 Polkadot 中使用随机性的讨论](https://github.com/paritytech/ink/issues/57) - W3F 研究人员讨论了 Polkadot 中的随机性，何时用以及在哪些假设下进行。
