# Auction Tool

The auction tool tracks auctions for all the parachain slots on Polkadot and Kusama. This data is
displayed here:

- [Polkadot Auctions](https://wiki.polkadot.network/docs/learn-auction#auction-schedule)
- [Kusama Auctions](https://guide.kusama.network/docs/learn-auction/#auction-schedule)

The auction tool uses a json
[cache](https://github.com/w3f/polkadot-wiki/tree/master/components/utilities/data) to save
information about the auctions. For example, if an auction has been scheduled but has not yet begun
there will be no `startHash`, just a `startBlock`. Once the block is created, the hash can be added
to the cache for tracking. The cache is updated daily using
[this GitHub action](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/update-auction-schedules.yml).
The action has 2 primary steps:

1. [getAuctions.js](https://github.com/w3f/polkadot-wiki/blob/master/components/utilities/getAuctions.js) -
   Attempts to check the chains scheduler for newly scheduled auctions that can be added to the
   cache. If the auction already exists in the cache it is ignore, otherwise it is added with the
   scheduled starting block.
2. [updateAuctions.js](https://github.com/w3f/polkadot-wiki/blob/master/components/utilities/updateAuctions.js) -
   Iterates all existing items in the data cache to see if any of the information can be updated.
   For example, it could update a `startHash` from
   `0x0000000000000000000000000000000000000000000000000000000000000000` to
   `0xf34a77856ab1190ff207ddc2cf7f05dd5fe9760a24bf8a1631fb19f142858bc7` if that block was recently
   created.

After these 2 scripts execute, a new [pull request](https://github.com/w3f/polkadot-wiki/pull/4241)
will automatically be made to the repo if any changes are detected to the cache file. The PR
is only opened by the GitHub action so you can safely run these script locally if you want to see
what updates are available or are debugging an issue. To run the scripts locally you can use the
following commands:

1. `yarn get:auctions`
2. `yarn update:auctions`

Based on past behavior, it will sometimes be required to modify the cache manually. It has been noticed that Kusama will occasionally introduce a breaking API change or modifications to the
dispatch queue before the auctions begin. The `getAuctions.js` script will not attempt to monitor
changes to an auction while in the dispatch queue if it has already been added to the cache. Thus, if a `startBlock` was incorrectly added, the cache will not update with the appropriate auction
information as the block is likely not the start of an auction. If this issue is detected, the
automation routine will bail (displaying an error for the action) and not commit any changes until
the discrepancy is resolved manually. New auctions can be added anytime, and changes can be manually
appended. The following cache properties must be provided:

1. `index` - auction number (count starts at 0)
2. `startBlock` - the block an auction is expected to become active

**The remaining properties in the cache are auto-generated and should not be modified. Running
`yarn update:auctions` will overwrite those changes.** This means that when manually adding a new auction,
these are the only two properties that need to be specified. The remaining properties should still be
included, providing `null` dates or blocks and
`0x0000000000000000000000000000000000000000000000000000000000000000` for hash values. For example,
if I wanted to manually add a new auction `(#41)` to the cache, I would append the following object:

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

Once this information is added and saved to the local JSON file, I can run `yarn update:auctions`
which will attempt to see if any of the other properties can be updated. The final steps are to
commit and push the changes to the main branch on the repo. This will ensure the
[update-auction-schedules](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/update-auction-schedules.yml)
GitHub action will detect the new auction and continue to check for future updates daily (or at the
interval specified in the automation `.yml` file).
