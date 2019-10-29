---
id: maintain-guides-how-to-upgrade
title: How to Upgrade Your Validator
sidebar_label: How to Upgrade Your Validator
---

Validators perform critical functions for the network, and as such, have strict uptime requirements. Validators may have to go offline for periods of time to upgrade the client software or the host machine. This guide will walk you through upgrading your machine and keeping your validator online.

The process will take several hours, so make sure you understand the instructions first and plan accordingly.

## Key Components

### Session Keys

Session keys are stored in the client and used to sign validator operations. They are what link your validator node to your Controller account. You cannot change them mid-Session.

[More info about keys in Polkadot.](learn-keys)

### Database

Validators keep a database with all of their votes. If you start another machine with a validator on it, it is important to sync the database with your other machine or you risk equivocating.

[More info about equivocation.](learn-staking#slashing)

## Steps

You will need to start a second validator to operate while you upgrade your primary. Throughout these steps, we will refer to the validator that you are upgrading as "Validator A" and the second one as "Validator B."

### Session `N`

1. Start a second node and connect it to your sentry nodes. Ideally, you use the same database as Validator A. Once it is synced, use the `--validator` flag. This is "Validator B."
1. Generate Session keys in Validator B.
1. Submit a `set_key` extrinsic from your Controller account with your new Session keys.
1. Take note of the Session that this extrinsic was executed in.

It is imperitive that your Validator A keep running in this Session. `set_key` only takes effect in the next Session.

### Session `N+1`

Validator B is now acting as your validator. You can safely take Validator A offline.

1. Stop Validator A.
1. Perform your system or client upgrade.
1. Start Validator A, sync the database, and connect it to your sentry nodes. Again, it is ideal to keep using the same database.
1. Generate new Session keys in Validator A.
1. Submit a `set_key` extrinsic from your Controller account with your new Session keys for Validator A.
1. Take note of the Session that this extrinsic was executed in.

Again, it is imperitive that Validator B keep running until the end of this Session.

Once the Session changes, Validator A will take over. You can safely stop Validator B.
