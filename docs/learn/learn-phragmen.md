---
id: learn-phragmen
title: Sequential Phragmén Method
sidebar_label: Sequential Phragmén Method
description: Learn about the election method used on Polkadot.
slug: ../learn-phragmen
---

## What is the sequential Phragmén method?

The sequential Phragmén method is a multi-winner election method introduced by Edvard Phragmén in
the 1890s. While sequential Phragmén is currently in use on Polkadot and Kusama, an improvement on
the sequential Phragmén method named [Phragmms](#phragmms-fka-balphragmms) will be used in the
future.

The quote below taken from the reference [Phragmén paper](#external-resources) sums up the purpose
of the sequential Phragmén method:

> The problem that Phragmén’s methods try to solve is that of electing a set of a given numbers of
> persons from a larger set of candidates. Phragmén discussed this in the context of a parliamentary
> election in a multi-member constituency; the same problem can, of course, also occur in local
> elections, but also in many other situations such as electing a board or a committee in an
> organization.

## Where is the Phragmén method used in Polkadot?

### NPoS: Validator Elections

The sequential Phragmén method is used in the Nominated Proof-of-Stake scheme to elect validators
based on their own self-stake and the stake that is voted to them from nominators. It also tries to
equalize the weights between the validators after each election round. Since validators are paid
equally in Polkadot, it is important that the stake behind each validator is spread out. Polkadot
tries to optimize three metrics in its elections:

1. Maximize the total amount at stake.
1. Maximize the stake behind the minimally staked validator.
1. Minimize the variance of the stake in the set.

#### Off-Chain Phragmén

Given the large set of nominators and validators, Phragmén's method is a difficult optimization
problem. Polkadot uses off-chain workers to compute the result off-chain and submit a transaction to
propose the set of winners. The reason for performing this computation off-chain is to keep a
constant block time of six seconds and prevent long block times at the end of each era, when the
validator election takes place.

Because certain user actions, like changing nominations, can change the outcome of the Phragmén
election, the system forbids calls to these functions for the last quarter of the session before an
era change. These functions are not permitted:

- `bondExtra`
- `unbond`
- `withdrawUnbonded`
- `validate`
- `nominate`
- `chill`
- `payoutStakers`
- `rebond`

### Council Elections

The Phragmén method is also used in the council election mechanism. When you vote for council
members, you can select up to 16 different candidates, and then place a reserved bond as the weight
of your vote. Phragmén will run once on every election to determine the top candidates to assume
council positions and then again amongst the top candidates to equalize the weight of the votes
behind them as much as possible.

## What does it mean for node operators?

Phragmén is something that will run in the background and requires no extra effort from you.
However, it is good to understand how it works since it means that not all the stake you've been
nominated will end up on your validator after an election. Nominators are likely to nominate a few
different validators that they trust to do a good job operating their nodes.

You can use the [offline-phragmén](https://github.com/kianenigma/offline-phragmen) script for
predicting the outcome of a validator election ahead of a new election.

## Understanding Phragmén

This section explains the sequential Phragmén method in-depth and walks through examples.

### Basic Phragmén

### Rationale

In order to understand the Weighted Phragmén method, we must first understand the basic Phragmén
method. There must be some group of candidates, a group of seats they are vying for (which is less
than the size of the group of candidates), and some group of voters. The voters can cast an approval
vote - that is, they can signal approval for any subset of the candidates.

The subset should be a minimum size of one (i.e., one cannot vote for no candidates) and a maximum
size of one less than the number of candidates (i.e., one cannot vote for all candidates). Users are
allowed to vote for all or no candidates, but this will not have an effect on the final result, and
so votes of this nature are meaningless.

Note that in this example, all voters are assumed to have equal say (that is, their vote does not
count more or less than any other votes). The weighted case will be considered later. However,
weighting can be "simulated" by having multiple voters vote for the same slate of candidates. For
instance, five people voting for a particular candidate is mathematically the same as a single
person with weight `5` voting for that candidate.

The particular algorithm we call here the "Basic Phragmén" was first described by Brill *et al.* in
their paper
["Phragmén’s Voting Methods and Justified Representation"](https://aaai.org/ocs/index.php/AAAI/AAAI17/paper/download/14757/13791).

### Algorithm

The Phragmén method will iterate, selecting one seat at a time, according to the following rules:

1. Candidates submit their ballots, marking which candidates they approve. Ballots will not be
   modified after submission.
2. An initial load of 0 is set for each ballot.
3. The candidate who wins the next available seat is the one where the ballots of their supporters
   would have the *least average (mean) cost* if that candidate wins.
4. The *n* ballots that approved that winning candidate get *1/n* added to their load.
5. The load of all ballots that supported the winner of this round are averaged out so that they are
   equal.
6. If there are any more seats, go back to step 3. Otherwise, the selection ends.

### Example

Let's walk through an example with four candidates vying for three seats, and five voters.

```
Open Seats: 3

Candidates:   A B C D  L0
-------------------------
Voter V1:       X      0
Voter V2:         X X  0
Voter V3:       X   X  0
Voter V4:     X X      0
Voter V5:       X X X  0
```

In this example, we can see that voter `V1` approves only of candidate `B`, voter `V2` approves of
candidates `C` and `D`, etc. Voters can approve any number of candidates between 1 and
`number_of_candidates - 1`. An initial "load" of `0` is set for each ballot (`L0` = load after round
`0`, i.e., the "round" before the first round). We shall see shortly how this load is updated and
used to select candidates.

We will now run through an iterative algorithm, with each iteration corresponding to one "seat".
Since there are three seats, we will walk through three rounds.

For the first round, the winner is simply going to be the candidate with the most votes. Since all
loads are equal, the lowest average load will be the candidate with the highest n, since `1/n` will
get smaller as `n` increases. For this first example round, for instance, candidate `A` had only one
ballot vote for them. Thus, the average load for candidate A is `1/1`, or 1. Candidate C has two
ballots approving of them, so the average load is `1/2`. Candidate B has the lowest average load, at
`1/4` and they get the first seat. Ballots loads are now averaged out, although for the first
iteration, this will not have any effect.

```
Filled seats: 1 (B)
Open Seats: 2

Candidates:   A B C D  L0 L1
-----------------------------
Voter V1:       X      0  1/4
Voter V2:         X X  0  0
Voter V3:       X   X  0  1/4
Voter V4:     X X      0  1/4
Voter V5:       X X X  0  1/4
```

We are now down to candidates `A`, `C`, and `D` for two open seats. There is only one voter (`V4`)
for `A`, with load `1/4`. `C` has two voters, `V2` and `V5`, with loads of `0` and `1/4`. `D` has
three voters approving of them, `V2`, `V3`, and `V5`, with loads of `0`, `1/4`, and `1/4`,
respectively.

If Candidate `A` wins, the average load would be `(1/4 + 1/1) / 1`, or `5/4`. If candidate `C` wins,
the average load would be `((0 + 1/2) + (1/4 + 1/2)) / 2`, or `5/8`. If candidate `D` wins, the
average load would be `((0 + 1/3) + (1/4 + 1/3) + (1/4 + 1/3)) / 3`, or `1/2`. Since `1/2` is the
lowest average load, candidate D wins the second round.

Now everybody who voted for Candidate `D` has their load set to the average, `1/2` of all the loads.

```
Filled seats: 2 (B, D)
Open Seats: 1

Candidates:   A B C D  L0 L1  L2
---------------------------------
Voter V1:       X      0  1/4 1/4
Voter V2:         X X  0  0   1/2
Voter V3:       X   X  0  1/4 1/2
Voter V4:     X X      0  1/4 1/4
Voter V5:       X X X  0  1/4 1/2
```

There is now one seat open and two candidates, `A` and `C`. Voter `V4` is the only one voting for
`A`, so if `A` wins then the average load would be `(1/4 + 1/1) / 1`, or `5/4`. Voters `V2` and `V5`
(both with load `1/2`) support `C`, so if `C` wins the average load would be
`((1/2 + 1/2) + (1/2 + 1/2)) / 2`, or `1`. Since the average load would be lower with `C`, `C` wins
the final seat.

```
Filled seats: 3 (B, D, C)
Open Seats: 0

Candidates:   A B C D  L0 L1  L2  L3
------------------------------------
Voter V1:       X      0  1/4 1/4 1/4
Voter V2:         X X  0  0   1/2 1
Voter V3:       X   X  0  1/4 1/2 1/2
Voter V4:     X X      0  1/4 1/4 1/4
Voter V5:       X X X  0  1/4 1/2 1
```

An interesting characteristic of this calculation is that the total load of all voters will always
equal the number of seats filled in that round. In the zeroth round, load starts at `0` and there
are no seats filled. After the first round, the total of all loads is `1`, after the second round it
is `2`, etc.

### Weighted Phragmén

### Rationale

While this method works well if all voters have equal weight, this is not the case in Polkadot.
Elections for both validators and candidates for the Polkadot Council are weighted by the number of
tokens held by the voters. This makes elections more similar to a corporate shareholder election
than a traditional political election, where some members have more pull than others. Someone with a
single token will have much less voting power than someone with 100. Although this may seem
anti-democratic, in a pseudonymous system, it is trivial for someone with 100 tokens to create 100
different accounts and spread their wealth to all of their pseudonyms.

Therefore, not only do we want to allow voters to have their preferences expressed in the result,
but do so while keeping as equal a distribution of their stake as possible and express the wishes of
minorities as much as is possible. The Weighted Phragmén method allows us to reach these goals.

### Algorithm

Weighted Phragmén is similar to Basic Phragmén in that it selects candidates sequentially, one per
round, until the maximum number of candidates are elected. However, it has additional features to
also allocate weight (stake) behind the candidates.

*NOTE: in terms of validator selection, for the following algorithm, you can think of "voters" as
"nominators" and "candidates" as "validators".*

1. Candidates are elected, one per round, and added to the set of successful candidates (they have
   won a "seat"). This aspect of the algorithm is very similar to the "basic Phragmén" algorithm
   described above.
2. However, as candidates are elected, a weighted mapping is built, defining the weights of each
   selection of a validator by each nominator.

In more depth, the algorithm operates like so:

1. Create a list of all voters, their total amount of stake, and which validators they support.
2. Generate an initial edge-weighted graph mapping from voters to candidates, where each edge weight
   is the total *potential* weight (stake) given by that voter. The sum of all potential weight for
   a given candidate is called their *approval stake*.
3. Now we start electing candidates. For the list of all candidates who have not been elected, get
   their score, which is equal to `1 / approval_stake`.
4. For each voter, update the score of each candidate they support by adding their total budget
   (stake) multiplied by the load of the voter and then dividing by that candidate's approval stake
   `(voter_budget * voter_load / candidate_approval_stake)`.
5. Determine the candidate with the lowest score and elect that candidate. Remove the elected
   candidate from the pool of potential candidates.
6. The load for each edge connecting to the winning candidate is updated, with the edge load set to
   the score of the candidate minus the voter's load, and the voter's load then set to the
   candidate's score.
7. If there are more candidates to elect, go to Step 3. Otherwise, continue to step 8.
8. Now the stake is distributed amongst each nominator who backed at least one elected candidate.
   The backing stake for each candidate is calculated by taking the budget of the voter and
   multiplying by the edge load then dividing by the candidate load
   (`voter_budget * edge_load / candidate_load`).

### Example

*Note: All numbers in this example are rounded off to three decimal places.*

In the following example, there are five voters and five candidates vying for three potential seats.
Each voter `V1 - V5` has an amount of stake equal to their number (e.g., `V1` has stake of 1, `V2`
has stake of 2, etc.). Every voter is also going to have a *load,* which initially starts at `0`.

```
Filled seats: 0
Open Seats: 3

Candidates:    A B C D E  L0
----------------------------
Voter V1 (1):  X X        0
Voter V2 (2):  X X        0
Voter V3 (3):  X          0
Voter V4 (4):    X X X    0
Voter V5 (5):  X     X    0
```

Let us now calculate the approval stake of each of the candidates. Recall that this is merely the
amount of all support for that candidate by all voters.

```
Candidate A: 1 + 2 + 3 + 5 = 11
Candidate B: 1 + 2 + 4 = 7
Candidate C: 4 = 4
Candidate D: 4 + 5 = 9
Candidate E: 0
```

The first step is easy - candidate `E` has 0 approval stake and can be ignored from here on out.
They will never be elected.

We can now calculate the initial scores of the candidates, which is `1 / approval_stake`:

```
Candidate A: 1 / 11 = 0.091
Candidate B: 1 / 7 = 0.143
Candidate C: 1 / 4 = 0.25
Candidate D: 1 / 9 = 0.111
Candidate E: N/A
```

For every edge, we are going to calculate the score, which is current score plus the total budget \*
the load of the voter divided by the approval stake of the candidate. However, since the load of
every voter starts at 0, and anything multiplied by 0 is 0, any addition will be `0 / x`, or 0. This
means that this step can be safely ignored for the initial round.

Thus, the best (lowest) score for Round 0 is Candidate A, with a score of `0.091`.

```
Candidates:    A B C D E  L0 L1
----------------------------------
Voter V1 (1):  X X        0  0.091
Voter V2 (2):  X X        0  0.091
Voter V3 (3):  X          0  0.091
Voter V4 (4):    X X X    0  0
Voter V5 (5):  X     X    0  0.091
```

```
Filled seats: 1 (A)
Open Seats: 2

Candidates:    A B C D E  L0
----------------------------
Voter V1 (1):  X X        0
Voter V2 (2):  X X        0
Voter V3 (3):  X          0
Voter V4 (4):    X X X    0
Voter V5 (5):  X     X    0
```

Candidate `A` is now safe; there is no way that they will lose their seat. Before moving on to the
next round, we need to update the scores on the edges of our graph for any candidates who have not
yet been elected.

We elided this detail in the previous round, since it made no difference to the final scores, but we
should go into depth here to see how scores are updated. We first must calculate the new loads of
the voters, and then calculate the new scores of the candidates.

Any voter who had one of their choices for candidate fill the seat in this round (i.e., voters `V1`,
`V2`, `V3`, and `V5`, who all voted for `A`) will have their load increased. This load increase will
blunt the impact of their vote in future rounds, and the edge (which will be used in determining
stake allocation later) is set to the score of the elected candidate minus the *current* voter load.

```
edge_load = elected_candidate_score - voter_load
voter_load = elected_candidate_score
```

In this instance, the score of the elected candidate is `0.091` and the voter loads are all `0`. So
for each voter who voted for `A`, we will calculate a new edge load `Voter` -> `A` of:

```
Edge load: 0.091 - 0 = 0.091
```

and a new voter load of:

```
Voter load: 0.091
```

As a reminder, here are the current scores. Loads of the voters are all `0`.

```
Candidate B : 0.143
Candidate C : 0.25
Candidate D : 0.111
```

Now, we go through the weighted graph and update the score of the candidate and the load of the
edge, using the algorithm:

```
candidate_score = candidate_score + ((voter_budget * voter_load) / candidate_approval_stake)
```

Without walking through each step, this gives us the following modifications to the scores of the
different candidates.

```
V1 updates B to 0.156
V2 updates B to 0.182
V4 updates B to 0.182
V4 updates C to 0.25
V4 updates D to 0.111
V5 updates D to 0.162
```

After scores are updated, the final scores for the candidates for this round are:

```
Candidate B: 0.182
Candidate C: 0.25
Candidate D: 0.162
```

`D`, with the lowest score, is elected. You will note that even though candidate `B` had more voters
supporting them, candidate `D` won the election due to their lower score. This is directly due to
the fact that they had the lowest score, of course, but the root reason behind them having a lower
score was both the greater amount of stake behind them and that voters who did not get one of their
choices in an earlier round (in this example, voter V4) correspond to a higher likelihood of a
candidate being elected.

We then update the loads for the voters and edges as specified above for any voters who voted for
candidate `D` (viz., `V4` and `V5`) using the same formula as above.

```
Filled seats: 2 (A, D)
Open Seats: 1

Candidates:    A B C D E  L0 L1    L2
-----------------------------------
Voter V1 (1):  X X        0  0.091 0.091
Voter V2 (2):  X X        0  0.091 0.091
Voter V3 (3):  X          0  0.091 0.091
Voter V4 (4):    X X X    0  0     0.162
Voter V5 (5):  X     X    0  0.091 0.162
```

Following a similar process for Round 2, we start with initial candidate scores of:

```
Candidate B : 0.143
Candidate C : 0.25
```

We can then update the scores of the remaining two candidates according to the algorithm described
above.

```
V1 updates B to 0.156
V2 updates B to 0.182
V4 updates B to 0.274
V4 updates C to 0.412
```

With the lowest score of `0.274`, Candidate `B` claims the last open seat. Candidates `A`, `D`, and
`B` have been elected, and candidates `C` and `E` are not.

Before moving on, we must perform a final load adjustment for the voters and the graph.

```
Filled seats: 3 (A, D, B)
Open Seats: 0

Candidates:    A B C D E  L0 L1    L2    L3
------------------------------------------
Voter V1 (1):  X X        0  0.091 0.091 0.274
Voter V2 (2):  X X        0  0.091 0.091 0.274
Voter V3 (3):  X          0  0.091 0.091 0.091
Voter V4 (4):    X X X    0  0     0.162 0.274
Voter V5 (5):  X     X    0  0.091 0.162 0.162
```

Now we have to determine how much stake every voter should allocate to each candidate. This is done
by taking the load of the each edge and dividing it by the voter load, then multiplying by the total
budget of the voter.

In this example, the weighted graph ended up looking like this:

```
Nominator: V1
	Edge to A load= 0.091
	Edge to B load= 0.183
Nominator: V2
	Edge to A load= 0.091
	Edge to B load= 0.183
Nominator: V3
	Edge to A load= 0.091
Nominator: V4
	Edge to B load= 0.113
	Edge to D load= 0.162
Nominator: V5
	Edge to A load= 0.091
	Edge to D load= 0.071
```

For instance, the budget of `V1` is `1`, the edge load to `A` is `0.091`, and the voter load is
`0.274`. Using our equation:

```
backing_stake (A) = voter_budget * edge_load / voter_load
```

We can fill these variables in with:

```
backing_stake (A) = 1 * 0.091 / 0.274 = 0.332
```

For `V1` backing stake of `B`, you can simply replace the edge load value and re-calculate.

```
backing_stake (B) = 1 * 0.183 / 0.274 = 0.668
```

Note that the total amount of all backing stake for a given voter will equal the total budget of the
voter, unless that voter had no candidates elected, in which case it will be 0.

The final results are:

```
A is elected with stake 6.807.
D is elected with stake 4.545.
B is elected with stake 3.647.

V1 supports: A with stake: 0.332 and B with stake: 0.668.
V2 supports: A with stake: 0.663 and B with stake: 1.337.
V3 supports: A with stake: 3.0.
V4 supports: B with stake: 1.642 and D with stake: 2.358.
V5 supports: A with stake: 2.813 and D with stake: 2.187.
```

You will notice that the total amount of stake for candidates `A`, `D`, and `B` equals (aside from
rounding errors) the total amount of stake of all the voters (`1 + 2 + 3 + 4 + 5 = 15`). This is
because each voter had at least one of their candidates fill a seat. Any voter whose had none of
their candidates selected will also not have any stake in any of the elected candidates.

## Optimizations

The results for nominating validators are further optimized for several purposes:

1. To reduce the number of edges, i.e. to minimize the number of validators any nominator selects
2. To ensure, as much as possible, an even distribution of stake among the validators
3. Reduce the amount of block computation time

### High-Level Description

After running the weighted Phragmén algorithm, a process is run that redistributes the vote amongst
the elected set. This process will never add or remove an elected candidate from the set. Instead,
it reduces the variance in the list of backing stake from the voters to the elected candidates.
Perfect equalization is not always possible, but the algorithm attempts to equalize as much as
possible. It then runs an edge-reducing algorithm to minimize the number of validators per
nominator, ideally giving every nominator a single validator to nominate per era.

To minimize block computation time, the staking process is run as an
[off-chain worker](https://substrate.dev/docs/en/knowledgebase/learn-substrate/off-chain-workers).
In order to give time for this off-chain worker to run, staking commands (bond, nominate, etc.) are
not allowed in the last quarter of each era.

These optimizations will not be covered in-depth on this page. For more details, you can view the
[Rust implementation of elections in Substrate](https://github.com/paritytech/substrate/blob/master/frame/elections-phragmen/src/lib.rs),
the
[Rust implementation of staking in Substrate](https://github.com/paritytech/substrate/blob/master/frame/staking/src/lib.rs),
or the `seqPhragménwithpostprocessing` method in the
[Python reference implementation](https://github.com/w3f/consensus/tree/master/NPoS). If you would
like to dive even more deeply, you can review the
[W3F Research Page on Sequential Phragmén Method](https://research.web3.foundation/en/latest/polkadot/NPoS/4.%20Sequential%20Phragm%C3%A9n%E2%80%99s%20method.html).

### Rationale for Minimizing the Number of Validators Per Nominator

Paying out rewards for staking from every validator to all of their nominators can cost a
non-trivial amount of chain resources (in terms of space on chain and resources to compute). Assume
a system with 200 validators and 1000 nominators, where each of the nominators has nominated 10
different validators. Payout would thus require `1_000 * 10`, or 10_000 transactions. In an ideal
scenario, if every nominator selects a single validator, only 1_000 transactions would need to take
place - an order of magnitude fewer. Empirically, network slowdown at the beginning of an era has
occurred due to the large number of individual payouts by validators to nominators. In extreme
cases, this could be an attack vector on the system, where nominators nominate many different
validators with small amounts of stake in order to slow the system at the next era change.

While this would reduce network and on-chain load, being able to select only a single validator
incurs some diversification costs. If the single validator that a nominator has nominated goes
offline or acts maliciously, then the nominator incurs a risk of a significant amount of slashing.
Nominators are thus allowed to nominate up to 16 different validators. However, after the weighted
edge-reducing algorithm is run, the number of validators per nominator is minimized. Nominators are
likely to see themselves nominating a single active validator for an era.

At each era change, as the algorithm runs again, nominators are likely to have a different validator
than they had before (assuming a significant number of selected validators). Therefore, nominators
can diversify against incompetent or corrupt validators causing slashing on their accounts, even if
they only nominate a single validator per era.

### Rationale for Maintaining an Even Distribution of Stake

Another issue is that we want to ensure that as equal a distribution of votes as possible amongst
the elected validators or council members. This helps us increase the security of the system by
ensuring that the minimum amount of tokens in order to join the active validator set or council is
as high as possible. For example, assume a result of five validators being elected, where validators
have the following stake: `{1_000, 20, 10, 10, 10}`, for a total stake of 1_050. In this case, a
potential attacker could join the active validator set with only 11 tokens, and could obtain a
majority of validators with only 33 tokens (since the attacker only has to have enough stake to
"kick out" the three lowest validators).

In contrast, imagine a different result with the same amount of total stake, but with that stake
perfectly equally distributed: `{210, 210, 210, 210, 210}`. With the same amount of stake, an
attacker would need to stake 633 tokens in order to get a majority of validators, a much more
expensive proposition. Although obtaining an equal distribution is unlikely, the more equal the
distribution, the higher the threshold - and thus the higher the expense - for attackers to gain
entry to the set.

### Rationale for Reducing Block Computing Time

Running the Phragmén algorithm is time-consuming, and often cannot be completed within the time
limits of production of a single block. Waiting for calculation to complete would jeopardize the
constant block production time of the network. Therefore, as much computation as possible is moved
to an offchain worker, which validators can work on the problem without impacting block production
time. By restricting the ability of users to make any modifications in the last 25% of an era, and
running the selection of validators by nominators as an offchain process, validators have a
significant amount of time to calculate the new active validator set and allocate the nominators in
an optimal manner.

There are several further restrictions put in place to limit the complexity of the election and
payout. As already mentioned, any given nominator can only select up to 16 validators to nominate.
Conversely, a single validator can have only {{ polkadot_max_nominators }} nominators. A drawback to
this is that it is possible, if the number of nominators is very high or the number of validators is
very low, that all available validators may be "oversubscribed" and unable to accept more
nominations. In this case, one may need a larger amount of stake to participate in staking, since
nominations are priority-ranked in terms of amount of stake.

### Phragmms (fka Balphragmms)

`Phragmms`, formerly known as `Balphragmms`, is a new election rule inspired by Phragmén and
developed in-house for Polkadot. In general, election rules on blockchains is an active topic of
research. This is due to the conflicting requirements for election rules and blockchains: elections
are computationally expensive, but blockchains are computationally limited. Thus, this work
constitutes state of the art in terms of optimization.

Proportional representation is a very important property for a decentralized network to have in
order to maintain a sufficient level of decentralization. While this is already provided by the
currently implemented `seqPhragmen`, this new election rule provides the advantage of the added
security guarantee described below. As far as we can tell, at the time of writing, Polkadot and
Kusama are the only blockchain networks that implement an election rule that guarantees proportional
representation.

The security of a distributed and decentralized system such as Polkadot is directly related to the
goal of avoiding *overrepresentation* of any minority. This is a stark contrast to traditional
approaches to proportional representation axioms, which typically only seek to avoid
underrepresentation.

#### Maximin Support Objective and PJR

This new election rule aims to achieve a constant-factor approximation guarantee for the *maximin
support objective* and the closely related *proportional justified representation* (PJR) property.

The maximin support objective is based on maximizing the support of the least-supported elected
candidate, or in the case of Polkadot and Kusama, maximizing the least amount of stake backing
amongst elected validators. This security-based objective translates to a security guarantee for
NPoS and makes it difficult for an adversarial whale’s validator nodes to be elected. The `Phragmms`
rule, and the guarantees it provides in terms of security and proportionality, have been formalized
in a [peer-reviewed paper](https://arxiv.org/pdf/2004.12990.pdf)).

The PJR property considers the proportionality of the voter’s decision power. The property states
that a group of voters with cohesive candidate preferences and a large enough aggregate voting
strength deserve to have a number of representatives proportional to the group’s vote strength.

#### Comparing Sequential Phragmén, MMS, and Phragmms

*Sequential Phragmén* (`seqPhragmen`) and `MMS` are two efficient election rules that both achieve
PJR.

Currently, Polkadot employs the `seqPhragmen` method for validator and council elections. Although
`seqPhramen` has a very fast runtime, it does not provide constant-factor approximation for the
maximin support problem. This is due to `seqPhramen` only performing an *approximate* rebalancing of
the distribution of stake.

In contrast, `MMS` is another standard greedy algorithm that simultaneously achieves the PJR
property and provides a constant factor approximation for maximin support, although with a
considerably slower runtime. This is because for a given partial solution, `MMS` computes a balanced
edge weight vector for each possible augmented committee when a new candidate is added, which is
computationally expensive.

We introduce a new heuristic inspired by `seqPhragmen`, `PhragMMS`, which maintains a comparable
runtime to `seqPhragmen`, offers a constant-factor approximation guarantee for the maximin support
objective, and satisfies PJR. This is the fastest known algorithm to achieve a constant-factor
guarantee for maximin support.

#### The New Election Rule: Phragmms

`Phragmms` is an iterative greedy algorithm that starts with an empty committee and alternates
between the `Phragmms` heuristic for inserting a new candidate and *rebalancing* by replacing the
weight vector with a balanced one. The main differentiator between `Phragmms` and `seqPhragmen` is
that the latter only perform an approximate rebalancing. Details can be found in
[Balanced Stake Distribution](#rationale-for-maintaining-an-even-distribution-of-stake).

The computation is executed by off-chain workers privately and separately from block production, and
the validators only need to submit and verify the solutions on-chain. Relative to a committee *A*,
the score of an unelected candidate *c* is an easy-to-compute rough estimate of what would be the
size of the least stake backing if we added *c* to committee *A*. Observing on-chain, only one
solution needs to be tracked at any given time, and a block producer can submit a new solution in
the block only if the block passes the verification test, consisting of checking:

1. Feasibility,
2. Balancedness, and
3. Local Optimality - The least stake backing of *A* is higher than the highest score among
   unelected candidates

If the tentative solution passes the tests, then it replaces the current solution as the tentative
winner. The official winning solution is declared at the end of the election window.

A powerful feature of this algorithm is the fact that both its approximation guarantee for maximin
support and the above checks passing can be efficiently verified in linear time. This allows for a
more scalable solution for secure and proportional committee elections. While `seqPhragmen` also has
a notion of score for unelected candidates, `Phragmms` can be seen as a natural complication of the
`seqPhragmen` algorithm, where `Phragmms` always grants higher score values to candidates and thus
inserts them with higher support values.

**To summarize, the main differences between the two rules are:**

- In `seqPhragmen`, lower scores are better, whereas in `Phragmms`, higher scores are better.
- Inspired by `seqPhragmen`, the scoring system of `Phragmms` can be considered to be more intuitive
  and does a better job at estimating the value of adding a candidate to the current solution, and
  hence leads to a better candidate-selection heuristic.
- Unlike `seqPhragmen`, in `Phragmms`, the edge weight vector *w* is completely rebalanced after
  each iteration of the algorithm.

The `Phragmms` election rule is currently being implemented on Polkadot. Once completed, it will
become one of the most sophisticated election rules implemented on a blockchain. For the first time,
this election rule will provide both fair representation (PJR) and security (constant-factor
approximation for the maximin support objection) to a blockchain network.

#### Algorithm

The `Phragmms` algorithm iterates through the available seats, starting with an empty committee of
size *k*:

1. Initialize an empty committee *A* and zero edge weight vector *w = 0*.

2. Repeat *k* times:

   - Find the unelected candidate with highest score and add it to committee *A*.
   - Re-balance the weight vector *w* for the new committee *A*.

3. Return *A* and *w*.

## External Resources

- [Phragmms](https://arxiv.org/pdf/2004.12990.pdf) - W3F research paper that expands on the
  sequential Phragmén method.
- [W3F Research Page on NPoS](https://research.web3.foundation/en/latest/polkadot/NPoS/1.%20Overview.html) -
  An overview of Nominated Proof of Stake as its applied to Polkadot.
- [Python Reference Implementations](https://github.com/w3f/consensus/tree/master/NPoS) - Python
  implementations of Simple and Complicated Phragmén methods.
- [Substrate Implementation](https://github.com/paritytech/substrate/blob/master/frame/staking/src/lib.rs) -
  Rust implementation used in Substrate.
- [Phragmén's and Thiele's Election Methods](https://arxiv.org/pdf/1611.08826.pdf) - 95-page paper
  explaining Phragmén's election methods in detail.
- [Phragmén’s Voting Methods and Justified Representation](https://aaai.org/ocs/index.php/AAAI/AAAI17/paper/download/14757/13791) -
  This paper by Brill *et al.* is the source for the simple Phragmén method, along with proofs about
  its properties.
- [Offline Phragmén](https://github.com/kianenigma/offline-phragmen) - Script to generate the
  Phragmén validator election outcome before the start of an era.
