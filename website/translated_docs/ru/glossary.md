---
id: glossary
title: Термины и определения
sidebar_label: Термины и определения
---

## Alexander

Четвертое (теперь отключено) доказательство концепции (PoC-4) testnet для Polkadot.

## Аттестация/Attestation

В системе "Polkadot" _Аттестация_ - это тип сообщения, который транслируют валидаторы и сообщают, считают ли они блок кандидата парачейна действительным или недействительным.

## Авторитеты/Authority

Авторитеты — это общий термин для роли в блокчейне, способный участвовать в механизмах консенсуса. В GRANDPA авторитеты голосуют за финализацию цепочек. В BABE авторитеты являются производители блоков.  Настройки для авторитетов могут быть выбраны такими механизмами, как алгоритм NPoS в Polkadot.

## BABE

\_B_lind \_A_ssignment \_B_lock \_E_xtension - механизм производства блоков Polkadot'а.

## Блок/Block

Набор данных, таких как транзакции, которые сигнализируют о переходе состояния блокчейна.

## Блок эксплорер/Block explorer

Приложение, которое позволяет пользователю исследовать различные блоки в блокчейне.

## BLS

Подписи Boneh-Lynn-Shacham (BLS) достаточно медленные, и имеют очень медленную проверку, требуют медленных и гораздо менее безопасных спаренных кривых. Тем не менее, BLS допускает широкий спектр вариантов агрегирования подписей в сравнение с любой другой известной схемой подписи, что делает BLS предпочтительной для голосования в алгоритмах консенсуса и для пороговых подписей.

## Бондинг/Bonding

Процесс, по которому токены могут быть "замороженными" в обмен на некоторые другие выгоды. Например, стейкинг - это форма связывания, за которую вы получаете награду в обмен на безопасность сети. Вы также можете привязать токены в обмен на парачейн слот.

## Мост/Bridge

