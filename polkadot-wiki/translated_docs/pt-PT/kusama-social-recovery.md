---
id: kusama-social-recovery
title: Social Recovery
sidebar_label: Account Recovery
---

Managing an account is not an easy task. Many people have lost their private key due to improper key management over the past few years. Kusama provides a method that allows users to recover their accounts by setting up a social recovery. It is an M-of-N recovery tool that is based on the multisignature wallet to get back access of your lost account.

> Note: There is no way to get back your private key by using this method. This is just a way of performing transactions on behalf of the lost account, so you can think of it like a proxy instead.

In this guide, you will learn how to create a recoverable account, how to recover it, and what you need to be aware of when using it.

## Create a Recoverable Account

You will use your existing account to call `createRecovery` to select a list of accounts that you trust to help you recover the account when you lose the private key. To create a recoverable account, you will be required to set a `threshold` that is the number of your friends who need to approve the recovery process in order to recover your account.

![](/img/recovery/social-recovery-diag-1.png)

First, go to [PolkadotJS->Accounts](https://polkadot.js.org/apps/#/accounts) page that shows all available accounts on your browser's local storage and PolkadotJS extension. To create a recoverable account, make sure that you have some KSMs to pay for the transaction fees. You will also need some for the reserve required by the account recovery setup.

![](/img/recovery/social-recovery-1.png)

Then click the menu that is located besides the `send` button, and choose `Make recoverable`.

![](/img/recovery/social-recovery-2.png)

Now you need to provide the following information:

`trusted social recovery helpers` - A list of accounts that you trust. These can help you if you lose the private key. Since setting up a recoverable account requires you to lock up KSM, ensure your account has enough transferable balance to cover it. As you select additional recovery helpers, more KSM will be required.

`recovery threshold` - The number of friends required to submit a `vouchRecovery` transaction in order to recover the account.

> Note: 1 is the minimum, but it is not recommended to set a small number. If you set 1, that means any of your recovery helpers would be able to recover your account.

`recovery block delay` - Once the threshold is reached, you will need to wait until the block delay has passed until you can claim the recovery. This is a protection mechanism to allow the account owner to have enough time to check and react in case someone pretends to be you and initiates a recovery process.

> Note: Setting the block delay to be a little longer would be better since even if an attacker acquired enough signatures to recover your account, they would still have to wait until the block delay is passed in order to control your account.

![](/img/recovery/social-recovery-3.png)

## Recover your Account

This section would be showing you how to initiate a recovery process and get back the balance that held in the lost account to the new account.

![](/img/recovery/social-recovery-diag-2.png)

The above diagram shows the whole process of recovering an account.

> Note: Ensure that your new account has enough KSM to pay for the transaction fees and the amount that is used for reserve when doing the recovery.

Navigate to the menu that is located besides the send button in the row of your new account and click the "Initiate recover for another" option.

![](/img/recovery/social-recovery-4.png)

Then input the address you would like to recover in "recover this account" field and click "Start recovery".

![](/img/recovery/social-recovery-5.png)

Once the transaction went through, some KSMs will be locked to prevent malicious behavior.

![](/img/recovery/social-recovery-6.png)

Now call your friends that you have set in the first section. They are required to submit a `vouchRecovery` transaction.

![](/img/recovery/social-recovery-7.png)

Once the threshold is reached and the block delay is passed, use the new account to submit a `claimRecovery` transaction that would set a proxy on behalf of your lost account. It means that you can still use the lost account in an indirect way to interact with the network.

![](/img/recovery/social-recovery-8.png)

To see the proxy information, use your new account by calling the "recovery->proxy(Accountid)" function at the [Chain state](https://polkadot.js.org/apps/#/chainstate) page. It should point to your lost account.

![](/img/recovery/social-recovery-9.png)

Next, in order to call the "closeRecovery" transaction, you can make use of the "asRecovered" function as your lost account to get the locked KSM.

![](/img/recovery/social-recovery-10.png)

Once the transaction goes through, the reserved KSM from the "NEW-ACC" will have been moved to the lost account. This is a way of preventing someone from recovering other accounts maliciously. Imagine if someone tried to initiate recovery on your account, you can do this to slash their locked KSM.

![](/img/recovery/social-recovery-11.png)

Moving on, we use the `asRecovered` function to submit the `removeRecovery` transaction on behalf of the lost account to release the reserved KSM from your lost account.

![](/img/recovery/social-recovery-12.png)

Now all your account balance should be transferable.

![](/img/recovery/social-recovery-13.png)

Finally, transfer all of your available balance from the lost account to the new account.

![](/img/recovery/social-recovery-14.png)

Congratulation! You have successfully done the recovery process.

![](/img/recovery/social-recovery-15.png)

> Note: There is still one possible way to recover the account without going through the recovery process. That is by using the `Root` origin. However, in order to use root permissions you will need to either go through the council or submit a public proposal. To learn more about governance, see [here](learn-governance).

## Further Reading

- [Substrate's Recovery Pallet](https://github.com/paritytech/substrate/blob/master/frame/recovery/src/lib.rs) - The Rust implementation of the recovery.
