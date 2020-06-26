# Deployment

This repository hosts both the Kusama Guide and the Polkadot Wiki.

## Steps

### Common

- Run `yarn`
- Run `yarn mirror`

### IPFS

- Run `yarn kusama:build`
- Run `yarn kusama:inject`
- Run `yarn polkadot:build`
- Run `yarn polkadot:inject`

### GH Pages

- Run `yarn kusama:publish-gh-pages`
- Run `yarn polkadot:publish-gh-pages`