A parachain that acts as an intermediary between the Polkadot Relay Chain and an external chain, in such a way that it appears to the Relay Chain that the external chain is a parachain (i.e., meets the Polkadot Host's requirements of parachains). Bridges allow for interaction between other blockchains, such as Ethereum and Bitcoin, that are not natively compatible with Polkadot.

## Византийская Отказоустойчивость/Byzantine Fault Tolerance

Свойство системы, которая устойчива к византийскому поведению; то есть система, где отдельные подсистемы могут быть злоумышленниками, но это может быть неизвестно, какая конкретно подсистема является злоумышленником. То есть разные наблюдатели в системе могут не прийти к единому мнению о состоянии системы. Обеспечение византийской отказоустойчивости является важной частью разработки любой распределенной системы.

## Сборщик/Collator

Нода, которая поддерживает парачейн, собирая его транзакции и производя доказательства перехода состояния для валидаторов.

## Консенсус/Consensus

Процесс группы субъектов для согласования конкретного значения данных (например, порядок и состав блоков в блокчейне). Существует множество алгоритмов, используемых для достижения консенсуса. Polkadot использует алгоритм консенсуса GRANDPA.

## Децентрализованные приложения/Dapps

Общий обозначение для децентрализованного приложения, то есть такого, которое работает как часть распределенной сети в отличие от приложений, запускаемых на конкретной системе или наборе систем.

## DOT

The native token for Polkadot. DOT serve three purposes: network governance (allowing them to vote on network upgrades and other exceptional events), general operation (rewarding good actors and punishing bad actors), and bonding (adding new parachains by "freezing" DOT while they are connected the Relay Chain).

## Список дежурств/Duty Roster

Таблица подстановки, указывающая задание, которое требуется выполнить конкретному валидатору (т. е. подтвердить валидность конкретного парачейна). Список дежурств регулярно перетасовывает набор валидаторов в различные подмножества на парачейне.

## Эпоха/Epoch

Эпоха - это продолжительность времени в протоколе BABE, которая разбивается на меньшие временные интервалы. В каждом слоте есть по крайней мере один лидер слота, который имеет право предложить лок. В Kusama эта продолжительность совпадает с [сессией](#session).

## Эра/Era

Пероид (количество сессий), в течение которого изменяется набор валидаторов (и активный набор номинаторов каждого валидатора) и выплачиваются вознаграждения.

## Неопределённость/Equivocation

Предоставление противоречивой информации в сеть. Неопределённость в BABE влечет за собой создание нескольких блоков в одном слоте. Неопределённость в GRANDPA состояла бы в подписании нескольких конфликтующих цепочек.

## Экстринзик/Extrinsic

Изменения состояния происходят из внешнего мира, то есть они не являются частью самой системы. Экстринзик может принимать две формы: "[неотъемлемые](#inherent)" и "[транзакции](#transaction)".

## Финальность/Finality

The property of a block that cannot be reverted. Generally, created blocks are not final until some point in the future - perhaps never, in the case of "probabilistic finality". The Polkadot Relay Chain uses a deterministic finality gadget known as [GRANDPA](#GRANDPA-consensus-algorithm).

## Гаджет финальности/Finality Gadget

Механизм, который определяет финальность.

## Рыбак/Fisherman

Nodes that monitor the network for validators or collators who are behaving badly. Fishermen must stake a small amount of DOT but can be rewarded greatly if they find bad behavior.

## Фрейм/Frame

Коллекция предоставляемых Substrate паллет (англ. pallet). SRM - модули среды исполнения Substrate.

## Генезис/Genesis

Начало блокчейна, также известного как блок 0. Он также может быть использован для ссылки на начальное состояние блокчейна при создании.

> Пример: "В состоянии _генезис_ Алиса, Боб и Чарли имели по 30 токенов каждый."

## Управление/Governance

Процесс определения того, какие изменения в сети допустимы, например, изменения кода или движение средств. Система управления в Polkadot организована ончейн и основывается на голосовании холдеров.

## Совет по вопросам управления/Governance Council

Ончейн организация, состоящая из нескольких аккаунтов (начиная с 6, в конечном итоге переходя к 24), которая может выступать в качестве представителя для "пассивных" (неголосующих) холдеров. Перед членами совета стоят две основные задачи: предложение референдумов для голосования и отмена вредоносных референдумов.

## Гаджет финальности GRANDPA/Governance Council

GHOST-based Recursive Ancestor Deriving Prefix Agreement. Соглашение о получении префикса для рекурсивного предка на основе GHOST. Это механизм определения финальности в Polkadot, который позволяет асинхронную и безопасную финальность для блокчейна. Обзор GRANDPA смотрите в этой статье на Medium: [https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372](https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372)

## Хардфорк/Hard Fork

Перманентное переключение блокчейна, которое может произойти быстро из-за высокоприоритетного изменения в консенсусном правиле. Клиенты, которые следуют за хардфорком, всегда должны модернизировать своих клиентов, чтобы продолжать следовать за обновлённой цепочкой. Хардфорками считаются постоянными расхождениями цепи, для которой не обновленные клиенты следуют консенсусным правилам, несовместимым с правилами, за которыми следуют обновлённые клиенты.

## Хардспун/Hard Spoon

Jae Kwon из Cosmos называет так "новую цепочку, которая берет состояния из существующей цепочки; не для того, чтобы конкурировать, а чтобы обеспечить широкий доступ." Новый блокчейн, который наследует состояние базового блокчейна и создает новую ветвь _того же блокчейна_.

## Horizontal Relay-routed Message Passing

Horizontal Relay-routed Message Passing, also known as HRMP, is a precursor to the complete XCMP implementation, that mimics the same interface and semantics of XCMP. It is similar to XCMP except for how it stores all messages in the Relay Chain storage, therefore making it more expensive and demanding more resources than XCMP. The plan is to retire HRMP once the implementation of XCMP is complete.

## Inherent

Extrinsics that are "inherently true." Inherents are not gossiped on the network and are put into blocks by the block author. They are not provably true the way that the desire to send funds is, therefore they do not carry a signature. A blockchain's [runtime](#runtime) must have rules for validating inherents. For example, timestamps are inherents. They are validated by being within some margin that each validator deems reasonable.

## KSM

The abbreviation for Kusama network tokens.

## Kusama

The "canary network" for Polkadot. It consists of an early-release, unaudited version of the Polkadot software. It is not a testnet - after the transition to NPoS, the network is entirely in the hands of the community (i.e., Kusama token holders).

## LIBP2P

An open-source library for encrypted peer-to-peer communications and other networking functionality. More information at: [https://libp2p.io/](https://libp2p.io/)

## Liveness

The property of a distributed system that it will eventually come to some sort of consensus. A system stuck in an infinite loop would not be considered live, even if computations are taking place; a system that eventually provides a result, even if incorrect or it takes a long time, is considered to have liveness.

## Message

In Polkadot's XCMP protocol, a _message_ is arbitrary data that is sent from one parachain (the egress chain) to another (the ingress chain) through a channel and ensured delivery by the vaidator set.

## Message Queue

In Polkadot's XCMP protocol, a _message queue_ is the list of messages waiting to be process by a particular receiving parachain over a channel.

## Node Explorer

A tool that gives you information about a node, such as the latest blocks sealed, finalized, and the current chain state as known by that node.

## Nominated Proof of Stake (NPoS)

A Proof-of-Stake system where nominators back validators with their own stake as a show of faith in the good behavior of the validator. Nominated Proof-of-Stake differs from the more generic concept Delegated Proof-of-Stake in that nominators are subject to loss of stake if they nominate a bad validator; delegators are not subject to loss of stake based on the behavior of the validator. Note that some other blockchain technologies may use the term Delegated Proof-of-Stake, even if delegators can be slashed. Polkadot uses the Phragmen method to allocate stake to nominees.

## Nominator

Accounts that select a set of validators to nominate by bonding their tokens. Nominators receive some of the validators' rewards, but are also liable for slashing if their nominated validators misbehave.

## On-chain Governance

A governance system of a blockchain that is controlled by mechanisms on the blockchain. On-chain governance allows decisions to be made in a transparent manner. Note that there are a variety of different algorithms for making these decisions, such as simple majority voting, adaptive quorum biasing, or identity-based quadratic voting.

## Pallet

A Substrate runtime module.

## Parachain

A blockchain that meets several characteristics that allow it work within the confines of the Polkadot Host. Also known as "parallelized chain."

## Parachain Registry

A relatively simple database-like construct that holds both static and dynamic information on each chain.

## Parity Technologies

A company, founded by Dr. Gavin Wood, that is developing Substrate and Polkadot. It has also released several other projects including Parity Ethereum and Parity Secret Store.

## Polkadot

A heterogeneous, multi-chain network allowing various blockchains of different characteristics to perform arbitrary, cross-chain communication under shared security.

## Polkadot Host

The environment in which a runtime module can be executed. Parachains must support the Polkadot Host - external chains that do not will have to use a bridge. Previously known as the Polkadot Runtime Environment or PRE.

## Polkadot Runtime Environment

The previous name for the [Polkadot Host](#polkadot-host).

## Proof of Stake (PoS)

A method of selecting participation in a consensus system, in which participants are chosen based on how many tokens they have at stake (at risk of loss due to misbehavior). Normally, Proof-of-Stake systems limit the number of participants.

## Proof of Validity

A proof produced by parachain collators. Based on this proof and the parachain registry, a validator can verify that a parachain has properly executed its state transition function. Proofs of Validity go into the Relay Chain blocks.

## Proof of Work (PoW)

A method of selecting participants in a consensus system, typically the longest chain rule, in which participants try to solve a puzzle like finding a partial pre-image of a hash. Normally, a Proof-of-Work system can have any number of participants.

## Proposal

A potential function call to be voted on in a referendum. Proposals modify the behavior of the Polkadot network, from minor parameter tuning all the way up to replacing the runtime code.

## Protocol

A system of rules that allows two or more entities of a communications system to transmit information. The protocol defines the rules, syntax, semantics and synchronization of communication and possible recovery methods.

## Random Seed

A random seed is pseudo-random number available on-chain. It is used in various places of the Polkadot protocol, most prominently in [BABE](#babe) the block production mechanism.

## Referendum

A vote on whether or not a proposal should be accepted by the network. Referenda may be initiated by the Governance Council, by a member of the public, or as the result of a previous proposal. Stakeholders vote on referenda, weighted by both the size of their stake (i.e. number of DOT held) and the amount of time they are willing to lock their tokens.

## Relay chain

The chain that coordinates consensus and communication between parachains (and external chains, via bridges).

## Runtime

The state transition function of a blockchain. It defines a valid algorithm for determining the state of the next block given the previous state.

## Runtime Module

A module that implements specific transition functions and features one might want to have in their runtime. Each module should have domain-specific logic. For example, a Balances module has logic to deal with accounts and balances. In Substrate, modules are called "pallets".

## Safety

The property of a distributed system indicating that a particular state transition will not be reverted. GRANDPA provides _deterministic_ safety. That is, for a state changed marked as "safe" or "final", one would require a hard fork to revert that change.

## Sealing

The process of adding a block to the Relay Chain. Note that finalization is a separate process - blocks are finalized some time after they are sealed.

## Session

A session is a Substrate implementation term for a period of time that has a constant set of validators. Validators can only join or exit the validator set at a session change.

## Session Certificate

A message containing a signature on the concatenation of all the Session keys. Signed by the Controller.

## Session Key

Hot keys that are used for performing network operations by validators, for example signing GRANDPA commit messages.

## Shared Security

The security model that Polkadot uses whereby all chains are equally secured. This is acheived by placing proofs of validity of parachain blocks into the Relay Chain such that, in order to revert finality of a single parachain, an attacker would need to attack the entire Polkadot system.

## Slashing

The removal of a percentage of an account's DOT as a punishment for a validator acting maliciously or incompetently (e.g., equivocating or remaining offline for an extended period of time).

## Soft Fork

A backwards compatible change to client code that causes upgraded clients to start mining a new chain. Requires a "vote-by-hashrate" of majority of miners in order to enact successfully. Soft forks are considered temporary divergences in a chain since non-upgraded clients do not follow the new consensus rules but upgraded clients are still compatible with old consensus rules.

## Staking

The act of bonding tokens (for Polkadot, DOT) by putting them up as "collateral" for a chance to produce a valid block (and thus obtain a block reward). Validators and nominators stake their DOT in order to secure the network.

## State transition function

A function that describes how the state of a blockchain can be transformed. For example, it may describe how tokens can be transferred from one account to another.

## Substrate

A modular framework for building blockchains. Polkadot is built using Substrate. Chains built with Substrate will be easy to connect as parachains.

## Tabling

In Polkadot governance, bringing a proposal to a vote via referendum. Note that this is the British meaning of "tabling", which is different than the US version, which means "to postpone" a measure.

## Transaction

An extrinsic that is signed. Transactions are gossiped on the network and incur a transaction fee. Transactions are "provably true", unlike inherents. For example, one can prove that Alice wants to send funds to Bob by the fact that she signed a transfer-funds message with her private key.

## Validator

A node that secures the Relay Chain by staking DOT, validating proofs from collators on parachains and voting on consensus along with other validators.

## Vertical Message Passing

Vertical message passing consists of two separate types of message passing, Downward Message Passing (DMP) and Upward Message Passing (UMP). Downward messages pass from the Relay Chain to a parachain, although they may also originate from another parachain via [HRMP](#horiztonal-relay-routed-message-passing). Upward messages originate from parachains and go up to the Relay Chain via runtime entry points.

## Voting

The process of stakeholders determining whether or not a referendum should pass. Votes are weighted both by the number of DOT that the stakeholder account controls and the amount of time they are willing to lock their DOT.

## Wallet

A program that allows one to store private keys and sign transactions for Polkadot or other blockchain networks.

## Wasm

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to Wasm.

## Watermark

In Polkadot's parachain messaging scheme, the _watermark_ is the minimum processed send-height of the receiving parachain. All messages on all channels that are sending to this parachain at or before the watermark are guaranteed to be processed.

## Web3 Foundation

A Switzerland-based foundation that nurtures and stewards technologies and applications in the fields of decentralized web software protocols, particularly those that utilize modern cryptographic methods to safeguard decentralization, to the benefit and for the stability of the Web3 ecosystem.

## WebAssembly

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to WebAssembly. Also known as Wasm.

## Witness

Cryptographic proof statements of data validity.
