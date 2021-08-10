---
id: maintain-wss
title: 设置安全远程 WebSocket 连接
sidebar_label: 设置安全远程 WebSocket 连接
---

You might want to host a node on one server and then connect to it from a UI hosted on another, e.g. [Polkadot-JS UI](https://polkadot.js.org/apps). This will not be possible unless you set up a secure proxy for websocket connections. Let's see how we can set up WSS on a remote Substrate node.

_Note: this should **only** be done for sync nodes used as back-end for some dapps or projects. Never open websockets to your validator node - there's no reason to do that and it can only lead to security gaffes._

在本指南中，我们将使用在 $10 DigitalOcean 上的 Ubuntu 18.04。 我们将假定你正在使用类似的操作系统，并且你已经安装 nginx (如果没有，运行 `sudo apt-get install nginx`)。

## 设置节点

不论是个通用的 Substrate ，Kusama 节点，还是你自己的私有链，他们都默认使用相同的 websocket 连接: 本地主机上的 9944 端口。对于这个示例，我们会设置个 Kusama 同步节点(非验证人)。

在您服务商选创建务器提或在本地创建 (首选)。 假设您正在使用 Ubuntu 18.04。然后安装 Substrate 并构建节点。

```bash
curl https://getsubstrate.io -sSf | bash
git clone https://github.com/paritytech/polkadot kusama
cd kusama
./scripts/init.sh
cargo build --release
./target/release/polkadot --name "DigitalOcean 10 USD droplet ftw" --rpc-cors all
```

这将启动与 Kusama 主网的同步过程。

_注意：需要使用 `--rpc-cors` 模式以便允许所有外部连接。_

## 设置证书

要获取 WSS (secure websocket), 您需要 SSL 证书。有两种可能的方法。

### 域名和 Certbot

The first approach is getting a dedicated domain, redirecting its nameservers to your IP address, setting up an Nginx server for that domain, and finally [following LetsEncrypt instructions](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx.html) for Nginx setup. This will auto-generate an SSL certificate and include it in your Nginx configuration. This will let you connect Polkadot-JS UI to a URL like mynode.mydomain.com rather than 82.196.8.192:9944, which is arguably more user friendly.

对于云端托管服服务商或如果您有静态 IP，这样做很简单， 但在您的家服务器运行时更难。

### 自签名

第二种方法和我们在这里将遵循的方法是生成一个自签名的证书，并且在连接到您的节点时靠您的原本 IP 地址。

生成一个自签名的证书

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

## 设置 Nginx 服务器

现在是告诉 Nginx 使用这些证书的时候了。 下面的服务器设置是您所需要的，但牢记您需要替换一些数值。请注意：

- `SERVER_ADDRESS` 如果你有域名，应该替换成你的域名，或者你的服务器的 IP 地址。
- `CERT_LOCATION` 如果您使用 Certbot，应该是 `/etc/letsensencrypt/live/YOUR_DOMAIN/fullchain.pem` 或者 `/etc/ssl/certs/nginx-selfsigned.crt` 如果是自签名。
- `CERT_LOCATION_KEY` should be `/etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem` if you used Certbot, or `/etc/ssl/private/nginx-selfsigned.key` if self-signed.
- `CERT_DHPARAM` 如果您使用 Certbot， 应该是 `/etc/letsencrypt/ssl-dhparams.pem` ，如果您是自签名，应该是 `/etc/ssl/certs/dhparam.pem` 。

_请注意如果您使用 Certbot ，它应该在下面为您插入路径，如果您遵循 [官方指示](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx.html)_

```conf
server {

        server_name SERVER_ADDRESS;

        root /var/www/html;
        index index.html;

        location / {
          try_files $uri $uri/ =404;

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

设置后重启 nginx: `sudo service nginx restart`。

## Importing the Certificate

If you used the self-signed certificate approach, modern browsers will not let you connect to this websocket endpoint without that certificate being imported - they will emit an `NET:ERR_CERT_AUTHORITY_INVALID` message.

![ERR_CERT_AUTHORITY_INVALID](/img/wss/wss04.png)

Every websocket connection bootstraps itself with `https` first, so to allow the certificate, visit the IP of your machine in the browser prefixed with `https`, like so: `https://MY_IP`. This should produce a "Not private" warning which you can skip by going to "Advanced" and the clicking on "Proceed to Site". You have now whitelisted this IP and its self-signed certificate for connecting.

## Connecting to the node

Open [Polkadot-JS UI](https://polkadot.js.org/apps) and click the logo in the top left to switch the node. Activate the "Development" toggle and input your node's address - either the domain or the IP address. Remember to prefix with `wss://`.

![A sync-in-progress chain connected to Polkadot-JS UI](assets/maintain-wss-image.png)

Now you have a secure remote connect setup for your Substrate node.
