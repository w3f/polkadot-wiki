---
id: maintain-guides-how-to-setup-a-validator-with-reverse-proxy
title: Set Up a Validator with NGINX Reverse Proxy
sidebar_label: Set Up a Validator with NGINX Reverse Proxy
description: Steps on setting up a reverse proxy for your validator node.
slug: ../maintain-guides-how-to-setup-a-validator-with-reverse-proxy
---

This guide assumes that you have already configured your hardware with the appropriate specs. It has the same configuration
as the [polkadot validator setup](https://github.com/w3f/polkadot-secure-validator).

> NOTE: Because validators of parachains need to have publicly accessible IP addresses and ports to receive connections from
> parachain collators, adding a proxy may potentially reduce connectivity and result in lower era points or the inability to
> validate parachain blocks. If using a proxy, it's recommended to keep an eye out on networking metrics.

We will walk you through how to configure a reverse proxy using NGINX in front of your validator node. The
validator uses the reverse proxy to filter traffic, whereby additional adjustments can be made to respond to a DDoS attack.

### 1. Firewall configuration

We will configure the firewall with [ufw](https://wiki.ubuntu.com/UncomplicatedFirewall). There needs to be three main ports
for this setup.

- An SSH port, commonly ssh/tcp port `22`.
- A proxy port
- p2p port: must be denied at the firewall level.

In this example, we will assign the port number `2435` to the proxy port and the port number `30333` to the p2p port.
To enable the firewall and the use of the ports, allow SSH access.

> NOTE: For parachains, you will need to allow for both inbound and outbound traffic on the p2p port. Since the proxy
> port is the public-facing port, this will need to have inbound and outbound traffic open, with the normal p2p port closed.

```bash
ufw enable
# ssh port
ufw allow 22/tcp
# proxy port
ufw allow 2435/tcp
# libp2p port
ufw deny 30333/tcp
# default port for HTTP
ufw deny 9933
# default port for WS
ufw deny 9944
ufw reload
# double check the firewall rules
ufw verbose
```

The `verbose` option shows some extra information about the firewall's behavior.

### 2. Basic log viewing

We use [journald](https://www.loggly.com/blog/why-journald/) logs for basic log viewing.
Create a file called `journald.conf` file inside the `/etc/systemd/` directory with the following content:

```bash
[Journal]
Storage=persistent
RateLimitIntervalSec=30s
RateLimitBurst=20000
SystemMaxUse=50G
SystemMaxFileSize=512M
SystemMaxFiles=100
```

Check out the [example journald configuration file](https://github.com/w3f/polkadot-secure-validator/blob/master/ansible/roles/polkadot-validator/files/journald.conf) for more available options.

Finally, run the following command to restart the journald service:

```bash
systemctl restart systemd-journald
```

### 3. NGINX reverse proxy setup

First, install NGINX with the following command:

```
sudo apt-get install nginx
```

Next, create an NGINX configuration file called `nginx.conf` inside the `/etc/nginx/` directory with the following content:

```bash
user www-data www-data;

load_module /usr/lib/nginx/modules/ngx_stream_module.so;

stream {
  include streams-enabled/*;
}

http {
  include sites-enabled/*;
}

events{
}
```

This will import and make use of the [NGINX stream module](https://nginx.org/en/docs/stream/ngx_stream_core_module.html).
In a nutshell, this module allows for continuous streaming of data in or out of the validator machine with all the benefits
of having an optimized reverse proxy.

Next, create a folder called `/streams-enabled/` inside the `/etc/nginx/` directory and remove the default NGINX site.

```bash
# Create the streams-enabled folder
mkdir /etc/nginx/streams-enabled
# Delete the default configuration
/etc/nginx/sites-enabled/default
```

Now, inside the newly created directory `/etc/nginx/streams-enabled/`, create the proxy service file called
`polkadot-proxy.conf` with the following content:

> Use the previously defined ports: port `2435` for the proxy port & port number `30333` for the p2p port.

```bash
server {
  listen 0.0.0.0:2435;
  location / {
    proxy_pass http://localhost:30333;
  }
}
```

Change the permissions of the file `polkadot-proxy.conf` accordingly:

```bash
chmod 0600 polkadot-proxy.conf
```

Finally, restart NGINX with the following command:

```bash
service nginx restart
```

### 4. Defining your proxy port and p2p port in the polkadot command

These are some of the flags you are going to use when executing the command.

`--public-addr <VALIDATOR_IP>, <PROXY_PORT>` - This flag defines the validator's IP and the proxy port
that all other nodes in the network will connect to.

`--listen-addr <LOCALHOST>, <P2P_PORT>` - This flag defines the p2p port that the polkadot application
will use to connect to the NGINX reverse proxy.

#### P2P Networking

Nodes will use [libp2p](https://libp2p.io/) as the networking layer to establish peers and gossip
messages, but uses NGINX as a load balancer which acts as a _first listener_ of the streaming data to help
balance the load.

##### public-addr

`public-addr` - a flexible encoding of multiple layers of protocols into a human-readable addressing scheme.
In our example, `/ip4/<VALIDATOR_IP>/tcp/<PROXY_PORT>` is a valid `public-addr` that
specifies wanting the network to reach the validator IPv4 address with TCP packets on the pre-defined proxy port.

- `IP_ADDRESS` - the public IP address of the validator.

- `PROXY_PORT` - the port that nodes will send p2p messages over the network and are read by the NGINX reverse proxy.

##### listen-addr

`listen-addr` - the specification of what port the polkadot application will connect to the reverse proxy.
In our example, `/ip4/0.0.0.0/tcp/<P2P_PORT>`
specifies that you want to listen to NGINX on the localhost address (`0.0.0.0`, or all interfaces), with TCP
packets on the pre-defined p2p port.

- `P2P_PORT` - the port that the polkadot application connects to NGINX.

#### Starting the validator with the NGINX proxy

After retrieving the appropriate `IP_ADDRESS`, `PROXY_PORT` and `P2P_PORT` of the validator node, we can start the
validator.

Start your validator with the `--validator` flag:

```bash
# Validator Node
polkadot \
  --name My_Validator_Name \
  --validator \
  --public-addr=/ip4/IP_ADDRESS/tcp/2435 \
  --listen-addr=/ip4/0.0.0.0/tcp/30333 \
  --rpc-methods=Unsafe \
  --chain=polkadot

```

You should see your validator's peers, as well as the p2p port you are using to connect to NGINX.

```
2020-12-17 19:04:36  __ Imported #2940151 (0x14c5_f472)
2020-12-17 19:04:39  __ Idle (35 peers), best: #2940151 (0x14c5_f472), finalized #2940149 (0x6014_7806), _ 1.1MiB/s _ 1.1MiB/s
2020-12-17 19:04:43  __ Imported #2940152 (0xcce7_c192)
2020-12-17 19:04:44  __ Idle (35 peers), best: #2940152 (0xcce7_c192), finalized #2940150 (0x8e24_8e72), _ 1.4MiB/s _ 1.2MiB/s
2020-12-17 19:04:48  __ Imported #2940153 (0xc79b_0ae3)
2020-12-17 19:04:49  __ Idle (35 peers), best: #2940153 (0xc79b_0ae3), finalized #2940151 (0xc4b8_8fa1), _ 1.2MiB/s _ 1.2MiB/s
2020-12-17 19:04:54  __ Imported #2940154 (0x1419_56db)
2020-12-17 19:04:54  __ Idle (35 peers), best: #2940154 (0x1419_56db), finalized #2940151 (0xc4b8_8fa1), _ 1.2MiB/s _ 1002.5kiB/s
```

Congratulations! You have successfully set up a validator with NGINX and now have a
more secure way of running your validator.
