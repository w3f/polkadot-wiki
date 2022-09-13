---
id: doc-thousand-validators
title: Thousand Validators Programme
sidebar_label: Thousand Validators Programme
description: Learn about the Thousand Validators Programme and how it can support your validator endeavors.
keywords: [thousand validators programme, validator, validate, maintain, TVP]
slug: ../thousand-validators
---

The Thousand Validators Programme is an initiative by Web3 Foundation and Parity Technologies to use
the funds held by both organizations to nominate validators in the community.

It serves two major purposes: 
1. Give validators a structured on-ramp to join the active set of
validators on Kusama and Polkadot 
2. Further decentralize the validator active set.

## How it Works

The [nominating backend](https://github.com/w3f/1k-validators-be) will routinely change its nominations at every {{ polkadot: era :polkadot }}{{ kusama: four eras :kusama }}. The backend does this by short-listing candidates by validity and then sorts validators by their weighted score in descending order. 

- Validators with a higher weighted score are selected for any possible slots. As validators are nominated and actively validate, their weighted scores decrease allowing other validators to be selected in subsequent rounds of assessment. 

- If a validator is active during a single nomination period (the time after a new nomination and before the next one) and does not break any of the requirements, it will have its rank increased by 1. Validators with higher rank have performed well within the programme for a longer period of time.

The backend nominates as many validators as it reasonably can in such a manner to allow each nominee an opportunity to be elected into the active set.

### Weights

Each candidate is assessed by on-chain parameters to produce a weighted score. In this section, we'll briefly review the weights of each metric and how they contribute to the total score.

#### Inclusion

The inclusion weight accounts for 40 points. It is assessed by an evaluation of the validator's inclusion in the active set over the past 84 eras. A candidate can be assured of full score if there were no stints of active validation in 84 eras.

#### Span Inclusion *

The span inclusion weight accounts for 40 points. It is assessed by an evaluation of the validator's inclusion in the active set over the past 28 eras.  A candidate can be assured of full score if there were no stints of active validation in 28 eras.

#### Discovered *

The discovered weight accounts for 5 points. It is determined by comparing the candidates tenure in the programme relative to other candidates. A candidate that is in the programme for a longer duration relative to the entire group of validators allows for a higher score.

#### Nominated *

The nominated weight accounts for 10 points, and it is assessed based on when the candidate was last nominated relative to the other candidates in the programme.

#### Rank *

The rank weight accounts for 5 points and is assessed relative to the ranks of other candidates within the programme.  

#### Unclaimed

The unclaimed weight relates to the number of payouts outstanding for greater than {{ polkadot: four :polkadot }}{{ kusama: sixteen :kusama }} eras. Each payout that exceeds this threshold would attribute a negative score of 10 points.

#### Bonded *

Candidates with a bond size that is relatively higher than others would receive a score of 50 points.

#### Faults *

A fault is attained when a candidate has an offline event when actively validating. A legitimate fault is irrevocable. Faults account for 5 points in the system and are relative to others in the programme.

#### Offline time

Candidates who have accumulated < 200 minutes offline time during the weekly period will receive 2 points in the system.  Offline time is judged by a candidate's connection to the W3F Telemetry and is reset on Sundays.

#### Location *

The system allocates a score of 40 points for candidates who host their validators in uniquely located data centres. A candidate's location is determined from Telemetry and is relative to the number of other candidates located at the same data centre.

#### Council

Candidates will receive a score of up to 50 points for voting for council members. Candidates may back as few as one candidate; to attain a full score of 50 points, the 1KV candidate should allocate > 75% of their bond to the respective council members.

#### Democracy

Candidates will receive 10 * 1KV points for each referendum they have voted on (Aye/Nay) to a limit of 100 points. Scores are based on votes for referendum {{ polkadot: 49 :polkadot }}{{ kusama: 163 :kusama }} and beyond.

\* Scores that are based on their relative position against others are assessed as follows:  

* The respective weight is assigned high and low percentiles. Any scores lower than the score at the low percentile and higher than the score at the high percentile are removed.  
* The weighted score is then obtained by ((candidate_value - low_threshold) / (high_threshold - low_threshold)) * weight.
- The default low and high percentiles are 10 and 90%, respectively.
- Inclusion and Span Inclusions are measured against low and high percentiles of 20 and 75%, respectively.
- Bonded is measured against low and high percentiles of 5 and 85%, respectively.
- Finally, location is measured against low and high percentiles of 10 and 95%, respectively. 

## Setting up a Validator

Please see the guide on how to [set up a validator](../maintain/maintain-guides-how-to-validate-polkadot.md)
as well as additional information on how to [secure a validator](../maintain/maintain-guides-secure-validator.md).

## How to Apply

{{ kusama: In order to apply to the Kusama programme, set up your node to adhere to the requirements below 
and fill in the [application form][kusama 1kv form].  The process of review and addition is a manual one; you'll be invited to the 1KV Kusama channel and added to the leader board, if accepted. :kusama }}

{{ polkadot: **Entrance to the Polkadot programme requires a rank of 25 or higher in the Kusama programme.** 
Attaining a rank of 25 usually takes around two months. The leaderboard is available [here][leaderboard]. In order to apply to the Polkadot programme, set up your node to adhere to the requirements below
and fill in the [application form][polkadot 1kv form]. You will hear back from the team shortly. :polkadot }}

#### Requirements

- Verified identity (see [here][identity instructions] for instructions)
- Connect to dedicated telemetry (use
  `--telemetry-url 'wss://telemetry-backend.w3f.community/submit 1'` when starting the node)
- {{ kusama: Minimum of 10 KSM self-stake :kusama }}{{ polkadot: Minimum of 5_000 DOTs self stake :polkadot }} (exceptions by approval for good intentions)
- {{ kusama: No more than 15% commission :kusama }}{{ polkadot: No more than 5% commission :polkadot }}
- Separate controller and stash (or have a Staking proxy set up)
- Must be on the latest release
- {{ kusama: Max two nodes (under same sub/super identity) :kusama }}{{ polkadot: Reward destination 'Staked' :polkadot }}
- Validators must operate nodes themselves, they may not be operated by third parties or staking providers.

#### Nominators

The below addresses are the stash / controller pairs for the primary nominators involved in the 
{{ kusama: Kusama :kusama }}{{ polkadot: Polkadot :polkadot }}
Thousand Validators programme. They are formatted like "`stash` / `controller`".

- {{ kusama: `G1rrUNQSk7CjjEmLSGcpNu72tVtyzbWdUvgmSer9eBitXWf` / `H9BFvNPTqDEmWZ63M82ohrFmvEFASm25ErUMzmXDrbAr1kq` :kusama }}{{ polkadot: `14Ns6kKbCoka3MS4Hn6b7oRw9fFejG8RH5rq5j63cWUfpPDJ` / `16XJHQ58dEPnZn5J5YqmRcJmKtvVFFMoMrXgj6fWJfeGGkQw` :polkadot }}
- {{ kusama: `HgTtJusFEn2gmMmB5wmJDnMRXKD6dzqCpNR7a99kkQ7BNvX` / `H4UgNEEN92YXz96AyQgwkJQSpXGdptYLkj9jXVKrNXjQHRJ` :kusama }}{{ polkadot: `12RYJb5gG4hfoWPK3owEYtmWoko8G6zwYpvDYTyXFVSfJr8Y` / `13GLXK1TZKKDM9aRBBK3VYZymHjKChtQjJznsRqaR9dwwrQU` :polkadot }}
- {{ kusama: `EX9uchmfeSqKTM7cMMg8DkH49XV8i4R7a7rqCn8btpZBHDP` / `H54GA3nq3xeNrdbHkepAufSPMjaCxxkmfej4PosqD84bY3V` :kusama }}{{ polkadot: - `16GMHo9HZv8CcJy4WLoMaU9qusgzx2wxKDLbXStEBvt5274B` / `16eM1npMwKzpGy48NDna1jC6P71S783wjpbdeKT8RgzQx8Jd` :polkadot }}

A time delay proxy is used as the interaction method for some of these accounts.

{{ kusama: Within the Kusama programme, there are several other nominator accounts that can exhaustively be determined by parsing data found [here](https://kusama.w3f.community/nominators) :kusama }}

Since approximately early January 2021, the nominators will select an automatic number of validators to nominate based on the lowest amount staked for a validator and the amount of funds it holds. This can be anywhere from a few validators receiving nomination from a single nominator, to the max of {{ kusama: 24 :kusama }}{{ polkadot: 16 :polkadot }} nominators on {{ kusama: Kusama :kusama }}{{ polkadot: Polkadot :polkadot }}.

[leaderboard]: https://thousand-validators.kusama.network/#/leaderboard
[kusama 1kv form]: https://forms.gle/xqYLoceTwg1qvc9i6
[polkadot 1kv form]: https://docs.google.com/forms/d/e/1FAIpQLSdS-alI-J2wgIRCQVjQC7ZbFiTnf36hYBdmO-1ARMjKbC7H9w/viewform
[identity instructions]: ../learn/learn-identity.md#setting-an-identity
