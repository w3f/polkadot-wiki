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

你会看到二个文档 <`publickey` 和 `privatekey` 已经创建了。从只看名称 `publickey` 包含了公钥而 `privatekey`包含了私钥对。


### 3. 设置

在 `/etc/wireguard/` 目录下创建 `wg0.conf` 文档，这将会用于设置其界面。

这是设置**验证人** `wg0.conf` 的模版。

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

# 哨兵节点 
[Peer]
# replace it to the public node A public key
PublicKey = Vdepw3JhRKDytCwjwA0nePLFiNsfB4KxGewl4YwAFRg=
# public ip address for your public node machine
Endpoint = 112.223.334.445:51820
# replace it to the public node A interface address
AllowedIPs = 10.0.0.2/32
# keep the connection alive by sending a handshake every 21 seconds
PersistentKeepalive = 21

# 注意: 在本教程，我们仅设置一个哨兵节点

你需要在**哨兵节点**中重覆前面1和2的步骤，但 wg0.conf 配置文件将如下所示:

```bash
[Interface]
Address = 10.0.0.2/32
PrivateKey = eCii0j3IWi4w0hScc8myUj5QjXjjt5rp1VVuqlEmM24=
ListenPort = 51820
SaveConfig = true

# 验证人
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

如果你想要更新 `wg0.conf`, 先运行 `wg-quick-own wg0` 來停止接口。

### 5. 启动哨兵节点和验证人

当你启动了哨兵节点和验证人的 `wg0` 接口，用一点时间看一下你将会使用标志的描述。

`-sentry ` - 这将需要在哨兵节点成为观察者，这意味着它跟运行验证人是一样，但是并没有持有密钥/负责签名。运行全节点与增加额外的 ` --sentry ` 区别是，哨兵节点将会拥有验证人所需要的数据，但是全节点有可能没有验证人所需要的数据作验证。

`--reserved-nodes` - 节点会尝试连接在这里定义的节点并且一直接受它们的连接，但是它还会连接和接受其它以外的节点。

`--reserved-only` - 只接受你在 --reserved-nodes 定义的节点连接。

因为我们想要确保哨兵节点永不会拒绝验证人的连接，所以 `--reserved-nodes` 也需要在哨兵节点上使用来防止发生。这将会发生这种情况，当节点位置都满了。

您需要执行以下指令启动验证人，然后先复制节点的身份。然后再停止它。

`./target/release/polkadot --validator`

```
2019-11-22 18:44:45 Parity Polkadot
2019-11-22 18:44:45   version 0.6.17-4b9ed4e1-x86_64-linux-gnu
2019-11-22 18:44:45   by Parity Team <admin@parity.io>, 2017-2019
2019-11-22 18:44:45 Chain specification: Kusama CC2
2019-11-22 18:44:45 ----------------------------
2019-11-22 18:44:45 This chain is not in any way
2019-11-22 18:44:45       endorsed by the
2019-11-22 18:44:45      KUSAMA FOUNDATION
2019-11-22 18:44:45 ----------------------------
2019-11-22 18:44:45 Node name: maddening-cabbage-7688
2019-11-22 18:44:45 Roles: AUTHORITY
2019-11-22 18:44:45 Highest known block at #780795
2019-11-22 18:44:45 Local node identity is: QmTRSEZVE86Vrx8cHLqZhsQ2UfhMy4zZikvgWKzYBsLJZv
```

现在使用 `--sentry` 和 `--reserved-nodes` 启动哨兵节点。

```
./target/release/polkadot \
--name "Sentry-A" \
--sentry \
--reserved-nodes /ip4/VALIDATOR_VPN_ADDRESS/tcp/30333/p2p/VALIDATOR_NODE_IDENTITY
```

您也需要在启动验证人时使用哨兵节点的 ID，所以确保先保存它的 ID 在其它地方。

然后启动验证人。

```
./target/release/polkadot \
--name "Validator" \
--reserved-only \ 
--reserved-nodes /ip4/SENTRY_VPN_ADDRESS/tcp/30333/p2p/SENTRY_NODE_IDENTITY \
--validator
```

最后您应该看到验证人有一个来自哨兵节点的连接。如果你认为一个哨兵节点不足够，你可按照上述步骤来增加更多。

```
2019-11-22 19:15:08 Idle (1 peers), best: #781102 (0xcb78…6913), finalized #781100 (0xacc8…d7bb), ⬇ 43.4kiB/s ⬆ 34.3kiB/s
2019-11-22 19:15:13 Idle (1 peers), best: #781102 (0xcb78…6913), finalized #781101 (0x9323…0859), ⬇ 35.1kiB/s ⬆ 12.9kiB/s
2019-11-22 19:15:13 Imported #781103 (0x9212…16f3)
2019-11-22 19:15:13 Starting parachain attestation session on top of parent 0x9212f2a6ef33cf87625c86bc2766a28d75f3365d521d37298ba91e32d6af16f3. Local parachain duty is None
2019-11-22 19:15:18 Idle (1 peers), best: #781103 (0x9212…16f3), finalized #781102 (0xcb78…6913), ⬇ 35.6kiB/s ⬆ 35.6kiB/s
2019-11-22 19:15:18 Discovered new external address for our node: /ip4/10.0.1.30/tcp/30333/p2p/QmTRSEZVE86Vrx8cHLqZhsQ2UfhMy4zZikvgWKzYBsLJZv
2019-11-22 19:15:20 Imported #781104 (0x45ac…9249)
2019-11-22 19:15:20 Starting parachain attestation session on top of parent 0x45acec7ceeaa9994a82a6d9c9ca028b4a26c25b70041a42427cb2ba345529249. Local parachain duty is None
2019-11-22 19:15:23 Idle (1 peers), best: #781104 (0x45ac…9249), finalized #781103 (0x9212…16f3), ⬇ 46.9kiB/s ⬆ 36.7kiB/s
2019-11-22 19:15:25 Starting parachain attestation session on top of parent 0x5450c2d923b3877f0864a1cff8db0a93680eb0af585e2e836702392420b73269. Local parachain duty is None
2019-11-22 19:15:25 Imported #781105 (0x5450…3269)
2019-11-22 19:15:28 Idle (1 peers), best: #781105 (0x5450…3269), finalized #781104 (0x45ac…9249), ⬇ 17.7kiB/s ⬆ 20.1kiB/s
2019-11-22 19:15:31 Imported #781106 (0x0eb1…5697)
2019-11-22 19:15:31 Starting parachain attestation session on top of parent 0x0eb1a30932beaf676d3853475315bf3e7b5629bb77e2891295f4f9bf45eb5697. Local parachain duty is None
```

恭喜！您已经成功地设置了一个拥有哨兵节点的验证人，现在可以更安全地运行验证人。
