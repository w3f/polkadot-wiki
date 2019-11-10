---
id: glossary
title: Glossary
sidebar_label: Glossary
---

## Alexander

Testnet ตัวล่าสุดของ Polkadot

## บล็อก (Block)

สิ่งที่รวบรวมข้อมูลเช่นธุรกรรมที่บ่งบอกถึงการเปลี่ยนสถานะของบล็อกเชน

## เครื่องมือสำรวจบล็อก (Block Explorer)

แอปพลิเคชั่นที่ช่วยให้ผู้ใช้สำรวจข้อมูลของบล็อกต่าง ๆ บนบล็อกเชน

## BLS

ลายเซ็นดิจิตอล Boneh-Lynn-Shacham (BLS) มีการเซ็นที่ช้า การยืนยันที่ใช้เวลานาน ใช้ pairing-friendly curves ที่ช้าและปลอดภัยน้อยกว่า curve อื่นๆ และมีแนวโน้มที่จะอ่อนต่อการป้องกันอันตราย อย่างไรก็ตาม BLS มีตัวเลือก signature aggregation หลากหลายมากกว่า scheme ลายเซ็นอื่น ๆ ที่รู้จัก ซึ่งทำให้ BLS เป็น scheme ที่เหมาะสำหรับการลงคะแนนเสียงในอัลกอริธึมหาฉันทามติ และสำหรับ threshold signatures

## การเชื่อมต่อเครือข่าย (Bonding)

กระบวนการในการล็อกหรือ "แช่แข็ง" โทเค็นเพื่อแลกกับการเช่ือมต่อพาราเชนเข้ากับรีเลย์เชน กระบวนการนี้ทำให้มั่นใจได้ว่ามีเพียงเชนที่ถูกต้องและทำงานอยู่เท่านั้นที่จะสามารถเชื่อมเข้ากับรีเลย์เชนได้ เนื่องจากว่าถ้าไม่งั้นผู้ถือ DOT จะหยุดการล็อกโทเค็น

## สะพานเชื่อมต่อ (Bridge)

เป็นโหนดที่ทำหน้าที่เป็นตัวกลางระหว่างรีเลย์เชนบน Polkadot และบล็อกเชนภายนอก โดยทำให้บล็อกเชนภายนอกถูกมองเป็นพาราเชนโดยรีเลย์เชน (ตัวอย่างเช่น ทำให้เชนนอกรองรับ Polkadot Runtime Environment) สะพานเชื่อมต่อทำให้บล็อกเชนที่ไม่ถูกรองรับบน Polkadot เช่น Ethereum และ Bitcoin สามารถสื่อสารกับเครื่อข่าย Polkadot ได้

## Byzantine Fault Tolerance

คุณสมบัติของระบบที่สามารถทนต่อความผิดพลาดไบเซนไทน์ นั่นคือระบบที่ระบบย่อยสามารถล้มเหลวได้ แต่ไม่สามารถรู้ได้ชัดเจนว่าระบบย่อยบางระบบมีการล้มเหลวเกิดขึ้นหรือไม่ นี้หมายความว่าผู้สังเกตการณ์ที่แตกต่างกันในระบบไม่สามารถตัดสินใจร่วมกันได้ว่าระบบล้มเหลวหรือไม่ การที่มีคุณสมบัติ Byzantine fault tolerance เป็นส่วนสำคัญของการพัฒนาระบบกระจาย

## ผู้ตรวจทาน (Collator)

โหนดที่ทำหน้าที่ดูแลพาราเชนโดยการรวบรวมธุรกรรมบนพาราเชนและสร้างหลักฐานการเปลี่ยนสถานะให้ผู้ตรวจสอบ (Validator)

## ฉันทามติ (Consensus)

กระบวนการที่คนกลุ่มหนึ่งจะตกลงข้อมูลเฉพาะหนึ่งร่วมกัน (เช่นลำกับและองค์ประกอบของบล็อกบนบล็อกเชน) มีอัลกอริธึมที่หลากหลายที่ใช้สำหรับหาฉันทามติร่วมกัน อัลกอริทึมที่ใช้โดย Polkadot มีชื่อว่า GRANDPA

