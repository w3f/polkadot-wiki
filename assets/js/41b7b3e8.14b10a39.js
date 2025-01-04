"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[577],{16044:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"learn/learn-staking-advanced","title":"Advanced Staking Concepts","description":"Advanced Concepts about Staking on Polkadot.","source":"@site/../docs/learn/learn-staking-advanced.md","sourceDirName":"learn","slug":"/learn-staking-advanced","permalink":"/docs/learn-staking-advanced","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/learn/learn-staking-advanced.md","tags":[],"version":"current","lastUpdatedBy":"github-actions[bot]","lastUpdatedAt":1733735923000,"frontMatter":{"id":"learn-staking-advanced","title":"Advanced Staking Concepts","sidebar_label":"Advanced Staking Concepts","description":"Advanced Concepts about Staking on Polkadot.","keywords":["staking","stake","nominate","nominating","NPoS","proxies","payouts","simple payouts","rewards","staking miner","phragm\xe9n"],"slug":"../learn-staking-advanced"},"sidebar":"docs","previous":{"title":"Accounts","permalink":"/docs/learn-account-advanced"},"next":{"title":"NFT Pallets","permalink":"/docs/learn-nft-pallets"}}');var a=n(74848),s=n(28453);const o={id:"learn-staking-advanced",title:"Advanced Staking Concepts",sidebar_label:"Advanced Staking Concepts",description:"Advanced Concepts about Staking on Polkadot.",keywords:["staking","stake","nominate","nominating","NPoS","proxies","payouts","simple payouts","rewards","staking miner","phragm\xe9n"],slug:"../learn-staking-advanced"},r=void 0,l={},d=[{value:"Staking Proxies",id:"staking-proxies",level:2},{value:"Bags List",id:"bags-list",level:2},{value:"Rewards Distribution",id:"rewards-distribution",level:2},{value:"Commission Fees &amp; Slashes",id:"commission-fees--slashes",level:4},{value:"Simple Payouts",id:"simple-payouts",level:2},{value:"Claiming Rewards",id:"claiming-rewards",level:3},{value:"FAQ and Cautionary Notes",id:"faq-and-cautionary-notes",level:3},{value:"Staking Miner",id:"staking-miner",level:2},{value:"NPoS election optimization",id:"npos-election-optimization",level:3},{value:"Signed Phase of the election pallet",id:"signed-phase-of-the-election-pallet",level:3},{value:"Deposit and reward mechanics",id:"deposit-and-reward-mechanics",level:3},{value:"Further Resources",id:"further-resources",level:3}];function h(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.admonition,{title:"New to Staking?",type:"tip",children:(0,a.jsxs)(t.p,{children:["Start your staking journey or explore more information about staking on\n",(0,a.jsx)(t.a,{href:"https://polkadot.network/staking/",children:"Polkadot's Home Page"}),". Discover the new\n",(0,a.jsx)(t.a,{href:"https://staking.polkadot.cloud/#/overview",children:"Staking Dashboard"})," that makes staking much easier and\ncheck this\n",(0,a.jsx)(t.a,{href:"https://support.polkadot.network/support/solutions/articles/65000182104",children:"extensive article list"})," to\nhelp you get started. You can now stake natively with a\n",(0,a.jsx)(t.a,{href:"/docs/chain-state-values#minimum-bond-to-join-a-nomination-pool",children:"small number of tokens"}),"\nand earn staking rewards. For additional information, check out\n",(0,a.jsx)(t.a,{href:"https://polkadot.network/blog/nomination-pools-are-live-stake-natively-with-just-1-dot/",children:"this blog post"}),"."]})}),"\n",(0,a.jsxs)(t.p,{children:["This page is meant to be an advanced guide to staking with the relay chain. For a more general\nintroduction, checkout the ",(0,a.jsx)(t.a,{href:"/docs/learn-staking",children:"Introduction to Staking"})," page."]}),"\n",(0,a.jsx)(t.h2,{id:"staking-proxies",children:"Staking Proxies"}),"\n",(0,a.jsxs)(t.p,{children:["Polkadot makes it possible to create accounts having special permissions also called ",(0,a.jsx)(t.strong,{children:"proxy\naccounts"}),". For more details about proxy accounts visit the ",(0,a.jsx)(t.a,{href:"/docs/learn-proxies",children:"dedicated page"})," on\nthis wiki."]}),"\n",(0,a.jsxs)(t.p,{children:["Proxy accounts are special accounts which can sign\n",(0,a.jsx)(t.a,{href:"/docs/learn-transactions#pallets-and-extrinsics",children:(0,a.jsx)(t.strong,{children:"extrinsic calls"})})," made to specific ",(0,a.jsx)(t.strong,{children:"pallets"}),"\non behalf of the proxied account. There is thus the possibility to create staking proxy accounts\nthat can be used to sign extrinsic calls specific to the staking, session and utility pallets."]}),"\n",(0,a.jsx)(t.p,{children:"Staking is not a set-and-forget action, as a nominator you will need to monitor the performance of\nyour validators and make changes if needed. There will be this transactions such as nominating that\nwill be needed to regularly signed. Each time you sign with an account, in the case of hot accounts,\nyou expose the private key of that account to the internet with consequent risk of attack. A hot\nstash will be exposed all the time a transaction is signed. Even in the case of a cold stash created\nwith a Ledger device, signing with the stash will build a transaction history that might tell\nsomething about your habits and preferences, or even your location."}),"\n",(0,a.jsx)(t.p,{children:"Ideally, accounts with high economic power like the stash must be and remain as isolated as\npossible. With a staking proxy, the stash account is fully isolated when signing for staking-related\ntransactions. The proxy private key will be used to sign staking-related transactions, the stash\nprivate key will stay isolated and the staking transaction history will be built by the proxy."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"stash-stakingProxy",src:n(60546).A+"",width:"1920",height:"800"})}),"\n",(0,a.jsx)(t.p,{children:"For a practical perspective we need to use only one account and remember one password to sign for\nall staking-related transactions. From a security perspective who controls the staking proxy\ncontrols our staking actions."}),"\n",(0,a.jsx)(t.p,{children:"It is important to remember that actions that can be performed by the proxy accounts are limited,\nand in the case of staking proxy, extrinsic calls to the balances pallet cannot be signed. This\nmeans it is not possible to do balance transfers on the proxied account through a staking proxy."}),"\n",(0,a.jsxs)(t.p,{children:["Note that to change the staking proxy you will need to sign with the stash or an ",(0,a.jsx)(t.em,{children:"any"})," proxy."]}),"\n",(0,a.jsx)(t.h2,{id:"bags-list",children:"Bags List"}),"\n",(0,a.jsxs)(t.admonition,{type:"info",children:[(0,a.jsxs)(t.p,{children:["On Polkadot and Kusama, the instance of the pallet\n",(0,a.jsx)(t.a,{href:"https://paritytech.github.io/substrate/master/pallet_bags_list/",children:"Bags-List"})," is named as\n'voterList'."]}),(0,a.jsxs)(t.p,{children:["For a demo about bags list see ",(0,a.jsx)(t.a,{href:"https://youtu.be/hIIZRJLrBZA",children:"this video tutorial"}),"."]})]}),"\n",(0,a.jsxs)(t.p,{children:["In Polkadot's NPoS nomination intents are placed in a semi-sorted list called\n",(0,a.jsx)(t.a,{href:"https://github.com/paritytech/substrate/pull/9507",children:"bags-list"}),". The Bags-List substrate pallet is\ndesigned to be self-maintaining, with minimal effort from the blockchain, making it extremely\nscalable. The bags list has two primary components, bags and nodes (or nominators' accounts), with\nbags containing the nodes with bonded balance within a specific range. In the figure below the 1st\nempty bag will contain nominators whose bonded balance is in the range of 21 - 30 DOT, the 2nd bag\n11 - 20 DOT, and the 3rd bag 0-10 DOT. The nomination intents are the nominators' accounts with\nbonded tokens (in the example shown below, there are eight nomination intents) that will be put\ninside each of those three bags depending on their stake."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"bags list example 0",src:n(65394).A+"",width:"1920",height:"800"})}),"\n",(0,a.jsx)(t.p,{children:"The bags list is semi-sorted, meaning that sorting is only partially done. When the nomination\nintents are submitted to the network, they are automatically put into each bag based on the number\nof bonded tokens, but within each bag, those nodes are arranged based on the time they are inserted\nand not based on their stake (see figure below). When the nomination intent of 19 DOT is submitted,\nit gets placed at the last spot in the 2nd bag (shown in the green circle). The same scenario\napplies for the node with 8 DOT (yellow circle) in the 3rd bag. Placing the node above all nodes\nwith a lesser stake requires an additional step (more on this later)."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"bags list example 1",src:n(63259).A+"",width:"1920",height:"800"})}),"\n",(0,a.jsxs)(t.p,{children:["The mentioned two nodes (19 DOT and 8 DOT) have the option to move up in their respective bags,\nwhich can put them in front of the nodes with less stake than them (see figure below). This action\nmust be done manually by submitting the ",(0,a.jsx)(t.code,{children:"putInFrontOf"})," extrinsic within the ",(0,a.jsx)(t.code,{children:"voterList"})," pallet\ninstance. Moreover, if the node with 19 DOT bonds an additional 2 DOT, that node will be put\nautomatically in the 1st bag (i.e. automatic ",(0,a.jsx)(t.code,{children:"rebag"}),') because the total number of bonded tokens will\nnow be within the range of the 1st bag. That node with now 21 DOT will be put at the tail end of the\n1st bag with the possibility to manually put itself in front of "older" nodes with less than 21 DOT\n(if there are any).']}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"bags list example 2",src:n(84928).A+"",width:"1920",height:"800"})}),"\n",(0,a.jsxs)(t.p,{children:["If one decides to send staking rewards to the stash account and automatically bond them (i.e.\ncompounding the staking rewards), the position within a bag does not change automatically. The same\nscenario applies to a slashing event, i.e., when a nominator gets slashed, their position within a\nbag does not change. This might result in a scenario where the node is in the wrong bag and needs to\nbe placed in the right bag. To address this issue, any account on-chain can submit the\npermissionless extrinsic ",(0,a.jsx)(t.code,{children:"rebag"})," within the ",(0,a.jsx)(t.code,{children:"voterList"})," pallet instance to update the positions of\nthe nodes that do not belong to their bag and place them in the correct one. To reiterate, actions\nlike bonding/unbonding tokens automatically rebag the nominator node, but events like staking\nrewards/slashing do not. See the ",(0,a.jsx)(t.a,{href:"/docs/learn-nominator#bags-list",children:"bags-list"})," section for more\ninformation."]}),"\n",(0,a.jsxs)(t.p,{children:["The bags-list is capable of including an unlimited number of nodes, subject to the chain's runtime\nstorage. In the current staking system configuration, at most 22500 nominators in the bags-list\n(12500 on Kusama) come out as the electing nominators. See\n",(0,a.jsx)(t.a,{href:"/docs/learn-nominator#staking-election-stages",children:"Staking Election Stages"})," section for more info."]}),"\n",(0,a.jsxs)(t.p,{children:["This means that only a portion of the nomination intents is kept. Once the nomination period ends,\nthe NPoS election system takes all nomination intents and their associated votes as input, and it\noutputs a set of validators. The bags are iterated from the most staked to the least staked. If the\naccounts are not appropriately sorted, this could leave the last touched bag to only be partially\niterated. Thus, in some edge cases, the order of the members within a bag is important. Continuing\nwith the example used in the previous figures, there are 8 nomination intents of which only 7 will\nbe kept. If the bags list stays semi-sorted (i.e. no accounts call the ",(0,a.jsx)(t.code,{children:"putInFrontOf"})," and ",(0,a.jsx)(t.code,{children:"rebag"}),"\nextrinsics), the nomination of the node with 8 DOT in the 3rd bag will not be considered while that\nof the preceding node with 5 DOT will be. Nomination of the node with 8 DOT will be kept only if it\nputs itself in front of the one with 5 DOT. Note how the nomination of the node with 19 DOT in the\n2nd bag will be considered regardless of changing its position inside the bag. The sorting\nfunctionality of nomination intents using bags is extremely important for the\n",(0,a.jsx)(t.a,{href:"https://gist.github.com/kianenigma/aa835946455b9a3f167821b9d05ba376",children:"long-term improvements"})," of the\nstaking/election system."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"bags list example 3",src:n(56105).A+"",width:"1920",height:"800"})}),"\n",(0,a.jsx)(t.admonition,{title:"Minimum active nomination threshold to earn rewards is dynamic",type:"caution",children:(0,a.jsxs)(t.p,{children:["Submitting a nomination intent does not guarantee staking rewards. The stake of the top 22500\nnominators (12500 on Kusama) is applied to the validators in the active set. To avail of staking\nrewards, ensure that the number of tokens bonded is higher than the minimum active bond. For more\ninformation, see the ",(0,a.jsx)(t.a,{href:"/docs/learn-nominator",children:"nominator guide"}),"."]})}),"\n",(0,a.jsxs)(t.p,{children:['The "election solution" which is a connected graph between nominators and validators with the stake\nas edge weights, has to meet certain requirements, such as maximizing the amount of stake to\nnominate validators and distributing the stake backing validators as evenly as possible. The\nobjectives of this election mechanism are to maximize the security of the network, and achieve fair\nrepresentation of the nominators. If you want to know more about how NPoS works (e.g. election,\nrunning time complexity, etc.), please read\n',(0,a.jsx)(t.a,{href:"http://research.web3.foundation/en/latest/polkadot/NPoS.html",children:"here"}),"."]}),"\n",(0,a.jsx)(t.h2,{id:"rewards-distribution",children:"Rewards Distribution"}),"\n",(0,a.jsx)(t.admonition,{type:"info",children:(0,a.jsxs)(t.p,{children:["The general rule for rewards across validators is that two validators get paid essentially the same\namount of tokens for equal work, i.e. they are not paid proportional to their total stakes. There is\na probabilistic component to staking rewards in the form of\n",(0,a.jsx)(t.a,{href:"/docs/maintain-guides-validator-payout##era-points",children:"era points"})," and\n",(0,a.jsx)(t.a,{href:"/docs/learn-guides-transfers#calculating-fees-with-polkadot-js",children:"tips"})," but these should average out\nover time."]})}),"\n",(0,a.jsx)(t.p,{children:"Validators are paid the same regardless of stake backing them. Validators with less stake will\ngenerally pay more to nominators per-token than the ones with more stake. This gives nominators an\neconomic incentive to gradually shift their preferences to lower-staked validators that gain a\nsufficient amount of reputation. A consequence of this is that the stake across validators will be\nas evenly distributed as possible which avoids concentration of power among a few validators. In the\nlong term, validators will have similar levels of stake, with the stake being higher for validators\nwith higher reputation. A nominator who is willing to risk more by backing a validator with a lower\nreputation will get paid more, provided there are no slashing events."}),"\n",(0,a.jsx)(t.p,{children:"Before distributing rewards to nominators, validators can create a cut of the reward (a commission)\nthat is not shared with the nominators. This cut is a percentage of the block reward, not an\nabsolute value. After the commission gets deducted, the remaining portion is distributed pro-rata\nbased on their staked value and split between the validator and all of the nominators whose stake\nhas backed this validator."}),"\n",(0,a.jsxs)(t.p,{children:["For example, assume the block reward for a validator is 10 DOT. A validator may specify\n",(0,a.jsx)(t.code,{children:"validator_commission = 50%"}),", in which case the validator would receive 5 DOT. The remaining 5 DOT\nwould then be split between the validator and their nominators based on the proportion of stake each\nnominator had. Note that for this calculation, validator's self-stake acts just as if they were\nanother nominator."]}),"\n",(0,a.jsx)(t.p,{children:"Thus, a percentage of the reward goes thus to pay the validator's commission fees and the remainder\nis paid pro-rata (i.e. proportional to stake) to the nominators and validator. If a validator's\ncommission is set to 100%, no tokens will be paid out to any of the nominators. Notice in particular\nthat the validator is rewarded twice: once in commission fees for validating (if their commission\nrate is above 0%), and once for nominating itself with own stake."}),"\n",(0,a.jsx)(t.p,{children:"The following example should clarify the above. For simplicity, we have the following assumptions:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"These validators do not have a stake of their own."}),"\n",(0,a.jsx)(t.li,{children:"They each receive the same number of era points."}),"\n",(0,a.jsx)(t.li,{children:"There are no tips for any transactions processed."}),"\n",(0,a.jsx)(t.li,{children:"They do NOT charge any commission fees."}),"\n",(0,a.jsx)(t.li,{children:"Total reward amount is 100 DOT tokens."}),"\n",(0,a.jsxs)(t.li,{children:["The current minimum amount of DOT to be a validator is 350 (note that this is ",(0,a.jsx)(t.em,{children:"not"})," the actual\nvalue, which fluctuates, but merely an assumption for purposes of this example; to understand how\nthe actual minimal stake is calculated, see\n",(0,a.jsx)(t.a,{href:"/docs/faq#what-is-the-minimum-stake-necessary-to-be-elected-as-an-active-validator",children:"here"}),")."]}),"\n"]}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{style:{textAlign:"center"}}),(0,a.jsx)(t.th,{style:{textAlign:"center"},children:(0,a.jsx)(t.strong,{children:"Validator A"})}),(0,a.jsx)(t.th,{style:{textAlign:"center"}}),(0,a.jsx)(t.th,{style:{textAlign:"center"}})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Nominator (4)"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Stake (600)"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Fraction of the Total Stake"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Rewards"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Jin"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"100"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"0.167"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"16.7"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:(0,a.jsx)(t.strong,{children:"Sam"})}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"50"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"0.083"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"8.3"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Anson"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"250"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"0.417"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"41.7"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Bobby"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"200"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"0.333"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"33.3"})]})]})]}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{style:{textAlign:"center"}}),(0,a.jsx)(t.th,{style:{textAlign:"center"},children:(0,a.jsx)(t.strong,{children:"Validator B"})}),(0,a.jsx)(t.th,{style:{textAlign:"center"}}),(0,a.jsx)(t.th,{style:{textAlign:"center"}})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Nominator (4)"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Stake (400)"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Fraction of the Total Stake"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Rewards"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Alice"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"100"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"0.25"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"25"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"Peter"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"100"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"0.25"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"25"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"John"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"150"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"0.375"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"37.5"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{style:{textAlign:"center"},children:(0,a.jsx)(t.strong,{children:"Kitty"})}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"50"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"0.125"}),(0,a.jsx)(t.td,{style:{textAlign:"center"},children:"12.5"})]})]})]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.em,{children:"Both validators A & B have 4 nominators with a total stake 600 and 400 respectively."})}),"\n",(0,a.jsx)(t.p,{children:"Based on the above rewards distribution, nominators of validator B get more rewards per DOT than\nthose of validator A because A has more overall stake. Sam has staked 50 DOT with validator A, but\nhe only gets 8.3 in return, whereas Kitty gets 12.5 with the same amount of stake."}),"\n",(0,a.jsxs)(t.p,{children:["To estimate how many tokens you can get each month as a nominator or validator, you can use this\n",(0,a.jsx)(t.a,{href:"https://www.stakingrewards.com/earn/polkadot/calculate",children:"tool"})," as a reference and play around with\nit by changing some parameters (e.g. how many days you would like to stake with your DOT, provider\nfees, compound rewards, etc.) to have a better estimate. Even though it may not be entirely accurate\nsince staking participation is changing dynamically, it works well as an indicator."]}),"\n",(0,a.jsx)(t.h4,{id:"commission-fees--slashes",children:"Commission Fees & Slashes"}),"\n",(0,a.jsxs)(t.p,{children:["The network ",(0,a.jsx)(t.a,{href:"/docs/learn-offenses",children:"slashes"})," a validator for a misbehavior. The slashed amount is a\nfixed percentage (and not a fixed amount), which means that validators with more stake get slashed\nmore DOT. Again, this is done to provide nominators with an economic incentive to shift their\npreferences and back less popular validators whom they consider to be trustworthy."]}),"\n",(0,a.jsx)(t.p,{children:"Also, note that each validator candidate is free to name their desired commission fee (as a\npercentage of rewards) to cover operational costs. Since validators are paid the same, validators\nwith lower commission fees pay more to nominators than validators with higher fees. Thus, each\nvalidator can choose between increasing their fees to earn more, or decreasing their fees to attract\nmore nominators and increase their chances of being elected. In the long term, we expect that all\nvalidators will need to be cost-efficient to remain competitive, and that validators with higher\nreputation will be able to charge slightly higher commission fees (which is fair)."}),"\n",(0,a.jsx)(t.h2,{id:"simple-payouts",children:"Simple Payouts"}),"\n",(0,a.jsx)(t.p,{children:"Polkadot makes stakers claim their rewards for past eras by submitting a transaction. This naturally\nleads to spreading out reward distribution, as people make transactions at disparate times, rather\nthan updating the accounts of all stakers in a single block."}),"\n",(0,a.jsx)(t.p,{children:"Even if everyone submitted a reward claim at the same time, the fact that they are individual\ntransactions would allow the block construction algorithm to process only a limited number per block\nand ensure that the network maintains a constant block time. If all rewards were sent out in one\nblock, this could cause serious issues with the stability of the network."}),"\n",(0,a.jsxs)(t.p,{children:["Simple payouts require one transaction per validator, per ",(0,a.jsx)(t.a,{href:"/docs/glossary##era",children:"era"}),", to\nclaim rewards. The reason Polkadot requires this is to avoid an attack where someone has several\nthousand accounts nominating a single validator. The major cost in reward distribution is mutating\nthe accounts in storage, and Polkadot cannot pay out several thousand accounts in a single\ntransaction."]}),"\n",(0,a.jsx)(t.h3,{id:"claiming-rewards",children:"Claiming Rewards"}),"\n",(0,a.jsx)(t.p,{children:"The relay chain stores the last 84 eras of reward information (e.g. maps of era number to validator\npoints, staking rewards, nomination exposure, etc.). Rewards will not be claimable more than 84 eras\nafter they were earned. This means that all rewards must be claimed within a maximum of 84 eras,\nalthough under certain circumstances (described below) this may be as low as 28 eras."}),"\n",(0,a.jsx)(t.p,{children:"If a validator kills their stash, any remaining rewards will no longer be claimable. Before doing\nthis, however, they would need to first stop validating and then unbond the funds in their stash,\nwhich takes 28 eras. If a validator were to immediately chill and start unbonding after rewards are\ncalculated, and nobody issued a payout for that era from that validator in the next 28 eras, the\nreward would no longer be claimable."}),"\n",(0,a.jsx)(t.admonition,{title:"Advanced How-to Guides",type:"info",children:(0,a.jsxs)(t.p,{children:["In order to be absolutely sure that staking rewards can be claimed, users should trigger a payout\nbefore 28 eras have passed. See\n",(0,a.jsx)(t.a,{href:"/docs/learn-guides-nominator#claiming-rewards-with-the-polkadot-js-ui",children:"this page"})," for more\ninformation about how to claim rewards using the Polkadot-JS UI."]})}),"\n",(0,a.jsx)(t.h3,{id:"faq-and-cautionary-notes",children:"FAQ and Cautionary Notes"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsxs)(t.li,{children:["Rewards expire after 84 eras. On Polkadot, that's about 84 days. On Kusama, it is approximately\n21 days. Validators should claim all pending rewards before killing their stash in the event the\nvalidator decides to ",(0,a.jsx)(t.code,{children:"chill"})," -> ",(0,a.jsx)(t.code,{children:"unbonds all"})," -> ",(0,a.jsx)(t.code,{children:"withdraws unbonded"}),". Nominators will not miss\nout on rewards if they claim the pending rewards for a validator within 28 days. Essentially, the\ndeadline to ensure you get staking rewards is 28 eras. If the validator verifies its intent and\ndoes not unbond and withdraw, the 84 era timeline holds."]}),"\n",(0,a.jsx)(t.li,{children:"Claiming rewards (or neglecting to claim rewards) does not affect nominations in any way.\nNominations will persist after claiming rewards or after the rewards expire."}),"\n",(0,a.jsx)(t.li,{children:'Rewards are not minted until they are claimed. Therefore, if your reward destination is "stash,\nincreasing amount at stake", then your staked amount does not reflect your rewards until you\nclaim them. If you want to maximize compounding, then you will need to claim often or nominate\nvalidators which regularly claim for you.'}),"\n",(0,a.jsxs)(t.li,{children:["Staking operations at the end of an era are closed to allow the off-chain validator election to\ntake place. See ",(0,a.jsx)(t.a,{href:"/docs/learn-phragmen#off-chain-phragmen",children:"Off-chain Phragm\xe9n"})," for more information."]}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"staking-miner",children:"Staking Miner"}),"\n",(0,a.jsx)(t.admonition,{type:"caution",children:(0,a.jsx)(t.p,{children:"The staking-miner code is experimental and it is still in the development phase. Use is at your own\ndiscretion, as there is a risk of losing some funds."})}),"\n",(0,a.jsxs)(t.p,{children:["At the end of each era on Polkadot and Kusama, using ",(0,a.jsx)(t.a,{href:"learn-phragmen",children:"NPoS"}),', a new set of validators\nmust be elected based on the nominator preferences. This is a computationally intensive process,\nhence the usage of the term "mining" for computing the solution. The validators use\n',(0,a.jsx)(t.a,{href:"https://docs.substrate.io/reference/how-to-guides/offchain-workers/",children:"off-chain workers"})," to compute\nthe result and submit a transaction to propose the set of winners. This can also be delegated to\nstand-alone programs, whose task is to mine the optimal solution. Staking miners compete with each\nother to produce election solutions which consist of a validator set, stake distribution across that\nset, and a score indicating how optimal the solution is. Staking miners run any given staking\nalgorithms (as of now, sequential Phragm\xe9n or PhragMMS, subject to change if improved algorithms are\nintroduced) to produce results, which are then sent as a transaction to the relay chain via a normal\nsigned extrinsic. The transaction requires a bond and a transaction fee. The best solution is\nrewarded, which the least covers the transaction fee, and the bond is returned to the account.\n",(0,a.jsx)(t.a,{href:"/docs/learn-staking-advanced#deposit-and-reward-mechanics",children:"The bond and the fee"})," are lost if the\nsolution is invalid."]}),"\n",(0,a.jsxs)(t.p,{children:["Staking miner uses a pallet called ",(0,a.jsx)(t.code,{children:"pallet_election_provider_multi_phase"})," and can only produce\nsolutions during the\n",(0,a.jsx)(t.a,{href:"https://crates.parity.io/pallet_election_provider_multi_phase/index.html#signed-phase",children:(0,a.jsx)(t.code,{children:"SignedPhase"})}),"\nof the pallet's life cycle. Once the ",(0,a.jsx)(t.code,{children:"SignedPhase"})," is over and the\n",(0,a.jsx)(t.a,{href:"https://crates.parity.io/pallet_election_provider_multi_phase/index.html#unsigned-phase",children:(0,a.jsx)(t.code,{children:"UnsignedPhase"})}),"\nstarts, only the off-chain workers can provide election results."]}),"\n",(0,a.jsx)(t.p,{children:"Running the staking miner requires passing the seed of a funded account in order to pay the fees for\nthe transactions that will be sent. The same account's balance is used to reserve deposits as well.\nThe best solution in each round is rewarded. All correct solutions will get their deposit back and\nthe ones that submit invalid solutions will lose their deposit."}),"\n",(0,a.jsx)(t.h3,{id:"npos-election-optimization",children:"NPoS election optimization"}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"NPoS election optimization",src:n(22630).A+"",width:"1868",height:"804"})}),"\n",(0,a.jsx)(t.p,{children:"A basic election solution is a simple distribution of stake across validators, but this can be\noptimized for better distribution equaling a higher security score. The staking miner does not act\nas a validator and focuses solely on the election result and optimization of the solution. It\nconnects to a specified chain and keeps listening to new signed phase of the election pallet in\norder to submit solutions to the NPoS election. When the correct time comes, it computes its\nsolution and submits it to the chain. The default miner algorithm is sequential Phragm\xe9n with a\nconfigurable number of balancing iterations that improve the score."}),"\n",(0,a.jsx)(t.h3,{id:"signed-phase-of-the-election-pallet",children:"Signed Phase of the election pallet"}),"\n",(0,a.jsxs)(t.p,{children:["The election provider pallet ",(0,a.jsx)(t.code,{children:"pallet_election_provider_multi_phase"})," is divided into two phases,\n",(0,a.jsx)(t.strong,{children:"signed"})," and ",(0,a.jsx)(t.strong,{children:"unsigned"}),". At the end of the pallet's timeline, the function ",(0,a.jsx)(t.code,{children:"elect()"})," is called."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"                                                                   elect()\n                +   <--T::SignedPhase--\x3e  +  <--T::UnsignedPhase--\x3e   +\n  +-------------------------------------------------------------------+\n   Phase::Off   +       Phase::Signed     +      Phase::Unsigned      +\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Solutions provided by the staking miner can only be submitted during the signed phase. Solutions are\nsubmitted and queued on the chain as a ",(0,a.jsx)(t.code,{children:"RawSolution"}),". Once submitted, a solution cannot be retracted\nby the originating account."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"RawSolution"})," struct definition:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"pub struct RawSolution<S> {\n    pub solution: S, // The solution itself\n    pub score: ElectionScore, // The claimed score of the solution.\n    pub round: u32, // The round at which this solution should be submitted.\n}\n"})}),"\n",(0,a.jsxs)(t.p,{children:["A maximum of\n",(0,a.jsx)(t.a,{href:"https://github.com/paritytech/polkadot-sdk/blob/f610ffc05876d4b98a14cee245b4cc27bd3c0c15/runtime/polkadot/src/lib.rs#L390",children:(0,a.jsx)(t.code,{children:"pallet::Config::SignedMaxSubmissions"})}),"\nwill be stored on-chain and they will be sorted based on score. Higher the score the more optimal\nthe election solution is. The\n",(0,a.jsx)(t.a,{href:"/docs/chain-state-values#staking-miner-max-submissions",children:(0,a.jsx)(t.code,{children:"SignedMaxSubmissions"})})," variable\ncan be modified through governance."]}),"\n",(0,a.jsx)(t.p,{children:"Upon arrival of a new solution:"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsx)(t.li,{children:"If the queue is not full, it is stored in the appropriate sorted index."}),"\n",(0,a.jsx)(t.li,{children:"If the queue is full but the submitted solution is better than one of the queued ones, the worse\nsolution is discarded, the deposit of the outgoing solution is returned, and the new solution is\nstored in the correct index."}),"\n",(0,a.jsx)(t.li,{children:"If the queue is full and the solution is not an improvement compared to any of the queued ones,\nit is instantly rejected and no deposit is reserved."}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:["Upon the end of the ",(0,a.jsx)(t.code,{children:"SignedPhase"}),", no more solutions can be submitted and the solutions in the queue\nwill be checked using\n",(0,a.jsx)(t.a,{href:"https://paritytech.github.io/substrate/master/pallet_election_provider_multi_phase/pallet/struct.Pallet.html#method.feasibility_check",children:(0,a.jsx)(t.code,{children:"Pallet::feasibility_check"})}),"\nwhich ensures the score is indeed correct, and marks them as valid or invalid. By checking each\nsolution in the queue, the queue will be reorganized by score. The highest valid score will be\nrewarded. Invalid solutions with higher score than the winning solution will be slashed. The rest of\nthe solutions will be discarded and their deposit will be returned. Once the staking miner with a\nwinning solution is ready to be rewarded the runtime will automatically execute\n",(0,a.jsx)(t.a,{href:"https://github.com/paritytech/substrate/blob/f2bc08a3071a91b71fec63cf2b22c707411cec0e/frame/election-provider-multi-phase/src/signed.rs#L453-L474",children:(0,a.jsx)(t.code,{children:"finalize_signed_phase_accept_solution"})}),"\nwhich reward account associated with the winning solution."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"Queue\n+-------------------------------+\n|Solution(score=20, valid=false)| +--\x3e  Slashed\n+-------------------------------+\n|Solution(score=15, valid=true )| +--\x3e  Rewarded, Saved\n+-------------------------------+\n|Solution(score=10, valid=true )| +--\x3e  Discarded\n+-------------------------------+\n|Solution(score=05, valid=false)| +--\x3e  Discarded\n+-------------------------------+\n|             None              |\n+-------------------------------+\n"})}),"\n",(0,a.jsx)(t.h3,{id:"deposit-and-reward-mechanics",children:"Deposit and reward mechanics"}),"\n",(0,a.jsxs)(t.p,{children:["The staking miners are required to pay a deposit to post their solutions. Deposit amount is the sum\nof ",(0,a.jsx)(t.code,{children:"SignedDepositBase"})," +",(0,a.jsx)(t.code,{children:"SignedDepositByte"})," + ",(0,a.jsx)(t.code,{children:"SignedDepositWeight"}),". All good solutions are subject\nto receiving a ",(0,a.jsx)(t.code,{children:"SignedRewardBase"}),". For more information about deposit values see the\n",(0,a.jsx)(t.a,{href:"/docs/chain-state-values#staking-miner-deposit",children:"Chain State Values page"}),"."]}),"\n",(0,a.jsx)(t.h3,{id:"further-resources",children:"Further Resources"}),"\n",(0,a.jsx)(t.p,{children:"If you want to run a staking miner on your validator, refer to the repository provided in the\nresources section below."}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://github.com/paritytech/staking-miner-v2",children:"Staking Miner repository"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://crates.parity.io/pallet_election_provider_multi_phase/index.html",children:"Election Pallet definition"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://github.com/paritytech/polkadot-sdk/blob/f610ffc05876d4b98a14cee245b4cc27bd3c0c15/runtime/polkadot/src/lib.rs#L389:L397",children:"Signed phase parameter configuration on Polkadot"})}),"\n"]})]})}function c(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},65394:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/bags-list-example-0-6836e3658c32484103ffcd06d6372427.png"},63259:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/bags-list-example-1-6aeffdb212b7af723f00e38b40780dcc.png"},84928:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/bags-list-example-2-aec08a8679a23e697f416374cbcdf735.png"},56105:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/bags-list-example-3-08c2b290f95e036e026f667fca527704.png"},22630:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/NPoS-election-optimization-3ef1b7bd0a99f64c4198511b4216989d.png"},60546:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/stash-vs-stash-and-staking-proxy-2104e1a23d5c29821cec15fb9b67eba5.png"},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>r});var i=n(96540);const a={},s=i.createContext(a);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);