#!/usr/bin/env python3
"""
MkDocs Documentation Migration Script

This script reorganizes documentation files according to a new Information Architecture.
It will either move existing files to new locations or create TODO placeholders for missing content.
"""

import os
import shutil
from pathlib import Path
from typing import Dict, List, Tuple

# Base directory for documentation
DOCS_DIR = Path("docs")

# Target Mapping Dictionary
# Keys: target path relative to docs/
# Values: tuple of (Page Title, List of Source Keywords)
TARGET_MAP = {
    # Section: Get Started
    "getting-started/web3.md": ("Web3 and Polkadot", ["web3-and-polkadot", "web3"]),
    
    # Subsection: Introduction
    "getting-started/introduction/what-is-polkadot.md": ("What Is Polkadot?", ["what-is-polkadot", "getting-started", "explore-index"]),
    "getting-started/introduction/mission.md": ("Mission and Philosophy", ["polkadot-vision", "mission"]),
    "getting-started/introduction/tokenomics.md": ("Tokenomics and DOT token", ["learn-DOT", "tokenomics"]),
    "getting-started/introduction/evolution.md": ("Polkadot's Evolution: From Today to JAM", ["learn-jam-chain", "jam-chain", "evolution"]),

    # Subsection: Accounts
    "getting-started/accounts/index.md": ("Create Your First Polkadot Account", ["create-your-first-account", "learn-accounts"]),
    "getting-started/accounts/what-is-account.md": ("What Is a Polkadot Account?", ["what-is-account"]),
    "getting-started/accounts/wallets.md": ("Recommended Polkadot Wallets", ["wallets-and-extensions", "recommended-wallets"]),
    "getting-started/accounts/polkadot-js.md": ("Create an Account with Polkadot.js", ["learn-polkadot-js", "create-account-polkadot-js"]),
    "getting-started/accounts/talisman.md": ("Create an Account with Talisman", ["talisman"]),
    "getting-started/accounts/subwallet.md": ("Create an Account with SubWallet", ["subwallet"]),
    "getting-started/accounts/security.md": ("Account Security Best Practices", ["stay-safe", "security-best-practices", "account-security"]),
    "getting-started/accounts/backup.md": ("Backing Up Your Account Safely", ["backup-account", "backing-up"]),

    # Subsection: Staking Journey
    "getting-started/staking/index.md": ("Introduction to Staking on Polkadot", ["learn-staking", "intro-staking"]),
    "getting-started/staking/npos.md": ("How Nominated Proof-of-Stake (NPoS) Works", ["learn-phragmen", "npos-works"]),
    "getting-started/staking/roles.md": ("Validators and Nominators: Roles Explained", ["learn-nominator", "validators-and-nominators"]),
    "getting-started/staking/choosing-validators.md": ("How to Choose Reliable Validators", ["learn-guides-nominator", "choose-reliable-validators"]),
    "getting-started/staking/stake-js.md": ("Stake DOT Using Polkadot.js", ["learn-staking-polkadotjs"]),
    "getting-started/staking/stake-talisman.md": ("Stake DOT Using Talisman", ["learn-staking-talisman"]),
    "getting-started/staking/stake-subwallet.md": ("Stake DOT Using SubWallet", ["learn-staking-subwallet"]),
    "getting-started/staking/rewards.md": ("Monitoring Staking Rewards", ["learn-staking-rewards", "monitoring-rewards"]),
    "getting-started/staking/nominations.md": ("Managing Your Nominations", ["manage-nominations"]),
    "getting-started/staking/unbonding.md": ("Unbonding and Withdrawing Stake", ["unbonding", "withdrawing-stake"]),
    "getting-started/staking/mistakes.md": ("Common Staking Mistakes to Avoid", ["staking-mistakes"]),

    # Subsection: Governance Journey
    "getting-started/governance/index.md": ("Introduction to Polkadot Governance", ["learn-governance", "intro-governance"]),
    "getting-started/governance/mechanics.md": ("How Polkadot Governance Works", ["learn-polkadot-opengov", "governance-works"]),
    "getting-started/governance/voting.md": ("Voting on Referenda", ["learn-guides-vote", "voting-referenda"]),
    "getting-started/governance/proposing.md": ("Submitting a Proposal", ["learn-guides-proposal", "submitting-proposal"]),
    "getting-started/governance/delegation.md": ("Delegating Your Vote", ["learn-guides-delegation", "delegating-vote"]),
    "getting-started/governance/tracking.md": ("Tracking Governance Activity", ["tracking-governance"]),

    # Section: Knowledge Base
    "knowledge-base/account-abstraction.md": ("Account Abstraction", ["learn-account-abstraction"]),
    "knowledge-base/account-balances.md": ("Account Balances", ["learn-account-balances"]),
    "knowledge-base/accounts-general.md": ("Accounts", ["accounts-general"]),
    "knowledge-base/asset-hub.md": ("Asset Hub", ["learn-assets", "asset-hub"]),
    "knowledge-base/coretime-marketplaces.md": ("Coretime Marketplaces", ["coretime-marketplaces"]),
    "knowledge-base/coretime-parachains.md": ("Coretime Parachains", ["coretime-parachains"]),
    "knowledge-base/dot-ksm-bridge.md": ("DOT-KSM Bridge", ["learn-dot-ksm-bridge"]),
    "knowledge-base/hyperbridge.md": ("Hyperbridge", ["learn-hyperbridge"]),
    "knowledge-base/identity.md": ("Identity", ["learn-identity"]),
    "knowledge-base/kusama.md": ("Kusama", ["kusama-getting-started", "kusama"]),
    "knowledge-base/multisig.md": ("Multi-signature", ["learn-account-multisig", "multisig"]),
    "knowledge-base/nft-projects.md": ("NFT Projects", ["learn-nft-projects"]),
    "knowledge-base/nfts.md": ("NFTs", ["learn-nft"]),
    "knowledge-base/nomination-pools.md": ("Nomination Pools", ["learn-nomination-pools"]),
    "knowledge-base/nominator.md": ("Nominator", ["nominator"]),
    "knowledge-base/parachains.md": ("Parachains", ["learn-parachains"]),
    "knowledge-base/parachains-faq.md": ("Parachains FAQ", ["parachains-faq"]),
    "knowledge-base/opengov.md": ("Polkadot OpenGov", ["opengov-index"]),
    "knowledge-base/opengov-origins.md": ("Polkadot OpenGov Origins", ["learn-polkadot-opengov-origins"]),
    "knowledge-base/technical-fellowship.md": ("Polkadot Technical Fellowship", ["learn-polkadot-technical-fellowship"]),
    "knowledge-base/proxies.md": ("Proxies", ["learn-proxies"]),
    "knowledge-base/pure-proxies.md": ("Pure Proxies", ["learn-proxies-pure"]),
    "knowledge-base/rollups.md": ("Rollups & Interoperability", ["learn-comparisons-rollups", "rollups"]),
    "knowledge-base/smart-contracts.md": ("Smart Contracts", ["smart-contracts-kb"]),
    "knowledge-base/snowbridge.md": ("Snowbridge", ["learn-snowbridge"]),
    "knowledge-base/staking-advanced.md": ("Staking (Advanced)", ["learn-staking-advanced"]),
    "knowledge-base/staking-polkadot.md": ("Staking on Polkadot", ["staking-polkadot-kb"]),
    "knowledge-base/system-chains.md": ("System Chains", ["learn-system-chains"]),
    "knowledge-base/teleport.md": ("Teleport", ["learn-teleport"]),
    "knowledge-base/transactions.md": ("Transactions", ["learn-transactions"]),
    "knowledge-base/validator.md": ("Validator", ["learn-validator", "validator-guide"]),
    "knowledge-base/scams.md": ("Scams", ["learn-scams"]),
    "knowledge-base/transaction-attacks.md": ("Transaction Attacks", ["transaction-attacks"]),
    "knowledge-base/community.md": ("Community", ["general-community"]),
    "knowledge-base/contributing.md": ("Contributing", ["contributing"]),
    "knowledge-base/contributors.md": ("Contributors", ["contributors"]),
    "knowledge-base/faq.md": ("FAQ", ["faq"]),
    "knowledge-base/glossary.md": ("Glossary", ["glossary"]),
    "knowledge-base/funding.md": ("Funding Opportunities", ["funding"]),
    "knowledge-base/foundation.md": ("Polkadot Community Foundation", ["polkadot-community-foundation"]),
    "knowledge-base/ecosystem-funds.md": ("Ecosystem Funds", ["ecosystem-funds"]),
    "knowledge-base/open-source.md": ("Open Source", ["open-source", "build-open-source"]),
    "knowledge-base/metadata.md": ("Metadata", ["metadata"]),
    "knowledge-base/jam.md": ("JAM", ["jam-conceptual", "learn-jam"]),
    "knowledge-base/offenses.md": ("Offenses", ["learn-offenses"]),

    # Section: Build
    # Subsection: Introducing the Toolkit
    "build/toolkit/what-is-sdk.md": ("What Is the Polkadot SDK?", ["build-pdk", "what-is-sdk"]),
    "build/toolkit/building-high-level.md": ("Building with the Polkadot SDK: A High-Level View", ["building-sdk-high-level"]),
    "build/toolkit/parachains-apps.md": ("Parachains and Application-Specific Blockchains", ["app-specific-blockchains"]),
    "build/toolkit/modular-design.md": ("How Modular Blockchain Design Works on Polkadot", ["modular-blockchain-design"]),
    
    "build/polkadot-cloud.md": ("Polkadot Cloud", ["polkadot-cloud"]),
    "build/polkadot-smart-contracts.md": ("Polkadot Smart Contracts", ["polkadot-smart-contracts"]),

    # Subsection: Smart Contracts (Conceptual)
    "build/smart-contracts/polkadot.md": ("Smart Contracts on Polkadot", ["smart-contracts-polkadot"]),
    "build/smart-contracts/how-it-works.md": ("How Smart Contracts Work in the Polkadot Ecosystem", ["smart-contracts-work"]),
    "build/smart-contracts/ink-overview.md": ("ink! and Smart Contract Development (Overview)", ["ink-development"]),
    "build/smart-contracts/vs-parachains.md": ("When to Use Smart Contracts vs Parachains", ["contracts-vs-parachains"]),

    # Subsection: Solutions
    "build/solutions/identity.md": ("Identity", ["build-identity"]),
    "build/solutions/assets.md": ("Assets", ["build-assets", "integrate-assets"]),
    "build/solutions/proof-of-personhood.md": ("Proof of Personhood", ["proof-of-personhood"]),
    "build/solutions/storage.md": ("Storage", ["build-storage"]),
    "build/solutions/polkadot-products.md": ("Polkadot Products", ["polkadot-products"]),

    # Section: Reference
    "reference/accounts-advanced.md": ("Accounts (Advanced)", ["learn-account-advanced"]),
    "reference/agile-coretime.md": ("Agile Coretime (Scheduling)", ["learn-agile-coretime"]),
    "reference/architecture.md": ("Architecture", ["learn-architecture"]),
    "reference/async-backing.md": ("Asynchronous Backing (Pipelining)", ["learn-async-backing", "async-backing"]),
    "reference/bridges.md": ("Bridges", ["learn-bridges"]),
    "reference/collator.md": ("Collator", ["learn-collator"]),
    "reference/collectives.md": ("Collectives", ["collectives"]),
    "reference/consensus.md": ("Consensus", ["learn-consensus"]),
    "reference/cryptography.md": ("Cryptography", ["learn-cryptography"]),
    "reference/elastic-scaling.md": ("Elastic Scaling (Parallel Computing)", ["learn-elastic-scaling"]),
    "reference/elves-protocol.md": ("ELVES Protocol (Parachains Protocol)", ["elves-protocol"]),
    "reference/host-implementations.md": ("Host Implementations", ["learn-polkadot-host"]),
    "reference/nft-pallets.md": ("NFT Pallets", ["learn-nft-pallets"]),
    "reference/phragmen.md": ("NPoS Election Algorithms (Phragmen)", ["learn-phragmen", "phragmen"]),
    "reference/polkadot-host.md": ("Polkadot Host", ["polkadot-host-reference"]),
    "reference/runtime-upgrades.md": ("Runtime Upgrades", ["learn-runtime-upgrades"]),
    "reference/safrole.md": ("Safrole", ["learn-safrole"]),
    "reference/spree.md": ("SPREE", ["learn-spree"]),
    "reference/xcm.md": ("XCM", ["learn-xcm"]),
    "reference/xcm-instructions.md": ("XCM Instructions", ["learn-xcm-instructions"]),
    "reference/xcm-pallet.md": ("XCM Pallet", ["learn-xcm-pallet"]),
    "reference/xcm-transport.md": ("XCM Transport", ["learn-xcm-transport"]),
    "reference/xcm-use-cases.md": ("XCM Use Cases", ["learn-xcm-usecases"]),
    "reference/xcvm.md": ("XCM Virtual Machine (XCVM)", ["learn-xcvm"]),
}


