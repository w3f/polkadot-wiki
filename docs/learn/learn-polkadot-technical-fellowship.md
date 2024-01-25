---
id: learn-polkadot-technical-fellowship
title: Polkadot Technical Fellowship
sidebar_label: Technical Fellowship
description: Self-governing body of experts and developers of the Polkadot protocol.
keywords: [governance, referenda, proposal, voting, whitelist, fellowship, opengov, rank]
slug: ../learn-polkadot-technical-fellowship
---

import RPC from "./../../components/RPC-Connection";

The Technical Fellowship is a self-governing body of experts and developers of Polkadot and Kusama
networks protocols. It operates on-chain through the Polkadot
[Collectives](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/fellowship/referenda)
system chain and off-chain through the [Polkadot Fellows](https://github.com/polkadot-fellows)
repository.

:::info Historical Context

The Polkadot Technical Fellowship was established in 2022 and plays an important role in the
Polkadot OpenGov. This fellowship replaced the
[Technical Committee](./learn-governance.md#technical-committee) from Polkadot's first iteration of
governance, and will be serving both the Polkadot and Kusama networks. This Fellowship is designed
to be far broader in membership (i.e. to work well with even tens of thousands of members) and with
far lower barriers to entry both in terms of administrative process flow and levels of expertise.
For more information, read through the
[Fellowship Manifesto](https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf).

:::

Apart from the collectives system chain and the GitHub repository, the Polkadot Technical Fellowship
also uses multiple public avenues to discuss updates related to the Polkadot protocol. Their public
discussions can be viewed on [this chatroom](https://matrix.to/#/#fellowship-members:parity.io) and
their monthly meetings are posted to this OpenDev - Polkadot Fellowship Core Dev Call
[YouTube playlist.](https://www.youtube.com/watch?v=5P6Axm4JrmQ&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-)

## Technical Fellowship Referenda

The fellowship's governance model has multiple tracks with their own approval and support
parameters, where the votes are weighted by the rank of the member. Members of the Fellowship can
vote on any given Fellowship proposal and the aggregated opinion of the members (weighted by their
rank) constitutes the Fellowship's collective opinion. The list of current and historic fellowship
referenda can be viewed on [Polkassembly](https://collectives.polkassembly.io/) or
[Subsquare.](https://collectives.subsquare.io/) The fellowship governance is primarily used for its
membership management, [approving RFCs](https://github.com/polkadot-fellows/RFCs) and whitelisting
Polkadot OpenGov proposals created on the whitelist track.

## Membership and Ranking

The Polkadot technical Fellowship was initally [seeded](https://github.com/polkadot-fellows/seeding)
with its members and their corresponding ranks, and got
[added on to Polkadot's Collectives](https://polkadot.polkassembly.io/motion/403) system chain.

### Becoming a Member

:::note

The fellowship manifesto states that any account may register to become a candidate for a basic
deposit, but that feature has not been added to the collectives runtime yet.

:::

As a member of the Polkadot Technical Fellowship, you are expected to faithfully uphold the below
tenets:

- Sincerely uphold the interests of Polkadot and avoid actions which clearly work against it.
- Respect the philosophy and principles of Polkadot.
- Respect the operational procedures, norms and voting conventions of the Fellowship.
- Respect your fellow Members and the wider community.

To be added as a candidate of the Polkadot Technical Fellowship, a pre-existing member with rank
greater than or equal to 2 should initiate the process.

### Ranking System

To prevent a small group of participants from gaining effective control over the network, this
system will adhere to three main principles:

- The Fellowship must never have hard power over the network: it cannot change the parameters,
  conduct rescues or move assets. Their only power in governance is reducing the effective timeline
  on which a referendum takes place through [whitelisting](#whitelisting).
- The Fellowship weights those with a higher rank more in the aggregate opinion. However, the weight
  should not be so high as to make a small number of higher members’ opinions be insurmountable
  compared to a coherent opinion from lower-ranked membership.
- The Fellowship should be designed to grow and develop its membership, aggregate levels of
  expertise and ensure that its overall decision-making capacity strengthens over time.

To support these conditions, the Fellowship has a
[manifesto](https://github.com/polkadot-fellows/manifesto) that outlines the requirements and
expectations for individuals to attain and retain any given rank. Higher ranks can vote and promote
lower ranks based on this [manifesto](https://github.com/polkadot-fellows/manifesto).

### Promotion and Demotion

**Demotion** occurs automatically after a given period has elapsed, and the member is unable to
defend their position to their peers.

**Suspension** can happen only through a referendum, which ensures that the Fellowship's bias alone
does not necessarily result in expulsion.

To prevent the Fellowship from becoming a cabal (popularity with Fellowship peers alone should not
be enough to gain access to a top rank), gaining access to the top tiers of the ranks will require a
referendum.

### Whitelisting

Polkadot OpenGov allows the Fellowship to authorize a new origin (known as "Whitelisted-Caller") to
execute with Root-level privileges for calls that have been approved by the Fellowship (currently
only level-three fellows and above can vote for whitelist calls).

The [Whitelist](https://paritytech.github.io/substrate/master/pallet_whitelist/) pallet allows one
Origin to escalate the privilege level of another Origin for a certain operation. The pallet
verifies two things:

- The origin of the escalation is the Whitelisted-Root (i.e. that the referendum passed on this
  track), and
- The whitelist contains the given proposal (in the configuration of Polkadot OpenGov, it gets there
  via a separate Fellowship referendum).

If both conditions are true, the operation executes with Root-level privileges.

This system enables a new parallel Track (Whitelisted-Caller), whose parameters have less
restrictive passing parameters than Root in the short term. Through an open and transparent process,
a body of global experts on the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
protocol have determined that the action is both safe and time-critical.

:::info Submitting Whitelisted Proposals

For more information about how to submit a whitelisted proposal see the
[dedicated advanced how-to guides](./learn-guides-polkadot-opengov.md#submitting-a-referendum-on-the-whitelisted-caller-track).

:::
