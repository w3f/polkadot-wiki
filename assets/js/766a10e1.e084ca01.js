"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6118],{3799:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"learn/learn-comparisons-avalanche","title":"Polkadot vs. Avalanche","description":"Comparison between Polkadot and Avalanche.","source":"@site/../docs/learn/learn-comparisons-avalanche.md","sourceDirName":"learn","slug":"/learn-comparisons-avalanche","permalink":"/docs/learn-comparisons-avalanche","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/learn/learn-comparisons-avalanche.md","tags":[],"version":"current","lastUpdatedBy":"Filippo","lastUpdatedAt":1727991122000,"frontMatter":{"id":"learn-comparisons-avalanche","title":"Polkadot vs. Avalanche","sidebar_label":"Avalanche","description":"Comparison between Polkadot and Avalanche.","keywords":["avalance","proof of stake","comparison"],"slug":"../learn-comparisons-avalanche"},"sidebar":"docs","previous":{"title":"Cosmos","permalink":"/docs/learn-comparisons-cosmos"},"next":{"title":"Videos","permalink":"/docs/learn-video-tutorials"}}');var t=a(74848),o=a(28453);const i={id:"learn-comparisons-avalanche",title:"Polkadot vs. Avalanche",sidebar_label:"Avalanche",description:"Comparison between Polkadot and Avalanche.",keywords:["avalance","proof of stake","comparison"],slug:"../learn-comparisons-avalanche"},r=void 0,c={},l=[{value:"Architecture",id:"architecture",level:2},{value:"P-chain (Platform)",id:"p-chain-platform",level:4},{value:"X-chain (Exchange)",id:"x-chain-exchange",level:4},{value:"C-chain (Contracts)",id:"c-chain-contracts",level:4},{value:"Subnets or sub-networks",id:"subnets-or-sub-networks",level:4},{value:"Consensus",id:"consensus",level:2},{value:"Snowball",id:"snowball",level:3},{value:"DAG(Directed Acyclic Graph)",id:"dagdirected-acyclic-graph",level:3},{value:"Staking Mechanics",id:"staking-mechanics",level:2},{value:"Message Passing",id:"message-passing",level:2},{value:"Governance",id:"governance",level:2},{value:"Upgrades",id:"upgrades",level:2},{value:"Conclusion",id:"conclusion",level:2},{value:"References",id:"references",level:2}];function h(e){const n={a:"a",admonition:"admonition",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["To keep the content on this page factually correct and up-to-date,\n",(0,t.jsx)(n.a,{href:"https://github.com/w3f/polkadot-wiki#contributing-to-documentation",children:"contributions"})," are welcome."]})}),"\n",(0,t.jsxs)(n.p,{children:["Polkadot and Avalanche both have an architecture that allows for application-specific blockchains to\nbe designed and connected to a primary network. In Polkadot, the primary network is the relay chain\nand Avalanche does this with 3 main chains - the P-chain, X-chain, and C-chain. Similar to how\nPolkadot has its Parachains that connect to the relay chain, Avalanche has what\u2019s called\n",(0,t.jsx)(n.a,{href:"https://docs.avax.network/subnets",children:"subnets"}),". Similar to Polkadot, Avalanche also uses a PoS\nmechanism for achieving consensus. The validators stake their AVAX tokens in order to participate in\nthe PoS system and secure the network."]}),"\n",(0,t.jsx)(n.h2,{id:"architecture",children:"Architecture"}),"\n",(0,t.jsxs)(n.p,{children:["Avalanche's architecture separates the responsibility of a layer-1 smart contract platform into\nthree chains. This allows for a separation of concern over validators and consensus, transactions,\nand smart contract execution. Avalanche uses a DAG (Directed Acyclic Graph) structure for one of its\nchains which is non-linear. Polkadot uses the linear chain structure similar to Bitcoin and\nEthereum. Smart contracts in Polkadot are implemented on\n",(0,t.jsx)(n.a,{href:"build-smart-contracts#parachains",children:"parachains"}),". Polkadot being a layer-0 blockchain, is not a smart\ncontract platform and does not have plans to support them natively."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"avalanche-network",src:a(70013).A+"",width:"841",height:"479"})}),"\n",(0,t.jsxs)(n.p,{children:["Image source: ",(0,t.jsx)(n.a,{href:"https://docs.avax.network/",children:"Avalanche docs"}),"."]}),"\n",(0,t.jsx)(n.h4,{id:"p-chain-platform",children:"P-chain (Platform)"}),"\n",(0,t.jsx)(n.p,{children:"The P-chain is responsible for maintaining the validator set and securing the network. AVAX token\nholders can spin up their own nodes and become validators by staking their tokens. Similar to the\nNPoS system that Polkadot uses, Avalanche uses a Delegated PoS which allows token holders to also\ndelegate their token stake to existing validators instead of running their own nodes."}),"\n",(0,t.jsx)(n.h4,{id:"x-chain-exchange",children:"X-chain (Exchange)"}),"\n",(0,t.jsx)(n.p,{children:"The X-chain is responsible for the transaction layer of the Avalanche blockchain. It uses a UTXO\nmodel like Bitcoin whereas Polkadot uses an account model like Ethereum. This is the only chain that\nimplements the DAG (Directed Acyclic Graph) model for its blockchain, making this the fastest chain\non the Avalanche network. This chain does not support smart contract execution."}),"\n",(0,t.jsx)(n.h4,{id:"c-chain-contracts",children:"C-chain (Contracts)"}),"\n",(0,t.jsx)(n.p,{children:"The C-chain is where the most activity will happen on the Avalanche network. It allows for different\nvirtual machines to execute smart contract code. Out of the box, it has support for EVM and AVM\n(Avalanche VM). C-Chain runs a fork of go-ethereum called coreth that has the networking and\nconsensus portions replaced with Avalanche equivalents."}),"\n",(0,t.jsx)(n.p,{children:"As Polkadot does not have a smart contract layer out of the box, the EVM and WASM smart contract\nabilities lie in the Parachain layers. This is a major difference between Polkadot and Avalanche.\nThe smart-contract abilities of Avalanche are baked into its three-chain model."}),"\n",(0,t.jsx)(n.h4,{id:"subnets-or-sub-networks",children:"Subnets or sub-networks"}),"\n",(0,t.jsx)(n.p,{children:"Avalanche defines a subnet as a dynamic set of validators that achieve consensus on a set of\nblockchains. In Polkadot's terminology, Subnets can be viewed as public or private blockchain\nruntimes that can be built on top of the primary network and allow a subset of the validators to\nvalidate these runtimes. Similar to the Parachains on Polkadot, Subnets provide the freedom to\nchoose the transaction fee model, tokenomics, and custom compile rules. One or many validators can\nstart validating a subnet runtime, effectively becoming a subset of the overall validator set of the\nPrimary Network."}),"\n",(0,t.jsx)(n.h2,{id:"consensus",children:"Consensus"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"avalanche-consensus-protocols",src:a(59366).A+"",width:"744",height:"453"})}),"\n",(0,t.jsxs)(n.p,{children:["Image source:\n",(0,t.jsx)(n.a,{href:"https://gyuho.dev/nakamoto-bitcoin-vs-snow-avalanche-consensus.html#snow-family-protocols",children:"gyuho.dev"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"Avalanche consensus uses a family of protocols to achieve security, liveness, and finality. These\nare known as the Snow* protocols. This group of protocols composed together uses both classical and\nNakamoto consensus as well as a Delegated Proof-of-Stake system for its block creators."}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.a,{href:"https://docs.avax.network/overview/getting-started/avalanche-consensus",children:"Snow family"})," is a\nhierarchical collection of systems used to reach finality on Avalanche:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Slush"}),"\n",(0,t.jsx)(n.li,{children:"Snowflake"}),"\n",(0,t.jsx)(n.li,{children:"Snowball"}),"\n",(0,t.jsx)(n.li,{children:"Avalanche"}),"\n",(0,t.jsx)(n.li,{children:"Snowman"}),"\n",(0,t.jsx)(n.li,{children:"Slushie"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Compared to Polkadot, Avalanche uses an asynchronous hybrid system that is based on a classical and\nNakomoto approach. Polkadot uses a synchronous hybrid model that combines\n",(0,t.jsx)(n.a,{href:"learn-consensus#block-production-babe",children:"BABE"})," and\n",(0,t.jsx)(n.a,{href:"learn-consensus#finality-gadget-grandpa",children:"GRANDPA"}),", where BABE is the algorithm used to build blocks\nin a probabilistic way, and GRANDPA is a finality mechanism that uses a deterministic approach to\nadding blocks to the longest chain. In the end, validators agree to whole chains, rather than single\nnew blocks."]}),"\n",(0,t.jsx)(n.h3,{id:"snowball",children:"Snowball"}),"\n",(0,t.jsx)(n.p,{children:"The snowball protocol is an algorithm that nodes use to come to a consensus. Each node continuously\nqueries x number of validators and takes the majority consensus and adopts it as its own. This\nmethod, in normal circumstances, will lead to the network reaching a consensus. The scalability of\nSnowball is promising, as the number of participants in the network grows, the number of consensus\nmessages being passed around remains the same. Nodes will query no more than 20 nodes at a given\ntime."}),"\n",(0,t.jsx)(n.h3,{id:"dagdirected-acyclic-graph",children:"DAG(Directed Acyclic Graph)"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Directed_acyclic_graph",children:"DAGs"})," are graphs consisting of vertices and\nedges. In Avalanche they are used for ",(0,t.jsx)(n.strong,{children:"partial ordering"})," of decisions, such as transactions.\nVertices point to each other using edges, and when ordered topologically vertices and edges create a\nsequence. Edges in the case of Avalanche can be conflicting, and nodes will use the snowball\nalgorithm to make decisions about which edges to keep and which to not."]}),"\n",(0,t.jsx)(n.h2,{id:"staking-mechanics",children:"Staking Mechanics"}),"\n",(0,t.jsxs)(n.p,{children:["Avalanche uses a Delegated Proof-of-Stake mechanism without any ",(0,t.jsx)(n.a,{href:"/docs/learn-offenses",children:"slashing"}),". The\nbarrier to entry for staking as a full node validator is 2500 AVAX, and 25 AVAX to become a\ndelegator. With a minimum stake period being two weeks and a maximum period being a year, for both\nvalidators and delegators. It is not clear from the Avalanche documentation what happens after a\nyear, it is likely that validators will have to re-stake and start a new period. Validators acquire\npoints for uptime and correctness of their work, and the remuneration of rewards depends on that."]}),"\n",(0,t.jsxs)(n.p,{children:["In Polkadot the minimum stake needed to be a validator is variable, same for being a nominator. The\ntrue minimum need to be competitive enough to be included in the active set for validators, or\nsuccessfully being chosen as a nominator depends on the minimum staked amounts on the network at a\ngiven time. Read more about this in the ",(0,t.jsx)(n.a,{href:"learn-staking",children:"staking page"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"message-passing",children:"Message Passing"}),"\n",(0,t.jsxs)(n.p,{children:["Avalanche does not have a native trustless message-passing mechanism. Instead, it relies on bridges.\nThough, because it is an EVM-compatible protocol, it's able to interoperate at a token level.\nHowever, subnets do not have a messaging layer out of the box. Polkadot, with its ",(0,t.jsx)(n.a,{href:"learn-xcm",children:"XCM"}),"\nand ",(0,t.jsx)(n.a,{href:"learn-xcm#xcmp-cross-chain-message-passing",children:"XCMP"})," messaging protocols, allows for a native and\ntrustless messaging scheme, thus supporting the composability of chains and enabling the development\nof powerful cross-chain applications."]}),"\n",(0,t.jsx)(n.h2,{id:"governance",children:"Governance"}),"\n",(0,t.jsx)(n.p,{children:"According to its whitepaper, Avalanche plans to have an on-chain governance mechanism. It currently\ndoes not have an on-chain or off-chain system in production. Its governance system will limited to\nupdating only a few key protocol parameters which include:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Staking amount:"})," This value defines the minimal stake required to be placed as bond before\nparticipating in the system."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Minimum staking time for a node:"})," The minimal amount of time required for a node to stake into\nthe system."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Maximum staking time for a node:"})," The maximal amount of time a node can stake."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Minting rate:"})," Reward rate function, also referred to as minting rate, determines the reward a\nparticipant can claim as a function of their staking amount given some number of x publicly\ndisclosed nodes under its ownership, over a period of t consecutive ",(0,t.jsx)(n.em,{children:"minimal staking time"}),"\ntimeframes, such that t",(0,t.jsx)(n.em,{children:"minimal staking time"})," \u2264 ",(0,t.jsx)(n.em,{children:"maximum staking time"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Transaction fee amount:"})," The fee structure, which is a set of governable fees parameters that\nspecify costs to various transactions."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Limiting the governance functionality is a design choice to increase predictability and safety."}),"\n",(0,t.jsx)(n.p,{children:"Polkadot's governance mechanism has been in production from the very beginning and was used to\nslowly release functionality and decentralize the initial network. It is also not limited to a few\nparameters and in fact, the whole runtime is subject to change via protocol making Polkadot a\nmeta-protocol."}),"\n",(0,t.jsx)(n.h2,{id:"upgrades",children:"Upgrades"}),"\n",(0,t.jsxs)(n.p,{children:["The upgrades to Avalanche are administered by the protocol developers at\n",(0,t.jsx)(n.a,{href:"https://www.avalabs.org/",children:"Ava Labs"}),". On Polkadot, the forkless upgrades are administered and\ndeployed through the on-chain governance. When performing upgrades, every single validator on the\nSubnet will need to perform the identical upgrade. This requires a co-ordination effort among the\nValidators of the Subnet. On Polkadot, upgrades to Parachains can be deployed automatically without\nany coordination with the Validators on the relaychain."]}),"\n",(0,t.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsxs)(n.p,{children:["Avalanche has made some design decisions that allow for an improved smart-contract development\nenvironment in which protocol engineers can have the freedom to create their own blockchains and\ninclude them in the Avalanche ecosystem via subnets. The trade-offs are that the autonomy of design\nis limited and blockchains have to buy into the design decisions of Avalanche's main chains. Unlike\nparachains on Polkadot, Subnets are not able to share the security of the main chains. In addition\nto utilizing block finality and security of the relay chain, parachains on Polkadot use\n",(0,t.jsx)(n.a,{href:"learn-xcm",children:"XCM"})," to pass native trustless messages, instead of having to rely on multiple bridging\nsolutions. However, Subnets are easy to launch when compared to parachains, given that they only\nneed a recommended minimum of 5 validators, which make the costs of launch predictable. Avalanche\nhas plans to implement shared security, interoperability, composability and on-chain governance\nfeatures which are already offered by Polkadot."]}),"\n",(0,t.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://assets.website-files.com/5d80307810123f5ffbb34d6e/6008d7bbf8b10d1eb01e7e16_Avalanche%20Platform%20Whitepaper.pdf",children:"The Avalanche Platform Whitepaper"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://assets.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf",children:"The Avalanche Consensus Whitepaper"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://assets.website-files.com/5d80307810123f5ffbb34d6e/6008d7bc56430d6b8792b8d1_Avalanche%20Native%20Token%20Dynamics.pdf",children:"The AVAX Token Dynamics Paper"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://gyuho.dev/nakamoto-bitcoin-vs-snow-avalanche-consensus.html#what-is-snow-consensus",children:"Nakomoto vs Snow consensus"})}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},59366:(e,n,a)=>{a.d(n,{A:()=>s});const s=a.p+"assets/images/avalanche-consensus-protocols-5e520b603bd2f9234af02d86ab695cd3.png"},70013:(e,n,a)=>{a.d(n,{A:()=>s});const s=a.p+"assets/images/avalanche-network-175669932c1264549c67806669b3d84d.png"},28453:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>r});var s=a(96540);const t={},o=s.createContext(t);function i(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);