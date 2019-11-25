---
id: maintain-guides-how-to-setup-sentry-node
title: Setup a Sentry Node - Public Node
sidebar_label: Setup a Sentry Node
---

This guide assumes you have already set-up a validator and would like to make it more resillient and protect against sybil attack or DDoS. It has same configuration of the [polkadot secure validator](https://github.com/w3f/polkadot-secure-validator).

In this guide, we will walk you through how to configure a validator that sits inside a VPN. The validator only talks to the public facing nodes to isolate from the Internet and reduce the chance of your validator being hacked.

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

You will see two files, `publickey` and `privatekey`, have been created.  As may be guessed from their names, `publickey` contains the public key and `privatekey` contains the private key of the keypair.


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

# Note: In this guide, we only set up 1 peer (public node)

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

You can then use `ping` to verify the connectivity between each other. 

In case you want to update `wg0.conf`, run `wg-quick down wg0` to stop the interface first.

### 5. Start your Sentry Node and Validator

After you have started the `wg0` interface on your public node and validator, do spend a little bit of time to take a briefly look at the following description of those flags you are going to use. 

`--sentry` - This would be required for your public node to be a authority as a observer that means it actually same as validator node but without holding keys / doing signing. And the difference between running a full node versus adding an extra `--sentry` flag is that running a authority node would have every data the validator is needed available, while full node might not have all the data the validator need to validate properly.

`--reserved-nodes` - The node will try to connect to these nodes and always accept connections from them, but it will still connect and accept connections from other nodes as well. 

`--reserved-only` - Only allows the connection from reserved nodes you defined

Since we want to ensure that the sentry node would never reject a connection from our validator and this could happen if all the peer slots were full, `--reserved-nodes` will be required on the sentry to prevent that happen.

You need to execute the following command to start your validator and then copy the node's identity first. Then stop it.

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

Now start your sentry with `--sentry` and `--reserved-nodes`. 

```
./target/release/polkadot \
--name "Sentry-A" \
--sentry \
--reserved-nodes /ip4/VALIDATOR_VPN_ADDRESS/tcp/30333/p2p/VALIDATOR_NODE_IDENTITY
```

You are also required to use sentry's node identity when starting your validator, so make sure to save it in somewhere else as well.

Then start your validator.

```
./target/release/polkadot \
--name "Validator" \
--reserved-only \ 
--reserved-nodes /ip4/SENTRY_VPN_ADDRESS/tcp/30333/p2p/SENTRY_NODE_IDENTITY \
--validator
```

Finally you should see your validator has 1 peers that is a connection from your sentry node. Do the above steps to spin up few more if you think one sentry node is not enough.

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

Congratulations! You have successfully set-up a validator with a public facing node and now have a more secure way of running your validator.