---
id: learn-architecture
title: Arsitektur
sidebar_label: Arsitektur
---

Polkadot adalah multichain heterogen dengan keamanan scalable dan protokol interoperabilitas.

## Rantai-relay

Relai-rantai adalah rantai pusat Polkadot. Semua validator Polkadot dipertaruhkan pada rantai-relai di DOT dan memvalidasi untuk rantai relai. Relai-rantai terdiri dari sejumlah kecil jenis transaksi yang mencakup cara untuk berinteraksi dengan mekanisme tata kelola, lelang parachain, dan berpartisipasi dalam NPoS. Transaksi pada rantai-relai kemungkinan akan dihargai lebih tinggi daripada pada parachains. Ini karena sebagian besar pekerjaan komputasi diharapkan akan didelegasikan ke parachains yang memiliki implementasi dan fitur yang berbeda.

## [Parachains](build-deploy-parachains)

Sebagian besar perhitungan yang terjadi di seluruh jaringan Polkadot secara keseluruhan akan didelegasikan ke implementasi parachain spesifik yang menangani berbagai kasus penggunaan. Polkadot tidak membatasi apa yang dapat dilakukan oleh parachain selain bahwa mereka harus dapat menghasilkan bukti yang dapat divalidasi oleh validator yang ditugaskan ke parachain. Beberapa parachains mungkin spesifik DApp, yang lain mungkin fokus pada fitur-fitur khusus seperti privasi atau skalabilitas - yang lain mungkin arsitektur eksperimental yang tidak harus blockchain di alam.

## Keadaan bersama

Polkadot memiliki status bersama antara rantai-relai dan semua parachain yang terhubung. Jika rantai relai harus kembali karena alasan apa pun, maka semua parachains juga akan kembali. Ini untuk memastikan bahwa validitas keseluruhan sistem dapat bertahan dan tidak ada bagian individu yang dapat rusak.

Keadaan bersama membuatnya agar asumsi kepercayaan saat menggunakan parachain Polkadot hanya dari rangkaian validator rantai relai, dan tidak ada yang lain. Karena validator yang ditetapkan pada rantai relai diharapkan aman dengan sejumlah besar pasak dipasang di belakangnya, maka diinginkan bagi parachains untuk mendapatkan manfaat dari keamanan ini.

## Serial papan tulis

For a video overview of the architecture of Polkadot watch the video below for the whiteboard interview with W3F researcher Alistair Stewart:  <iframe width="560" height="315" src="https://www.youtube.com/embed/xBfC6uTjvbM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
