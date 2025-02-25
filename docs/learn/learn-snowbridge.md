---
id: learn-snowbridge
title: Snowbridge
sidebar_label: Snowbridge
description: Overview of Snowbridge by Snowfork
keywords: [Bridge, XCM, Bridge Hub, Snowbridge, Snowfork]
slug: ../learn-snowbridge
---

!!!info "Using Snowbridge"
    Snowbridge can be accessed through [the web app](https://app.snowbridge.network/), where you may track [processing times of transactions](https://app.snowbridge.network/status), [recent transfers](https://app.snowbridge.network/history), and other information about the bridge's overall status.

Snowbridge by [Snowfork](https://snowfork.com/) is a general-purpose, trustless bridge between
Polkadot and Ethereum. It utilizes the
[Bridge Hub system parachain](./learn-system-chains.md#bridge-hub) to establish a connection to its
relayers, allowing for permissionless and trustless messaging between Ethereum and Polkadot.

With Snowbridge, a sender can (but does not need to) run a
[relayer](https://docs.snowbridge.network/architecture/relayers) to ensure that their cross-chain
transaction is successful. A sender is a user using relayers provided by others.

Snowbridge currently supports
[two-way token transfers](https://docs.snowbridge.network/applications/token-transfers) between
Ethereum and Polkadot parachain.

## Random-sampling BEEFY

A trustless bridge always has a **prover** (needs to compute the proof), a **verifier** (asks the
prover to compute the proof and verifies it), and relayers to relay messages. Snowbridge prover uses
[BEEFY](./learn-consensus.md#bridging-beefy), a novel bridge protocol drastically reducing
operational costs without compromising security.

Even with simplifications ushered in by BEEFY, a smart contract updating Polkadot's state on
Ethereum has to perform 201 signature checks for every update since there are ~300 validators on
Polkadot. This remains expensive (gas costs), especially as the validator set grows. The solution is
random-sampling BEEFY that leverages
[the RANDAO randomness beacon](https://eth2book.info/capella/part2/building_blocks/randomness/) as
follows:

- **Commit:** Relayer submits a state commitment of a recently finalized block on Polkadot and
  claims to have a super-majority of validator’s signatures to the light client deployed on
  Ethereum. It also provides one validator signature backing the commitment, which can be slashed if
  needed.
- **Challenge:** Light client queries on-chain randomness (RANDAO) to subsample `m` (~25) signatures
  from the list Relayer’s claimed list.
- **Response:** Relayer responds by sharing exactly those `m` signatures that were randomly sampled
  which the light client then verifies. If everything checks out, the finalized block is accepted.

The number of signature checks needed is significantly reduced and independent of the validator set
size, making the protocol more efficient. The number of subsampled signatures, `m,` is the parameter
that trades off security and efficiency (i.e., **security parameter**). The value of this parameter
is derived using crypto-economic arguments.

## Snowbridge Crypto-economic Security

If up to a third of the validators are malicious, the chance that all `m` signatures subsampled are
from these bad actors is `(1/2)^m` (exponentially low). Any validator who supports a malicious
commitment [faces severe penalties](./learn-offenses.md). The expected value of an attack `E(A)` is:

```
E(A) = p * V + (1 - p)*(-S)
```

Where `V` is the value of attack (bounded by market capitalization), `S` is the validator slashable
stake, and `p` is the probability of a successful attack.

### Snowbridge Assumptions

Snowbridge relies on two major assumptions:

- The crypto-economic assumption that an adversary is rational, i.e., an attack is launched only if
  the expected value of an attack is positive. Hence, we derive our security parameter `m` by
  ensuring the expected value of an attack is negative, i.e., `E(A) < 0`.

- RANDAO unpredictability. The Web3 Foundation research team performed a thorough analysis of RANDAO
  bias and extended the state-of-the-art in analysing the last-revealer attack on RANDAO. Assuming
  1/3rd of Ethereum validators are malicious, the effect of such bias is mitigated by proportionally
  increasing the security parameter.

## Resources

- Medium article
  ["Random Sampling BEEFY: Pillaring the trust-less Snowbridge"](https://medium.com/@bhargav_22496/18a43a2cba9b)
  by Bhargav Bhatt at Web3 Foundation
- [Snowbridge GitHub repository](https://github.com/Snowfork/snowbridge)
- Web3 Foundation Research Repository
