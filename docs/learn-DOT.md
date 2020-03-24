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

DOTs that are allocated to the Polkadot team or awarded to teams as part of 
Web3 Foundation's grants program will have a vesting schedule attached. Vested
balances are classified as a separate abstraction to the other locks that are
placed on your balance. This means that although vested tokens cannot be transferred,
they can still be used for voting in governance or staked in the staking system.

Vesting schedules are linear release and will unlock a constant amount of tokens
at every block until all the funds have been made available.

Let's take for example the data structure for the vesting schedule, the `VestingInfo`
struct:

```rust
pub struct VestingInfo<Balance, BlockNumber> {
	/// Locked amount at genesis.
	pub locked: Balance,
	/// Amount that gets unlocked every block after `starting_block`.
	pub per_block: Balance,
	/// Starting block for unlocking(vesting).
	pub starting_block: BlockNumber,
}
```

There are three fields in the struct above: `locked`, `per_block` and `starting_block`.
The configuration of these three fields dictate the amount of funds locked, the
slope of the linear curve for unlocking and the block number for when unlocking will begin.

There are two ways that vesting schedules are created. 

- The first way will be
part of the genesis configuration of Polkadot, the chain specification will
read the state of the Polkadot Claims contract on Ethereum for allocations that
are registered as _vested_ and create the appropriate vesting schedule for them.

- The second way is through a transaction type available in the "Vesting" pallet,
`vested_transfer`. The vested transfer function allows anyone to create a 
vesting schedule with a transfer of funds, with the caveat that the account
for which the vesting schedule will be created does not already have one. To
call vested transfer successfully you must transfer at least `MinVestedTransfer`
funds, which is specified as a chain constant.

#### Lazy Vesting

Like [lazy payouts](learn-lazy-payouts), vesting is _lazy_. This means that
someone must explicitly call either `vest` to vest themselves (the caller) or 
`vest_other` to unlock some vested funds from another target account. These
extrinsics are available as part of the "Vesting" pallet.

Vested funds that are "vested" will remain locked until one of the two above
functions are called which trigger the unlock of the funds.

## Mainnet DOTs

Web3 Foundation will distribute up to 20% of mainnet DOTs prior to network launch in early 2020 (see the [Light Paper](https://polkadot.network/Polkadot-lightpaper.pdf) or the [Polkadot Network FAQ](https://polkadot.network/faq/)). As Gavin Wood, one of the project's founders, said in his year-end recap, there may be a generally available public sale for some portion of that amount at some point this year. Subscribe to the Polkadot newsletter on [polkadot.network](https://polkadot.network/) for further updates.

_Warning: Mainnet DOT tokens are not transferrable until mainnet launch, expected in early 2020. Therefore any transfers of Mainnet DOTs are illegitimate and unauthorized. DOTs can not be moved from a current allocation address. Individuals with an allocation of DOTs who transfer their DOT address to someone else can always keep a copy of their private key, therefore there is extreme risk for individuals participating in transfers of DOTs before mainnet launch._

Testnet dots are freely available now - see below for various ways to obtain them.

## Testnet DOTs
DOTs are required to make transactions on the Polkadot network. Testnet DOTs do not have any value beside allowing you to experiment with the network.

### Getting Westies

The current testnet is called [Westend](maintain-networks#westend-test-network) and you can obtain its native tokens by posting `!drip <WESTEND_ADDRESS>` in the Riot chatroom [#westend_faucet:matrix.org](https://riot.w3f.tech/#westend_faucet:matrix.org).

You can also make your own DOTs by [becoming a validator](maintain-validator).

## Kusama Tokens

Unlike testnet DOTs, Kusama tokens are not freely given away. Kusama tokens are available via the [claims process](https://claim.kusama.network/) (if you have already purchased DOTs), the [frictional faucet](https://guide.kusama.network/en/latest/start/faucet/), or via [grant request](http://grants.web3.foundation) from the Web3 Foundation.
