# Auction Tool

The auction tool tracks auctions for all the parachains on Polkadot and Kusama. This data is
displayed here:

- [Polkadot Auctions](https://wiki.polkadot.network/docs/learn-auction#auction-schedule)
- [Kusama Auctions](https://guide.kusama.network/docs/learn-auction/#auction-schedule)

The auction tool uses a cache that is tracked on the repo to save information about the auctions.
For example, if an auction has been scheduled but has not yet begun there will be no `startHash`,
just a `startBlock`. Once the block is created, the hash can be added to the cache for tracking. The
cache is updated daily using
[this GitHub Action](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/update-auction-schedules.yml).
The action has 2 primary steps:

1. [getAuctions.js](https://github.com/w3f/polkadot-wiki/blob/master/components/utilities/getAuctions.js) -
   Attempts to check the chains scheduler for newly schedule auctions that can be added to the
   cache. If the auction already exists in the cache it is ignore, otherwise it is added with the
   scheduled started block.
2. [updateAuctions.js](https://github.com/w3f/polkadot-wiki/blob/master/components/utilities/updateAuctions.js) -
   Iterates all existing items in the data cache to see if any of the information can be updates.
   For example, it could updated a `startHash` from
   `0x0000000000000000000000000000000000000000000000000000000000000000` to
   `0xf34a77856ab1190ff207ddc2cf7f05dd5fe9760a24bf8a1631fb19f142858bc7` if that block was recently
   created.

After these 2 scripts execute a new pull request will automatically be made to the repo if any
changes are detected to either json cache file. The PR is only opened by the GitHub action so you
can safely run these script locally if you want to see what updates are available or are debugging
an issue. To run the scripts locally you can use the following commands:

1. `yarn get:auctions`
2. `yarn update:auctions`

Based on past behavior, it will sometime be required to modify the cache manually. The team has
noticed that Kusama will occasionally introduce a breaking api change or modifications to the
dispatch queue before the auctions begin. The `getAuctions.js` script will not attempt to monitor
changes to an auction while in the dispatch queue if it has already been added to the cache. This
mean if a `startBlock` was incorrectly added, it will not update with the appropriate auction
information as the block is likely not the start of an auction. If this issue is detected the
automation routine will bail and not commit any changes until the discrepancy is resolved manually.
New auctions can be added any time and changes can be manually made, but only to the following cache
fields:

1. `index` - auction number (-1 starts from 0)
2. `startBlock` - the block an auction is expected to become active

**The remaining fields in the cache are auto-generate and should not be modified as running
`yarn update:auctions` will overwrite those changes.** This means to manually add a new auction
these are the only 2 fields that need to be accurate. The remaining fields should be `null` dates or
blocks and `0x0000000000000000000000000000000000000000000000000000000000000000` for hashes. For
example, if I wanted to manually add a new auction (#41) to the cache I would append the following
object:

```json
  {
    "index": 40,
    "startBlock": 14411200,
    "startHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "endPeriodBlock": null,
    "endPeriodHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "biddingEndsBlock": null,
    "biddingEndsHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "onboardStartBlock": null,
    "onboardStartHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "onboardEndBlock": null,
    "onboardEndHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "startDate": null,
    "endPeriodDate": null,
    "biddingEndsDate": null,
    "onboardStartDate": null,
    "onboardEndDate": null
  },
```

Once this info is added and saved to the json file, I can run `yarn update:auctions` which will
attempt to see if any of the other fields can be updated. The final steps are to commit and push the
changes to the json cache. The next automated runs of the
[update-auction-schedules](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/update-auction-schedules.yml)
GitHub Action will continue to check for future updates.
