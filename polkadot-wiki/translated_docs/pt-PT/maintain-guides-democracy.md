---
id: maintain-guides-democracy
title: Participate in Democracy
sidebar_label: Participate in Democracy
---

The public referenda chamber is one of the three bodies of on-chain governance as it's instantiated in Polkadot and Kusama. The other two bodies are the [council](maintain-guides-how-to-join-council) and the [technical committee](learn-governance#technical-committee).

Public referenda can be proposed and voted on by any token holder in the system as long as they provide a bond. After a proposal is made, others can agree with it by _seconding_ it and putting up tokens equal to the original bond. Every launch period, the most seconded proposal will be moved to the public referenda table will it can be voted upon. Voters who are willing to lock up their tokens for a greater duration of time can do so and get their vote amplified. For more details on the governance system please see [here](learn-governance).

This guide will instruct token holders how to propose and vote on public referenda using the Democracy module as it's implemented in Kusama.

## Important Parameters

The important parameters to be aware of when voting using the Democracry module are as follow:

**Launch Period** - How often new public referenda are launched.

**Voting Period** - How often votes for referenda are tallied.

**Emergency Voting Period** - The minimum voting period for a fast-tracked emergency referendum.

**Minimum Deposit** - The minimum amount to be used as a deposit for a public referendum proposal.

**Enactment Period** - The minimum period for locking funds _and_ the period between a proposal being approved and enacted.

**Cooloff Period** - The period in blocks where a proposal may not be re-submitted after being vetoed.

## Proposing an Action

Proposing an action to be taken requires you to bond some tokens. In order to ensure you have enough tokens to make the minimum deposit you can check the parameter in the chain state.

On Polkadot Apps you can use the "Democracy" tab to make a new proposal. In order to submit a proposal, you will need to submit what's called the preimage hash. The preimage hash is simply the hash of the proposal to be enacted. The easiest way to get the preimage hash is by clicking on the "Submit preimage" button and configuring the action that you are proposing.

For example, if you wanted to propose that the account "Dave" would have a balance of 10 tokens your proposal may look something like the below image. The preimage hash would be `0xa50af1fadfca818feea213762d14cd198404d5496bca691294ec724be9d2a4c0`. You can copy this preimage hash and save it for the next step. There is no need to click Submit Preimage at this point, though you could. We'll go over that in the next section.

![submit preimage](assets/democracy/submit_preimage.png)

Now you will click on the "Submit proposal" button and enter the preimage hash in the input titled "preimage hash" and _at least_ the minimum deposit into the "locked balance" field. Click on the blue "Submit proposal" button and confirm the transaction. You should now see your proposal appear in the "proposals" column on the page.

![submit proposal](assets/democracy/submit_proposal.png)

Now your proposal is visible by anyone who accesses the chain and others can second it or submit a preimage. However, it's hard to tell what exactly this proposal does since it shows the hash of the action. Other holders will not be able to make a judgement for whether they second it or not until someone submits the actual preimage for this proposal. In the next step you will submit the preimage.

![proposals](assets/democracy/proposals.png)

## Submitting a Preimage

The act of making a proposal is split from submitting the preimage for the proposal since the storage cost of submitting a large preimage could be pretty expensive. Allowing for the preimage submission to come as a separate transaction means that another account could submit the preimage for you if you don't have the funds to do so. It also means that you don't have to pay so many funds right away as you can prove the preimage hash out-of-band.

However, at some point before the proposal passes you will need to submit the preimage or else the proposal cannot be enacted. The guide will now show you how to do this.

Click on the blue "Submit preimage" button and configure it to be the same as what you did before to acquire the preimage hash. This time, instead of copying the hash to another tab, you will follow through and click "Submit preimage" and confirm the transaction.

![submit preimage](assets/democracy/submit_preimage.png)

Once the transaction is included you should see the UI update with the information for your already submitted proposal.

![proposals updated](assets/democracy/proposals_updated.png)

## Seconding a Proposal

Seconding a proposal means that you are agreeing with the proposal and backing it with an equal amount of deposit as was originally locked. By seconding a proposal you will move it higher up the rank of proposals. The most seconded proposal - in value, not number of supporters - will be tabled as a referendum to be voted on every launch period.

To second a proposal, navigate to the proposal you want to second and click on the "Second" button.

![second button](assets/democracy/second_button.png)

You will be prompted with the full details of the proposal (if the preimage has been submitted!) and can then broadcast the transaction by clicking the blue "Second" button.

![second confirm](assets/democracy/second_confirm.png)

Once successful you will see your second appear in the dropdown in the proposal details.

![second result](assets/democracy/second_result.png)

## Voting on a Proposal

At the end of each launch period, the most seconded proposal will move to referendum. During this time you can cast a vote for or against the proposal. You may also lock up your tokens for a greater length of time to weigh your vote more strongly. During the time your tokens are locked, you are unable to transfer them, however they can still be used for further votes. Locks are layered on top of each other, so an eight week lock does not become a 15 week lock if you vote again a week later, rather another eight week lock is placed to extend the lock just one extra week.

