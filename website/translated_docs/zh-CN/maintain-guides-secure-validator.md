---
id: maintain-guides-secure-validator
title: 安全验证人节点
sidebar_label: 安全验证人节点
---

验证人在权益证明网络中负责使网络共识保持一致并验证状态转换。由于验证人数量有限，所验证人是有责任在线并忠诚地执行其任务。

验证者的主要工作：

- 必须具有保护验证人签名密钥的架构，使攻击者无法控制和提交会被惩罚的行为。
- 必须有高可用性

## 高可用性

最好保护验证人在线的的方法是将其置于"哨兵节点"后面。哨兵节点可以通在云端架构上配置的全节点，例如 AWS，GCP，Azure。您的验证人节点应放在专用数据中心，并将其限制仅连接到哨兵节点。

哨兵节点可以过滤发送到验证人的消息，从不发送重复的消息，使验证人不会接收垃圾消息。同样，如果哨兵节点受到攻击并离线，则可以调配其他云端服务器来替换它使 DDoS 攻击验证人。

由于验证人需要 100％ 在线，因此节点操作员可能想支持故障转移。在此设置中，将有一个主验证人节点，和备用验证人节点。而备用验证人仅在主验证节点离线时才响应消息。

如果多个验证人节点同时使用同一条会话密钥并且同时在线，那该验证人节点可能会短时间签署多个区块后，会因双重签名而受到系统惩罚。所以正确 配置并有高可用性的设置能有效减少因为 non-responsiveness（无响应）而触发的惩罚。错误设置也会因为增加双重签名风险而被惩罚。对于不同类型的错误和失误造成的惩罚，验证人应当采取不同应对措施。

## 密钥管理

有关密钥的更多信息，请参见[ Polkadot 密钥指南](https://wiki.polkadot.network/en/latest/polkadot/learn/keys/)。验证人架构最重要密钥是 Session 密钥。 这些密钥签署与共识和平行链相关的消息。 尽管 Session 密钥是_不是_帐户密钥，因此无法转移资金，但攻击者可以使用它们来使你实施严重的被惩罚 行为。

Session 密钥是通过 RPC 调用节点内部生成的。有关设置 Session 密钥的说明，请参见[ Kusama 指南](https://guide.kusama.network/en/latest/try/validate/#set-the-session-key)。这应生成并保存在您的客户端中。当生成新的 Session 密钥时，必须从 Controller 密钥中提交外部交易（Session 证书），以告知链中您的新 Session 密钥。

> **注意:**: Session 密钥也可以在客户端外部生成，并通过 RPC更新到客户端的密钥库中。 对大多数用户，我们建议在客户端內生成密钥。

### 客户端外部签署

Polkadot 也会在之后支持外部客户端签署数据的密钥设备，所以密钥可以存储在另一个设备上。例如：硬件安全模组(HSM) 或 Secure Enclave。然而目前 Session 密钥的签署只能在客户端内进行。

> **注意: ** HSM 不是灵丹妙药。 它们不包含任何逻辑，只会签名并返回接收到的任何有效负载。 因此，获得对您的验证人节点的访问权限的攻击者仍然可能会犯有严重的行为。

高可用性的例子: 安全设定是把哨兵节点设置在多个验证人节点前面，同时连接到单独的签名电脑。即使如果攻击者能够访问到验证人节点，该电脑可以实现签名逻辑被免双重签名。

## 监视工具

- [ Telemetry ](https://github.com/paritytech/substrate telemetry) Telemetry 可以跟踪节点的资料包括运行版本、区块高度、CPU & 内存使用情况、区块传播时间等。

- [Prometheus](https://prometheus.io/) - 监控堆栈, 包括 [Grafana](https://grafana.com) 日志收集功能的监控应用。它包括了警告, 查询, 图像及监控功能并适用于云端和本地系统。数据来自于`substrate-telemetry` 可以通过 [这](https://github.com/w3f/substrate-telemetry-exporter) Prometheus 使它汇出。

## Linux 最佳实践

- 永不使用 root 用户
- 保持更新系统的安全补丁
- 启动并设置防火墙
- 永不允许基于密码的ssh，只能使用基于密钥的访问。
- 禁用不必要的 SSH 子系统 (banner，motd，scp，X11 转发)并加强SSH配置（[入门指南](https://stribika.github.io/2015/01/04/secure-secure-shell.html)）。
- 定期备份您的存储。

## 结论

- 不要把验证人公开在互联网上，它们应只能由允许的用户访问。因此我们提出了分层的方法，把验证人与互联网隔开，并通过面向公众的中间层节点连接到Polkadot 网络。

- 目前 Polkadot / Substrate 无法与 HSM /SGX 交互，因此我们需要向验证人机器提供签密钥种子。 该密钥保留在内存中以进行签名操作，并保留在磁盘上(使用密码加密)。

- 鉴于高可用性设置始终存有双重签名的风险，并且目前没有内置机制可以防止这个情况，因此我们建议使用单个验证人节点来避免惩罚。 离线造成的惩罚远少于双重签名。

### 验证人

- 验证人应仅运行 Polkadot 执行檔，并且关上除已配置 p2p 端口以外的其它任何端口。

- 验证程序应在裸机（而不是 VM）上运行。这将防止云端服务器的某些可用性问题，以及来自相同硬件上其他 VM 的潜在攻击。 验证人配置应当是自动化以代码定义。该代码应保存在私有(Github)，进行审查，审核和测试。

- Session 密钥应以安全的方式生成和提供。

- 如果任何原因导致 Polkadot 停止运行(supervisor 程序)，Polkadot 应该在开机和重新启动时重新启动。

- Polkadot 应该以非 root 用户身份运行。

- 每个验证人都应通过至少两个公开节点连接到 Polkadot 网络。连接应使用进行，并且服务器无法访问互联网，所以唯一的可能是通过VPN连接。

### 面向公众的节点

- 每个验证人至少有两个节点在两个不同的云端服务器上运行，并且它们仅公开 p2p 端口。

- 它们可以在 Kubernetes 上作容器运行，我们可以定义所需的状态（多少 replicas 总是在线，网络和存储设置)。验证人和公开众节点之间的连接是通过 VPN 。他们具有通用的 Kubernetes 安全设置（限制性服务帐户，pod 安全策略和网络策略）。

- 应以安全的方式提供节点密钥。

- 仅运行 Polkadot 容器，没有其他应用服务。VPN 代理应在同一Pod 上运行 (共享网络堆栈)。

### 监测

- 应监控面向公众和验证人节点，并定义几种故障情况警报。

- 应该有用于管理警报的待命轮换。

- 应该有一个清晰的协议，其中包含针对每个警报的每个级别执行的操作以及升级策略。

## 资源

- [Figment Network 对 Cosmos 验证人基础结构的全面披露](https://medium.com/figment-networks/full-disclosure-figments-cosmos-validator-infrastructure-3bc707283967)
- [Certus One 的知识库](https://kb.certus.one/)
- [EOS 区块生产者安全性列表](https://github.com/slowmist/eos-bp-nodes-security-checklist)
- [哨兵节点架构概述](https://forum.cosmos.network/t/sentry-node-architecture-overview/454)
- [HSM 政策和验证人安全的重要性](https://medium.com/loom-network/hsm-policies-and-the-importance-of-validator-security-ec8a4cc1b6f)
