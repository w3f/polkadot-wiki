# Collator

Collators maintain parachains by collecting parachain transactions from users and producing state transition proofs for validators.

These participants will sit atop parachains and provide proofs to validators based on transactions from parachains. Collators maintain parachains by aggregating parachain transactions into parachain blocks and producing state transition proofs for validators based on those blocks. They also monitor the network and prove bad behavior to validators. Collators maintain a “full-node” for a particular parachain; meaning they retain all necessary information to be able to author new blocks and execute transactions in much the same way as miners do on current PoW blockchains. Under normal circumstances, they will collate and execute transactions to create an unsealed block and provide it, together with a proof of state transition, to one or more validators responsible for proposing a parachain block.

### Guides

COMING SOON!
