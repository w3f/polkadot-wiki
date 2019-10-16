---
id: learn-auction
title: Parachain Slots Auction
sidebar_label: Parachain Slots Auction
---

![Parachain Roadmap](assets/parachain-roadmap.jpg)

The parachain slots of Polkadot will be sold according to an unpermissioned [Candle auction](https://en.wikipedia.org/wiki/Candle_auction) which has been slightly modified to be secure on a blockchain.

## Mechanics of a Candle auction

Candle auctions are a variant of open auctions where bidders submit bids that are increasingly higher and the highest bidder at the conclusion of the auction is considered the winner.

Candle auctions were originally employed in 16th century for the sale of ships and get their name from the "inch of a candle" that determined the open period of the auction. When the flame extinguished and the candle went out, the auction would suddenly terminate and the standing bid at that point would win.

When Candle auctions are used online, they require a random number to decide the moment of termination.

Parachain slot auctions will differ slightly from a normal Candle auction in that it does not use the random number to decide the duration of its opening phase. Instead, it has a known open phase and will be retroactively determined (at the normal close) to have ended at some point in the past. So during the open phase, bids will continue to be accepted but, later bids have higher probability of losing since the retroactively determined close moment may be found to have preceded the time that a bid was submitted.

## Why use a Candle auction?

The open and transparent nature of blockchain systems opens attack vectors which are non-existent in traditional auction formats. Normal open auctions in particular can be vulnerable to _auction sniping_ when implemented over the internet or on a blockchain.

Auction sniping takes place when the end of an auction is known and bidders are hesitant to bid their true price early, in hopes of paying less than they actually value the item.

For example, Alice may value an item at auction for 30 USD. She submits an initial bid of 10 USD in hopes of acquiring the items at a lower price. Alice's strategy is to place incrementally higher bids until her true value of 30 USD is exceeded. Another bidder Eve values the same item at 11 USD. Eve's strategy is to watch the auction and submit a bid of 11 USD at the last second. Alice will have no time to respond to this bid before the close of the auction and will lose the item. The auction mechanism is sub-optimal because it has not discovered the true price of the item and the item has not gone to the actor who valued it the most.

On blockchains this problem may be even worse, since it potentially gives the producer of the block an opportunity to snipe any auction at the last concluding block by adding it themselves and/or ignoring other bids. There is also the possibility of a malicious bidder or a block producer trying to _grief_ honest bidders by sniping auctions.

For this reason, [Vickrey auctions](https://en.wikipedia.org/wiki/Vickrey_auction), a variant of second price auction in which bids are hidden and only revealed in a later phase, have emerged as a well-regarded mechanic. For example, it is implemented as the mechanism to auction human readable names on the [ENS](https://ens.domains). The Candle auction is another solution which does not need the two-step commit and reveal schemes (a main component of Vickrey auctions), and for this reason allows smart contracts to participate.

Candle auctions allow everyone to always know the states of the bid, but not when the auction will be determined to have "ended." This helps to ensure that bidders are willing to bid their true bids early. Otherwise, they might find themselves in the situation that the auction was determined to have "ended" before they even bid.

## How it's used in Polkadot

Polkadot will use a _random beacon_ based on the VRF that's used also in other places of the protocol. The VRF will provide the base of the randomness which will retroactively determine the "end-time" of the auction.

When an account bids, they can place bids for any of the available periods or ranges in a slot. However, if a parachain (with the same STF) bids then that parachain must bid on a continuous period or range to the one they already occupy. They will not be able to bid for an overlapping slot (no multiples of the same parachain at the same time) and they will not be able to bid for a future slot if there is a gap in between. In the case a parachain is rebooted after having already reached the conclusion of its slot duration, it will need to be started again from a new genesis (which could be snapshot of all the old state) and will need to be bid from an external account.

The slot durations are capped to 2 years and divided into 6-month periods. Parachains may lease a slot for any contiguous range of the slot duration. Parachains may lease more than one slot over time, meaning that they could extend their lease to Polkadot past the 2 year slot duration simply by leasing a contiguous slot.

## How does bidding work?

```
Parachain slots at genesis

       --6 months--
       v          v
Slot A |     1    |     2    |     3     |     4     |...
Slot B |     1    |     2    |     3     |     4     |...
Slot C |__________|     1    |     2     |     3     |     4     |...
Slot D |__________|     1    |     2     |     3     |     4     |...
Slot E |__________|__________|     1     |     2     |     3     |     4     |...
       ^                                             ^
       ---------------------2 years-------------------

Each period of the range 1 - 4 represents a 6-month duration for a total of 2 years
```

Each parachain slot has a maximum duration of 2 years. Each 6 month interval in the slot is divided into its own `lease period`. More than one continuous `period` is a `range`.

Several auctions will take place in the preceding six months before a set of parachain slot leases begin.

Bidders will submit a configuration of bids specifying the DOT amount they are willing to lock up and for which ranges. The slot ranges may be any continuous range of the periods 1 - 4.

A bidder configuration for a single bidder may look like this:

```js
Bids [
       {
              range: [1,2,3,4],
              bond_amount: 300, //DOTs
       },
       {
              range: [1,2],
              bond_amount: 777, //DOTs
       },
       {
              range: [2,3,4],
              bond_amount: 450, // DOTs
       }
]
```

The winner selection algorithm will pick bids which may be non-overlapping in order to maximize the amount of DOTs held over the entire 2-year lease duration of the parachain slot. This means that the highest bidder for any given slot lease period might not always win (see the [example below](#compete)).

A random number is determined at each block which is based on the VRF used by Polkadot. Additionally, each auction will have a threshold that starts at 0 and increases to 1. The random number produced by the VRF is examined next to the threshold to determine if that block is the end of the auction. Additionally, the VRF will pick a block from the last epoch to take the state of bids from (to mitigate some types of attacks from malicious validators).

### Examples

#### Non-compete

There is one parachain slot available.

Alice bids `20 DOTs` for the range 1 - 2.

Bob bids `30 DOTs` for the range 3 - 4.

The auction ends.

Alice bonds `20 DOTs` and will have the parachain slot for the first year.

Bob bonds `30 DOTs` and will have the parachain slot for the second year.

#### Compete

There is one parachain slot available.

Charlie bids `75 DOTs` for the range 1 - 4.

Dave bids `100 DOTs` for the range 3 - 4.

Emily bids `40 DOTs` for the range 1 - 2.

Let's calculate every bidder's valuation according to the algorithm. We do this by multiplying the bond amount by the amount of periods in the specified range of the bid.

Charlie - 75 * 4 = 300 for range 1 - 4

Dave - 100 * 2 = 200 for range 3 - 4

Emily - 40 * 2 = 80 for range 1 - 2

Although Dave had the highest bid in accordance to DOT amount, when we do the calculations we see that since he only bid for a range of 2, he would need to share the slot with Emily who bid much less. Together Dave's and Emily's bids only equal a valuation of `280`.

Charlie's valuation for the entire range is `300` therefore Charlie is awarded the complete range of the parachain slot.

## FAQ

### Why doesn't everyone bid for the max length?

For the duration of the slot the `DOTs` bid in the auction will be locked up. This means that there are opportunity costs from the possibility of using those `DOTs` for something else. For parachains that are beneficial to Polkadot, this should align the interests between parachains and the Polkadot relay chain.

### How does this mechanism help ensure parachain diversity?

The method for dividing the parachain slots into six month intervals was partly inspired by the desire to allow for a greater amount of parachain diversity, and prevent particularly large and well-funded parachains from hoarding slots. By making each period a six-month duration but the overall slot a 2-year duration, the mechanism can cope with well-funded parachains that will ensure they secure a slot at the end of their lease, while gradually allowing other parachains to enter the ecosystem to occupy the six-month durations which are not filled. For example, if a large, well-funded parachain has already acquired a slot for range 1 - 4, they would be very interested in getting the next slot which would open for 2 - 5. Under this mechanism that parachain could acquire period 5 (since that is the only one it needs) and allow range 2 - 4 of the second parachain slot to be occupied by another.

### Why is randomness difficult on blockchains?

Randomness is problematic for blockchain systems. Generating a random number trustlessly on a transparent and open network in which other parties must be able to verify opens the possibility for actors to attempt to alter or manipulate the randomness. There have been a few solutions that have been put forward, including hash-onions like [RANDAO](https://github.com/randao/randao) and [verifiable random functions](https://en.wikipedia.org/wiki/Verifiable_random_function) (VRFs). The latter is what Polkadot uses as a base for its randomness.

## Resources

- [Parachain Allocation](http://research.web3.foundation/en/latest/polkadot/Parachain-Allocation/) - W3F research page on parachain allocation that goes more in depth to the mechanism.
- [paritytech/polkadot#239](https://github.com/paritytech/polkadot/pull/239) - Pull request introducing the parachain slots code.
