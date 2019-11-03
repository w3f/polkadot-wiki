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

If multiple validators do end up online at the same time, your validator may end up signing multiple blocks and will thus get slashed for equivocation. A properly configured, highly available setup like this will reduce your chances of getting slashed for non-responsiveness, but a misconfigured setup will increase your chances of getting slashed for equivocation. This is a trade-off, and we expect that different validators will make different decisions on which side they err towards.

## 密钥管理

See the [Polkadot Keys guide](https://wiki.polkadot.network/en/latest/polkadot/learn/keys/) for more information on keys. The keys that are of primary concern for validator infrastructure are the Session keys. These keys sign messages related to consensus and parachains. Although Session keys are _not_ account keys and therefore cannot transfer funds, an attacker could use them to commit slashable behavior.

Session keys are generated inside the node via RPC call. See the [Kusama guide](https://guide.kusama.network/en/latest/try/validate/#set-the-session-key) for instructions on setting Session keys. These should be generated and kept within your client. When you generate new Session keys, you must submit an extrinsic (a Session certificate) from your Controller key telling the chain your new Session keys.

> **NOTE:** Session keys can also be generated outside the client and inserted into the client's keystore via RPC. For most users, we recommend using the key generation functionality within the client.

### Signing Outside the Client

In the future, Polkadot will support signing payloads outside the client so that keys can be stored on another device, e.g. a hardware security module (HSM) or secure enclave. For the time being, however, Session key signatures are performed within the client.

> **注意: ** HSM 不是灵丹妙药。 它们不包含任何逻辑，只会签名并返回接收到的任何有效负载。 因此，获得对您的验证人节点的访问权限的攻击者仍然可能会犯有严重的行为。

An example of highly available, secure setup would be a layer of sentry nodes in front of multiple validators connected to a single signing machine. This machine could implement signing logic to avoid equivocation, even if an attacker gained access to a validator node.

## 监视工具

- [ Telemetry ](https://github.com/paritytech/substrate telemetry) Telemetry 可以跟踪节点的资料包括运行版本、区块高度、CPU & 内存使用情况、区块传播时间等。

- [Prometheus](https://prometheus.io/)-based monitoring stack, including [Grafana](https://grafana.com) for dashboards and log aggregation. It includes alerting, querying, visualization, and monitoring features and works for both cloud and on-premise systems. The data from `substrate-telemetry` can be made available to Prometheus through exporters like [this](https://github.com/w3f/substrate-telemetry-exporter).

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

- Validators should run on bare-metal machines, as opposed to VMs. This will prevent some of the availability issues with cloud providers, along with potential attacks from other VMs on the same hardware. The provisioning of the validator machine should be automated and defined in code. This code should be kept in private version control, reviewed, audited, and tested.

- Session 密钥应以安全的方式生成和提供。

- 如果任何原因导致 Polkadot 停止运行(supervisor 程序)，Polkadot 应该在开机和重新启动时重新启动。

- Polkadot 应该以非 root 用户身份运行。

- Each validator should connect to the Polkadot network through a set of at least 2 public-facing nodes. The connection is done through a VPN and the machine can't access the public internet, thus the only possible connection is through the VPN.

### 面向公众的节点

- At least two nodes associated with each validator run on at least two different cloud providers and they only publicly expose the p2p port.

- They can run as a container on Kubernetes and we can define the desired state (number of replicas always up, network and storage settings); the connection between the validator and the public-facing nodes is done through a VPN. They have the common Kubernetes security setup in place (restrictive service account, pod security policy and network policy).

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
