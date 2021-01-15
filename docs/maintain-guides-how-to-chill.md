---
id: maintain-guides-how-to-chill
title: How to Chill
sidebar_label: How to Chill
---

Stakers can be in any one of the three states: validating, nominating, or chilling. When a staker
wants to temporarily pause their active engagement in staking, but does not want to unbond their
funds, they can choose to "chill" their involvement and keep their funds staked.

An account can step back from participating in active staking by calling the `chill` extrinsic in
the [staking pallet][chill extrinsic]. When an account chooses to chill, they will become inactive
in the next era. The call must be signed by the _controller_ account, not the _stash_.

> Note: If you need a refresher on the different responsibilities of the stash and controller
> account when staking, take a look at the [accounts][] section in the general staking guide.

![staking](assets/NPoS/staking-keys_stash_controller.png)

## Chilling as a Nominator

When you chill after being a nominator, your nominations will be reset. This means that when you
decide to start nominating again you will need to select validators to nominate once again. These
can be the same validators if you prefer, or a completely new set. Just be aware - your nominations
will not persist across chills.

Your nominator will remain bonded when it is chilled. When you are ready to nominate again, you will
not need to go through the whole process of bonding again, rather you will issue a new nominate call
that specifies the new targets to nominate.

## Chilling as a Validator

When you voluntarily chill after being a validator, your nominators will not automatically go away.
As long as your nominators make no action, you will still have the nominations when you choose to
become an active validator once again. However, if your nominators decide to nominate other
validators then these nominations will take priority when the validator comes back. It may also be
the case that your nominators change their entire nomination targets (all 16 of the allowed
nominations). In this case your nominators would need to explicitly specify your validator as a
target when your validator comes back.

When you become an active validator you will also need to reset your validator preferences
(commission, etc.). These can be configured as the same values that were set previously or something
totally different.

### Involuntary Chills

If a validator was unresponsive or found to have committed a slashable offense within two eras, the
validator will be removed from the active set in a process known as _involuntary chilling._ When a
validator has been involuntarily chilled, it is necessary for the nominators that were previously
nominating that validator to re-issue the nominate call.

Nominators who have the option to renominate an involuntarily chilled validator will have a display
row to do so using Polkadot-JS Apps. This row is displayed in the "Account Actions" tab for the
nominator under a heading that says "Redenomination required". If your validator has been
involuntarily chilled, you will need to request your nominators to re-issue the nominate call in
order to start nominating you again.

[chill extrinsic]: https://substrate.dev/rustdocs/v2.0.1/pallet_staking/enum.Call.html#variant.chill
[accounts]: learn-staking#accounts
