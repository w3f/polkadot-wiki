---
id: learn-randomness
title: 随机性
sidebar_label: 随机性
---

权益证明(PoS)区块链的随机性对于验证人责任的公平并且不可预测的分配是非常重要。 ，因为计算机是确定性设备，所以它们在随机数方面很差(同样输入总是会产生同样输出)。大部份人通常在计算机上(例如游戏应用程序中)称随机数实际上是_伪随机_- 也就是说它们依赖用户或其他类型的_Oracle_ 提供足够随机的_seed_，例如[气象站的大气噪声](https://www.random.org/randomness/), [心跳率](https://mdpi.altmetric.com/details/47574324)或什至[熔岩灯](https://en.wikipedia.org/wiki/Lavarand)，就可以从中产生一系列看似随机的数字。但是如果给相同的种子，结果将会是一样。

这些输入将根据时间和空间而变化，但是不可能将相同的结果输入到全球特定区块链的所有节点中。如果节点获得不同的输入以创建区块，则会发生分叉。显然现实世界中的熵不适合用作区块链随机性的种子。

至今区块链有二种可用的随机性方法: RANDAO 和 VRF。 Polkadot 使用 VRF。

## VRF

可验证随机函数(VRF)是数学运算，需要一些输入并产生随机数以及该提交者生成该随机数的真实性证明。任何挑战者都可以验证该证明，以确保随机数生成有效。

Polkadot 中使用的 VRF 与 Ouroboros Praos 中的大致相同。 Ouroboros 随机性对于块生产来说是安全并对 BABE 来说效果很好。它们不同之处在于 Polkadot 的 VRF 不依赖于中央时钟(问题变了-谁的中央时钟?)，而是取决于它自己过去结果来确定现在和将来的结果，并且它使用插槽数字作为时钟模拟器估计时间。

具体操作如下:

Slots are discrete units of time six seconds in length. Each slot can contain a block, but may not. Slots make up epochs - on Polkadot, 2400 slots make one epoch, which makes epochs four hours long.

In every slot, each validator "rolls a die". They execute a function (the VRF) that takes as input the following:

- **The "secret key",** a key specifically made for these die rolls.
- **An epoch randomness value,** which is The hash of VRF values from the blocks in the epoch before last (N-2), so past randomness has an effect on the current pending randomness (N).
- **时隙号**

![](assets/VRF_babe.png)

输出为两个数值: ` RESULT `(随机值)和` PROOF `(证明随机数值已正确生成的证明)。

然后将` RESULT `与该协议实现中定义的_阈值 (threshold) _(在 Polkadot Host)进行比较。如果该值小于阈值，那么掷此数字的验证人将是可在该插槽的区块生产候选者。然后，验证人尝试创建一个区块，并将该区块与先前获得的` PROOF `和` RESULT `一起提交到网络中。

The fishermen - nodes watching the network for collator and validator wrongdoing - will be verifying Relay Chain blocks. Since an illegal roll will generate an illegal block, and since fishermen will have access to the `RESULT` and `PROOF` in every block produced by a validator, it'll be easy for them to automatically report cheating validators.

总结: 在 VRF 中，每个验证人都会为自己掷出一个数字，并根据阈值对其进行检查，如果随机掷骰低于该阈值，则会生產區块。 钓鱼人监察网络并报告不良行为验证这些掷骰的有效性，并向系统报告任何作弊行为(例如尽管掷出的人数超过阈值，但有人假装成块生产區塊者)。

精明的读者会注意到，这种工作方式某些时隙可能没有验证人作为区块链生产者候选者，因为所有验证候选者的得分都太高而错过了阈值值。我们在[ wiki 共识页面](learn-consensus)中说明了如何解决此问题，并确保 Polkadot 出块时间保持在恒定时间。

## RANDAO

[ RANDAO ](https://github.com/randao/randao) - RANDAO 要求每个验证人通过对某些种子执行一系列哈希操作来进行准备。 验证人然后在一个回合中发布最终的哈希值，加上随机数是从每个参与者进入游戏中得出。只要有一名诚实的验证人参加，随机性就被认为是安全（在经济上进行攻击是不可行）。Polkadot 不选用 VRF 的随机性方法是因为从每个区块生产者处揭示每个时隙的哈希值需要二次带宽或至少二次计算。

RANDAO 可选增加VDF。

### VDFs

[Verifiable Delay Functions](https://vdfresearch.org/) are computations that take a prescribed duration of time to complete, even on parallel computers. They produce unique output that can be independently and efficiently verified in a public setting. By feeding the result of RANDAO into a VDF, a delay is introduced that renders any attacker's attempt at influencing the current randomness obsolete.

VDFs will likely be implemented through ASIC devices that need to be run separately from the other types of nodes. Although only one is enough to keep the system secure, and they will be open source and distributed at nearly no charge, running them is neither cheap nor incentivized, producing unneccessary friction for users of the blockchains opting for this method.

## 资源

- [ Polkadot 对区块链随机性的研究](https://research.web3.foundation/en/latest/polkadot/BABE/Babe.html) - 包含做出选择的理由以及证明
- [关于 Polkadot 中使用随机性的讨论](https://github.com/paritytech/ink/issues/57) - W3F 研究人员讨论了 Polkadot 中的随机性，何时用以及在哪些假设下进行。
