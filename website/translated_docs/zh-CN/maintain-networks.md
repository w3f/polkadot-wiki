---
id: maintain-networks
title: 网络
sidebar_label: 网络
---

Polkadot 是建立在 Substrate 上面，Substrate 是个区块链框架。 Substrate 的其中一个功能是允许使用单个可执行文件并配置它一个启动标志连接到不同的网络。 这里是一些与 Polkadot 或 Substrate 相关联的网络。您可能想连接并加入。

## Polkadot 网络

若要连接到 Polkadot 网络，请按照 [说明](maintain-sync) 安装 Polkadot 可执行程序。

### Polkadot 主网

Polkadot 主网尚未发布。一旦主网上线， 简介将在此处。

### Kusama Canary 网络

Kusama 网络是个早期未经审核的 Polkadot 版本，今天正在运行，拥有真正的经济价值。

Kusama 目前是通过掌握技巧构建的，是启动节点时的默认选项。

执行 Polkadot binary：

```
polkadot
```

并且您将连接和开始同步到 Kusama。

通过在 [Telemetry](https://telemetry.polkadot.io/#/Kusama%20CC3) 查看您的节点是否已经连接。

### Western 测试网络

Westend 是 Polkadot 的最新测试网络。 此网络上的代币叫做 _Westies_ 和没有经济价值。

Westend 目前是从 master 构建的，并且需要命令行标志才能访问。

执行 Polkadot 时，使用 `chain` 选项：

```
polkadot --chain westend
```

并且您将连接并开始同步 Westend。

#### Westend 水龙头

按照[此处](learn-DOT#getting-westies)的说明获取有关 Westies 的说明。

通过在 [Telemetry](https://telemetry.polkadot.io/#list/Westend) 查看您的节点是否已经连接。

## Substrate 网络

若要连接到 Substrate 网络，请按照 [说明](https://substrate.dev/docs/en/knowledgebase/getting-started) 安装 Substrate 可执行程序。

### Flaming Fir

Flaming Fir 是公开的 Substrate 测试网络。它包含一些不在 Polkadot runtime 包含的 pallets。

Flaming Fir 是从 master 构建的，是运行 Substrate 时的默认选项。

运行 Substrate 不带标志或表明状态 `fir`:

```
substrate --chain fir
```

并且您将连接并开始同步 Flaming Fir。

## Telemetry 监察

如果您连接到公開网络，节点的默认配置将连接到公開 [Telemetry](https://telemetry.polkadot.io/) 服务。

您可以通过正确的网络网页上找到您的节点名称来验证您的节点是否已连接。

节点页面有个内置的搜索功能。只需在主窗口中输入即可使用。
