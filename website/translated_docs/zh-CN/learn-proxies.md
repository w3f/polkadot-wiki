---
id: learn-proxies
title: 代理账户
sidebar_label: 代理账户
---

Polkadot 提供了一个模块，允许用户设置代理帐户以代表其执行有限数量的操作。 与[ Stakeing ](learn-staking)中的 Stash 和 Controller 帐户关系非常相似，代理允许用户将一个帐户保留在冷存储中，并利用该帐户中代币的权重积极参与网络。

## 代理类型

您可以通过代理模块设置代理账户。当您设置代理时，您必须选择代理关系的 类型: Polkadot 提供：

- 任何
- 非转帐
- 抵押
- 治理

当代理账户进行 `proxy` 交易时， Polkadot 过滤了所需的交易，以确保代理账户有代表冷账户进行该交易的适当权限。

顾名思义，代理类型 "Any" 允许代理帐户进行任何交易，包括余额转帐。 在大多数情况下，应避免这种情况，因为代理帐户比冷帐户更频繁地使用，因此安全性较低。为了允许除余额转帐（包括既定转帐）以外的任何类型的交易，"非转帐(Non-transfer)"代理类型将是更好的选择。

"治理" 类型将允许代理进行与治理相关的交易(即从民主，议会，国库，技术委员会和选举模块进行的交易)。

"抵押" 类型允许抵押相关的交易，但不要将抵押代理与 Controller 帐户混淆。 在抵押模块中，某些事务必须来自存储，而其他事务必须来自主 Controller。 Stash 帐户旨在保留在冷储存中，而 Controller 帐户则进行日常事务，例如设置 Session 密钥或确定要提名的验证人。 不过，Stash 帐户仍需要进行一些交易，例如绑定额外资金或指定新的 Controller。 代理服务器不会更改 Stash 和 Controller 帐户的_角色_，但确实允许访问 Stash 的频率更低。

### 匿名代理:

Polkadot 包含创建匿名代理的功能，该匿名代理只能通过代理访问。 即它生成一个地址，但没有相应的私钥。 通常主帐户指定代理帐户，但匿名代理则相反。 创建代理关系的帐户是代理帐户，新帐户是主要帐户。 对匿名代理要格外小心，删除代理关系后，将无法访问该帐户。

## 要点整合

If the idea of proxy types and their application seems abstract, it is. Here is an example of how you might use these accounts. Imagine you have one account as your primary token-holding account, and don't want to access it very often, but you do want to participate in governance and staking. You could set Governance and Staking proxies.

![proxies](assets/proxies-example.png)

In this example, the primary account A would only make two transactions to set account B as its governance proxy and account C as its staking proxy. Now, account B could participate in governance activity on behalf of A.

Likewise, account C could perform actions typically associated with a stash account, like bonding funds and setting a Controller, in this case account D. Actions that normally require the Stash, like bonding extra tokens or setting a new Controller, can all be handled by its proxy account C. In the case that account C is compromised, it doesn't have access to transfer-related transactions, so the primary account could just set a new proxy to replace it.

By creating multiple accounts that act for a single account, it lets you come up with more granular security practices around how you protect private keys while still being able to actively participate in a network.
