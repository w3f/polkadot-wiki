---
id: learn-polkadot-technical-fellowship
title: Polkadot Technical Fellowship
sidebar_label: Technical Fellowship
description: Self-governing body of experts and developers of the Polkadot protocol.
keywords: [governance, referenda, proposal, voting, whitelist, fellowship, opengov, rank]
slug: ../learn-polkadot-technical-fellowship
---

The Technical Fellowship is a self-governing body of experts and developers of Polkadot and Kusama
networks protocols. It operates on-chain through the Polkadot
[Collectives](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/fellowship/referenda)
system chain and off-chain through the [Polkadot Fellows](https://github.com/polkadot-fellows)
repository.

!!!info "Historical Context"
    The Polkadot Technical Fellowship was established in 2022 and plays an important role in the Polkadot OpenGov. This fellowship replaced the [Technical Committee](./archive/learn-governance.md#technical-committee) from Polkadot's first iteration of governance, and will be serving both the Polkadot and Kusama networks. This Fellowship is designed to be far broader in membership (i.e. to work well with even tens of thousands of members) and with far lower barriers to entry both in terms of administrative process flow and levels of expertise. For more information, read through the [Fellowship Manifesto](https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf).

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

### Whitelisting

Polkadot OpenGov allows the Technical Fellowship to authorize an origin known as
"Whitelisted-Caller" to execute with Root-level privileges for calls approved by the Fellowship
(currently only level-three fellows and above can vote for whitelist calls). Note that the
fellowship cannot unanimously change the network parameters, conduct rescues or move assets. The
whitelisted proposals still have to go through the whole life cycle of an OpenGov referendum and can
only be enacted when the referendum passes successfully.

The whitelisting process starts as a fellowship referenda with embedded XCM call from the
collectives system chain to the Polkadot relay chain. For instance,
[the Polkadot Fellowship referenda 68](https://collectives.polkassembly.io/referenda/68) was used to
**whitelist** [the Polkadot OpenGov referenda 440](https://polkadot.polkassembly.io/referenda/440).

![whitelist-xcm](../assets/fellowship-whitelist-xcm.png)

!!!info "Submitting Whitelisted Proposals"
    For more information about how to submit a whitelisted proposal see the [dedicated advanced how-to guides](./learn-guides-polkadot-opengov.md#submitting-a-referendum-on-the-whitelisted-caller-track).

## Technical Fellowship Ranking and Salary

The Fellowship [manifesto](https://github.com/polkadot-fellows/manifesto) outlines the requirements
and expectations for individuals to attain and retain any given rank, ranging between 0 to 9. By
default, an active account on the collectives system chain has no assigned rank and can be inducted
into the Polkadot Technical Fellowship starting with rank 0. The Fellowship Manifesto states that
members should receive a monthly allowance on par with gross income in OECD countries. A
[fellowship RFC](https://github.com/polkadot-fellows/RFCs/pull/50) was proposed with concrete
amounts for each ranked members.

| Dan  |      Title      | Annual Salary |
| :--: | :-------------: | :-----------: |
|  I   |     Member      |    $10,000    |
|  II  |   Proficient    |    $20,000    |
| III  |     Fellow      |    $80,000    |
|  IV  |    Architect    |   $120,000    |
|  V   | Architect Adept |   $160,000    |
|  VI  | Grand Architect |   $200,000    |
| VII  |   Free Master   |   $200,000    |
| VIII | Master Constant |   $200,000    |
|  IX  |  Grand Master   |   $200,000    |

## Membership Management

The Polkadot technical Fellowship was initially
[seeded](https://github.com/polkadot-fellows/seeding) with its members and their corresponding
ranks, and got [added on to Polkadot's Collectives](https://polkadot.polkassembly.io/motion/403)
system chain. All new membership requests will go through the fellowship governance and the
procedure is outlined in the section below.

### Becoming a Member

As a member of the Polkadot Technical Fellowship, you are expected to faithfully uphold the below
tenets:

- Sincerely uphold the interests of Polkadot and avoid actions which clearly work against it.
- Respect the philosophy and principles of Polkadot.
- Respect the operational procedures, norms and voting conventions of the Fellowship.
- Respect fellow Members and the wider community.

!!!tip "Register your interest"
    For new fellowship inductions, Polkassembly has created an interface (still in beta) to [apply for the Polkadot Technical Fellowship.](https://collectives.polkassembly.io/join-fellowship?network=collectives) This initiative is funded by Polkadot treasury through [OpenGov referendum 373](https://polkadot.polkassembly.io/treasury/574)

The full set of instructions to be inducted to the Polkadot Technical Fellowship are available on
[the fellowship dasboard](https://polkadot-fellows.xyz/#/membership).

### Rank Updates

The Polkadot Technical Fellowship members are expected to provide a periodic evidence to request for
retaining their rank or to get promoted to a higher rank. Any fellowship member upto rank 4 can be
promoted to the next rank through a fellowship referenda that can be voted by the members who are 2
ranks higher. For instance, the fellowship
[referenda 64](https://collectives.subsquare.io/fellowship/referenda/64) which promotes a member
from rank 1 to rank 2 can only be voted by members whose ranks are greater than or equal to 3.
Promotion of the Polkadot Fellowship members from rank 5 needs to be done through an OpenGov
referendum. For more information, check the rank updates section on
[the fellowship dashboard](https://polkadot-fellows.xyz/#/membership).
