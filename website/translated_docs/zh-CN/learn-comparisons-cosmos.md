---
id: learn-comparisons-cosmos
title: 设计比较
sidebar_label: Cosmos
---

Polkadot 和 Cosmos 都是区块链领域旨在解决互操作性和可扩展性的项目。

Polkadot 采用共享状态异构多链方法，而 Cosmos 则假设所有链都是独立，但相互连接。

本文将试图打破 Polkadot 和 Cosmos 设计之间的核心区别，解释每个设计的优点和缺点，并争辩这两个项目在本质上是互补。

## 一句说话

Polkadot 是异构分片多链，具有可扩展的安全性和去信任的数据传输协议。

Cosmos 由具有独立安全性的单链和它们之间的桥梁组成，允许传输消息。

## 架构

### Polkadot

Polkadot 链的中心是中继链，所有验证人都可以通过使用权益证明参与 Polkadot 的混合共识模型(称为 BABE/GRANDPA) 来验证中继链。

验证人通过 NPoS 方案被选择出来，即 DOT 持有人使用他们的抵押提名多位验证人和将他们的抵押尽可能平均分配到验证人。想了解更多 Polkadot's NPoS按[这里](https://medium.com/web3foundation/how-nominated-proof-of-stake-will-work-in-polkadot-377d70c6bd43)。

Polkadot 是分片设计，它允许具有自己逻辑的平街链连接和共享中继链验证人的安全性。这些平行链(缩写是并行链)是侧链和分片之间的部分，因为它们封装了自己的状态和状态转换，但必须将其报告给中继链以进行验证。

For each parachain, a type of network maintainer known as the collators engage with a subset of validators by handing proofs of state transitions which the validators can then easily verify. In this way, only a few validators are assigned to verify each parachain shard and computation can scale with the number of parachains. Parachains are able to transmit data between each other in a trustless manner which can be escalated to the security of the entire relay-chain validator set when necessary (known as XCMP, more on that below).

Polkadot 上的一些平行链将充当外部链的解释器，例如比特币，以太坊和 Cosmos。 这些被称为桥转链。

### Cosmos

