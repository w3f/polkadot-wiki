---
id: maintain-guides-how-to-upgrade
title: 如何升级验证人节点
sidebar_label: 如何升级验证人节点
---

验证人负责执行网络上的重要工作，所以对在线有严格的要求。验证人有机会更新客户端或系统同时离线一段时间。这教程将会指导您如何升级并保持验证人在线。

这过程可能需要数小时，所以确保您先理解说明并制定相应的计划。

## 重要组件

### Session 密钥

Session 密钥储存在客户瑞并供验证人作签名操作。它是把验证人节点和 Controller 帐户联系起来。您不能在 Session 中段更改它。

[关于 Polkadot 密钥资料。](learn-keys)

### 数据库

验证人保留所有他们的投票在数据库，如果二台电脑在不同数据库拥有相同 Session 密钥，他们会有 equivocating 风险。因此每次更换电脑时，我们都会生成新 Session 密钥。

[有关 equivocation 更多信息。](learn-staking#slashing)

## 步骤

当您升级主机时，您需要启动另一台验证人。在升级步骤中，我们将需要升级的验证人称为 "验证人A"，而第二个称为 "验证人B"。

### Session `N`

1. 启动另外节点并且连接到你的哨兵节点。一旦同步数据完成，使用 `--validator` 标志。这是 "验证人 B"。
1. 在验证人 B 生成Session 密钥。
1. 在你 Controller 帐户提交 `set_key` 交易设定新的 Session 密钥。
1. 记下交易执行后的结果。

**验证人 A 必须在当下 Session 继续运行** ` set_key ` 仅在下一个 Session 生效。

### Session `N+1`

现在验证人 B 充当验证人，你可以把验证人 A 停下来。请留意底部的注释。

1. 停止验证人 A。
1. 把您的系统或客户端进行升级。
1. 启动验证人 A，同步数据库并连接你的哨兵节点。
1. 在验证人 A 生成新的 Session 密钥。
1. 在你 Controller 帐户提交 `set_key` 交易设定验证人 A 新的 Session 密钥。
1. 记下交易执行后的结果。

**再重复一次验证人 B 必须在当下 Session 继续运行直至下一个 Session。**

一旦 Session 改变，验证人 A 将接管。你可以把验证人 B 停下来。

**注意:**: 为了确保 Session 已更改，请确保新 Session 中有一个区块已确认。如果成功，您应该看到类似以下的日志消息:
```
2019-10-28 21:44:13 Applying authority set change scheduled at block #450092
2019-10-28 21:44:13 Applying GRANDPA set change to new set with 20 authorities
```
