---
id: build-guides-install-deps
title: Install Polkadot SDK Dependencies
sidebar_label: Install Dependencies
description: Install dependencies for developing for using the Polkadot SDK
keywords: [coretime, blockspace, parathread, parachain, cores]
slug: ../build-guides-install-deps
---



## macOS

You can install Rust and set up a Substrate development environment on Apple macOS computers with
either Intel or an Apple M1 processors.

### Before you begin

Before you install Rust and set up your development environment on macOS, verify that your computer
meets the following basic requirements:

- Operating system version is 10.7 Lion, or later.
- Processor speed of at least 2Ghz, 3Ghz recommended.
- Memory of at least 8 GB RAM, 16 GB recommended.
- Storage of at 10 GB available space.
- Broadband Internet connection.

#### Support for Apple Silicon

Protobuf must be installed before the build process can begin. To install it, run the following
command:

`brew install protobuf`

#### Install Homebrew

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

### Installation

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

7. Configure the Rust toolchain to default to the latest stable version by running the following
   commands:

   ```bash
   rustup default stable
   rustup update
   rustup target add wasm32-unknown-unknown
   ```

8. Add the `nightly` release and the `nightly` WebAssembly (wasm) targets to your development
   environment by running the following commands:

   ```bash
   rustup update nightly
   rustup target add wasm32-unknown-unknown --toolchain nightly
   ```

