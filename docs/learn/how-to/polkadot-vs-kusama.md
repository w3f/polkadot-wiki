---
title: Polkadot and Kusama — What's the Difference?
description: "A side-by-side comparison of the Polkadot and Kusama networks."
---

!!!info "Related concepts"
    For the underlying concepts, see [Kusama Comparison](../learn-comparisons-kusama.md).

Kusama and Polkadot are independent, standalone networks built on similar codebases but with different priorities. Kusama is wild and fast; great for bold experimentation and early-stage deployment. Polkadot is more conservative, prioritizing stability and dependability.

* * *


### What the two networks have in common

Kusama was released as an early version of the same code to be used in Polkadot, which means they share the same underlying architecture.

Both Polkadot and Kusama have:

  * Nominated Proof of Stake (NPoS) system.

  * Rollups (parachains) connected to the Relay chain.

  * Rollups communicating with each other and with the Relay chain via [XCM](../learn-architecture.md#xcm).
  * Forkless upgrades that don't require validators to upgrade in advance.
  * On-chain governance that gives every DOT or KSM owner a say in how the network will change.

### Key differences

!!! info

    The information below refers to Polkadot Asset Hub and Kusama Asset Hub unless otherwise specified.

| **POLKADOT** | **KUSAMA** |
|---|---|
| High security | Low barriers to entry for parachain deployment |
| High stability | Low bond requirements for validators and parachains |
| More conservative governance and upgrade | Latest technology |
| High validator rewards | Low slashing penalties |
|  | Fast iteration |
| Existential deposit: 0.01 DOT ([Sufficient assets](existential-deposit.md), like USDC or ETH, might contribute toward the existential deposit) | Existential deposit: 0.000003333333 KSM ([Sufficient assets](existential-deposit.md), like USDC or ETH, might contribute toward the existential deposit) |
| **Staking** |  |
| Minimum stake: 250 DOT | Minimum stake: 0.1 KSM |
| Unbonding and slash defer: 28 days | Unbonding and slash defer: 7 days |
| Era: 24 hours, Epoch: 4 hours | Era: 6 hours, Epoch: 1 hour |
| **Crowdloans** |  |
| Deprecated in favor of Agile Coretime | Deprecated in favor of Agile Coretime |
| **Proxies** |  |
| Deposit base: 0.2004 DOT<br>Additional deposit per proxy: 0.00033 DOT | Deposit base: 0.00667999998 KSM<br>Add. deposit per proxy: 0.000010999989 KSM |
| **Identity** |  |
| On People parachain:<br>Deposit base: 0.20017 DOT<br>Per encoded byte of information: 0.00001 DOT | On People parachain:<br>Deposit base: 0.006672333321 KSM<br>Per encoded byte of information: 0.000000333333 KSM |
| Deposit per sub-account: 0.20053 DOT | Deposit per sub-account: 0.066667 KSM |
| **Multisig** |  |
| Deposit base: 0.20088 DOT<br>Additional deposit per signatory: 0.00032 DOT | Deposit base: 0.006695999964 KSM<br>Add. deposit per signatory: 0.000010666656 KSM |
| **Democracy** |  |
| OpenGov | OpenGov |
| Deposit to create proposal: From 1 DOT | Deposit to create proposal: From 0.033333 KSM |
| Periods depending on the track:<br>Decision, 7 - 28 days<br>Confirm, 10 minutes - 2 days<br>Min. enactment, 10 minutes - 1 day | Periods depending on the track:<br>Decision, 7 - 14 days<br>Confirm, 10 minutes - 1 day<br>Min. enactment, 10 minutes - 1 day |

* * *

### Use cases

Kusama is the "canary network" for Polkadot. It is **not** a testnet and has an economic value. All new things come to Kusama first to be tried in a live, fully decentralized, and community-controlled network with real-world conditions and lower stakes.

Kusama may be the perfect environment for ambitious experiments with new ideas and innovations in areas like governance, incentives, monetary policy, and DAOs (decentralized autonomous organizations). Future upgrades to the Polkadot runtime will likely be deployed to Kusama before Polkadot. This way, not only will we be able to see how these new technologies and features will perform under real-world conditions, but teams who have deployed to both networks will also get an advanced look at how their own technology will perform under those upgrades.

Polkadot is and always will be the primary network for deploying enterprise-level applications and those that entail high-value transactions requiring bank-level security, stability, and robustness. It can also be an upgrade path for early-stage applications.

Many projects will maintain parachains on both networks, experimenting and testing new technologies and features on Kusama before deploying them to Polkadot. Some teams will decide just to stay on Kusama. Projects that require high-throughput but don't necessarily require bank-like security, such as some gaming, social networking, and content distribution applications, are particularly good candidates for this use case.

* * *

### What's next?

Over time, Polkadot and Kusama networks will evolve independently. Their respective communities will decide whether the networks will be converging or diverging. Governance on both Polkadot and Kusama is decentralized and permissionless, and everyone who owns the native token (DOT for Polkadot and KSM for Kusama) has a say in how the network is run.

* * *
