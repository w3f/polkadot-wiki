---
id: maintain-validator
title: 验证人
sidebar_label: 验证人
---

验证人通过抵押 DOT，验证收集人的证明并与其他验证人达成共识来保护中继链。

这些参与者将在向中继链以及所有平行链添加新区块方面发挥关键作用。这允许各方通过中继链完成跨链交易。

验证人执行两个功能。首先验证一组分配好的平行链区块中包含的信息是否有效（例如交易方的身份和合同的标题）。其第二个作用是大月参与共识机制，以基于其他验证人的有效性声明生成中继链区块。任何不遵守协商一致算法的情况都会导致惩罚，削减验证人所持有的部分或所有抵押中的 DOT，从而防止有不良行为的人。然而，良好的表现将会得到奖励，验证人将获得以 DOT 的形式获得区块奖励（包括交易费用），以换取它们的参与。

## 指南

- [How to Validate on Kusama](maintain-guides-how-to-validate-kusama) - Guide on how to set up a validator on the Kusama canary network.
- [Validator Payout Overview](maintain-guides-validator-payout) - A short overview on how the validator payout mechanism works.
- [How to run your validator as a systemd process](maintain-guides-how-to-systemd) - Guide on running your validator as a `systemd` process so that it will run in the background and start automatically on reboots.
- [How to Upgrade your Validator](maintain-guides-how-to-upgrade) - Guide for securely upgrading your validator when you want to switch to a different machine or begin running the latest version of client code.
- [How to Set up a Sentry Node](maintain-guides-how-to-setup-sentry-node) - Guide for setting up a sentry node for your validator.
- [How to Use Secure Validator Setup](maintain-guides-how-to-use-polkadot-secure-validator) - Guide on how to use Polkadot / Kusama secure validator setup.

## 其他参考

- [如何运行 Polkadot 节点 (Docker)](https://medium.com/@acvlls/setting-up-a-maintain-the-easy-way-3a885283091f)
- [Web 3.0 验证人节点的无服务器故障转移解决方案](https://medium.com/hackernoon/a-serverless-failover-solution-for-web-3-0-validator-nodes-e26b9d24c71d) - 博客详细介绍了如何创建可靠的故障转移解决方案运行验证人。
- [VPS list](maintain-guides-how-to-validate-kusama#vps-list)
- [Polkadot Validator Lounge](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) - A place to chat about being a validator.
- [Slashing Consequences](https://wiki.polkadot.network/docs/en/learn-staking#slashing) - Learn more about slashing consequences for running a validator node.

## 安全 / 密钥管理

- [验证人安全概览](https://github.com/w3f/validator-security)

## 监控工具

- [PANIC for Polkadot](https://github.com/SimplyVC/panic_polkadot) - A monitoring and alerting solution for Polkadot / Kusama node
- [Polkadot Telemetry Service](https://telemetry.polkadot.io/#list/Kusama%20CC3) - Network information, including what nodes are running on a given chain, what software versions they are running, and sync status.
- [Other Useful Links](https://forum.web3.foundation/t/useful-links-for-validators/20)
