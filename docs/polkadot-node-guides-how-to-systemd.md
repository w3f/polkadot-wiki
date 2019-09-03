---
id: polkadot-node-guides-how-to-systemd
title: How to run your node as a `systemd` process
sidebar_label: How to run your node as a `systemd` process
---

You can run your validator as a [systemd](https://en.wikipedia.org/wiki/Systemd) process so that it will automatically restart on server reboots or crashes (and helps to avoid getting slashed!).

Before following this guide you should have already set up your validator by following the [How to validate](polkadot-node-guides-how-to-validate) article.

First create a new unit file called `polkadot-validator.service` in `/etc/systemd/system/`.

```bash
touch /etc/systemd/system/polkadot-validator.service
```

In this unit file you will write the commands that you want to run on server boot / restart.

```
[Unit]
Description=Polkadot Validator

[Service]
ExecStart=PATH_TO_POLKADOT_BIN --validator --key YOUR_SEED --name SHOW_ON_TELEMETRY
Restart=always

[Install]
WantedBy=multi-user.target
```

To enable this to autostart on bootup run:

```bash
systemctl enable polkadot-validator.service
```

Start it manually with:

```bash
systemctl start polkadot-validator.service
```

You can check it's working with:

```bash
systemctl status polkadot-validator.service
```

You can tail the logs with `journalctl` like so:

```bash
journalctl -f -u polkadot-validator
```
