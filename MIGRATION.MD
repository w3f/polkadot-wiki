
# Migration

Guidelines for migrating from Docusaurus to Mkdocs.


<!-- no toc -->
- [Migrating Structure](#migrating-structure)
- [Migrating Admonition](#migrating-admonitions)

## Migrating Structure

The Wiki is currently structured as follows: https://github.com/w3f/polkadot-wiki/blob/master/polkadot-wiki/sidebars.js

I am proposing we use the awesome pages mkdocs plugin, which is the same way we structure pages inside of Polkadot Docs. It is pretty simple to use, but will require us to port over the structure above to it (which needs to happen regardless).

An example of this is as follows: 

**Polkadot Wiki (current)**: 

```js
        {
          type: "category",
          label: "Wallets",
          description: 'Beginner friendly wallets with advanced features.',
          link: {
            type: 'generated-index',
            title: 'Wallets',
            description: 'Explore the different wallets and applications in the Polkadot and Kusama ecosystems.',
            slug: '/wallets-index',
          },
          items: [
            {
              type: 'link',
              label: 'Polkadot Ecosystem Wallets',
              description: 'Wallets listed on official Polkadot website.',
              href: 'https://polkadot.network/ecosystem/wallets/',
            },
            "general/wallets-and-extensions",
            "general/ledger",
            "general/polkadot-vault",
          ],
        },
```

**Mkdocs**: 

1. Create an `explore/wallets` folder, with a `.pages` file inside of it
2. In the root of `explore/`, there is a `.pages` file which details wallet, i.e.,: 

```txt
title: Explore
nav:
  - 'Explore': index.md
  - 'Getting Started': getting-started.md
  - wallets
 ```

3. Move the files specified in `sidebars.js` to `wallets/`, then update the `.pages` file in wallets accordingly: 

```txt
title: Wallets
nav:
  - 'Wallets and Extensions': wallets-and-extensions.md
  - 'Ledger': ledger.md
  - 'Polkadot Vault': polkadot-vault.md
```

4. Clean up the MD file metadata, as otherwise it won't render probably, for example: 

```diff
---
- id: wallets-and-extensions
title: Wallets and Extensions
- sidebar_label: Wallets and Extensions
description: An Overview of Wallets and Browser Extensions in the Polkadot Ecosystem.
- keywords: [wallets, account, signer, supported wallets, balance, token]
- slug: ../wallets-and-extensions
---
```

Rinse and repeat for each section, and we would've migrated the current structure to MKdocs.

## Migrating Admonitions

Goes from: 

```
:::info 
This is my info admonitions!
:::
```

to: 

```
!!!info 
    This is my info admonition!
```

Make sure the content is indented, otherwise it won't format properly.