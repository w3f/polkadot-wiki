---
id: build-guides-install-macos
title: macOS
sidebar_label: macOS
description: Install dependencies for macOS
keywords: [coretime, blockspace, parathread, parachain, cores]
slug: ../build-guides-install-macos
---

You can install Rust and set up a Substrate development environment on Apple macOS computers with
either Intel or an Apple M1 processors.

## Before you begin

Before you install Rust and set up your development environment on macOS, verify that your computer
meets the following basic requirements:

- Operating system version is 10.7 Lion, or later.
- Processor speed of at least 2Ghz, 3Ghz recommended.
- Memory of at least 8 GB RAM, 16 GB recommended.
- Storage of at 10 GB available space.
- Broadband Internet connection.

### Support for Apple Silicon

Protobuf must be installed before the build process can begin. To install it, run the following
command:

`brew install protobuf`

### Install Homebrew

In most cases, you should use Homebrew to install and manage packages on macOS computers. If you
don't already have Homebrew installed on your local computer, you should download and install it
before continuing.

To install Homebrew:

1. Open the Terminal application.

2. Download and install Homebrew by running the following command:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
   ```

3. Verify Homebrew has been successfully installed by running the following command:

   ```bash
   brew --version
   ```

   The command displays output similar to the following:

   ```bash
   Homebrew 3.3.1
   Homebrew/homebrew-core (git revision c6c488fbc0f; last commit 2021-10-30)
   Homebrew/homebrew-cask (git revision 66bab33b26; last commit 2021-10-30)
   ```

## Installation

Because the blockchain requires standard cryptography to support the generation of public/private
key pairs and the validation of transaction signatures, you must also have a package that provides
cryptography, such as `openssl`.

To install `openssl` and the Rust toolchain on macOS:

1. Open the Terminal application.

2. Ensure you have an updated version of Homebrew by running the following command:

   ```bash
   brew update
   ```

3. Install the `openssl` package by running the following command:

   ```bash
   brew install openssl
   ```

4. Download the `rustup` installation program and use it to install Rust by running the following
   command:

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

5. Follow the prompts displayed to proceed with a default installation.

6. Update your current shell to include Cargo by running the following command:

   ```bash
   source ~/.cargo/env
   ```

7. Verify your installation by running the following command:

   ```bash
   rustc --version
   ```

8. Configure the Rust toolchain to default to the latest stable version by running the following
   commands:

   ```bash
   rustup default stable
   rustup update
   rustup target add wasm32-unknown-unknown
   ```

9. Add the `nightly` release and the `nightly` WebAssembly (wasm) targets to your development
   environment by running the following commands:

   ```bash
   rustup update nightly
   rustup target add wasm32-unknown-unknown --toolchain nightly
   ```

10. Verify the configuration of your development environment by running the following command:

```bash
rustup show
rustup +nightly show
```

The command displays output similar to the following:

```bash
# rustup show

active toolchain
----------------

stable-x86_64-apple-darwin (default)
rustc 1.61.0 (fe5b13d68 2022-05-18)

# rustup +nightly show

active toolchain
----------------

nightly-x86_64-apple-darwin (overridden by +toolchain on the command line)
rustc 1.63.0-nightly (e71440575 2022-06-02)
```

11. Install `cmake` using the following command:

```
brew install cmake
```
