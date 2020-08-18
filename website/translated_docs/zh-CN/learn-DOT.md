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

_Note: This will change at block #1,248,328. See [Redenomination of DOT](redenomination) for more details._

### Kusama

| 单位              | 小数位 |
| --------------- | --- |
| Planck          | 1   |
| Point           | 3   |
| MicroKSM (uKSM) | 6   |
| MilliKSM (mKSM) | 9   |
| KSM             | 12  |

## What are the uses of DOT?

DOT serve three key functions in Polkadot, (i) to be used for governance of the network, (ii) to be staked for operation of the network, and (iii) to be bonded to connect a chain to Polkadot as a parachain.

DOT can also serve ancillary functions by virtue of being a transferrable token. For example, DOT stored in the Treasury can be sent to teams working on relevant projects for the Polkadot network.

> These concepts have been further explained in the video [Usage of DOT and KSM on Polkadot and Kusama](https://www.youtube.com/watch?v=POfFgrMfkTo&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=7)

### DOTs 用于治理

The first function of DOT is to entitle holders to control of the governance of the platform. Some functions that are included under the governance mechanism include determining the fees of the network, the addition or removal of parachains, and exceptional events such as upgrades and fixes to the Polkadot platform.

Polkadot will enable any holder of DOT to participate in governance. For details on how holders can participate in governance, as well as their rights and responsibilities, see the [governance page](learn-governance).

### DOT for consensus

DOT will be used to facilitate the consensus mechanism that underpins Polkadot. In order for the platform to function and allow for valid transactions to be carried out across parachains, Polkadot will rely on holders of DOT to play active roles. Participants will put their DOT at risk (via staking) to perform these functions. The staking of DOT acts as a disincentive for malicious participants whom will be punished by the network by getting their DOT slashed. The DOT required to participate in the network will vary depending on the activity that is being performed, the duration the DOT will be staked for, and the total number of DOT staked.

### DOT for bonding

DOT will have the ability to be bonded for a duration of time in order to add a new parachain to the network. The DOT will be locked during their bonding period and will be released back to the account that bonded them after the duration of the bond has elapsed and the parachain is removed.

### 锁仓 (Vesting)

DOT may have a lock placed on them to account for vesting funds. Like other types of locks, these funds cannot be transferred but can be used in other parts of the protocol such as voting in governance or being staked as a validator or nominator.

Vesting funds are on a linear release schedule and unlock a constant number of tokens at each block. Although the tokens are released in this manner, it does not get reflected on-chain automatically due to the fact that locks are [lazy](#lazy-vesting) and require an extrinsic to update.

There are two ways that vesting schedules can be created.

- 一种方法是作为链的创世配置的一部分。 在 Polkadot 和 Kusama 的情况下，链规范生成脚本读取以太坊区块链上存在的 Polkadot Claims 合約的状态，并生成所有创世代币的分配和锁仓时间表。
- 第二种方式是通过锁仓 pallet, `vested_transfer`的外在类型。 vested 转账功能允许任何人创建带有资金锁仓计划。为只要创建锁仓时间表的帐户还没有锁仓，转移至少指定在链上的 `MinVestedTransfer` 资金。

Vesting schedules have three parameters, `locked`, `per_block`, and `starting_block`. The configuration of these three fields dictate the amount of funds that are originally locked, the slope of the unlock line, and the block number for when the unlocking begins.

#### Lazy 锁仓

Like [simple payouts](learn-simple-payouts), vesting is _lazy_, which means that someone must explicitly call an extrinsic to update the lock that is placed on an account.

- `vest` 外部交易将更新呼叫者之前锁上的资金
- `vest_other` 将更新放在另一个"目标"账户资金上的锁定。

These extrinsics are exposed from the Vesting pallet.

## Obtaining Testnet DOT

DOT are required to make transactions on the Polkadot network. Testnet DOT do not have any value beside allowing you to experiment with the network.

### 获取 Westies

The current testnet is called [Westend](maintain-networks#westend-test-network) and you can obtain its native tokens by posting `!drip <WESTEND_ADDRESS>` in the Riot chatroom [#westend_faucet:matrix.org](https://riot.im/app/#/room/!cJFtAIkwxuofiSYkPN:matrix.org).

You can also make your own WNDs (testnet DOT) by [becoming a validator](maintain-validator).

## Kusama Tokens

Unlike testnet DOT (WND), Kusama tokens are not freely given away. Kusama tokens are available via the [claims process](https://claim.kusama.network/) (if you had DOT at the time of Kusama genesis) or through the [Treasury](learn-treasury).

## Polkadot Mainnet DOT

Polkadot Mainnet DOT are not freely given away. If you purchased DOT in original 2017 offering, you may claim them via the [Polkadot claims process](https://claims.polkadot.network/).