To vote on a referendum, navigate to the ["Democracy" tab of Polkadot Apps](https://polkadot.js.org/apps/#/democracy/). Any active referendum will show in the "referenda" column. Click the blue button "Vote" to cast a vote for the referendum.

If you would like to cast your vote for the proposal select the "Aye, I approve" option. If you would like to cast your vote against the proposal in referendum you will select "Nay, I do not approve" option.

The second option is to select your conviction for this vote. The longer you are willing to lock your tokens, the stronger your vote will be weighted. Unwillingness to lock your tokens means that your vote only counts for 10% of the tokens that you hold, while the maximum lock up of 256 days means you can make your vote count for 600% of the tokens that you hold.

When you are comfortable with the decision you have made, click the blue "Vote" button to submit your transaction and wait for it to be included in a block.

![voting](assets/democracy/voting.png)

## Delegate a Vote

If you are too busy to keep up and vote on upcoming referenda, there is an option to delegate your vote to another account whose opinion you trust. When you delegate to another account, that account gets the added voting power of your tokens along with the conviction that you set. The conviction for delegation works just like the conviction for regular voting, except your tokens may be locked longer than they would normally since locking resets when you undelegate your vote.

The account that is being delegated to does not make any special action once the delegation is in place. They can continue to vote on referenda how they see fit. The difference is now when the Democracy system tallies votes, the delegated tokens now are added to whatever vote the delegatee has made.

You can delegate your vote to another account and even attach a "Conviction" to the delegation. Navigate to the "Extrinsics" tab on Polkadot Apps and select the options "democracy" and "delegate". This means you are accessing the democracy pallet and choosing the delegate transaction type to send. Your delegation will count toward whatever the account you delegated for votes on until you explicitly undelegate your vote.

In the first input select the account you want to delegate to and in the second input select the amount of your conviction. Remember, higher convictions means that your vote will be locked longer. So choose wisely!

![delegate](assets/democracy/delegate.png)

After you send the delegate transaction, you can verify it went through by navigating to the "Chain State" tab and selecting the "democracy" and "delegations" options. You will see an output similar to below, showing the addresses to which you have delegated your voting power.

![delegate state](assets/democracy/delegate_state.png)

## Undelegate a Vote

You may decide at some point in the future to remove your delegation to a target account. In this case, your tokens will be locked for the maximum amount of time in accordance with the conviction you set at the beginning of the delegation. For example, if you chose "2x" delegation for four weeks lock up time, your tokens will be locked for 4 weeks after sending the `undelegate` transaction. Once your vote has been undelegated, you are in control of making votes with it once again. You can start to vote directly, or chose a different account to act as your delegate.

The `undelegate` transaction must be sent from the account that you wish to clear of its delegation. For example, if Alice has delegated her tokens to Bob, Alice would need to be the one to call the `undelegate` transaction to clear her delegation.

The easiest way to do this is from the "Extrinsics" tab of Polkadot Apps. Select the "democracy" pallet and the "undelegate" transaction type. Ensure that you are sending the transaction from the account you want to clear of delegations. Click "Submit transaction" and confirm.

![undelegate](assets/democracy/undelegate.png)

## Governance Proxies

Governance Proxies can be used to participate in governance on behalf of a stash account. A governance proxy can perform any transaction from Democracy, Council, Technical Committee, and Treasury modules. Unlike delegation, the proxy is meant to act as a longer-term account that makes all governance-related transactions for funds held in a different account. Delegation is a logical action, taken when you trust another account's judgement, while proxying is more of a recommended security practice for keeping your funds safe and using an active account with low funds instead.

Learn more about proxies and other types of proxies on the [proxies](learn-proxies) page.

### Why use a proxy?

The idea of a governance proxy introduces a level of security. When engaging in transactions with Democracy, Council, Technical Committee, and Treasury modules, a governance proxy uses its low funds sent from its stash account. This leaves a safer proxy performing on-chain actions, rather than the stash account itself.

### Adding a proxy

Adding a proxy involves submitting a single transaction, the transaction type "addProxy" from the Proxy pallet.

You can make this transaction from Polkadot Apps by navigating to the "Extrinsics" tab and selecting the Proxy pallet and the "addProxy" transaction type. Send the transaction from the "Stash" account that holds the funds that you want to vote with, and the target to the proxy account that will perform governance action. Choose "Governance" as the proxy type.

![add proxy](assets/democracy/adding_proxy.png)

You also have the choice to add in a governance anonymous proxy underneath the "anonymous" type from the Proxy pallet and selecting "Governance" as the proxy type. A governance anonymous proxy is only accessible by another proxy and these do not come with any associated secret key.

Read more on Anonymous Proxies [here](https://wiki.polkadot.network/docs/en/learn-proxies#anonymous-proxies).

### Voting with a proxy

Making a vote on behalf of a stash requires a "proxy" transaction from the Proxy pallet. When you choose this transaction from the "Extrinsics" tab, it will let you select "vote" from the Democracy pallet, and you will specify the index of the referendum that is being voted, the judgement (i.e. "Aye" for approval or "Nay" for rejection), and the conviction, just like a normal vote.

### Removing a proxy

At some point you may want to remove a proxy from being able to vote on behalf of a stash account. This is possible to do by submitting a "removeProxy" transaction from the stash account, targetting the proxy account. You also have the option to "removeProxies" which will remove all proxies created from a selected stash account.

![remove proxy](assets/democracy/remove_proxy.png)
