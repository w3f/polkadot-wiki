"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6195],{85671:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"learn/xcm/overview/learn-xcm-docs-overview-intro","title":"Introduction","description":"An Introduction to XCM.","source":"@site/../docs/learn/xcm/overview/intro.md","sourceDirName":"learn/xcm/overview","slug":"/learn/xcm/overview-intro","permalink":"/docs/learn/xcm/overview-intro","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/learn/xcm/overview/intro.md","tags":[],"version":"current","lastUpdatedBy":"Radha","lastUpdatedAt":1694074887000,"frontMatter":{"id":"learn-xcm-docs-overview-intro","title":"Introduction","sidebar_label":"Introduction","description":"An Introduction to XCM.","keywords":["xcm","cross-consensus messaging"],"slug":"../overview-intro"},"sidebar":"docs","previous":{"title":"Summary","permalink":"/docs/learn/xcm/overview-summary"},"next":{"title":"A Format, not a Protocol","permalink":"/docs/learn/xcm/overview-format"}}');var o=t(74848),r=t(28453);const i={id:"learn-xcm-docs-overview-intro",title:"Introduction",sidebar_label:"Introduction",description:"An Introduction to XCM.",keywords:["xcm","cross-consensus messaging"],slug:"../overview-intro"},a="Introduction",c={},l=[];function d(e){const n={a:"a",h1:"h1",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"introduction",children:"Introduction"})}),"\n",(0,o.jsxs)(n.p,{children:["XCM is a ",(0,o.jsx)(n.strong,{children:"language"})," for communicating ",(0,o.jsx)(n.strong,{children:"intentions"})," between ",(0,o.jsx)(n.strong,{children:"consensus systems"}),". Concretely,\nXCM is a message format, it specifies how to craft messages that communicate intentions to other\nconsensus systems. Some examples of consensus systems are blockchains and smart contracts. XCM comes\nfrom the ",(0,o.jsx)(n.a,{href:"https://polkadot.network/",children:"Polkadot"})," ecosystem, but is designed to be general enough to\nprovide a common format for cross-consensus communication that can be used anywhere."]}),"\n",(0,o.jsx)(n.p,{children:"Its goal is to let blockchain ecosystems thrive via specialization instead of generalization. If\nthere's no interoperability, a chain is forced to host all services and support all functionalities\non its own. With XCM, we are able to achieve an ecosystem-wide division of labour: a chain can\nspecialize and focus on its own business logic, and leverage the benefits of depending on other\nspecialized blockchain for services that it does not provide."}),"\n",(0,o.jsx)(n.p,{children:"XCM makes the following assumptions regarding the underlying environment:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Asynchronous: XCMs in no way assume that the sender will be blocking on its completion."}),"\n",(0,o.jsx)(n.li,{children:"Absolute: XCMs are assumed to be delivered and interpreted accurately, in order and in a timely\nfashion. Once a message is sent, one can assume that it will be processed as intended. This\nguarantee has to be provided by the transport layer."}),"\n",(0,o.jsx)(n.li,{children:"Asymmetric: XCMs, by default, do not have results that let the sender know that the message was\nexecuted correctly. If results are needed, a new message must be sent."}),"\n",(0,o.jsx)(n.li,{children:"Agnostic: XCM makes no assumptions about the nature of the consensus systems between which the\nmessages are being passed. XCM should be usable in any system that derives finality through\nconsensus."}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["XCM is constantly evolving; the format is expected to change over time. It has an RFC process to\npropose changes, which end up in newer versions, the current one being v3. To keep up with the\ndevelopment of the format, or to propose changes, go to\n",(0,o.jsx)(n.a,{href:"https://github.com/paritytech/xcm-format",children:"the XCM format repository"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>a});var s=t(96540);const o={},r=s.createContext(o);function i(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);