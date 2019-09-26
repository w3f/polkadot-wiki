---
id: build-smart-contracts
title: Smart Contracts
sidebar_label: Smart Contracts
---

Polkadot中继链本身并不支持智能合约，不过在它之上的平行链可以。目前已出现[Edgeware](https://edgewa.re)等多个项目，而Substrate的内置[合约模块]((https://crates.parity.io/srml_contract/index.html))将很可能使得更多的平行链支持这一特性。

## 资源

下文列出了开发者当前可使用的资源，帮助开始编写智能合约并部署在基于Substrate的平行链之上。

- [ink!](https://github.com/paritytech/ink) - Parity的ink用于编写智能合约。
- [部署首个合约](https://github.com/paritytech/ink/wiki/Deploying-Your-First-Contract) - 部署给定的`flipper`合约的指南。
- [编写首份合同](https://github.com/paritytech/ink/wiki/Writing-Your-First-Contract)——编写`flipper`合约的指南。
- [Substrate合约工作坊](https://shawntabrizi.github.io/substrate-contracts-workshop/#/) - 帮助了解使用`ink!`和编写ERC20代币的基本方法。

## 范例

下文收集了一些用`ink!`编写的智能合约的社区示例。您也在编写智能合约吗？请让我们把它添加到这个页面！

- [Ownable](https://github.com/JesseAbram/foRust/) - OpenZeppelin `Ownable`合约的端口。

## 创建智能合约与创建平行链之间有哪些不同？

### 抽象层

编写智能合约时，需创建一系列将被部署并关联到特定链地址的指令。

相比之下，运行时模块是链的状态转换的整个逻辑（称为状态转换函数）。

智能合约必须自觉实现可升级性，而平行链则能够通过根命令或治理模块来替换其所有代码。

构建的智能合约最终将被部署到拥有自己环境的目标链中，而平行链则允许开发者公布各自链的环境，甚至允许其他人为该链编写智能合约。

### Gas费用

智能合约必须找到方法来限制内部执行，否则所有节点都将非常容易受到DOS攻击。例如，智能合约中的无限循环可能会耗尽整个链的计算资源，使别人无资源可用。[终止问题](https://en.wikipedia.org/wiki/Halting_problem)表明，使用足够强大的语言不可能提前知道某程序是否会停止执行。比特币等平台通过提供极度受限的脚本语言避免了这一限制。而其它像以太坊这样的平台则是向智能合约收取gas费用，从而给与其执行代码的权利。若智能合约的执行永远不会终止，那么它最终将耗尽gas而无法执行任何操作，同时智能合约执行的所有状态转换都将被回溯。

平行链可以实现果断且强大的编程语言，且在其自身逻辑中未采用gas概念。这意味着开发者更易于实现部分功能，但也意味着无终止条件的循环等结构将永远不能实现。将某些逻辑（例如可能无限运行的复杂循环）置于非智能合约层，或者尝试将它们完全消除，往往是更明智的选择。

## 资源

- [应该在什么时候构建Substrate运行时或构建Substrate智能合约](https://stackoverflow.com/a/56041305) - 从技术角度回答了开发者什么时候可以选择开发运行时或智能合约。