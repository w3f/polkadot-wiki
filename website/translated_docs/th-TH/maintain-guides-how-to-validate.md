---
id: maintain-guides-how-to-validate
title: How to validate
sidebar_label: How to validate
---

__หมายเหตุ: คู่มือนี้ใช้สำหรับเครือข่ายทดลอง Alexander ที่อยู่ใน branch รุ่น v0.4 ของ Polkadot repo__

การเป็นผู้ตรวจสอบที่ดี คุณควรจะ

- มี DOTs สำหรับวางเป็นหลักประกัน (**ข้อกำหนดพื้นฐาน**).
- อัปเดตโหนดของคุณให้เป็นเวอร์ชันล่าสุด
- มีความรู้เกี่ยวกับความปลอดภัยของเครือข่ายเพียงพอที่จะสร้างเครือข่ายที่ปลอดภัย

คุณ**ไม่**ควรที่จะรันโหนดตรวจสอบ หากคุณมี DOT แต่ไม่มีความรู้ด้านเทคนิคเพียงพอที่จะตั้งค่าโหนดตรวจสอบ หากเป็นกรณีนี้คุณควรใช้ DOT ของคุณเสนอชื่อคนที่คุณไว้วางใจ

ผู้เสนอชื่อสามารถได้รับรางวัล คุณสามารถเสนอชื่อผู้ตรวจสอบหลายคนได้ หากคุณต้องการทราบข้อมูลเพิ่มเติมเกี่ยวกับผู้เสนอชื่อ อ่านเพิ่มเติมได้ [ที่นี่](maintain-nominator).