9. [Verify your installation here.](#verifying-installation)

10. Install `cmake` using the following command:

```
brew install cmake
```

## Linux

Rust supports most Linux distributions. Depending on the specific distribution and version of the
operating system you use, you might need to add some software dependencies to your environment. In
general, your development environment should include a linker or C-compatible compiler such as
`clang` and an appropriate integrated development environment (IDE).

### Before you begin

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

### Install required packages and Rust

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

=== "Debian"

    ```sh
    sudo apt install --assume-yes git clang curl libssl-dev llvm libudev-dev make protobuf-compiler
    ```

=== "Arch"

    ```sh
    pacman -Syu --needed --noconfirm curl git clang make protobuf
    ```

=== "Fedora"

    ```sh
    sudo dnf update
    sudo dnf install clang curl git openssl-devel make protobuf-compiler
    ```

=== "openSUSE"

    ```sh
    sudo zypper install clang curl git openssl-devel llvm-devel libudev-devel make protobuf
    ```

Remember that different distributions might use different package managers and bundle packages in
different ways. For example, depending on your installation selections, Ubuntu Desktop and Ubuntu
Server might have different packages and different requirements. However, the packages listed in the
command-line examples are applicable for many common Linux distributions, including Debian, Linux
Mint, MX Linux, and Elementary OS.

1. Download the `rustup` installation program and use it to install Rust by running the following
   command:

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. Follow the prompts displayed to proceed with a default installation.

3. Update your current shell to include Cargo by running the following command:

   ```bash
   source $HOME/.cargo/env
   ```

4. Verify your installation by running the following command:

   ```bash
   rustc --version
   ```

5. Configure the Rust toolchain to default to the latest stable version by running the following
   commands:

   ```bash
   rustup default stable
   rustup update
   ```

6. Add the `nightly` release and the `nightly` WebAssembly (wasm) targets to your development
   environment by running the following commands:

   ```bash
   rustup update nightly
   rustup target add wasm32-unknown-unknown --toolchain nightly
   ```

7. [Verify your installation here.](#verifying-installation)

## Windows (WSL)

In general, UNIX-based operating systems—like macOS or Linux—provide a better development
environment for building Substrate-based blockchains.

However, if your local computer uses Microsoft Windows instead of a UNIX-based operating system, you
can configure it with additional software to make it a suitable development environment for building
Substrate-based blockchains. To prepare a development environment on a computer running Microsoft
Windows, you can use Windows Subsystem for Linux (WSL) to emulate a UNIX operating environment.

### Before you begin

Before installing on Microsoft Windows, verify the following basic requirements:

- You have a computer running a supported version of the Microsoft Windows operating system.
- You must be running Microsoft Windows 10, version 2004 or later, or Microsoft Windows 11 to
  install Windows Subsystem for Linux on a computer with the Windows desktop operating system.
- You must be running Microsoft Windows Server 2019, or later, to install Windows Subsystem for
  Linux on a computer with the Windows server operating system.
- You have good internet connection and access to a shell terminal on your local computer.

### Set up Windows Subsystem for Linux

Windows Subsystem for Linux (WSL) enables you to emulate a Linux environment on a computer that uses
the Windows operating system. The primary advantage of this approach for Substrate development is
that you can use all of the code and command-line examples as described in the Substrate
documentation. For example, you can run common commands—such as `ls` and `ps`—unmodified. By using
Windows Subsystem for Linux, you can avoid configuring a virtual machine image or a dual-boot
operating system.

To prepare a development environment using Windows Subsystem for Linux:

1. Check your Windows version and build number to see if Windows Subsystem for Linux is enabled by
   default.

   If you have Microsoft Windows 10, version 2004 (Build 19041 and higher), or Microsoft Windows 11,
   Windows Subsystem for Linux is available by default and you can continue to the next step.

   If you have an older version of Microsoft Windows installed, see
   [WSL manual installation steps for older versions](https://docs.microsoft.com/en-us/windows/wsl/install-manual).
   If you are installing on an older version of Microsoft Windows, you can download and install WLS
   2 if your computer has Windows 10, version 1903 or higher.

2. Select Windows PowerShell or Command Prompt from the Start menu, right-click, then **Run as
   administrator**.

3. In the PowerShell or Command Prompt terminal, run the following command:

   ```bash
   wsl --install
   ```

   This command enables the required WSL 2 components that are part of the Windows operating system,
   downloads the latest Linux kernel, and installs the Ubuntu Linux distribution by default.

   If you want to review the other Linux distributions available, run the following command:

   ```bash
   wsl --list --online
   ```

4. After the distribution is downloaded, close the terminal.

5. Click the Start menu, select **Shut down or sign out**, then click **Restart** to restart the
   computer.

   Restarting the computer is required to start the installation of the Linux distribution. It can
   take a few minutes for the installation to complete after you restart.

   For more information about setting up WSL as a development environment, see
   [Set up a WSL development environment](https://docs.microsoft.com/en-us/windows/wsl/setup/environment).

### Install required packages and Rust

To install the Rust toolchain on WSL:

1. Click the Start menu, then select **Ubuntu**.

2. Type a UNIX user name to create user account.

3. Type a password for your UNIX user, then retype the password to confirm it.

4. Download the latest updates for the Ubuntu distribution using the Ubuntu Advanced Packaging Tool
   (`apt`) by running the following command:

   ```bash
   sudo apt update
   ```

5. Add the required packages for the Ubuntu distribution by running the following command:

   ```bash
   sudo apt install --assume-yes git clang curl libssl-dev llvm libudev-dev make protobuf-compiler
   ```

6. Download the `rustup` installation program and use it to install Rust for the Ubuntu distribution
   by running the following command:

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

7. Follow the prompts displayed to proceed with a default installation.

8. Update your current shell to include Cargo by running the following command:

   ```bash
   source ~/.cargo/env
   ```

9. Verify your installation by running the following command:

   ```bash
   rustc --version
   ```

10. Configure the Rust toolchain to use the latest stable version as the default toolchain by
    running the following commands:

    ```bash
    rustup default stable
    rustup update
    ```

11. Add the `nightly` version of the toolchain and the `nightly` WebAssembly (`wasm`) target to your
    development environment by running the following commands:

    ```bash
    rustup update nightly
    rustup target add wasm32-unknown-unknown --toolchain nightly
    ```

12. [Verify your installation here.](#verifying-installation)

## Verifying Installation

Verify the configuration of your development environment by running the following command:

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
rustc 1.61.0 (fe5b13d68 2022-05-18)

# rustup +nightly show

active toolchain
----------------

nightly-x86_64-unknown-linux-gnu (overridden by +toolchain on the command line)
rustc 1.63.0-nightly (e7144
```

## Install `polkadot-parachain` and `chain-spec-builder`

The `polkadot-parachain` can be used a universal collator instance for running most of the
parachains (an
["omninode beta"](https://forum.polkadot.network/t/polkadot-parachain-omni-node-gathering-ideas-and-feedback/7823)).
It can be installed as follows:

```sh
cargo install --git https://github.com/paritytech/polkadot-sdk --tag polkadot-v1.15.1 --force polkadot-parachain-bin
```

`chain-spec-builder` is how you will generate chain specifications for your network. It requires a
`wasm` runtime bundle to generate the chain specification from.

It can be installed as follows:

> Note that chain-spec-builder only works with select Polkadot SDK versions (`<v1.13.0`)

```sh
cargo install staging-chain-spec-builder
```
