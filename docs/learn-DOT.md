---
id: learn-DOT
title: DOT
sidebar_label: DOT
---

## What are DOTs?

DOT is the native token of the Polkadot network in a similar way that BTC is the
native token of Bitcoin or ether is the native token of the Ethereum blockchain.

Kusama tokens (KSM) and DOT tokens both have 12 decimal places, with the smallest
unit being the Planck (a reference to [Planck Length](https://en.wikipedia.org/wiki/Planck_length),
the smallest possible distance in the physical Universe). You can compare the
Planck to satoshis or wei, while the DOT is like a bitcoin or an ether.

**Polkadot**
|Unit |Decimal Places|
| --- | --- |
Planck| 1
Point | 3
Microdot (uDOT)| 6
Millidot (mDOT)| 9
Dot (DOT) | 12

**Kusama**
|Unit |Decimal Places|
| --- | --- |
Planck| 1
Point | 3
MicroKSM (uKSM)| 6
MilliKSM (mKSM)| 9
KSM | 12


## What are the uses of DOTs?

DOTs serve three key functions in Polkadot, (i) to be used for governance of the network, (ii) to be staked for operation of the network, and (iii) to be bonded to connect a chain to Polkadot as a parachain.

DOTs can also serve ancillary functions by virtue of being a transferrable token. For example, DOTs stored in the Treasury can be sent to teams working on relevant projects for the Polkadot network.

### DOTs for governance

The first function of DOTs is to entitle holders to control of the governance of the platform. Some functions which are included under the governance mechanism include determining the fees of the network, the addition or removal of parachains, and exceptional events such as upgrades and fixes to the Polkadot platform.

Polkadot will enable any holder of DOTs to participate in governance. For details on how holders can participate in governance, as well as their rights and responsibilities, see the [governance page](learn-governance).

### DOTs for consensus

DOTs will be used to facilitate the consensus mechanism that underpins Polkadot. In order for the platform to function and allow for valid transactions to be carried out across parachains, Polkadot will rely on holders of DOTs to play active roles. Participants will put their DOTs at risk (via staking) to perform these functions. The staking of DOTs acts as a disincentive for malicious participants whom will be punished by the network by getting their DOTs slashed. The DOTs required to participate in the network will vary depending on the activity which is being performed, the duration the DOTs will be staked for, and the total number of DOTs staked.

### DOTs for bonding

DOTs will have the ability to be bonded for a duration of time in order to add a new parachain to the network. The DOTs will be locked during their bonding period and will be released back to the account that bonded them after the duration of the bond has elapsed and the parachain is removed.

### Vesting

DOTs may have a lock placed on them to account for vesting funds. Like other types
of locks, these funds cannot be transferred but can be used in other parts of
the protocol such as voting in governance or being staked as a validator or nominator.

Vesting funds are on a linear release schedule and unlock a constant number of
tokens at each block. Although the tokens are released in this manner,
it does not get reflected on-chain automatically due to the fact that locks are
[lazy](#lazy-vesting) and require an extrinsic to update.

There are two ways that vesting schedules can be created.

- One way is as part of the genesis configuration of the chain. In the case
of Polkadot and Kusama, the chain specification genesis script reads the
state of the Polkadot Claims contract that exists on the Ethereum blockchain and
creates vesting schedules in genesis for all the allocations registered as being
vested.
- A second way is through an extrinsic type available in the Vesting pallet,
`vested_transfer`. The vested transfer function allows anyone to create a 
vesting schedule with a transfer of funds, as long as 1) the account
for which the vesting schedule will be created does not already have one and 2)
the transfer moves at least `MinVestedTransfer` funds, which is specified as a 
chain constant.

Vesting schedules have three parameters, `locked`, `per_block`, and `starting_block`.
The configuration of these three fields dictate the amount of funds that are
originally locked, the slope of the unlock line, and the block number for when
the unlocking begins. 

#### Lazy Vesting

Like [simple payouts](learn-simple-payouts), vesting is _lazy_, which means that
someone must explicitly call an extrinsic to update the lock that is placed on
an account.

- The `vest` extrinsic will update the lock that is placed on the caller. 
- The `vest_other` will update the lock that is placed on another "target" account's funds.

These extrinsics are exposed from the Vesting pallet.

## Mainnet DOTs

Web3 Foundation will distribute up to 20% of mainnet DOTs prior to network launch in early 2020 (see the [Light Paper](https://polkadot.network/Polkadot-lightpaper.pdf) or the [Polkadot Network FAQ](https://polkadot.network/faq/)). As Gavin Wood, one of the project's founders, said in his year-end recap, there may be a generally available public sale for some portion of that amount at some point this year. Subscribe to the Polkadot newsletter on [polkadot.network](https://polkadot.network/) for further updates.

_Warning: Mainnet DOT tokens are not transferrable until mainnet launch, expected in early 2020. Therefore any transfers of Mainnet DOTs are illegitimate and unauthorized. DOTs can not be moved from a current allocation address. Individuals with an allocation of DOTs who transfer their DOT address to someone else can always keep a copy of their private key, therefore there is extreme risk for individuals participating in transfers of DOTs before mainnet launch._

Testnet DOTs are freely available now - see below for various ways to obtain them.

## Testnet DOTs
DOTs are required to make transactions on the Polkadot network. Testnet DOTs do not have any value beside allowing you to experiment with the network.

### Getting Westies

The current testnet is called [Westend](maintain-networks#westend-test-network) and you can obtain its native tokens by posting `!drip <WESTEND_ADDRESS>` in the Riot chatroom [#westend_faucet:matrix.org](https://riot.w3f.tech/#westend_faucet:matrix.org).

You can also make your own DOTs by [becoming a validator](maintain-validator).

## Kusama Tokens

Unlike testnet DOTs, Kusama tokens are not freely given away. Kusama tokens are available via the [claims process](https://claim.kusama.network/) (if you have already purchased DOTs), the [frictional faucet](https://guide.kusama.network/en/latest/start/faucet/), or via [grant request](http://grants.web3.foundation) from the Web3 Foundation.
