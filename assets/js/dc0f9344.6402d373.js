"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1058],{34578:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>d,toc:()=>u});const d=JSON.parse('{"id":"general/dune-analytics/parachain-dashboards/pendulum-dashboards","title":"Pendulum Dashboards","description":"Pendulum focuses on bridging fiat currencies and decentralized finance (DeFi).","source":"@site/../docs/general/dune-analytics/parachain-dashboards/pendulum-dashboards.md","sourceDirName":"general/dune-analytics/parachain-dashboards","slug":"/general/dune-analytics/pendulum-dashboards","permalink":"/docs/general/dune-analytics/pendulum-dashboards","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/general/dune-analytics/parachain-dashboards/pendulum-dashboards.md","tags":[],"version":"current","lastUpdatedBy":"MK","lastUpdatedAt":1719215716000,"frontMatter":{"id":"pendulum-dashboards","title":"Pendulum Dashboards","sidebar_label":"Pendulum","description":"Pendulum focuses on bridging fiat currencies and decentralized finance (DeFi).","keywords":["polkadot","dashboard","dune","pendulum","DeFi"],"slug":"../pendulum-dashboards"},"sidebar":"docs","previous":{"title":"People","permalink":"/docs/general/dune-analytics/people-dashboards"},"next":{"title":"Phala","permalink":"/docs/general/dune-analytics/phala-dashboards"}}');var s=a(74848),t=a(28453);const i={id:"pendulum-dashboards",title:"Pendulum Dashboards",sidebar_label:"Pendulum",description:"Pendulum focuses on bridging fiat currencies and decentralized finance (DeFi).",keywords:["polkadot","dashboard","dune","pendulum","DeFi"],slug:"../pendulum-dashboards"},r="Pendulum Dashboards",l={},u=[{value:"Overview",id:"overview",level:2},{value:"Featured Dashboards on Dune",id:"featured-dashboards-on-dune",level:2},{value:"Key Tables",id:"key-tables",level:2},{value:"Useful Queries",id:"useful-queries",level:2},{value:"Getting Started with Queries",id:"getting-started-with-queries",level:2}];function o(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"pendulum-dashboards",children:"Pendulum Dashboards"})}),"\n",(0,s.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,s.jsx)(n.p,{children:"Pendulum is a parachain on Polkadot that focuses on bridging fiat currencies and decentralized\nfinance (DeFi). It aims to create a fully functional fiat-optimized blockchain that facilitates open\nfinancial applications and connects them with the traditional financial sector."}),"\n",(0,s.jsx)(n.h2,{id:"featured-dashboards-on-dune",children:"Featured Dashboards on Dune"}),"\n",(0,s.jsx)(n.p,{children:"Here you will find a variety of dashboards that help visualize data from the Pendulum parachain:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://dune.com/substrate/pendulum",children:"Pendulum on Polkadot"}),": Explore comprehensive data\nvisualizations tracking the integration of fiat and DeFi on the Pendulum parachain."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Please also visit our dashboards for Pendulum on\n",(0,s.jsx)(n.a,{href:"https://dune.com/discover/content/relevant?q=title:Pendulum%20author:substrate",children:"Dune Analytics"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"key-tables",children:"Key Tables"}),"\n",(0,s.jsx)(n.p,{children:"Data from the Pendulum parachain is organized into several key tables:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"pendulum.balances"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"pendulum.blocks"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"pendulum.calls"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"pendulum.events"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"pendulum.extrinsics"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"pendulum.transfers"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Start building your own queries using granular data on Dune\n",(0,s.jsx)(n.a,{href:"https://dune.com/queries?category=canonical&namespace=pendulum",children:"here"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"useful-queries",children:"Useful Queries"}),"\n",(0,s.jsx)(n.p,{children:"Some useful queries for Pendulum are provided:"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Title"}),(0,s.jsx)(n.th,{children:"Query"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsx)(n.tbody,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"Pendulum Spacewalk Transactions"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"https://dune.com/queries/3821151",children:"query_3821151"})}),(0,s.jsx)(n.td,{children:"Find all Spacewalk transactions on the Pendulum parachain"})]})})]}),"\n",(0,s.jsx)(n.h2,{id:"getting-started-with-queries",children:"Getting Started with Queries"}),"\n",(0,s.jsx)(n.p,{children:"To get started with querying data from Unique, you are welcome to use the mentioned materialized\nqueries. You can use the following DuneSQL queries as examples:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",metastring:'title="Pendulum Spacewalk Transactions by Month" showLineNumbers',children:"SELECT\n  DATE_TRUNC('month', block_time) AS month,\n  SUM(amount) AS amount,\n  COUNT(*) AS count,\n  token_name\nFROM\n  query_3821151 -- Pendulum Spacewalk Transactions\nGROUP BY\n  DATE_TRUNC('month', block_time),\n  token_name;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Query result:"}),"\n",(0,s.jsx)("iframe",{src:"https://dune.com/embeds/3825144/6433755/1ae87539-28c8-4007-a429-5077df8b9adb",height:"350",width:"100%"}),"\n",(0,s.jsx)(n.admonition,{title:"DuneSQL Referece",type:"info",children:(0,s.jsxs)(n.p,{children:["For more information on DuneSQL, please refer to the ",(0,s.jsx)(n.a,{href:"/docs/general/dunesql-cheatsheet",children:"DuneSQL Cheatsheet"}),"\nand\n",(0,s.jsx)(n.a,{href:"https://docs.dune.com/query-engine/Functions-and-operators/index",children:"DuneSQL Official Documentation"}),"."]})})]})}function c(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},28453:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>r});var d=a(96540);const s={},t=d.createContext(s);function i(e){const n=d.useContext(t);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),d.createElement(t.Provider,{value:n},e.children)}}}]);