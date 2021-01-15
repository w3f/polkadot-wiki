---
id: learn-account-generation
title: 开始生成帐户
sidebar_label: 创建帐户
description: Step-by-step guides on generating a Polkadot account.
---

在波卡中有多种方法可以生成Polkadot地址，该章节主要详细介绍波卡账户地址的：

- 推荐给大多数用户的Polkadot {.js}浏览器插件
- **最安全的** [Subkey](#subkey)
- [Polkadot-JS 应用](#polkadotjs)
- [Parity Signer](#parity-signer)
- [Vanity Generator](#vanity-generator)
- [硬件钱包](learn-ledger)

> 要了解有关如何创建 Polkadot 帐户的更多信息，请观看我们的[视频](https://www.youtube.com/watch?v=hhUZ40ZWqkE&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=19)

## 免责声明：密钥安全

用户的密钥种子是访问账户的_唯一_方法，所以大家一定要确保密钥的隐私安全，如果密钥种子外泄，获得密钥的人可以获得账户操控权，并威胁到账户里的资金安全。这里提出多种账户生成方法，这些方法在便利性和安全性上各有不同，在生成账户地址之前建议仔细研究，以保证选择的账户生成方式不会造成账户安全威胁，确保资金安全。

### 密钥的安全存储

种子是您账户的 **密钥** 。 知道种子可以让您或任何知道 种子的人重新生成和控制这个帐户。

必须将种子存放在安全、秘密和安全的地方。 如果您无法访问您的 账户，您可以通过输入种子重新创建它。 这也意味着，如果其他人能够访问您的种子，就可以对您的帐户拥有 控制权。

为了获得最大的安全性，应将种子记录在纸上或其他非数字设备上，并存放在安全的地方。您可能还希望保护种子免受物理损坏（例如，通过存储在密封的塑料袋中以防止水损坏，将其存储在防火保险箱中等）。建议您将种子的多个副本存储在在地理位置上分开的位置（例如，一个放在您的家庭保险箱中，一个放在您的银行保险箱中）。

绝不建议将种子存储在将来可以访问或可以访问互联网的任何类型的计算机上。

## Polkadot{.js} 浏览器插件

Polkadot {.js}插件提供了安全性和可用性之间的合理平衡。它提供了一个单独的本地机制来生成您的地址并与 Polkadot 交互。

此方法涉及安装Polkadot {.js}插件，并将其用作“虚拟保管库”，与您的浏览器分开，以存储私钥，还可以进行交易签名和类似功能。

它仍在您用于连接到 Internet 的同一台计算机上运行，因此比使用 Parity Signer 或其他空白协议的安全性低。

### 安装浏览器插件

浏览器插件可用于 [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) 和 [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension)。

如果你想要了解更多或查看你自己的插件代码， 您可以访问 Github [源代码仓库](https://github.com/polkadot-js/extension)

安装插件后，您应该在浏览器的菜单栏 中看到橙色和白色 Polkadot{.js} 的图标。

![plugin-02](assets/accounts/polkadot_plugin_js_02.jpg)

### 打开账户

导航到[Polkadot Apps](https://polkadot.js.org/apps)。点击“帐户”标签。它位于屏幕左侧的侧栏中。

![plugin-03](assets/accounts/polkadot_plugin_js_03.jpg)

### 创建新账户

点击浏览器顶部栏上的徽标打开Polkadot{.js} 浏览器扩展。 您将看到一个单独的浏览器窗口打开。 如果您以前使用过此扩展，您可以看到以前生成的帐户的列表。无论如何，您将看到两个按钮：“我想用新的助记词创建一个帐户”和“我有一个原有的助记词， 导入帐户。"

单击“我想要用新的助记词创建一个帐户”。

![plugin-04](assets/accounts/polkadot_plugin_js_04.jpg)

然后，Polkadot {.js}插件将使用系统随机性为您创建一个新助记词，并以十二个单词的形式向您显示。

您应该备份这些密钥。必须将助记词存储在安全，秘密和安全的地方。如果由于某种原因无法通过Polkadot {.js}访问帐户，则只需重新输入助记词即可再次访问您的帐户。

![plugin-05](assets/accounts/polkadot_plugin_js_05.jpg)

请查看之前提到的关于[如何安全存储您的密钥](#disclaimer-key-security) 的信息。

### 账户命名

您无法编辑助记词。然而，您应该在下面的文本框中添加此账户 的描述性名称 (e). “Bob”、“Jane”或“Office Account”）。

### 输入密码

在输入帐户名称后，您可以输入密码的文本框将会出现。当您开始输入时，新的文本框将出现在下方，在第二个文本框中输入相同的密码。 如果您的密码不匹配，插件将不允许您生成账户。

请注意，此密码将保护你在插件中的数据以及你从插件中导出的任何备份文件。 它不会保护您的助记词。 如果有人知道你的十二个单词助记词， 即使他们不知道密码，他们仍然可以控制您的帐户。

![plugin-06](assets/accounts/polkadot_plugin_js_06.jpg)

### 查看帐户

一旦您的两次密码匹配，程序将显示将为您生成的帐户信息。

![plugin-07](assets/accounts/polkadot_plugin_js_07.jpg)

单击“用生成的种子添加帐户”。 您将被带回插件的主页，现在应该包含您生成的帐户。

### 将 Polkadot 主网设置为地址

现在我们得确保地址是 Polkadot 主网地址。

点击插件窗口顶部的“选项”。

![plugin-08](assets/accounts/polkadot_plugin_js_08.jpg)

在“显示格式化地址”下拉菜单中，选择"Polkadot (live)，然后单击"后退"。

![plugin-09](assets/accounts/polkadot_plugin_js_09.jpg)

### 获取地址

验证您的地址第一个字符是否是“1”，这表示它是 Polkadot 主网地址。

![plugin-10](assets/accounts/polkadot_plugin_js_10.jpg)

您可以通过双击地址本身的字符串来复制地址( 例如,在 Windows 或 Linux, OS X 上使用Control-C)。 不要点击表示您账户的图标(不同颜色点的六边形) - 这将复制一个 Kusama 版本的地址。

请确保您选择了显示出来地址得全部字符。请注意，当您粘贴它时，您会看到比显示的更多的 个字符。

![plugin-11](assets/accounts/polkadot_plugin_js_11.jpg)

### 复制地址

您现在可以从地址文本框复制并粘贴地址，现在您有一个 纯文本得 Polkadot 主网地址 。

注意一个不同格式的地址总是可以转换为 Polkadot 地址，这是由于相同的公钥可以用于在不同的网络上生成地址。 然而，为了便于使用和理解，最好确保您总是使用 Polkadot 主网地址。

## Subkey

推荐习惯用命令行和编译Rust 代码的极客们使用子密钥。 子密钥允许您在任何可以编译代码的设备上生成密钥。子密钥也有助于在 iOS 或 Android 或其他特定用途的设备上自动生成账户。 但不推荐普通用户使用。

For detailed build and usage instructions of subkey, please see [here](https://github.com/paritytech/substrate/tree/master/bin/utils/subkey).

![subkey-01](assets/accounts/subkey_01.jpg)

## Polkadot-JS

> 请注意！ 如果您使用 Polkadot-JS 在您的浏览器中创建您的帐户并清除您的 cookie， 如果您不 [备份](learn-account-restore)，您的账户将会永远丢失。请确保您 将您的种子短语存储在一个安全的地方，或者使用Polkadot{.js} 浏览器扩展应用下载账户的 JSON 密钥文件。   [在这里](learn-account-restore)了解更多关于帐户备份和恢复的信息

不建议在没有插件的情况下使用 Polkadot-JS 用户界面。这是生成帐户的最不安全的方法。仅在您遇到其他所有方法都不可行时才应使用该方法。

### 转到 Polkadot-JS 应用程序

导航到 [Polkadot-JS 应用程序](https://polkadot.js.org/apps) 并点击位于您屏幕顶部的导航栏账户选项卡下面的“帐户”。

![pjs-01](assets/accounts/polkadot_js_01.png)

> 注意：以上的屏幕截图显示已连接到 Polkadot 网络。要在其他网络上创建帐户，您需要单击导航菜单左上角的网络选择。将会出现一个弹出式侧边栏，其中列出了可供选择的实时，测试和自定义节点。当您要切换网络时，请记住点击“切换”按钮。

### 开始生成帐户

点击"添加帐户"按钮。

![pjs-02](assets/accounts/polkadot_js_02.png)

您应该会看到一个类似于此处的弹出窗口，必填的文本字段以粉红色高亮显示。

![pjs-03](assets/accounts/polkadot_js_03.jpg)

您可以忽略“高级”创建选项。您将必须输入一个帐户名和一个密码来保护您的帐户。确保选择一个安全且难以猜测的密码。请注意，此处将接受任何内容作为密码。请注意：不会检查它是否足够长或安全。您将来与该帐户进行任何互动或从该帐户进行交易时都需要此密码。

当您输入了两者的有效信息时，文字框的颜色将会从粉红色转为 白色。

![pjs-04](assets/accounts/polkadot_js_04.jpg)

请查看之前提到的关于[如何安全存储您的密钥](#disclaimer-key-security) 的信息。

### 创建和备份账户

点击“保存”，您的帐户将被创建。它还会生成一个备份文件，您应该将其保存到计算机中。理想情况下，您还可以将其保存在外部硬盘驱动器或拇指驱动器上，或者将其打印出来，以便以后重新输入。您不应该将其存储在云存储中，也不要通过电子邮件发送给自己，等等。

您可以使用此备份文件来还原您的帐户。除非用密码解密，否则此备份文件不可读。

![pjs-05](assets/accounts/polkadot_js_05.png)

### 多签账户

多签账户是由多个标准账户（或甚至其他 多签名账户）创建的账户。 想了解关于多重签名的完整讲解，请参阅 [多重签名的账户解释部分](learn-accounts#multi-signature-accounts)。

在 [账户](https://polkadot.js.org/apps/#/accounts) 标签页上，点击 `Multisig(多签)` 按钮, 输入阈值并添加签名者。阈值（表示要成功提交外部必须有多少成员同意）必须小于或等于签名者的数目。 然后，点击 `创建`。

![Multi-sig account creation](/img/accounts/create-multisig.png)

这只是计算多签名地址并将其添加到您的用户界面。 帐户目前还不存在，和普通账户一样需要满足 [账户存款和回收](learn-accounts#existential-deposit-and-reaping) 规则。

假定我们这个账号已经有一些余额了，现在我们想要从多签账户发送到另一个账户。

![从多签名帐户发送](/img/accounts/send-from-multi.png)

下一步是用满足阈值的多个帐户签名交易； 在上面的 例子中，三个人中必须有两个签名。

![从多签名帐户签名](/img/accounts/sign-from-multi-1.png)

当前 UI 中显示没有多签账户 有待处理的交易。 这意味着 第二签名者必须 **完整重复调用** 才能签名。换句话说：

- 如果 Alice 发起了从多钱账户给 Ferdie 转账150个币的交易，链中将有一 个待处理的交易。
- 如果 Bob 发起了从多钱账户给 Ferdie 转账250个币的交易，链中将有**另一个** 待处理的交易，并且第一个交易还没有完成。
- 因为阈值是 2/3，Charlie 现在可以通过重复 执行所需交易来完成任意这两笔交易。

其它调用方式完全一样――如果一个多签账户想要成为理事会成员的话， 候选人 必须来自多签账户， 但每个签名人都得签名(重新请求)，直到达到 个阈值。

各方签名参与人应在链外进行沟通，以防止交易无法执行和链上冲突的交易。

## Parity Signer

Parity Signer 是一个将你的 DOT 安全存储在物理设备上的方法。 强烈建议 您在安装 后关闭 wifi、蜂窝网络、蓝牙、NFC 和任何其他通信方法。 如果您已开启任何通信方式， 您将在右上角的红色中看到一个“未屏蔽”图标，这 表示您的连接可能不安全。

### 创建帐号

点击“创建”来创建身份，如果您以前备份过了助记词，则点击“恢复”。 您可以在一个设备上拥有多个账户，每个账户可以管理不同的网络上的多个地址。

![Parity Signer Create Account 1](assets/accounts/ps-create-1.jpg)

### 账户命名

输入您的身份名称，然后点击“创建”。

![Parity Signer Create Account 2](assets/accounts/ps-create-2.jpg)

### 备份账户

Parity Signer 将为您生成一个用于恢复账户的助记词，并以12或24个单词 的形式显示它。

您应该在纸上写下这个助记词，并将其存储在某个安全和秘密的地方，。 出于某种原因您不能通过您的手机访问您的帐户。 您可以在另一个安装了 Parity Signer 的手机上重新输入您的恢复助记词，并再次访问您的帐户。这是恢复您的帐户的唯一途径，任何有权访问这些单词 的人也可以访问您的帐户。 因此，最好把它们写下来并在多个安全的地方存储 它们！

![Parity Signer Create Account 3](assets/accounts/ps-create-3.jpg)

请查看之前提到的关于[如何安全存储您的密钥](#disclaimer-key-security) 的信息。

### 设置 PIN 码

在确认您已备份您的助记词后，将出现一个新的文本框，您可以在其中设置一个 PIN，PIN 码应至少包含 6 位数字。 如果 PIN 码不匹配，它将不允许 您创建一个帐户。 在签名任何交易时，或者保护敏感操作（例如删除一个身份或显示助记词）将会使用PIN码。

注意，如果有人知道您助记词中的 12/24单词， 即使他们不知道 PIN，他们仍然可以控制您的帐户 。

![Parity Signer Create Account 4](assets/accounts/ps-create-4.jpg)

### 获取地址

通过单击网络名称，选择要在其上创建地址的网络。例如，如果您选择“ Polkadot”，则将以该身份为您创建一个新的 Polkadot 地址。

![Parity Signer Create Account 5](assets/accounts/ps-create-5.jpg)

### 您的地址

地址将显示为 QR 码。您可以通过以下方法将地址导入 Polkadot-JS Apps：访问已连接Internet的计算机上的[账户(Accounts)](https://polkadot.js.org/apps/#/accounts) 页面，然后单击“通过QR添加”，然后按照说明添加帐户。以这种方式创建的帐户将始终要求您使用 Parity Signer 设备签名邮件。它只会通过扫描和显示QR码来做到这一点，即使是完全控制您连接互联网的计算机的人，也可以与 Parity Signer 设备进行交互的范围非常小且范围有限，这可以继续保护您的密钥安全。

![Parity Signer Create Account 6](assets/accounts/ps-create-6.jpg)

## 硬件钱包

要使用 Ledger 硬件钱包创建地址并将令牌保存在冷库中，请按照[Ledger 硬件钱包指南页面](learn-ledger)上的说明进行操作。

## 靓号地址(Vanity Generator)

靓号地址是[Polkadot-JS UI上](https://polkadot.js.org/apps/#/accounts/vanity) 的工具，可让您生成包含特定子字符串的地址。

![Vanity Generator page ](assets/polkadot_vanity_generator_page.png)

可变性生成器具有以下参数：

- “搜索”: 您想要在您的新地址中包含的子字符串。
- "区分大小写": "是", 如果搜索是区分大小写; "否" 如果不是。
- “密钥对加密类型”：指定您要生成的帐户类型；建议在大多数情况下使用Schnorrkel，以确保安全。

如果您已填写上面的所有详细信息并单击“开始生成”按钮，则将在屏幕上开始生成帐户列表。请注意，取决于子字符串的长度和计算机的处理速度，可能需要一些时间才能生成帐户。

![Vanity Generator search](assets/polkadot_vanity_generate.png)

"保存"按钮将允许您保存生成的帐户- 如果您不选择 不会保存它。 下一步和[在UI界面创建帐户](#polkadotjs)的步骤是完全相同的，需要输入密码和名称，并且自动下载您的帐户的备份文件。

![Vanity Generator chosen address](assets/polkadot_save_account.png)
