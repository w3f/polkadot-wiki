---
id: maintain-guides-how-to-systemd
title: Using systemd for the Validator Node
sidebar_label: Using systemd for the Validator Node
---

You can run your validator as a [systemd](https://en.wikipedia.org/wiki/Systemd) process so that it will automatically restart on server reboots or crashes (and helps to avoid getting slashed!).

Before following this guide you should have already set up your validator by following the [How to validate](maintain-validator) article.

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

You can check that it's working with:

```bash
systemctl status polkadot-validator.service
```

You can tail the logs with `journalctl` like so:

```bash
journalctl -f -u polkadot-validator
```

## Wireguard systemd configuration

You can automatically restart your VPN tunnel between your validator and its sentries using the configuration you have already created in the [Set Up a Sentry Node - Public Node](maintain-guides-how-to-setup-sentry-node) guide.

Create a file called `wireguard.service` in `/etc/systemd/system`.

```bash
touch /etc/systemd/system/wireguard.service
```

Write the commands needed to auto-start wireguard previously configured as `wg0` into the `wgo.conf` file in the `/etc/wireguard/` directory.

```
[Unit]
Description=Wireguard VPN

[Service]
Type=forking
ExecStart=PATH_TO_WG-QUICK_BIN up wg0

Restart=always

[Install]
WantedBy=multi-user.target
```

The path to the wg-quick binary on Debian based distributions is usually: `/usr/bin/wg-quick`. If in doubt, run `whereis wg-quick`. To enable this to autostart on boot:

```bash
systemctl enable wireguard.service
```

Start it manually with:

```bash
systemctl start wireguard.service
```

You can check that it's working with:

```bash
systemctl status wireguard.service
```

You can tail the logs with journalctl like so:

```bash
journalctl -f -u wireguard
```
