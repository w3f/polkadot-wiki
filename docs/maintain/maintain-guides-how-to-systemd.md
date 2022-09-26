---
id: maintain-guides-how-to-systemd
title: Using systemd for a Validator Node
sidebar_label: Using systemd for a Validator Node
description: Using a service manager for your validator node.
keywords: [systemd, validate, node]
slug: ../maintain-guides-how-to-systemd
---

You can run your validator as a [systemd](https://en.wikipedia.org/wiki/Systemd) process so that it
will automatically restart on server reboots or crashes (and helps to avoid getting slashed!).

Before following this guide you should have already set up your validator by following the
[How to validate](../learn/learn-validator.md) article.

First create a new unit file called `polkadot-validator.service` in `/etc/systemd/system/`.

```bash
touch /etc/systemd/system/polkadot-validator.service
```

In this unit file you will write the commands that you want to run on server boot / restart.

```
[Unit]
Description=Polkadot Validator

[Service]
ExecStart=PATH_TO_POLKADOT_BIN --validator --name SHOW_ON_TELEMETRY
Restart=always
RestartSec=120

[Install]
WantedBy=multi-user.target
```

:::warning

It is recommended to delay the restart of a node with `RestartSec` in the case of node crashes. It's
possible that when a node crashes, consensus votes in GRANDPA aren't persisted to disk. In this
case, there is potential to equivocate when immediately restarting. What can happen is the node will
not recognize votes that didn't make it to disk, and will then cast conflicting votes. Delaying the
restart will allow the network to progress past potentially conflicting votes, at which point other
nodes will not accept them.

:::

To enable this to autostart on bootup run:

```bash
systemctl enable polkadot-validator.service
```

Start it manually with:

```bash
systemctl start polkadot-validator.service
```

You can check that it's working with:

```bash
systemctl status polkadot-validator.service
```

You can tail the logs with `journalctl` like so:

```bash
journalctl -f -u polkadot-validator
```
