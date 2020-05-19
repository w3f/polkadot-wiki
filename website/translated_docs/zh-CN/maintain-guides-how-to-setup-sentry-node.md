---
id: maintain-guides-how-to-setup-sentry-node
title: 设置哨兵节点
sidebar_label: 设置哨兵节点
---

本教程假设你已经设置好验证人并且想把你的节点提高女巫攻击或 DDOs 防御保护。这个跟 [polkadot secure validator](https://github.com/w3f/polkadot-secure-validator) 配置一样。

我们会一步一步把验证人设置在 VPN 网络内。验证人只会与哨兵节点沟通并与网络分隔，从而减低你的验证人被入侵机会。

## VPN 安装 & 设置

我们会使用 Wireguard 作为 VPN。 Wireguard 是快速和安全的 VPN ，它使用最新的密码学。如果你有兴趣想了解更多关于 Wireguard，前往[这里](https://www.wireguard.com/)。在我们前往下一步之前，先设置防火墙并打开所需要的端口。

```bash
# ssh port
ufw allow 22/tcp
# wireguard port
ufw allow 51820/udp
# libp2p port (注意: 只有哨兵节点需要)
ufw allow 30333/tcp
ufw enable
# 再次检查防火墙规则
ufw verbose
```

### 1. 安装 Wirguard

```bash
# install linux headers
apt install linux-headers-$(uname -r)
add-apt-repository ppa:wireguard/wireguard
apt-get update # you can skip this on Ubuntu 18.04
apt-get install wireguard
```

### 2. 生成密钥

这里有二个指令当你设置 Wireguard 时会经常使用，`wg` 是设置程序用作管理 Wireguard 隧道接口，而 `wg-quick` 是用于启动或停止。

需要生成公钥/私钥对，请执行以下指令:

```bash
cd /etc/wireguard
umask 077
wg genkey | sudo tee privatekey | wg pubkey | sudo tee publickey
```

你会看到 `publickey` 和 `privatekey` 已经创建了。从只看名称 `publickey` 包含了公钥而 `privatekey`包含了私钥对。

### 3. 设置

在 `/etc/wireguard/` 目录下创建 `wg0.conf` 文档，这将会用于设置其界面。

这是设置 **验证人** `wg0.conf` 的模版。

```bash
[Interface]
# specify the address you want to assign for this machine.
Address = 10.0.0.1/32
# the private key you just generated
PrivateKey = 8MeWtQjBrmYazzwni7s/9Ow37U8eECAfAs0AIuffFng=
# listening port of your server
ListenPort = 51820
# if you use wg to add a new peer when running, it will automatically
# save the newly added peers to your configuration file
# without requiring a restart
SaveConfig = true

# Public Node A
[Peer]
# replace it to the public node A public key
PublicKey = Vdepw3JhRKDytCwjwA0nePLFiNsfB4KxGewl4YwAFRg=
# public ip address for your public node machine
Endpoint = 112.223.334.445:51820
# replace it to the public node A interface address
AllowedIPs = 10.0.0.2/32
# keep the connection alive by sending a handshake every 21 seconds
PersistentKeepalive = 21
```

> 注意：在本指南中，我们仅设置了 1 个对等点(公开节点)

您需要在您的  **哨兵节点** 中再次执行之前的步骤(1和2)，但 `wg0.onf`配置文件会是像这样：

```bash
[Interface]
Address = 10.0.0.2/32
PrivateKey = eCii0j3IWi4w0hScc8myUj5QjXjjt5rp1VVuqlEmM24=
ListenPort = 51820
SaveConfig = true

# Validator
[Peer]
# replace this with the validator public key
PublicKey = iZeq+jm4baF3pTWR1K1YEyLPhrfpIckGjY/DfwCoKns=
# public ip address of the validator
Endpoint = 55.321.234.4:51820
# replace it with the validator interface address
AllowedIPs = 10.0.0.1/32
PersistentKeepalive = 21
```

### 4. 测试连接

如果一切顺利，您已准备好测试连接。

要启动 VPN 隧道接口，请在您的 `验证人` 和 `哨兵节点` 中执行以下指令。

```bash
wg-quick up wg0

# The console would output something like this
#[#] ip link add wg0 type wireguard
#[#] wg setconf wg0 /dev/fd/63
#[#] ip -4 address add 10.0.0.1/24 dev wg0
#[#] ip link set mtu 1420 up dev wg0
```

您可以通过运行 `wg` 来检查接口状态:

```bash
# Output
 interface: wg0
  public key: iZeq+jm4baF3pTWR1K1YEyLPhrfpIckGjY/DfwCoKns=
  private key: (hidden)
  listening port: 51820

peer: Vdepw3JhRKDytCwjwA0nePLFiNsfB4KxGewl4YwAFRg=
  endpoint: 112.223.334.445:51820
  allowed ips: 10.0.0.2/32
  latest handshake: 18 seconds ago
  transfer: 580 B received, 460 B sent
  persistent keepalive: every 25 seconds
```

然后您可以使用 `ping` 来验证彼此之间的连接。

In case you want to update `wg0.conf`, run `wg-quick down wg0` to stop the interface first.

### 5. 启动哨兵节点和验证人

当你启动了哨兵节点和验证人的 `wg0` 接口，用一点时间看一下你将会使用标志的描述。

` --sentry ` - 这将需要在哨兵节点成为观察者，这意味着它跟运行验证人是一样，但是并没有持有密钥/负责签名。运行全节点与增加额外的 ` --sentry ` 区别是，哨兵节点将会拥有验证人所需要的数据，但是全节点有可能没有验证人所需要的数据作验证。

`--reserved-nodes` - 节点会尝试连接在这里定义的节点并且一直接受它们的连接，但是它还会连接和接受其它以外的节点。

`--reserved-only` - 只接受你在 --reserved-nodes 定义的节点连接。

您需要执行以下指令启动验证人，然后先复制节点的身份。然后再停止它。

`polkadot --validator`

```
2020-04-16 19:40:52 ----------------------------
2020-04-16 19:40:52 This chain is not in any way
2020-04-16 19:40:52       endorsed by the
2020-04-16 19:40:52      KUSAMA FOUNDATION
2020-04-16 19:40:52 ----------------------------
2020-04-16 19:40:52 Parity Polkadot
2020-04-16 19:40:52 ✌️  version 0.7.29-13ec3023-x86_64-linux-gnu
2020-04-16 19:40:52 ❤️  by Parity Technologies <admin@parity.io>, 2017-2020
2020-04-16 19:40:52 📋 Chain specification: Kusama
2020-04-16 19:40:52 🏷  Node name: 😍 Anson demo
2020-04-16 19:40:52 👤 Role: AUTHORITY
2020-04-16 19:40:52 ⛓  Native runtime: kusama-1057:2(parity-kusama-1)
2020-04-16 19:40:53 📦 Highest known block at #1913153
2020-04-16 19:40:53 🏷  Local node identity is: QmR4kE8mxKcPjtvEofN59B176tKxsKoNV5Ugbf86vmfJnY
2020-04-16 19:40:53 👶 Starting BABE Authorship worker
```

现在启动哨兵节点时加上 `--sentry` 标志。

```
polkadot \
--name "Sentry-A" \
--sentry /ip4/VALIDATOR_VPN_ADDRESS/tcp/30333/p2p/VALIDATOR_NODE_IDENTITY
```

结果：

```
2020-04-16 19:41:53 ----------------------------
2020-04-16 19:41:53 This chain is not in any way
2020-04-16 19:41:53       endorsed by the
2020-04-16 19:41:53      KUSAMA FOUNDATION
2020-04-16 19:41:53 ----------------------------
2020-04-16 19:41:53 Parity Polkadot
2020-04-16 19:41:53 ✌️  version 0.7.29-13ec3023-x86_64-linux-gnu
2020-04-16 19:41:53 ❤️  by Parity Technologies <admin@parity.io>, 2017-2020
2020-04-16 19:41:53 📋 Chain specification: Kusama
2020-04-16 19:41:53 🏷  Node name: Sentry ANSON - A
2020-04-16 19:41:53 👤 Role: SENTRY
2020-04-16 19:41:53 ⛓  Native runtime: kusama-1057:2(parity-kusama-1)
2020-04-16 19:41:53 📦 Highest known block at #1913161
2020-04-16 19:41:53 🏷  Local node identity is: QmSAg4uHhVK1CHt5TJGPrWVWDJBVjgwKd1wSv88DPCtEHa
2020-04-16 19:41:53 〽️ Prometheus server started at 127.0.0.1:9615
```

您也需要在启动验证人时使用哨兵节点的 ID，所以确保先保存它的 ID 在其它地方。

```
polkadot \
--name "Validator" \
--reserved-only \
--reserved-nodes /ip4/SENTRY_VPN_ADDRESS/tcp/30333/p2p/SENTRY_NODE_IDENTITY \
--validator
```

最后您应该看到验证人有一个来自哨兵节点的连接。如果你认为一个哨兵节点不足够，你可按照上述步骤来增加更多。

```
2020-04-16 19:42:57 💤 Idle (1 peers), best: #1913174 (0x24f6…14f9), finalized #1913151 (0xced8…492b), ⬇ 18.0kiB/s ⬆ 4.5kiB/s
2020-04-16 19:42:58 🔍 Discovered new external address for our node: /ip4/10.0.0.164/tcp/30333/p2p/12D3KooWEnA6JqCk59k8SNShYDGDHTfdqGJLsTpZjgLRT6rAqfDg
2020-04-16 19:43:00 ✨ Imported #1913175 (0x76c0…ad3e)
2020-04-16 19:43:00 Starting parachain attestation session on top of parent 0x76c0c4649d290c840523316ac157380dd703fa1b9fb83b326756ce35ff49ad3e. Local parachain duty is None
2020-04-16 19:43:02 💤 Idle (1 peers), best: #1913175 (0x76c0…ad3e), finalized #1913172 (0x5925…15bd), ⬇ 33.0kiB/s ⬆ 7.1kiB/s
2020-04-16 19:43:07 ✨ Imported #1913176 (0xf1bc…3ace)
2020-04-16 19:43:07 Starting parachain attestation session on top of parent 0xf1bc3c7ed57070b4ad48bfc564a16827dc7486582f97abf00ff38061e4ef3ace. Local parachain duty is None
2020-04-16 19:43:07 💤 Idle (1 peers), best: #1913176 (0xf1bc…3ace), finalized #1913173 (0x4c97…e6b6), ⬇ 16.4kiB/s ⬆ 5.9kiB/s
2020-04-16 19:43:08 ✨ Imported #1913176 (0x672e…6123)
2020-04-16 19:43:12 💤 Idle (1 peers), best: #1913176 (0xf1bc…3ace), finalized #1913174 (0x24f6…14f9), ⬇ 43.7kiB/s ⬆ 29.4kiB/s
2020-04-16 19:43:13 ✨ Imported #1913177 (0x4e1b…209f)
2020-04-16 19:43:13 Starting parachain attestation session on top of parent 0x4e1b8fd258739d5784fbdf7cf156e2ebfd90159b21427b8e041a3aa73b99209f. Local parachain duty is None
2020-04-16 19:43:14 ✨ Imported #1913177 (0x9b77…67c7)
2020-04-16 19:43:17 💤 Idle (1 peers), best: #1913177 (0x4e1b…209f), finalized #1913174 (0x24f6…14f9)
```

恭喜！您已经成功地设置了一个拥有哨兵节点的验证人，现在可以更安全地运行验证人。
