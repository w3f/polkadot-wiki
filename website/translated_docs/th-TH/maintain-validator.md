---
id: maintain-validator
title: ผู้ตรวจสอบ (Validator)
sidebar_label: ผู้ตรวจสอบ (Validator)
---

ผู้ตรวบจสอบดูแลความปลอดภัยของรีเลย์เชนโดยการวาง DOT เป็นหลักประกัน ตรวจสอบหลักฐานที่ได้จากผู้ตรวจทาน (Collators) และหาฉันทามติร่วมกันกับผู้ตรวจสอบท่านอื่น

ผู้เข้าร่วมเหล่านี้จะมีบทบาทสำคัญในการเพิ่มบล็อกใหม่ในรีเลย์เชน และส่งผลกระทบไปยังพาราเชนทั้งหมด เหตุนี้ทำให้ฝ่ายต่างๆสามารถทำธุรกรรมระหว่างเชนผ่านรีเลย์เชนได้

ผู้ตรวจสอบทำหน้าที่สองอย่าง อย่างแรกคือการตรวจสอบว่าข้อมูลที่อยู่บล็อกของกลุ่มพาราเชนที่ได้รับมอบหมายนั้นถูกต้อง (เช่นข้อมูลประจำตัวของฝ่ายที่ทำธุรกรรมและสาระสำคัญของสัญญา) อย่างที่สองคือการมีส่วนร่วมในการหาฉันทามติเพื่อสร้างบล็อกของรีเลย์เชนตามข้อความรับรองความถูกต้องจากผู้ตรวจสอบท่านอื่น ใครที่ไม่ปฏิบัติตามอัลกอริทึมฉันทามติจะถูกลงโทษโดยการถูกยึด DOTs บางส่วนหรือทั้งหมดที่ผู้ตรวจสอบวางประกันไว้เพื่อกีดกันการกระทำความผิด อย่างไรก็ตาม หากผลงานดีจะได้รับผลตอบแทน ผู้ตรวจสอบจะได้รับรางวัลจากบล็อค (รวมถึงค่าธรรมเนียมการทำธุรกรรม) ในรูปแบบของ DOT เพื่อแลกเปลี่ยนกับการทำความดีของพวกเขา

## คู่มือแนะนำ

- [How to Validate on Kusama](maintain-guides-how-to-validate-kusama) - Guide on how to set up a validator on the Kusama canary network.
- [Validator Payout Overview](maintain-guides-validator-payout) - A short overview on how the validator payout mechanism works.
- [How to run your validator as a systemd process](maintain-guides-how-to-systemd) - Guide on running your validator as a `systemd` process so that it will run in the background and start automatically on reboots.
- [How to Upgrade your Validator](maintain-guides-how-to-upgrade) - Guide for securely upgrading your validator when you want to switch to a different machine or begin running the latest version of client code.
- [How to Set up a Sentry Node](maintain-guides-how-to-setup-sentry-node) - Guide for setting up a sentry node for your validator.
- [How to Use Secure Validator Setup](maintain-guides-how-to-use-polkadot-secure-validator) - Guide on how to use Polkadot / Kusama secure validator setup.

## เอกสารอ้างอิง

- [วิธีรันโหนด Polkadot โดยใช้ Docker](https://medium.com/@acvlls/setting-up-a-maintain-the-easy-way-3a885283091f)
- [A Serverless Failover Solution for Web3.0 Validator Nodes](https://medium.com/hackernoon/a-serverless-failover-solution-for-web-3-0-validator-nodes-e26b9d24c71d) - Blog that details how to create a robust failover solution for running validators.
- [VPS list](maintain-guides-how-to-validate-kusama#vps-list)
- [Polkadot Validator Lounge](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) - A place to chat about being a validator.
- [Slashing Consequences](https://wiki.polkadot.network/docs/en/learn-staking#slashing) - Learn more about slashing consequences for running a validator node.

## ความปลอดภัย / การจัดการดูแลคีย์

- [ภาพรวมเกี่ยวกับความปลอดภัยของผู้ตรวจสอบ](https://github.com/w3f/validator-security)

## เครื่องมือตรวจสอบ

- [PANIC for Polkadot](https://github.com/SimplyVC/panic_polkadot) - A monitoring and alerting solution for Polkadot / Kusama node
- [Polkadot Telemetry Service](https://telemetry.polkadot.io/#list/Kusama%20CC3) - Network information, including what nodes are running on a given chain, what software versions they are running, and sync status.
- [Other Useful Links](https://forum.web3.foundation/t/useful-links-for-validators/20)
