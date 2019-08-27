# Smart Contracts

The Polkadot relay chain will not support smart contracts natively.  However, parachains on Polkadot will support smart contracts. There are already announced projects such as [Edgeware](https://edgewa.re), and thanks to the Substrate built-in [contract module](https://crates.parity.io/srml_contract/index.html), it is likely that more parachains will support this feature.

## Resources

Here are the list of current resources available to developer who want to get started writing smart contracts to deploy on parachains based on Substrate.

- [ink!](https://github.com/paritytech/ink) - Parity's ink to write smart contracts. 
- [Deploying your first contract](https://github.com/paritytech/ink/wiki/Deploying-Your-First-Contract) - Guide to deploy the provided `flipper` contract.
- [Writing your first contract](https://github.com/paritytech/ink/wiki/Writing-Your-First-Contract) - Guide to how one would write the `flipper` contract.
- [Substrate contracts workshop](https://shawntabrizi.github.io/substrate-contracts-workshop/#/) - Walks you through the basics of using `ink!` and writing an ERC20 token.

## Examples

Collected below are some community examples of smart contracts in `ink!`. Are you working on a smart contract example? Ask us to add it to this page!

- [Ownable](https://github.com/JesseAbram/foRust/) - Port of the OpenZeppelin `Ownable` contract.

## What is the difference between developing a smart contract versus a parachain?

### Layer of Abstraction

When you write a smart contract you are creating the instructions which will be deployed and associated to a specific chain address.

In comparison, a runtime module is the entire logic of a chain's state transitions (what's called a state transition function).

Smart contracts must consciously implement upgradeability while parachains will have the ability to swap out their code entirely through a root command or via the governance module.

When you build a smart contract, it will be eventually be deployed to a target chain with its own environment. Parachains allow the developer to declare the environment of their own chain, even allowing others to write smart contracts for it.

### Gas Fees

Smart contracts must find a way to limit their own execution, or else full nodes are vulnerable to DOS attacks. An infinite loop in a smart contract, for example, could consume the computational resources of an entire chain, preventing others from using it. The [halting problem](https://en.wikipedia.org/wiki/Halting_problem) shows that with a powerful enough language, it is impossible to know ahead of time whether or not a program will ever cease execution.  Some platforms, such as Bitcoin, get around this constraint by providing a very restricted scripting language.  Others, such as Ethereum, "charge" the smart contract "gas" for the rights to execute their code.  If a smart contract does get into a state where execution will never halt, it eventually runs out of gas, ceases execution, and any state transition that would have been made by the smart contract is rolled back.  

Parachains can implement arbitrarily powerful programming languages and also contain no notion of gas for their own native logic. This means that some functionality is easier to implement for the developer, but it also means there are some constructs, such as a loop without a terminating condition, which should _never_ be implemented.  Leaving certain logic, such as complex loops which could possibly run indefinitely, to a non-smart contract layer, or even trying to eliminate it entirely, will often be a wiser choice.

## Resources

- [When should I build a Substrate runtime versus a Substrate smart contract](https://stackoverflow.com/a/56041305) - From a technical standpoint answers the question of when a developer might choose to develop a runtime versus a smart contract.
