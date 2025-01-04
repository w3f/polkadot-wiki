"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[782],{79411:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"maintain/maintain-guides-secure-validator","title":"Secure Validator","description":"Tips for running a secure validator.","source":"@site/../docs/maintain/maintain-guides-secure-validator.md","sourceDirName":"maintain","slug":"/maintain-guides-secure-validator","permalink":"/docs/maintain-guides-secure-validator","draft":false,"unlisted":false,"editUrl":"https://github.com/w3f/polkadot-wiki/edit/master/docs/maintain/maintain-guides-secure-validator.md","tags":[],"version":"current","lastUpdatedBy":"Filippo","lastUpdatedAt":1718028821000,"frontMatter":{"id":"maintain-guides-secure-validator","title":"Secure Validator","sidebar_label":"Secure Validator","description":"Tips for running a secure validator.","keywords":["secure validator","validator","configuration"],"slug":"../maintain-guides-secure-validator"},"sidebar":"docs","previous":{"title":"Using systemd for a Validator Node","permalink":"/docs/maintain-guides-how-to-systemd"},"next":{"title":"How to Upgrade Your Validator","permalink":"/docs/maintain-guides-how-to-upgrade"}}');var t=i(74848),a=i(28453);const r={id:"maintain-guides-secure-validator",title:"Secure Validator",sidebar_label:"Secure Validator",description:"Tips for running a secure validator.",keywords:["secure validator","validator","configuration"],slug:"../maintain-guides-secure-validator"},o=void 0,l={},d=[{value:"High Availability",id:"high-availability",level:2},{value:"Key Management",id:"key-management",level:2},{value:"Signing Outside the Client",id:"signing-outside-the-client",level:3},{value:"Secure-Validator Mode",id:"secure-validator-mode",level:3},{value:"Requirements",id:"requirements",level:4},{value:"Monitoring Tools",id:"monitoring-tools",level:2},{value:"Linux Best Practices",id:"linux-best-practices",level:2},{value:"Conclusions",id:"conclusions",level:2},{value:"Validators",id:"validators",level:3},{value:"Monitoring",id:"monitoring",level:3},{value:"Resources",id:"resources",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"Validators in a Proof of Stake network are responsible for keeping the network in consensus and\nverifying state transitions. As the number of validators is limited, validators in the set have the\nresponsibility to be online and faithfully execute their tasks."}),"\n",(0,t.jsx)(n.p,{children:"This primarily means that validators:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Must be high availability."}),"\n",(0,t.jsxs)(n.li,{children:["Must have infrastructure that protects the validator's signing keys so that an attacker cannot\ntake control and commit ",(0,t.jsx)(n.a,{href:"/docs/learn-offenses",children:"slashable behavior"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"high-availability",children:"High Availability"}),"\n",(0,t.jsxs)(n.p,{children:["High availability set-ups that involve redundant validator nodes may seem attractive at first.\nHowever, they can be ",(0,t.jsx)(n.strong,{children:"very dangerous"})," if they are not set up perfectly. The reason for this is\nthat the session keys used by a validator should always be isolated to just a single node.\nReplicating session keys across multiple nodes could lead to equivocation\n",(0,t.jsx)(n.a,{href:"/docs/learn-offenses",children:"slashes"})," or parachain validity slashes which can make you lose ",(0,t.jsx)(n.strong,{children:"100%\nof your staked funds"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["The good news is that 100% uptime of your validator is not really needed, as it has some buffer\nwithin eras in order to go offline for a little while and upgrade. For this reason, we advise that\nyou only attempt a high availability set-up if ",(0,t.jsx)(n.strong,{children:"you're confident you know exactly what you're\ndoing."})]}),"\n",(0,t.jsx)(n.p,{children:"Many expert validators have made mistakes in the past due to the handling of session keys."}),"\n",(0,t.jsx)(n.h2,{id:"key-management",children:"Key Management"}),"\n",(0,t.jsxs)(n.p,{children:["See the ",(0,t.jsx)(n.a,{href:"/docs/learn-cryptography",children:"Polkadot Keys guide"})," for more information on keys. The keys\nthat are of primary concern for validator infrastructure are the Session keys. These keys sign\nmessages related to consensus and parachains. Although Session keys are ",(0,t.jsx)(n.em,{children:"not"})," account keys and\ntherefore cannot transfer funds, an attacker could use them to commit slashable behavior."]}),"\n",(0,t.jsxs)(n.p,{children:["Session keys are generated inside the node via RPC call. See the\n",(0,t.jsx)(n.a,{href:"/docs/maintain-guides-how-to-validate-polkadot#set-session-keys",children:"How to Validate guide"})," for\ninstructions on setting Session keys. These should be generated and kept within your client. When\nyou generate new Session keys, you must submit an extrinsic (a Session certificate) from your\nstaking proxy key telling the chain your new Session keys."]}),"\n",(0,t.jsx)(n.admonition,{title:"Generating session keys",type:"info",children:(0,t.jsx)(n.p,{children:"Session keys can also be generated outside the client and inserted into the client's keystore via\nRPC. For most users, we recommend using the key generation functionality within the client."})}),"\n",(0,t.jsx)(n.h3,{id:"signing-outside-the-client",children:"Signing Outside the Client"}),"\n",(0,t.jsx)(n.p,{children:"In the future, Polkadot will support signing payloads outside the client so that keys can be stored\non another device, e.g. a hardware security module (HSM) or secure enclave. For the time being,\nhowever, Session key signatures are performed within the client."}),"\n",(0,t.jsx)(n.admonition,{title:"HSMs are not a panacea",type:"info",children:(0,t.jsx)(n.p,{children:"They do not incorporate any logic and will just sign and return whatever payload they receive.\nTherefore, an attacker who gains access to your validator node could still commit slashable\nbehavior."})}),"\n",(0,t.jsx)(n.h3,{id:"secure-validator-mode",children:"Secure-Validator Mode"}),"\n",(0,t.jsx)(n.p,{children:"Parity Polkadot has a Secure-Validator Mode, enabling several protections for keeping keys secure.\nThe protections include highly strict filesystem, networking, and process sandboxing on top of the\nexisting wasmtime sandbox."}),"\n",(0,t.jsxs)(n.p,{children:["This mode is ",(0,t.jsx)(n.strong,{children:"activated by default"})," if the machine meets the following requirements. If not, there\nis an error message with instructions on disabling Secure-Validator Mode, though this is not\nrecommended due to the security risks involved."]}),"\n",(0,t.jsx)(n.h4,{id:"requirements",children:"Requirements"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Linux on x86-64 family"})," (usually Intel or AMD)."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"seccomp enabled"}),". You can check that this is the case by running the following command:"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"cat /boot/config-`uname -r` | grep CONFIG_SECCOMP=\n"})}),"\n",(0,t.jsx)(n.p,{children:"The expected output, if enabled, is:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"CONFIG_SECCOMP=y\n"})}),"\n",(0,t.jsxs)(n.ol,{start:"3",children:["\n",(0,t.jsxs)(n.li,{children:["OPTIONAL: ",(0,t.jsx)(n.strong,{children:"Linux 5.13"}),". Provides access to even more strict filesystem protections."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"monitoring-tools",children:"Monitoring Tools"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://github.com/paritytech/substrate-telemetry",children:"Telemetry"})," This tracks your node details\nincluding the version you are running, block height, CPU & memory usage, block propagation time,\netc."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://prometheus.io/",children:"Prometheus"}),"-based monitoring stack, including\n",(0,t.jsx)(n.a,{href:"https://grafana.com",children:"Grafana"})," for dashboards and log aggregation. It includes alerting, querying,\nvisualization, and monitoring features and works for both cloud and on-premise systems. The data\nfrom ",(0,t.jsx)(n.code,{children:"substrate-telemetry"})," can be made available to Prometheus through exporters like\n",(0,t.jsx)(n.a,{href:"https://github.com/w3f/substrate-telemetry-exporter",children:"this"}),"."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"linux-best-practices",children:"Linux Best Practices"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Never use the root user."}),"\n",(0,t.jsx)(n.li,{children:"Always update the security patches for your OS."}),"\n",(0,t.jsx)(n.li,{children:"Enable and set up a firewall."}),"\n",(0,t.jsx)(n.li,{children:"Never allow password-based SSH, only use key-based access."}),"\n",(0,t.jsxs)(n.li,{children:["Disable non-essential SSH subsystems (banner, motd, scp, X11 forwarding) and harden your SSH\nconfiguration\n(",(0,t.jsx)(n.a,{href:"https://stribika.github.io/2015/01/04/secure-secure-shell.html",children:"reasonable guide to begin with"}),")."]}),"\n",(0,t.jsx)(n.li,{children:"Back up your storage regularly."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"conclusions",children:"Conclusions"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"At the moment, Polkadot/Substrate can't interact with HSM/SGX, so we need to provide the signing\nkey seeds to the validator machine. This key is kept in memory for signing operations and\npersisted to disk (encrypted with a password)."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Given that HA setups would always be at risk of double-signing and there's currently no built-in\nmechanism to prevent it, we propose having a single instance of the validator to avoid slashing."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"validators",children:"Validators"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Validators should only run the Polkadot binary, and they should not listen on any port other than\nthe configured p2p port."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Validators should run on bare-metal machines, as opposed to VMs. This will prevent some of the\navailability issues with cloud providers, along with potential attacks from other VMs on the same\nhardware. The provisioning of the validator machine should be automated and defined in code. This\ncode should be kept in private version control, reviewed, audited, and tested."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Session keys should be generated and provided in a secure way."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Polkadot should be started at boot and restarted if stopped for any reason (supervisor process)."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Polkadot should run as a non-root user."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"monitoring",children:"Monitoring"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"There should be an on-call rotation for managing the alerts."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"There should be a clear protocol with actions to perform for each level of each alert and an\nescalation policy."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://medium.com/figment-networks/full-disclosure-figments-cosmos-validator-infrastructure-3bc707283967",children:"Figment Network's Full Disclosure of Cosmos Validator Infrastructure"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://kb.certus.one/",children:"Certus One's Knowledge Base"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/slowmist/eos-bp-nodes-security-checklist",children:"EOS Block Producer Security List"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://medium.com/loom-network/hsm-policies-and-the-importance-of-validator-security-ec8a4cc1b6f",children:"HSM Policies and the Important of Validator Security"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>o});var s=i(96540);const t={},a=s.createContext(t);function r(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);