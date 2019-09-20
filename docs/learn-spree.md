---
id: learn-spree
title: SPREE
sidebar_label: SPREE
---

SPREE (Shared Protected Runtime Execution Enclaves), also known as "trust wormholes," allows parachains to trust one another, regardless of how they upgrade and evolve.

## How it works

The below description is taken from /u/gavofyork's post on the Smart Protocols proposal (linked below):

> A parachain would be able to upload a "runtime appendix" to the relay chain. It would live on the relay chain and be a WebAssembly blob, not dissimilar to a parachain's normal validation function. However, it would only ever be executed by parachain collators.

> Storage/state and ICMP would be independent of the parachain itself. However, the parachain would be able to pass it messages synchronously for it to interpret on its own terms.

> It would retain its own storage root (which would either be referenced by the parachain's main state root or, more likely, be stored in another appendix-state trie item). Interaction from the parachain would be possible through an exposed function from the Wasm (`execute(bytes)`). There would also be another exposed function for managing ICMP input messages (`apply_message(bytes)`). And then it would also need a final function to call itself when it needs to send a message on ICMP (`post_message`). ICMP message origins, as well as honest execution of the blob would be enforced as part of the relay chain's requirements placed on the parachain. For this, it would have its own ICMP endpoint (probably a special subordinate endpoint from the appendix itself, so the endpoint set would be {RelayChain, Parachain[0..PARACHAINS], Appendix[0..APPENDICES][0..PARACHAINS]}.

> This appendix would be opt-in for each parachain: parachains would be able to "tell" the runtime that they're happy to use this appendix.

> I'm not sure about the name though :) - there's not really anything "smart" about them and they're not really "protocols". Really they're a Shared Protected Runtime Appendix is more like it...

Later on the description was simplified to the below in a presentation from Tokyo DOT Day:

- Parachains can opt-in to special runtime logic fragments (like smart contracts)
- Own storage, own ICMP endpoint
- All instances across parachains have identical logic
- Executes alongside parachain
- Protected: storage can not be altered by parachain logic; messages can not be faked from them by parachains

## Why?

Sending messages across parachains in ICMP only ensures that the message will be delivered but does not specify the code that will be executed, or how the message will be interpreted by the receiving parachain. There would be ways around this such as requesting a verifiable receipt of the execution from the receiving parachain, but in the naked case the other parachain would have to be trusted. Having shared code which exist in appendices that the parachain can opt-in to supporting resolves the need for trust and makes the execution of the appendices completely trustless.

SPREE would be helpful to ensure that the same logic is shared between parachains in the `appendices`. An especially relevant use case would resolve around the use of token transfers across parachains in which it is important that the sending and receiving parachains agree about the total supply of tokens and basic functionalities.

## Resources

- [Smart protocols](https://www.reddit.com/r/dot/comments/b6kljn/smartprotocols_idea/) - Reddit post by u/tawaran describing "smart protocols" an idea that inspired SPREE.
