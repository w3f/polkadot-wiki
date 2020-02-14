---
id: learn-phragmen
title: Sequential Phragmen Method
sidebar_label: Sequential Phragmen Method
---

## What is the sequential Phragmen method?

The sequential Phragmen method is a multi-winner election method introduced by Edvard Phragmen in the 1890s.

The quote below taken from the reference [Phragmen paper][Phragmen Paper] sums up the purpose of the sequential Phragmen method:

> The problem that Phragmen’s methods try to solve is that of electing a set of a given numbers of persons from a larger set of candidates. Phragmen discussed this in the context of a parliamentary election in a multi-member constituency; the same problem can, of course, also occur in local elections, but also in many other situations such as electing a board or a committee in an organization.

## Where is the Phragmen method used in Polkadot?

### NPoS: Validator Elections

The sequential Phragmen method is used in the Nominated Proof-of-Stake scheme to elect validators based on their own
self-stake and the stake that is voted to them from nominators. It also tries to equalize the weights between the validators
after each election round. Since validators are paid equally in Polkadot, it is important that the stake
behind each validator is spread out. The equalization method is ran twice for every validator election. The first iteration
will do a rough equalization among all validator candidates in order to determine the subset that will become the next
active validators. The second iteration runs only among the elected candidates to equalize the stake between the ones
which are elected.

### Council Elections

The Phragmen method is also used in the council election mechanism. When you vote for council members, you can select up
to 16 different candidates, and then place a reserved bond which is the weight of your vote. Phragmen will run once on
every election to determine the top candidates to assume council positions and then again amongst the top candidates
to equalize the weight of the votes behind them as much as possible.

## What does it mean for node operators?

Phragmen is something that will run in the background and requires no extra effort from you. However, it is good to 
understand how it works since it means that not all the stake you've been nominated will end up on your validator
after an election. Nominators are likely to nominate a few different validators that they trust will do a good job
operating their nodes.

