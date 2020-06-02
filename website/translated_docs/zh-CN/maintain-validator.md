---
id: maintain-validator
title: 验证人
sidebar_label: 验证人
---

Validators secure the Relay Chain by staking DOTs, validating proofs from collators and participating in consensus with other validators.

这些参与者将在向中继链以及所有平行链添加新区块方面发挥关键作用。这允许各方通过中继链完成跨链交易。

验证人执行两个功能。首先验证一组分配好的平行链区块中包含的信息是否有效(例如交易方的身份和合同的标题)。其第二个作用是大月参与共识机制，以基于其他验证人的有效性声明生成中继链区块。任何不遵守协商一致算法的情况都会导致惩罚，削减验证人所持有的部分或所有抵押中的 DOT，从而防止有不良行为的人。然而，表现良好的将会得到奖励，验证人将获得以 DOT 的形式获得区块奖励(包括交易费用)，以换取它们的参与。

## 指南

- [How to Validate on Polkadot](maintain-guides-how-to-validate-polkadot) - Guide on how to set up a validator on the Polkadot live network.
- [验证人奖励发放概述](maintain-guides-validator-payout) - 简短概述验证人奖励发放机制原理。
- [如何将验证人程序作为 systemd 进程运行](maintain-guides-how-to-systemd)-有关将验证人程序作为` systemd `进程运行的指南 ，使它在背后运行，并当重新启动时自动启动。
- [如何升级您的验证人](maintain-guides-how-to-upgrade) - 当要转换到另一台计算机或运行最新版本的客户端时 - 升级验证人指南。
- [如何设置哨兵节点](maintain-guides-how-to-setup-sentry-node) - 为验证人设置哨兵节点
- [如何使用安全验证人设置](maintain-guides-how-to-use-polkadot-secure-validator) - 关于如何使用 Polkadot / Kusama 安全验证器设置的指南 。

## 其他参考

- [如何运行 Polkadot 节点 (Docker)](https://medium.com/@acvlls/setting-up-a-maintain-the-easy-way-3a885283091f)
- [Web 3.0 验证人节点的无服务器故障转移解决方案](https://medium.com/hackernoon/a-serverless-failover-solution-for-web-3-0-validator-nodes-e26b9d24c71d) - 博客详细介绍了如何创建可靠的故障转移解决方案运行验证人。
- [云服务器清单](maintain-guides-how-to-validate-kusama#vps-list)
- [Polkadot 验证人休息室](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) - 验证人聊天室。
- [ 惩罚(Slashing)后果](https://wiki.polkadot.network/docs/en/learn-staking#slashing) -了解更多有关运行验证人节点惩罚(Slashing)的后果。

## 安全 / 密钥管理

- [验证人安全概览](https://github.com/w3f/validator-security)

## 监控工具

- [PANIC for Polkadot](https://github.com/SimplyVC/panic_polkadot) - Polkadot / Kusama 节点的监视和警报方案
- [Polkadot Telemetry 服务](https://telemetry.polkadot.io/#list/Kusama%20CC3) - 网络信息，包括在某一条链上有什么节点在运行，正在运行的版本以及同步状态。
- [其它有用链接](https://forum.web3.foundation/t/useful-links-for-validators/20)

## 验证人统计

- [HashQuark 抵押策略](https://labs.hashquark.io/#/polka/strategy) - HashQuark 抵押策略 - 帮助您选择最佳设置以获得最大奖励。
- [ Polkastats ](https://polkastats.io/) - Polkastats 是验证程序的精心设计的网页
- [ Polkanalytics ](https://polkanalytics.com/#/dashboard) - 验证人网页，显示所有提名人的每日收入。
- [ Subscan 验证人页面](https://kusama.subscan.io/validator) - 显示当前验证人的信息 - 不像其他站点那样适合验证人。
