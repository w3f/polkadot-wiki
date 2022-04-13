module.exports = {
  docs: [
    {
      type: "category",
      label: "Get Started",
      items: [
        "general/kusama/kusama-getting-started",
        "general/kusama/kusama-coc",
        "general/kusama/kusama-claims",
        "learn/learn-polkadotjs",
        "learn/learn-balance-transfers",
        "learn/learn-auction",
        "learn/learn-parachains",
        "learn/learn-parathreads",
        "learn/learn-bridges",
        "learn/learn-crowdloans",
        "general/ens",
        "general/kusama/kusama-parameters",
        "general/kusama/kusama-timeline",
        "general/kusama/kusama-community",
        "general/ambassadors",
        "maintain/kusama/maintain-guides-society-kusama",
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
                "learn/learn-account-restore",
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
                "learn/learn-teleport",
              ],
        },
        {
          type: "category",
              label: "Identity",
              items: [
                "learn/learn-identity",
                "learn/learn-registrar",
              ],
        },
        {
          type: "category",
              label: "Nominate",
              items: [
                "learn/learn-staking",
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
                "maintain/maintain-guides-how-to-join-council"
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
            "build/build-wallets",
            "build/build-substrate",
            "build/build-ss58-registry",
          ],
        },
        {
          type: "category",
          label: "Tools",
          items: ["build/build-tools-index"],
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
