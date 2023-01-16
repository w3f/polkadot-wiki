---
id: maintain-wss
title: Secure WebSocket
sidebar_label: Secure WebSocket
description: Steps on setting up a secure socket for remote connections.
keywords: [web socket, remote, connection, secure websocket]
slug: ../maintain-wss
---

The substrate node RPC server can be accessed over the websocket protocol, which can be used as a
way to access the underlying network and/or validator node. By default you can access your node's
RPC server from localhost (for example to rotate keys or do other maintenance). To access it from
another server or from an applications UI (such as [Polkadot-JS UI](https://polkadot.js.org/apps))
it is recommended to enable access to the RPC node over an TLS connection and as such encrypting the
connection between the end user and the RPC server. This can be achieved by setting up a secure
proxy. Many browsers such as Google Chrome will block non secure WS endpoints if they come from a
different origin.

:::note 

Enabling remote access to your validator node should not be necessary and is not suggested
as it can often lead to security problems 

:::

## Set up a node

Setting up any Substrate-based node relies on a similar process. For example, they will all by
default share the same websocket connection at port 9944 on localhost. In this example, we'll set up
a polkadot sync node on a debian flavoured server (such as Ubuntu 22.04). Create a new server on
your provider of choice or locally at home. See [Set up a Full Node](./maintain-sync) for additional
instructions. You can choose to install from the default apt repository or build from scratch. The
startup options in the setup process provide a variety of different settings that can be modified.

A typically setting for an externally accessible polkadot archive RPC node would be:

```config
polkadot --chain polkadot --name myrpc --state-pruning archive --blocks-pruning archive --ws-max-connections 100 --rpc-cors all --rpc-methods Safe --ws-port 9944
```

Or for a polkadot pruned RPC node:

```config
polkadot --chain polkadot --name myrpc --state-pruning 1000 --blocks-pruning archive --ws-max-connections 100 --rpc-cors all --rpc-methods Safe --ws-port 9944
```

The specified flag option are outlined in greater detail below.

### Archive Node vs Pruned Node

A pruned node only keeps a limited number of finalized blocks of the network and not its full
history. Most frequently required actions can be completed with a pruned node, such as displaying
account balances, making transfers, setting up session keys, staking, etc. An archive node has the
full history (database) of the network and can be queried in all kind of ways, such as providing
historical information regarding transfers, balance histories, and more advanced queries involving
past events, etc.

An archive node requires a lot more diskspace. At the start of January 2023, polkadot disk usage was
at 115 GB for a pruned node and 765 GB for an archive node. This value will increase with time. For
an archive node you need the options `--state-pruning archive --blocks-pruning archive` in your
startup settings.

:::tip 

Inclusion in the Polkadot.js UI requires an archive node. 

:::

### Secure the RPC server

The node startup settings allow you to choose **what** to expose, **how many** connections to expose
and **from where** access should be granted through the rpc server.

_How many_: You can set your maximum connections through `--ws-max-connections`, for example
`--ws-max-connections 100`

_From where_: by default localhost and the polkadot.js are allowed to access the RPC server, you can
change this by setting `--rpc-cors`, to allow access from everywhere you need `--rpc-cors all`

_What_: you can limit the methods to use with `--rpc-methods`, an easy way to set this to a safe
mode is `--rpc-methods Safe`

## Secure the ws port

A non secure ws port can be converted to a secure wss port by placing it behind an SSL enabled
proxy. The SSL enabled apache2/nginx/other proxy server redirects requests to the internal rpc node.
For this you will need an SSL certificate. There are different strategies for obtaining a cert, such
as using a service like letsencrypt or self signing.

### Obtaining an SSL Certificate

One easy way to get a free SSL certificate can be achieved by following the LetsEncrypt instructions
([nginx](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal)/[apache](https://certbot.eff.org/instructions?ws=apache&os=ubuntufocal)).
This will auto-generate an SSL certificate and include it in your configuration.

Alternatively you can generate a self-signed certificate and rely on the raw IP address of your node
when connecting to it. This is not preferable since you will have to whitelist the certificate to
access it from a browser.

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/selfsigned.key -out /etc/ssl/certs/selfsigned.crt
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

## Installing a Proxy Server

There are a lot of different implementations of a websocket proxy, some of the more widely used are
[nginx](https://www.nginx.com/) and [apache2](https://httpd.apache.org/), for which configuration
examples provided below.

### Nginx

```bash
apt install nginx
```

In a SSL enabled virtualhost add:

```conf
server {
  (...)
  location / {
    proxy_buffers 16 4k;
    proxy_buffer_size 2k;
    proxy_pass http://localhost:9944;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
   }
}
```

Optionally some form of rate limiting can be introduced:

```conf
http {
  limit_req_zone  "$http_x_forwarded_for" zone=zone:10m rate=2r/s;
  (...)
}

location / {
  limit_req zone=zone burst=5;
  (...)
}
```

### Apache2

You can run it in different modes such as prefork, worker or event. In this example, we use
[event](https://httpd.apache.org/docs/2.4/mod/event.html) which works well on higher load
environments but other modes are also useful given the requirements.

```bash
apt install apache2
a2dismod mpm_prefork
a2enmod mpm_event proxy proxy_html proxy_http proxy_wstunnel rewrite ssl
```

The [mod_proxy_wstunnel](https://httpd.apache.org/docs/2.4/mod/mod_proxy_wstunnel.html) provides
_support for the tunnelling of web socket connections to a backend websockets server. The connection
is automatically upgraded to a websocket connection_. In a SSL enabled virtualhost add:

```apacheconf
(...)
SSLProxyEngine on
ProxyRequests off

ProxyPass / ws://localhost:9944
ProxyPassReverse / ws://localhost:9944
```

Older versions of mod_proxy_wstunnel do not upgrade the connection automatically and will need the following config added:

```apacheconf
RewriteEngine on
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteRule /(.*) ws://localhost:9944/$1 [P,L]
RewriteRule /(.*) http://localhost:9944/$1 [P,L]
```

Optionally some form of rate limiting can be introduced: 


```bash
apt install libapache2-mod-qos
a2enmod qos
```

And edit `/etc/apache2/mods-available/qos.conf`

```conf
# allows max 50 connections from a single ip address:
QS_SrvMaxConnPerIP                                 50
```

## Connecting to the Node

Open [Polkadot-JS UI](https://polkadot.js.org/apps) and click the logo in the top left to switch the
node. Activate the "Development" toggle and input your node's address - either the domain or the IP
address. Remember to prefix with `wss://` and if you're using the 443 port, append `:443`, like so:
`wss://example.com:443`.

![A sync-in-progress chain connected to Polkadot-JS UI](../assets/maintain-wss-image.png)

Now you have a secure remote connect setup for your Substrate node.
