"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4791],{11659:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>s,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"build/build-parachains","title":"Parachain Development","description":"A guide on what it means to become a Parachain and the steps to do so.","source":"@site/../docs/build/build-parachains.md","sourceDirName":"build","slug":"/build-pdk","permalink":"/docs/build-pdk","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/build/build-parachains.md","tags":[],"version":"current","lastUpdatedBy":"bader y","lastUpdatedAt":1729243924000,"frontMatter":{"id":"build-parachains","title":"Parachain Development","sidebar_label":"Parachain Development","description":"A guide on what it means to become a Parachain and the steps to do so.","keywords":["build","parachain","develop","implement","PDK"],"slug":"../build-pdk"},"sidebar":"docs","previous":{"title":"Node Management","permalink":"/docs/build-node-management"},"next":{"title":"Network Maintainers","permalink":"/docs/maintain-index"}}');var i=n(74848),o=n(28453);const s={id:"build-parachains",title:"Parachain Development",sidebar_label:"Parachain Development",description:"A guide on what it means to become a Parachain and the steps to do so.",keywords:["build","parachain","develop","implement","PDK"],slug:"../build-pdk"},r=void 0,l={},c=[{value:"What are the Benefits of Deploying a Parachain?",id:"what-are-the-benefits-of-deploying-a-parachain",level:3},{value:"Shared Security (Pooled Security)",id:"shared-security-pooled-security",level:4},{value:"On-Chain Governance (Thought-through Governance)",id:"on-chain-governance-thought-through-governance",level:4},{value:"Scalability",id:"scalability",level:4},{value:"Interoperability",id:"interoperability",level:4},{value:"Things to Consider",id:"things-to-consider",level:2},{value:"Para-nomics",id:"para-nomics",level:3},{value:"Digital Nation States",id:"digital-nation-states",level:4},{value:"Connecting Digital Economies",id:"connecting-digital-economies",level:4},{value:"Para-objects",id:"para-objects",level:3},{value:"Migration",id:"migration",level:3},{value:"Implement a Parachain",id:"implement-a-parachain",level:2},{value:"Parachain Development Kit",id:"parachain-development-kit",level:3},{value:"Key Components",id:"key-components",level:4},{value:"What PDKs Exist?",id:"what-pdks-exist",level:4},{value:"Cumulus",id:"cumulus",level:4},{value:"How to set up your parachain",id:"how-to-set-up-your-parachain",level:3},{value:"Future PDKs",id:"future-pdks",level:3},{value:"Testing a Parachain",id:"testing-a-parachain",level:2},{value:"Paseo Testnet",id:"paseo-testnet",level:3},{value:"What Parachains are on Paseo Now?",id:"what-parachains-are-on-paseo-now",level:3},{value:"Obtaining PAS",id:"obtaining-pas",level:3},{value:"How to Connect to a Parachain",id:"how-to-connect-to-a-parachain",level:3},{value:"Parachain Playground",id:"parachain-playground",level:3},{value:"Deploy",id:"deploy",level:2},{value:"Parachain",id:"parachain",level:3},{value:"Resources",id:"resources",level:2}];function h(e){const a={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(a.p,{children:["Parachains are connected to and secured by the relay chain. They benefit from the ",(0,i.jsx)(a.em,{children:"pooled security"}),",\n",(0,i.jsx)(a.em,{children:"thought-through governance"}),", and overall ",(0,i.jsx)(a.em,{children:"scalability"})," of the heterogeneous sharding approach of\nthe network. Creating a parachain can be seen as creating a ",(0,i.jsx)(a.strong,{children:"Layer-1 blockchain"}),", which has its\nown logic and runs in parallel within the Polkadot ecosystem."]}),"\n",(0,i.jsx)(a.p,{children:"Developers can focus on creating state-of-the-art chains that take advantage of Polkadot's\nnext-generation approach. Some examples of what a parachain could be are:"}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"DeFi (Decentralized Finance) Applications"}),"\n",(0,i.jsx)(a.li,{children:"Digital Wallets"}),"\n",(0,i.jsx)(a.li,{children:"IoT (Internet of Things) Applications"}),"\n",(0,i.jsx)(a.li,{children:"Gaming"}),"\n",(0,i.jsx)(a.li,{children:"Web 3.0 Infrastructure"}),"\n"]}),"\n",(0,i.jsx)(a.p,{children:"and more."}),"\n",(0,i.jsx)(a.p,{children:"Polkadot aims to be a bet against blockchain maximalism, where the success of Polkadot's\nheterogeneous multi-chain approach will play a key part in the overall advancement of Web 3.0 and\ndecentralized systems. As a result, Polkadot's parachain model was designed with the belief that the\ninternet of the future will have many different types of blockchains working together."}),"\n",(0,i.jsx)(a.h3,{id:"what-are-the-benefits-of-deploying-a-parachain",children:"What are the Benefits of Deploying a Parachain?"}),"\n",(0,i.jsxs)(a.p,{children:["The parachain model attempts to alleviate five key ",(0,i.jsx)(a.em,{children:"build"})," failures of present technology stacks, as\ndescribed in the ",(0,i.jsx)(a.a,{href:"https://polkadot.network/PolkaDotPaper.pdf",children:"Polkadot Whitepaper"}),":"]}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:"Scalability"}),": How much is spent on resources and will the network be subject to bottlenecks?"]}),"\n",(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:"Isolatability"}),": Are the needs of many accounted for under the same framework?"]}),"\n",(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:"Developability"}),": Is the system tooling, system support, and overall system integrity\ndependable?"]}),"\n",(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:"Governance"}),": Can the network remain flexible to evolve and adapt over time? Can decisions be\nmade with sufficient inclusivity, legitimacy, and transparency to provide effective leadership of\na decentralised system?"]}),"\n",(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:"Applicability"}),": Does the technology address a burning need on its own? Is other \u201cmiddleware\u201d\nrequired to bridge the gap to actual applications?"]}),"\n"]}),"\n",(0,i.jsxs)(a.h4,{id:"shared-security-pooled-security",children:[(0,i.jsx)(a.a,{href:"/docs/learn-parachains",children:"Shared Security"})," (Pooled Security)"]}),"\n",(0,i.jsxs)(a.p,{children:["Parachains can lease the security and interoperability of the Polkadot network purchasing coretime\nwith ",(0,i.jsx)(a.a,{href:"/docs/learn-DOT",children:"DOT"}),". This means that the social costs of building a community around\nyour project and convincing validators to participate in your network security are reduced. Polkadot\nhas strong security, and decentralised application projects wishing to benefit from this security\nwould want to become a parachain to share in that pooled security."]}),"\n",(0,i.jsxs)(a.h4,{id:"on-chain-governance-thought-through-governance",children:[(0,i.jsx)(a.a,{href:"/docs/learn-polkadot-opengov",children:"On-Chain Governance"})," (Thought-through Governance)"]}),"\n",(0,i.jsxs)(a.p,{children:["Most governance systems in blockchains use an off-chain governance mechanism. Polkadot's on-chain\ngovernance encourages maximum participation of token holders and is frictionless and transparent. It\nalso enables ",(0,i.jsx)(a.a,{href:"/docs/learn-runtime-upgrades",children:"forkless upgrades"}),"."]}),"\n",(0,i.jsx)(a.h4,{id:"scalability",children:"Scalability"}),"\n",(0,i.jsx)(a.p,{children:"The sharded multichain network approach allows for what is essentially parallel computation\n(processing power) that can process several transactions in parallel. Isolated blockchains are often\nfaced with the network constraint of processing transactions in sequence, causing bottlenecks."}),"\n",(0,i.jsx)(a.h4,{id:"interoperability",children:"Interoperability"}),"\n",(0,i.jsx)(a.p,{children:"Any decentralised application or chain that wants to enable trustless messaging to other parachains\nalready connected to the relay chain would want to become a parachain. Interoperability between\nsovereign chains involves certain constraints and complex protocols to enable across a wide breadth\nof chains."}),"\n",(0,i.jsxs)(a.p,{children:["With Polkadot, you will get this feature out of the box if you build your application as a\nparachain. The ",(0,i.jsx)(a.a,{href:"/docs/learn-xcm",children:"XCM format"})," allows any parachains to communicate by passing\nmessages between them. Furthermore, as ",(0,i.jsx)(a.a,{href:"/docs/learn-bridges",children:"bridges"})," to other chains are\nconnected (such as those to Bitcoin or Ethereum), Polkadot's parachains will be able to communicate\nwith these as well."]}),"\n",(0,i.jsx)(a.admonition,{type:"note",children:(0,i.jsx)(a.p,{children:"Despite the benefits of becoming a parachain, developers should be conscious of the challenges in\nbecoming a parachain, and whether building a blockchain with an end goal of becoming a parachain is\na viable one for their project."})}),"\n",(0,i.jsxs)(a.p,{children:["On Polkadot, you are able to put your blockchain\u2019s latest block head onto the relay chain. As a\nparachain, the blocks you submit are verified by validators with a Wasm runtime, which can be stored\non the relay chain. You also get the ability to communicate with other parachains using the\n",(0,i.jsx)(a.a,{href:"/docs/learn-xcm",children:"XCM"})," format: an abstract message passing system. Message passing is tracked\non the relay chain - as such, you can prove the delivery of messages and facilitate trustless\ninteractions."]}),"\n",(0,i.jsx)(a.p,{children:"As you can place your blockchain\u2019s latest block head, you can achieve deterministic finalization for\nyour chain. The hard part of reaching finalization for blockchains tends to be the consensus, where,\nin the parachain model, a blockchain can offload consensus to the overall shared network, and focus\non block production. Since the validators have the Wasm runtime for all the parachains, your\nparachain shares the security of the validator pool with everyone on the relay chain."}),"\n",(0,i.jsx)(a.p,{children:"Any validator in the validator pool can help validate your blockchain."}),"\n",(0,i.jsx)(a.h2,{id:"things-to-consider",children:"Things to Consider"}),"\n",(0,i.jsx)(a.h3,{id:"para-nomics",children:(0,i.jsx)(a.a,{href:"/docs/learn-parachains#parachain-economies",children:"Para-nomics"})}),"\n",(0,i.jsx)(a.h4,{id:"digital-nation-states",children:"Digital Nation States"}),"\n",(0,i.jsx)(a.p,{children:"Parachains can be seen as autonomous agents; networks that act as decentralised digital nation\nstates. Parachains have their own communities, rules, economies, governance, treasuries, and\nrelationships with external chains. As a result, the economic policies within parachain ecosystems\nare subject to the developers and overall community of that parachain ecosystem; there isn't\nnecessarily a go-to economic model a parachain should follow."}),"\n",(0,i.jsxs)(a.p,{children:["Moreover, ",(0,i.jsx)(a.em,{children:"becoming a parachain"})," has an opportunity cost associated. Ideally, you can increase the\nvalue of the network by participating in the parachain selection process, and this should serve as a\ngood return on investment."]}),"\n",(0,i.jsx)(a.h4,{id:"connecting-digital-economies",children:"Connecting Digital Economies"}),"\n",(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:"/docs/learn-collator",children:"Collators"})," act as network maintainers and maintain a full node of a\nparachain. They can be incentivized with a native token payout from:"]}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"Transaction fees collected"}),"\n",(0,i.jsx)(a.li,{children:"Parachain token sponsorship"}),"\n"]}),"\n",(0,i.jsx)(a.h3,{id:"para-objects",children:"Para-objects"}),"\n",(0,i.jsxs)(a.admonition,{title:"The relay chain can host arbitrary state machines, not just blockchains.",type:"info",children:[(0,i.jsxs)(a.p,{children:["The Polkadot network will encourage the connection and interoperability between different\n",(0,i.jsx)(a.em,{children:"para-objects"}),"."]}),(0,i.jsx)(a.p,{children:"Here, para-objects are referring to objects on the network that operate in parallel, generally,\nparallelizable objects."})]}),"\n",(0,i.jsx)(a.p,{children:"These could be in the form of:"}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"System level chains (permanent chains)"}),"\n",(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.a,{href:"/docs/learn-bridges",children:"Bridge"})," Hubs"]}),"\n",(0,i.jsx)(a.li,{children:"Nested relay chains"}),"\n"]}),"\n",(0,i.jsx)(a.h3,{id:"migration",children:"Migration"}),"\n",(0,i.jsx)(a.p,{children:'Projects that are already functioning as "solochains" or in isolated environments may be interested\nin migrating onto the relay chain as a para-object. While the parachain model has its benefits, it\nmay not be the go-to strategy for some projects.'}),"\n",(0,i.jsx)(a.p,{children:"As a path for migration onto Polkadot, it may be more viable to migrate to one of the chains in one\nof the reserved cores."}),"\n",(0,i.jsxs)(a.p,{children:["For instance, there are currently options for ",(0,i.jsx)(a.a,{href:"/docs/build-smart-contracts",children:"smart contract deployment"}),"\non Kusama through the networks that have secured ",(0,i.jsx)(a.a,{href:"/docs/learn-agile-coretime",children:"coretime"}),"."]}),"\n",(0,i.jsx)(a.h2,{id:"implement-a-parachain",children:"Implement a Parachain"}),"\n",(0,i.jsxs)(a.p,{children:["The Parachain Implementer's Guide is a significant work in progress and maintained by Parity Tech.\n",(0,i.jsx)(a.a,{href:"https://w3f.github.io/parachain-implementers-guide/",children:(0,i.jsx)(a.strong,{children:"The live version"})})," is built from the source\nlocated in the official\n",(0,i.jsx)(a.a,{href:"https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/roadmap/implementers-guide",children:"Polkadot repository"}),"."]}),"\n",(0,i.jsx)(a.h3,{id:"parachain-development-kit",children:"Parachain Development Kit"}),"\n",(0,i.jsxs)(a.p,{children:["The Parachain Development Kit or ",(0,i.jsx)(a.strong,{children:"PDK"})," is a set of tools that allows developers to easily create a\nparachain. In practice, the PDK will consist of the following key components:"]}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.em,{children:"State transition function"})," : a way for your application to move from one state to another state."]}),"\n",(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.em,{children:"Collator node"})," : a type of peer-to-peer node in the Polkadot network with certain\nresponsibilities regarding parachains."]}),"\n"]}),"\n",(0,i.jsx)(a.h4,{id:"key-components",children:"Key Components"}),"\n",(0,i.jsxs)(a.p,{children:["The state transition function (STF) can be an abstract way for an application to go from one state\nto another state. The only constraint that Polkadot places on this STF is that it must be easily\nverifiable -- usually through what we call a ",(0,i.jsx)(a.em,{children:"witness"})," or ",(0,i.jsx)(a.em,{children:"proof"}),". It must be so because the Relay\nChain validators will need to check that each state it receives from the collator node is correct\nwithout actually running through the entire computation. Some examples of these proofs include the\nProof-of-Validity blocks or zk-SNARKs, which require less computational resources to verify than\nthey do to generate. The verification asymmetry in the proof generation of the STF is one of the\nintegral insights that allows Polkadot to scale while keeping high-security guarantees."]}),"\n",(0,i.jsxs)(a.p,{children:["A collator node is one of the types of network maintainers in the protocol. They are responsible for\n",(0,i.jsx)(a.strong,{children:"keeping availability"})," of the state of the parachain and the new states returned from the\niteration of the state transition function. They must remain online to keep track of the state and\nalso of the XCMP messages that it will route between itself and other parachains. Collator nodes are\nresponsible for passing the succinct proofs to the relay chain's validators and tracking the latest\nblocks from the relay chain. In essence, a collator node also acts as a light client for the relay\nchain. For more on collator nodes, see the ",(0,i.jsx)(a.a,{href:"/docs/learn-collator",children:"collator page"}),"."]}),"\n",(0,i.jsx)(a.h4,{id:"what-pdks-exist",children:"What PDKs Exist?"}),"\n",(0,i.jsxs)(a.p,{children:["Currently, the only PDK is\n",(0,i.jsx)(a.a,{href:"https://github.com/paritytech/polkadot-sdk/tree/master/substrate",children:"the Polkadot SDK"})," and\n",(0,i.jsx)(a.a,{href:"https://github.com/paritytech/polkadot-sdk/tree/master/cumulus",children:"Cumulus"}),"."]}),"\n",(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.strong,{children:(0,i.jsx)(a.a,{href:"https://substrate.io/",children:"Substrate"})})," is a blockchain framework that provides the basic building\nblocks of a blockchain (things like the networking layer, consensus, a Wasm interpreter) while\nproviding an intuitive way to construct your runtime. Substrate is made to ease the process of\ncreating a new chain, but it does not provide support for relay chain compatibility directly. For\nthis reason, ",(0,i.jsx)(a.code,{children:"Cumulus"}),", an added ",(0,i.jsx)(a.em,{children:"library"})," contains all of the Polkadot compatibility glue code."]}),"\n",(0,i.jsx)(a.h4,{id:"cumulus",children:"Cumulus"}),"\n",(0,i.jsx)(a.admonition,{type:"info",children:(0,i.jsx)(a.p,{children:"Cumulus clouds are shaped sort of like dots. Together, they form an intricate system that is\nbeautiful and functional."})}),"\n",(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:"https://github.com/paritytech/polkadot-sdk/tree/master/cumulus",children:"Cumulus"})," is an extension to\nSubstrate that makes it easy to make any Substrate-built runtime into a Polkadot-compatible\nparachain."]}),"\n",(0,i.jsx)(a.p,{children:"Cumulus Consensus is a consensus engine for Substrate that follows a relay chain. This runs a Relay\nChain node internally, and dictates to the client and synchronization algorithms which chain to\nfollow, finalize, and treat as correct."}),"\n",(0,i.jsxs)(a.p,{children:["See the\n",(0,i.jsx)(a.a,{href:"https://github.com/paritytech/polkadot-sdk/blob/master/cumulus/docs/overview.md",children:"Cumulus overview"}),"\nfor a more detailed description of Cumulus."]}),"\n",(0,i.jsxs)(a.p,{children:["Cumulus is still in development, but the idea is that it should be simple to take a Substrate chain\nand add the parachain code by importing the crates and adding a single line of code. Keep up-to-date\nwith the latest Cumulus developments from the ",(0,i.jsx)(a.a,{href:"###cumulus",children:"Cumulus section"}),"."]}),"\n",(0,i.jsxs)(a.admonition,{type:"info",children:[(0,i.jsxs)(a.p,{children:["Substrate and Cumulus provide a PDK from the abstraction of the blockchain format, but it is ",(0,i.jsx)(a.strong,{children:"not\nnecessary"})," that a parachain even needs to be a blockchain. For example, a parachain just needs to\nsatisfy the two constraints listed above: ",(0,i.jsx)(a.em,{children:"state transition function"})," and ",(0,i.jsx)(a.em,{children:"collator node"}),"."]}),(0,i.jsx)(a.p,{children:"Everything else is up to the implementer of the PDK."})]}),"\n",(0,i.jsx)(a.p,{children:"Cumulus handles the network compatibility overhead that any parachain would need to implement to be\nconnected to the relay chain. This includes:"}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"Cross-chain message passing (XCMP)"}),"\n",(0,i.jsx)(a.li,{children:"Out-of-the-box Collator node setup"}),"\n",(0,i.jsx)(a.li,{children:"An embedded full client of the relay chain"}),"\n",(0,i.jsx)(a.li,{children:"Block authorship compatibility"}),"\n"]}),"\n",(0,i.jsxs)(a.p,{children:["Are you interested in building a PDK? See the ",(0,i.jsx)(a.a,{href:"#future-pdks",children:"future PDKs"})," section for details."]}),"\n",(0,i.jsx)(a.h3,{id:"how-to-set-up-your-parachain",children:"How to set up your parachain"}),"\n",(0,i.jsx)(a.p,{children:"After creating your chain runtime logic with Substrate, you will be able to compile it down to a\nWasm executable. This Wasm code blob will contain the entire state transition function of your\nchain, and is what you will need to deploy your project to the relay chain as a parachain."}),"\n",(0,i.jsx)(a.p,{children:"Validators on the relay chain will use the submitted Wasm code to validate the state transitions of\nyour chain or thread, but doing this requires some additional infrastructure. A validator needs some\nway to stay up to date with the most recent state transitions, since relay chain nodes will not be\nrequired to also be nodes of your chain."}),"\n",(0,i.jsx)(a.p,{children:"This is where the collator node comes into play. A collator is a maintainer of your parachain and\nperforms the critical action of producing new block candidates for your chain and passing them to\nrelay chain validators for inclusion in the relay chain."}),"\n",(0,i.jsx)(a.p,{children:"Substrate comes with its own networking layer built-in but unfortunately only supports solo chains\n(that is, chains that do not connect to the relay chain). However, there is the Cumulus extension\nthat includes a collator node and allows for your Substrate-built logic to be compatible with the\nrelay chain as a parachain."}),"\n",(0,i.jsx)(a.h3,{id:"future-pdks",children:"Future PDKs"}),"\n",(0,i.jsx)(a.admonition,{title:"Call to action",type:"info",children:(0,i.jsxs)(a.p,{children:["Do you want to build a Parachain Development Kit from scratch? The Web3 Foundation is giving grants\nto teams who are doing this, learn more and apply on the\n",(0,i.jsx)(a.a,{href:"https://grants.web3.foundation",children:"W3F grants page"}),"."]})}),"\n",(0,i.jsxs)(a.p,{children:["One example of a PDK W3F is interested in supporting is a\n",(0,i.jsx)(a.a,{href:"https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675",children:"roll-up"})," kit that allowed\ndevelopers to create SNARK-based parachains. If we review the roll-up write-up, we see that the\nsystem uses two roles: users that update ",(0,i.jsx)(a.strong,{children:"state"})," and an operator that ",(0,i.jsx)(a.strong,{children:"aggregates the state\nupdates"})," into a single on-chain update. It should be straightforward to see how we can translate\nthis to the parachain terms. The state transition function for a roll-up-like parachain would be\nupdating the state (in practice, most likely a Merkle tree, which would be easily verifiable) from\nthe user inputs. The operator would act as the collator node, which would aggregate the state and\ncreate the zk-SNARK proof that it would hand to a relay chain's validators for verification."]}),"\n",(0,i.jsxs)(a.p,{children:["If you or your team are interested in developing a PDK feel free to apply for a grant on the\n",(0,i.jsx)(a.a,{href:"https://github.com/w3f/Grants-Program",children:"W3F Grants Program repository"}),". There may be grants\navailable for this type of work."]}),"\n",(0,i.jsx)(a.h2,{id:"testing-a-parachain",children:"Testing a Parachain"}),"\n",(0,i.jsx)(a.h3,{id:"paseo-testnet",children:"Paseo Testnet"}),"\n",(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:"https://github.com/paseo-network",children:"Paseo"})," is a testnet built for testing parachains. Paseo utilizes\nCumulus and ",(0,i.jsx)(a.a,{href:"/docs/learn-xcm-transport#hrmp-xcmp-lite",children:"HRMP"})," (Horizontal Relay-routed Message\nPassing) in order to send transfers and messages between parachains."]}),"\n",(0,i.jsxs)(a.p,{children:["Paseo runs a few test ",(0,i.jsx)(a.a,{href:"/docs/learn-system-chains",children:"system parachains"})," and externally developed\nparachains."]}),"\n",(0,i.jsxs)(a.p,{children:["If you would like to start deploying a parachain and trying out Coretime on Paseo, refer to the\n",(0,i.jsx)(a.a,{href:"/docs/build-guides-coretime-start",children:"Coretime Guides"}),"."]}),"\n",(0,i.jsx)(a.h3,{id:"what-parachains-are-on-paseo-now",children:"What Parachains are on Paseo Now?"}),"\n",(0,i.jsxs)(a.p,{children:["You can see the list of included parachains\n",(0,i.jsx)(a.a,{href:"https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpaseo-rpc.dwellir.com#/parachains",children:"here"}),"."]}),"\n",(0,i.jsx)(a.h3,{id:"obtaining-pas",children:"Obtaining PAS"}),"\n",(0,i.jsxs)(a.p,{children:["Follow the instructions ",(0,i.jsx)(a.a,{href:"/docs/learn-DOT#getting-tokens-on-the-paseo-testnet",children:"here"})," to get PAS\ntokens."]}),"\n",(0,i.jsx)(a.h3,{id:"how-to-connect-to-a-parachain",children:"How to Connect to a Parachain"}),"\n",(0,i.jsxs)(a.p,{children:["If you would like to connect to a parachain via ",(0,i.jsx)(a.a,{href:"https://polkadot.js.org/apps/",children:"Polkadot-JS Apps"}),",\nyou may do so by clicking on the network selection at the top left-hand corner of the navigation and\nselecting any parachain of choice."]}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.img,{alt:"paseo parachains",src:n(34027).A+"",width:"622",height:"762"})}),"\n",(0,i.jsxs)(a.p,{children:['For the purpose of these following examples, we will be using the Paseo testnet "Custom Node"\nunderneath "Development", following the\n',(0,i.jsx)(a.a,{href:"/docs/build-guides-coretime-start",children:"parachain and coretime tutorials"}),"."]}),"\n",(0,i.jsx)(a.h3,{id:"parachain-playground",children:"Parachain Playground"}),"\n",(0,i.jsx)(a.p,{children:"You can also take advantage of the account functions offered on Polkadot-JS Apps to test the entire\nParachain onboarding process (e.g. registration and coretime purchase)."}),"\n",(0,i.jsxs)(a.p,{children:["Start a local node on ",(0,i.jsx)(a.a,{href:"/docs/maintain-networks###westend-test-network",children:"Westend"})," by running:"]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-bash",children:"polkadot --chain=westend-dev --alice\n"})}),"\n",(0,i.jsx)(a.p,{children:"Then, connect your local node with Polkadot-JS Apps."}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.img,{alt:"parachains playground",src:n(78353).A+"",width:"2528",height:"668"})}),"\n",(0,i.jsx)(a.h2,{id:"deploy",children:"Deploy"}),"\n",(0,i.jsxs)(a.p,{children:["Substrate-based chains, including the Polkadot and Kusama relay chains, use an\n",(0,i.jsx)(a.a,{href:"/docs/learn-account-advanced#address-format",children:"SS58 encoding"})," for their address formats.\n",(0,i.jsx)(a.a,{href:"https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json",children:"This page"})," serves as the\ncanonical registry for teams to see which chain corresponds to a given prefix, and which prefixes\nare available."]}),"\n",(0,i.jsx)(a.h3,{id:"parachain",children:"Parachain"}),"\n",(0,i.jsx)(a.p,{children:"To include your parachain into the Polkadot network, you will need to reserve a core on the relay\nchain."}),"\n",(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:"/docs/learn-agile-coretime",children:"Coretime"})," can be purchased with DOT to produce blocks\n",(0,i.jsx)(a.a,{href:"/docs/learn-parachains#parachains-vs-on-demand-parachains",children:"continuously or on-demand"})," while\nbenefiting from Polkadot's security. See\n",(0,i.jsx)(a.a,{href:"/docs/learn-guides-coretime-marketplaces",children:"these guides"})," to learn how to purchase coretime."]}),"\n",(0,i.jsx)(a.h2,{id:"resources",children:"Resources"}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:(0,i.jsx)(a.a,{href:"/docs/build-guides-coretime-start",children:"Getting started with the Polkadot SDK for parachain development"})}),"\n",(0,i.jsx)(a.li,{children:(0,i.jsx)(a.a,{href:"/docs/learn-bridges",children:"Polkadot Bridges"})}),"\n",(0,i.jsx)(a.li,{children:(0,i.jsx)(a.a,{href:"https://polkadot.network/blog/the-path-of-a-parachain-block/",children:"The Path of a Parachain Block"})}),"\n",(0,i.jsx)(a.li,{children:(0,i.jsx)(a.a,{href:"/docs/learn-parachains-protocol",children:"The Path of a Parachain Block (Parachain Protocol page)"})}),"\n",(0,i.jsx)(a.li,{children:(0,i.jsx)(a.a,{href:"https://www.youtube.com/watch?v=fYc1yolanoE",children:"How to become a parachain on Polkadot (Video)"})}),"\n",(0,i.jsx)(a.li,{children:(0,i.jsx)(a.a,{href:"https://polkadot.network/blog/trusted-execution-environments-and-the-polkadot-ecosystem/",children:"Trusted Execution Environments and the Polkadot Ecosystem"})}),"\n"]})]})}function d(e={}){const{wrapper:a}={...(0,o.R)(),...e.components};return a?(0,i.jsx)(a,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},78353:(e,a,n)=>{n.d(a,{A:()=>t});const t=n.p+"assets/images/parachain-playground-7873519d5357d27cd254133f7c6ae79f.png"},34027:(e,a,n)=>{n.d(a,{A:()=>t});const t=n.p+"assets/images/paseo-chains-febadd33d972479c1ec023bccbec22ac.png"},28453:(e,a,n)=>{n.d(a,{R:()=>s,x:()=>r});var t=n(96540);const i={},o=t.createContext(i);function s(e){const a=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function r(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(o.Provider,{value:a},e.children)}}}]);