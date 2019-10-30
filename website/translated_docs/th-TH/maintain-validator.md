---
id: maintain-validator
title: ผู้ตรวจสอบ (Validator)
sidebar_label: ผู้ตรวจสอบ (Validator)
---

ผู้ตรวบจสอบดูแลความปลอดภัยของรีเลย์เชนโดยการวาง DOT เป็นหลักประกัน ตรวจสอบหลักฐานที่ได้จากผู้ตรวจทาน (Collators) และหาฉันทามติร่วมกันกับผู้ตรวจสอบท่านอื่น

ผู้เข้าร่วมเหล่านี้จะมีบทบาทสำคัญในการเพิ่มบล็อกใหม่ในรีเลย์เชน และส่งผลกระทบไปยังพาราเชนทั้งหมด เหตุนี้ทำให้ฝ่ายต่างๆสามารถทำธุรกรรมระหว่างเชนผ่านรีเลย์เชนได้

ผู้ตรวจสอบทำหน้าที่สองอย่าง อย่างแรกคือการตรวจสอบว่าข้อมูลที่อยู่บล็อกของกลุ่มพาราเชนที่ได้รับมอบหมายนั้นถูกต้อง (เช่นข้อมูลประจำตัวของฝ่ายที่ทำธุรกรรมและสาระสำคัญของสัญญา) อย่างที่สองคือการมีส่วนร่วมในการหาฉันทามติเพื่อสร้างบล็อกของรีเลย์เชนตามข้อความรับรองความถูกต้องจากผู้ตรวจสอบท่านอื่น ใครที่ไม่ปฏิบัติตามอัลกอริทึมฉันทามติจะถูกลงโทษโดยการถูกยึด DOTs บางส่วนหรือทั้งหมดที่ผู้ตรวจสอบวางประกันไว้เพื่อกีดกันการกระทำความผิด อย่างไรก็ตาม หากผลงานดีจะได้รับผลตอบแทน ผู้ตรวจสอบจะได้รับรางวัลจากบล็อค (รวมถึงค่าธรรมเนียมการทำธุรกรรม) ในรูปแบบของ DOT เพื่อแลกเปลี่ยนกับการทำความดีของพวกเขา

## คู่มือแนะนำ

- [วิธีการตรวจสอบบน Alexander](maintain-guides-how-to-validate-alexander) - คู่มือแนะนำในการตั้งค่าโหนดตรวจสอบบนเครือข่ายทดลอง Alexander
- [วิธีการตรวจสอบบน Kusama](maintain-guides-how-to-validate-kusama) - คู่มือแนะนำในการตั้งค่าโหนดตรวจสอบบนเครือข่าย Kusama
- [หลักการจ่ายเงินให้ผู้ตรวจสอบ](maintain-guides-validator-payout) - บทความแนะนำเกี่ยวกับการทำงานของกลไกการจ่ายเงินให้ผู้ตรวจสอบ
- [วิธีการรันโหนดตรวจสอบโดยใช้ systemd](maintain-guides-how-to-systemd) - คู่มือแนะนำการรันโหนดโดยใช้`systemd` เพื่อที่จะให้โหนดทำงานในพื้นหลังและรันอัตโนมัติเมื่อปิดเปิดเครื่องใหม่
- [How to Upgrade your Validator](maintain-guides-how-to-upgrade) - Guide for securely upgrading your validator when you want to switch to a different machine or begin running the latest version of client code.

## เอกสารอ้างอิง

- [วิธีรันโหนด Polkadot โดยใช้ Docker](https://medium.com/@acvlls/setting-up-a-maintain-the-easy-way-3a885283091f)
- [A Serverless Failover Solution for Web3.0 Validator Nodes](https://hackernoon.com/a-serverless-failover-solution-for-web-3-0-validator-nodes-e26b9d24c71d) - บทความที่ให้รายละเอียดเกี่ยวกับวิธีสร้างระบบเพื่อรันโหนดตรวจสอบที่เสถียรและทนทานต่อข้อบกพร่อง
- [วิธีการขอ DOTs บนเครือข่ายทดลอง](learn-DOT#getting-testnet-dots)
- [ลิสต์ VPS](maintain-guides-how-to-validate-kusama#vps-list)
- [Polkadot Validator Lounge](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) - ห้องแชทสำหรับสนทนาเกี่ยวกับการเป็นผู้ตรวจสอบ
- [Slashing Consequences](https://wiki.polkadot.network/docs/en/learn-staking#slashing) - Learn more about slashing consequences for running a validator node.

## ความปลอดภัย / การจัดการดูแลคีย์

- [ภาพรวมเกี่ยวกับความปลอดภัยของผู้ตรวจสอบ](https://github.com/w3f/validator-security)

## เครื่องมือตรวจสอบ

- [Polkadot Telemetry Service](https://telemetry.polkadot.io/#/Alexander) - ข้อมูลเครือข่าย รวมถึงข้อมูลว่าโหนดใดบ้างที่ทำงานบนเครือข่ายที่ระบุ รุ่นซอฟต์แวร์ที่ใช้งานอยู่ และสถานะการ sync
- [Polkadash](http://polkadash.io/) - เครื่องมือตรวจสอบ
- [ลิงค์ที่มีประโยชน์อื่น ๆ](https://forum.web3.foundation/t/useful-links-for-validators/20)
