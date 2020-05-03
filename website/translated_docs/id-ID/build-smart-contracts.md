---
id: build-smart-contracts
title: Kontrak pintar
sidebar_label: Kontrak pintar
---

The Polkadot relay chain will not support smart contracts natively. However, parachains on Polkadot will support smart contracts. There are already announced projects such as [Edgeware](https://edgewa.re), and thanks to the Substrate built-in [contract module](https://crates.parity.io/srml_contract/index.html), it is likely that more parachains will support this feature.

## Sumber daya

Berikut adalah daftar sumber daya saat ini tersedia untuk pengembang yang ingin memulai menulis kontrak pintar untuk menggunakan parachains berdasarkan Substrate.

- [ tinta! ](https://github.com/paritytech/ink) - Tinta Parity untuk menulis kontrak pintar.
- [Substrate Contracts Workshop](https://substrate.dev/substrate-contracts-workshop/#/) - Walks you through the basics of writing and deploying an ERC20 token using `ink!`.

## Contoh

Dikumpulkan di bawah ini adalah beberapa contoh komunitas kontrak pintar dalam tinta `ink!`. Apakah Anda mengerjakan contoh kontrak pintar? Minta kami untuk menambahkannya ke halaman ini!

- [ Dimiliki ](https://github.com/JesseAbram/foRust/) - Port kontrak OpenZeppelin ` Ownable `.

## Apa perbedaan antara mengembangkan kontrak pintar versus parachain?

### Lapisan Abstraksi

Saat Anda menulis kontrak pintar, Anda membuat instruksi yang akan digunakan dan dikaitkan dengan alamat rantai tertentu.

Sebagai perbandingan, modul runtime adalah seluruh logika transisi status rantai (apa yang disebut fungsi transisi status).

Smart contracts must consciously implement upgradeability while parachains will have the ability to swap out their code entirely through a root command or via the governance module.

Ketika Anda membangun kontrak yang cerdas, pada akhirnya akan dikerahkan ke rantai target dengan lingkungannya sendiri. Parachains memungkinkan pengembang untuk menyatakan lingkungan rantai mereka sendiri, bahkan memungkinkan orang lain untuk menulis kontrak pintar untuk itu.

### Biaya Gas

Kontrak pintar harus menemukan cara untuk membatasi eksekusi mereka sendiri, atau node penuh rentan terhadap serangan DOS. Loop tak terbatas dalam kontrak pintar, misalnya, dapat menggunakan sumber daya komputasi seluruh rantai, mencegah orang lain menggunakannya. [ menghentikan masalah ](https://en.wikipedia.org/wiki/Halting_problem) menunjukkan bahwa dengan bahasa yang cukup kuat, tidak mungkin untuk mengetahui sebelumnya apakah suatu program akan pernah atau tidak akan pernah hentikan eksekusi. Beberapa platform, seperti Bitcoin, mengatasi kendala ini dengan menyediakan bahasa scripting yang sangat terbatas. Lainnya, seperti Ethereum, "menagih" kontrak pintar "gas" untuk hak untuk mengeksekusi kode mereka. Jika suatu kontrak pintar benar-benar masuk ke suatu keadaan di mana eksekusi tidak akan pernah berhenti, ia akhirnya kehabisan bensin, berhenti eksekusi, dan setiap transisi negara yang akan dibuat oleh kontrak pintar dibatalkan.

Parachains dapat mengimplementasikan bahasa pemrograman yang kuat secara sewenang-wenang dan juga tidak mengandung gagasan gas untuk logika asli mereka. Ini berarti bahwa beberapa fungsionalitas lebih mudah diimplementasikan untuk pengembang, tetapi itu juga berarti ada beberapa konstruksi, seperti perulangan tanpa syarat pengakhiran, yang harus _ tidak pernah _ diimplementasikan. Meninggalkan logika tertentu, seperti loop rumit yang mungkin dapat berjalan tanpa batas waktu, ke lapisan kontrak yang tidak cerdas, atau bahkan mencoba menghilangkannya sepenuhnya, akan sering menjadi pilihan yang lebih bijaksana.

## Sumber daya

- [ Kapan saya harus membangun runtime substrat versus kontrak pintar substrat ](https://stackoverflow.com/a/56041305) - Dari sudut pandang teknis, jawab pertanyaan kapan pengembang mungkin memilih untuk mengembangkan runtime versus kontrak pintar.
