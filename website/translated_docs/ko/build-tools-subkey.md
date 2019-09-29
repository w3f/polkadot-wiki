---
id: build-tools-subkey
title: Subkey
sidebar_label: Subkey
---

서브키(subkey, 이하 subkey로 통일 - 역자 주)는 서브스트레이트(Substrate)가 생성한 키(key)나 복원된 서브스트레이트 키(Key)가 포함 되어 있는 커맨드리인 유틸리티입니다.

`subkey` 는 [sr25519](http://wiki.polkadot.network/en/latest/polkadot/learn/cryptography/#keypairs-and-signing) 암호를 기본적으로 사용 할 것입니다.이전 ed25519 암호화를 사용하여 키를 생성하거나 복원해야 할 경우`--ed25519` 플래그를 커맨드에 입력하세요.

## 사용방법 (Usage)

### 무작위 계정 생성하기 (Generate a random account)

```bash
subkey generate
```

새 계정의 니모닉(mnemonic phrase)과 시드, 공개 키 및 주소를 제공합니다. 어떤 누구에게도 당신의 니모닉이나 시드를 공유하지 마세요. 만약 공유한다면 당신의 자산에 접속 할 수 있게 됩니다. 누군가 당신에게 이체를 하고 있다면 **Address** 만 필요합니다.

주어진 URI (니모닉, 시드, 공개키 또는 address)를 검사할 수 있고 공개키와 address를 복원할 수 있습니다.

### Key 검사하기(Inspecting a key)

`subkey`는 STDIN에서 오는 메시지를 기다립니다. 메시지에 서명하는 한 가지 방법은 다음과 같습니다.

```bash
subkey inspect <mnemonic,seed,pubkey,address>

OUTPUT:
  Public key (hex): 0x461edcf1ba99e43f50dec4bdeb3d1a2cf521ad7c3cd0eeee5cd3314e50fd424c
  Address (SS58): 5DeeNqcAcaHDSed2HYnqMDK7JHcvxZ5QUE9EKmjc5snvU6wF
```

### 서명하기 (Signing)

Vanity generator를 사용하여 사용자가 원하는 패턴을 가진 address를 주는 시드를 찾을 수 있습니다. 그러나 하드웨어에 따라 다소 시간이 걸릴 수 있습니다.

```bash
echo <msg> | subkey sign <seed,mnemonic>

OUTPUT:
a69da4a6ccbf81dbbbfad235fa12cf8528c18012b991ae89214de8d20d29c1280576ced6eb38b7406d1b7e03231df6dd4a5257546ddad13259356e1c3adfb509
```

### 서명 증명하기 (Verifying a signature)

```bash
echo <msg> | subkey verify <sig> <address>

OUTPUT:
Signature verifies correctly.
```

### vanity generator 사용하기

You can use the included vanity generator to find a seed that provides an address which includes the desired pattern. Be warned, depending on your hardware this may take a while.

```bash
subkey vanity 1337
```