Cosmos 宇宙中没有中心，以真正的分散方式。每个链都是独立的，并维护自己的验证人。但是*hubs*(例如Cosmos Hub或[ Iris Hub ](https://www.irisnet.org))提供了一个结合点，使连锁的链可以交流的。

Cosmos 不会尝试在由桥*zones*和 hubs 连接的链之间创建共享安全性的环境。 相反它们采取主权第一的方法，并严格要求链条维护自己的验证人和经济安全。

Cosmos 通过使用所谓的*peg zones*连接到外部链，该提供了一种可以理解外部共识的专门桥梁。对于满足[共识要求](https://github.com/cosmos/ics/tree/master/spec/ics-002-consensus-verification)的所有链，它们的互操作性协议(称为 IBC，请参见下文)。

Cosmos hub 使用权益证明算法，该算法通过支持验证人的代币数量对验证人进行加权。它还允许较小的持有者将其代币委派给其验证人之一(目前为100个，但计划将其数量增加到>300)。但是 Cosmos 中的其他 zones 可能会实施此不一样 的权益证明方案。

## 信任模式

Polkadot 和 Cosmos 通过严厉的惩罚来实施，使其验证人不会做不诚实的行为，如果发现验证人做错了事，他们抵押中的代币就会被耗尽。

如果验证人的子集无法为平行链进行新的状态转换，Polkadot 则取决于完整的验证人。 在任何时候，都有可能利用所有 Polkadot 的整个安全性。 这是因为Polkadot 具有共享状态的概念，其中所有部分都组成一个一致的多链。 因此以这种方式，如果一个平行链受到污染，则 Polkadot 的整个状态就能够还原受污染的操作并削减不道德的验证人。

如果发生这种情况，则整个验证人都必须解决冲突，以至于分配给平行链碎片的验证人的绝大多数变得不诚实(或拜占庭，一个以某种方式失败的节点的引用这个词-是否意味着它们已经消失了) 离线或恶意)。

Cosmos 并不是在所有连接的链都具有共享状态的假设下运行的，因此每个链都是独立并有自己负责激励的安全性。 Cosmos IBC 设计不对任何链间消息传递做出额外的安全保证。 如果用户决定将消息从一个 Cosmos Tendermint 链发送到另一个链，然后由于安全性低得多而使第二条链损坏，则可能对原始链产生间接影响。 Cosmos 模型仅与用户使用的桥接链中最不安全的模型一样安全。 预计 Cosmos 上每个链之间的安全性将有很大差异，并且链的用户应了解并理解这一点。 这不同于 Polkadot，后者旨在通过共享状态模型将安全性作为一揽子服务分配给所有平行链。

## 互通性

Polkadot 和 Cosmos 都在研究区块链互操作性协议。

Polkadot uses the Interchainchain Message Passing (XCMP) protocol to send messages between parachains. The messages which are passed can be any arbitrary string of bytes, meaning they could be encoded to be asset transfers or more complex cross-chain calls. XCMP is trustless because it is verified by the validator as part of the validity check of each new parachain block that the messages will be included. Validators only accept new parachain blocks if they've included all of the incoming messages from other parachains (given a one or two blocks buffer). Additionally, the Shared Protected Runtime Execution Environment (SPREE) gives even stronger guarantees that the messages will trigger the same exact code across parachains.

Cosmos 在这方面的工作目前专注于跨链通信(IBC)。 IBC 在网络的传统世界中类似于 TCP，因为它将每个区块链视为具有自己的安全性假设的独立流程。

Both XCMP and IBC require consensus verification, but XCMP provides state machine verification while IBC leaves this aspect up to the user.

> Protip：有关SPREE的更多信息，请参见[此处](https://wiki.polkadot.network/en/latest/polkadot/learn/spree/)。

### 连接 Polkadot 和 Cosmos

精明的读者会注意到 Polkadot 和 Cosmos 分别使用的两种互操作性协议具有不同的格式，并试图实现不同的目标。尽管 Polkadot 希望能够在平行链之间实现去信任的数据传输，但 Cosmos 希望能够从一个区块链最终发送到另一个区块链状消息。

由于 Polkadot 中继链通过使用 GRANDPA 最终性工具达到了最终性，因此 Cosmos 提出的 IBC 方案应该能够与 Polkadot 一起使用（有关[以下部分中](#finality)的最终性的更多信息）。

无需对这两种协议的设计进行任何调整，但用于 IBC 数据包的解释器将需要占用 Polkadot 上的平行链插槽。这样该插槽可以充当 Tendermint 轻客户端和共识解释器，并能够验证已最终签署了哪些区块。在 Cosmos 方面，它们将注意此解释器的区块头，该区块头将包含在中继链区块中。

## 有效性

在 Polkadot 中网络的整个状态的有效性由 100％ 的验证人确保。发生这种情况的方式如下：验证人将洗牌并分配给特定的平行链进行验证。每次平行链提交新区块的证明(即状态转换)时，验证人将仅使用证明和必要数据来验证其有效性。然后验证人必须仅将平行链区块头的哈希提交到中继链区块才能包括在内。这样首先将平行链执行压缩为证明，然后提供给验证人，之后再将其写入到中继链之前进一步压缩它。

Cosmos 不是以相同的方式看待有效性。 Cosmos 链的有效性要求每个链上都有大量验证人，以便在每个区块上签名，并对区块中的交易执行完整的验证。在 Polkadot 的有效性检查过程中发生的压缩行为不会在 Cosmos 的过程中发生。因此在 Cosmos 上，Polkadot 共享状态之间的相同可伸缩性是不可行的，它倾向于采用在稀疏中连接链的方法。

## 可用性

Polkadot 具有其它机制保证数据的可用性并提供更强的安全性保证。这些是在整个验证人和钓鱼人中使用擦除码来获取平行链数据，这些钓鱼人是赏金猎人，他们在监视无效的验证人行为。

Cosmos 链必须保留要验证的链的全部数据，而对于桥接链也必须是该链的轻节点。Cosmos 没有计划在基础层使用擦除代码或钓鱼人，但承认可以在 IBC 之上实施。

## 共识

Polkadot 使用由 BABE(区块生产机制)和GRANDPA(拜占庭确定性工具)组成的混合共识。

Cosmos 使用 Tendermint BFT 共识，这是受到拜占庭容错(PBFT)的启发。

### 确定性

Polkadot 的 GRANDPA 确定性工具可以在多个区块而不是单个区块上实现最终性。 这与 Cosmos 有很大不同，后者在每个方面都达成了共识。 实际上 Cosmos 的 Tendermint 算法将区块生产的行为与最终性结合在一起，这意味着只有在区块确定后才能生产块。 相反 GRANDPA 被置于区块生产(BABE)之上，并且可以一次完成确认一个以上的区块，从而使整个共识流程运行得更快。

### 活跃性

Polkadot 的设计比 Cosmos 的 Tendermint 具有更强的活跃保证，后者将安全性放在了首位。

在 Tendermint 中，一旦超过1/3的验证人，即为拜占庭，则区块生产将随着最终性而停止。

Tendermint 使用基于权重的股权证明算法，该算法根据验证人持有(或委托)的ATOM 数量，为验证人提供投票权。目前每100个验证者中，有5个控制着1/3的股份，因此可能会终止网络的最终确定程序。在 Polkadot 中，验证人的数量将始终是总数的33％(因此如果有100个验证人，则为33)。

一旦 Polkadot 的 GRANDPA 会在超过1/3的验证人是拜占庭时也停止确认区块，而 BABE 将继续产生区块。通过踢出反应迟钝的验证人或重新返回在线的验证人来恢复验证者人后，GRANDPA 将开始最终确定 BABE 同时生成的所有区块。

### 验证人选择 (PoS)

Polkadot 使用提名的股权证明(NPoS)方案来选择其验证人。由于 NPoS 算法为每个验证人提供相等的投票权重，使用称为 Phragmen 的算法来尽可能平均地在所有验证人之间平均分配提名的 DOT。

尽管两个项目中的权益证明模型都不同，但它们都基于经济稳定性。虽然观察到 Cosmos 验证人是幂律关系（在 Polkadot 的 NPoS 均衡算法中称为 Phragmen 方法的情况更难以解决)，但在 Polkadot 中，大戶参与者有可能维护一个以上的验证人。即使是这种情况，Polkadot 也会比非协调故障更强烈地惩罚协调故障。这意味着即使单个参与者运行了多个验证人，也存在更大分散网络的压力。

## 编程语言:

Cosmos 偏爱 Go 编程语言，目前已在 Golang 中构建了 Cosmos-SDK。但是 Tendermint 共识引擎实现了一种称为 ABCI 的二进制有线协议，并具有[多种语言](https://tendermint.com/ecosystem)与之它交互的库。这并不是与 Polkadot 的直接比较，因为 Cosmos Hub 目前仅在 Golang 中具有单个实现。

Polkadot 相比之下目前有五种正在开发中的语言实现: Rust，Golang，JavaScript，Golang 和 C ++。此外，Polkadot 可以将 Web Assembly 用于其 runtime 编译目标，这意味着可以编译为 Wasm 的任何语言都可以用于构造平行链或为 Polkadot 平行链编写智能合约。在开发出更多用于创建平行链的框架之前，仅可以使用 Substrate 和 Rust。

## 总结

与 Cosmos 独立的桥接链网络相比，Polkadot 具有共享状态多链架构。

The trust model of Polkadot ensures that the shared state of parachains are secured by the entire relay-chain validator set, while Cosmos assumes no such shared security and maintains independence of each chain. The XCMP of Polkadot allows for trustless transmission of data among parachains. Cosmos' IBC places no constraint on chains to share state but requires them to fit certain constraints, and does not ensure the same security among each zone. Polkadot ensures validity and availability using erasure codes, which Cosmos does not implement at the base layer. The hybrid BABE/GRANDPA consensus is intended to be able to reach finality more rapidly on chains of blocks than the Cosmos Tendermint algorithm which can only finalize one block at a time. There are stronger liveness guarantees for Polkadot because of the BABE block production mechanism that will continue making blocks even when GRANDPA has halted. Validator set selection using the Phragmen method in Polkadot equalizes validators votes while Cosmos uses stake weighted voting. Finally, Polkadot embraces a broad ecosystem of programming languages thanks to its backbone of WebAssembly, while Cosmos favors the Golang programming language.
