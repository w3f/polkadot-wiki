---
id: maintain-guides-how-to-validate-kusama
title: Run a Validator (Kusama)
sidebar_label: How to run a Validator on Kusama
description: The fundamentals for running a Kusama validator.
keywords: [validate, validator, kusama, stake, maintain]
slug: ../../maintain-guides-how-to-validate-kusama
---

## Preliminaries

Running a validator on a live network is a lot of responsibility! You will be accountable for not
only your own stake, but also the stake of your current nominators. If you make a mistake and get
[slashed](../../learn/learn-offenses.md), your tokens and your reputation will be at risk. However,
running a validator can also be very rewarding, knowing that you contribute to the security of a
decentralized network while growing your stash.

!!!warning
    It is highly recommended that you have significant system administration experience before
    attempting to run your own validator.

    You must be able to handle technical issues and anomalies with your node which you must be able to
    tackle yourself. Being a validator involves more than just executing the binary file.

Since security is so important to running a successful validator, you should take a look at the
[secure validator](../maintain-guides-secure-validator.md) information to make sure you understand
the factors to consider when constructing your infrastructure. As you progress in your journey as a
validator, you will likely want to use this repository as a _starting point_ for your own
modifications and customizations.

If you need help, please reach out on the
[Kusama Validator Lounge](https://matrix.to/#/#KusamaValidatorLounge:polkadot.builders) on Element.
The team and other validators are there to help answer questions and provide tips from experience.

### How many KSM do I need to become an active Validator?

!!!info "Controller accounts are deprecated"
    Controller accounts are deprecated. For more information, see
    [this discussion](https://forum.polkadot.network/t/staking-controller-deprecation-plan-staking-ui-leads-comms/2748).

You can have a rough estimate on that by using the methods listed
[here](../../general/faq.md#what-is-the-minimum-stake-necessary-to-be-elected-as-an-active-validator).
To be elected into the set, you need a minimum stake behind your validator. This stake can come from
yourself or from [nominators](../../learn/learn-nominator.md). This means that as a minimum, you
will need enough KSM to set up Stash and staking proxy [accounts](../../learn/learn-cryptography.md)
with the existential deposit, plus a little extra for transaction fees. The rest can come from
nominators. To understand how validators are elected, check the
[NPoS Election algorithms](../../learn/learn-phragmen.md) page.

!!!tip "Join the Decentralized Nodes program"
    [The Decentralized Nodes program](https://nodes.web3.foundation/) is an initiative by Web3
    Foundation and Parity Technologies to use the funds held by both organizations to nominate
    validators in the community.

**Warning:** Any KSM that you stake for your validator is liable to be slashed, meaning that an
insecure or improper setup may result in loss of KSM tokens! If you are not confident in your
ability to run a validator node, it is recommended to nominate your KSM to a trusted validator node
instead.

### Validator Rewards

On Kusama, one day is approximately four eras whereas on Polkadot, one era is approximately a day.
In each era, the validators elected to the active set earn era points which correspond to the actual
rewards earned that are distributed proportionally to the nominators after deducting the validator
commission. The
[minimum validator commission](../../general/chain-state-values.md#minimum-validator-commission) can
be set through on-chain governance. For more information rewards and payouts, check the
[validator payout](../maintain-guides-validator-payout.md) document.

## Run a Kusama Validator

Running a validator on the Kusama network is identical to running a Polkadot validator. Check out
the [Polkadot guide](../maintain-guides-how-to-validate-polkadot.md) on how to setup a validator.

Make sure to adjust the Polkadot guide to run a Kusama network validator (the instructions will also
be available in the Polkadot Validator guide):

- When starting the node pass `--chain=kusama` CLI flag
