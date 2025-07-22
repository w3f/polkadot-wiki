---
title: Polkadot 2.0
description: Explore Polkadot 2.0's innovations making Polkadot's decentralized computer more accessible and efficient.
---

Understanding what [Polkadot 1.0](./polkadot-v1.md) is about, and the philosophy behind it, will help
us envision the future direction of the Polkadot as a high-performance decentralized computer capable of delivering resilient and verifiable computation, and interoperability to anyone and anything.
  
## Polkadot 2.0 Definition

Polkadot is **a multi-core decentralized computer** providing resilient and verifiable computation via virtual cores. Chains that continuously operate in parallel on different virtual cores are called [rollup chains](../learn/learn-parachains.md) (also called parachains).

The Polkadot community [voted on a Wish for Change proposal](https://polkadot.polkassembly.io/referenda/747) stating that Polkadot 2.0 includes the following major technical upgrades:

- [asnychronous backing](../learn/learn-async-backing.md) allowing pipelining and thus a more efficient rollup system that grant rollups more throughput without compromising security.
- [coretime](../learn/learn-agile-coretime.md) allowing agile allocation of cores.
- [elastic scaling](../learn/learn-elastic-scaling.md) allowing the use of multiple cores simultaneously by the same rollup chain.

These technical upgrades allowed to make the Polkadot decentralized computer more efficient, powerful, and accessible for anyone to use.

## From Slot Auctions to Coretime Marketplace

Polkadot 1.0 has been abstracted and generalized beyond what was originally proposed and envisioned in the [Polkadot whitepaper](https://polkadot.network/whitepaper/).

If we see Polkadot as a service provider of trustless, resilient and verifiable computation through cores as well as secure interoperability between core-secured rollup chains, the future development of Polkadot can be directed towards the following paradigm shift:

- from being an ecosystem where each rollup chain owned an execution core at all times
  (acquired through an auction), which allowed a simple and secure, sharded execution
  environment
- to being an ecosystem where we remove the assumption that each rollup chain
  owns a core, and instead that all cores are a resource to be consumed and used as needed by all rollups.

Previously, securing a core was a competitive process through an
candle auction mechanism. With [coretime](#coretime-allocation), there is no need for
auctions anymore. Rollup chains can purchase on-demand coretime or reserve bulk coretime as required. This greatly decreases the barrier-to-entry for software tinkerers and rollup teams. Coretime will allow any rollup chain to access Polkadot's computation based on their needs maximizing the use of valuable computation.

The end product of a blockchain is [**blockspace**](./polkadot-v1.md#polkadots-blockspace). In the Polkadot context, blockspace is better described by secure computation provided by the [ELVES protocol](../learn/learn-parachains-protocol.md).
The entry points to access Polkadot's computation are the virtual cores. Thus, rollups need to reserve time on Polkadot's cores (or **Coretime**) to gain the right to access Polkadot's secure computation and interoperability for a finite period.

Core scheduling is agile and generalized: cores can change what rollup runtime they execute as easily as a modern CPU changes tasks.

The previously-used candle auction mechanism was not agile, created high entry barriers, and was designed for long-running single blockchains (i.e., the original Polkadot vision proposed in the whitepaper). Thus, classic lease auctions were deprecated to make place for an agile marketplace for coretime, where **coretime becomes a commodity that can be tokenized, sold, and traded**. This setup
maximizes the agility of Polkadot and lets the market figure out the best solution needed for
rollup chains to be successful.

Applications can reserve **bulk coretime** and **on-demand coretime** depending on their needs. Bulk
coretime rental is a standard rental of coretime through [the Coretime System Chain](../learn/learn-system-chains.md#existing-system-chains) at a fixed
price for a fixed period of time. On-demand coretime rental is available through ongoing sale
of coretime for immediate use at a spot price. This system lowers the barrier to entry for
prospective builders. Coretime sales are burned and participate to the protocol's revenue by adding a deflationary pressure on the DOT token.

## Polkadot 2.0 Core Usage and Functionalities

We have see how in Polkadot 1.0 one rollup chain has a specific core at all time for a fixed two-year period whether they needed it or not. However, to achieve full efficiency, blocks must be produced when needed, and the system must target full block capacity, lowering the probability of incentivizing validators to build blocks half full or, worse, empty.

Polkadot 2.0 generalizes core usage to meet different rollup needs. For more information about coretime, see the [agile coretime documentation](../learn/learn-agile-coretime.md).

<div align="center"> <img src="../../assets/polkadot-v2-cores.png" style="width:600px;" alt="V1 Cores Scheme"> </div>

### Split Coretime

Owners of coretime can split or trade it. An application A1 can run on core C1 for a finite period
and then another application A2 can run on that core, or application A1 can continue running on
another core C2. Some applications might stop running for some time and resume later on.

![core-usage-agile-rangeSplit](../assets/core-usage-agile-rangeSplit.png)

### Interlaced Coretime

Ranges can be interlaced (i.e., applications can take turns on a core) to share costs or decrease block
production rate, for example.

![core-usage-agile-rangeStrided](../assets/core-usage-agile-rangeStrided.png)

### Agile Coretime

An application can be assigned to multiple cores simultaneously. Some applications can have a
permanent core assignment and an intermittent one, for example, in a period of high demand to send
multiple blocks to multiple cores at the same time slot to reduce latency. Combining coretime in
this manner is achieved through [elastic scaling](../learn/learn-elastic-scaling.md).

![core-usage-agile-combined](../assets/core-usage-agile-combined.png)

One core can be reserved for one single chain in-bulk or on-demand. On-demand cores can be accessed by multiple chains at different periods (that is, concurrently, see the [coretime page](../learn/learn-agile-coretime.md)).

