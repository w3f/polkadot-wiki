---
id: maintain-guides-secure-validator
title: 安全验证人节点
sidebar_label: 安全验证人节点
---

Validators in a Proof of Stake network are responsible for keeping the network in consensus and verifying state transitions. As the number of validators is limited, validators in the set have the responsibility to be online and faithfully execute their tasks.

验证者的主要工作：

- Must have infrastructure that protects the validator's signing keys so that an attacker cannot take control and commit slashable behavior.
- 必须有高可用性

## 高可用性

The best way to keep your validator available is to have it behind a layer of "sentry nodes". Sentry nodes are full nodes that can be provisioned on cloud infrastructure, e.g. AWS, GCP, Azure. Your validator node should be placed in a private data center and limit its connections to the sentry nodes.

Sentry nodes can filter the messages that they send to the validator, never sending duplicates so that the validator doesn't get spammed. Likewise, if a sentry node is attacked and goes offline, other instances can be provisioned to replace it. DDoS attacks should never make it to the validator.

As validators are expected to have 100% uptime, node operators may want to have failovers. In this setup, there would be one primary validator, and a second one that only responds to messages if the primary goes offline.

If multiple validators do end up online at the same time, your validator may end up signing multiple blocks and will thus get slashed for equivocation. A properly configured, highly available setup like this will reduce your chances of getting slashed for non-responsiveness, but a misconfigured setup will increase your chances of getting slashed for equivocation. This is a trade-off, and we expect that different validators will make different decisions on which side they err towards.

## Key Management

See the [Polkadot Keys guide](https://wiki.polkadot.network/en/latest/polkadot/learn/keys/) for more information on keys. The keys that are of primary concern for validator infrastructure are the Session keys. These keys sign messages related to consensus and parachains. Although Session keys are _not_ account keys and therefore cannot transfer funds, an attacker could use them to commit slashable behavior.

Session keys are generated inside the node via RPC call. See the [Kusama guide](https://guide.kusama.network/en/latest/try/validate/#set-the-session-key) for instructions on setting Session keys. These should be generated and kept within your client. When you generate new Session keys, you must submit an extrinsic (a Session certificate) from your Controller key telling the chain your new Session keys.

> **NOTE:** Session keys can also be generated outside the client and inserted into the client's keystore via RPC. For most users, we recommend using the key generation functionality within the client.

### Signing Outside the Client

In the future, Polkadot will support signing payloads outside the client so that keys can be stored on another device, e.g. a hardware security module (HSM) or secure enclave. For the time being, however, Session key signatures are performed within the client.

> **注意: ** HSM 不是灵丹妙药。 它们不包含任何逻辑，只会签名并返回接收到的任何有效负载。 因此，获得对您的验证人节点的访问权限的攻击者仍然可能会犯有严重的行为。

An example of highly available, secure setup would be a layer of sentry nodes in front of multiple validators connected to a single signing machine. This machine could implement signing logic to avoid equivocation, even if an attacker gained access to a validator node.

## 监视工具

- [Telemetry](https://github.com/paritytech/substrate-telemetry) This tracks your node details including the version you are running, block height, CPU & memory usage, block propagation time, etc.

- [Prometheus](https://prometheus.io/)-based monitoring stack, including [Grafana](https://grafana.com) for dashboards and log aggregation. It includes alerting, querying, visualization, and monitoring features and works for both cloud and on-premise systems. The data from `substrate-telemetry` can be made available to Prometheus through exporters like [this](https://github.com/w3f/substrate-telemetry-exporter).

## Linux 最佳实践

- 永不使用 root 用户
- 保持更新系统的安全补丁
- 启动并设置防火墙
- 永不允许基于密码的ssh，只能使用基于密钥的访问。
- 禁用不必要的 SSH 子系统 (banner，motd，scp，X11 转发)并加强SSH配置（[入门指南](https://stribika.github.io/2015/01/04/secure-secure-shell.html)）。
- 定期备份您的存储。

## 结论

- Do not expose validators to the public internet, they should only be accessible by allowed parties. Therefore, we propose a layered approach in which the validators are isolated from the internet and connect to the Polkadot network via an intermediate layer of public-facing nodes.

- 目前 Polkadot / Substrate 无法与 HSM /SGX 交互，因此我们需要向验证人机器提供签密钥种子。 该密钥保留在内存中以进行签名操作，并保留在磁盘上(使用密码加密)。

- Given that HA setups would always be at risk of double-signing and there's currently no built-in mechanism to prevent it, we propose having a single instance of the validator to avoid slashing. Slashing penalties for being offline are much less than those for equivocation.

### 验证人

- Validators should only run the Polkadot binary, and they should not listen on any port other than the configured p2p port.

- Validators should run on bare-metal machines, as opposed to VMs. This will prevent some of the availability issues with cloud providers, along with potential attacks from other VMs on the same hardware. The provisioning of the validator machine should be automated and defined in code. This code should be kept in private version control, reviewed, audited, and tested.

- Session 密钥应以安全的方式生成和提供。

- Polkadot should be started at boot and restarted if stopped for any reason (supervisor process).

- Polkadot 应该以非 root 用户身份运行。

- Each validator should connect to the Polkadot network through a set of at least 2 public-facing nodes. The connection is done through a VPN and the machine can't access the public internet, thus the only possible connection is through the VPN.

### 面向公众的节点

- At least two nodes associated with each validator run on at least two different cloud providers and they only publicly expose the p2p port.

- They can run as a container on Kubernetes and we can define the desired state (number of replicas always up, network and storage settings); the connection between the validator and the public-facing nodes is done through a VPN. They have the common Kubernetes security setup in place (restrictive service account, pod security policy and network policy).

- 应以安全的方式提供节点密钥。

- Only run the Polkadot container, no additional services. The VPN agent should run on a sidecar in the same pod (sharing the same network stack).

### 监测

- 应监控面向公众和验证人节点，并定义几种故障情况警报。

- There should be an on-call rotation for managing the alerts.

- 应该有一个清晰的协议，其中包含针对每个警报的每个级别执行的操作以及升级策略。

## 资源

- [Figment Network's Full Disclosure of Cosmos Validator Infrastructure](https://medium.com/figment-networks/full-disclosure-figments-cosmos-validator-infrastructure-3bc707283967)
- [Certus One 的知识库](https://kb.certus.one/)
- [EOS Block Producer Security List](https://github.com/slowmist/eos-bp-nodes-security-checklist)
- [哨兵节点架构概述](https://forum.cosmos.network/t/sentry-node-architecture-overview/454)
- [HSM Policies and the Important of Validator Security](https://medium.com/loom-network/hsm-policies-and-the-importance-of-validator-security-ec8a4cc1b6f)
