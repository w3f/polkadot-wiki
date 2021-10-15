---
id: build-ss58-registry
title: SS58 Registry
sidebar_label: SS58 Registry
description: Information about SS58 encoding.
slug: ../build-ss58-registry
---

Substrate-based chains, including the Polkadot and Kusama relay chains, use an
[SS58 encoding](<https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58)>) for
their address formats. This page serves as a registry for teams to see which chain corresponds to a
given prefix, and which prefixes are available.

| Prefix | Network               | Name                                                  | Symbols                                   | Decimals               | Standard Account | Website                       |
| ------ | --------------------- | ----------------------------------------------------- | ----------------------------------------- | ---------------------- | ---------------- | ----------------------------- |
| 0      | polkadot              | Polkadot Relay Chain                                  | DOT                                       | 10                     | \*25519          | https://polkadot.network      |
| 1      | null                  | Bare 32-bit Schnorr/Ristretto (S/R 25519) public key. | null                                      | null                   | null             | null                          |
| 2      | kusama                | Kusama Relay Chain                                    | KSM                                       | 12                     | \*25519          | https://kusama.network        |
| 3      | null                  | Bare 32-bit Ed25519 public key.                       | null                                      | null                   | null             | null                          |
| 4      | katalchain            | Katal Chain                                           | null                                      | null                   | \*25519          | null                          |
| 5      | plasm                 | Plasm Network                                         | PLM                                       | 15                     | \*25519          | https://plasmnet.io           |
| 6      | bifrost               | Bifrost                                               | BNC                                       | 12                     | \*25519          | https://bifrost.finance/      |
| 7      | edgeware              | Edgeware                                              | EDG                                       | 18                     | \*25519          | https://edgewa.re             |
| 8      | karura                | Karura                                                | KAR                                       | 12                     | \*25519          | https://karura.network/       |
| 9      | reynolds              | Laminar Reynolds Canary                               | REY                                       | 18                     | \*25519          | http://laminar.network/       |
| 10     | acala                 | Acala                                                 | ACA                                       | 12                     | \*25519          | https://acala.network/        |
| 11     | laminar               | Laminar                                               | LAMI                                      | 18                     | \*25519          | http://laminar.network/       |
| 12     | polymesh              | Polymesh                                              | POLYX                                     | 6                      | \*25519          | https://polymath.network/     |
| 13     | substratee            | SubstraTEE                                            | null                                      | null                   | \*25519          | https://www.substratee.com    |
| 14     | totem                 | Totem                                                 | XTX                                       | 0                      | \*25519          | https://totemaccounting.com   |
| 15     | synesthesia           | Synesthesia                                           | SYN                                       | 12                     | \*25519          | https://synesthesia.network/  |
| 16     | kulupu                | Kulupu                                                | KLP                                       | 12                     | \*25519          | https://kulupu.network/       |
| 17     | dark                  | Dark Mainnet                                          | null                                      | null                   | \*25519          | null                          |
| 18     | darwinia              | Darwinia Network                                      | RING, KTON                                | 9, 9                   | \*25519          | https://darwinia.network/     |
| 19     | geek                  | GeekCash                                              | GEEK                                      | 12                     | \*25519          | https://geekcash.org          |
| 20     | stafi                 | Stafi                                                 | FIS                                       | 12                     | \*25519          | https://stafi.io              |
| 21     | dock-testnet          | Dock Testnet                                          | DCK                                       | 6                      | \*25519          | https://dock.io               |
| 22     | dock-mainnet          | Dock Mainnet                                          | DCK                                       | 6                      | \*25519          | https://dock.io               |
| 23     | shift                 | ShiftNrg                                              | null                                      | null                   | \*25519          | null                          |
| 24     | zero                  | ZERO                                                  | PLAY                                      | 18                     | \*25519          | https://zero.io               |
| 25     | zero-alphaville       | ZERO Alphaville                                       | PLAY                                      | 18                     | \*25519          | https://zero.io               |
| 26     | jupiter               | Jupiter                                               | jDOT                                      | 10                     | \*25519          | https://jupiter.patract.io    |
| 28     | subsocial             | Subsocial                                             | null                                      | null                   | \*25519          | null                          |
| 29     | cord                  | Dhiway CORD Network                                   | DCU                                       | 18                     | \*25519          | https://dhiway.com/           |
| 30     | phala                 | Phala Network                                         | PHA                                       | 12                     | \*25519          | https://phala.network         |
| 31     | litentry              | Litentry Network                                      | LIT                                       | 12                     | \*25519          | https://litentry.com/         |
| 32     | robonomics            | Robonomics                                            | XRT                                       | 9                      | \*25519          | https://robonomics.network    |
| 33     | datahighway           | DataHighway                                           | null                                      | null                   | \*25519          | null                          |
| 34     | ares                  | Ares Protocol                                         | ARES                                      | 12                     | \*25519          | https://www.aresprotocol.com/ |
| 35     | vln                   | Valiu Liquidity Network                               | USDv                                      | 15                     | \*25519          | https://valiu.com/            |
| 36     | centrifuge            | Centrifuge Chain                                      | CFG                                       | 18                     | \*25519          | https://centrifuge.io/        |
| 37     | nodle                 | Nodle Chain                                           | NODL                                      | 18                     | \*25519          | https://nodle.io/             |
| 38     | kilt                  | KILT Chain                                            | KILT                                      | 18                     | \*25519          | https://kilt.io/              |
| 39     | mathchain             | MathChain mainnet                                     | MATH                                      | 18                     | \*25519          | https://mathwallet.org        |
| 40     | mathchain-testnet     | MathChain testnet                                     | MATH                                      | 18                     | \*25519          | https://mathwallet.org        |
| 41     | poli                  | Polimec Chain                                         | null                                      | null                   | \*25519          | https://polimec.io/           |
| 42     | substrate             | Substrate                                             | null                                      | null                   | \*25519          | https://substrate.dev/        |
| 43     | null                  | Bare 32-bit ECDSA SECP-256k1 public key.              | null                                      | null                   | null             | null                          |
| 44     | chainx                | ChainX                                                | PCX                                       | 8                      | \*25519          | https://chainx.org/           |
| 45     | uniarts               | UniArts Network                                       | UART, UINK                                | 12, 12                 | \*25519          | https://uniarts.me            |
| 46     | reserved46            | This prefix is reserved.                              | null                                      | null                   | null             | null                          |
| 47     | reserved47            | This prefix is reserved.                              | null                                      | null                   | null             | null                          |
| 48     | neatcoin              | Neatcoin Mainnet                                      | NEAT                                      | 12                     | \*25519          | https://neatcoin.org          |
| 63     | hydradx               | HydraDX                                               | HDX                                       | 12                     | \*25519          | https://hydradx.io            |
| 65     | aventus               | AvN Mainnet                                           | AVT                                       | 18                     | \*25519          | https://aventus.io            |
| 66     | crust                 | Crust Network                                         | CRU                                       | 12                     | \*25519          | https://crust.network         |
| 67     | equilibrium           | Equilibrium Network                                   | Unknown, USD, EQ, ETH, BTC, EOS, DOT, CRV | 0, 9, 9, 9, 9, 9, 9, 9 | \*25519          | https://equilibrium.io        |
| 69     | sora                  | SORA Network                                          | XOR                                       | 18                     | \*25519          | https://sora.org              |
| 73     | zeitgeist             | Zeitgeist                                             | ZTG                                       | 10                     | \*25519          | https://zeitgeist.pm          |
| 77     | manta                 | Manta network                                         | MA                                        | 12                     | \*25519          | https://manta.network         |
| 78     | calamari              | Calamari: Manta Canary Network                        | KMA                                       | 12                     | \*25519          | https://manta.network         |
| 98     | polkasmith            | PolkaSmith Canary Network                             | PKS                                       | 18                     | \*25519          | https://polkafoundry.com      |
| 99     | polkafoundry          | PolkaFoundry Network                                  | PKF                                       | 18                     | \*25519          | https://polkafoundry.com      |
| 101    | origintrail-parachain | OriginTrail Parachain                                 | TRAC                                      | 18                     | secp256k1        | https://origintrail.io        |
| 110    | heiko                 | Heiko                                                 | HKO                                       | 12                     | \*25519          | https://parallel.fi/          |
| 136    | altair                | Altair                                                | AIR                                       | 18                     | \*25519          | https://centrifuge.io/        |
| 172    | parallel              | Parallel                                              | PARA                                      | 12                     | \*25519          | https://parallel.fi/          |
| 252    | social-network        | Social Network                                        | NET                                       | 18                     | \*25519          | https://social.network        |
| 1284   | moonbeam              | Moonbeam                                              | GLMR                                      | 18                     | secp256k1        | https://moonbeam.network      |
| 1285   | moonriver             | Moonriver                                             | MOVR                                      | 18                     | secp256k1        | https://moonbeam.network      |
| 10041  | basilisk              | Basilisk                                              | BSX                                       | 12                     | \*25519          | https://bsx.fi                |