def find_file_by_keywords(keywords: List[str], docs_dir: Path) -> Path | None:
    """
    Search for a file in the docs directory that matches any of the given keywords.
    Matching is case-insensitive and checks if the keyword appears in the filename.
    
    Args:
        keywords: List of keywords to search for
        docs_dir: Base documentation directory
        
    Returns:
        Path to the first matching file, or None if no match found
    """
    if not docs_dir.exists():
        return None
        
    # Convert keywords to lowercase for case-insensitive matching
    keywords_lower = [kw.lower() for kw in keywords]
    
    # Walk through all markdown files in docs/
    for md_file in docs_dir.rglob("*.md"):
        # Get the filename without extension
        filename = md_file.stem.lower()
        
        # Check if any keyword matches
        for keyword in keywords_lower:
            if keyword in filename:
                return md_file
    
    return None


def create_todo_file(target_path: Path, title: str) -> None:
    """
    Create a new TODO file with placeholder content.
    
    Args:
        target_path: Full path where the file should be created
        title: Page title to use in the content
    """
    content = f"""# {title}

TODO: Content needs to be written or migrated for this topic.
"""
    
    # Ensure parent directories exist
    target_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Write the file
    target_path.write_text(content, encoding="utf-8")
    print(f"[CREATED TODO]: {target_path.relative_to(DOCS_DIR)}")


