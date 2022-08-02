---
id: learn-auction
title: Parachain Slots Auction
sidebar_label: Parachain Slots Auction
description: Learn about slot auctions.
keywords: [auction, slot auctions, parachain, bidding]
slug: ../learn-auction
---

For a [parachain](learn-parachains.md) to be added to Polkadot it must inhabit one of the available
parachain slots. A parachain slot is a scarce resource on Polkadot and only a limited number will be
available. As parachains ramp up, there may only be a few slots that are unlocked every few months.
The goal is to eventually have 100 parachain slots available on {{ polkadot: Polkadot :polkadot }}
{{ kusama: Kusama :kusama }} (these will be split between parachains and the
[parathread pool](learn-parathreads.md)). If a parachain wants to have guaranteed block inclusion at
every Relay Chain block, it must acquire a parachain slot.

The parachain slots will be leased according to an unpermissioned
[candle auction](https://en.wikipedia.org/wiki/Candle_auction) that has been slightly modified to be
secure on a blockchain.

:::info Auction Schedule

The auction schedule for {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is available
on the auctions page of the {{ polkadot: [Polkadot website](https://polkadot.network/auctions/). :polkadot }}{{ kusama: [Kusama website](https://kusama.network/auctions/). :kusama }}

:::

[![A Beginner's guide to Parachain Slot Auctions](https://img.youtube.com/vi/i5-Rw2Sf7-w/0.jpg)](https://youtu.be/i5-Rw2Sf7-w)

## Mechanics of a Candle Auction

Candle auctions are a variant of open auctions where bidders submit bids that are increasingly
higher and the highest bidder at the conclusion of the auction is considered the winner.

Candle auctions were originally employed in 16th century for the sale of ships and get their name
from the "inch of a candle" that determined the open period of the auction. When the flame
extinguished and the candle went out, the auction would suddenly terminate and the standing bid at
that point would win.

When candle auctions are used online, they require a random number to decide the moment of
termination. Parachain slot auctions differ slightly from a normal candle auction in that they do
not randomly terminate the auction. Instead, they run for an entire fixed duration and the winner is
randomly chosen retroactively.

The candle auction on Polkadot is split into two parts: the _opening period_ which is in effect
immediately after the auction starts. This period lasts for one day and eighteen hours and serves as
a buffer time for parachain candidates to setup their initial bids, and likely start executing their
strategy on how to win the slot auction. During the opening phase, bids will continue to be
accepted, but they do not have any effect on the outcome of the auction.

The opening period then transitions into an _ending period_ of five days, where the auction is
subject to end based on the candle auction mechanism.

The auction’s ending time can be any time within this ending period, and is automatically and
randomly chosen by the [Verifiable Random Function (VRF)](learn-randomness.md##vrf). The probability
of winning the auction is equal to the number of blocks with a winning bid divided by the total
number of blocks in the ending period. The random ending is managed by propagating through the
entire ending period, where a snapshot is taken at each block within the ending period to capture
the winners during that block. At the end of the period, one of the snapshots is randomly selected
to determine the winner of the auction.

This process executes in the next epoch (which lasts for six hours on Polkadot) after the ending
period. **The parachain candidate with the highest bid at the ending time chosen by the VRF wins the
slot auction**.

:::info

[Crowdloan contributions](learn-crowdloans.md##supporting-a-crowdloan-campaign) cannot be made
during these six hours when the winning block for the auction is being determined on-chain.

:::

With one day and eighteen hours for the starting period, five days for the ending period (candle
auction phase) and six hours for determining the auction winner, a parachain auction on Polkadot
lasts exactly one week from the start.

More details on this is available in the [Polkadot Implementation](#polkadot-implementation)
section.

### [Randomness](learn-randomness.md) in action

:::info Randomness Example

The following example will showcase the randomness mechanics of the candle auction for the ninth
auction on Kusama. Keep in mind that the candle phase has a uniform termination profile and has an
equal probability of ending at any given block, and the termination block cannot be predicted before
or during the auction.

- Auction 9 starts at
  [`block 9362014`](https://kusama.subscan.io/extrinsic/0x7b67d653c9522b623a97e20a967b83a8517fe3821370475ddb6611cd37c29a03?event=9335014-26).

  :::note The auction has a full duration equal to `block 9362014` + `72000`

  Here, `block 72000` is the "ending period", which is divided into 
  **3600 samples of 20 blocks**. Figuratively, the candle
  is lit, and the candle phase lasts for 72,000 blocks.

  :::

- The winning sample during the ending period turned out to have the `index 1078`.
  
  :::note Sample 1078 is the winner

  Sample 1078 refers to the winner as of `block 9362014 + 21560`, which equals
  [`block 9383574`](https://kusama.subscan.io/block/9383574).

  :::

- The parent block was a new BABE session in the 'Logs', which updated the randomness that was used
  to select that [sample index](https://kusama.subscan.io/block/9434277).

  :::note Inspecting the block state

  You'd be able to inspect the state at the end of `block 9434277` and see the sample indices with
  an [archive node](../maintain/maintain-sync.md####types-of-nodes). The digest in the 'Logs' of
  `9434277` is decodable and contains the random value as well as the BABE authorities.

- As a result, the winner of this auction did not turn out to be the highest bid during the full
  duration.

:::

## Rationale

The open and transparent nature of blockchain systems opens attack vectors that are non-existent in
traditional auction formats. Normal open auctions in particular can be vulnerable to _auction
sniping_ when implemented over the internet or on a blockchain.

Auction sniping takes place when the end of an auction is known and bidders are hesitant to bid
their true price early, in hopes of paying less than they actually value the item.

For example, Alice may value an item at auction for 30 USD. She submits an initial bid of 10 USD in
hopes of acquiring the items at a lower price. Alice's strategy is to place incrementally higher
bids until her true value of 30 USD is exceeded. Another bidder Eve values the same item at 11 USD.
Eve's strategy is to watch the auction and submit a bid of 11 USD at the last second. Alice will
have no time to respond to this bid before the close of the auction and will lose the item. The
auction mechanism is sub-optimal because it has not discovered the true price of the item and the
item has not gone to the actor who valued it the most.

On blockchains this problem may be even worse, since it potentially gives the producer of the block
an opportunity to snipe any auction at the last concluding block by adding it themselves and/or
ignoring other bids. There is also the possibility of a malicious bidder or a block producer trying
to _grief_ honest bidders by sniping auctions.

For this reason, [Vickrey auctions](https://en.wikipedia.org/wiki/Vickrey_auction), a variant of
second price auction in which bids are hidden and only revealed in a later phase, have emerged as a
well-regarded mechanic. For example, it is implemented as the mechanism to auction human readable
names on the [ENS](../general/ens.md). The Candle auction is another solution that does not need the
two-step commit and reveal schemes (a main component of Vickrey auctions), and for this reason
allows smart contracts to participate.

Candle auctions allow everyone to always know the states of the bid, but not when the auction will
be determined to have ended. This helps to ensure that bidders are willing to bid their true bids
early. Otherwise, they might find themselves in the situation that the auction was determined to
have ended before they even bid.

## Polkadot Implementation

Polkadot will use a _random beacon_ based on the VRF that's used also in other places of the
protocol. The VRF will provide the base of the randomness, which will retroactively determine the
end-time of the auction.

The slot durations are capped to {{ polkadot: 2 years and divided into 3-month periods :polkadot }}
{{ kusama: 1 year and divided into 6-week periods :kusama }}; Parachains may lease a slot for any
combination of periods of the slot duration. Parachains may lease more than one slot over time,
meaning that they could extend their lease to Polkadot past the maximum duration by leasing a
contiguous slot.

:::note Individual parachain slots are fungible. 

This means that parachains do not need to always inhabit the same slot, but as long as a 
parachain inhabits any slot it can continue as a parachain.

:::

## Bidding

Parachains, or parachain teams, can bid in the auction by specifying the slot range that they want
to lease as well as the number of tokens they are willing to reserve. Bidders can be either ordinary
accounts, or use the [crowdloan functionality](learn-crowdloans.md) to source tokens from the
community.

```
Parachain slots at genesis

       --3 months--
       v          v
Slot A |     1    |     2     |     3     |     4     |     5     |     6    |     7     |     8     |     9     |...
Slot B |     1    |     2     |     3     |     4     |     5     |     6    |     7     |     8     |     9     |...
Slot C |__________|     1     |     2     |     3     |     4     |     5    |     6     |     7     |     8     |     9     |...
Slot D |__________|     1     |     2     |     3     |     4     |     5    |     6     |     7     |     8     |     9     |...
Slot E |__________|___________|     1     |     2     |     3     |     4    |     5     |     6     |     7     |     8     |     9     |...
       ^                                                                                             ^
       ---------------------------------------------max lease-----------------------------------------

```

_Each period of the range 1 - 4 represents a
{{ polkadot: 3-month duration for a total of 2 years :polkadot }}
{{ kusama: 6-week duration for a total of 1 year :kusama }} _

Bidders will submit a configuration of bids specifying the token amount they are willing to bond and
for which periods. The slot ranges may be any of the periods 1 - `n`, where `n` is the number of
periods available for a slot (`n` will be 8 for both Polkadot and Kusama).

:::note

If you bond tokens with a parachain slot, you cannot stake with those tokens. In this
way, you pay for the parachain slot by forfeiting the opportunity to earn staking rewards.

:::

A bidder configuration for a single bidder may look like the following pseudocode example:

```js
const bids = [
  {
    range: [1, 2, 3, 4, 5, 6, 7, 8],
    bond_amount: 300,
  },
  {
    range: [1, 2, 3, 4],
    bond_amount: 777,
  },
  {
    range: [2, 3, 4, 5, 6, 7],
    bond_amount: 450,
  },
];
```

The important concept to understand from this example is that bidders may submit different
configurations at different prices (`bond_amount`). However, only one of these bids would be
eligible to win exclusive of the others.

The winner selection algorithm will pick bids that may be non-overlapping in order to maximize the
amount of tokens held over the entire lease duration of the parachain slot. This means that the
highest bidder for any given slot lease period might not always win (see the
[example below](#examples)).

A random number, which is based on the VRF used by Polkadot, is determined at each block.
Additionally, each auction will have a threshold that starts at 0 and increases to 1. The random
number produced by the VRF is examined next to the threshold to determine if that block is the end
of the auction within the so-called _ending period_. Additionally, the VRF will pick a block from
the last epoch to take the state of bids from (to mitigate some types of attacks from malicious
validators).

### Examples

There is one parachain slot available.

Charlie bids `75` for the range 1 - 8.

Dave bids `100` for the range 5 - 8.

Emily bids `40` for the range 1 - 4.

Let's calculate each bidder's valuation according to the algorithm. We do this by multiplying the
bond amount by the number of periods in the specified range of the bid.

Charlie - 75 \* 8 = 600 for range 1 - 8

Dave - 100 \* 4 = 400 for range 5 - 8

Emily - 40 \* 4 = 160 for range 1 - 4

Although Dave had the highest bid in accordance to token amount, when we do the calculations we see
that since he only bid for a range of 4, he would need to share the slot with Emily who bid much
less. Together Dave's and Emily's bids only equals a valuation of `560`.

Charlie's valuation for the entire range is `600`. Therefore Charlie is awarded the complete range
of the parachain slot.

## Parachain Lease Extension

Before the slot lease expires, parachains have to bid and win another auction for continuity of the
lease. 


## FAQ

### Why doesn't everyone bid for the max length?

For the duration of the slot the tokens bid in the auction will be locked up. This means that there
are opportunity costs from the possibility of using those tokens for something else. For parachains
that are beneficial to Polkadot, this should align the interests between parachains and the Polkadot
Relay Chain.

### How does this mechanism help ensure parachain diversity?

The method for dividing the parachain slots into intervals was partly inspired by the desire to
allow for a greater amount of parachain diversity, and prevent particularly large and well-funded
parachains from hoarding slots. By making each period a {{ polkadot: three-month duration but the
overall slot a 2-year duration :polkadot }}{{ kusama: 6-week duration but the overall slot a 1-year
duration :kusama }}, the mechanism can cope with well-funded parachains that will ensure they secure
a slot at the end of their lease, while gradually allowing other parachains to enter the ecosystem
to occupy the durations that are not filled. For example, if a large, well-funded parachain has
already acquired a slot for range 1 - 8, they would be very interested in getting the next slot that
would open for 2 - 9. Under this mechanism that parachain could acquire just the period 9 (since
that is the only one it needs) and allow range 2 - 8 of the second parachain slot to be occupied by
another.

### Why is randomness difficult on blockchains?

Randomness is problematic for blockchain systems. Generating a random number trustlessly on a
transparent and open network in which other parties must be able to verify opens the possibility for
actors to attempt to alter or manipulate the randomness. There have been a few solutions that have
been put forward, including hash-onions like [RANDAO](https://github.com/randao/randao) and
[verifiable random functions](https://en.wikipedia.org/wiki/Verifiable_random_function) (VRFs). The
latter is what Polkadot uses as a base for its randomness.

### Are there other ways of acquiring a slot besides the candle auction?

Another way, besides the candle auction, to acquire a parachain slot is through a secondary market
where an actor who has already won a parachain slot can resell the slot along with the associated
deposit of tokens that is locked up to another buyer. This would allow the seller to get liquid
tokens in exchange for the parachain slot and the buyer to acquire the slot as well as the deposited
tokens.

A number of system or common-good parachains may be granted slots by the
[governing bodies](learn-governance.md) of the Relay Chain. System parachains can be recognized by a
parachain ID lower than 1_000, and common-good parachains by a parachain ID between 1_000 and 1_999.
Other parachains will have IDs 2_000 or higher. Such parachains would not have to bid for or renew
their slots as they would be considered essential to the ecosystem's future.

### How are auctions scheduled?

The parachain slot auctions are scheduled through the governance. At least 2/3 of the Council can 
initiate an auction, however, Root origin (via referendum) is needed to cancel an auction. Here is a
proposal that gives a glimpse of what goes into planning auctions schedule - 
[Proposed Polkadot Auction Schedule 2022](https://polkadot.polkassembly.io/post/863)

## Resources

- [Parachain Allocation](https://w3f-research.readthedocs.io/en/latest/polkadot/overview/3-parachain-allocation.html) -
  W3F research page on parachain allocation that goes more in depth to the mechanism
- [Research Update: The Case for Candle Auctions](https://polkadot.network/blog/research-update-the-case-for-candle-auctions/) -
  W3F breakdown and research update about candle auctions
- [Front-Running, Smart Contracts, and Candle Auctions](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3846363)
  W3F Research team discusses how to remedy current blockchain auction setbacks with candle auctions
