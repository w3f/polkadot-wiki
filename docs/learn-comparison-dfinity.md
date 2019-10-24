---
id: learn-comparisons-dfinity
title: Dfinity and Polkadot
sidebar_label: Dfinity
---

Dfinity calls itself "the internet computer" and positions itself as a sister project to Ethereum. Dfinity has been
in development since 2016, with a release called "Copper" supposed to come in 2017 but never seemed to have landed.
In 2019, the world has yet to see the majority of Dfinity's closed source code for their client since they only publish
helper libraries on their GitHub. The closed source nature of development is in stark contrast to the development of
Polkadot, which has developed its Rust reference implementation in the open on GitHub from the start in 2017.

### Algorithmic Governance

Dfinity is a strong proponent of algorithmic governance, having published
[two](https://medium.com/dfinity/the-dfinity-blockchain-nervous-system-a5dd1783288e#.duzxztt9k)
[blog](https://medium.com/dfinity/future-governance-integrating-traditional-ai-technology-into-the-blockchain-nervous-system-825ababf9d9)
posts explicitly on the topic. 

Dfinity terms its governance framework the Blockchain Nervous System (BNS). The BNS awards a neuron token to 
participants whom deposit Dfinity's native token in a system lock. The relative voting power of the neuron is weighted by the
amounts of Dfinity tokens held in the deposit, and the delay for withdrawing these tokens is at least three months.
The heaviest weighted neuron of the network then is able to dictate which direction the chain will progress when proposals
would otherwise create blockchain forks. If the heaviest is not available, then it tries to follow the second heaviest,
and so on until one neuron is available to decide the fork or none are (a situation not explored in their blog post).

Dfinity positions its algorithmic governance as "AI is Law" in a similar vein to the Szabo-influenced "Code is Law" ethos.
However, it makes this "Code is Law" statement contingent on the distributed intelligence of the blockchain nervous system.
The reliance on external decision making to enact on-chain changes is comparable to Polkadot's approach to on-chain
governance, in which the rules of participation are laid out in dry code but is ultimately dictated by the will of the
token holders. However, the BNS seems to be a simplified reduction of governance to only deciding on chain forks through
a "trust the expert" follow-the-heaviest-neuron approach. Whereas Polkadot allows governance mechanisms to be much more
fine-grained through mechanisms of conviction voting, a tri-cameral model of checks and balances, and the ability to
follow chain upgrades seamlessly without needing to update client software.

### Consensus

Dfinity uses a four-layered consensus consisting of an identity layer, a random beacon layer, a blockchain layer, and a
notary layer. 

The identity layer handles the Proof-of-Stake registration and anti-sybil mechanism of the consensus protocol. In
Polkadot, we would compare the identity layer to a subset of the functional of NPoS, which handles the stake deposits and
sybil resistance while also acting as the peer-set selection algorithm as well. It is expected that stake deposits on
Dfinity will be a fixed size, so they do not implement a peer-set selection since it is inherent in their PoS; when
an account makes a deposit they become a validator. Polkadot is more flexible and allows variable deposits and the
ability to act as a nominator to participate in the staking system without needing to run validator infrastructure
yourself.

The random beacon layer is used to construct a random number in Dfinity, which is the basis for the blockchain and notary
layer. It employs a verifiable random function (VRF) that is based on BLS threshold signatures and requires a distributed
key generation (DKG). The BLS threshold based VRF is able to solve the "last actor" problem in which the final participant
in the protocol can abort by predicting the randomness and not publishing it. Although Polkadot also employs a VRF in its
block production protocol BABE, it does not suffer from the "last actor" problem as it uses a different type of VRF
that generates the randomness locally, but still allows global verification. The random beacon is then taken from the VRF
outputs from two blocks prior, which can be proven to be secure.

The blockchain and fork resolution layer used in Dfinity is known as _probablistic slot protocol_ and uses the randomness
from the random beacon to give priority to each proposer for particular block. Within a constant block time, all proposals
generated are sent to notaries which sign the block from the heaviest weighted proposal that they see and broadcast it.
Forks are then decided based on the weight which was assigned to proposers in that round, with the heaviest proposer's
block taking priority. Polkadot's BABE block production uses the random beacon from the previous VRF outputs to assign
weights to producers too. The individual producers then create local randomness and if it beats a threshold as determined
by their weight, that producer will produce a new block. BABE achieves constant block time by having a fallback to the
Aura round robin style block assignment if for a particular slot no producer generated a random number that fell below
their threshold. In BABE forks can happen if more than one producer pulls a correct "lottery ticket" random number,
and in this case will rely on the chain selection rule which uses the last finalized chain from GRANDPA to build on.

Finally, in the notarization and _near-instant finality_ layer of Dfinity, the blocks which are produced in the previous
layer are notarized by the committee of validators. The notarization is a timestamp and a proof that the block has been
published to the network, which prevents a malicious validator from creating a private chain and revealing it later. The
notarization mechanism aims to solve the selfish mining attack and the nothing at stake problem. The notarized blocks
are then agreed on in a further finalization mechanism. 

One should not pay too much heed to the term _near-instant finality_ because terms like this and "instant finality" are
basically just marketing terms for Byzantine agreement protocols, and conceal the actually capability of the finality
gadget. For example, the notarization and finality rounds of Dfinity consensus can be compared to the pre-commit and
pre-vote rounds of standard BFT protocols. Although, since Dfinity has a two-step mechanism for producing and finalizing
blocks (much like how Polkadot has with BABE and GRANDPA), the time-to-finality of both protocols should be comparable.
GRANDPA has nice properties like coming to finality on entire chains of blocks instead of single blocks one at a time,
which makes it an improvement to the finality mechanism outlined by Dfinity.
