"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3316],{85561:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"learn/xcm/reference/learn-xcm-docs-reference-glossary","title":"XCM Glossary","description":"XCM Glossary.","source":"@site/../docs/learn/xcm/reference/glossary.md","sourceDirName":"learn/xcm/reference","slug":"/learn/xcm/reference-glossary","permalink":"/docs/learn/xcm/reference-glossary","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/learn/xcm/reference/glossary.md","tags":[],"version":"current","lastUpdatedBy":"Radha","lastUpdatedAt":1721404843000,"frontMatter":{"id":"learn-xcm-docs-reference-glossary","title":"XCM Glossary","sidebar_label":"XCM Glossary","description":"XCM Glossary.","keywords":["xcm","cross-consensus messaging","reference","glossary"],"slug":"../reference-glossary"},"sidebar":"docs","previous":{"title":"All XCVM Registers","permalink":"/docs/learn/xcm/reference-xcvm-registers"},"next":{"title":"Comparisons","permalink":"/docs/learn-comparisons"}}');var t=n(74848),a=n(28453);const o={id:"learn-xcm-docs-reference-glossary",title:"XCM Glossary",sidebar_label:"XCM Glossary",description:"XCM Glossary.",keywords:["xcm","cross-consensus messaging","reference","glossary"],slug:"../reference-glossary"},i="Glossary",l={},c=[{value:"XCM (Cross-Consensus Messaging)",id:"xcm-cross-consensus-messaging",level:2},{value:"Instructions",id:"instructions",level:2},{value:"Consensus system",id:"consensus-system",level:2},{value:"MultiLocation",id:"multilocation",level:2},{value:"Junction",id:"junction",level:2},{value:"MultiAsset",id:"multiasset",level:2},{value:"Sovereign account",id:"sovereign-account",level:2},{value:"Teleport",id:"teleport",level:2},{value:"Reserve asset transfer",id:"reserve-asset-transfer",level:2},{value:"XCVM",id:"xcvm",level:2},{value:"Holding register",id:"holding-register",level:2},{value:"Barrier",id:"barrier",level:2},{value:"UMP (Upward Message Passing)",id:"ump-upward-message-passing",level:2},{value:"DMP (Downward Message Passing)",id:"dmp-downward-message-passing",level:2},{value:"XCMP (Cross-Consensus Message Passing)",id:"xcmp-cross-consensus-message-passing",level:2},{value:"HRMP (Horizontal Message Passing)",id:"hrmp-horizontal-message-passing",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"glossary",children:"Glossary"})}),"\n",(0,t.jsx)(s.h2,{id:"xcm-cross-consensus-messaging",children:"XCM (Cross-Consensus Messaging)"}),"\n",(0,t.jsx)(s.p,{children:"A messaging format meant to communicate intentions between consensus systems. XCM could also refer\nto a single message."}),"\n",(0,t.jsx)(s.h2,{id:"instructions",children:"Instructions"}),"\n",(0,t.jsx)(s.p,{children:"XCMs are composed of a sequence of instructions. Each instruction aims to convey a particular\nintention. There are instructions for transferring and locking assets, handling fees, calling\narbitrary blobs, and more."}),"\n",(0,t.jsx)(s.h2,{id:"consensus-system",children:"Consensus system"}),"\n",(0,t.jsx)(s.p,{children:"A system that can reach any kind of consensus. For example, relay chains, parachains, smart\ncontracts."}),"\n",(0,t.jsx)(s.h2,{id:"multilocation",children:"MultiLocation"}),"\n",(0,t.jsx)(s.p,{children:"A way of addressing consensus systems. These could be relative or absolute."}),"\n",(0,t.jsx)(s.h2,{id:"junction",children:"Junction"}),"\n",(0,t.jsxs)(s.p,{children:["The different ways of descending down a ",(0,t.jsx)(s.code,{children:"MultiLocation"})," hierarchy. A junction can be a Parachain, an\nAccount, or more."]}),"\n",(0,t.jsx)(s.h2,{id:"multiasset",children:"MultiAsset"}),"\n",(0,t.jsxs)(s.p,{children:["A way of identifying assets in the same or another consensus system, by using a ",(0,t.jsx)(s.code,{children:"MultiLocation"}),"."]}),"\n",(0,t.jsx)(s.h2,{id:"sovereign-account",children:"Sovereign account"}),"\n",(0,t.jsx)(s.p,{children:"An account on a consensus system that is controlled by an account in another consensus system."}),"\n",(0,t.jsx)(s.h2,{id:"teleport",children:"Teleport"}),"\n",(0,t.jsx)(s.p,{children:"A way of transferring assets between two consensus systems without the need of a third party. It\nconsists of the sender system burning the asset that wants to be sent over and the recipient minting\nan equivalent amount of that asset. It requires a lot of trust between the two systems, since\nfailure to mint or burn will reduce the total issuance of the token."}),"\n",(0,t.jsx)(s.h2,{id:"reserve-asset-transfer",children:"Reserve asset transfer"}),"\n",(0,t.jsx)(s.p,{children:"A way of transferring assets between two consensus systems that don't trust each other, by using a\nthird system they both trust, called the reserve. The real asset only exists on the reserve, both\nsender and recipient only deal with derivatives. It consists of the sender burning a certain amount\nof derivatives, telling the reserve to move real assets from its sovereign account to the\ndestination's sovereign account, and then telling the recipient to mint the right amount of\nderivatives."}),"\n",(0,t.jsx)(s.h2,{id:"xcvm",children:"XCVM"}),"\n",(0,t.jsx)(s.p,{children:"The virtual machine behind XCM. Every XCM is an XCVM programme. Holds state in registers."}),"\n",(0,t.jsx)(s.h2,{id:"holding-register",children:"Holding register"}),"\n",(0,t.jsxs)(s.p,{children:["An XCVM register used to hold arbitrary ",(0,t.jsx)(s.code,{children:"Asset"}),"s during the execution of an XCVM programme."]}),"\n",(0,t.jsx)(s.h2,{id:"barrier",children:"Barrier"}),"\n",(0,t.jsx)(s.p,{children:"An XCM executor configuration item that works as a firewall for incoming XCMs. All XCMs have to pass\nthe barrier to be executed, else they are dropped. It can be used for whitelisting only certain\ntypes or messages or messages from certain senders."}),"\n",(0,t.jsx)(s.h2,{id:"ump-upward-message-passing",children:"UMP (Upward Message Passing)"}),"\n",(0,t.jsx)(s.p,{children:"Transport-layer protocol that allows parachains to send messages upwards to their relay chain."}),"\n",(0,t.jsx)(s.h2,{id:"dmp-downward-message-passing",children:"DMP (Downward Message Passing)"}),"\n",(0,t.jsx)(s.p,{children:"Transport-layer protocol that allows the relay chain to send messages downwards to one of their\nparachains."}),"\n",(0,t.jsx)(s.h2,{id:"xcmp-cross-consensus-message-passing",children:"XCMP (Cross-Consensus Message Passing)"}),"\n",(0,t.jsx)(s.p,{children:"Transport-layer protocol that allows parachains to send messages between themselves, without going\nthrough the relay chain."}),"\n",(0,t.jsx)(s.h2,{id:"hrmp-horizontal-message-passing",children:"HRMP (Horizontal Message Passing)"}),"\n",(0,t.jsx)(s.p,{children:"Transport-layer protocol that allows a parachain to send messages to a sibling parachain going\nthrough the relay chain. It's a precursor to XCMP, also known as XCMP-lite. It uses a mixture of UMP\nand VMP."})]})}function h(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>i});var r=n(96540);const t={},a=r.createContext(t);function o(e){const s=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),r.createElement(a.Provider,{value:s},e.children)}}}]);