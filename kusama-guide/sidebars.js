module.exports = {
  docs: [
    {
      type: "category",
      label: "Get Started",
      items: [
        "general/kusama/kusama-getting-started",
        "general/kusama/kusama-coc",
        "general/kusama/kusama-claims",
        "general/wallets",
        "general/polkadotjs",
        "learn/learn-balance-transfers",
        "learn/learn-auction",
        "learn/learn-parachains",
        "general/metadata",
        "learn/learn-parathreads",
        "learn/learn-bridges",
        "learn/learn-crowdloans",
        "general/kusama/kusama-parameters",
        "general/kusama/kusama-timeline",
        "general/kusama/kusama-community",
        "general/ambassadors",
        "maintain/kusama/maintain-guides-society-kusama",
        "general/contributing",
        {
          type: "category",
          label: "Programmes",
          items: [
            "general/grants",
            "general/builders-program",
            "general/doc-thousand-validators",
            "general/doc-thousand-contributors",
            ],  
        },
      ],
    },
    {
      type: "category",
      label: "What to Try",
      items: [
        {
          type: "category",
              label: "Accounts",
              items: [
                "learn/learn-account-generation",
                "general/kusama/kusama-social-recovery",
                "learn/learn-proxies",
              ],
        },
        {
          type: "category",
              label: "Assets",
              items: [
                "learn/learn-treasury",
                "learn/learn-assets",
                "general/kusama/kusama-statemine",
                "learn/learn-teleport",
              ],
        },
        {
          type: "category",
              label: "Identity",
              items: [
                "learn/learn-identity",
              ],
        },
        {
          type: "category",
              label: "Nominate",
              items: [
                "learn/learn-staking",
                "learn/learn-staking-advanced",
                "maintain/kusama/maintain-guides-how-to-nominate-kusama",
              ],
        },
        {
          type: "category",
              label: "Validate",
              items: [
                "maintain/kusama/maintain-guides-how-to-validate-kusama",
                "maintain/maintain-guides-how-to-stop-validating",
                "maintain/doc-maintain-guides-validator-community",
              ],
        },
        {
          type: "category",
              label: "Governance",
              items: [
                "learn/learn-governance",
                "learn/learn-opengov",
                "maintain/maintain-guides-how-to-join-council",
                "maintain/maintain-guides-how-to-vote-councillor",
              ],
        },
        {
          type: "category",
              label: "Ledger",
              items: [
                "general/kusama/kusama-ledger",
                "general/kusama/kusama-statemine-ledger",
              ],
        },
      ],
    },
    {
      type: "category",
      label: "What to Build",
      items: [
        "build/build-index",
        "maintain/maintain-endpoints",
        {
          type: "category",
          label: "Development Guide",
          items: [
            "build/build-guide",
            "build/build-parachains",
            "build/build-storage",
            "build/build-smart-contracts",
            "build/build-oracle",
            "build/build-data",
            "build/build-substrate",
            "build/build-ss58-registry",
          ],
        },
        {
          type: "category",
          label: "Tools",
          items: [
            "build/build-tools-index",
            'build/build-open-source'
          ],
        },
        {
          type: "category",
          label: "Resources",
          items: ["build/build-hackathon"],
        },
      ],
    }, 
    {
      type: "category",
      label: "What to Break",
      items: [
        "maintain/maintain-errors",
        "general/kusama/kusama-bug-bounty",
        "general/kusama/kusama-adversarial-cheatsheet",
      ],
    },
  ],
};
