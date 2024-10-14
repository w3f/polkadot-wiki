---
id: learn-crowdloans
title: Parachain Crowdloans
sidebar_label: Parachain Crowdloans
description: Polkadot's Crowdloans and How to Participate.
keywords: [crowdloans, parachains, lending, auction]
slug: ../learn-crowdloans
---

import MessageBox from "../../../components/MessageBox"; import
"../../../components/MessageBox.css";

<MessageBox message="The content on this page is archived. [Agile Coretime](../learn-agile-coretime.md) is activated on the network, and crowdloans have been deprecated. For decentralized, transparent, and regulatory-compliant fundraising within the ecosystem, check out the [Polimec parachain](https://www.polimec.org/)." />

Polkadot allows parachains to source tokens for their parachain bids in a decentralized crowdloan.

:::note Contributing to a crowdloan

If you are here for guidance on how to contribute to a crowdloan, watch the video below or read this
[support article on crowdloans](https://support.polkadot.network/support/solutions/articles/65000177341-how-to-participate-in-crowdloans-on-polkadot-or-kusama).

:::

<div className="row">
  <div className="col text--center">
    <a href="https://youtu.be/AA9mPANmzmU">
      <img src="https://img.youtube.com/vi/AA9mPANmzmU/0.jpg" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="https://youtu.be/AA9mPANmzmU">Crowdloans on Polkadot-JS</a>
    </p>
  </div>
</div>

:::note Testing on Rococo

For information on how to participate in the crowdloan and parachain auction testing on Rococo,
please see the
[Rococo content](../../build/build-parachains.md##testing-a-parachains:-rococo-testnet)

:::

## Crowdloan Campaigns vs Parachain Auctions

It is important to recognize that starting a crowdloan campaign is **optional** for participating in
a parachain slot auction. The parachain slot auction can also be won directly through self-funding
without community involvement. To reiterate, crowdloan campaigns are just one of the means to win
auctions, which allow the community to participate in a trustless and permissionless way.

Let's look at a scenario where Project A is bidding for a parachain slot, but they don't have enough
tokens to bid directly to win the parachain auction. Project A could benefit from starting a new
crowdloan campaign to help secure a parachain slot. Crowdloans are trustless and are supported
natively on the relay chain, allowing the community to bond their tokens on Project A's behalf for
the entire parachain lease duration. This will allow Project A to compete with projects that may
have access to greater capital, given the project has sufficient community support. In return, the
community contributors are rewarded by the projects that win the parachain slot, which would
compensate for the opportunity cost of bonding their tokens for the lease duration.

On the other hand, let's say Project B, which is more established and has access to capital, is
hoping to secure a parachain slot through self-funding. Project B is not relying on community
funding (at least via the crowdloan mechanism), so they must determine how much funding they can
allocate towards winning a slot.

Project B fully controls how much they are willing to contribute to gaining a parachain slot.
Project B need not work on creating a reward model for community contributors like Project A. In
contrast, crowdloan campaigns benefit projects with access to limited capital but have strong
community support. They are also beneficial for projects that can successfully bid to win the
auction with self-funding but are looking for a mechanism to bootstrap their community and get
noticed by the key actors in the ecosystem.

It is publicly visible on-chain whether or not a project is bidding directly or through a crowdloan
campaign. More details regarding creating and executing a crowdloan campaign are provided below.

## Starting a Crowdloan Campaign

Anyone who has registered a parachain can create a new crowdloan campaign for a slot by depositing a
specified number of tokens. A campaign is configured as a range of slots (i.e. the duration of the
[parachain](../learn-parachains.md) will bid for), a cap, and a duration. The duration can last over
several auctions as long as the range of slots matches those of the auction (i.e. the first lease
period of the crowdloan is the same or bigger than that of the auction). This means a team will not
need to restart the campaign just because they do not secure a slot on their first attempt.

:::info Crowdloan Submission Deposit Required

To create a new crowdloan campaign, your account must have 500 DOT (or 100 KSM on Kusama)
transferrable which will be reserved for the duration of the crowdloan.

:::

When setting the parameters of a crowdloan campaign, consider the following:

- A crowdloan campaign can start well before the auction slot is opened.
- The campaign creation form requires setting a crowdloan cap &mdash; the maximum amount a campaign
  can collect. A team can still win an [auction](./learn-auction.md) if the cap is not reached.
- Set the desired end of the crowdloan in the "Ending block" field. This helps ensure that the
  crowdloan is live during the entire auction. For example, if an auction starts in three days and
  lasts five days, you should set your crowdloan to end in 10 days or a similar timescale.
- One way of calculating the ending block number is adding: `(10 * 60 * 24 * 7) * (x * 6) + y`

  - `x` is the number of auction periods you want the crowdloan to continue for
  - `y` is the current block number

  - `(Blocks/Min * Min/Hour * Hour/Day * Day/Week) * (x[Period] * Week/Period) + y[BlockNumber]`

  - "First period" field refers to the first period you want to bid for. If the current auction
    encompasses periods `(3, 4, 5, 6)`, your first period can be at least `3`. The last slot must
    also be within that range.
  - You can only cancel an ongoing crowdloan if no contributions have been made. Your deposit will
    be returned to you.

Before the start of the crowdloan campaign, the owner will upload the parachain data. Once the
crowdloan is live, **the parachain configuration will be locked** and will be deployed as the
parachain's runtime. Of course, once the parachain is running, it can always change via runtime
upgrades (as determined through its local governance).

## Supporting a Crowdloan Campaign

### Contributing to Crowdloans

:::info Minimum Crowdloan Contribution

There is a
[minimum balance for contributions for a crowdloan campaign](../../general/chain-state-values.md#minimum-crowdloan-contribution).
This is to make crowdloans as accessible as possible while maintaining a balance to justify using
the network's resources.

:::

Each created campaign will have an index. Once a crowdloan campaign is open, anyone can participate
by sending a transaction referencing the campaign's index. Tokens used to participate must be
transferable &mdash; that is, not locked for any reason, including staking, vesting, and governance
&mdash; because they will be moved into a module-controlled account that was generated uniquely for
this campaign. See [system accounts](../learn-account-advanced.md#system-accounts) for more
information.

:::caution Do not send Crowdloan contributions directly to the Parachain address

All crowdloan contributions are handled by the Crowdloan module’s logic, where a campaign is
identified by an index, not by address. **Never transfer tokens to an address in support of a
campaign**.

:::

It is up to individual parachain teams to decide if and how they want to reward participants who
forgo staking and choose to lock their tokens in support of the parachain’s campaign. As one can
imagine, rewards will take many forms and may vary widely among projects.

If a crowdloan campaign is successful, that parachain will be on-boarded to the relay chain. The
collective tokens will be locked in that parachain's account for the entire duration that it is
active.

### Withdraw Crowdloaned Tokens

Participants will be able to reclaim their tokens in one of two ways:

- If the campaign succeeds, the parachain will enter a retirement phase at the end of its lease.
  During this phase, participants can withdraw the tokens with which they participated.
- If the campaign is unsuccessful, this retirement phase will begin at its configured end, and
  participants can likewise withdraw their tokens.

:::tip `crowdloan.contribute` extrinsic is trustless

Contributing to a crowdloan through Polkadot JS Apps (which uses `crowdloan.contribute` extrinsic)
guarantees that you receive your tokens after the campaign ends. If you intend to contribute through
other websites and custodial service providers like central exchanges, review their terms and
conditions thoroughly and assess the associated risks.

:::

Note: When the lease periods won by the crowdloan have finished, or the crowdloan has ended without
winning a slot, anyone can trigger the refund of crowdloan contributions back to their original
owners. This can be done through the permissionless `crowdloan.refund` extrinsic available on
Polkadot JS Apps > Developer > Extrinsics page, by specifying the parachain ID. This extrinsic may
need to be issued multiple times if the list of contributors is too long. All contributions must be
returned before the crowdloan is entirely deleted.

![Crowdloan refund](../../assets/crowdloan-refund.png)

Many projects will have dashboards that allow users to participate in their crowdloans. PolkadotJS
apps also offer a breakdown of ongoing crowdloans on the
[Apps page](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.polkadot.io#/parachains/crowdloan).

Here is an example of the crowdloans in play during the very first Kusama auction.

![crowdloan dashboard](../../assets/kusama-crowdloans.png)

Furthermore, check out this video on
[How to Participate in Crowdloans](https://www.youtube.com/watch?v=YrTxDufrcQM) for steps on how to
access available crowdloans on PolkadotJS apps.