You can use the [offline-phragmen](https://github.com/kianenigma/offline-phragmen) script for predicting the outcome
of a validator election ahead of a new era beginning.

## Understanding Phragmen

This section explains the sequential Phragmen method in-depth and walks through examples.

### Basic Phragmen

### Rationale

In order to understand the Sequential Phragmen method, we must first understand the original Phragmen method.  There must be some group of candidates, a group of seats they are vying for (which is less than the size of the group of candidates), and some group of voters.  The voters can cast an approval vote - that is, they can signal approval for any subset of the candidates.  The subset must be a minimum size of one (i.e., one cannot vote for no candidates) and a maximum size of one less than the number of candidates (i.e., one cannot vote for all candidates).

### Algorithm

The Phragmen method will iterate, selecting one seat at a time, according to the following rules:

1. Candidates submit their ballots, marking which candidates they approve of.  Ballots will not be modified after submission.
2. An initial weight of 0 is set for each ballot.
3. The candidate who wins the next available seat is the one where the ballots of their supporters would have the _least average (mean) cost_ if that candidate wins.
4. The _n_ ballots that approved that winning candidate get _1/n_ added to their weight.
5. The weight of all ballots that supported the winner of this round are averaged out so that they are equal.
6. If there are any more seats, go back to step 3.  Otherwise, the selection ends.

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

In this example, we can see that voter `V1` approves only of candidate `B`, voter `V2` approves of candidates `C` and `D`, etc.  Voters can approve any number of candidates between 1 and `number_of_candidates - 1`.  An initial "weight" of `0` is set for each ballot (`L0` = weight after round `0`, i.e., the "round" before the first round).  We shall see shortly how this weight is updated and used to select candidates.

We will now run through an iterative algorithm, with each iteration corresponding to one "seat".  Since there are three seats, we will walk through three rounds.

For the first round, the winner is simply going to be the candidate with the most votes.  Since all loads are equal, the lowest average load will be the candidate with the highest n, since `1/n` will get smaller as `n` increases.  For this first example round, for instance, candidate `A` had only one ballot vote for them.  Thus, the average load for candidate A is `1/1`, or 1.  Candidate C has two ballots approving of them, so the average load is `1/2`.  Candidate B has the lowest average load, at `1/4` and they get the first seat.  Ballots loads are now averaged out, although for the first iteration, this will have not have any effect.

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

We are now down to candidates `A`, `C`, and `D` for two open seats.  There is only one voter (`V4`) for `A`, with weight `1/4`.   `C` has two voters, `V2` and `V5`, with weights of `0` and `1/4`.  `D` has three voters approving of them, `V2`, `V3`, and `V5`, with weights of `0`, `1/4`, and `1/4`, respectively.

If Candidate `A` wins, the average load would be `(1/4 + 1/1) / 1`, or `5/4`.  If candidate `C` wins, the average load would be `(0 + 1/2) + (1/4 + 1/2) / 2`, or `5/8`.  If candidate `D` wins, the average load would be `(0 + 1/3) + (1/4 + 1/3) + (1/4 + 1/3) / 3`, or `1/2`.  Since `1/2` is the lowest average load, candidate D wins the second round.

Now everybody who voted for Candidate `D` has their weight set to the average, `1/2` of all the weights.

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


There is now one seat open and two candidates, `A` and `C`.  Voter `V4` is the only one voting for `A`, so if `A` wins then the average weight would be `(1/4 + 1/1) / 1`, or `5/4`.  Voters `V2` and `V5` (both with weight `1/2`) support `C`, so if `C` wins the average weight would be `((1/2 + 1) + (1/2 + 1)) / 2`, or `3/2`.  Since the average weight would be lower with `A`, `A` wins the final seat.

```
Filled seats: 3 (B, D, A)
Open Seats: 0

Candidates:   A B C D  L0 L1  L2  L3
------------------------------------
Voter V1:       X      0  1/4 1/4 1/4
Voter V2:         X X  0  0   1/2 1/2
Voter V3:       X   X  0  1/4 1/2 1/2
Voter V4:     X X      0  1/4 1/4 5/4
Voter V5:       X X X  0  1/4 1/2 1/2
```

Note that even though more voters voted for `C` in the final round, `A` won due to `V4`'s lower weight.  This shows how Phragmen gives extra "weight" to those who have not had their choices already taken into account in previous rounds.

Another interesting characteristic of this calculation is that the total weight of all voters will always equal the number of seats filled in that round.  In the zeroth round, weight starts at `0` and there are no seats filled.  After the first round, the total of all weights is `1`, after the second round it is `2`, etc.

### Sequential Phragmen

### Rationale

While this method works well if all voters have equal weight, this is not the case in Polkadot.  Elections for both validators and candidates for the Polkadot Council are weighted by the number of tokens held by the voters.  This makes elections more similar to a corporate shareholder election than a traditional political election, where some members have more pull than others.  Someone with a single token will have much less voting power than someone with 100.  Although this may seem anti-democratic, in a pseudonymous system, it is trivial for someone with 100 tokens to create 100 different accounts and spread their wealth to all of their pseudonyms.


Therefore, not only do we want want to allow voters to have their preferences expressed in the result, but do so while keeping as equal a distribution of their stake as possible.  The Sequential Phragmen method allows us to reach these goals.

### Algorithm

Sequential Phragmen is similar to Basic Phragmen in that it selects candidates sequentially, one per round, until the maximum number of candidates are elected.  However, it has additional features to also allocate weight (stake) behind the candidates.

_Note: in terms of validator selection, for the following algorithm, you can think of "voters" as "nominators" and "candidates" as "validators"._

1. Candidates are elected, one per round, and added to the set of successful candidates (they have won a "seat").  This aspect of the algorithm is very similar to the "basic Phragmen" algorithm described above.
2. However, as candidates are elected, an edge weight vector mapping is built, defining the weights of each each selection of a validator by each candidate.

In more depth, the algorithm operates like so:

1. Create a list of all voters, their total amount of stake, and which validators they support.
2. Generate an initial edge-weighted graph mapping from voters to candidates, where each edge weight is the total _potential_ weight (stake) given by that voter.  The sum of all potential weight for a given candidate is called their _approval stake_.
3. Now we start electing candidates.  For the list of all candidates who have not been elected, get their score, which is equal to `1 / approval_stake`.
4. For each voter, update the score of each candidate they support by adding their total budget (stake) multiplied by the load of the candidate and then dividing by that candidate's approval stake (`voter_budget * voter_load / candidate_approval_stake`.
5. Determine the candidate with the lowest score and elect that candidate.  Remove the elected candidate from the pool of potential candidates.
6. The load for each edge connecting to the winning candidate is updated, with the edge load set to the score of the candidate minus the voter's load, and the voter's load then set to the candidate's score.
7. If there are more candidates to elect, go to Step 3.  Otherwise, continue to step 8.
8. Now the stake is distributed amongst each nominator who backed at least one elected candidate.  The backing stake for each candidate is calculated by taking the budget of the voter and multiplying by the edge load then dividing by the candidate load (`voter_budget * edge_load / candidate_load`).

### Example

_Note: floating-point numbers in this example are rounded off to three decimal places._

In the following example, there are five voters and five candidates vying for three potential seats.  Each voter `V1 - V5` has an amount of stake equal to their number (e.g., `V1` has stake of 1, `V2` has stake of 2, etc.).  Every voter is also going to have a _load_ which initially starts at `0`.

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

Let us now calculate the approval stake of each of the candidates.  Recall that this is merely the amount of all support for that candidate by all voters.

```
Candidate A: 1 + 2 + 3 + 5 = 11
Candidate B: 1 + 2 + 4 = 7
Candidate C: 4 = 4
Candidate D: 4 + 5 = 9
Candidate E: 0
```

The first step is easy - candidate `E` has 0 approval stake and can be ignored from here on out.  They will never be elected.

We can now calculate the initial scores of the candidates, which is `1 / approval_stake1`:

```
Candidate A: 1 / 11 = 0.091
Candidate B: 1 / 7 = 0.143
Candidate C: 1 / 4 = 0.25
Candidate D: 1 / 9 = 0.111
Candidate E: N/A
```

For every edge, we are going to calculate the score, which is current score plus the total budget * the load o the voter divided by the approval stake of the candidate.  However, since the load of every voter starts at 0, and anything multiplied by 0 is 0, any addition will be `0 / x`, or 0.  This means that this step can be safely ignored for the initial round.

Thus, the best (lowest) score for Round 0 is Candidate A, with a score of `0.091`.

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

Candidate `A` is now safe; there is no way that they will lose their seat.  Before moving on to the next round, we need to update the scores on the edges of our graph for any candidates who have not yet been elected.

We elided this detail in the previous round, since it made no difference to the final scores, but we should go into depth here to see how scores are updated.  We first must calculate the new loads of the voters, and then calculate the new scores of the candidates.

Any voter who had one of their choices for candidate fill the seat in this round (i.e., voters `V1`, `V2`, `V3`, and `V5`, who all voted for `A`) will have their load increased.  This load increase will blunt the impact of their vote in future rounds, and the edge (which will be used in determining stake allocation later) is set to the score of the elected candidate minus the _current_ voter load.

```
edge_load = elected_candidate_score - voter_load
voter_load = elected_candidate_score
```

In this instance, the score of the elected candidate is `0.091` and the voter loads are all `0`.  So for each voter who voted for `A`, we will calculate a new edge load `Voter` -> `A` of:

```
Edge load: 0.091 - 0 = 0.091
```

and a new voter load of:

```
Voter load: 0.091
```

As a reminder, here are the current scores.  Loads of the voters are all `0`.

```
Candidate B : 0.143
Candidate C : 0.25
Candidate D : 0.111
```

Now, we go through the weighted graph and update the score of the candidate and the load of the edge, using the algorithm:

```
candidate_score = candidate_score + ((voter_budget * voter_load) / candidate_approval_stake)
```

Without walking through each step, this gives us the following modifications to the scores of the different candidates.

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

`D`, with the lowest score, is elected.  You will note that even though candidate `B` had more voters supporting them, candidate `D` won the election due to their lower score.  This is directly due to the fact that they had the lowest score, of course, but the root reason behind them having a lower score was both the greater amount of stake behind them and that voters who did not get one of their choices in an earlier round (in this example, voter V4) correspond to a higher likelihood of a candidate being elected.

We then update the loads for the voters and edges as specified above for any voters who voted for candidate `D` (viz., `V4` and `V5`) using the same formula as above.

```
Filled seats: 2 (A, D)
Open Seats: 1

Candidates:    A B C D E  L0 L1    L2
-----------------------------------
Voter V1 (1):  X X        0  0.091 0.091
Voter V2 (2):  X X        0  0.091 0.091
Voter V3 (3):  X          0  0.091 0.091
Voter V4 (4):    X X X    0  0     0.091
Voter V5 (5):  X     X    0  0.091 0.162
```

W

Following a similar process for Round 2, we start with initial candidate scores of:

```
Candidate B : 0.143
Candidate C : 0.25
```

We can then update the scores of the remaining two candidates according to the algorithm described above.

```
	 V1 updating B  to  0.156
	 V2 updating B  to  0.182
	 V4 updating B  to  0.274
	 V4 updating C  to  0.412
```

With the lowest score of `0.274`, Candidate `B` claims the last open seat.

Candidates `A`, `D`, and `B` have been elected, and candidates `C` and `E` are not.  We now must split the stake between the candidates who won from the voters who voted for them.

We must perform a final load adjustment for the voters and the graph.

```
Filled seats: 3 (A, D, B)
Open Seats: 0

Candidates:    A B C D E  L0 L1    L2    L3
------------------------------------------ 
Voter V1 (1):  X X        0  0.091 0.091 0.274
Voter V2 (2):  X X        0  0.091 0.091 0.274
Voter V3 (3):  X          0  0.091 0.091 0.091
Voter V4 (4):    X X X    0  0     0.091 0.274
Voter V5 (5):  X     X    0  0.091 0.162 0.162
```

Now we have to determine how much stake every voter should allocate to each candidate.  This is done by taking the load of the each edge and dividing it by the voter load, then multiplying by the total budget of the voter.

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

For instance, the budget of `V1` is `1`, the edge load to `A` is `0.091`, and the voter load is `0.274`.  Using our equation:

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

Note that the total amount of all backing stake for a given voter will equal the total budget of the voter, unless that voter had no candidates elected, in which case it will be 0.

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

You will notice that the total amount of stake for candidates `A`, `D`, and `B` equals (aside from rounding errors) the total amount of stake of all the voters (`1 + 2 + 3 + 4 + 5 = 15`).  This is because each voter had at least one of their candidates fill a seat.  Any voter whose had none of their candidates selected will also not have any stake in any of the elected candidates.


## Optimizations

There are further optimizations that can be done to more evenly distribute the load (which is a desirable feature, as discussed below).  These optimizations will not be covered on this page, but can be reviewed at the [W3F Research Page on Sequential Phragmen Method](https://research.web3.foundation/en/latest/polkadot/NPoS/4.%20Sequential%20Phragm%C3%A9n%E2%80%99s%20method.html).

### Rationale

Another issue is that we want to ensure that as equal a distribution of votes as possible amongst the elected validators or council members.  This helps us increase the security of the system by ensuring that the minimum amount of tokens in order to join the active validator set or council is as high as possible.  For example, imagine a result of five validators being elected, where validators have the following stake: `{1000, 20, 10, 10, 10}`, for a total stake of 1_050.  In this case, a potential attacker could join the active validator set with only 11 tokens, and could obtain a majority of validators with only 33 tokens (since the attacker only has to have enough stake to "kick out" the three lowest validators).

In contrast, imagine a different result with the same amount of total stake, but with that stake perfectly equally distributed: `{210, 210, 210, 210, 210}`.  With the same amount of stake, an attacker would need to stake 633 tokens in order to get a majority of validators, a much more expensive proposition.  Although obtaining an equal distribution is unlikely, the more equal the distribution, the higher the threshold - and thus the higher the expense - for attackers to gain entry to the set.

Therefore, in practice, we can also add post-processing to equalize the weights after the election.

## External Resources

- [W3F Research Page on Sequential Phragmen Method](https://research.web3.foundation/en/latest/polkadot/NPoS/4.%20Sequential%20Phragm%C3%A9n%E2%80%99s%20method.html) - The formal adaptation of the Phragmen method as applied to Polkadot validators.
- [Python Reference Implementations](https://github.com/w3f/consensus/tree/master/NPoS) - Implementations of Simple and Complicated Phragmen methods.
- [Substrate Implementation](https://github.com/paritytech/substrate/blob/master/core/phragmen/src/lib.rs) - Rust implementation used in the Substrate Runtime Module Library.
- [Phragmen's and Thiele's Election Methods](https://arxiv.org/pdf/1611.08826.pdf) - 95-page paper explaining Phragmen's election methods in detail.
- [Offline Phragmen](https://github.com/kianenigma/offline-phragmen) - Script to generate the Phragmen validator election outcome before the start of an era.

[Phragmen Paper]: https://arxiv.org/pdf/1611.08826.pdf
