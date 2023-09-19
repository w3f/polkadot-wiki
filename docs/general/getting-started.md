---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
description: Get started with Polkadot and Web3.
keywords: [introduction, getting started, what is polkadot, why polkadot]
slug: ../getting-started
---

import RPC from "./../../components/RPC-Connection";

:::info Welcome to the Polkadot Wiki

The Polkadot Wiki serves as the central source of truth for Polkadot. It is a community-focused
initiative led by Web3 Foundation to keep an up-to-date resource on the best information for
learning, building, and maintaining on Polkadot.

The Wiki has three main sections: [**Learn**](./learn-index) (for learners),
[**Build**](../build/build-index.md) (for people that want to build on Polkadot), and
[**Maintain**](../maintain/maintain-index.md) (for people that want to maintain the network).

:::

## Interact with Polkadot

<tr class="cards-container">
  <td>
    <a class="guide-link" href="../docs/learn-account-generation">
      <img src="/img/polkadot-guide/Account.jpg" alt="Drawing" width="250" height="150"/>
        <div class="cards-body">
            <h5 class="cards-title">Creating an Account</h5>
        </div>
    </a>
  </td>
  <td>
    <a class="guide-link" href="../docs/learn-balance-transfers">
      <img src="/img/polkadot-guide/Transfer.jpg" alt="Drawing" width="250" height="150"/>
        <div class="cards-body">
            <h5 class="cards-title">Balance Transfers</h5>
        </div>
    </a>
  </td>
  <td>
    <a class="guide-link" href="../docs/learn-staking">
      <img class="guide-image" src="/img/polkadot-guide/Stake.jpg" alt="Drawing" width="250" height="150" />
              <div class="cards-body">
                  <h5 class="cards-title">Staking</h5>
              </div>
    </a>
  </td>
</tr>

<br />

<tr class="cards-container">
  <td>
    <a class="guide-link" href="../docs/learn-parachains">  
      <img class="guide-image" src="/img/polkadot-guide/Parachain.jpg" alt="Drawing" width="250" height="150"/>
              <div class="cards-body">
                  <h5 class="cards-title">Parachains</h5>
              </div>
    </a>
  </td>
  <td>
    <a class="guide-link" href="../docs/learn-bridges">  
      <img class="guide-image" src="/img/polkadot-guide/Bridges.jpg" alt="Drawing" width="250" height="150"/>
              <div class="cards-body">
                  <h5 class="cards-title">Bridges</h5>
              </div>
    </a>
  </td>
  <td>
    <a class="guide-link" href="../docs/learn-polkadot-opengov">  
      <img class="guide-image" src="/img/polkadot-guide/Council.jpg" alt="Drawing" width="250" height="150"/>
              <div class="cards-body">
                  <h5 class="cards-title">Polkadot OpenGov</h5>
              </div>
    </a>
  </td>
</tr>

<br />

<tr class="cards-container">
  <td>
    <a class="guide-link" href="../docs/learn-identity">
      <img class="guide-image" src="/img/polkadot-guide/Identity.jpg" alt="Drawing" width="250" height="150"/>
              <div class="cards-body">
                 <h5 class="cards-title">Set an Identity</h5>
              </div>
    </a>
  </td>
  <td>
    <a class="guide-link" href="../docs/learn-proxies">
      <img class="guide-image" src="/img/polkadot-guide/Proxy.jpg" alt="Drawing" width="250" height="150"/>
              <div class="cards-body">
                  <h5 class="cards-title">Proxy Accounts</h5>
              </div>
    </a>
  </td>
  <td>
  <a class="guide-link" href="../docs/ambassadors">  
    <img class="guide-image" src="/img/polkadot-guide/Ambassadors.jpg" alt="Drawing" width="250" height="150"/>
            <div class="cards-body">
                <h5 class="cards-title">Become an Ambassador</h5>
            </div>
  </a>
  </td>
</tr>

<br />

## What is Polkadot?

Polkadot is the first layer-0 (L0) blockchain that provides shared security and secure
interoperability to layer-1 (L1) blockchains. Those L1 blockchain attached to Polkadot are also
called [parachains](../learn/learn-parachains.md) as their transactions are processed in parallel by
Polkadot. For more information about Polkadot see the dedicated page about the state of
[Polkadot 1.0](./polkadot-v1.md) released in mid 2023.

Polkadot has an on-chain [open governance](../learn/learn-polkadot-opengov.md) (also called Polkadot
OpenGov) to orchestrate decisions, including accessing funds from the
[treasury](../learn/learn-polkadot-opengov-treasury.md).

