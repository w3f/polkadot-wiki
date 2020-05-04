---
id: learn-bridges
title: 转接桥
sidebar_label: 转接桥
---

在区块链互通得中心思想之一是转接桥的角色。转接桥如何在 Polkadot 中工作的确切细节尚待确定。请将此页面视为进行中的工作，确定更多详细信息后将对其进行更新。

目前 Polkadot 中有三种不同类型的转接桥:

* _桥接合约_部署为 Polkadot 和外部链之间的桥接智能合约。
* _跨平行链通信_ - 无需智能合约。
* _内置转接桥模块_ - 专用模块从外部链桥接到 Polkadot。

## 转接桥智能合约

那些已经熟悉以太坊的人可能知道[ Parity Bridge ](https://github.com/paritytech/parity-bridge)以及为将 PoA 侧链连接到以太坊主网所做的努力。转接桥是两个智能合约，每个合约上都部署了在每个链上，可以实现跨链的价值转移。作为使用示例，最初的 Parity Bridge 概念证明连接了两个以太坊链，分别是` main `和` side `。 在` main `上存入以太币到合约会在` side `上生成以 ERC-20 余额计算的代币。 相反在` side `上存回合约的 ERC-20 代币可以释放` main `上的以太币。

就 Polkadot 而言，应该有可能在基于 EVM 的独立链上部署桥接合约，并在具有智能合约功能的平行链上部署合约。这不一定是最有效的桥接方法，但是鉴于一般图灵完备的平行链，将有可能桥接 Polkadot 和任何其它具有智能合约功能的区块链。

## 跨平行链通信
如[ 平行链](learn-parachains)页中所述，平行链将能够彼此发送消息(包括交易)，而无需智能合约来执行转接桥功能，跨平行链通信将是 Polkadot 的本地消息。

## 内置转接桥模块

在非平行链接收平行链上的消息很可能会通过客户端软件的模块中完成。这消除桥接合约的需要，并允许非平行链充当"虚拟平行链"。然后收集人在特定区块链可以收集交易或其它状态转换，(像平行链一样)将其提交给中继链。

桥接模块在编写时可能会考虑到特定的平行链(例如比特币，以太坊)，这意味着基于其中任何一个的区块链都应能够直接连接到 Polkadot ，而无需在平台上部署桥接合约。这允许更快地执行那些兼容的链。

对于在 Polkadot 上没有内置转接桥模块的独立链，需要部署转接桥合约(请参见上文)。

## 资源

### 智能合约转接桥

- [ Edgeth 转接桥](https://github.com/hicommonwealth/edgeth_bridge/)-从以太坊到 Edgeware 链（基于 Substrate 的链)。
- [Parity 转接桥](https://github.com/paritytech/parity-bridge)
- [POA 网络](https://poa.network/)
- [ POA 网络实现 Parity 桥链解决方案的案例研究](https://medium.com/giveth/ethereum-dapp-scaling-poa-network-acee8a51e772)。

### 转接桥 Runtime 模块

- [ ChainX BTC 桥](https://github.com/chainx-org/ChainX/tree/develop/cxrml/bridge/btc) - ChainX  实现了 BTC -> Substrate 桥供其平行链。

### 设计

- [ XClaim ](https://eprint.iacr.org/2018/643.pdf)-XClaim设计，以去中心方式桥接工作量证明(PoW)链。