## DOTs

โทเค็นหลักของ Polkadot DOT มีจุดประสงค์สามประการ: การกำกับดูแลเครือข่าย (อนุญาตให้ผู้ถือโหวตเกี่ยวกับการอัพเกรดเครือข่ายและเหตุการณ์พิเศษอื่น ๆ) การดำเนินงานทั่วไป (ให้รางวัลผู้ที่ทำตัวดีและลงโทษผู้ที่ประพฤติตัวไม่ดี) และการเชื่อมต่อเครือข่าย (เชื่อมพาราเชนกับรีเลย์เชนโดยการล็อก DOT)

## Dapps

คําศัพท์ที่ใช้เรียกแอปพลิเคชันที่กระจายอำนาจ นั่นคือแอปซึ่งทำงานเป็นส่วนหนึ่งของเครือข่ายแบบกระจาย ซึ่งต่างจากการทำงานบนระบบหรือระบบชุดหนึ่ง

## Epoch

An epoch is a time duration in the BABE protocol that assigns leadership positions to authorities for production in slots. In Kusama, it is the same duration as a [session](#session).

## Era

A (whole) number of sessions, which is the period that the validator set (and each validator's active nominator set) is recalculated and where rewards are paid out.
## Equivocation

Providing conflicting information to the network. BABE equivocation entails creating multiple blocks in the same slot. GRANDPA equivocation would consist of signing multiple conflicting chains.

## Extrinsic

ฟังก์ชั่นที่ถูกกำหนดโดยโปรแกรมเมอร์ เช่นฟังก์ชั่นที่ไม่ได้ถูก built-in เข้ามาในเฟรมเวิร์ค สำหรับ Polkadot นี่หมายถึง binary blob ซึ่งแสดงถึงการเปลี่ยนสถานะ (state transition) บางอย่าง (เช่นการทำธุรกรรม) และถูกใช้ในพาราเชนเพื่อที่สื่อสารกับรีเลย์เชน

## การสรุปผล (Finality)

คุณสมบัติของบล็อกที่ไม่สามารถถูกย้อนกลับได้ โดยทั่วไปบล็อกที่สร้างขึ้นจะไม่ถูกสรุปผลว่าจะถูกเพิ่มเข้าบล็อกเชนหรือไม่จนกว่าจะถึงจุดหนึ่งในอนาคต - อาจจะไม่การเกิดขึ้นเลยก็เป็นได้ เหมือนในกรณีของ "probabilistic finality" ที่ใช้ใน Bitcoin (ถึงแม้ว่าบล็อกใน Bitcoin โดยทั่วไปจะถือว่าถูก "สรุปผล" หลังจากการยืนยันหกครั้ง เนื่องจากโอกาศที่บล็อกจะถูกย้อนกลับในจุดนั้นต่ำมาก) ในรีเลย์เชนของ Polkadot มีเป้าหมายที่จะทำการสรุปผลภายใน 10-12 วินาทีหลังจากถูกสร้าง

## เครื่องมือสรุปผล (Finality Gadget)

กลไกที่กำหนดผลสรุป

## ชาวประมง (Fisherman)

โหนดที่ทำหน้าที่ตรวจสอบการทำงานบนเครื่อข่ายของผู้ตรวจสอบ (Validator) และ ผู้ตรวจทาน (Collator) เพื่อหาพฤติกรรมผิดปกติ ชาวประมงจะต้องเดิมพัน DOT เล็กน้อยในการฟ้อง แต่จะได้รับรางวัลตอบแทนอย่างมากหากพบว่าพฤติกรรมไม่ดีจริง

## GRANDPA consensus algorithm

ย่อมากจาก GHOST-based Recursive Ancestor Deriving Prefix Agreement เป็นเครื่องมือสรุปผลของ Polkadot ซึ่งช่วยในการสรุปว่าบล็อกตัวไหนควรถูกเพิ่มเข้าบล็อกเชนอย่าง asynchronous สามารถอธิบายได้ และปลอดภัย สำหรับภาพรวมของ GRANDPA อ่านได้ที่โพสต์ Medium นี้: <https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372>

## การกำกับดูแล (Governance)

กระบวนการในการพิจารณาว่าการเปลี่ยนแปลงเครือข่ายใดบ้างควรได้รับอนุญาต เช่นการแก้ไขโค้ดหรือการเคลื่อนย้ายเงินทุน ระบบการกำกับดูแลใน Polkadot เป็นแบบ on-chain และใช้การลงคะแนนของผู้มีส่วนได้ส่วนเสียเป็นหลัก ซึ่งหมายความว่ากลุ่มผู้ถือหุ้น (DOTs) ส่วนใหญ่กำหนดทิศทางเติบโตของเครือข่าย

## สภาการกำกับดูแล (Governance Council)

กลุ่มออนไลน์บนบล็อกเชน ซึ่งประกอบด้วยบัญชีบล็อกเชนหลายบัญชี (เริ่มต้นที่ 6 จนถึง 24 บัญชี) ซึ่งทำหน้าที่เป็นตัวแทนของผู้มีส่วนได้เสียที่ไม่ลงคะแนนเสียง สมาชิกสภามีหน้าที่หลักสองประการ การเสนอ referenda เพื่อให้กลุ่มผู้มีส่วนได้เสียลงคะแนน และยกเลิก referenda ที่มีจุดประสงค์ร้าย

## Hard Fork

A permenant diversion of a blockchain that can occur quickly due to a high priority change in a consensus rule. Clients who follow a hard fork always need to upgrade their clients in order to continue following the hard-forked chain. Hard forks are considered permanent divergences of a chain for which non-upgraded clients are following consensus rules incompatible to the ones followed by upgraded clients.

## Hard Spoon

Defined by Jae Kwon of Cosmos as "a new chain that takes into account state from an existing chain; not to compete, but to provide broad access." A non-contentious blockchain that inherits the state of the underlying blockchain and creates a new branch of *the same blockchain*.

## KSM

The abbreviation for Kusama network tokens.

## Kusama

The "canary network" for Polkadot. It consists of an early-release, unaudited version of the Polkadot software. It is not a testnet - after the transition to NPoS, the network is entirely in the hands of the community (i.e., Kusama token holders).

## LIBP2P

An open-source library for encrypted peer-to-peer communications and other networking functionality. More information at: [https://libp2p.io/](https://libp2p.io/)

## Liveness

The property of a distributed system that it will eventually come to some sort of consensus. A system stuck in an infinite loop would not be considered live, even if computations are taking place; a system which eventually provides a result, even if incorrect or it takes a long time, is considered to have liveness.

## Node explorer

A tool which gives you information about a node, such as the latest blocks sealed, finalized, and the current chain state as known by that node.

## Nominated Proof of Stake (NPoS)

A proof of stake system whereby nominators "lend" their stake to validators, as a show of faith in the good behavior of the validator. Nominated proof-of-stake differs from the more generic concept delegated proof of stake in that nominators are subject to loss of stake if they nominate a bad validator; delegates are not subject to loss of stake based on the behavior of the validator. Note that some other blockchain technologies may use the term delegated proof of stake, even if delegates can be slashed.

## Nominator

Nodes which select a set of validators. A certain amount of DOTs must be staked in order to do so, which may be lost if the validator behaves badly. This forces nominators to carefully select validators.

## On-chain governance

Governance of a blockchain which is controlled by mechanisms controlled by the blockchain. On-chain governance allows for decisions can be made in a transparent manner. Note that there are a variety of different algorithms for making these decisions, such as simple majority voting or identity-based quadratic voting.

## Parachain

A blockchain which meets several characteristics which allow it work within the confines of the Polkadot Runtime Environment. Also known as "parallelized chain."

## Parachain Registry

A relatively simple database-like construct that holds both static and dynamic information on each chain.

## Parity Technologies

A company, founded by Dr. Gavin Wood, which is developing Substrate. It has also released several other projects including Parity Ethereum and Parity Wasm.

## Polkadot

A heterogeneous multi-chain technology allowing for various blockchains of different characteristics to perform interchain communication.

## Polkadot Runtime Environment

The runtime environment which a runtime module can be executed in. Parachains must support the Polkadot Runtime Environment - external chains which do not will have to use a bridge.

## Proof of Stake (PoS)

A method of achieving consensus in which the next block is determined by a node that is chosen by some characteristic (e.g., the amount of tokens that they stake).

## Proof of Work

A method of achieving consensus in which the next block is determined by the first to solve a difficult puzzle (e.g., in Bitcoin, solving a partial pre-image hash for a block candidate).

## Proposal

A potential function call to be voted on in a referendum. Proposals modify the behavior of the Polkadot network, from minor parameter tuning all the way up to replacing the runtime code.

## Protocol

A system of rules that allow two or more entities of a communications system to transmit information. The protocol defines the rules, syntax, semantics and synchronization of communication and possible recovery methods.

## Referendum

A vote on whether or not a proposal should be accepted by the network. These referenda may be initiated by the Governance Council, by a member of the public, or as the result of a previous proposal. Stakeholders vote on referenda, weighted by both the size of their stake (i.e. number of DOTs held) and the amount of time they are willing to lock their tokens.

## Relay chain

A chain which coordinates consensus and communication between parachains (and external chains, via bridges).

## Runtime

A state transition function which indicates a valid algorithm for determining the state of the next block given the previous block.

## Runtime Module

Wasm code which encodes a state transition function.

## Safety

The property of a distributed system indicating that the system will properly meet all invariants; that is, that nothing "bad" ever happens to the data (such as it being corrupted).

## Sealing

The process of adding a block to the relay chain. Note that finalization is a separate process - blocks are finalized some time after they are sealed (the goal is approximately 10 - 12 seconds).

## Session

A session is a Substrate implementation term for a period of time that has a constant set of validators. Validators can only join or exit the validator set at a session change.

## Session certificate

Another name for the session "key" which is a BLS key for GRANDPA, a sr25519 key for BABE, and eventually an Ed25519 key for libp2p.

## Session key

A session "key" is a BLS key for GRANDPA, a sr25519 key for BABE, and eventually an Ed25519 key for libp2p.

## Slashing

The removal of a percentage of an account's DOTs as a punishment for a validator acting maliciously or incompetently (e.g., equivocating or remaining offline for an extended period of time).

## Soft Fork

A backwards compatible change to client code which causes upgraded clients to start mining a new chain. Requires a "vote-by-hashrate" of majority of miners in order to enact successfully. Soft forks are considered temporary divergences in a chain since non-upgraded clients do not follow the new consensus rules but upgraded clients are still compatible with old consensus rules.

## Staking

"Reserving" tokens (for Polkadot, DOTs) which are put up as "collateral" for a chance to produce a valid block (and thus obtain a block reward). Validators and nominators (who back validators through NPoS) together stake their DOTs in order to add blocks to the relay chain.

## State transition function

A function which describes how the state of a blockchain can be transformed. For example, it may describe how tokens can be transferred from one account to another.

## Substrate

An implementation of the Polkadot Runtime Environment which allows developers to generate parachains which are compatible with the Polkadot relay chain.

## Tabling

In Polkadot governance, bringing a proposal to a vote via referendum. Note that this is the British meaning of "tabling", which is different than the US version, which means "to postpone" a measure.

## Transaction

An individual element of the state transition function of a block, such as moving tokens from one account to another.

## Validator

A node which secures the relay chain by staking DOTs, validating proofs from collators on parachains, and determine a consensus along with other validators.

## Voting

The process of stakeholders determining whether or not a referendum to implement a specific proposal should pass. Votes are weighted both by the number of DOTs that the stakeholder account controls and the amount of time they are willing to lock their DOTs up. Voting may be overridden by the Governance Council if there is unanimous agreement that it not

## Wallet

A program which allows one to store, receive, and transmit DOTs or other blockchain-based tokens.

## Web3 Foundation

A Switzerland-based foundation which nurtures and stewards technologies and applications in the fields of decentralized web software protocols, particularly those which utilize modern cryptographic methods to safeguard decentralization, to the benefit and for the stability of the Web3 ecosystem.

## WebAssembly

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to WebAssembly. Also known as Wasm.

## Wasm

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to Wasm.

## Witness

Cryptographic proof statements of data validity.
