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

## KSM

อักษรย่อของโทเค็นบนเครือข่าย Kusama

## Kusama

The "canary network" for Polkadot. It consists of an early-release, unaudited version of the Polkadot software. It is not a testnet - after the transition to NPoS, the network is entirely in the hands of the community (i.e., Kusama token holders).

## LIBP2P

ไลบรารีโอเพนซอร์สสำหรับการสื่อสารแบบ P2P ที่มีการเข้ารหัสและฟังก์ชันเครือข่ายอื่น ๆ อ่านข้อมูลเพิ่มเติมได้ที่: [https://libp2p.io/](https://libp2p.io/)

## Liveness

คุณสมบัติของระบบกระจายที่บ่งบอกว่าในที่สุดระบบจะสามารถหาฉันทามติได้ ระบบที่ติดอยู่ในลูปไม่สิ้นสุด ถึงแม้ว่าจะมีการคำนวณเกิดขึ้น ไม่ถือว่ามี liveness ระบบที่ให้ผลลัพธ์ในที่สุด ถึงแม้ว่าจะไม่ถูกต้องหรือใช้เวลานาน ถือว่ามี liveness

## เครื่องมือสำรวจโหนด (Node Explorer)

เครื่องมือที่ให้ข้อมูลเกี่ยวกับโหนด เช่นบล็อกล่าสุดที่ถูกปิดผนึก บล็อกที่ถูกสรุป และสถานะบล็อกเชนปัจจุบัน

## Nominated Proof of Stake (NPoS)

ระบบ proof of stake ที่ผู้เสนอชื่อ (Nominators) ให้ยืมเงินที่ถูกล็อกเป็นหลักประกัน แก่ผู้ตรวจสอบ (Validators) เพราะเชื่อในในพฤติกรรมที่ดีของผู้ตรวจสอบ Nominated proof-of-stake แตกต่างจาก delegated proof-of-stake ตรงที่ ผู้เสนอช่ือ (Nominators) อาจสูญเสียเงินที่วางเป็นหลักประกันหากพวกเขาเสนอผู้ตรวจสอบที่ประพฤติตัวไม่ดี แต่ผู้แทน (Delegates) ไม่ต้องสูญเสียเงินเดิมพันตามพฤติกรรมของผู้ตรวจสอบ โปรดทราบว่าเทคโนโลยีบล็อกเชนอื่น ๆ อาจมีการใช้เรียกว่าเป็น delegated proof of stake ถึงแม้ว่าผู้แทนอาจจะถูกยึดหลักประกัน

## ผู้เสนอชื่อ (Nominator)

เป็นโหนดที่มีหน้าที่เลือกลุ่มผู้ตรวจชอบชุดนึง DOT จำนวนนึงต้องถูกล็อกเป็นหลักประกันเพื่อที่จะได้ทำหน้าที่ดังกล่าว ซึ่งอาจจะเกิดการสูญเสียของ DOT ได้หากผู้ตรวจสอบที่โหนดเลือกประพฤติตัวไม่ดี สิ่งนี้จึงบังคับให้ผู้เสนอชื่อเลือกผู้ตรวจสอบอย่างระมัดระวัง

## การกำกับดูบนบล็อกเชน (On-chain governance)

การกำกับดูแลของบล็อกเชน ซึ่งถูกควบคุมโดยกลไกที่ควบคุมโดยบล็อกเชน การกำกับดูแลแบบ On-chain ช่วยให้สามารถทำการตัดสินใจได้อย่างโปร่งใส โปรดทราบว่ามีอัลกอริทึมหลายตัวที่สามารถช่วยในการตัดสินใจเหล่านี้ เช่นการลงคะแนนเสียงข้างมาก และการลงคะแนนเสียงแบบ identity-based quadratic

## พาราเชน (Parachain)

เป็นบล็อกเชนที่มีคุณสมบัติหลายอย่างที่ทำให้สามารถทำงานบน Polkadot Runtime Environment ได้ อีกชื่อเรียกคือ "บล็อกเชนแบบขนาน"

## Parachain Registry

โครงสร้างคล้ายฐานข้อมูลที่ไม่ซับซ้อนที่เก็บข้อมูลทั้งแบบคงที่และแบบไดนามิกในแต่ละบล็อกเชน

## Parity Technologies

บริษัทที่ก่อตั้งโดย Dr. Gavin Wood ซึ่งกำลังพัฒนา Substrate บริษัทยังได้มีการพัฒนาโครงการอื่น ๆ อีกหลายอย่าง เช่น Parity Ethereum และ Parity Wasm

## Polkadot

เทคโนโลยีสำหรับหลายบล็อกเชนต่างชนิด ช่วยให้บล็อกเชนที่มีคุณลักษณะที่แตกต่างกันสามารถสื่อสารระหว่างกันได้

## Polkadot Runtime Environment

สภาวะแวดล้อมรันไทม์ (Runtime Environment) ที่โมดูลรันไทม์ (runtime module) สามารถรันบนได้ Parachains ต้องรองรับ Polkadot Runtime Environment - เครือข่ายภายนอกซึ่งไม่รองรับต้องใช้สะพานเชื่อมต่อ (Bridge) ในการเชื่อมต่อ

## Proof of Stake (PoS)

หนึ่งวิธีในการหาฉันทามติโดยกำหนดว่าบล็อกต่อไปจะถูกกำหนดโดยโหนดที่ถูกเลือกเพราะคุณสมบัติบางอย่าง (เช่น จำนวนโทเค็นที่วางเป็นหลักประกัน)

## Proof of Work

หนึ่งวิธีในการหาฉันทามติโดยกำหนดว่าบล็อกต่อไปคือบล็อกแรกที่สามารถแก้ไขปริศนาที่ยากได้ (เช่นใน Bitcoin ต้องหา pre-image hash เพื่อที่จะสร้างบล็อกต่อไป)

## ข้อเสนอ (Proposal)

การเรียกใช้ฟังก์ชันที่ต้องผ่านการลงคะแนนเสียงประชามติ ข้อเสนอมีสิทธิ์ในแก้ไขพฤติกรรมของเครือข่าย Polkadot ตั้งแต่การปรับพารามิเตอร์เล็กน้อยจนถึงการเปลี่ยนโค้ดรันไทม์

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
