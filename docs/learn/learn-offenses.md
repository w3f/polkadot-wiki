---
id: learn-offenses
title: Offenses & Slashes on Polkadot
sidebar_label: Offenses & Slashes
description: Offenses and Slashes in the Polkadot Ecosystem.
keyword: [nominate, nominator, offenses, slashes, validator]
slug: ../learn-offenses
---

### Slashing

Slashing will happen if a validator misbehaves in the network. They and their nominators will get
slashed by losing a percentage of their bonded/staked DOT.

Any slashed DOT will be added to the [Treasury](./archive/learn-treasury.md). The rationale for this
(rather than burning or distributing them as rewards) is that slashes may then be reverted by the
Council by simply paying out from the Treasury. This would be useful in situations such as faulty
slashes. In the case of legitimate slashing, it moves tokens away from malicious validators to those
building the ecosystem through the normal Treasury process.

Validators with a larger total stake backing them will get slashed more harshly than less popular
ones, so we encourage nominators to shift their nominations to less popular validators to reduce
their possible losses.

It is important to realize that slashing only occurs for active validations for a given nominator,
and slashes are not mitigated by having other inactive or waiting nominations. They are also not
mitigated by the validator operator running separate validators; each validator is considered its
own entity for purposes of slashing, just as they are for staking rewards.

In rare instances, a nominator may be actively nominating several validators in a single era. In
this case, the slash is proportionate to the amount staked to that specific validator. With very
large bonds, such as parachain liquid staking accounts, a nominator has multiple active nominations
per era (Acala's LDOT nominator typically has 7-12 active nominations per era). Note that you cannot
control the percentage of stake you have allocated to each validator or choose who your active
validator will be (except in the trivial case of nominating a single validator). Staking allocations
are controlled by the [Phragmén algorithm](learn-phragmen.md).

Once a validator gets slashed, it goes into the state as an "unapplied slash". You can check this
via
[Polkadot-JS UI](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/staking/slashes).
The UI shows it per validator and then all the affected nominators along with the amounts. While
unapplied, a governance proposal can be made to reverse it during this period
({{ polkadot: <RPC network="polkadot" path="consts.staking.bondingDuration" defaultValue={28} filter="erasToDays"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.staking.bondingDuration" defaultValue={28} filter="erasToDays"/> :kusama }}
days). After the grace period, the slashes are applied.

The following levels of offense are
[defined](https://research.web3.foundation/Polkadot/security/slashing/amounts). However, these
particular levels are not implemented or referred to in the code or in the system; they are meant as
guidelines for different levels of severity for offenses. To understand how slash amounts are
calculated, see the equations in the section below.

- Level 1: Isolated [equivocation](./learn-staking-advanced.md/#equivocation), slashes a very small
  amount of the stake.
- Level 2: misconducts unlikely to be accidental, but which do not harm the network's security to
  any large extent. Examples include concurrent equivocation or isolated cases of unjustified voting
  in [GRANDPA](learn-consensus.md). Slashes a moderately small amount of the stake and chills.
- Level 3: misconduct that poses serious security or monetary risk to the system, or mass collusion.
  Slashes all or most of the stake behind the validator and chills.

If you want to know more details about slashing, please look at our
[research page](https://research.web3.foundation/Polkadot/security/slashing/amounts).

## Slashing

### Equivocation

**GRANDPA Equivocation**: A validator signs two or more votes in the same round on different chains.

**BABE Equivocation**: A validator produces two or more blocks on the Relay Chain in the same time
slot.

Both GRANDPA and BABE equivocation use the same formula for calculating the slashing penalty:

    Let x = offenders, n = total no. validators in the active set

    min( (3 * x / n )^2, 1)

As an example, assume that there are 100 validators in the active set, and one of them equivocates
in a slot (for our purposes, it does not matter whether it was a BABE or GRANDPA equivocation). This
is unlikely to be an attack on the network, but much more likely to be a misconfiguration of a
validator. The penalty would be min(3 \* 1 / 100)^2, 1) = 0.0009, or a 0.09% slash for that
validator (i.e., the stake held by the validator and its nominators).

Now assume that there is a group running several validators, and all of them have an issue in the
same slot. The penalty would be min((3 \* 5 / 100)^2, 1) = 0.0225, or a 2.25% slash. If 20
validators equivocate, this is a much more serious offense and possibly indicates a coordinated
attack on the network, and so the slash will be much greater - min((3 \* 20 / 100)^2, 1) = 0.36, or
a 36% slash on all of these validators and their nominators. All slashed validators will also be
chilled.

From the example above, the risk of nominating or running many validators in the active set are
apparent. While rewards grow linearly (two validators will get you approximately twice as many
staking rewards as one), slashing grows exponentially. A single validator equivocating causes a
0.09% slash, two validators equivocating does not cause a 0.09 \* 2 = 0.18% slash, but rather a
0.36% slash - 4x as much as the single validator.

Validators may run their nodes on multiple machines to make sure they can still perform validation
work in case one of their nodes goes down, but validator operators should be extremely careful in
setting these up. If they do not have good coordination to manage signing machines, equivocation is
possible.

If a validator is reported for any one of the offenses they will be removed from the validator set
([chilled](#chilling)) and they will not be paid while they are out. They will be considered
inactive immediately and will lose their nominators. They need to re-issue intent to validate and
again gather support from nominators.

### Slashing Across Eras

There are 3 main difficulties to account for with slashing in NPoS:

- A nominator can nominate multiple validators and be slashed via any of them.
- Until slashed, the stake is reused from era to era. Nominating with N coins for E eras in a row
  does not mean you have N\*E coins to be slashed - you've only ever had N.
- Slashable offenses can be found after the fact and out of order.

To balance this, we only slash for the maximum slash a participant can receive in some time period,
rather than the sum. This ensures protection from overslashing. Likewise, the period over which
maximum slashes are computed is finite and the validator is chilled with nominations withdrawn after
a slashing event, as stated in the previous section. This prevents rage-quit attacks in which, once
caught misbehaving, a participant deliberately misbehaves more because their slashing amount is
already maxed out.
