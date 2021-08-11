---
id: build-smart-contracts
title: 智能合约
sidebar_label: 智能合约
---

The Polkadot Relay Chain will not support smart contracts natively. However, parachains on Polkadot will support smart contracts. There are already announced projects such as [Edgeware](https://edgewa.re), and thanks to the Substrate built-in [contract pallet](https://substrate.dev/rustdocs/latest/pallet_contracts/index.html), it is likely that more parachains will support this feature.

此外，还有一个 EVM 模块可以让平行链实现以太坊虚拟机，得以支持几乎以太坊合约的直接接口。一些项目用到了[Edgeware](https://edgewa.re)，[Moonbeam](https://moonbeam.network/)和[Frontier](https://github.com/paritytech/frontier)这些方法。

[这里](https://www.youtube.com/watch?v=fKHkFBXaUxQ)提供了有关 Polkadot 和 Kusama 的智能合约情况摘要的视频版本。

## 资源

如果开发者想要开始在基于 Substrate 的平行链上开发并部署智能合约，可以参考这个列表的资源：

- [Edgeware 合约](https://contracts.edgewa.re) - Edgeware合约的文档。
- [ink!](https://github.com/paritytech/ink) - Parity 提供的编写智能合约的ink。
- [Substrate 合约工作坊](https://substrate.dev/substrate-contracts-workshop/#/) - 指导您使用`ink!`编写和部署ERC20令牌的基础知识。

## 例子

以下收集的是社区中关于`ink!`的一些智能合约示例。您正在研究智能合约示例吗？请联系我们将其添加到此页面！

- [Ownable](https://github.com/JesseAbram/foRust/) - OpenZeppelin `Ownable`合约的端口。

## 存储空间的租用

存储租金限制了一个合约可以在区块链存储上所占用的空间。

部署到链上的合同会生成一个代码哈希，可以从中创建链的新实例，但是当前没有租金适用于代码哈希本身。租金仅适用于具有自己的_合约帐户_的本合约实例。当前，部署代码哈希将用到一笔一次性的字节费应用于交易，但是没有反复性的开销。

合约实例的帐户按其帐户使用的存储量按比例收费。当合约的余额低于指定的限额时，合约的帐户将变成“墓碑” (合约当前状态的哈希值)，并且将清理其存储。处于“墓碑”状态的合约，可以通过提供转为“墓碑”状态后被清除的数据从而得到恢复，同时也要提供保持合同有效性所需的资金。该项费用将追溯到错过的租期。

如果区块链生产商或链上的常规用户认为用来租用智能合约的资金花完了，他们可以poke一下该智能合约。这将启动清理过程，_poker_将收取发起者的费用。

## 开放只能合约和平行链的区别

### 抽象层

编写智能合约时，您正在创建将被部署并关联到特定链地址的指令。

相比之下，运行模块是链状态转换的全部逻辑 (所谓的a状态转换函数)。

智能合约必须有意识地实现可升级性，而平行链则有能力完全通过根命令或通过管理面板来交换代码。

当您构建智能合约时，它将最终被部署到具有其自身环境的目标链中。平行链允许开发人员声明自己的链环境，甚至允许其他人为其编写智能合约。

### Gas 费用

智能合约必须找到一种方法来限制自己的执行，否则完整的节点很容易受到DOS攻击。例如，智能合约中的无限循环可能会消耗整个链的计算资源，从而阻止其他人使用它。[停机问题](https://en.wikipedia.org/wiki/Halting_problem)表明使用足够强大的语言，还是无法提前知道程序是否将停止执行。某些平台（例如比特币）通过提供一种非常受限制的脚本语言来解决此限制。以太坊等其他平台则向智能合约索取“燃气”，以收取执行其代码的权利。如果智能合约确实进入了永不终止的状态，那么它最终将耗尽燃气费，停止执行，并且将回退任何由智能合约产生的状态转换。

平行链可以采用任意且强大的编程语言，且其自身逻辑中不采用gas概念。这意味着开发者更易于实现部分功能，但也意味着无终止条件的循环等结构将_永不_能实现。将某些例如可能无限运行的复杂循环的逻辑，置于非智能合约层，或者尝试将它们完全消除，往往是更明智的选择。

## 资源

- [应该在什么时候构建 Substrate runtime 或构建 Substrate 智能合约](https://stackoverflow.com/a/56041305) - 从技术角度回答了开发者什么时候可以选择开发 runtime 或智能合约。
