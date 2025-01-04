"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4293],{13699:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"learn/learn-guides-accounts-proxy-pure","title":"Polkadot-JS Guides about Pure Proxy Accounts","description":"Polkadot-JS Guides about Pure Proxy Accounts","source":"@site/../docs/learn/learn-guides-accounts-proxy-pure.md","sourceDirName":"learn","slug":"/learn-guides-accounts-proxy-pure","permalink":"/docs/learn-guides-accounts-proxy-pure","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/learn/learn-guides-accounts-proxy-pure.md","tags":[],"version":"current","lastUpdatedBy":"Filippo","lastUpdatedAt":1731067872000,"frontMatter":{"id":"learn-guides-accounts-proxy-pure","title":"Polkadot-JS Guides about Pure Proxy Accounts","sidebar_label":"Pure Proxy Guides","description":"Polkadot-JS Guides about Pure Proxy Accounts","keyword":["guides","polkadot-js","accounts","proxy","pure proxy","anonymous proxy"],"slug":"../learn-guides-accounts-proxy-pure"},"sidebar":"docs","previous":{"title":"Proxy Guides","permalink":"/docs/learn-guides-accounts-proxy"},"next":{"title":"Transfer Guides","permalink":"/docs/learn-guides-transfers"}}');var o=n(74848),s=n(28453),r=n(67141);const a={id:"learn-guides-accounts-proxy-pure",title:"Polkadot-JS Guides about Pure Proxy Accounts",sidebar_label:"Pure Proxy Guides",description:"Polkadot-JS Guides about Pure Proxy Accounts",keyword:["guides","polkadot-js","accounts","proxy","pure proxy","anonymous proxy"],slug:"../learn-guides-accounts-proxy-pure"},l=void 0,h={},c=[{value:"Create and Remove Pure Proxies with Polkadot-JS",id:"create-and-remove-pure-proxies-with-polkadot-js",level:2},{value:"Advanced Account Management with Pure Proxies",id:"advanced-account-management-with-pure-proxies",level:2},{value:"Pure Proxies and Multisigs",id:"pure-proxies-and-multisigs",level:2},{value:"Scenario One: One Pure Proxy within a Multisig",id:"scenario-one-one-pure-proxy-within-a-multisig",level:3},{value:"Scenario Two: Multisig made of Pure Proxies",id:"scenario-two-multisig-made-of-pure-proxies",level:3},{value:"Scenario Three: Multisig controlling a Pure Proxy",id:"scenario-three-multisig-controlling-a-pure-proxy",level:3}];function d(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.A,{message:"Polkadot-JS is for developers and power users only. If you need help using the Polkadot-JS UI, you can contact the\n[Polkadot Support Team](https://support.polkadot.network/support/home). For more user-friendly tools\nsee the [wallets](./wallets-index), [apps](./apps-index) and [dashboard](./dashboards-index) pages."}),"\n",(0,o.jsxs)(t.admonition,{title:"The Account Tab in the Polkadot-JS UI cannot handle complex proxy setups",type:"caution",children:[(0,o.jsxs)(t.p,{children:["The Accounts Tab in the Polkadot-JS UI cannot handle complex proxy setups (e.g. a proxy -> multisig\n-> a pure proxy which is part of another multisig). These complex setups must be done using the\n",(0,o.jsx)(t.a,{href:"https://polkadot.js.org/apps/#/extrinsics",children:"Extrinsics Tab"})," directly."]}),(0,o.jsxs)(t.p,{children:[(0,o.jsxs)(t.strong,{children:["We recommend to use the ",(0,o.jsx)(t.a,{href:"/docs/learn-DOT#getting-tokens-on-the-westend-testnet",children:"Westend Testnet"})," if\nyou are testing features for the first time."]})," By performing the complex proxy setups on the\ntestnet, you can comfortably replicate the procedure on the main networks."]})]}),"\n",(0,o.jsx)(t.admonition,{title:"Risk of loss of funds",type:"danger",children:(0,o.jsx)(t.p,{children:"Read carefully the text below and before performing any action using pure proxies, experiment on the\nWestend testnet."})}),"\n",(0,o.jsx)(t.h2,{id:"create-and-remove-pure-proxies-with-polkadot-js",children:"Create and Remove Pure Proxies with Polkadot-JS"}),"\n",(0,o.jsxs)(t.p,{children:["To create a ",(0,o.jsx)(t.strong,{children:"pure proxy"})," see\n",(0,o.jsx)(t.a,{href:"https://support.polkadot.network/support/solutions/articles/65000182196",children:"this support article"}),", or\nwatch ",(0,o.jsx)(t.a,{href:"https://www.youtube.com/watch?v=T443RcCYP24",children:"this technical explainer video"}),"."]}),"\n",(0,o.jsx)(t.admonition,{title:"Removing Pure Proxies",type:"caution",children:(0,o.jsxs)(t.p,{children:["The procedure for removing a ",(0,o.jsx)(t.em,{children:"pure"}),' proxy is different from the one used to remove other proxies.\nVisit the section "Removing an Anonymous Proxy" on\n',(0,o.jsx)(t.a,{href:"https://support.polkadot.network/support/solutions/articles/65000182196",children:"this support article"}),", or\nwatch ",(0,o.jsx)(t.a,{href:"https://www.youtube.com/watch?v=T443RcCYP24",children:"this technical explainer video"}),"."]})}),"\n",(0,o.jsxs)(t.p,{children:["Learn more about pure proxies from our\n",(0,o.jsx)(t.a,{href:"https://www.youtube.com/watch?v=YkYApbhU3i0",children:"technical explainer video"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"advanced-account-management-with-pure-proxies",children:"Advanced Account Management with Pure Proxies"}),"\n",(0,o.jsx)(t.admonition,{title:"Walk-through tutorial video of Account Management",type:"info",children:(0,o.jsxs)(t.p,{children:["You can see ",(0,o.jsx)(t.a,{href:"https://www.youtube.com/watch?v=YkYApbhU3i0",children:"this video tutorial"})," that goes through the\nexample below. The tutorial requires some familiarity with the Extrinsic Tab of the Polkadot-JS UI."]})}),"\n",(0,o.jsx)(t.p,{children:"Let's take for example 3 accounts belonging to Charlie, Dan and Eleanor working for Company X.\nCharlie holds funds belonging to Company X, but he wants to leave the company and transfer the\neconomic responsibility to Eleanor. Dan is a staking proxy of Charlie."}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsxs)(t.strong,{children:["Without ",(0,o.jsx)(t.em,{children:"Pure"})," Proxy"]}),", Charlie must (see ",(0,o.jsx)(t.em,{children:"left"})," side of the Figure below):"]}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"Remove Dan as a staking proxy, this step requires 1 signature"}),"\n",(0,o.jsx)(t.li,{children:"Stop nominating and unbound all funds , this step requires 2 signatures"}),"\n",(0,o.jsx)(t.li,{children:"Transfer the funds to Eleanor, this step requires 1 signature"}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"Then Eleanor adds Dan as a staking proxy (1 signature). The whole process requires 5 signatures.\nHere we are presenting a simple example, in fact, with multi-signature accounts and multiple proxies\nthe procedure would be more time-consuming and labor-intensive."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"why anonymous proxies",src:n(79022).A+"",width:"1920",height:"800"})}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsxs)(t.strong,{children:["With ",(0,o.jsx)(t.em,{children:"Pure"})," Proxy"]})," (see ",(0,o.jsx)(t.em,{children:"right"})," side of the Figure above), Charlie must add Eleanor as ",(0,o.jsx)(t.em,{children:"any"}),"\nproxy of the ",(0,o.jsx)(t.em,{children:"pure"})," proxy, and remove himself (or Eleanor can remove him). The process requires just\n2 signatures (1 signature to add the new ",(0,o.jsx)(t.em,{children:"any"})," proxy and 1 signature the remove the old one). The\nfunds remain in the ",(0,o.jsx)(t.em,{children:"pure"})," proxy, and it is not necessary to stop nominating or unbond funds. Also,\nany proxy relationships with the ",(0,o.jsx)(t.em,{children:"pure"})," proxy stay in place. Thus, if we use the ",(0,o.jsx)(t.em,{children:"pure"})," proxy, with\nan increasing number of proxies we will always have to sign twice (not necessarily true in\nmulti-signature accounts). While if we are not using the ",(0,o.jsx)(t.em,{children:"pure"})," proxy, the more the proxies the more\nsignatures we need to detach them from the old stash and attach them to the new stash (see Figure\nbelow)."]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"anon vs stash plot",src:n(47862).A+"",width:"1920",height:"800"})}),"\n",(0,o.jsx)(t.h2,{id:"pure-proxies-and-multisigs",children:"Pure Proxies and Multisigs"}),"\n",(0,o.jsx)(t.h3,{id:"scenario-one-one-pure-proxy-within-a-multisig",children:"Scenario One: One Pure Proxy within a Multisig"}),"\n",(0,o.jsx)(t.admonition,{title:"Walk-through tutorial video",type:"info",children:(0,o.jsxs)(t.p,{children:["You can see ",(0,o.jsx)(t.a,{href:"https://www.youtube.com/watch?v=iGRoGstB_pQ",children:"this video tutorial"})," that goes through\nthis scenario. The tutorial requires some familiarity with the Extrinsic Tab of the Polkadot-JS UI."]})}),"\n",(0,o.jsxs)(t.p,{children:["It is possible to put a ",(0,o.jsx)(t.em,{children:"pure"})," proxy within a multisig, and then transactions will be signed by the\n",(0,o.jsx)(t.em,{children:"any"})," proxy on behalf of the ",(0,o.jsx)(t.em,{children:"pure"})," proxy (proxied account). Let's take for example the diagram\nbelow. Alice, Bob and Anon are part of the multisig ABC, a multisig account with threshold 2. P-C is\na ",(0,o.jsx)(t.em,{children:"pure"})," proxy spawned by Charlie, who now acts as ",(0,o.jsx)(t.em,{children:"any"})," proxy and thus signs anything on behalf of\nP-C. The ",(0,o.jsx)(t.em,{children:"pure"})," proxy cannot sign directly because it does not have a private key. So, for example,\nto send funds from the multisig to Dan, Charly needs to submit a ",(0,o.jsx)(t.code,{children:"proxy.proxy"})," extrinsic to P-C,\nwhich in turn will submit a ",(0,o.jsx)(t.code,{children:"multisig.asMulti"})," extrinsic to ABC containing the call data for the\n",(0,o.jsx)(t.code,{children:"balances.transferKeepAlive"})," extrinsic about the transfer of some funds from ABC to Dan. Alice can\nthen approve the transfer by submitting a ",(0,o.jsx)(t.code,{children:"multisig.asMulti"})," extrinsic also containing the call data\nfor the ",(0,o.jsx)(t.code,{children:"balances.transferKeepAlive"})," extrinsic about the transfer of some funds from ABC to Dan."]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"multisig with one anon",src:n(87091).A+"",width:"1920",height:"800"})}),"\n",(0,o.jsxs)(t.p,{children:["If Charly wants to leave the multisig, a new ",(0,o.jsx)(t.em,{children:"any"})," proxy can be added to P-C and Charly can be\nremoved (by himself or by the new ",(0,o.jsx)(t.em,{children:"any"})," proxy). Note that the multisig also contains Bob that in\nthis specific example does not do anything."]}),"\n",(0,o.jsx)(t.admonition,{title:"Proxy calls",type:"note",children:(0,o.jsxs)(t.p,{children:["To use a ",(0,o.jsx)(t.em,{children:"pure"})," proxy within a multisig you need to use the Extrinsic Tab and generate a\n",(0,o.jsx)(t.code,{children:"proxy.proxy"})," extrinsic. If you try to sign a multisig transaction using the ",(0,o.jsx)(t.em,{children:"pure"})," proxy you will\nbe prompted with a warning. Remember, you cannot sign something directly if you do not have a\nprivate key."]})}),"\n",(0,o.jsx)(t.h3,{id:"scenario-two-multisig-made-of-pure-proxies",children:"Scenario Two: Multisig made of Pure Proxies"}),"\n",(0,o.jsx)(t.admonition,{title:"Walk-through Tutorial Video",type:"info",children:(0,o.jsxs)(t.p,{children:["You can see ",(0,o.jsx)(t.a,{href:"https://www.youtube.com/watch?v=F82C3zDNJyk",children:"this video tutorial"})," that goes through\nthis scenario. The tutorial requires some familiarity with the Extrinsic Tab of the Polkadot-JS UI."]})}),"\n",(0,o.jsxs)(t.p,{children:["The diagram below shows a multisig that is made only with ",(0,o.jsx)(t.em,{children:"pure"})," proxies (P-A, P-B and P-C). In this\nsituation Alice, Bob or Charly can leave the multisig at any time without the requirement of\ncreating a new multisig. If for example, Bob leaves the multisig the procedure will require somebody\nelse to be added as ",(0,o.jsx)(t.em,{children:"any"})," proxy to P-B, and then Bob can remove himself (or the new ",(0,o.jsx)(t.em,{children:"any"})," proxy can\nremove Bob)."]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"multisig with anons",src:n(79947).A+"",width:"1920",height:"800"})}),"\n",(0,o.jsxs)(t.p,{children:["In the diagram above, Alice submits the ",(0,o.jsx)(t.code,{children:"proxy.proxy"})," extrinsic to P-A, which in turn submits the\n",(0,o.jsx)(t.code,{children:"multisig.asMulti"})," extrinsic containing the ",(0,o.jsx)(t.code,{children:"balances.transferKeepAlive"})," extrinsic about the\ntransfer of some tokens from ABC to Dan. Then, Charly does the same to confirm the transaction. Note\nthat Charly will need to pay for some weight, for the computation that is necessary to execute the\ntransaction."]}),"\n",(0,o.jsx)(t.h3,{id:"scenario-three-multisig-controlling-a-pure-proxy",children:"Scenario Three: Multisig controlling a Pure Proxy"}),"\n",(0,o.jsxs)(t.p,{children:["This setup is used by the ",(0,o.jsx)(t.a,{href:"/docs/multisig-apps#multix",children:"MultiX"})," tool."]}),"\n",(0,o.jsxs)(t.p,{children:["After its creation, a multi-signature account creates a pure proxy that becomes the proxied account.\nThe multi-signature account behaves as ",(0,o.jsx)(t.em,{children:"any"})," proxy of the pure. If signatories of the\nmulti-signature account change, a new multisig can be created, assigned as ",(0,o.jsx)(t.em,{children:"any"})," proxy of the pure,\nand then the old multisig can be removed as a proxy."]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"multisig with pure",src:n(4782).A+"",width:"1920",height:"800"})}),"\n",(0,o.jsxs)(t.p,{children:["Compared to ",(0,o.jsx)(t.a,{href:"#scenario-two-multisig-made-of-pure-proxies",children:"Scenario Two"}),", signatories do not need to\ncreate pure proxies here. Multisig controlling a Pure Proxy is a more practical solution, where the\nsignatories, number of signatories and/or the threshold can be changed, which changes the multisig\naddress but does not impact the pure proxy address. In Scenario Two, if signatories behind the pure\nproxies change, the address of the multisig stays the same. However, changing the number of\nsignatories and threshold would not be possible."]})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},67141:(e,t,n)=>{n.d(t,{A:()=>s});var i=n(96540),o=n(74848);const s=function(e){var t,n=e.message,s=(0,i.useState)(!0),r=s[0],a=s[1];return(0,o.jsx)(o.Fragment,{children:r&&(0,o.jsxs)("div",{className:"message-box",children:[(0,o.jsx)("button",{className:"close-button",onClick:function(){a(!1)},children:"\u2716 "}),(0,o.jsx)("div",{className:"message-content",dangerouslySetInnerHTML:{__html:(t=n,t.replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2">$1</a>'))}})]})})}},47862:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/anon-vs-stash-plot-fa8f730710dbf5cbec2d7db43d5d962d.png"},79947:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/multisig-with-anons-209a0f481e6a13ed943a952be07e1a75.png"},87091:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/multisig-with-one-anon-b8bb0a5183fbdc1d1809d4cd58489ab4.png"},4782:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/multisig-with-pure-684efe47eba1ab52cd41218daf674357.png"},79022:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/why-anon-proxy-48fc32ddd2da9a5e9342554c68372d98.png"},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>a});var i=n(96540);const o={},s=i.createContext(o);function r(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);