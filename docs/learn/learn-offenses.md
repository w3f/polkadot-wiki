---
id: learn-offenses
title: Offenses & Slashes on Polkadot
sidebar_label: Offenses & Slashes
description: Offenses and Slashes in the Polkadot Ecosystem.
keyword: [nominate, nominator, offenses, slashes, validator, equivocation, disabling]
slug: ../learn-offenses
---

:::info Content subject to change

The material provided here is based on the changes introduced by Step 2 of the _Disabling_ feature.
See [this page](https://github.com/orgs/paritytech/projects/119/views/15?pane=issue&itemId=61684472)
for more information.

:::

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is a public permissionless network.
As such, it has a mechanism to disincentivize offenses and incentivize good behavior. Below, you can
find a summary of punishments for specific offenses:

|               Offense                | [Slash (%)](#slashing) | [On-chain Disabling](#disabling) | Off-chain Disabling | [Rep](#rep) |
| :----------------------------------: | :--------------------: | :------------------------------: | :-----------------: | :---------: |
|           Backing Invalid            |          100%          |               Yes                | Yes (High Priority) |     No      |
|           ForInvalid Vote            |           -            |                No                | Yes (Mid Priority)  |     No      |
|         AgainstValid Vote          |           -            |                No                | Yes (Low Priority)  |     No      |
| GRANDPA / BABE / BEEFY Equivocations |       0.01-100%        |               Yes                |         No          |     No      |
|    Seconded + Valid Equivocation     |           -            |                No                |         No          |     No      |
|     Double Seconded Equivocation     |           -            |                No                |         No          |     Yes     |

## Offenses

:::info Learn more about the parachain protocol

To better understand the terminology used for offenses, it is recommended to get familiar with the
[parachain protocol](./learn-parachains-protocol.md).

:::

On {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, there are six main validator offenses as
shown below.

- Backing Invalid: A para-validator is backing an invalid block.
- ForInvalid Vote: A validator (secondary checker) votes in favor of an invalid block.
- AgainstInvalid Vote: A validator (secondary checker) is voting against an invalid block.
- Equivocation: A validator produces two or more of the same block or vote.
  - GRANDPA and BEEFY Equivocation: A validator signs two or more votes in the same round on
    different chains.
  - BABE Equivocation: A validator produces two or more blocks on the Relay Chain in the same time
    slot.
- Seconded + Valid Equivocation: **TODO**
- Double Seconded Equivocation: **TODO**

### Equivocation

Equivocation events can occur when a validator produces two or more of the same block; under this
condition, it is referred to as a BABE equivocation. Equivocation may also happen when a validator
signs two or more of the same consensus vote; under this condition, it is referred to as a GRANDPA
Equivocation. Equivocations usually occur when duplicate signing keys reside on the validator host.
If keys are never duplicated, the probability of an equivocation slash decreases to near 0.

## Punishments

On {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, offenses to the network can be
punished depending on their severity. There are three main punishments: slashing, disabling, and
rep.

### Slashing

**Slashing** removes part of a validator’s total stake (own + nominated) and can range from as
little as 0.01% or rise to 100%. In all instances, slashes are accompanied by a loss of nominators.

Slashing will happen if a validator misbehaves in the network. They and their nominators will get
slashed by losing a percentage of their staked
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}.

Any slashed {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} will be added to the
[Treasury](./archive/learn-treasury.md). The rationale for this (rather than burning or distributing
them as rewards) is that slashes may be reverted by simply paying out from the Treasury. This would
be useful in situations such as faulty slashes. In the case of legitimate slashing, tokens are moved
away from malicious validators to those building the ecosystem through the normal Treasury process.

Slashing only occurs for active validations for a given nominator, and slashes are not mitigated by
having other inactive or waiting nominations. They are also not mitigated by the validator operator
running separate nodes; each node is considered its own entity for slashing purposes.

:::info Multiple Active Nominations

In rare instances, with very large bonds, a nominator may actively nominate several validators in a
single era. In this case, the slash is proportionate to the amount staked to that specific
validator. Note that you cannot control the percentage of stake allocated to each validator or
choose who your active validator will be (except in the trivial case of nominating a single
validator). Staking allocations are controlled by the [Phragmén algorithm](learn-phragmen.md).

:::

Once a validator gets slashed, it goes into the state as an "unapplied slash". You can check this
via
[Polkadot-JS UI](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/staking/slashes).
The UI shows it per validator, followed by all the affected nominators and the amounts. While
unapplied, a governance proposal can be made to reverse it during this period
({{ polkadot: <RPC network="polkadot" path="consts.staking.bondingDuration" defaultValue={28} filter="erasToDays"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.staking.bondingDuration" defaultValue={28} filter="erasToDays"/> :kusama }}
days). After the grace period, the slashes are applied.

A slash may occur under the circumstances below:

1.  Equivocation – A slash of 0.01% is applied with as little as a single evocation. The slashed
    amount increases to 100% incrementally as more validators also equivocate.
2.  Malicious action – This may result from a validator trying to represent the contents of a block
    falsely . Slashing penalties of 100% may apply.
3.  Application related (bug or otherwise) – The amount is unknown and may manifest as scenarios 1
    and 2 above.

#### Slash for Equivocation

The following levels of offense are
[defined](https://research.web3.foundation/Polkadot/security/slashing/amounts). However, these
particular levels are not implemented or referred to in the code or the system; they are meant as
guidelines for different levels of severity for offenses.

- Level 1: Isolated equivocation slashes a minimal amount of the stake.
- Level 2: Misconducts unlikely to be accidental but do not harm the network's security to any large
  extent. Examples include concurrent equivocation or isolated cases of unjustified voting in
  [GRANDPA](learn-consensus.md). Slashes a moderately small amount of the stake.
- Level 3: misconduct that poses severe security or monetary risk to the system or mass collusion.
  Slashes all or most of the stake behind the validator.

The following are scenarios that build towards slashes under equivocation:

1.  Cloning a server, i.e., copying all contents when migrating to new hardware. This action should
    be avoided. If an image is desired, it should be taken before keys are generated.
2.  High Availability (HA) Systems – Equivocation can occur if there are any concurrent operations,
    either when a failed server restarts or if a false positive event results in both servers being
    online simultaneously. HA systems are to be treated with extreme caution and are not advised.
3.  The keystore folder is copied when attempting to copy a database from one instance to another.  
    It is important to note that equivocation slashes occur with a single incident. This can happen
    if duplicated keystores are used for only a few seconds. A slash can result in losing nominators
    and funds, removal from the Thousand Validator Programme, and reputational damage.

See the next section to understand how slash amounts for equivocations are calculated. If you want
to know more details about slashing, please look at our
[research page](https://research.web3.foundation/Polkadot/security/slashing/amounts).

#### Slash Calculation for Equivocation

Both GRANDPA and BABE equivocation use the same formula for calculating the slashing penalty:

    Let x = offenders, n = total number of validators in the active set

    min((3 * x / n )^2, 1)

For example, assume that there are 100 validators in the active set, and one equivocates in a slot
(for our purposes, it does not matter whether it was a BABE or GRANDPA equivocation). This is
unlikely to be an attack on the network but much more likely to be a misconfiguration of a
validator. The penalty would be min(3 \* 1 / 100)^2, 1) = 0.0009, or a 0.09% slash for that
validator (i.e., the stake held by the validator and its nominators).

Now, assume that a group is running several validators, and they all have an issue in the same slot.
The penalty would be min((3 \* 5 / 100)^2, 1) = 0.0225, or a 2.25% slash. If 20 validators
equivocate, this is a much more serious offense and possibly indicates a coordinated attack on the
network, and so the slash will be much greater - min((3 \* 20 / 100)^2, 1) = 0.36, or a 36% slash on
all of these validators and their nominators. All slashed validators will also be chilled.

The example above shows the risk of nominating or running many validators in the active set. While
rewards grow linearly (two validators will get you approximately twice as many staking rewards as
one), slashing grows exponentially. A single validator equivocating causes a 0.09% slash, two
validators equivocating does not cause a 0.09 \* 2 = 0.18% slash, but rather a 0.36% slash - 4x as
much as the single validator.

Validators may run their nodes on multiple machines to ensure they can still perform validation work
if one of their nodes goes down. Still, validator operators should be cautious when setting these
up. Equivocation is possible if they do not have good coordination in managing signing machines.

#### Good Practices to Avoid Slashing

The following are advised to node operators to ensure that they obtain pristine binaries or source
code and to ensure the security of their node:

1.  Always download either source files or binaries from the official Parity repository
2.  Verify the hash of downloaded files.
3.  Use the W3F secure validator setup or adhere to its principles
4.  Ensure essential security items are checked, use a firewall, manage user access, use SSH
    certificates
5.  Avoid using your server as a general-purpose system. Hosting a validator on your workstation or
    one that hosts other services increases the risk of maleficence.

Below are some examples of small equivocations that happened in the past.

| Network  | Era  | Event Type         | Details                                                                                                                                                                                                                                                                                                                       | Action Taken                                                                                                                       |
| -------- | ---- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Polkadot | 774  | Small Equivocation | [The validator](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io/$165562246360408hKCfC:matrix.org?via=matrix.parity.io&via=corepaper.org&via=matrix.org) migrated servers and cloned the keystore folder. The on-chain event can be viewed [here](https://polkadot.subscan.io/extrinsic/11190109-0?event=11190109-5). | The validator did not submit a request for the slash to be canceled.                                                               |
| Kusama   | 3329 | Small Equivocation | The validator operated a test machine with cloned keys; the test machine was online at the same time as the primary, which resulted in a slash. Details can be found [here](https://kusama.polkassembly.io/post/1343).                                                                                                        | The validator requested a slash cancellation, but the council declined.                                                            |
| Kusama   | 3995 | Small Equivocation | The validator noticed several errors, after which the client crashed, and a slash was applied. The validator recorded all events and opened GitHub issues to allow for technical opinions to be shared. Details can be found [here](https://kusama.polkassembly.io/post/1733).                                                | The validator requested to cancel the slash. The council approved the request as they believed the error was not operator-related. |

#### Slashing Across Eras

There are three main difficulties to account for with slashing in NPoS:

- A nominator can nominate multiple validators and be slashed via any of them.
- Until slashed, the stake is reused from era to era. Nominating with N coins for E eras in a row
  does not mean you have N\*E coins to be slashed - you've only ever had N.
- Slashable offenses can be found after the fact and out of order.

To balance this, we only slash for the maximum slash a participant can receive in some time period
rather than the sum. This ensures protection from overslashing. Likewise, the period over which
maximum slashes are computed is finite, and the validator is chilled with nominations withdrawn
after a slashing event, as stated in the previous section. This prevents rage-quit attacks in which,
once caught misbehaving, a participant deliberately misbehaves more because their slashing amount is
already maxed out.

### Disabling

**Disabling** stops validators from performing specific actions. Disabling is further divided into:

- On-chain disabling lasts for a whole era and stops validators from block authoring, backing
  through runtime filtering, initiating a dispute, and backing. It also makes other nodes ignore
  backing statements.
- Off-chain disabling lasts for a session, is caused by losing a dispute, and stops validators from
  initiating a dispute.

Off-chain disabling is always a lower priority than on-chain disabling. Off-chain disabling
prioritizes disabling first backers, then ForInvalid, then AgainstValid.

### Rep

**TODO**
