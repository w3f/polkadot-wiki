---
id: build-guides-install-linux
title: Linux
sidebar_label: Linux
description: Install dependencies for Linux
keywords: [coretime, blockspace, parathread, parachain, cores]
slug: ../build-guides-install-linux
---

Rust supports most Linux distributions. Depending on the specific distribution and version of the
operating system you use, you might need to add some software dependencies to your environment. In
general, your development environment should include a linker or C-compatible compiler such as
`clang` and an appropriate integrated development environment (IDE).

## Before you begin

Check the documentation for your operating system for information about the packages that are
installed and how to download and install any additional packages you might need. For example, if
you use Ubuntu, you can use the Ubuntu Advanced Packaging Tool (`apt`) to install the
`build-essential` package:

```bash
sudo apt install build-essential
```

At a minimum, you need the following packages before you install Rust:

```text
clang curl git make
```

Because the blockchain requires standard cryptography to support the generation of public/private
key pairs and the validation of transaction signatures, you must also have a package that provides
cryptography, such as `libssl-dev` or `openssl-devel`.

## Install required packages and Rust

To install the Rust toolchain on Linux:

1. Log on to your computer and open a terminal shell.

2. Check the packages you have installed on the local computer by running an appropriate package
   management command for your Linux distribution.

3. Add any package dependencies you are missing to your local development environment by running an
   appropriate package management command for your Linux distribution.

   For example, on Ubuntu Desktop or Ubuntu Server, you might run a command similar to the
   following:

   ```bash
   sudo apt install --assume-yes git clang curl libssl-dev protobuf-compiler
   ```

   Click the tab titles to see examples for other Linux operating systems:

   <figure class='tabbed'>

   [[tabbedCode]] |```Debian | sudo apt install --assume-yes git clang curl libssl-dev llvm
   libudev-dev make protobuf-compiler

   [[tabbedCode]] |```Arch | pacman -Syu --needed --noconfirm curl git clang make protobuf

   [[tabbedCode]] | ```fedora | sudo dnf update | sudo dnf install clang curl git openssl-devel make
   protobuf-compiler

   [[tabbedCode]] | ```opensuse | sudo zypper install clang curl git openssl-devel llvm-devel
   libudev-devel make protobuf

   </figure>

   Remember that different distributions might use different package managers and bundle packages in
   different ways. For example, depending on your installation selections, Ubuntu Desktop and Ubuntu
   Server might have different packages and different requirements. However, the packages listed in
   the command-line examples are applicable for many common Linux distributions, including Debian,
   Linux Mint, MX Linux, and Elementary OS.

4. Download the `rustup` installation program and use it to install Rust by running the following
   command:

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

5. Follow the prompts displayed to proceed with a default installation.

6. Update your current shell to include Cargo by running the following command:

   ```bash
   source $HOME/.cargo/env
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

stable-x86_64-unknown-linux-gnu (default)
rustc 1.62.1 (e092d0b6b 2022-07-16)

# rustup +nightly show

active toolchain
----------------

nightly-x86_64-unknown-linux-gnu (overridden by +toolchain on the command line)
rustc 1.65.0-nightly (34a6cae28 2022-08-09)
```
