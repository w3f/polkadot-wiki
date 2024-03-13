---
id: kusama-getting-started
title: Interact with Kusama
sidebar_label: Home
description: Reference point for Kusama content.
keywords: [getting started, introduction, kusama, interact]
slug: ../../kusama-getting-started
---

import RPC from "./../../../components/RPC-Connection";

### Polkadot's Canary Network

Kusama is a _canary network_ for Polkadot; an earlier release of the code that is available first
and holds real economic value. For developers, Kusama is a proving ground for runtime upgrades,
on-chain governance, and parachains.

:::info No Promises

Kusama is owned by those who hold the Kusama tokens (KSM). There's no central kill switch and all
changes are made through the protocol's on-chain governance.

The network is a permissionless and anyone can come along and start using it. Those who participated
in the Polkadot sale can claim a proportional amount of KSM through the
[Kusama Claims process](kusama-claims).

Kusama is experimental. **Expect Chaos**.

:::

:::tip As a KSM holder

You can interact with all the features of the Kusama network such as staking (i.e. validating or
nominating), governance, parachain auctions, basic transfers and everything else.

:::

<div className="row">
  <div className="col text--center">
    <a href="../docs/learn-accounts">
      <img src="/img/kusama-guide/Creating an account.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/learn-accounts">Accounts</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="../docs/learn-transactions">
      <img src="/img/kusama-guide/Balance Transfers.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/learn-transactions">Transactions</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="../docs/learn-staking">
      <img src="/img/kusama-guide/Staking.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/learn-staking">Staking</a>
    </p>
  </div>
</div>

<div className="row">
  <div className="col text--center">
    <a href="../docs/learn-polkadot-opengov">
      <img src="/img/kusama-guide/Polkadot OpenGov.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/learn-polkadot-opengov">Polkadot OpenGov</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="../docs/learn-proxies">
      <img src="/img/kusama-guide/Proxy Accounts.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/learn-proxies">Proxy Accounts</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="../docs/learn-identity">
      <img src="/img/kusama-guide/Set an Identity.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/learn-identity">Account Identity</a>
    </p>
  </div>
</div>

<div className="row">
  <div className="col text--center">
    <a href="../docs/learn-parachains">
      <img src="/img/kusama-guide/Parachains.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/learn-parachains">Parachains</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="../docs/learn-bridges">
      <img src="/img/kusama-guide/Bridges.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/learn-bridges">Bridges</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="../docs/ambassadors">
      <img src="/img/kusama-guide/Become an Ambassador.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/ambassadors">Become an Ambassador</a>
    </p>
  </div>
</div>

<div className="row">
  <div className="col text--center">
    <a href="../docs/maintain-guides-how-to-nominate-polkadot/">
      <img src="/img/kusama-guide/Nominate.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/maintain-guides-how-to-nominate-polkadot/">Become a Nominator</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="../docs/learn-polkadot-opengov-treasury">
      <img src="/img/kusama-guide/Treasury.jpg" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/learn-polkadot-opengov-treasury">Treasury</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="../docs/maintain-guides-society-kusama">
      <img src="/img/kusama-guide/Kusama-Society.png" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="../docs/maintain-guides-society-kusama">Join Kappa Sigma Mu</a>
    </p>
  </div>
</div>

For brand-new learners of Kusama's cousin network, Polkadot, please head over to the
[Polkadot Wiki](https://wiki.polkadot.network/).

### What can I do with my KSM?

KSM is the native token of the Kusama Network. KSM can be used for transaction fees, staking,
governance, acquisition of a parachain slot and for enabling several key functionalities on Kusama.

- {{ kusama: __<RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333333333} filter="humanReadable"/>:__ :kusama }}
  the minimum balance required to have an active account on Kusama Network. If your account balance
  drops below the minimum, your account will be reaped. Learn more about
  [Accounts](../../learn/learn-accounts.md) and the
  [Existential Deposit](../../build/build-protocol-info.md#existential-deposit) requirement.

- {{ kusama: __<RPC network="kusama" path="query.nominationPools.minJoinBond" defaultValue={1666666650} filter="humanReadable"/>:__ :kusama }}
  the minimum contribution required to join a
  [nomination pool](../../learn/learn-nomination-pools.md) and earn staking rewards for contributing
  to the security of the network. Learn more about
  [nomination pools](../../learn/learn-nomination-pools.md).

- {{ kusama: __<RPC network="kusama" path="consts.crowdloan.minContribution" defaultValue={999999999000} filter="humanReadable"/>:__ :kusama }}
  the minimum contribution required to participate in [crowdloans](../../learn/learn-crowdloans.md)
  for [parachain slot auctions](../../learn/learn-auction.md).

- {{ kusama: __<RPC network="kusama" path="consts.identity.basicDeposit" defaultValue={333333333000} filter="humanReadable"/>:__ :kusama }}
  register an [on-chain identity](../../learn/learn-identity.md)

- {{ kusama: __<RPC network="kusama" path="consts.proxy.proxyDepositBase" defaultValue={666933332400} filter="humanReadable"/>:__ :kusama }}
  create a [proxy account](../../learn/learn-proxies.md).

- {{ kusama: __<RPC network="kusama" path="query.nominationPools.minCreateBond" defaultValue={1000000000000} filter="humanReadable"/>:__ :kusama }}
  you can create your own [nomination pool](../../learn/learn-nomination-pools.md).

- {{ kusama: __<RPC network="kusama" path="query.staking.minimumActiveStake" defaultValue={0} filter="humanReadable"/>:__ :kusama }}
  the minimum amount of KSM required to become an active nominator and earn rewards.

KSM has utility in [Kusama's OpenGov](../../learn/learn-polkadot-opengov.md). Bonding KSM is a
requirement to create proposals, to endorse them and to vote on them when they become referendums.
Bonding
{{ kusama: <RPC network="kusama" path="consts.treasury.proposalBondMinimum" defaultValue={666666666000} filter="humanReadable"/> :kusama }}
or 5% of requested funding is a requirement to make a
[treasury proposal](../../learn/learn-polkadot-opengov-treasury.md).

### Kusama Gifts

<img align="right" src="/img/kusama-guide/Gift.png" width="210" height="200"/>

Kusama Gifts provide an easy way to:

- Onboard friends or family who are curious about blockchain but haven’t made the leap yet.
- Share your love of Kusama and send any amount of KSM.
- Say ‘thank you’ or send someone tokens when you don’t know their address.
- Get friends and family set up to participate in crowdloans.

Learn more about how you can create and send Kusama Gifts
[here](https://polkadot.network/blog/introducing-polkadot-kusama-gifts/).

While Kusama does not support smart contracts natively, building apps on it is still possible (e.g.
[RMRK.app](https://rmrk.app)). If you're interested in diving deeper into _proper_ development,
however, check out the [builders guide](build-index).

Additional Resources:

- [mooc](https://mooc.web3.foundation/course/blockchain-fundamentals/)
- [medium](https://medium.com/polkadot-network/kusama-network-7446706b8f4c)
- [claims](kusama-claims)
- [endpoints](maintain-endpoints)
- [tokens](https://claim.kusama.network/)
- [validator](../../maintain/kusama/maintain-guides-how-to-validate-kusama.md)
- [nominator](../../maintain/maintain-guides-how-to-nominate-polkadot.md)
- [polkadot wiki](https://wiki.polkadot.network/)
