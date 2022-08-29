---
id: learn-kusama-vs-polkadot
title: What is the difference between Polkadot and Kusama?
sidebar_label: Comparing Polkadot and Kusama
description: Comparing the cousins.
keywords: [polkadot, kusama, polkadot vs kusama, canary]
slug: ../learn-kusama-vs-polkadot
---
import RPC from "./../../components/RPC-Connection"

Although they share many parts of their code, Polkadot and Kusama are independent, standalone
networks with different priorities.

Kusama is wild and fast; great for bold experimentation and early-stage deployment. Polkadot is more
conservative, prioritizing stability and dependability.

Cousins have their differences after all.

## Comparing the two networks

To get a better understanding of the key similarities and difference between Polkadot and Kusama, checkout [this support article](https://support.polkadot.network/support/solutions/articles/65000182146-kusama-and-polkadot-what-s-the-difference-).

## Cost and Speed

Teams wishing to run a parachain are required to bond tokens as security. It is likely the bonding requirement on Kusama will be lower than on Polkadot, making it the more affordable development environment.

Another key technical difference between Polkadot and Kusama is that Kusama has modified
governance parameters that allow for faster upgrades. Kusama is up to four times faster than
Polkadot.

On Polkadot, the voting period on referendums
lasts <RPC network="polkadot" path="consts.democracy.votingPeriod" defaultValue={403200} filter="blocksToDays"/> days,
followed by an enactment period
of <RPC network="polkadot" path="consts.democracy.enactmentPeriod" defaultValue={403200} filter="blocksToDays"/> days
before the changes are enacted on-chain. On Kusama, voting
lasts <RPC network="kusama" path="consts.democracy.votingPeriod" defaultValue={100,800} filter="blocksToDays"/> days,
followed by an <RPC network="kusama" path="consts.democracy.enactmentPeriod" defaultValue={115,200} filter="blocksToDays"/> day
enactment period. This means stakeholders need to stay active and vigilant if they want to keep up with 
all the proposals, referenda, and upgrades, and validators on Kusama often need to update on short notice.

This does not mean that the Kusama blockchain itself is faster, in the sense of faster block times or
transaction throughput (these are the same on both networks), but that there's a **shorter amount of 
time between governance events such as proposing new referenda, voting, and enacting approved upgrades**.
This allows Kusama to adapt and evolve faster than Polkadot.

### Canary network

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
- [Polkadot and Kusama: What's the difference?](https://support.polkadot.network/support/solutions/articles/65000182146-kusama-and-polkadot-what-s-the-difference-)
