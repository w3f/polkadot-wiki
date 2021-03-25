---
id: learn-crowdloans
title: Parachain Crowdloans
sidebar_label: Parachain Crowdloans
---

{{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} allows parachains to source DOT for
their parachain bids in a decentralized crowdloan.

Anyone can create a new crowdloan campaign for a parachain
slot{{ kusama:  by depositing 10 KSM :kusama }}. A campaign is configured as a range of slots (i.e.
the duration the {{ polkadot: [parachain](learn-parachains) :polkadot }}
{{ kusama: [parachain](mirror-learn-parachains) :kusama }} will bid for), a cap, and a duration. The
duration can last over several auctions, meaning that the team will not need to restart the campaign
just because they do not secure a slot on their first attempt.

Each created campaign will have an index. Once a crowdloan campaign is open, anyone can participate
by sending a special transaction that references the campaign's index. Tokens used to participate
must be transferable &mdash; that is, not locked for any reason, including staking, vesting, and
governance &mdash; because they will be moved into a module-controlled account that was generated
uniquely for this campaign.

{{ kusama: On Kusama, the minimum contribution is 1 KSM. :kusama }}

> Important: All crowdloan contributions are handled by the Crowdloan module’s logic where a
> campaign is identified by index, not by address. **Never transfer tokens to an address in support
> of a campaign.**

It is up to individual parachain teams to decide if and how they want to reward participants who
forgo staking and choose to lock their tokens in support of the parachain’s campaign. As one can
imagine, rewards will take many forms and may vary widely among projects.

During some point of the crowdloan campaign the owner will upload the parachain data. Ideally, the
owner does this before soliciting contributions to the campaign so that the contributors can verify
it. The data can only be uploaded once during the course of the campaign and it will be what is
deployed as the parachain's runtime. Of course, once the parachain is running it can always change
via runtime upgrades (as determined through its own local governance).

If a crowdloan campaign is successful, that parachain will be on-boarded to the Relay Chain. The
collective tokens will be locked in that parachain's account for the entire duration that it is
active.

Participants will be able to reclaim their tokens in one of two ways:

- If the campaign was successful, then the parachain will enter a retirement phase at the end of its
  lease. During this phase, participants can withdraw the tokens with which they participated.
- If the campaign was not successful, then this retirement phase will begin at the campaign's
  configured end, and participants can likewise withdraw their tokens.

{{ kusama: On Kusama, this phase lasts for one week. :kusama }}

Note that withdrawing tokens requires a transaction for each participant. Anyone can make the
transactions, so a parachain team could free every participant's token in a batch. Tokens that are
not withdrawn within a certain amount of time will go to the
{{ polkadot: [Treasury](learn-treasury) :polkadot }}
{{ kusama: [Treasury](mirror-learn-treasury) :kusama }}.

Several teams in the ecosystem are preparing dashboards to track auctions and crowdloan campaigns.
Check back with this page for updates as these are released.
