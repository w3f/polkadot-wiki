#!/bin/bash

node_modules/.bin/prettier -c docs/*.md
if [ $? -eq 1] then
    git config --global user.email "polkadot-wiki-deploy@users.noreply.github.com"
    git config --global user.name "Polkadot Wiki CI"
    echo "machine github.com login w3fbot password $GITHUB_TOKEN" > ~/.netrc
    node_modules/.bin/prettier -c docs/*.md --write
    git add -A; git commit -m "Ran prettier"; git push;
fi