สำหรับคู่มือนี้เราใช้ Ubuntu 18.04 และจะรันโหนดบนเครือข่ายทดลอง Alexander PoC-4 ไม่ว่าคุณจะใช้ระบบปฏิบัติการใด การตั้งค่าไม่น่าจะแตกต่างกันมาก มีตัวเลือก [VPS](#vps-list) มากมาย คุณสามารถเลือกได้ตามใจชอบ

_โปรดตรวจสอบให้แน่ใจว่าคุณ**ไม่**ได้ใช้การตั้งค่านี้บน mainnet ของ Polkadot หรือ Kusama คู่มือแนะนำนี้จะสอนคุณเกี่ยวกับวิธีการตั้งค่าและรันโหนดบนเครือข่ายทดลอง Alexander หากคุณต้องการรันโหนดตรวจสอบบนเครือข่ายจริง คุณจะต้องระมัดระวังหลายจุด เช่นการจัดการดูแลคีย์ การป้องกันจาก DDoS และความพร้อมใช้งาน_

## ติดตั้ง Rust

```bash
curl https://sh.rustup.rs -sSf | sh
sudo apt install make clang pkg-config libssl-dev
```

คำสั่งแรกจะดาวน์โหลด Rust เวอร์ชันล่าสุดของและทำการติดตั้ง ดำเนินการคำสั่งที่สองเพื่อติดตั้ง dependencies ที่จำเป็นสำหรับ Polkadot

```bash
rustup update
```

หากคุณติดตั้ง Rust เรียบร้อยแล้ว ให้รันคำสั่งนี้เพื่อตรวจสอบว่ามีเวอร์ชั่นใหม่หรือไม่

## ติดตั้ง `polkadot` PoC-4

จนกว่า one-line installer จะรองรับ PoC-4 คุณจะต้อง build `polkadot` จาก source

**คุณต้องระบุรุ่น nightly แบบ เฉพาะเพื่อติดตั้ง PoC-4** กรุณาทำตามวิธีด้านล่าง:

```
rustup toolchain install nightly-2019-07-14
rustup default nightly-2019-07-14
rustup target add wasm32-unknown-unknown --toolchain nightly-2019-07-14
```

หลังจากเปลี่ยน default toolchain เป็น `nightly-2019-07-14` คำสั่งด้านล่างควรทำงานได้ปกติ

```bash
git clone https://github.com/paritytech/polkadot.git
# To update your node. Run from this step.
cd polkadot
cargo clean
git checkout v0.4
git pull origin v0.4
./scripts/init.sh
./scripts/build.sh
cargo install --path ./ --force
```

อาจต้องใช้เวลาสักพักขึ้นอยู่กับฮาร์ดแวร์ของคุณ!

## ซิงค์ Chain Data

ตอนนี้คุณสามารถเริ่มรันโหนด Polkadot ของตัวเองได้ คุณสามารถเริ่มการซิงโครไนซ์ chain โดยดำเนินการคำสั่งต่อไปนี้:

```bash
polkadot --chain alex
```

ขั้นตอนนี้จะใช้เวลาอย่างน้อยสองสามชั่วโมง

คุณสามารถตรวจสอบบล็อกสูงสุดในปัจจุบันผ่าน [Telemetry](https://telemetry.polkadot.io/#/Alexander) หรือ [PolkadotJS Block Explorer](https://polkadot.js.org/apps/#/explorer).

## สร้างบัญชี

การเป็นผู้ตรวจสอบ คุณจะต้องมีสามบัญชีแยกต่างหากสำหรับการจัดการเงินของคุณ สามบัญชีนั้นคือบัญชี `stash`, `controller` และ `session` หากคุณต้องการทราบข้อมูลเพิ่มเติม อ่านได้[ที่นี่](learn-staking#accounts).

![create account](assets/guides/how-to-validate/polkadot-dashboard-create-account.jpg) ก่อนแรก ไปที่ [PolkadotJS => Account](https://polkadot.js.org/apps/#/accounts) แลกคลิกปุ่ม `add account`

เพื่อช่วยในการแยกแยะบัญชีของคุณในภายหลัง แนะนำให้ใช้คำว่า `stash`, `controller` และ `session` ในชื่อบัญชีสามอันของคุณ คุณจะได้รับ mnemonic seed phrase ซึ่งช่วยในการจำบัญชี คุณสามารถบันทึกข้อมูลนี้ไว้ในที่ปลอดภัย ออฟไลน์ หรือคุณสามารถเลือกที่จะบันทึกบัญชีของคุณโดยเก็บเป็น JSON keyfile ที่จะถูกสร้างขึ้นโดยอัตโนมัติเมื่อคลิกที่ปุ่ม `Save` รหัสผ่านที่จำเป็นในการสร้างบัญชีจะถูกใช้เพื่อเซ็น transaction ต่างๆ สำหรับแต่ละบัญชี และยังจะถูกใช้เพื่อเข้ารหัสไฟล์ JSON keyfile และจะต้องการมันถ้าคุณต้องการกู้คืนบัญชีของคุณโดยใช้ไฟล์นี้

คุณต้องสร้างสามบัญชี:

1. Stash
2. Controller
3. Session

You can use either sr25519 or ed25519 for your Stash and Controller keys and must use `Edwards (ed25519)` for your Session key.

Mnemonic phrase สำหรับบัญชี Session จะต้องใช้ในภายหลังในคู่มือนี้เพื่อทำการตรวจสอบ คุณควรบันทึกมันไว้อย่างปลอดภัย

![backup seed](assets/guides/how-to-validate/polkadot-overview.jpg)

## วิธีการขอโทเคน DOTs ของเครือข่ายทดลอง

ก่อนทำขั้นตอนต่อไปนี้ คุณจะต้องได้มี DOT ของเครือข่ายทดลองในบัญชี `stash` และ `controller` เพื่อที่จะทำการสร้าง transaction และใช้ DOT พวกนี้เป็นหลักประกัน บัญชี `session` ไม่จำเป็นต้องมี DOT ชม[เพจ DOTs](learn-DOT#getting-testnet-dots) สำหรับคำแนะนำในการขอรับ DOT ของเครือข่ายทดลอง แต่ละบัญชีของคุณควรมีอย่างน้อย 150 milliDOTs เพื่อให้มีพอสำหรับการฝากเงินและค่าธรรมเนียมการทำธุรกรรม

## วาง DOT เป็นหลักประกัน

ได้เวลาแล้วสำหรับการตั้งค่าบัญชีตรวจสอบของเรา เราต้องทำสิ่งต่อไปนี้:

- ทำการล็อค DOT ของบัญชี `stash` DOT เหล่านี้จะถูกวางเป็นหลักประกันเพื่อความปลอดภัยของเครือข่ายและอาจถูกยึดได้
- เลือกบัญชี `controller` บัญชีนี้จะเป็นบัญชีที่ตัดสินใจว่าเริ่มหรือหยุดการตรวจสอบตอนไหน
- เลือกบัญชี `session` seed ของบัญชีนี้จะถูกใช้ไปรันโหนด

ก่อนแรกไปที่ส่วน [Staking ](https://polkadot.js.org/apps/#/staking/actions) และคลิกที่ปุ่ม "New Stake"

![dashboard bonding](assets/guides/how-to-validate/polkadot-dashboard-bonding.jpg)

- **Stash account** - เลือกบัญชี `stash` ที่เราจะทำการวางเงินประกันจำนวน 100 milliDOTs ควรเช็คให้แน่ใจว่าบัญชีดังกล่าวมีเงินเพียงพอ
- **Controller account** - เลือกบัญชี `controller` จะสร้างขึ้นก่อนหน้านี้
- **Value bonded** - ใส่จำนวน DOT จากบัญชี `stash` ที่ต้องการจะล็อคเป็นเงินประกัน คุณสามารถเพิ่มจำนวนเงินประกันได้ภายหลัง แต่การถอนเงินประกันจะต้องรอจนกว่าระยะเวลาประกันเสร็จสิ้น (หลายเดือน ณ ขณะที่เขียนบทความนี้)
- **Payment destination** - เลือกบัญชีที่จะรอรับเงินรางวัล อ่านข้อมูลเพิ่มเติมได้ [ที่นี่](learn-staking#reward-distribution).

หลังจากกรอกทุกอย่างเรียบร้อยแล้ว คลิกที่ปุ่ม `Bond` และทำการเซ็น transaction (โดยใช้บัญชี `stash`)

## ตั้งค่า Session Key

ตอนนี้คุณควรจะเห็นโซนใหม่พร้อมกับบัญชีทั้งหมดของคุณ ค่า bonded amount ทางด้านขวาจะตรงกับเงินที่คุณวางเป็นหลักประกันของบัญชี `stash`

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-set-session-key.jpg)

คลิกบน `Set Session Key` หลังจากนั้นทำการเลือกบัญชี `session` ที่สร้างขึ้นก่อนหน้านี้และคลิกปุ่ม `Set Session Key`.

## การตรวจสอบ

ตอนนี้คุณควรจะเห็นปุ่ม `Validate` และ `Nominate` สำหรับ Session Key ของคุณ

ณ จุดนี้ ก่อนที่จะเริ่มการตรวจสอบ คุณควรเช็คให้แน่ใจว่าโหนดได้ทำการซิงค์เรียบร้อย ให้ทำการเปิด terminal และรันโหนดตรวจสอบโดยใช้ seed หรือ mnemonic ของบัญชี `session` เช่น

```bash
polkadot --chain alex --validator --key="SESSION_ACCOUNT_SEED" --name NAME_ON_TELEMETRY
```

กรุณาตรวจสอบให้แน่ใจว่า address ที่ถูกสร้างจาก seed นั้นตรงกับ address ของบัญชี `session` ของคุณ ไม่ต้องกังวลหากอักขระตัวหลังๆ มีการเปลี่ยนแปลง มันเป็นเพียงเช็คซัมที่เปลี่ยนไปเมื่อเร็ว ๆ นี้

![terminal session key verification](assets/guides/how-to-validate/polkadot-node-seed.jpg)

เพื่อตรวจสอบว่าโหนดของคุณทำงานอยู่จริงและอยู่ในโหมดซิงค์แล้วให้ไปที่ [Telemetry](https://telemetry.polkadot.io/#/Alexander) หลังจากนั้นไม่กี่วินาทีข้อมูลโหนดของคุณจะปรากฏขึ้น

หากทุกอย่างเป็นไปด้วยดี ให้ทำการคลิกที่ปุ่ม `Validate` ใน Polkadot UI

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate.jpg) ![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate-modal.jpg)

- **Unstake Threshold** - ติดตั้งค่าถูกรายงานว่าออฟไลน์สูงสุดกี่ครั้ง (และถูกตัดเงิน) ก่อนที่จะถูกดึงออกจากกลุ่มผู้ตรวจสอบ การตั้งค่าที่สูงจะช่วยให้คุณออฟไลน์ได้นานขึ้นก่อนที่จะถูกตัดเงิน แต่คุณจะถูกตัดเงินหนักมากขึ้น
- **Reward Commission** - เลือกจำนวนเงินรางวัลที่คุณจะเก็บไว้ ส่วนที่เหลือจะถูกแบ่งปันให้กับคุณและผู้ที่เสนอชื่อคุณ

คลิก `Validate`.

ไปที่แท็บ Staking คุณจะห็นรายการของผู้ตรวจสอบที่กำลังทำงานอยู่ ที่ด้านบนของหน้า จะแสดงจำนวนสล็อตผู้ตรวจสอบที่ยังเหลืออยู่ และจำนวนโหนดที่ต้องการจะเป็นผู้ตรวจสอบ

![staking queue](assets/guides/how-to-validate/polkadot-dashboard-staking-queue.jpg)

โหนดของคุณจะปรากฏในคิว *next up* ในยุค (era) ถัดไป (ไม่เกิน 1 ชั่วโมง) หากคุณมีผู้สนับสนุนที่เสนอชื่อคุณเพียงพอ โหนดของคุณจะกลายเป็นผู้ตรวจสอบที่สามารถเริ่มทำงานได้

**ขอแสดงความยินดี!**

> หากคุณต้องการรันโหนดตรวจสอบโดยใช้ `systemd` สามารถอ่านคู่มือวิธีทำได้[ที่นี่](maintain-guides-how-to-systemd).

**หมายเหตุ: ** ยิ่งเข้าใกล้ถึงเวลาปล่อย mainnet มากขึ้น สล็อตสำหรับทดสอบจะเพิ่มขึ้น

## ลิสต์ VPS

* [OVH](https://www.ovh.com.au/)
* [Digital Ocean](https://www.digitalocean.com/)
* [Vultr](https://www.vultr.com/)
* [Linode](https://www.linode.com/)
* [Contabo](https://contabo.com/)
* [Scaleway](https://www.scaleway.com/)