def move_file(source_path: Path, target_path: Path) -> None:
    """
    Move a file from source to target location.
    
    Args:
        source_path: Current location of the file
        target_path: Desired location for the file
    """
    # Ensure parent directories exist
    target_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Move the file
    shutil.move(str(source_path), str(target_path))
    print(f"[MOVED]: {source_path.relative_to(DOCS_DIR)} -> {target_path.relative_to(DOCS_DIR)}")


def migrate_documentation(dry_run: bool = False) -> Dict[str, int]:
    """
    Main migration function that processes all entries in TARGET_MAP.
    
    Args:
        dry_run: If True, only print what would happen without making changes
        
    Returns:
        Dictionary with statistics: moved, created, skipped counts
    """
    stats = {"moved": 0, "created": 0, "skipped": 0}
    
    print(f"Starting documentation migration...")
    print(f"Base directory: {DOCS_DIR.absolute()}")
    print(f"Dry run mode: {dry_run}")
    print("-" * 80)
    
    for target_rel_path, (title, keywords) in TARGET_MAP.items():
        target_path = DOCS_DIR / target_rel_path
        
        # Check if target already exists
        if target_path.exists():
            print(f"[EXISTS]: {target_rel_path}")
            stats["skipped"] += 1
            continue
        
        # Search for existing file matching keywords
        source_file = find_file_by_keywords(keywords, DOCS_DIR)
        
        if source_file:
            # File found - move it
            if not dry_run:
                move_file(source_file, target_path)
            else:
                print(f"[DRY RUN - WOULD MOVE]: {source_file.relative_to(DOCS_DIR)} -> {target_rel_path}")
            stats["moved"] += 1
        else:
            # File not found - create TODO
            if not dry_run:
                create_todo_file(target_path, title)
            else:
                print(f"[DRY RUN - WOULD CREATE TODO]: {target_rel_path}")
            stats["created"] += 1
    
    print("-" * 80)
    print("Migration Summary:")
    print(f"  Files moved: {stats['moved']}")
    print(f"  TODO files created: {stats['created']}")
    print(f"  Files skipped (already exist): {stats['skipped']}")
    print(f"  Total processed: {sum(stats.values())}")
    
    return stats


def main():
    """Main entry point for the script."""
    import sys
    
    # Check if running in dry-run mode
    dry_run = "--dry-run" in sys.argv or "-d" in sys.argv
    
    if dry_run:
        print("=" * 80)
        print("DRY RUN MODE - No changes will be made")
        print("=" * 80)
        print()
    
    # Verify docs directory exists
    if not DOCS_DIR.exists():
        print(f"ERROR: Documentation directory '{DOCS_DIR}' does not exist!")
        print(f"Current working directory: {Path.cwd()}")
        print("Please run this script from the repository root.")
        sys.exit(1)
    
    # Run the migration
    stats = migrate_documentation(dry_run=dry_run)
    
    if dry_run:
        print()
        print("=" * 80)
        print("To execute the migration, run without --dry-run flag")
        print("=" * 80)


if __name__ == "__main__":
    main()
