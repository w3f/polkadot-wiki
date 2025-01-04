"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6361],{58267:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"learn/learn-consensus","title":"Polkadot\'s Consensus Protocols","description":"The Consensus Mechanisms of Polkadot.","source":"@site/../docs/learn/learn-consensus.md","sourceDirName":"learn","slug":"/learn-consensus","permalink":"/docs/learn-consensus","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/learn/learn-consensus.md","tags":[],"version":"current","lastUpdatedBy":"github-actions[bot]","lastUpdatedAt":1728891359000,"frontMatter":{"id":"learn-consensus","title":"Polkadot\'s Consensus Protocols","sidebar_label":"Consensus","description":"The Consensus Mechanisms of Polkadot.","keywords":["consensus","proof of stake","nominated proof of stake","hybrid consensus","finality"],"slug":"../learn-consensus"},"sidebar":"docs","previous":{"title":"Architecture","permalink":"/docs/learn-architecture"},"next":{"title":"Security Protocol","permalink":"/docs/learn-parachains-protocol"}}');var i=o(74848),a=o(28453);const s={id:"learn-consensus",title:"Polkadot's Consensus Protocols",sidebar_label:"Consensus",description:"The Consensus Mechanisms of Polkadot.",keywords:["consensus","proof of stake","nominated proof of stake","hybrid consensus","finality"],slug:"../learn-consensus"},r=void 0,l={},c=[{value:"Nominated Proof of Stake",id:"nominated-proof-of-stake",level:2},{value:"Hybrid Consensus",id:"hybrid-consensus",level:2},{value:"Block Production: BABE",id:"block-production-babe",level:2},{value:"Multiple Validators per Slot",id:"multiple-validators-per-slot",level:3},{value:"No Validators in Slot",id:"no-validators-in-slot",level:3},{value:"Finality Gadget: GRANDPA",id:"finality-gadget-grandpa",level:2},{value:"Probabilistic vs. Provable Finality",id:"probabilistic-vs-provable-finality",level:3},{value:"Fork Choice",id:"fork-choice",level:2},{value:"Comparisons",id:"comparisons",level:2},{value:"Nakamoto consensus",id:"nakamoto-consensus",level:3},{value:"PBFT / Tendermint",id:"pbft--tendermint",level:3},{value:"Casper FFG",id:"casper-ffg",level:3},{value:"Bridging: BEEFY",id:"bridging-beefy",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const n={a:"a",admonition:"admonition",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"In traditional PoS systems, block production participation is dependent on token holdings as opposed\nto computational power. While PoS developers usually have a proponent for equitable participation in\na decentralized manner, most projects propose some level of centralized operation, where the number\nof validators with full participation rights is limited. These validators are often seen to be the\nmost wealthy and, as a result, influence the PoS network as they are the most staked. Usually, the\nnumber of candidates to maintain the network with the necessary knowledge (and equipment) is\nlimited; this can also increase operational costs. Systems with a large number of validators tend to\nform pools to decrease the variance of their revenue and profit from economies of scale. These pools\nare often off-chain."}),"\n",(0,i.jsx)(n.p,{children:"A way to alleviate this is to implement pool formation on-chain and allow token holders to vote with\ntheir stake for validators to represent them."}),"\n",(0,i.jsx)(n.h2,{id:"nominated-proof-of-stake",children:"Nominated Proof of Stake"}),"\n",(0,i.jsxs)(n.p,{children:["Polkadot uses NPoS (Nominated Proof-of-Stake) as its mechanism for selecting the validator set. It\nis designed with the roles of ",(0,i.jsx)(n.a,{href:"/docs/learn-validator",children:(0,i.jsx)(n.strong,{children:"validators"})})," and\n",(0,i.jsx)(n.a,{href:"/docs/learn-nominator",children:(0,i.jsx)(n.strong,{children:"nominators"})}),", to maximize chain security. Actors who are interested in\nmaintaining the network can run a validator node."]}),"\n",(0,i.jsx)(n.p,{children:"Validators assume the role of producing new blocks, validating parachain blocks, and guaranteeing\nfinality. Nominators can choose to backselect validators with their stake. Nominators can approve\ncandidates that they trust and back them with their tokens."}),"\n",(0,i.jsx)(n.h2,{id:"hybrid-consensus",children:"Hybrid Consensus"}),"\n",(0,i.jsxs)(n.p,{children:["Polkadot uses a ",(0,i.jsx)(n.em,{children:"hybrid consensus"})," composed by the finality gadget\n(",(0,i.jsx)(n.a,{href:"#finality-gadget-grandpa",children:"GRANDPA"}),") and the block production mechanism\n(",(0,i.jsx)(n.a,{href:"#block-production-babe",children:"BABE"}),")."]}),"\n",(0,i.jsxs)(n.p,{children:["This is a way of getting the benefits of ",(0,i.jsx)(n.strong,{children:"probabilistic finality"})," (the ability always to produce\nnew blocks) and ",(0,i.jsx)(n.strong,{children:"provable finality"}),' (having a universal agreement on the canonical chain with no\nchance for reversion). It also avoids the corresponding drawbacks of each mechanism (the chance of\nunknowingly following the wrong fork in probabilistic finality, and a chance for "stalling" - not\nbeing able to produce new blocks - in provable finality). The combination of these two mechanisms\nallows for blocks to be rapidly produced, and the slower finality mechanism to run in a separate\nprocess to finalize blocks without risking slower transaction processing or stalling.']}),"\n",(0,i.jsxs)(n.p,{children:["Hybrid consensus has been proposed in the past. Notably, it was proposed (now defunct) as a step in\nEthereum's transition to proof of stake in ",(0,i.jsx)(n.a,{href:"http://eips.ethereum.org/EIPS/eip-1011",children:"EIP 1011"}),", which\nspecified ",(0,i.jsx)(n.a,{href:"#casper-ffg",children:"Casper FFG"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"block-production-babe",children:"Block Production: BABE"}),"\n",(0,i.jsxs)(n.p,{children:["BABE (Blind Assignment for Blockchain Extension) is the block production mechanism that runs between\nthe validator nodes and determines the authors of new blocks. BABE is comparable as an algorithm to\n",(0,i.jsx)(n.a,{href:"https://eprint.iacr.org/2017/573.pdf",children:"Ouroboros Praos"}),", with some key differences in chain\nselection rule and slot time adjustments. BABE assigns block production slots to validators\naccording to stake and using the relay chain's\n",(0,i.jsx)(n.a,{href:"/docs/learn-cryptography#randomness",children:"randomness cycle"}),". The chain\u2019s runtime is required to provide\nthe BABE authority list and randomness to the host via a consensus message in the header of the\nfirst block of each epoch."]}),"\n",(0,i.jsxs)(n.p,{children:["BABE execution happens in sequential non-overlapping phases known as epochs. Each epoch is divided\ninto a predefined number of slots. All slots in each epoch are sequentially indexed starting from 0\n(slot number). At the beginning of each epoch, the BABE node needs to run the\n",(0,i.jsx)(n.a,{href:"https://spec.polkadot.network/#algo-block-production-lottery",children:"Block-Production-Lottery algorithm"}),"\nto find out in which slots it should produce a block and gossip to the other block producers."]}),"\n",(0,i.jsx)(n.p,{children:"Validators participate in a lottery for every slot, which will inform whether or not they are the\nblock producer candidate for that slot. Slots are discrete units of time of approximately 6 seconds\nin length. Because the mechanism of allocating slots to validators is based on a randomized design,\nmultiple validators could be candidates for the same slot. Other times, a slot could be empty,\nresulting in inconsistent block time."}),"\n",(0,i.jsx)(n.h3,{id:"multiple-validators-per-slot",children:"Multiple Validators per Slot"}),"\n",(0,i.jsxs)(n.p,{children:["When multiple validators are block producer candidates in a given slot, all will produce a block and\nbroadcast it to the network. At that point, it's a race. The validator whose block reaches most of\nthe network first wins. Depending on network topology and latency, both chains will continue to\nbuild in some capacity until finalization kicks in and amputates a fork. See\n",(0,i.jsx)(n.a,{href:"#fork-choice",children:"Fork Choice"})," below for how that works."]}),"\n",(0,i.jsx)(n.h3,{id:"no-validators-in-slot",children:"No Validators in Slot"}),"\n",(0,i.jsxs)(n.p,{children:["When no validators have rolled low enough in the randomness lottery to qualify for block production,\na slot can remain seemingly blockless. Polkadot protocol runs a\n",(0,i.jsx)(n.a,{href:"https://spec.polkadot.network/sect-block-production#defn-babe-secondary-slots",children:"secondary validator selection algorithm"}),"\nin the background. The validators selected through this predictable algorithm always produce blocks.\nThese ",(0,i.jsx)(n.em,{children:"secondary"})," blocks are ignored if the same slot has a primary block produced from a\n",(0,i.jsx)(n.a,{href:"/docs/learn-cryptography#randomness",children:"VRF-selected"})," validator. Thus, a slot can have either a\n",(0,i.jsx)(n.em,{children:"primary"})," or a ",(0,i.jsx)(n.em,{children:"secondary"})," block, and no slots are ever skipped."]}),"\n",(0,i.jsxs)(n.p,{children:["For more details on BABE, please see the\n",(0,i.jsx)(n.a,{href:"https://research.web3.foundation/Polkadot/protocols/block-production/Babe",children:"BABE paper"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"finality-gadget-grandpa",children:"Finality Gadget: GRANDPA"}),"\n",(0,i.jsx)(n.p,{children:"GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement) is the finality gadget that is\nimplemented for the relay chain."}),"\n",(0,i.jsx)(n.p,{children:"The Polkadot Host uses the GRANDPA Finality protocol to finalize blocks. Finality is obtained by\nconsecutive rounds of voting by the validator nodes. Validators execute the GRANDPA finality process\nin parallel to Block Production as an independent service."}),"\n",(0,i.jsx)(n.p,{children:"It works in a partially synchronous network model as long as 2/3 of nodes are honest and can cope\nwith 1/5 Byzantine nodes in an asynchronous setting."}),"\n",(0,i.jsx)(n.p,{children:"A notable distinction is that GRANDPA reaches agreements on chains rather than blocks, greatly\nspeeding up the finalization process, even after long-term network partitioning or other networking\nfailures."}),"\n",(0,i.jsx)(n.p,{children:"In other words, as soon as more than 2/3 of validators attest to a chain containing a particular\nblock, all blocks leading up to that one are finalized at once."}),"\n",(0,i.jsx)(n.admonition,{title:"GRANDPA description and implementation",type:"info",children:(0,i.jsxs)(n.p,{children:["Please refer to ",(0,i.jsx)(n.a,{href:"https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf",children:"the GRANDPA paper"}),"\nfor a full description of the protocol. GRANDPA is implemented as a\n",(0,i.jsx)(n.a,{href:"https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/grandpa/src/lib.rs",children:"module of the Substrate Frame System"}),"."]})}),"\n",(0,i.jsx)(n.h3,{id:"probabilistic-vs-provable-finality",children:"Probabilistic vs. Provable Finality"}),"\n",(0,i.jsxs)(n.p,{children:["A pure Nakamoto consensus blockchain that runs PoW is only able to achieve the notion of\n",(0,i.jsx)(n.em,{children:"probabilistic finality"})," and reach ",(0,i.jsx)(n.em,{children:"eventual consensus"}),". Probabilistic finality means that under\nsome assumptions about the network and participants, if we see a few blocks building on a given\nblock, we can estimate the probability that it is final. Eventual consensus means that at some point\nin the future, all nodes will agree on the truthfulness of one set of data. This eventual consensus\nmay take a long time, and will not be able to determine how long it will take ahead of time.\nHowever, finality gadgets such as GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement)\nor Ethereum's Casper FFG (the Friendly Finality Gadget) are designed to give stronger and quicker\nguarantees on the finality of blocks - specifically, that they can never be reverted after some\nprocess of Byzantine agreements has taken place. The notion of irreversible consensus is known as\n",(0,i.jsx)(n.em,{children:"provable finality."})]}),"\n",(0,i.jsxs)(n.p,{children:["In the ",(0,i.jsx)(n.a,{href:"https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf",children:"GRANDPA paper"}),", it is phrased\nin this way:"]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["We say an Oracle A in a protocol is ",(0,i.jsx)(n.em,{children:"eventually consistent"})," if it returns the same value to all\nparticipants after some unspecified time."]})}),"\n",(0,i.jsx)(n.h2,{id:"fork-choice",children:"Fork Choice"}),"\n",(0,i.jsx)(n.p,{children:"Bringing BABE and GRANDPA together, the fork choice of the relay chain becomes clear. BABE must\nalways build on the chain that GRANDPA has finalized. BABE provides probabilistic finality when\nthere are forks after the finalized head by building on the chain with the most primary blocks."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Best chain choice",src:o(25704).A+"",width:"1739",height:"817"})}),"\n",(0,i.jsx)(n.p,{children:'In the above image, the black blocks are finalized, and the yellow blocks are not. Blocks marked\nwith a "1" are primary blocks; those marked with a "2" are secondary blocks. Even though the topmost\nchain is the longest chain on the latest finalized block, it does not qualify because it has fewer\nprimaries at the time of evaluation than the one below it.'}),"\n",(0,i.jsx)(n.h2,{id:"comparisons",children:"Comparisons"}),"\n",(0,i.jsx)(n.h3,{id:"nakamoto-consensus",children:"Nakamoto consensus"}),"\n",(0,i.jsx)(n.p,{children:"Nakamoto consensus consists of the longest chain rule using proof of work as its Sybil resistance\nmechanism and leader election."}),"\n",(0,i.jsx)(n.p,{children:"Nakamoto consensus only gives us probabilistic finality. Probabilistic finality states that a block\nin the past is only as safe as the number of confirmations it has, or the number of blocks that have\nbeen built on top of it. As more blocks are built on top of a specific block in a Proof of Work\nchain, more computational work has been expended behind this particular chain. However, it does not\nguarantee that the chain containing the block will always remain the agreed-upon chain since an\nactor with unlimited resources could potentially build a competing chain and expend enough\ncomputational resources to create a chain that did not contain a specific block. In such a\nsituation, the longest chain rule employed in Bitcoin and other proof of work chains would move to\nthis new chain as the canonical one."}),"\n",(0,i.jsx)(n.h3,{id:"pbft--tendermint",children:"PBFT / Tendermint"}),"\n",(0,i.jsxs)(n.p,{children:["Please see the ",(0,i.jsx)(n.a,{href:"/docs/learn-comparisons-cosmos#consensus",children:"relevant section"})," in the Cosmos comparison\narticle."]}),"\n",(0,i.jsx)(n.h3,{id:"casper-ffg",children:"Casper FFG"}),"\n",(0,i.jsx)(n.p,{children:"The two main differences between GRANDPA and Casper FFG are:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"in GRANDPA, different voters can cast votes simultaneously for blocks at different heights"}),"\n",(0,i.jsx)(n.li,{children:"GRANDPA only depends on finalized blocks to affect the fork-choice rule of the underlying block\nproduction mechanism"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"bridging-beefy",children:"Bridging: BEEFY"}),"\n",(0,i.jsx)(n.p,{children:"The BEEFY (Bridge Efficiency Enabling Finality Yielder) is a secondary protocol to GRANDPA to\nsupport efficient bridging between relay chains (Polkadot and Kusama) and remote, segregated\nblockchains, such as Ethereum, which were not built with the Polkadot native interoperability in\nmind. The protocol allows participants of the remote network to efficiently verify finality proofs\ncreated by validators on the relay chain, i.e. clients in the Ethereum network can verify that the\nPolkadot network is at a specific state."}),"\n",(0,i.jsx)(n.p,{children:"Storing all the information necessary to verify the state of the remote chain, such as the block\nheaders, is too expensive. In BEEFY, all honest validators sign on a GRANDPA finalized block. This\nreduces the efforts on the light client side, as tracking forks, GRANDPA justifications, etc., is no\nlonger necessary. Moreover, BEEFY utilizes Merkle Mountain Ranges (MMR) as an efficient data\nstructure for storing and transmitting block headers and signatures to light clients and the ECDSA\nsignature schemes (more efficiently verifiable on EVM). Light clients now only have to check if the\nblock has a super-majority of BEEFY votes by validators."}),"\n",(0,i.jsx)(n.p,{children:"Overall, BEEFY addresses the limitations of GRANDPA finality for bridges to chains like Ethereum by\nproviding a more lightweight and efficient finality solution."}),"\n",(0,i.jsxs)(n.p,{children:["For additional implementation details about BEEFY, see\n",(0,i.jsx)(n.a,{href:"https://spec.polkadot.network/#sect-grandpa-beefy",children:"the Polkadot Specification"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://research.web3.foundation/Polkadot/protocols/block-production/Babe",children:"BABE paper"})," - The\nacademic description of the BABE protocol."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf",children:"GRANDPA paper"})," - The academic\ndescription of the GRANDPA finality gadget. Contains formal proofs of the algorithm."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/paritytech/finality-grandpa",children:"Rust implementation"})," - The reference\nimplementation and the accompanying\n",(0,i.jsx)(n.a,{href:"https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/grandpa/src/lib.rs",children:"Substrate pallet"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://www.crowdcast.io/e/polkadot-block-production",children:"Block Production and Finalization in Polkadot"})," -\nAn explanation of how BABE and GRANDPA work together to produce and finalize blocks on Kusama with\nBill Laboon."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://www.youtube.com/watch?v=1CuTSluL7v4&t=4s",children:"Block Production and Finalization in Polkadot: Understanding the BABE and GRANDPA Protocols"})," -\nAn academic talk by Bill Laboon, given at MIT Cryptoeconomic Systems 2020, describing Polkadot's\nhybrid consensus model in-depth."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},25704:(e,n,o)=>{o.d(n,{A:()=>t});const t=o.p+"assets/images/best_chain-52a3da00fb2f804a198c73690fcedc4f.png"},28453:(e,n,o)=>{o.d(n,{R:()=>s,x:()=>r});var t=o(96540);const i={},a=t.createContext(i);function s(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);