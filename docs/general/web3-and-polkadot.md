---
id: web3-and-polkadot
title: Web3 and Polkadot
sidebar_label: Web3 and Polkadot
description: Introduction to Web3 and Polkadot's Role in shaping the Web3 Vision.
keywords: [web3, polkadot, light clients, decentralization]
slug: ../web3-and-polkadot
---

Back in the early 2000's the internet featured read-only, static, basic web pages. The online
connected world at the time was only the beginning of virtual data, identities, and more. The
internet during this time can be viewed as its first version (Web1).

As social media platforms and online businesses began to emerge, the internet transformed into its next iteration - the
Web2. This upgraded internet, which we use today, features dynamic, interactive web pages,
where users can read and write information and publish their own for others to see. However, this
version of the web comes with downsides, dealing with data control, privacy issues, and the
consequences of trusting centralized entities storing our data on their servers. This is where Web3
comes into the picture.

Web3 is transforming applications hosted on centralized infrastructure into decentralized applications (dApps) powered by trust-free blockchain
protocols. The goal is to transform the internet into a decentralized web, where users control their
data and identity in a trust-free environment. The Web3 movement aims to remove intermediaries and
build trustless infrastructure. Web3 is an interactive and collaborative web where users can read,
write, and **own** data.

:::note The Web3 Movement

