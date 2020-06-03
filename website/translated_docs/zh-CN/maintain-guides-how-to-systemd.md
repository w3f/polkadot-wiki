---
id: maintain-guides-how-to-systemd
title: 如何把节点设定为 `systemd` 进程运行
sidebar_label: 如何把节点设定为 `systemd` 进程运行
---

您可以将验证人作为[ systemd ](https://en.wikipedia.org/wiki/Systemd)进程运行，以便服务器重新启动或當意外时自动重启(并有助于避免被惩罚!)。

在看本指南之前，您应该已经按照以下步骤设置了验证人 [如何验证](maintain-validator)文章。

首先在 `/etc/systemd/system/` 中创建名为 `polkadot-validator.service` 的文件。

```bash
touch /etc/systemd/system/polkadot-validator.service
```

在这个文件中，你会写下你想要在服务器启动/重新启动时运行的命令。

```
[Unit]
Description=Polkadot Validator

[Service]
ExecStart=PATH_TO_POLKADOT_BIN --validator --name SHOW_ON_TELEMETRY
Restart=always

[Install]
WantedBy=multi-user.target
```

要自动启动此功能时:

```bash
systemctl enable polkadot-validator.service
```

手动启动:

```bash
systemctl start polkadot-validator.service
```

您可以检查它是否运作中:

```bash
systemctl status polkadot-validator.service
```

您可以查看日志 `journalctl`：

```bash
journalctl -f -u polkadot-validator
```
