---
id: learn-jam-chain
title: Polkadot's JAM Chain
sidebar_label: JAM Chain
description: Polkadot's Join-Accumulate Machine.
keywords: [Polkadot, JAM, join-accumulate]
slug: ../learn-jam-chain
---

:::note 

JAM paper is available at [graypaper.com](https://graypaper.com/) and the information regarding
JAM prize is available at [jam.web3.foundation](https://jam.web3.foundation/).

:::

JAM, short for Join-Accumulate Machine, represents a prospective design to succeed the relay chain.
Its name originates from CoreJAM, denoting Collect Refine Join Accumulate, which outlines the
computation model the machine embodies. However, within the actual chain, only the Join and
Accumulate functions are executed, while the Collect and Refine processes occur off-chain.

Unlike the current iterative approach, JAM will be introduced as a comprehensive singular upgrade.
Several factors contribute to this decision:

- A unified upgrade allows for precise restriction of post-upgrade actions, which is challenging
  with an iterative approach.
- It mitigates the constant stream of minor upgrades and breaking changes that occur regularly over
  weeks or months.

While this shift entails a significant breaking change, efforts will be made to minimize its impact
to manageable levels. Consolidating multiple smaller breaking changes into a single transition is
deemed preferable, introducing a novel blockchain concept that integrates various existing ideas in
a unique manner.

## A Rollup Chain

JAM will be a domain-specific chain, a chain that handles one particular domain of problems. In this
case, roll-ups, what Ethereum people might call optimistic roll-ups. JAM's rollups are heavily
bounded in terms of their security. This is what Polkadot has been doing for the last five years, it
is already a highly domain-specific roll-up chain. JAM essentially makes it less opinionated and more generic.

The job of the JAM chain is to provide the necessary apparatus to ensure that the output
correctly reflects the input when it goes through the transformation it's meant to have undergone. The JAM chain 
accepts outputs of roll-ups, of bits of computation done elsewhere, and the data they yield is fed into the JAM chain.

The JAM chain integrates the outputs of these computations into a shared state,
providing a shared state model similar to how Polkadot relay chain functions. 


## Smart Contract Similarity

JAM exhibits several similarities with a smart contract chain:

- Permissionless code execution occurs directly on the JAM chain itself.
- The state of the JAM chain is organized into distinct encapsulations.
- Alongside state, encapsulations encompass code and balance.

These encapsulations of state are termed **services**. Thus, the JAM state is partitioned into
services. The creation of a new service is permissionless, akin to deploying a smart contract on a
smart contract chain. Consequently, adding a new service to the JAM chain does not necessitate
approval from any authority or adherence to governance mechanisms, unlike Substrate-based chains
that mandate governance approval for adding new pallets. Services encompass code, balance, and
certain state components, resembling the structure commonly observed on a smart contract chain.

## Service Entry Points

JAM services' code is split into three different entry points:

- **Refine** is the function that does the mostly stateless computation. It
  defines the transformation for the rollup for a specific service.
- **Accumulate** is the function that takes the output of that and folds it into the overall state
  of the service
- **OnTransfer** handles information coming from other services.

**Work packages** are the input to a service. Work packages can have many **work items** in them.
Every work item is associated with a service, and it reflects the actual input to the service. For
the parachains service, this is where the transactions and all of the blockchain inputs are entered.

The JAM security apparatus consists a two-stage processing where the Refine function accepts a work
item as an input and yields a work result as an output, which gets fed into the Accumulate function (First Refine, then Accumulate.) Work items are refined into work results, and therefore, a work package containing many work items is refined into a **work report**, which is the
corresponding results of several items. A work package can be assigned that uses one core for a specific
time slot (typically a period of 6 seconds).

## JAM is Transactionless

JAM fundamentally differs from a smart contract chain in the fact that it's **transactionless**. There are no
transactions in JAM: Everything is permissionless and the input first goes through a Refine stage.
So the service pre-refines all of the input that is transformed into these work reports, these sets
of work results. Then, those work results make their way onto the chain.

So if there are no transactions, how does anything make its way from the external world in? Well,
there is still extrinsic information of a specific format. There are five kinds of extrinsic in JAM:

- Guarantees
- Assurances
- Judgments
- Preimages
- Tickets

The first three are part of the security apparatus of the JAM chain. Guarantees and assurances are
essentially the validators getting together and putting forward their attestations that a work
result is the correct result of its work item when transformed through the service's refine
function. Judgments are used when a work result is not reflective of the work items that is supposed
to be, and it has already made its way through the system and has been since accumulated into its
service's state. At this point, we have to roll things back, and we have to record the fact that
this was invalid. Judgments come within one hour after the work report has been submitted to the
chain. Basically, you've got this one hour period where things could not be reverted, because
finality will pause until the judgment has been allowed to actually happen. In general, though, this
is like a massively upper bound, and most of the times any possible judgment would have been done
within maybe three or four after the work package, and finality would only be paused for that long.

Pre-images are a piece of functionality that the JAM chain provides for the refine function. The
refine function is essentially stateless, but there is one particular thing that it can do that is
stateful: It is allowed to look up the preimage of a hash. This is the one thing that is
opinionated. A block author of the JAM chain may choose to bring in one pre-image rather than
another pre-image. There's nothing that holds them to any particular pre-image. Whereas guarantees,
assurances, judgments, and tickets, are particular pieces of information, which the author either
has or doesn't have. And if they have it, regardless of whether they have it or not, their only
option is to either provide it or not provide it. They can't provide something else in its place.

Tickets are essentially anonymous entries into the block production mechanism. They do not
immediately need to be provided to produce a block, but rather we run two epochs in front. This is
part of an algorithm called SAFROL, which is a small refinement of an original algorithm called
SASSAFRAS.

## JAM Chain's Generalization

Polkadot is quite heavily designed around one particular service profile, the delivery of
parachains. This is what the original Polkadot paper had in it. In delivering that service, Polkadot
created a number of useful subcomponents:

- the distributed data availability system
- the auditing and guarantees system for computation (i.e. an optimistic roll-up system with very
  good and proven security guarantees)

JAM could be considered essentially a reduction in the level of opinionation, basically a greater
level of abstraction and generalization so that it's easier to use these underlying components in a
way that you would like to use them.

JAM is permissionless as it can hosts code very similar to a smart contract chain. People can upload
code and can expect JAM to execute that code. It also hosts data, this preimage lookup, and state,
essentially very similar to a key value pair. Anyone can introduce new services. The first service
that would be in the JAM Genesis block would be a service that enables people to add new services.
Since JAM itself doesn't have any way of accepting transactions, there's no immediate way for anyone
to create a service on JAM. There has to be a service that starts in JAM to allow people to go
through it and create their own services.

Services do not have any particular limits on how much code, data, or state they can host. It's all
crypto-economic based, so essentially the more DOT your services have deposited with them, the more
data and the more state they can have in them. One example service would be the parachains service.
Essentially, all of the Polkadot 1.1 functionality would be contained within a single service on
JAM. Other services can be added that provide other functionality, but still use Polkadot's
distributed availability system and the auditing and guarantees system for computation.

## Refine Function

Refine accepts up to 5 MB of data every time slot, and a time slot is six seconds.

Refine yields up to 4 kB of data. So you've got this big sort of compaction factor going on because
of the nature of the distributed availability system. It's distributed and it is not possible to
have all of this data making its way into the accumulate function onto the on-chain logic. So to
give an example, for a parachain, the 5 MB of data would be the PoV while the 4 kB of data would be
the candidate receipt.

The refine function can execute for up to six seconds of PVM gas, that is it can execute for the
full relay chain block period. At the moment, PVFs can execute for two seconds. This can be because
PVM has basically secure metering and few other optimizations so we can process three times as much
stuff.

The refine function also gets some contextual information on what it is, on the world around it that
the work that it's doing is being produced in. In particular, it gets information on what other
things are being refined at the same time. Why is this important? Well, it means that you can
construct work packages that have multiple work items of multiple services in them, which are
codependent. This then enables certain things like, for example, accords, and the ability to have
one service, like some sort of EVM service, interact synchronously with a parachain.

Inside of refine, you can also make preimage lookups. If you have a hash and you believe that the
preimage is available for that hash, on the JAM chain, then you can request the preimage by giving
it the hash.

What this allows us to do is, for example, lookup code. We might have, for example, a parachain
code, where you don't want to supply a parachain code, which could be upwards of a megabyte. You
want to supply that inside of the work package. That would be a waste of the five megs, right? Every
time you want to run the parachain, supply the same one megabyte. Instead, you store the one
megabyte of code on the JAM chain, and you just have its hash in the work package. I would like the
preimage to this hash. This, for what it's worth, is what we already do on Polkadot One, but we do
it in a slightly suboptimal way, and very much not general. Now, that's refine. That's the first
stage. That's the bit that does all the work. That's the workhorse, but it's largely stateless.

## Accumulate Function

The accumulate function integrates the output of refine actually into the chain state. Accumulate
accepts multiple outputs from refine, all of the same service, right? Don't forget, refine and
accumulate are both entry points from a code blob that is specific to a service. It accepts multiple
refine outputs and it can execute for a much smaller period of time per output around, at most, 10
milliseconds. And this depends whether the work package has many different work items in, or if it's
just one. If it's just one, it gets the full 10 milliseconds per work output. If it's many, then
that's shared between each of the outputs of the work package.

A big difference to refine, it's stateful. This means it can access the state of the JAM chain. It
can read the storage from any service, and it can write to its own key value store. It can also
transfer funds and send a little memo when it does transfer funds. And it can also create new
services, obviously, upgrade its code, request the availability of a preimage, and a few other bits
that I'm not talking about.

Incidentally, and I actually forgot to mention this in the refine model, both of these can invoke
child instances of the PVM. So you can make a new instance of the PVM that's sort of a sub-instance,
a virtual machine, and you can put some code in there, and put some data in there, set the memory to
whatever you want, set the stack even to whatever you want, and then kick it off and let it run for
some period of gas, and then it will come back when it's done. So it's a very, very flexible model
for computation.

## On-transfer Function

So onTransfer is also stateful. It can alter the service's state. It can look at other services'
state and alter its own state. And this really is there so that you can allow for services to
communicate with other services in an albeit asynchronous fashion. So it's a little different from
many smart contract platforms in that this interaction of the encapsulated components, smart
contracts or services in our case, happens in an asynchronous fashion. You fire off a message along
with maybe some tokens, and then on the other side, at some point later in the same six-second
execution period, the other service will get it and can execute upon it. There's no return path. If
you want a return path, you have to send some, do a transfer back, basically, or possibly change
your state in some way that the sending service can expect it and look at it later.

Both accumulate and on transfer are written so that they can be executed in parallel. So the
different services accumulates and transfers can all execute at the same time. This would allow for
future designs to actually have more than this 10 milliseconds of gas input. In principle, there
could, for example, be a secondary core, utilized for executing certain accumulates and giving them
much, much greater amounts of gas to use.

## Polkadot Virtual Machine (PVM)

The PVM design is based on the RISC-V ISA (Instruction Set Architecture). It's a very simple
instruction format. The RISC-V ISA is:

- easy to transpile into common hardware formats like x86, x64, and ARM
- well supported by tooling like [LLVM](https://llvm.org/)

PVM itself is simple and secure, sandboxable. It has various guarantees over execution, it is
friendly to metering, deterministic, and consensus-sensitive. It can host arbitrary in a sense that
PVM does not have much of the complexity, nor does it have much of the opinionation that you might
otherwise find in other VMs.

WASM is ultimately optimized for a web use case, and this is sort of fine in most circumstances.
However, the stack is not handled as part of the machine itself (but rather it's sort of
off-machine) and this creates issues in continuations. Now, continuations can be really a very
helpful thing to have, particularly when you're doing stuff like asynchronous programming with XCM.

RISC-V, being such a simple and sort of regular machine, just puts the stack in a bit of memory,
which means if you snapshot the whole of memory, or at least the pages that are actually used in
memory, you will end up being able to have continuations naturally. There's nothing extra to do.
Now, as it happens, PVM also achieves incredibly fast execution speeds (free metering compared to
WASM) when run on regular hardware like X64 and ARM.

RISC-V-enabled continuations will set a new standard for coding that is meant to scale across
multi-core platforms like JAM. Realistically, this is how all blockchains are ultimately going to
scale. This idea of just throwing faster single-core CPUs at it is not going to go very far. We
already can see this in hardware and in the evolution of software platforms as well. There is an
increasing need to think in terms of asynchronous, parallelized architectures. The same will for
sure be true in blockchain and consensus algorithms.

## SAFROLE

SAFROLE is a block production algorithm, a simplification of [SASSAFRAS](./learn-sassafras.md). It
excludes some components that may be useful for parachains. So parachains may probably stick with
SASSAFRAS rather SAFROLE. SAFROLE will be as simple as possile to:

- ensure that it is as minimally opinionated as possible to maximize the potential future use cases
- to follow in the footsteps of Ethereum yellow paper, and really try to get as many implementations
  as possible to try and spread the expertise.

Understanding how Polkadot 1.0 works end-to-end is challenging. With JAM, someone who is capable of
reading and understanding the yellow paper would be able to read and understand fairly quickly how
JAM works. So simplicity is crucial.

SAFROLE is a SNARK-based block production algorithm. It uses SNARK specifically for their anonymity
features. And it delivers constant time block production, almost entirely fork-free. There are a
couple of instances where forks could possibly arise. They basically only happen when there's a net
split or someone's being intentionally malicious. The great value for the anonymity is not
specifically to keep validators' identities sort of a secret. In fact, when they actually produce a
block, they give away their identity anyway, but rather for ensuring that the block production
mechanism itself is secure, basically to avoid spamming.

## Networking

Networking for JAM uses the [QUIC protocol](https://en.wikipedia.org/wiki/QUIC). This allows direct
point-to-point connections between a large numbers of validators. So essentially all 1,000-plus
validators on Polkadot can have a persistent connection to each other without potential issues with
sockets. Gossip is avoided, mostly because it is not needed, because JAM will not handle
transactions. In case of distributing something that's not point-to-point or within a very small
subset validators, grid-diffusal will be used, in which validators are arranged into a grid, and
packages are sent by a row, and then each node on the row sends it to all members of its column.

## Pipelining for Efficient Block Processing

In state-based blockchains like Ethereum, the header of blocks typically contains the posterior
state root, summarizing the state after all block computations. Consequently, the header cannot be
sent until all computations are complete. However, some computations can be performed before sending
the header, as their outcomes determine the block's validity.

In JAM, a different approach is adopted by placing the prior state root in the header instead of the
posterior state root. This means that the state roots featured in the header lag by one block. As a
result, lightweight computations, comprising approximately 5% of the block's workload or execution
time, can be executed, and the block can be distributed immediately afterward. The remaining 95% of
the block's computation, primarily accumulation tasks, can be completed subsequently. This enables
the next block to be started before the execution of the current block is finished.

This approach allows for more efficient utilization of time between blocks. In traditional setups
like Polkadot's six-second block time, where the posterior state root must be provided, only a
portion of the time can be used for computation. However, with pipelining in JAM, the entire block
time can be effectively utilized for computations, maximizing efficiency.

While using the full block time for computation may not be ideal, as it could lead to perpetual
catching up and delayed block imports, JAM's approach enables significantly more time for
computation compared to traditional setups. This means that approximately three to three and a half
seconds of effective block computation time can be achieved, a substantial improvement over the
current setup.

## Architectural Differences: JAM vs. Relay Chain

One of the architectural distinctions between JAM and the Relay Chain lies in the degree to which
functionality is fixed. While the relay chain fixes certain elements, such as the language used to
define the protocol (WASM), JAM goes further in this regard. For instance, it dictates the type used
for encoding the block header and the hashing scheme, making alterations to these aspects
challenging.

However, flexibility comparable to that enabled by the WebAssembly meta-protocol in the relay chain
is preserved in JAM through its service model. In this model, upgradability responsibility is
shifted to services, freeing the chain itself from the burden of being upgradable. Three primary
reasons support this decision:

- Simplicity is prioritized. Maintaining a non-upgradable chain significantly reduces complexity.
- The relay chain's tendency to introduce complex functionalities without removing older ones
  complicates matters. Because upgrades are easily implemented, there's little incentive to simplify
  the Substrate SDK. Consequently, replicating Polkadot becomes impractical.
- The potential for optimization afforded by JAM's fixed parameters. With a clear understanding of
  the specific tasks the JAM chain must perform and the ability to set fixed parameters,
  optimizations in areas like network topology and timing become feasible. This contrasts with the
  challenges posed by the relay chain's highly upgradable nature, where such optimizations are more
  complex due to the frequent alterations possible with each upgrade.

Despite these differences, JAM retains flexibility in application-level functionalities, such as
coretime sales, staking, and governance, all managed within services. Additionally, JAM introduces a
novel concept by associating a token balance with a service, providing opportunities for economic
model adjustments that are not easily achievable in purely upgradable chains like the Relay Chain.

## JAM Toaster

One of the ongoing efforts in ensuring that JAM meets its original expectations involves
establishing a comprehensive test environment for the JAM chain. Unlike small-scale test networks
running on unreliable hardware to manage cloud computing costs, this initiative entails a
substantial investment. Introducing the JAM toaster, essentially a test platform designed for
conducting large-scale trials and performance assessments of JAM. This addresses a prior challenge
encountered during the development of the Polkadot Relay Chain, where understanding the emergent
effects and dynamics of operating a network at such scale proved difficult. Previous attempts were
limited to a few dozen nodes on a test network and the Kusama network, which lacks comprehensive
monitoring capabilities due to restrictions on accessing validator nodes. Conversely, the
small-scale test network failed to accurately simulate the network dynamics of a larger-scale
deployment. The JAM toaster aims to bridge this gap by enabling in-depth research at the scale of
the entire JAM network, comprising 1,023 nodes. This platform facilitates the investigation of
network behavior and performance characteristics, providing valuable insights for developers
regarding the expected performance of their parachains.

## JAM and Substrate

### Benchmarks vs. Metering

Benchmarks, or performance tests, can be optional when working with JAM. While they may still be
necessary on occasion, JAM's metered system can often obviate the need for frequent benchmarking.
JAM operates on a metered system, allowing users to assess computational workload after completion.
Additionally, there's a theoretical mechanism to control computation, typically implemented at block
construction time.

However, there are scenarios where benchmarking remains relevant. For instance, when metering is
deemed too conservative for certain use cases, benchmarking might be necessary to enhance
performance. Additionally, benchmarking could be useful for tasks requiring extended execution
times, ensuring they aren't run excessively long.

### XCMP

Moving on to Cross-Chain Message Passing (XCMP), JAM mandates full XCMP support. This is because
within the relay chain, there's a provision for passing more data via a candidate receipt than would
be practical if all parachains transmitted all data all the time. JAM adheres strictly to rules,
even for parachain services, including limitations on data transmission between the "refine" and
"accumulate" phases. Currently, with
[Horizontal Relay Chain Message Passing (HRMP)](./learn-xcm-transport.md#hrmp-xcmp-lites), all
messages traverse the relay chain, constraining the data payload to 4 kB or less, which might not be
realistic. Thus, XCMP, where only message headers are relayed via the chain while the actual message
data is transmitted off-chain, emerges as a necessary and overdue improvement.

### Accords

[Accords](../general/polkadot-direction.md#xcm-and-accords) essentially encapsulate state and logic,
resembling smart contracts, with multiple instances residing alongside each parachain. They
facilitate message exchange between instances and enable synchronous interactions with parachains.
Accords find utility in scenarios where trust between parachains is lacking, such as token
transfers. Unlike the existing method involving a reserve intermediary, Accords streamline direct
token teleportation between parachains, eliminating the need for trust-compromising intermediaries.
Moreover, Accords could function as XCM forwarding mechanisms, ensuring message integrity even when
relayed through third-party intermediaries, thus eliminating the need for explicit origin markers.

### Boosting Efficiency

Lastly, JAM's broader, less opinionated approach to leveraging underlying consensus mechanisms makes
it conducive to implementing more innovative solutions. For instance, distributed availability for
complex tasks like zero-knowledge proofs becomes more practical and efficient with JAM.
Additionally, JAM supports a mixed resource consumption model, wherein work packages can contain
both computationally intensive tasks and data-heavy operations. By pairing services with diverse
resource requirements, such as those needing extensive computation with those necessitating high
data availability, JAM optimizes the utilization of validators' resources, thereby reducing costs.
This flexible approach enables the combination of tasks like distributed availability and SNARK
verification with parachain workloads, driving down costs while enhancing efficiency.

## Enhancements and Compatibility in JAM

JAM's design prioritizes compatibility with existing Polkadot 1 parachains. While it maintains
compatibility with the Polkadot SDK, the Polkadot Validator Function (PVF) undergoes retargeting.
Instead of WebAssembly, it will target the Polkadot Virtual Machine (PVM). This transition is
facilitated by the fact that PVM is a minor modification of RISC-V, which has already been
established as an official LLVM target. Consequently, PVM could become an official LLVM target
before the deployment of JAM.

Beyond serving as a host for parachains, JAM introduces significant enhancements. It offers the
potential to streamline benchmarking efforts and alleviate future benchmarking requirements.
Additionally, JAM introduces the concept of accords, multi-instance, multi-sharded smart contracts
that govern and enforce specific interaction protocols between parachains. Furthermore, full
Cross-Chain Message Passing (XCMP) support is essential, enabling the removal of limitations on
information transfer between parachains, typically facilitated by Cross-Chain Messages (XCM).

Regarding Agile Coretime, JAM retains compatibility with existing setups. However, it introduces the
capability to target coretime not only at parachains but also at arbitrary sets of work packages.
This flexibility enhances the versatility and efficiency of resource allocation within the JAM
ecosystem.
