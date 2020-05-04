---
id: learn-crosschain
title: Berlalunya pesan lintas-rantai (XCMP)
sidebar_label: Berlalunya pesan lintas-rantai (XCMP)
---

Transaksi lintas-rantai diselesaikan menggunakan mekanisme antrian sederhana yang berbasis di sekitar pohon Merkle untuk memastikan kesetiaan. Merupakan tugas validator rantai-relay untuk memindahkan transaksi pada antrian output dari satu parachain ke dalam antrian input dari parachain tujuan.

Antrian input dan output kadang-kadang disebut dalam basis kode sebagai pesan "masuk" dan "keluar".

## Tinjauan

- Pesan lintas-rantai *bukan* tidak akan melanjutkan ke rantai relai.
- Pesan lintas rantai akan dibatasi hingga ukuran maksimum dalam byte.
- Parachain diizinkan untuk memblokir pesan dari parachain lain, dalam hal ini parachain pengirim akan mengetahui blok ini.
- Node kolator bertanggung jawab untuk merutekan pesan antar rantai.
- Kolektor menghasilkan daftar pesan "keluar" dan akan menerima pesan "masuk" dari parachain lain.
- Di setiap blok, parachains diharapkan untuk merutekan pesan dari beberapa subset dari semua parachain lainnya.
- Ketika seorang kolektor menghasilkan blok baru untuk diserahkan kepada validator, ia akan mengumpulkan informasi antrian masuk terbaru dan memprosesnya.
- Validator akan memeriksa bukti bahwa kandidat baru untuk blok parachain berikutnya mencakup pemrosesan pesan masuk yang diharapkan ke parachain itu.

## Contoh

Sebuah kontrak pintar yang ada pada parachain A akan merutekan pesan ke parachain B di mana kontrak pintar lain disebut yang melakukan transfer beberapa aset dalam rantai itu.

Charlie mengeksekusi kontrak pintar pada parachain A yang memulai pesan lintas-rantai baru untuk tujuan kontrak pintar pada parachain B.

Node kolator parachain A akan menempatkan pesan rantai-silang baru ini ke dalam antrian pesan keluar, bersama dengan ` tujuan ` dan ` timestamp `.

Node kolator parachain B secara rutin mengirim semua node collator lainnya yang meminta pesan baru (difilter oleh bidang ` tujuan `). Ketika kolektor parachain B melakukan ping berikutnya, ia akan melihat pesan baru ini di parachain A dan menambahkannya ke antrian masuk sendiri untuk diproses ke blok berikutnya.

Validator untuk parachain A juga akan membaca antrian keluar dan mengetahui pesannya. Validator untuk parachain B akan melakukan hal yang sama. Ini agar mereka dapat memverifikasi pengiriman pesan yang terjadi.

Ketika kolektor parachain B sedang membangun blok berikutnya dalam rantainya, ia akan memproses pesan baru dalam antrian masuknya serta pesan lain yang mungkin telah ditemukan / diterima.

Selama pemrosesan, pesan akan mengeksekusi kontrak pintar pada paragraf B dan menyelesaikan transfer aset seperti yang dimaksudkan.

Kolator sekarang menyerahkan blok ini ke validator, yang dengan sendirinya akan memverifikasi bahwa pesan ini diproses. Jika pesan diproses dan semua aspek lain dari blok valid, validator akan menyertakan blok ini untuk parachain B ke dalam rantai relai.

## Sumber daya

- [ Skema XCMP ](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Deskripsi teknis lengkap tentang komunikasi lintas rantai pada wiki penelitian Web3 Foundation.
