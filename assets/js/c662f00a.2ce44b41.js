"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7887],{84768:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"learn/xcm/journey/learn-xcm-docs-journey-queries","title":"Queries","description":"Query Information from another Consensus System.","source":"@site/../docs/learn/xcm/journey/queries.md","sourceDirName":"learn/xcm/journey","slug":"/learn/xcm/journey-queries","permalink":"/docs/learn/xcm/journey-queries","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/learn/xcm/journey/queries.md","tags":[],"version":"current","lastUpdatedBy":"divdeploy","lastUpdatedAt":1712340071000,"frontMatter":{"id":"learn-xcm-docs-journey-queries","title":"Queries","sidebar_label":"Queries","description":"Query Information from another Consensus System.","keywords":["xcm","cross-consensus messaging","queries"],"slug":"../journey-queries"},"sidebar":"docs","previous":{"title":"Expectations","permalink":"/docs/learn/xcm/journey-expectations"},"next":{"title":"Version Subscription","permalink":"/docs/learn/xcm/journey-version"}}');var r=t(74848),i=t(28453);const o={id:"learn-xcm-docs-journey-queries",title:"Queries",sidebar_label:"Queries",description:"Query Information from another Consensus System.",keywords:["xcm","cross-consensus messaging","queries"],slug:"../journey-queries"},a="Queries",c={},l=[{value:"ReportHolding",id:"reportholding",level:2},{value:"Example",id:"example",level:3},{value:"QueryPallet",id:"querypallet",level:2},{value:"Example",id:"example-1",level:3},{value:"ReportError",id:"reporterror",level:2},{value:"Example",id:"example-2",level:3},{value:"ReportTransactStatus",id:"reporttransactstatus",level:2},{value:"Example",id:"example-3",level:3}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"queries",children:"Queries"})}),"\n",(0,r.jsx)(n.p,{children:"XCM contains query instructions that can be used to query information from another consensus system:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ReportHolding"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"QueryPallet"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ReportError"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ReportTransactStatus"})}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Each of these instructions is sent to the destination where we would like the information to be\nreported back to us. Each instruction has a ",(0,r.jsx)(n.code,{children:"QueryResponseInfo"})," struct as one of its inputs."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust,",metastring:"noplayground",children:"pub struct QueryResponseInfo {\n\tpub destination: MultiLocation,\n\t#[codec(compact)]\n\tpub query_id: QueryId,\n\tpub max_weight: Weight,\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"destination"})," tells the queried consensus system where to send the response to and the\n",(0,r.jsx)(n.code,{children:"query_id"})," field links the query and the query response together. The ",(0,r.jsx)(n.code,{children:"max_weight"})," field tells the\nqueried consensus system what the maximum weight is that the response instruction can take."]}),"\n",(0,r.jsxs)(n.p,{children:["When a query instruction is executed correctly, it sends a ",(0,r.jsx)(n.code,{children:"QueryResponse"})," instruction to the\nlocation defined in the previously described ",(0,r.jsx)(n.code,{children:"destination"})," field. The ",(0,r.jsx)(n.code,{children:"QueryResponse"})," looks like\nthis:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust",children:"QueryResponse {\n    #[codec(compact)]\n    query_id: QueryId,\n    response: Response,\n    max_weight: Weight,\n    querier: Option<MultiLocation>,\n}\n\n// Response Struct\npub enum Response {\n\t/// No response. Serves as a neutral default.\n\tNull,\n\t/// Some assets.\n\tAssets(MultiAssets),\n\t/// The outcome of an XCM instruction.\n\tExecutionResult(Option<(u32, Error)>),\n\t/// An XCM version.\n\tVersion(super::Version),\n\t/// The index, instance name, pallet name and version of some pallets.\n\tPalletsInfo(BoundedVec<PalletInfo, MaxPalletsInfo>),\n\t/// The status of a dispatch attempt using `Transact`.\n\tDispatchResult(MaybeErrorCode),\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"QueryResponse"})," has the same ",(0,r.jsx)(n.code,{children:"query_id"})," as the request to link the request and response and\ntakes over the ",(0,r.jsx)(n.code,{children:"max_weight"})," from the ",(0,r.jsx)(n.code,{children:"QueryResponseInfo"}),". It has the requested information in the\n",(0,r.jsx)(n.code,{children:"response"})," field. And it has the location of the querier relative to the queried location in the\nquerier field. The response can be sent back to the requester, or to another location, so the\nquerier field is important to determine where the requested information is needed."]}),"\n",(0,r.jsx)(n.p,{children:"Now we take a look at the query instructions."}),"\n",(0,r.jsx)(n.h2,{id:"reportholding",children:"ReportHolding"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust,",metastring:"noplayground",children:"ReportHolding { response_info: QueryResponseInfo, assets: MultiAssetFilter }\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"ReportHolding"})," instruction reports to the given destination the contents of the Holding\nRegister. The ",(0,r.jsx)(n.code,{children:"assets"})," field is a filter for the assets that should be reported back. The assets\nreported back will be, asset-wise, ",(0,r.jsx)(n.em,{children:"the lesser of this value and the holding register"}),". For example,\nif the holding register contains 10 units of some fungible asset and the ",(0,r.jsx)(n.code,{children:"assets"})," field specifies 15\nunits of the same asset, the result will return 10 units of that asset. Wild cards can be used to\ndescribe which assets in the holding register to report, but the response always contains assets and\nno wild cards."]}),"\n",(0,r.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,r.jsxs)(n.p,{children:["For the full example, check ",(0,r.jsx)(n.a,{href:"https://github.com/paritytech/xcm-docs/tree/main/examples",children:"here"}),".\nAssets are withdrawn from the account of parachain 1 on the relay chain and partly deposited in the\naccount of parachain 2. The remaining assets are reported back to parachain 1."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust,",metastring:"noplayground",children:"Xcm(vec![\n    WithdrawAsset((Here, AMOUNT).into()),\n    BuyExecution { fees: (Here, AMOUNT).into(), weight_limit: Unlimited },\n    DepositAsset { assets: Definite((Here, AMOUNT - 5).into()), beneficiary: Parachain(2).into() },\n    ReportHolding {\n        response_info: QueryResponseInfo {\n            destination: Parachain(1).into(),\n            query_id: QUERY_ID,\n            max_weight: Weight::from_all(0),\n        },\n        assets: All.into(),\n    },\n]);\n"})}),"\n",(0,r.jsx)(n.h2,{id:"querypallet",children:"QueryPallet"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"QueryPallet"})," instruction queries the existence of a particular pallet based on the module name\nspecified in the ",(0,r.jsx)(n.code,{children:"module_name"})," field."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust,",metastring:"noplayground",children:"QueryPallet { module_name: Vec<u8>, response_info: QueryResponseInfo }\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The destination responds with a vec of ",(0,r.jsx)(n.code,{children:"PalletInfo"}),"s if the pallet exists."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust",children:"pub struct PalletInfo {\n\t#[codec(compact)]\n\tindex: u32,\n\tname: BoundedVec<u8, MaxPalletNameLen>,\n\tmodule_name: BoundedVec<u8, MaxPalletNameLen>,\n\t#[codec(compact)]\n\tmajor: u32,\n\t#[codec(compact)]\n\tminor: u32,\n\t#[codec(compact)]\n\tpatch: u32,\n}\n"})}),"\n",(0,r.jsx)(n.h3,{id:"example-1",children:"Example"}),"\n",(0,r.jsxs)(n.p,{children:["For the full example, check ",(0,r.jsx)(n.a,{href:"https://github.com/paritytech/xcm-docs/tree/main/examples",children:"here"}),". It\nqueries for all instances of pallet_balances and sends the result back to parachain 1."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust,",metastring:"noplayground",children:'Xcm(vec![\n    QueryPallet {\n        module_name: "pallet_balances".into(),\n        response_info: QueryResponseInfo {\n            destination: Parachain(1).into(),\n            query_id: QUERY_ID,\n            max_weight: Weight::from_all(0),\n        },\n    }\n]);\n'})}),"\n",(0,r.jsx)(n.h2,{id:"reporterror",children:"ReportError"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"ReportError"})," instruction report the contents of the Error Register to the given destination.\nThis instruction is useful in combination with the ",(0,r.jsx)(n.code,{children:"SetErrorHandler"})," instruction. It then only\nreports an error if an error is thrown."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust",children:"ReportError(QueryResponseInfo)\n"})}),"\n",(0,r.jsx)(n.h3,{id:"example-2",children:"Example"}),"\n",(0,r.jsxs)(n.p,{children:["For the full example, check ",(0,r.jsx)(n.a,{href:"https://github.com/paritytech/xcm-docs/tree/main/examples",children:"here"}),". The\nmessage sets the error handler to report back any error that is thrown during execution of the\ninstructions using the ",(0,r.jsx)(n.code,{children:"ReportError"})," instruction."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust,",metastring:"noplayground",children:"Xcm(vec![\n    // Set the Error Handler to report back status of Error register.\n    SetErrorHandler(Xcm(vec![\n        ReportError(QueryResponseInfo {\n            destination: Parachain(1).into(),\n            query_id: QUERY_ID,\n            max_weight: Weight::from_all(0),\n        })\n    ])),\n    // If an instruction errors during further processing, the resulting error is reported back to Parachain(1).\n    // MORE INSTRUCTIONS\n]);\n"})}),"\n",(0,r.jsx)(n.h2,{id:"reporttransactstatus",children:"ReportTransactStatus"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"ReportTransactStatus"})," instruction report the value of the Transact Status Register to the\nspecified destination."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust",children:"ReportTransactStatus(QueryResponseInfo)\n"})}),"\n",(0,r.jsx)(n.h3,{id:"example-3",children:"Example"}),"\n",(0,r.jsxs)(n.p,{children:["For the full example, check ",(0,r.jsx)(n.a,{href:"https://github.com/paritytech/xcm-docs/tree/main/examples",children:"here"}),".\nDispatches a call on the consensus system receiving this Xcm and reports back the status of the\nTransact Status Register."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-rust",children:"Xcm(vec![\n    Transact {\n        origin_kind: OriginKind::SovereignAccount,\n        require_weight_at_most: Weight::from_parts(INITIAL_BALANCE as u64, 1024 * 1024),\n        call: remark.encode().into(),\n    },\n    ReportTransactStatus(QueryResponseInfo {\n        destination: Parachain(1).into(),\n        query_id: QUERY_ID,\n        max_weight: Weight::from_all(0),\n    }),\n]);\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var s=t(96540);const r={},i=s.createContext(r);function o(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);