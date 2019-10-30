---
id: maintain-validator
title: 验证人
sidebar_label: 验证人
---

验证人通过抵押 DOT，验证收集人的证明并与其他验证人达成共识来保护中继链。

这些参与者将在向中继链以及所有平行链添加新区块方面发挥关键作用。这允许各方通过中继链完成跨链交易。

验证人执行两个功能。首先验证一组分配好的平行链区块中包含的信息是否有效（例如交易方的身份和合同的标题）。其第二个作用是大月参与共识机制，以基于其他验证人的有效性声明生成中继链区块。任何不遵守协商一致算法的情况都会导致惩罚，削减验证人所持有的部分或所有抵押中的 DOT，从而防止有不良行为的人。然而，良好的表现将会得到奖励，验证人将获得以 DOT 的形式获得区块奖励（包括交易费用），以换取它们的参与。

## 指南

- [如何在 Alexander 运行节点](maintain-guides-how-to-validate-alexander) - 逐步介绍如何在 Aexander 测试网上设置验证人的指南。
- [如何在 Kusama 运行节点](maintain-guides-how-to-validate-kusama)- 逐步介绍如何在 Kusama 金丝雀网络上设置验证人的指南。
- [验证人奖励发放概述](maintain-guides-validator-payout) - 简短概述验证人奖励发放机制原理。
- [如何将验证人程序作为 systemd 进程运行](maintain-guides-how-to-systemd)-有关将验证人程序作为` systemd `进程运行的指南 ，使它在背后运行，并当重新启动时自动启动。
- [How to Upgrade your Validator](maintain-guides-how-to-upgrade) - Guide for securely upgrading your validator when you want to switch to a different machine or begin running the latest version of client code.

## 其他参考

- [如何运行 Polkadot 节点 (Docker)](https://medium.com/@acvlls/setting-up-a-maintain-the-easy-way-3a885283091f)
- [Web 3.0 验证人节点的无服务器故障转移解决方案](https://hackernoon.com/a-serverless-failover-solution-for-web-3-0-validator-nodes-e26b9d24c71d) - 博客详细介绍了如何创建可靠的故障转移解决方案运行验证人。
- [获取测试网 DOTs](learn-DOT#getting-testnet-dots)
- [云服务器清单](maintain-guides-how-to-validate-kusama#vps-list)
- [Polkadot 验证人休息室](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) - 验证人聊天室。
- [Slashing Consequences](https://wiki.polkadot.network/docs/en/learn-staking#slashing) - Learn more about slashing consequences for running a validator node.

## 安全 / 密钥管理

- [Validator Security Overview](https://github.com/w3f/validator-security)

## 监控工具

- [Polkadot Telemetry 服务](https://telemetry.polkadot.io/#/Alexander) - 网络信息，包括在某一条链上有什么节点在运行，正在运行的版本以及同步状态。
- [Polkadash](http://polkadash.io/) - 监测验证人
- [其它有用链接](https://forum.web3.foundation/t/useful-links-for-validators/20)
