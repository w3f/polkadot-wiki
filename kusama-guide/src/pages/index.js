const React = require("react");

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

function HomeSplash() {
  const SplashContainer = (props) => (
    <div className="kusamaHomeContainer">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  );

  return (
    <SplashContainer>
      <div className="mainContainer" style={{ padding: "0" }}>
        <button className="kusama-mainpage-build-btn-main homepage-font">
          <a
            className="homepage-font-start"
            href="https://wiki.polkadot.network/docs/kusama-getting-started"
          >
            GET STARTED WITH KUSAMA
          </a>
        </button>
      </div>
    </SplashContainer>
  );
}

export default function Index() {
  const { siteConfig } = useDocusaurusContext();

  const { baseUrl } = siteConfig;
  const docsPart = "docs/";
  const docUrl = (doc) => `${baseUrl}${docsPart}${doc}`;
  return (
    <Layout title={siteConfig.tagline}>
      <div>
        <div className="mainpage-row-placeholder" style={{ width: "100%" }} />
        <HomeSplash siteConfig={siteConfig} />
        <div className="mainpage-row-placeholder" />
        <div className="mainContainer" style={{ padding: "0" }}>
          <div className="kusama-mainpage-row-learn">
            <p className="kusama-full-width-main homepage-font">
              Kusama is an early release of Polkadot: a scalable, multichain
              network for radical innovation. Kusama serves as a proving ground
              that allows teams and developers to build and deploy a parachain,
              and experiment with Polkadot’s governance and NPoS functionality
              in a real environment.
            </p>
          </div>
          <div className="mainpage-row-placeholder" />
          <div className="kusama-mainpage-row">
            <h1 className="kusama-full-width homepage-font">
              <div className="wrapper">
                <div className="typing-demo">Join the chaos.</div>
              </div>
            </h1>
          </div>
          <div className="kusama-mainpage-row-more">
            <div className="mainpage-column">
              <h2 className="homepage-font">Become a Nominator</h2>
              <p className="homepage-font">
                Help maintain the network by participating as a nominator.
                Nomination is the process of staking your tokens behind a
                validator to support and secure the network. As a result,
                nominators are rewarded from the block production rewards that
                their nominatations are entitled to.
              </p>
              <a href="https://wiki.polkadot.network/docs/learn-nominator">
                <button className="kusama-mainpage-build-btn homepage-font">
                  Read more on Nominating
                </button>
              </a>
            </div>
            <div className="mainpage-column">
              <h2 className="homepage-font">Become a Validator</h2>
              <p className="homepage-font">
                The minimum requirement for staking as a validator on Kusama is
                much lower than it is expected for Polkadot. There are also
                programs in place such as{" "}
                <a
                  href="https://wiki.polkadot.network/docs/thousand-validators"
                  target="_blank"
                >
                  Thousand Validators
                </a>{" "}
                to help community validators rise the ranks.
              </p>
              <a href="https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-kusama">
                <br />
                <button className="kusama-mainpage-build-btn homepage-font">
                  Read more on Validators
                </button>
              </a>
            </div>
          </div>
          <div className="kusama-mainpage-row-more">
            <div className="mainpage-column">
              <h2 className="homepage-font">Deploy Parachains</h2>
              <p className="homepage-font">
                Kusama Parachains are live. Chaos has been welcomed and
                continues with no promises. The path of Kusama deployment is
                paving the way to Polkadot's parachains as the technology
                becomes proven.
              </p>
              <a href="https://wiki.polkadot.network/docs/learn-parachains-index">
                <button className="kusama-mainpage-build-btn homepage-font">
                  Read more on Parachains
                </button>
              </a>
            </div>
            <div className="mainpage-column">
              <h2 className="homepage-font">Explore the Politics</h2>
              <p className="homepage-font">
                Learn about Kusama's on-chain governance. Campaign as a
                councillor or vote for new runtime proposals using Democracy.
              </p>
              <a href="https://wiki.polkadot.network/docs/learn-polkadot-opengov">
                <br />
                <button className="kusama-mainpage-build-btn homepage-font">
                  Read more on Governance
                </button>
              </a>
            </div>
          </div>
          <div className="kusama-mainpage-row-extra">
            <div className="mainpage-column">
              <h2 className="homepage-font">
                Learn about Kusama's Cousin, Polkadot
              </h2>
              <p className="homepage-font">
                Kusama is Polkadot’s canary network. Polkadot development is on
                track to deliver the most robust platform for security,
                scalability and innovation. With the help of Kusama, Polkadot
                will become a scalable, interoperable & secure network protocol
                for web 3.0.
              </p>
              <a href="https://wiki.polkadot.network/docs/kusama-getting-started">
                <button className="kusama-mainpage-build-btn homepage-font">
                  Learn more on Polkadot
                </button>
              </a>
            </div>
            <div className="mainpage-column">
              <h2 className="homepage-font">Help Improve this Wiki</h2>
              <p className="homepage-font">
                This Wiki was started by and is maintained by Web3 Foundation.
                It is an open-source project and aims to be the most extensive
                resource of knowledge on Kusama and the Kusama ecosystem.
              </p>
              <a href="https://wiki.polkadot.network/docs/contributing">
                <br />
                <button className="kusama-mainpage-build-btn homepage-font">
                  Learn more on Contributions
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function useDocUrl(url) {
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl } = siteConfig;
  const docsPart = "docs/";
  return `${baseUrl}${docsPart}${url}`;
}