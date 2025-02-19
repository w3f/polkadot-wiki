# Polkadot Wiki MkDocs

A staging repository for starting the migration from Docusaurus to Mkdocs. This particularly repository uses [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## Install & Setup

- Make sure `python` (Python 3) and `pip` are installed and in your path
- It's recommended to use a virtual environment, as is common practice, but you can also just skip to the second step for simplicity

1. Enter the virtual environment:
```sh
# Create the env
python -m venv venv
# Enter the env
source venv/bin/activate
```

2. Install dependencies (make sure you're in the project's directory)
```sh
pip install -r requirements.txt
```

3. Once installed, run the serve command:
```sh
# If you're in a virtual env (set to false if you're not editing RPC commands, otherwise it will take time to load)
ENABLE_RPC=false mkdocs serve
# If you're not in a virtual env and this the above doesn't work
python -m mkdocs serve
```

## Migration

For documentation on migration, see: [MIGRATION.MD](MIGRATION.MD).