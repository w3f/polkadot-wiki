---
id: build-parachains-rococo
title: Building Parachains on Rococo
sidebar_label: Building Parachains on Rococo
---

[Rococo](https://github.com/paritytech/cumulus#rococo-crown) is a Polkadot testnet built for testing
parachains. Rococo utilizes Cumulus and HRMP (Horizontal Relay-routed Message Passing) in order to
send transfers and messages between parachains and the Relay Chain. Every message is sent to the
Relay Chain, then from the Relay Chain to the desired parachain. Rococo currently runs three test
parachains (Tick, Trick, and Track), as well as several externally developed parachains.

## Who is building Parachains?

You can see the list of included parachains
[here](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains). A list of
proposed parachains is available
[here](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains/proposals).

## Parachain Workshop

If you are interested in running and launching your own parachain, Parity Technologies has created a
[parachain workshop](https://substrate.dev/cumulus-workshop/#/1-prep/1-compiling). There is also a
[Rococo Element chat channel](https://matrix.to/#/!WuksvCDImqYSxvNmua:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation)
as well as [Cumulus' GitHub repository](https://github.com/paritytech/cumulus#rococo) available.

### Obtaining ROC

There currently isn't a faucet available for ROC and disbursements are only limited to parachain
builders for the time being. It's recommended at this point to run your own parachains testnet
locally.

## How to connect to a Parachains

If you would like to connect to a parachain via [Polkadot-JS Apps](https://polkadot.js.org/apps/),
you may do so by clicking on the network selection at the top left hand corner of the navigation and
selecting any parachain of choice. For the purpose of these following examples, we will be using the
Rococo testnet "Custom Node" underneath "Development", according to the
[parachain workshop](https://substrate.dev/cumulus-workshop/#/1-prep/1-compiling).

![parachains on polkadotjs](assets/polkadotjs_network_parachains.png)

## How to make Cross Chain transfers

To send a transfer between parachains, navigate to "Accounts" > "Transfer". From here, you'll need
to select the parachain node that you are running. Next, enter in the amount that you'd like to send
to another parachain. Be sure to select the correct parachain you'd like to send an amount to. Once
you've hit the "Submit" button, you should see a green notification, indicating a successful
transfer.

### Downward Transfers

Downward transfers are when an account on the Relay Chain sends a transfer to their account on a
different parachain. This type of transfer uses a depository and mint model, meaning that when the
DOT leave the sender's account on the Relay Chain and are transferred into an account on a
parachain, the parachain mints a corresponding amount of tokens on the parachain.

For example, we can send tokens from Alice's account on the Relay Chain to her account on
parachain 200. To do so, we will need to head to the "Network" > "Parachains" tab and click on the
"Transfer to chain" button.

![rococo downward transfer](assets/rococo/rococo-downward-transfer.png)

Notice here, that we can select which parachain to send the funds to, specify the amount to be sent,
and add any comments or a memo for the transfer.

### Upward Transfers

Upward transfers occur _from_ a parachain _to_ an account on the Relay Chain. To proceed with this
kind of transfer, we need to be connected to a parachain node on the network and be on the
"Network" > "Parachains" tab. Click on the "Transfer to chain" button.

![rococo upward transfer](assets/rococo/rococo-upward-transfer.png)

Note that the toggle should be set to off, ensuring that the funds go to the Relay Chain and not
another parachain.

### Lateral Transfers

This type of transfer is only possible with at least two different registered parachains. In true
XCMP, lateral transfers would allow for messages to be sent directly from one parachain to another.
However, this is not yet implemented, so the Relay Chain is helping us deliver messages for the time
being. Lateral transfers work through the depository model, which means that in order to transfer
tokens from chain 200 to chain 300, there must already be tokens owned by chain 200 deposited on
chain 300. Lateral transfers are called HRMP, Horizontal Relay-Chain Message Passing.

Before we can actually send funds from one parachain to another, we must ensure that the chain's
account on the recipient chain has some funds in it. In this example, Alice will be sending some
funds from her account on parachain 200 to her account on parachain 300.

We can get that parachain account address, from our parachain 300's terminal:

```
2020-08-26 14:46:34 Parachain Account: 5Ec4AhNv5ArwGxtngtW8qcVgzpCAu8nokvnh6vhtvvFkJtpq
```

From Alice's account on the Relay Chain, she is able to send some amount to parachain 200's
depository.

![rococo lateral transfer](assets/rococo/rococo-lateral-transfer.png)

Alice is now able to send from her account on parachain 200 to her account on parachain 300.

![rococo lateral transfer part 2](assets/rococo/rococo-lateral-transfer2.png)

# Rococo Parachain Requirements

[Rococo](https://wiki.polkadot.network/docs/en/build-parachains-rococo#docsNav) is the environment
for parachain and [XCMP](https://wiki.polkadot.network/docs/en/learn-crosschain#overview-of-xcmp)
testing and will undergo rapid changes, updates and chain state resets as it develops. After the
initial tests are successful on Rococo, we envision that in the long run it will be integrated into
the [Westend](https://wiki.polkadot.network/docs/en/maintain-networks#westend-test-network) test
network.

Below you will find a general plan on how we approach onboarding parachains within this new
environment.

## Relevant Values and Calculations

Note that these are example values; all are subject to change.

- Lease Period Length: 1 Day = 14400 Blocks
- Ending Period: 15 Min = 150 Blocks
- Current Lease Period Index = Current Block Number / 14400

## Registration

All Parachains will need to Register as a "Parathread" first.

![](https://i.imgur.com/1orqcCx.png)

To do this, they need:

- A unique Parachain ID (one that has not been previously registered)
- Runtime Wasm
- Initial Head Data

After submission of this data, it will take 2 sessions (30 min x 2) for the candidate to fully
onboard to a Parathread.

> Note: All transitions of a Para into different states will take at least 2 sessions (onboarding,
> offboarding, upgrading, downgrading, etc.)

## Slots

To start, only 5 or 6 slots are planned to be available on Rococo to ensure that the chain functions
properly.

3 of these slots will be our "system chains": Tick, Track, and Trick

This means only 2 or 3 slots will be available for parachain auctions.

### System Chains

The system chains were given a lease through `Slots > force_lease`, bypassing the auction process.

Once they are a parathreads, we can call `force_lease` like so:

```
fn force_lease(origin,
	para: ParaId,
	leaser: T::AccountId,
	amount: BalanceOf<T>,
	period_begin: LeasePeriodOf<T>,
	period_count: LeasePeriodOf<T>,
)
```

- `origin`: Must be root
- `para`: The registered ParaId for the Parachain
- `leaser`: The person who will pay the deposit `amount`.
- `amount`: How much we reserve from `leaser`.
- `period_begin`: The first lease period for the slot.
- `period_count`: The number of lease periods to reserve.

So assuming we start at genesis, and Trick is `ParaId(0)` something like:

```
force_lease(ParaId(0), Alice, 0, 0, 100)
```

would give Trick 100 lease periods, starting at lease period 0, but it wouldn't start until period 1
anyway, since lease period 0 will be in progress starting with block 0.

### Auctioned Chains

For the rest of the slots, we can set up auctions with `Auctions > new_auction`:

```
pub fn new_auction(
    origin,
	#[compact] duration: T::BlockNumber,
	#[compact] lease_period_index: LeasePeriodOf<T>,
)
```

- `origin`: Must be root
- `duration`: How long the auction will last
- `lease_period_index`: Which lease period is up for auction

Auctions on Rococo should be relatively short, but since it is configurable per auction, we can
adjust this based on community feedback. A duration of 12 hours - 24 hours should be good.

Lease Period Index needs to be for some future lease period that we want to auction. The input is
the FIRST of the 4 index periods that will be made available for auction.

For example, if we call:

```
new_auction(3600, 2)
```

This will be an auction for 6 hours (10 blocks per min \* 60 min per hour \* 6 hours = 3600 blocks),
which will auction lease periods 2, 3, 4, and 5.

On top of the base 6 hours of the auction, there will be an additional ending period where final
potentially winning bids can occur. So if the ending period is 150 blocks, then the total end to end
auction time will be 3750 blocks.

We should make sure that whatever lease period we select, and all the timelines for doing an
auction, that the lease period will not have started.

We can only run one auction at a time, but we can run an auction for the same lease period multiple
times to add more slots. So we may make the exact same call again.

Once we have saturated the slots we want for any particular lease period, we can then start auctions
for the further future:

```
new_auction(3600, 6)
```

Since we previously auctioned slots 2 - 5, now we can start auctioning 6 - 9.

#### Bidding

Anyone can make a bid to win a Parachain slot for a Para ID.

![](https://i.imgur.com/jOFjhnI.png)

Pick the Para ID, how much you want to bid, and the slots you want to bid for.

#### Crowdloan

You can also make a crowdloan for your Para ID, but this part of the process is still unrefined and
you may encounter problems.

![](https://i.imgur.com/dfYPBQ4.png)

- You can only create a crowdloan for a Para ID that you own / have registered.
- The crowdfund cap is the MAXIMUM amount your crowdloan can collect. You can still win a bid if you
  have less than your maximum, as long as your bid is the best in the auction.
- Ending Block is when you want your crowdloan to end. If you know an auction will start in 3 days,
  and will last for 5 days, you probably want to set your crowdloan to end in 10 days, or a similar
  timescale. This way you will be sure that your crowdloan is active during the entire auction
  process.
- You don't want to set your crowdloan to be too long, or else you will lock up users funds for a
  long time and they may not want to participate.
- The first slot must be the first slot you want to bid for. So if the current auction is for slots
  (3, 4, 5, 6), your first slot can be at least 3.
- Last slot must be with within that range too.
- You can cancel a crowdloan (if you made a mistake), as long as you did not receive a contribution.

### Tips

If you would like to test your setup first on a local machine, you should be able to do so by
following the instructions in the readme
[launch a local setup](https://github.com/paritytech/cumulus#launch-a-local-setup-including-a-relay-chain-and-a-parachain).

# Chachacha V1 - The pre-rococo environment

Chachacha is a Rococo based network configured and supported by Centrifuge.

The purpose of Chachacha is to serve as a support network to ease and speed up the onboarding of new
parachains in Rococo.

It helps:

- To get the parachains in the waiting list to a state that is ready to be added to Rococo for
  further performance and stability testing
- Parachains to find issues beforehand, by integrating earlier.

## Characteristics

- Chachacha will be at par with the latest Rococo polkadot/cumulus/substrate version
- The network will be refreshed and restarted frequently
- Inclusion process is analogous to Rococo's
- Notifications and Support will be given in the
  [Chachacha](https://matrix.to/#/!bNsgeAIUuMfcyVXKAu:matrix.org?via=matrix.org&via=matrix.parity.io)
  Element channel

## How to include your parachain in Chachacha

1. Maintain **at least two** validators (full block authoring node) for
   [Chachacha](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffullnode-relay.chachacha.centrifuge.io#/explorer).
   1. Treat this like a production grade Polkadot node - see
      [Run a Validator (Polkadot)](https://wiki.polkadot.network/docs/en/maintain-guides-how-to-validate-polkadot#docsNav)
   1. Chachacha Bootnodes
      1. `/ip4/34.89.248.129/tcp/30333/p2p/12D3KooWD8CAZBgpeZiSVVbaj8mijR6mfgUsHNAmCKwsRoRnFod4`
      1. `/ip4/35.242.217.240/tcp/30333/p2p/12D3KooWBthdCz4JshkMb4GxJXVwrHPv9GpWAgfh2hAdkyXQDKyN`
   1. Node Setup - use one of the options below
      1. Build from source:
         1. `git clone https://github.com/centrifuge/polkadot`
         1. `cd polkadot`
         1. `git checkout rococo-v1`
         1. `cargo build --release --features=real-overseer`
         1. `./target/release/polkadot --validator --chain rococo-chachacha --name <your_chachacha_validator_name> --bootnodes <bootnodes_addr_from_above>`
      1. Use Docker:
         1. `docker run -d centrifugeio/rococo:chachacha-v1 --validator --chain rococo-chachacha --name <your_chachacha_validator_name> --bootnodes <bootnodes_addr_from_above>`
   1. Check your node on the
      [Chachacha Telemetry](https://telemetry.polkadot.io/#list/Chachacha%20Staging%20Testnet)
   1. Generate your
      [Chachacha V1 ValidatorId Address](https://github.com/substrate-developer-hub/cumulus-workshop/blob/master/6-register/1-register.md#launching-the-validators)
   1. Follow
      [Chachacha](https://matrix.to/#/!bNsgeAIUuMfcyVXKAu:matrix.org?via=matrix.org&via=matrix.parity.io)
      announcements for Chachacha V1 validator updates, which can require one of the following
      scenarios
      1. Update client
      1. Update client and purge-chain
1. Maintain at least one collator (full block authoring node) for your team’s parachain.
   1. `cd <root_cumulus_based_parachain_code>`
   1. `cargo build --release`
   1. `./target/release/<parachain_collator_name> --version`
   1. `./target/release/<parachain_collator_name> export-genesis-state --parachain-id <your_registered_parachain_id> > genesis-state`
   1. `./target/release/<parachain_collator_name> export-genesis-wasm > genesis-wasm`
   1. `wget -O rococo-chachacha.json https://storage.googleapis.com/centrifuge-artifact-releases/rococo-chachacha.json`
   1. `./target/release/<parachain_collator_name> --collator --parachain-id <your_registered_parachain_id> --execution wasm --chain rococo-chachacha.json`
1. Sign up through the [Chachacha V1 Parachain Registration](https://forms.gle/1fZTAaA312pkYCtV7)
   form
1. After receiving CHA’s to the ValidatorId Address initiate the
   [Submitting the setKeys Transaction](https://wiki.polkadot.network/docs/en/maintain-guides-how-to-validate-polkadot#submitting-the-setkeys-transaction)in
   [Chachacha Extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ffullnode-relay.chachacha.centrifuge.io#/extrinsics)
1. Follow the
   [registration process](https://github.com/substrate-developer-hub/cumulus-workshop/blob/master/en/6-register/1-register.md#request-parachain-registration)
1. You are free to do runtime upgrades after the parachain is connected, so you can still iterate on
   features later on
