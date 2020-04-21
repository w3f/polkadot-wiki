---
id: build-deploy-parachains
title: Cara melihat dan menggunakan parachains
sidebar_label: Cara melihat dan menggunakan parachains
---

Panduan ini telah diperbarui untuk bekerja dengan testnet Alexander.

## Cara melihat parachains

Pada [ UI Polkadot ](https://polkadot.js.org/apps/#/explorer) navigasikan ke tab ` Keadaan Rantai `. Pilih modul ` parachains ` dan ` parachains () ` lalu tekan tombol ` + `. Ini akan mengembalikan array dari parachains yang saat ini aktif.

## Cara menyebarkan parachain Adder

**Cara menantang parachain Adder.**

Parachain ` adder ` adalah parachain sederhana yang akan menyimpan nilai dalam penyimpanan dan menambah nilai ini saat pesan dikirim ke sana. Itu dapat ditemukan di repositori Polkadot di bawah folder ` test-parachains `.

> Versi video yang sedikit ketinggalan zaman dari panduan ini yang disajikan oleh Adrian Brink tersedia [ di sini ](https://www.youtube.com/watch?v=pDqkzvA4C0E). Ketika kedua panduan ini berbeda, silakan merujuk teks tertulis ini sebagai definitif dan diperbarui.

### Membangun kode

Langkah pertama adalah mengunduh secara lokal kode Polkadot dan beralih ke cabang ` v0.4 `.

```bash
git clone https://github.com/paritytech/polkadot.git
cd polkadot
git checkout v0.4
```

Sekarang pastikan Anda telah menginstal Rust.

```bash
curl https://sh.rustup.rs -sSf | sh
sudo apt install make clang pkg-config libssl-dev
rustup update
```

Sekarang navigasikan ke folder ` test-parachains ` di repositori kode Polkadot dan jalankan skrip build.

```bash
cd test-parachains
./build.sh
```

Ini akan membuat Wasm dieksekusi dari parachain ` adder ` sederhana yang terkandung dalam folder ini. Parachain ini hanya akan menambahkan pesan yang dikirim ke sana. Wasm executable akan menampilkan ke jalur ` parachains / test / res / adder.wasm ` jadi pastikan Anda dapat menemukannya di sana.

Anda perlu membangun dan menjalankan node collator untuk mendapatkan status asal dari parachain ini.

Navigasikan ke direktori ` test-parachains / adder / collator ` dan jalankan perintah ` build ` dan ` run `.

```bash
cargo build
cargo run
[ctrl-c]
```

Jangan ragu untuk menghentikan node collator segera. Anda akan mendapatkan beberapa output yang terlihat seperti ini:

```
Starting adder collator with genesis:
Dec: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 27, 77, 3, 221, 140, 1, 241, 4, 145, 67,
207, 156, 76, 129, 126, 75, 22, 127, 29, 27, 131, 229, 198, 240, 241, 13, 137, 186, 30, 123, 206]
Hex: 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000011b4d03dd8c01f1049143cf9c4c817e4b167f1d1b83e5c6f0f10d89ba1e7bce
```

Informasi penting adalah string hex. Ini adalah kondisi awal Anda dan Anda harus menyimpannya untuk langkah selanjutnya.

### Menjalankan parachain

Buka [ UI Polkadot ](https://polkadot.js.org/apps/#/extrinsics) pada tab ` Extrinsics `. Pilih akun dari mana Anda ingin menggunakan parachain. Anda perlu membuat referendum untuk menggunakan parachain.

Klik pada `democracy` -> `propose(proposal,value)` -> `parachains` -> `registerParachain(id,code,initial_head_data)`.

Pada input ` id ` masukkan id dari parachain. Dalam kasus adder sederhana, itu akan menjadi ` 100 `. Di bidang ` kode ` klik pada tombol halaman dan kemudian unggah biner ` adder.wasm ` yang telah dikompilasi dari sebelumnya. Dalam ` initial_head_data ` kami akan menyalin dan menempelkan data hex yang kami dapatkan dari menjalankan node collator. Dalam bidang ` value ` Anda harus memasukkan nilai minimum yang diperlukan untuk membuat referendum. Pada saat penulisan ini <em x-id = "4"> 5 DOT </em> di Alexander testnet.

![mendaftarkan parachain](assets/parachain/register.png)

Jika Anda menavigasi ke tab ` Demokrasi ` Anda akan dapat melihat proposal Anda di bagian proposal.

Setelah Anda menunggu proposal menjadi referendum, Anda akan dapat memilih ` Tidak ` atau ` Aye ` di atasnya. Mungkin, Anda akan memilih Aye karena ini akan menjadi suara untuk penyebaran parachain Anda.

![referendum parachain](assets/parachain/referendum.png)

Setelah periode pemungutan suara referendum Anda berlangsung, Anda akan dapat menanyakan keadaan parachain Anda.

Anda dapat pergi ke tab ` Status Rantai ` dan dengan menanyakan kondisi ` parachains ` Anda harus dapat melihat beberapa informasi tentang parachain Anda.

![info parachain](assets/parachain/info.png)

### Berinteraksi dengan parachain

_Segera hadir_
