---
id: maintain-validator
title: Node Operator / Validator
sidebar_label: Node Operator / Validator
---

Validators secure the relay chain by staking DOTs, validating proofs from collators and participating in consensus with other validators.

These participants will play a crucial role in adding new blocks to the Relay Chain and, by extension to all parachains, such that parties can complete cross-chain transactions via the Relay Chain. Validators perform two functions. First, verifying the information contained in an assigned set of parachain blocks is valid (such as the identities of the transacting parties and the subject matter of the contract). Their second role is to participate in the consensus mechanism to produce the Relay Chain blocks based on validity statements from other validators. Any instances of non-compliance with the consensus algorithms result in punishment by removal of some or all of the validator’s staked DOTs, thereby discouraging bad actors. Good performance, however, will be rewarded, with validators receiving transaction fees in the form of DOTs in exchange for their activities.

## Guides

- [How to validate on PoC-4](maintain-guides-how-to-validate) - Guide on how to set up a validator for PoC-4 and the Alexander testnet.
- [Validator Payout Overview](maintain-guides-validator-payout) - A short overview on how the validator payout mechanism works
- [How to run your validator as a systemd process](maintain-guides-how-to-systemd) - Guide on running your validator as a `systemd` process so that it will run in the background and start automatically on reboots.

## Other References

- [How to run a Polkadot node (Docker)](https://medium.com/@acvlls/setting-up-a-maintain-the-easy-way-3a885283091f)
- [A Serverless Failover Solution for Web3.0 Validator Nodes](https://hackernoon.com/a-serverless-failover-solution-for-web-3-0-validator-nodes-e26b9d24c71d) - Blog that details how to create a robust failover solution for running validators.
- [Getting Testnet DOTs](learn-DOT#getting-testnet-dots)
- [VPS list](maintain-guides-how-to-validate#vps-list)
- [Polkadot Validator Lounge](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) - A place to chat about being a validator.

## Security / Key Management

- [Validator Security Overview](https://github.com/w3f/validator-security)

## Monitoring Tools

- [Polkadot Telemetry Service](https://telemetry.polkadot.io/#/Alexander) - Network information including what nodes are running your chain, what software versions they are running, and sync status.
- [Polkadash](http://polkadash.io/) - Validator monitor
- [Other Useful Links](https://forum.web3.foundation/t/useful-links-for-validators/20)
