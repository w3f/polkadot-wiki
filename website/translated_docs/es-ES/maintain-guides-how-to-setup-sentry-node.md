---
id: maintain-guides-how-to-setup-sentry-node
title: Set Up a Sentry Node - Public Node
sidebar_label: Set Up a Sentry Node
---

This guide assumes you have already set up a validator and would like to make it more resilient and protect against sybil attack or DDoS. It has same configuration of the [polkadot secure validator](https://github.com/w3f/polkadot-secure-validator).

In this guide, we will walk you through how to configure a validator that sits inside a VPN. The validator only talks to the public facing nodes to isolate it from the internet and reduce the chance of your validator being hacked.

## VPN Installation & Configuration

We will use Wireguard to configure the VPN. Wireguard is a fast and secure VPN that uses state-of-the-art cryptography. If you want to learn more about Wireguard, please go [here](https://www.wireguard.com/). Before we move on to the next step, configure the firewall to open the required ports.

```bash
# ssh port
ufw allow 22/tcp
# wireguard port
ufw allow 51820/udp
# libp2p port (Note: Only public node is required))
ufw allow 30333/tcp
ufw enable
# double check the firewall rules
ufw verbose
```

### 1. Install Wireguard

```bash
# install linux headers
apt install linux-headers-$(uname -r)
add-apt-repository ppa:wireguard/wireguard
apt-get update # you can skip this on Ubuntu 18.04
apt-get install wireguard
```

### 2. Generating Keys

There are two commands you will use quite a bit when setting up Wireguard; `wg` is the configuration utility for managing Wireguard tunnel interfaces; `wg-quick` is a utility  for starting and stopping the interface.

To generate the public / private keypair, execute the following commands:

```bash
cd /etc/wireguard
umask 077
wg genkey | sudo tee privatekey | wg pubkey | sudo tee publickey
```

You will see that two files, `publickey` and `privatekey`, have been created.  As may be guessed from their names, `publickey` contains the public key and `privatekey` contains the private key of the keypair.

### 3. Configuration

Now create a `wg0.conf` file under the `/etc/wireguard/` directory.  This file will be used to configure the interface.

Here is a `wg0.conf` configuration template for the **validator**.

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

> Note: In this guide, we only set up 1 peer (public node)

You need to do the previous steps (1 and 2) again in your **public node** but the `wg0.conf` configuration file will look like this:

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

### 4. Test-Connection

If everything goes well, you are ready to test the connection.

To start the tunnel interface, execute the following command in both your `validator` and `public node`.

```bash
wg-quick up wg0

# The console would output something like this
#[#] ip link add wg0 type wireguard
#[#] wg setconf wg0 /dev/fd/63
#[#] ip -4 address add 10.0.0.1/24 dev wg0
#[#] ip link set mtu 1420 up dev wg0
```

You can check the status of the interface by running `wg` :

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

You can then use `ping` to verify the connectivity between the nodes.

In case you want to update `wg0.conf`, run `wg-quick down wg0` to stop the interface first.

### 5. Start your Sentry Node and Validator

After you have started the `wg0` interface on your public node and validator, do spend a little bit of time to take a look at the following description of those flags you are going to use.

`--sentry` - This would be required for your public node to be an authority as an observer. That means it acts the same as a validator node but without holding keys / signing. And the difference between running a full node versus adding an extra `--sentry` flag is that a full node might not have all the data the validator needs to validate properly.

`--reserved-nodes` - The node will try to connect to these nodes and always accept connections from them, but it will still connect and accept connections from other nodes as well.

`--reserved-only` - Only allows the connection from reserved nodes you defined

You need to execute the following command to start your validator and then copy the node's identity first. Then stop it.

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

Now start your sentry with `--sentry` flag.

```
polkadot \
--name "Sentry-A" \
--sentry /ip4/VALIDATOR_VPN_ADDRESS/tcp/30333/p2p/VALIDATOR_NODE_IDENTITY
```

Result:
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

You are also required to use the sentry's node identity when starting your validator, so make sure to save it somewhere else as well. Then start your validator.

```
polkadot \
--name "Validator" \
--reserved-only \ 
--reserved-nodes /ip4/SENTRY_VPN_ADDRESS/tcp/30333/p2p/SENTRY_NODE_IDENTITY \
--validator
```

You should see your validator has 1 peer, that is a connection from your sentry node. Do the above steps to spin up few more if you think one sentry node is not enough.

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

Congratulations! You have successfully set up a validator with a public facing node and now have a more secure way of running your validator.
