---
id: maintain-wss
title: 设置安全远程 WebSocket 连接
sidebar_label: 设置安全远程 WebSocket 连接
---

您可能想要在服务器上设置节点，然后从另一个服务器上的用户界面连接。例如 [PolakdotJS UI](https://polkadot.js.org/apps)。 除非您为 websocket 连接设置一个安全的代理服务器，否则这是不可行。 让我们看看如何在 Substrate 节点上设置 WSS 。

_注意：**仅应**将同步节点用作某些 dapp 或项目的后端，才能执行此操作。 永远不要打开您的验证人节点 websockets - 并且没有理由这样做，这只会导致安全问题！_

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

第一个方法是获取一个专用域名，将其命名并导向到您的 IP 地址。 为此域设置Nginx服务器，最后 [遵循Nginx设置的 LetsEncrypt 指令](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx.html) 。 这将自动生成一个 SSL 证书，并将其包含在您的 Nginx 配置中。 这将让您将 PolkadotJS 用户界面连接到 mynode.mydomain.com 等网址，而不是82 196.8192:9944，这可能更方便用户。

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
- `CERT_LOCATION_KEY` 如果您使用 Certbot，应该是 `/etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem;` 或 `/etc/ssl/private/nginx-selfsigned.key` 如果您是自签名的话。
- `CERT_DHPARAM` 如果您使用 Certbot， 应该是 `/etc/letsencrypt/ssl-dhparams.pem` ，如果您是自签名，应该是 `/etc/ssl/certs/dhparam.pem` 。

_请注意如果您使用 Certbot ，它应该在下面为您插入路径，如果您遵循 [官方指示](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx.html)_

```conf
server {

        server_name SERVER_ADDRESS;

        root /var/www/node;
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

## 连接节点

打开 [PolkadotJS UI](https://polkadot.js.org/apps) 并点击左上方的 logo 切换节点。 选择 "Custom Endpoint" 切换并输入您的节点地址 - 或者是域名或IP地址。 记得在前缀使用 `wss://`！

![A sync-in-progress chain connected to Polkadot UI](/img/wss/wss01.jpg)

恭喜-您已经为您的 Substrate 节点设置了安全的远程连接。
