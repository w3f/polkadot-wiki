---
id: build-cumulus
title: Cumulus
sidebar_label: Cumulus
---

> Awan cumulus berbentuk semacam titik-titik dan naik di udara, seperti proyek ini (karena merupakan prototipe awal - harapkan ganti nama ketika semakin dingin.)

[ Cumulus ](https://github.com/paritytech/cumulus) adalah ekstensi untuk Substrate yang membuatnya mudah untuk membuat setiap runtime yang dibuat Substrate menjadi parachain yang kompatibel dengan Polkadot.

## Komponen

### Konsensus Kumulus

<em x-id = "3"> cumulus-consensus </em> adalah mesin konsensus untuk Substrat yang mengikuti rantai relai Polkadot. Ini akan menjalankan simpul Polkadot secara internal, dan mendikte klien dan algoritma sinkronisasi yang berantai untuk mengikuti, menyelesaikan, dan memperlakukan sebagai yang terbaik.

### Cumulus Runtime

Pembungkus di sekitar runtime Media untuk memungkinkan mereka divalidasi oleh validator Polkadot dan memberikan rutinitas pembuatan saksi. Itu menambahkan API ` validate_block ` ke antarmuka eksternal Substrat yang akan dipanggil oleh validator.

Mengintegrasikannya ke dalam runtime media Anda akan semudah mengimpor peti dan menambahkan makro satu baris ini ke kode Anda.

``` rust
runtime:: register_validate_block! (Block, BlockExecutor);
```

### Pengumpul Kumulus

Seorang kolektor Polkadot yang direncanakan untuk parachain.

## Sumber daya

- [Pembicaraan Rob dari EthCC memperkenalkan Cumulus](https://www.youtube.com/watch?v=thgtXq5YMOo)