To learn more about the Web3 movement, check out this video from the
[Web3 Summit](https://youtu.be/l44z35vabvA)

:::

## Data Ownership

In web3, ownership is achieved and validated through cryptography. Each user has a digital identity bound to a set
of cryptographic keys usually based on the public key cryptographic scheme, i.e., the famous **public
and private key pair**.

Unlike Web2 which is driven by email IDs, phone numbers, and passwords, users onboarding to Web3 just need to generate a key pair. The public key can be the identity that can be
shared with anybody to send you messages or assets, while the private key is used to access your account, sign
messages, transfer funds, edit identity details, etc. [Keeping your private key secure](./scams.md)
is essential to avoid identity theft or consequent loss of funds. Currently, It is one
of the main factors hindering web3 adoption. No legitimate person or entity will ever ask you to share your private key, and
those who attempt to do so are likely trying to steal your digital identity and anything you own related to
it.

To mitigate risks of key mismanagement (for **non-custodial** accounts, i.e. when you have custody
of your keys) there are [account abstraction](../learn/learn-account-abstraction.md) solutions that
separate the key management from the user experience. To mitigate key hacks, there are cold wallet
solutions where the private key is generated and stored on dedicated devices with secure elements that are not exposed to the
internet (see [Ledger](./ledger.md)), or dedicated applications that can be installed on air-gapped
devices such as phones (see [Polkadot Vault](./polkadot-vault.md)). For **custodial** accounts, you
trust third parties to manage your keys and give you access whenever needed.

To summarize, data ownership comes from the fact that any message you sign with your private key comes
from your digital identity, and the signature proof can be cryptographically verified. Unless
someone else stole your keys, you and only you are held accountable for signing the messages and are responsible for the information on your account. Transferring an [NFT](./learn-nft-index) between two accounts is
essentially a transfer of ownership.

## Trustless Environment

Cryptography also brings the possibility of building a trustless environment where we do not have to
trust third parties, or have any relationship between the sender and receiver of a message. We do
not need to trust centralized entities since we can verify who wrote the message and who owns what
just by using cryptography. Trust is embedded in the code. Well-audited and reviewed code
ultimately provides a solid, trustless environment.

## Data Immutability

But what if the data we own can be easily modified or tampered with after they have been signed and
stored?

Here is where **blockchain** plays an important role. Blockchains are distributed state machines
where increments of data are stored within blocks that build on each other using hash functions. For
example, the hash of block `N + 1` contains data of that block together with the hash of the
previous block `N`. This creates the situation where if you modify the content of block `N` you will
change the hash of block `N + 1`, `N + 2`, etc. You will need to modify quite a lot of data, and in
proof-of-stake blockchains like {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} such
attack is financially expensive, and attempting to do it will get you
[slashed](../learn/learn-staking-advanced.md#slashing).

So, with blockchain as a means of storing data permanently without any option to modify them, we can
ensure that what we sign with our digital identity will not be modified.

## Data Availability

But what if our data are stored in a blockchain, but that blockchain is run on a centralized server
or by different computers belonging to the same operator?

That server or those computers can be easily shut down, the blockchain can be stopped from running
and its data wiped out. This can be achieved from the inside by the malicious network participants
or from the outside by regulatory rules and other forces. So, we would own our data, which would be
immutable because stored on a blockchain, but that blockchain would be easily stopped. There would
be little sense in owning something that can easily cease to exist in the future.

Data availability is dependent on how resilient the blockchain is. Resiliency is achieved through
elements such as decentralization, economic incentives, and on-chain governance to ensure the
network can run and upgrade on its own.

### Decentralization

Having multiple nodes belonging to numerous independent identities increases network resiliency and
thus data availability.

Blockchain is a state machine, and consensus must be achieved on one and only one possible state
transition. Having an overly decentralized network will create a situation in which consensus is
reached after an extended period, and energy might be wasted to unnecessarily run nodes that add
little resiliency and slow down network throughput. A trade-off between a few centralized nodes and
too many of them must be considered.

Nowadays, most of the nodes are not run at people's homes. Equipment is rented through service
providers. Resiliency is also achieved by ensuring nodes run on as many different providers as
possible and avoiding a significant share of the nodes being run under the same provider in the same
country. A legislation change could undermine a big fraction of the nodes and potentially stop the
network. {{ polkadot: Pokadot :polkadot }}{{ kusama: Kusama :kusama }} level of decentralization can
be explored through the [Polkawatch app](https://polkawatch.app/).

The [One Thousand Validator Programme](./thousand-validators.md) aims to incentivize the creation of
new validator nodes to increase the level of node decentralization.

### Decentralized Storage

[Blockspace](./glossary/#blockspace) is limited and valuable. Not all data we have can be stored on
the blockchain. Large files like pictures, music, movies, etc., will never be held on the
blockchain. But where can we stored those files? To stick to the web3 vision, we need a resilient
and decentralized storage solution.

The most important thing is that the proof of ownership is stored on the blockchain.

Conversely, large files and their metadata can be uploaded on decentralized storage networks such as
IPFS. The Polkadot parachain Crust also provided a similar storage solution.

### Stake Allocation

In Proof-of-Stake blockchains, security is dictated by how much stake is locked on-chain (financial
security). In a decentralized network, you want to ensure that the difficulty level for a financial
attack to happen is equal across all nodes.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s
[election algorithm](../learn/learn-phragmen.md) makes sure that the stake is maximized across all
active validators, and the variance in stake across validators is minimized as much as possible.

### Economic Incentives

Strong incentives are essential to avoid spam attacks and incentivize network participants to run
nodes and secure the network. Strong incentives are possible because blockchain is a trustless
system where there are no intermediaries between who sends a message and who receives it. Such
incentives, coupled with punishment for bad behavior, ensure that most of the participants make the
interest of the network and work together to improve it.

But from where are those incentives coming from? Polkadot's native token
[DOT is inflationary](../learn/learn-inflation.md). Inflation is used to pay validators for running
nodes and reward nominators for providing the necessary stake to secure the network. Depending on
the staking rate, part of the inflation is diverted to the treasury.

### Governance and Treasury

In {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} an on-chain
[treasury](../learn/learn-polkadot-opengov-treasury.md) together with an
[open governance](../learn/learn-polkadot-opengov.md) model allow to access funds in a fully
decentralized manner without any bank transaction whatsoever. This opens up the possibility to come
to a decision through on-chain voting mechanism, promoting a sense of community and creating an
independent socio-economical environment.

## Decentralized Access Points

But what if we have data we own stored on a resilient blockchain, but the only way to access the
blockchain is through an RPC server? Whoever is behind the server or an attacker could present us
data that is not the truth. How can we trustlessly verify that the data is true?

Here is where light clients play a key role. Light clients are clients that can sit on a web browser
and can fetch data directly from blockchain full nodes and verify such data using other nodes.

The figure below shows the architectural difference between web2 and web3 applications.

![light-clients](../assets/light-clients.png)

In web2 applications, data are stored on a centralized server, while in web3 applications, data (or
better data proofs) are stored on the blockchain. With light clients, we can access blockchain data
through a full node and verify the validity of such data by synching to other nodes. In this way, we
can always verify that the data we see is the truth, which is done automatically by the light
client. Polkadot has a browser-embedded light client
[Substrate connect](../build/build-substrate.md) that uses the
[smoldot](https://github.com/smol-dot/smoldot) codebase. Most web3 applications today access
blockchain data through a centralized RPC server.

## Interoperability

But what if we create our identity under one blockchain, one specific consensus? Wouldn't it be
helpful to use that identity under different consensuses? Transferring information and economic
value is key to achieving the web3 vision of having a collaborative and trustless internet. Polkadot
provides secure interoperability through [XCM](../learn/learn-xcm.md) and
[XCMP](../learn/learn-xcm-transport.md) to all blockchains attached to it. For more information, see
the [Polkadot 1.0 page](./polkadot-v1.md).
