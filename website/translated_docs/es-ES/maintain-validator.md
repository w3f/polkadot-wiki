---
id: maintain-validator
title: Validator
sidebar_label: Validator
---

Los validadores aseguran la relay chain mediante la vinculación de DOTs, validando las pruebas de los collators y participando en consenso con otros validadores.

These participants will play a crucial role in adding new blocks to the Relay Chain and, by extension, to all parachains.  This allows parties to complete cross-chain transactions via the Relay Chain.

Validators perform two functions. First, verifying that the information contained in an assigned set of parachain blocks is valid (such as the identities of the transacting parties and the subject matter of the contract). Their second role is to participate in the consensus mechanism to produce the Relay Chain blocks based on validity statements from other validators. Any instances of non-compliance with the consensus algorithms result in punishment by removal of some or all of the validator’s staked DOTs, thereby discouraging bad actors. Good performance, however, will be rewarded, with validators receiving block rewards (including transaction fees) in the form of DOTs in exchange for their activities.

## Guías

- [How to Validate on Alexander](maintain-guides-how-to-validate-alexander) - Guide on how to set up a validator on the Alexander testnet.
- [How to Validate on Kusama](maintain-guides-how-to-validate-kusama) - Guide on how to set up a validator on the Kusama canary network.
- [Validator Payout Overview](maintain-guides-validator-payout) - A short overview on how the validator payout mechanism works.
- [How to run your validator as a systemd process](maintain-guides-how-to-systemd) - Guide on running your validator as a `systemd` process so that it will run in the background and start automatically on reboots.

## Otras referencias

- [Cómo ejecutar un nodo Polkadot (Docker)](https://medium.com/@acvlls/setting-up-a-maintain-the-easy-way-3a885283091f)
- [A Serverless Failover Solution for Web3.0 Validator Nodes](https://hackernoon.com/a-serverless-failover-solution-for-web-3-0-validator-nodes-e26b9d24c71d) - Blog que detalla cómo crear una solución robusta de tolerancia a errores para validadores en funcionamiento.
- [Obteniendo DOTs de la Testnet](learn-DOT#getting-testnet-dots)
- [Lista de VPS](maintain-guides-how-to-validate-kusama#vps-list)
- [Polkadot Validator Lounge](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) - Un lugar para conversar sobre ser un validador.

## Seguridad / Gestión de claves

- [Vista general de seguridad del validador](https://github.com/w3f/validator-security)

## Herramientas para la monitorización

- [Polkadot Telemetry Service](https://telemetry.polkadot.io/#/Alexander) - Network information, including what nodes are running on a given chain, what software versions they are running, and sync status.
- [Polkadash](http://polkadash.io/) - Validator monitor.
- [Otros enlaces útiles](https://forum.web3.foundation/t/useful-links-for-validators/20)
