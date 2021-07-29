---
id: maintain-guides-how-to-setup-a-Validator-with-NGINX-reverse-proxy
title: Set Up a Validator with NGINX Reverse Proxy
sidebar_label: Set Up a Validator with NGINX Reverse Proxy
---

This guide assumes you have already the hardware ready with the appropriate specs. It has same configuration of the
[polkadot validator setup](https://github.com/w3f/polkadot-secure-validator).

We will walk you through how to configure a reverse proxy using NGINX in front of your validator node. The
validator uses the reverse proxy only to talk to the public facing nodes, to protect it from certain types of attacks.

### 1. Firewall configuration

We will configure the firewall with ufw. There needs to be three main ports for this setup. The SSH port commonly is 22 which must be allowed, the proxy port which also must be allowed and the p2p port which in turn must be denied at the firewall level. In this example we will assign the port number `2435` to the proxy port and the port number `30333` to the p2p port.

```bash
# ssh port
ufw allow 22/tcp
# proxy port
ufw allow 2435/tcp
# libp2p port
ufw deny 30333/tcp
ufw enable
# double check the firewall rules
ufw verbose
```

### 2. Configure journald logs

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

finally, run the following command to restart the journald service.

```bash
systemctl restart systemd-journald
```

### 3. NGINX reverse proxy setup

First install NGINX with the following command.

```
apt install nginx
```

Next, create an NGINX configuration file called `nginx.conf` file inside the `/etc/nginx/` directory with the following content.

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

This will import and make use of the [NGINX stream module](https://nginx.org/en/docs/stream/ngx_stream_core_module.html). In a nutshell, this module will allow continous streaming of data in or out of the validator machine with all the benefits of having an optimized reverse proxy.

Next, create a folder called `/streams-enabled/` inside the `/etc/nginx/` directory and remove the default NGINX site.

```bash
# Create the streams-enabled folder
mkdir /etc/nginx/streams-enabled
# Delete the default configuration
/etc/nginx/sites-enabled/default
```

Now, inside the newly created directory `/etc/nginx/streams-enabled/`, create the proxy service file called `polkadot-proxy.conf` with the following content and the previously defined ports. The port number `2435` to the proxy port and the port number `30333` to the p2p port.

```bash
server {
  listen 0.0.0.0:2435;
  proxy_pass localhost:30333;
}
```

Change the permissions of the file `polkadot-proxy.conf` accordingly.

```bash
chmod 0600 polkadot-proxy.conf
```

Finally, restart NGINX with the following command

```bash
service nginx restart
```

### 4. Defining your proxy port and p2p port in the polkadot command

These are some of the flags you are going to use.

`--public-addr <VALIDATOR_IP>, <PROXY_PORT>` - This flag defines the validator's IP and the proxy port
that all other nodes in the network will connect to.

`--listen-addr <LOCALHOST>, <P2P_PORT>` - This flag defines the p2p port that the polkadot application
will use to connect to the NGINX reverse proxy.

#### P2P Networking

Nodes will use [libp2p](https://libp2p.io/) as the networking layer to establish peers and gossip
messages but will need to go through NGINX first as a first listener of the streaming data to help balance the load.

##### public-addr

`public-addr` - A `public-addr` is a flexible encoding of multiple layers of protocols into a human
readable addressing scheme. In our example, `/ip4/<VALIDATOR_IP>/tcp/<PROXY_PORT>` is a valid `public-addr` that
specifies you want the network to reach the Validator IPv4 address with tcp packets on the predefined proxy port.

- `IP_ADDRESS` - The public IP address of the validator.

- `PROXY_PORT` - This is the port that nodes will send p2p messages over the network and will be read by the NGINX reverse proxy.

##### listen-addr

`listen-addr` - A `public-addr` is the specification of what port the polkadot application will connect to the reverse proxy.
In our example, `/ip4/127.0.0.1/tcp/<P2P_PORT>` means that
specifies you want to listen to NGINX on the localhost address `127.0.0.1` with tcp packets on the predefined p2p port.

- `P2P_PORT` - This is the port that the polkadot application will connect to NGINX.

#### Starting Validator with the NGINX Proxy

After retrieving the appropriate `IP_ADDRESS`, `PROXY_PORT` and `P2P_PORT` of the validator node, we can start the validator
using the following flags:

Start your validator with the `--validator` flag:

```bash
# Validator Node
polkadot \
  --name My_Validator_Name \
  --validator \
  --public-addr=/ip4/IP_ADDRESS/tcp/2435 \
  --listen-addr=/ip4/127.0.0.1/tcp/30333 \
  --rpc-methods=Unsafe \
  --chain=Polkadot

```

You should see your validator's peers, and the p2p port you are using to connect to NGINX.

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
