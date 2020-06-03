---
id: learn-DOT
title: DOT
sidebar_label: DOT
---

## 什么是 DOTs？

DOT 是 Polkadot 网络的原生代币，类似于 BTC 是比特币的原生代币或以太币是以太坊区块链的原生代币。

Kusama tokens (KSM) and DOT tokens both have 12 decimal places, with the smallest unit being the Planck (a reference to [Planck Length](https://en.wikipedia.org/wiki/Planck_length), the smallest possible distance in the physical Universe). You can compare the Planck to satoshis or wei, while the DOT is like a bitcoin or an ether.

### Polkadot

| 单位              | 小数位 |
| --------------- | --- |
| Planck          | 1   |
| Point           | 3   |
| Microdot (uDOT) | 6   |
| Millidot (mDOT) | 9   |
| Dot (DOT)       | 12  |

### Kusama

| 单位              | 小数位 |
| --------------- | --- |
| Planck          | 1   |
| Point           | 3   |
| MicroKSM (uKSM) | 6   |
| MilliKSM (mKSM) | 9   |
| KSM             | 12  |

## DOTs 用途是什么？

DOTs 在 Polkadot 中有三个关键功能: (i)用于网络的治理; (ii)参与抵押用于网络的运作; (iii)作为抵押绑定以将链连接到 Polkadot 作为平行链;

DOT 还可以作为辅助功能充当可转送代币。 例如将存储在财政库中的 DOT 发送给为 Polkadot 网络进行相关项目的团队。

### DOTs 用于治理

The first function of DOTs is to entitle holders to control of the governance of the platform. Some functions that are included under the governance mechanism include determining the fees of the network, the addition or removal of parachains, and exceptional events such as upgrades and fixes to the Polkadot platform.

在 Polkadot 里，任何持有 DOTs 的人都能参与治理。有关持有人如何参与治理以及他们的权利和责任的详细信息，请参见[治理页面](learn-governance)。

### DOTs 用于共识

DOTs will be used to facilitate the consensus mechanism that underpins Polkadot. In order for the platform to function and allow for valid transactions to be carried out across parachains, Polkadot will rely on holders of DOTs to play active roles. Participants will put their DOTs at risk (via staking) to perform these functions. The staking of DOTs acts as a disincentive for malicious participants whom will be punished by the network by getting their DOTs slashed. The DOTs required to participate in the network will vary depending on the activity that is being performed, the duration the DOTs will be staked for, and the total number of DOTs staked.

### DOTs 用于绑定

为了把平行链连接到 Polkadot 网络， DOTs 将会有需要绑定一段时间。绑定期间的 DOTs 将会被锁上，当过了绑定时间和平行链被移除后，原有绑定的 DOTs 将会返回你帐户。

### 锁仓 (Vesting)

DOTs 可能被锁仓。这些资金不能转移，但可以用于协议的其他部分，例如在治理中投票或作为验证人或提名人。

锁仓资金按线性发布时间表进行，并在每个区块上解锁恒定数量的代币。 尽管代币是以这种方式释放的，但由于锁上[ lazy ](#lazy-vesting)且需要外部更新，因此不会自动反映在链上。

可以创建两种锁仓时间表的方式。

- 一种方法是作为链的创世配置的一部分。 在 Polkadot 和 Kusama 的情况下，链规范生成脚本读取以太坊区块链上存在的 Polkadot Claims 合約的状态，并生成所有创世代币的分配和锁仓时间表。
- 第二种方式是通过锁仓 pallet, `vested_transfer`的外在类型。 vested 转账功能允许任何人创建带有资金锁仓计划。为只要创建锁仓时间表的帐户还没有锁仓，转移至少指定在链上的 `MinVestedTransfer` 资金。

锁仓时间表有三个参数， `locked`， `per_block`和 `starting_block`。 这三个领域的配置决定了原先锁定的资金额，解锁线的斜坡和解锁时的区块。

#### Lazy 锁仓

像 [simple payouts](learn-simple-payouts), 像 _lazy_, 这意味着某人必须明确调用外部交易来更新在帐户上的锁仓。

- `vest` 外部交易将更新呼叫者之前锁上的资金
- `vest_other` 将更新放在另一个"目标"账户资金上的锁定。

这些交易是从 Vesting pallet 提供。

## 主网 DOTs

Web3 基金會將會在 2020 年主網上線前分配最多 10% DOTs。(查看 [简短版](https://polkadot.network/Polkadot-lightpaper.pdf)或[Polkadot 网络常见问题](https://polkadot.network/faq/))。正如项目创始人之 一Gavin Wood 在年终回顾中所说，今年某个时候可能会公开发售该笔款项的一部分。在[ polkadot.network ](https://polkadot.network/)上订阅 Polkadot 电子报，以获取最新消息。

_警告：DOT 在主网上线前（预计于 2020 年中）之前不可转让。因此任何人转让 DOT 都是非法且未经授权。还有，DOT 现时是无法转移。拥有 DOT 并将地址转移给其他人，而该个人仍然可以保留其私钥副本，因此在主网上线之前，请大家不要参这类极大风险的买卖。_

测试 DOTs 现在可免费获取 - 请参见下面了解获取的各种方法。

## 测试网 DOTs

DOTs 必须在 Polkadot 网络上进行交易。 测试网的 DOTs 除了可以测试网络之外没有任何价值。

### 获取 Westies

The current testnet is called [Westend](maintain-networks#westend-test-network) and you can obtain its native tokens by posting `!drip <WESTEND_ADDRESS>` in the Riot chatroom [#westend_faucet:matrix.org](https://riot.w3f.tech/#/room/#westend_faucet:matrix.org).

你也可以通过 [成为验证人](maintain-validator) 来获取 DOTs。

## Kusama 代币

Unlike testnet DOTs, Kusama tokens are not freely given away. Kusama tokens are available via the [claims process](https://claim.kusama.network/) (if you have already purchased DOTs) or through the [Treasury](learn-treasury).
