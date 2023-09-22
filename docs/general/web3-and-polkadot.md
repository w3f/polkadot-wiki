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
internet during this time was also called the Web1.

As social media platforms and online businesses began to emerge, the internet transformed into the
Web2. This upgraded internet, which we still use today, features dynamic, interactive web pages,
where users can read and write information, publish their own for others to see. However, this
version of the web comes with downsides, dealing with data control, privacy issues, and the
consequences of trusting centralized entities storing our data in their servers. This is where Web3
comes into the picture.

Web3 is taking centralized infrastructure and applications and turning them into decentralized,
trust-free protocols. The goal is to transform the internet into a decentralized web, where users
control their own data and identity in a trust-free environment. The Web3 movement aims to remove
intermediaries and build trustless infrastructure. Web3 is an interactive and collaborative web
where users can read, write and **own** data.

:::note The Web3 Movement

To learn more of the Web3 movement, check out this video from the
[Web3 Summit](https://youtu.be/l44z35vabvA)

:::

## Data Ownership

In web3, ownership is achieved through cryptography. Each user has a digital identity bound to a set
of cryptographic keys usually based on the public key cryptographic scheme, i.e. the famous **public
and private key pair**.

Users onboarding into the web3 must generate a key pair. The public key is the identity that can be
shared with anybody to send you messages, while the private key is used to access your account, sign
messages, transfer funds, edit identity details, etc. [Keeping your private key secure](./scams.md)
from third parties is essential to avoid identity theft with consequent loss of funds, and it is one
of the main factors hindering web3 adoption. Nobody will ever ask you to share your private key, and
who will attempts to do so will likely attempt to steal your digital identity and anything you own
related to it.

To mitigate risks of key mismanagement (for **non-custodial** accounts, i.e. when you have custody
of your keys) there are account abstraction solutions that separate the key management from the user
experience. To mitigate key hacks there are cold wallet solutions where the private key is generated
on dedicated devices that cannot connect to the internet (see [Ledger](./ledger.md)), or dedicated
applications that can be installed on air-gapped devices such as phones (see
[Polkadot Vault](./polkadot-vault.md)). For **custodial** accounts you trust third parties to manage
your keys and give you access to them whenever you need.

To sum up, data ownership comes from the fact that any message you sign with your private key comes
from your digital identity, and the signature proof can be cryptographically verified. Unless
someone else stole your identity, you and only you signed that message and own or are responsible
for the information in it. Transferring an [NFT](./learn-nft-index) between two accounts is
essentially a transfer of ownership.

## Trustless Environment

Cryptography also brings the possibility to build a trustless environment where we do not have to
trust third parties, or have any kind of relationship between the sender and receiver of a message.
Since we can verify who wrote the message and who owns what just using cryptography, we do not need
trust centralized entities. The trust is essentially embedded in the code. Well-audited and reviewed
code will ultimately provide a solid trustless environment.

## Data Immutability

But what if the data we own can be easily modified or tampered after they have been singed and
stored?

Here is where **blockchain** plays and important role. In fact, blockchains are essentially
databases where data are stored within blocks concatenated using hash functions, where for example
the hash of block `N + 1` contains data of that block together with the hash of the previous block
`N`. This creates the situation where if you modify the content of block `N` you will change the
hash of block `N + 1`, `N + 2`, etc. You will need to modify quite a lot of data, and in
proof-of-stake blockchains like {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} such
attack is financially expensive, and attempting doing it will get you
[slashed](../learn/learn-staking-advanced.md#slashing).

So, with blockchain as a mean of storing data permanently without any option to modify them we can
make sure that what we sign with our digital identity will not be modified in the future.

## Data Availability

But what if our data are stored into a blockchain, but that blockchain is run on a centralized
server or by different computers belonging to the same operator?

That server or those computers can be easily shut down, the blockchain can be stopped from running
and its data wiped out. This can be achieved from the inside by the malicious network participants
or from the outside by regulatory rules and other forces. So, we would own our data, those data
would be immutable because stored on a blockchain, but that blockchain would be easily stopped.
There would little sense in owning something that in the future can easily cease to exist.

Data availability is dependent on how resilient the blockchain is. Resiliency is achieved through
decentralization, economic incentives, on-chain governance, and on-chain treasury funds to ensure
the network can run and upgrade on its own.

### Decentralization

Having multiple nodes belonging to multiple independent identities increases network resiliency, and
thus data availability.

Blockchain is a state machine and ultimately consensus must be achieved on one and only one possible
state transition. Having an overly decentralized network will creates the situation in which
consensus is achieved after a long period of time, and energy might be wasted to unnecessarily run
nodes that add little resiliency and slow down network throughput. A trade-off between few
centralized nodes and too many of them must be considered. But this is only a small piece of the
puzzle.

Nowadays, most of the nodes are not run at people's homes. Equipment is rented through service
providers. Resiliency is also achieved by making sure nodes runs on as many different providers as
possible, and avoid that a big share of the nodes is run under the same provider, maybe in the same
country. A legislation change could undermine a big fraction of the nodes, and potentially stop the
network. {{ polkadot: Pokadot :polkadot }}{{ kusama: Kusama :kusama }} level of decentralization can
be explored through the [Polkawatch app](https://polkawatch.app/).

The [One Thousand Validator Programme](./thousand-validators.md) aims to incentivize the creation of
new validator nodes to increase the level of node decentralization.

### Stake Allocation

In Proof-of-Stake blockchains security is dictated by how much stake is locked on-chain (financial
security). In a decentralized network you want to make sure that the level of difficulty for a
financial attack to happen is equal across all nodes.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s
[election algorithm](../learn/learn-phragmen.md) makes sure that the stake is maximized across all
active validators, and the variance in stake across validators is minimized as much as possible.

### Economic Incentives

Strong economic incentives promote good behavior and punish malicious one through game theory.
Strong incentives are important to avoid spam attacks and to incentivize network participants for
running nodes and securing the network. Strong incentives are possible because blockchain is a
trustless system where there are no intermediaries between who sends a message and who receives it.
Such incentives coupled with punishment for bad behaviour ensure that most of the participants make
the interest of the network and work together to improve it.

### Governance and Treasury

An on-chain [treasury](../learn/learn-polkadot-opengov-treasury.md) together with an
[open governance](../learn/learn-polkadot-opengov.md) model allow to access funds in a fully
decentralized manner without any bank transaction whatsoever. This opens up the possibility to come
to a decision through on-chain voting mechanism, promoting a sense of community and creating an
independent socio-economical environment.

## Decentralized Access Points

But what if we have data we own stored on a resilient blockchain, but the only way to access the
blockchain is through an RPC server? Whoever is behind the server or an attacker could present us
data that are not the truth. We put trust in the server provider that the data we see are the truth.
How can we verify that the data are indeed the truth without trusting anybody?

Here is where light clients play a key role. Light clients are clients that can sit on a web browser
and are able to fetch data directly from blockchain nodes.

![light-clients](../assets/light-clients.png)

## Interoperability

But what if we create our identity

Cooperation

## Conclusions
