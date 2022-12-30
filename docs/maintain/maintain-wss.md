---
id: maintain-wss
title: Secure WebSocket
sidebar_label: Secure WebSocket
description: Steps on setting up a secure socket for remote connections.
keywords: [web socket, remote, connection, secure websocket]
slug: ../maintain-wss
---

A websocket provides access to the RPC server part of a substrate node, which can be used as a way
to access the underlying network and/or validator node. By default you can access your node's RPC
server from localhost (for example to rotate keys or do other maintenance) but to access it from
from another server or from an applications UI (such as [Polkadot-JS UI](https://polkadot.js.org/apps)),
you will need to enable a secure proxy for the 
websocket connection.

:::note Enabling remote access to your validator node should not be necessary and is not
suggested as it can often lead to security problems :::

## Set up a node

Setting up any Substrate-based node relies on a similar process.  For example, they will all by default share the same websocket connection at port 9944 on localhost.
In this example, we'll set up a Kusama sync node on a debian flavoured server (such as Ubuntu 22.04). Create a new server on your provider of choice or locally at home. See
[Set up a Full Node](./maintain-sync) for additional instructions. You can choose to install from the default
apt repository or build from scratch. The startup options  in the setup process provide a variety of 
different settings that can be modified.

A typically setting for an externally accessible kusama archive RPC node would be:

```config
polkadot --chain kusama --name myrpc --state-pruning archive --blocks-pruning archive --ws-max-connections 100 --rpc-cors all --rpc-methods Safe --ws-port 9944
```

Or for a kusama pruned RPC node:

```config
polkadot --chain kusama --name myrpc --state-pruning 1000 --blocks-pruning archive --ws-max-connections 100 --rpc-cors all --rpc-methods Safe --ws-port 9944
```

The specified flag option are outlined in greater detail below.

### Archive Node vs Pruned Node

A pruned node only tracks more recent information about the network and not its full history. Most
frequently required actions can be completed with a pruned node, such as displaying account balances, making
transfers, setting up session keys, staking, etc. An archive node has the full history (database) of the
network and can be queried in all kind of ways, such as providing historical information regarding transfers, balance histories, and more advanced queries involving past events, etc.

An archive node requires a lot more diskspace ([overview](https://stakeworld.io/snapshot)). For an
archive node you need the options `--state-pruning archive --blocks-pruning archive` in your startup
settings.

:::tip Inclusion in the Polkadot.js UI requires an archive node. :::

### Secure the RPC server

The node startup settings allow you to choose **what** to expose, **how many** connections to expose and **from
where** access should be granted through the rpc server.

_How many_: You can set your maximum connections through `--ws-max-connections`, for example
`--ws-max-connections 100`

_From where_: by default localhost and the polkadot.js are allowed to access the RPC server, you can
change this by setting `--rpc-cors`, to allow access from everywhere you need `--rpc-cors all`

_What_: you can limit the methods to use with `--rpc-methods`, an easy way to set this to a safe
mode is `--rpc-methods Safe`

## Secure the ws port

A non secure ws port can be converted to a secure wss port by placing it behind an SSL
enabled proxy. The SSL enabled apache2/nginx/other proxy server is not externally visible, which
redirects requests to the internal rpc node. For this you will need an SSL certificate. There are
different strategies for obtaining a cert, such as using a service like letsencrypt or self signing.

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

### Nginx

```
apt install nginx
```

The server block below is all you need, but keep in mind that you need to replace some placeholder
values. Notably:

- `SERVER_ADDRESS` should be replaced by your domain name if you have it, or your server's IP
  address if not.
- `CERT_LOCATION` should be `/etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem` if you used Certbot,
  or `/etc/ssl/certs/selfsigned.crt` if self-signed.
- `CERT_LOCATION_KEY` should be `/etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem` if you used Certbot,
  or `/etc/ssl/private/selfsigned.key` if self-signed.
- `CERT_DHPARAM` should be `/etc/letsencrypt/ssl-dhparams.pem` if you used Certbot, and
  `/etc/ssl/certs/dhparam.pem` if self-signed.

_Note that if you used Certbot, it should have made the path insertions below for you if you
followed the [official instructions](https://certbot.eff.org/instructions?ws=nginx&os=ubuntubionic)_

```conf
server {

        server_name SERVER_ADDRESS;

        root /var/www/html;
        index index.html;

        location / {
          try_files $uri $uri/ =404;

          proxy_buffering off;
          proxy_pass http://localhost:9944;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "upgrade";
        }

        listen [::]:443 ssl ipv6only=on;
        listen 443 ssl;
        ssl_certificate CERT_LOCATION;
        ssl_certificate_key CERT_LOCATION_KEY;

        ssl_session_cache shared:cache_nginx_SSL:1m;
        ssl_session_timeout 1440m;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        ssl_ciphers "ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS";

        ssl_dhparam CERT_DHPARAM;

}
```

### Apache2

Apache2 is slightly more computationally intensive when compared to nginx but also provides more configurable options. You can run it in different modes such as prefork, worker or event. In this example, we use
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
SSLProxyEngine on
ProxyRequests off

ProxyPass / ws://localhost:9944
ProxyPassReverse / ws://localhost:9944
```

## Connecting to the Node

Open [Polkadot-JS UI](https://polkadot.js.org/apps) and click the logo in the top left to switch the
node. Activate the "Development" toggle and input your node's address - either the domain or the IP
address. Remember to prefix with `wss://` and if you're using the 443 port, append `:443`, like so:
`wss://example.com:443`.

![A sync-in-progress chain connected to Polkadot-JS UI](../assets/maintain-wss-image.png)

Now you have a secure remote connect setup for your Substrate node.