The DOT token gives you the power to participate in Polkadot OpenGov,
[staking](../learn/learn-staking.md), and [parachains' crowdloans](../learn/learn-crowdloans.md).

The level of abstraction and generalization of Polkadot allows to build applications that are
specific to their use cases, and for those applications to communicate securely leveraging each
other value proposition. The trustless cooperation between applications is what makes Polkadot an
ideal ecosystem to build a web3 future.

See the videos below to know more about Polkadot.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_-k0xkooSlA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/BQ60bTU1bPg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What can I do with my DOT?

[DOT](../learn/learn-DOT.md) is the native token of the Polkadot Network. DOT can be used for
transaction fees, staking, governance, acquisition of a parachain slot and for enabling several key
functionalities on Polkadot.

- {{ polkadot: __<RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={10000000000} filter="humanReadable"/>:__ :polkadot }}
  the minimum balance required to have an active account on Polkadot Network. If your account
  balance drops below the minimum, your account will be reaped. Learn more about
  [Accounts](../learn/learn-accounts.md) and the
  [Existential Deposit](../build/build-protocol-info.md#existential-deposit) requirement.

- {{ polkadot: __<RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable"/>:__ :polkadot }}
  the minimum contribution required to join a [nomination pool](../learn/learn-nomination-pools.md)
  and earn staking rewards for contributing to the security of the network. Learn more about
  [nomination pools](../learn/learn-nomination-pools.md).

- {{ polkadot: __<RPC network="polkadot" path="consts.crowdloan.minContribution" defaultValue={50000000000} filter="humanReadable"/>:__ :polkadot }}
  the minimum contribution required to participate in [crowdloans](../learn/learn-crowdloans.md) for
  [parachain slot auctions](../learn/learn-auction.md).

- **Around 20 DOT**:

  - {{ polkadot: __<RPC network="polkadot" path="consts.identity.basicDeposit" defaultValue={202580000000} filter="humanReadable"/>:__ :polkadot }}
    register an [on-chain identity](../learn/learn-identity.md)
  - {{ polkadot: __<RPC network="polkadot" path="consts.proxy.proxyDepositBase" defaultValue={200080000000} filter="humanReadable"/>:__ :polkadot }}
    create a [proxy account](../learn/learn-proxies.md).

- {{ polkadot: __<RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={2500000000000} filter="humanReadable"/>:__ :polkadot }}
  the minimum stake required to submit your intent to directly nominate validators.
- {{ polkadot: __<RPC network="polkadot" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/>:__ :polkadot }}
  the minimum amount of DOT required to become an active nominator and earn rewards, i.e. the
  minimum active bond. To increase the chance of earning staking rewards, your stake should not be
  less than the minimum stake among the active nominators, which is a dynamic threshold. If you have
  lesser DOT than the minimum active nomination, please consider contributing to
  [nomination pools](../learn/learn-nomination-pools.md). Learn more about
  [becoming a nominator](../learn/learn-nominator.md).

- {{ polkadot: __<RPC network="polkadot" path="query.nominationPools.minCreateBond" defaultValue={5000000000000} filter="humanReadable"/>:__ :polkadot }}
  you can create your own [nomination pool](../learn/learn-nomination-pools.md).

DOT has utility in [Polkadot's democracy](../maintain/maintain-guides-democracy.md). Bonding DOT is
a requirement to create proposals, to endorse them and to vote on them when they become referendums.
Bonding
{{ polkadot: <RPC network="polkadot" path="consts.treasury.proposalBondMinimum" defaultValue={1000000000000} filter="humanReadable"/> :polkadot }}
or 5% of requested funding is a requirement to make a
[treasury proposal](../learn/learn-treasury.md#creating-a-treasury-proposal). DOT can also enable
you to participate in programs like the
[Thousand Validators Program](../general/thousand-validators.md#polkadot).

## Polkadot Gifts

<img align="right" src="/img/polkadot-gift.png" width="210" height="200"/>

Polkadot Gifts provide an easy way to:

- Onboard friends or family who are curious about blockchain but haven’t made the leap yet.
- Share your love of Polkadot and send any amount of DOT.
- Say ‘thank you’ or send someone tokens when you don’t know their address.
- Get friends and family set up to participate in crowdloans.

Learn more about how you can create and send Polkadot Gifts
[here](https://polkadot.network/blog/introducing-polkadot-kusama-gifts/).

## Why should you use Polkadot?

Whether you're a blockchain developer or if you're interested in taking part of
[Polkadot's community](https://polkadot.network/polkadot-ambassador-program/), Polkadot offers a
platform for everyone. This wiki offers a place for builders and maintainers to utilize
[tools](../build/build-tools-index.md) and for brand-new learners to dive into educational material.

## Where to start learning?

For brand-new learners of Blockchain technology:

- The
  [Blockchain Fundamentals MOOC course](https://mooc.web3.foundation/course/blockchain-fundamentals/)
  is a great introduction to start familiarizing yourself with blockchain concepts such as
  cryptography and networks, and how these play into things like decentralization and
  cryptocurrency.

This is recommended for users with backgrounds of all levels, and the course is free!

### Brand-New Polkadot learners

- [Polkadot's original white paper](https://polkadot.network/PolkaDotPaper.pdf) is a technical
  summary around one possible direction of implementing the Polkadot network. This paper uses
  rationale and technical details to support why this direction is beneficial. This original white
  paper also explains how Polkadot's core components work together to build this decentralized
  network.
- [Polkadot's overview paper](https://github.com/w3f/research/blob/master/docs/papers/OverviewPaper-V1.pdf)
  is an updated version of the white paper that describes the protocol in more technical terms. We
  would recommend reading this overview paper if you are interested in digging more into the
  protocol itself.
- [Polkadot's light paper](https://polkadot.network/Polkadot-lightpaper.pdf) is a visual, easy to
  read, and less technical introduction into its blockchain technology. This paper dives into the
  components of Polkadot but is understandable for both a non-technical and technical reader.
- [Polkadot for Beginners: A non-technical guide to decentralization, blockchains & Polkadot](https://linktr.ee/polkadotbook) -
  a book funded by the Polkadot Treasury
- [Polkadot's specification](https://github.com/w3f/polkadot-spec) is a GitHub repository that holds
  the latest Polkadot Host protocol specification, Polkadot's specification tests of the many
  components of the network, and the Polkadot Runtime specification. This repo holds algorithms and
  explores how various processes function in the Polkadot network. The Polkadot specification takes
  Polkadot's ideas and concepts from the light and the white paper but focuses on the technical
  specs of the technology.
- [Watching the Technical Explainer Videos](https://www.youtube.com/watch?v=mNStMPZjiHM&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8):
  These are great introductory videos that explain and demonstrate how to use Polkadot and its
  [User Interface](https://polkadot.js.org/apps/).
- Reading
  [What is Polkadot? A Brief Introduction](https://medium.com/polkadot-network/what-is-polkadot-a-brief-introduction-ca3eac9ddca5)
  on Medium. There are also other great articles to read on
  [Polkadot's Medium](https://medium.com/polkadot-network) or
  [Web3 Foundation's Medium](https://medium.com/web3foundation).

For brand-new learners of Kusama, Polkadot's canary cousin network: To learn more about how to build
and maintain on the Kusama network, please head over to our
[Kusama Guide](https://guide.kusama.network/).

## Resources

- [Polkadot Crowdcast](https://www.crowdcast.io/polkadot) - List of all Crowdcast webinars that the
  Web3 Foundation has done.
- [Polkadot Explorer](https://polkadot.js.org/apps/#/explorer) - Browser for the Polkadot network;
  can be used for Polkadot, Kusama, or any Substrate-based chain.
- [Polkascan](http://polkascan.io/) \- Real-time multi-chain data for Polkadot Relay Chain and
  Parity Substrate chains.
- [Subscan.io](https://subscan.io) - Explorer for Substrate based chains.
- [Polkadot Overview](https://youtu.be/lIghiCmHz0U) - Dr. Gavin Wood presents an overview of
  Polkadot. (Video)
- [Polkadot Overview](https://techcrunch.com/video/fireside-chat-with-jutta-steiner-parity-technologies/) -
  Dr. Jutta Steiner presents Polkadot. (Video)
- [Polkadot & Substrate Overview](https://www.youtube.com/watch?v=0IoUZdDi5Is&feature=youtu.be) -
  Dr. Gavin Wood presents Substrate (blockchain in-a-box + VM) and Polkadot, and builds a blockchain
  on-stage in 30 minutes using Substrate. (Video)
- [Community / Ecosystem](community.md) - List of community rooms and channels to talk to others
  about Polkadot.
- [Sample Applications](#) - Sample applications that are built on or currently being built for
  Polkadot.
- [Contributing Guide](contributing.md) - Rules for contributing to the wiki.
- [Polkadot Knowledge Base](https://support.polkadot.network/) - Troubleshooting resources for
  specific errors and problems.
