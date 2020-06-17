---
id: maintain-guides-how-to-upgrade
title: 如何升级验证人节点
sidebar_label: 如何升级验证人节点
---

Validators perform critical functions for the network, and as such, have strict uptime requirements. Validators may have to go offline for periods of time to upgrade the client software or the host machine. This guide will walk you through upgrading your machine and keeping your validator online.

The process will take several hours, so make sure you understand the instructions first and plan accordingly.

## 重要组件

### Session 密钥

Session keys are stored in the client and used to sign validator operations. They are what link your validator node to your Controller account. You cannot change them mid-Session.

[关于 Polkadot 密钥资料。](learn-keys)

### 数据库

Validators keep a database with all of their votes. If two machines have the same Session keys but different databases, they risk equivocating. For this reason, we will generate new Session keys each time we change machines.

[有关 equivocation 更多信息。](learn-staking#slashing)

## 步骤

You will need to start a second validator to operate while you upgrade your primary. Throughout these steps, we will refer to the validator that you are upgrading as "Validator A" and the second one as "Validator B."

### Session `N`

1. Start a second node and connect it to your sentry nodes. Once it is synced, use the `--validator` flag. This is "Validator B."
1. 在验证人 B 生成Session 密钥。
1. 在你 Controller 帐户提交 `set_key` 交易设定新的 Session 密钥。
1. 记下交易执行后的结果。

**It is imperative that your Validator A keep running in this Session.** `set_key` only takes effect in the next Session.

### Session `N+1`

Validator B is now acting as your validator. You can safely take Validator A offline. See note at bottom.

1. 停止验证人 A。
1. 把您的系统或客户端进行升级。
1. 启动验证人 A，同步数据库并连接你的哨兵节点。
1. 在验证人 A 生成新的 Session 密钥。
1. Submit a `set_key` extrinsic from your Controller account with your new Session keys for Validator A.
1. 记下交易执行后的结果。

**再重复一次验证人 B 必须在当下 Session 继续运行直至下一个 Session。**

一旦 Session 改变，验证人 A 将接管。你可以把验证人 B 停下来。

**NOTE:** To verify that the Session has changed, make sure that a block in the new Session is finalized. You should see log messages like this to indicate the change:

```
2019-10-28 21:44:13 Applying authority set change scheduled at block #450092
2019-10-28 21:44:13 Applying GRANDPA set change to new set with 20 authorities
```
