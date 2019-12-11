---
id: maintain-validator
title: Validator
sidebar_label: Validator
---

Validators secure the relay chain by staking DOTs, validating proofs from collators and participating in consensus with other validators.

These participants will play a crucial role in adding new blocks to the Relay Chain and, by extension, to all parachains. This allows parties to complete cross-chain transactions via the Relay Chain.

Validators perform two functions. First, verifying that the information contained in an assigned set of parachain blocks is valid (such as the identities of the transacting parties and the subject matter of the contract). Their second role is to participate in the consensus mechanism to produce the Relay Chain blocks based on validity statements from other validators. Any instances of non-compliance with the consensus algorithms result in punishment by removal of some or all of the validator’s staked DOTs, thereby discouraging bad actors. Good performance, however, will be rewarded, with validators receiving block rewards (including transaction fees) in the form of DOTs in exchange for their activities.

## Guides

- [How to Validate on Alexander](maintain-guides-how-to-validate-alexander) - Guide on how to set up a validator on the Alexander testnet.
- [How to Validate on Kusama](maintain-guides-how-to-validate-kusama) - Guide on how to set up a validator on the Kusama canary network.
- [Validator Payout Overview](maintain-guides-validator-payout) - A short overview on how the validator payout mechanism works.
- [How to run your validator as a systemd process](maintain-guides-how-to-systemd) - Guide on running your validator as a `systemd` process so that it will run in the background and start automatically on reboots.
- [How to Upgrade your Validator](maintain-guides-how-to-upgrade) - Guide for securely upgrading your validator when you want to switch to a different machine or begin running the latest version of client code.
- [How to Set up a Sentry Node](maintain-guides-how-to-setup-sentry-node) - Guide for setting up a sentry node for your validator.
- [How to Use Secure Validator Setup](maintain-guides-how-to-use-polkadot-secure-validator) - Guide on how to use Polkadot / Kusama secure validator setup.

## Other References

- [How to run a Polkadot node (Docker)](https://medium.com/@acvlls/setting-up-a-maintain-the-easy-way-3a885283091f)
- [A Serverless Failover Solution for Web3.0 Validator Nodes](https://medium.com/hackernoon/a-serverless-failover-solution-for-web-3-0-validator-nodes-e26b9d24c71d) - Blog that details how to create a robust failover solution for running validators.
- [Getting Testnet DOTs](learn-DOT#getting-testnet-dots)
- [VPS list](maintain-guides-how-to-validate-kusama#vps-list)
- [Polkadot Validator Lounge](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) - A place to chat about being a validator.
- [Slashing Consequences](https://wiki.polkadot.network/docs/en/learn-staking#slashing) - Learn more about slashing consequences for running a validator node.

## Security / Key Management

- [Validator Security Overview](https://github.com/w3f/validator-security)

## Monitoring Tools

- [Polkadot Telemetry Service](https://telemetry.polkadot.io/#/Alexander) - Network information, including what nodes are running on a given chain, what software versions they are running, and sync status.
- [Polkadash](http://polkadash.io/) - Validator monitor.
- [Other Useful Links](https://forum.web3.foundation/t/useful-links-for-validators/20)
