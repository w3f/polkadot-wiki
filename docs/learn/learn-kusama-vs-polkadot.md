---
id: learn-kusama-vs-polkadot
title: What is the difference between Polkadot and Kusama?
sidebar_label: Comparing Polkadot and Kusama
description: Comparing the cousins.
slug: ../learn-kusama-vs-polkadot
---

Although they share many parts of their code, Polkadot and Kusama are independent, standalone
networks with different priorities.

Kusama is wild and fast; great for bold experimentation and early-stage deployment. Polkadot is more
conservative, prioritizing stability and dependability.

Cousins have their differences after all.

## What the two networks have in common

Kusama was released as an early version of the same code to be used in Polkadot, which means they
share the same underlying architecture: a multichain, heterogeneously-sharded design based on
[Nominated Proof of Stake (NPoS)](learn-consensus.md). Both networks also share key innovations like
on-chain [governance](learn-governance.md), hot-swappable runtimes for forkless, on-chain upgrades,
and [Cross-Consensus Message Passing (XCM)](learn-cross-consensus.md) for interoperability. Governance on
both Polkadot and Kusama is designed to be decentralized and permissionless, giving a say in how the
network is run to everyone who owns the native token (DOT for Polkadot, KSM for Kusama). Therefore,
**over time the networks will evolve independently, converging or diverging according to the
decisions of their respective communities.**

## Key differences

There are a few important distinctions to be made.

![polkadot_vs_kusama](../assets/Cousins_2.png)

Both networks also have different circulating supplies.

### Speed

The first key technical difference between Polkadot and Kusama is that Kusama has modified
governance parameters that allow for faster upgrades. Kusama is up to four times faster than
Polkadot, with seven days for token holders to vote on referendums followed by an enactment period
of eight days, after which the referendum will be enacted on the chain. This means stakeholders need
to stay active and vigilant if they want to keep up with all the proposals, referenda, and upgrades,
and validators on Kusama often need to update on short notice.

On Polkadot, votes last 28 days followed by an enactment period of 28 days. This does not mean that
the Kusama blockchain itself is faster, in the sense of faster block times or transaction throughput
(these are the same on both networks), but that there's a shorter amount of time between governance
events such as proposing new referenda, voting, and enacting approved upgrades. This allows Kusama
to adapt and evolve faster than Polkadot.

### Lean setups

Teams wishing to run a parachain need to bond tokens as security. The bonding requirement on Kusama
is likely to be lower than on Polkadot.

### Use cases

Polkadot is and always will be the primary network for the deployment of enterprise-level
applications and those that entail high-value transactions requiring bank-level security and
stability.

The initial use case for Kusama is as a pre-production environment, a “canary network”.
For the average developer, this seems like it could be a testnet, what is the difference?
What does _canary_ even mean?

Canary is a type of bird: back in the day, coal miners would put canaries into coal mines as a way to measure the amount of toxic gases that were present. Similarly, canary testing is a way to validate software by releasing software to a limited number of users, or perhaps, an isolated environment - without hurting any birds.

Releases made onto Kusama can be thought of as [Canary Releases](https://martinfowler.com/bliki/CanaryRelease.html).
These releases are usually staged. In Kusama's early days, the network won't just be used for parachain candidates to innovate and test changes, but a proof of concept for Polkadot's sharded model.

In a typical blockchain development pipeline, Kusama would sit in between a "testnet" and a "mainnet"

:::info Testnet -> Kusama -> Polkadot

:::

As you can imagine, building on Kusama first allows teams to test things out in a live, fully decentralized, and
community-controlled network with real-world conditions and lower stakes in the event of problems or
bugs than on Polkadot.

Many projects will maintain parachains on both networks, experimenting and testing new technologies
and features on Kusama before deploying them to Polkadot. Some teams will decide just to stay on
Kusama, which is likely to be a place where we see some exciting experimentation with new
technologies going forward. Projects that require high-throughput but don’t necessarily require
bank-like security, such as some gaming, social networking, and content distribution applications,
are particularly good candidates for this use case.

Kusama may also prove to be the perfect environment for ambitious experiments with new ideas and
innovations in areas like governance, incentives, monetary policy, and DAOs (decentralized
autonomous organizations). Future upgrades to the Polkadot runtime will also likely be deployed to
Kusama before Polkadot mainnet. This way, not only will we be able to see how these new technologies
and features will perform under real-world conditions before bringing them to Polkadot, but teams
who have deployed to both networks will also get an advanced look at how their own technology will
perform under those upgrades.

## Going forward

Ultimately, Kusama and Polkadot will live on as independent, standalone networks with their own
communities, their own governance, and their own complementary use cases, though they will continue
to maintain a close relationship, with many teams likely deploying applications to both networks. In
the future, we’re also likely to see Kusama bridged to Polkadot for cross-network interoperability.
Web3 Foundation remains committed to both networks going forward, providing crucial support and
guidance to teams building for the ecosystem.

## Explore more

- [About Kusama](https://kusama.network)
- [The Kusama Wiki](https://guide.kusama.network)
- [Kusama on Polkadot-JS Apps](https://kusama.dotapps.io)
