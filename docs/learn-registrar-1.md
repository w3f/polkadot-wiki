---
id: learn-registrar-1
title: Registrar #1 from Chevdor
sidebar_label: Using Registar #1 from Chevdor
---

## General infos

`Registrar #1` is operated by **Chevdor**. It is the first registrar that was active on Kusama and Polkadot and define the process used today by most registrars. It relies on an automatic BPM driven process allowing fast and reliable verifications. 

It is also available on Westend whether should you want to experiment.

The process is designed for verification accross timezones and allows multiple attempts spanning a maximum of 3 days. However, most of the verification are done within 15 minutes to 1 hour.

The `reg_index` for `Registrar #1` is:
- `1` for Kusama
- `1` for Polkadot
- `0` for Westend

> **Note**: The fee is not mentioned here since it is constantly changing. You can check it out on-chain and you will receive the details per email.

## Short version

- set your identity onchain, make sure to include an email
- check your email for details
- send a `identity`/ `requestJudgement` extrinsic from the PolkadotJS UI with `reg_index = 1`
- check your emails and follow the instructions

## Using `Registrar #1`
Using `Registrar #1` is very simple. It is also constantly being improved based on users' feedback so the content of this page is kept to a minimum as you will receive all the instructions per email.

> **Important**: The registrar will contact you using the communication channels that you set in your identity (email, twitter, matrix network). Any field you filled **must** be valid and you must be able to receive information through this channel. You will be instructed to follow [@chevdor](http://twitter.com/chevdor) on twitter if you set a twitter account in your identity so the bot can send you one message.

### Setting your identity

There is no problem if your identity does not meet the requirements. If your identity does not meet the requirements of `Registrar #1`, you will receive an email explaining what to do and how.

In general, you will be good if you:
- set a display name
- set an email

Adding any of the fields is in your favor so you probably should and `Registrar #1` prefers accounts having 2 communication channels.

> **Note**: You will neither need to cancel your request nor clear your identity at any step of the process.

### Requesting a judgement

`Registrar #1` makes it very fast and simple to get your identity verified. You can see the steps below. There is pretty much a single step: sending a `requestJudgement` extrinsic.

You can send this extrinsic using the PolkadotJS UI from the links below:

- [Kusama](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.polkadot.io#/extrinsics)
- [Polkadot](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/extrinsics)
- [Westend](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fwestend-rpc.polkadot.io#/extrinsics)

You can then proceed:

- select the account that will receive the judgement
- select `identity` / `requestJudgement` from the 2 dropdowns
- type in `1` in `reg_index``
- type the required fee in the `max_fee` field

> **Note**: Setting the `max_fee` is rather simple. Lower than the registrar's fee will fail when you send the extrinsic. Sending the exact value will work. Sending a **bigger** value will work as well but you will **only** be charged for the registrar's fee and get the change back.

### What happens then ?

A few seconds after you sent `requestJudgement`, you will receive more detailled instructions per email.

## Resources

You can read more about `Registrar #1` at http://www.chevdor.com/tags/registrar.

You can contact `@chevdor:matrix.org` using Element if you have any question, need help or guidance.
