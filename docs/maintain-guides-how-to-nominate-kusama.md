---
id: maintain-guides-how-to-nominate-kusama
title: Be a Nominator (Kusama)
sidebar_label: Be a Nominator (Kusama)
---

## Step 1: Bond your tokens

On the [Polkadot UI](https://polkadot.js.org/apps) navigate to the "Staking" tab.

The "Staking Overview" subsection will show you all the active validators and their information - points (reliability), earnings, identities, etc. The "Waiting" subsection lists all pending validators that need more nominations to enter the active validator set. The "Returns" screen will help you estimate your earnings and this is where it's good to start picking favorites. The "Account Actions" subsection allows you to stake and nominate and the "Validator Stats" screen will show you some interesting in-depth graphs about a selected validator.

Pick "Account Actions", then click the blue "New Stake" button.

You will see a modal window that looks like the below:

![Bonding](/img/NPoS/nominate2.png)

Select a "value bonded" that is **less** than the total amount of KSM you have, so you have some left over to pay transaction fees. Transaction fees are currently at least 0.01 KSM, but they are dynamic based on a variety of factors including the load of recent blocks.

Also be mindful of the reaping threshold - the amount that must remain in an account lest it be burned. That amount is 0.1 in Kusama, so it's recommended to keep at least 1 KSM in your account to be on the safe side.

Choose whatever payment destination sounds good to you. If you're unsure, you can choose "Stash account (increase amount at stake)".

### Step 2: Nominate a validator

You are now bonded. Being bonded means your tokens are locked and could be [slashed](learn-staking#slashing) if the validators you nominate misbehave. All bonded funds can now be distributed to up to 16 validators. Be careful about the validators you choose since you will be slashed if your validator commits an offence.

Click on "Nominate" on an account you've bonded and you will be presented with another popup asking you to select some validators.

![Nominating validators](/img/NPoS/nominate.png)

Select them, confirm the transaction, and you're done - you are now nominating. You should notice your balance increasing shortly.

### Step 3: Stop nominating

At some point, you might decide to stop nominating one or more validators. You can always change who you're nominating, but you cannot withdraw your tokens unless you unbond them. Detailed instructions are available [here](maintain-guides-how-to-unbond).
