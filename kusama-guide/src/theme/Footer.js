/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Footer() {
  const { siteConfig } = useDocusaurusContext();

  const docUrl = (url) => `${siteConfig.baseUrl}docs/${url}`;

  return (
    <footer className="nav-footer" id="footer">
      <section className="sitemap">
        <a href={siteConfig.baseUrl} className="nav-home">
          <img
            src={siteConfig.baseUrl + siteConfig.themeConfig.footer.logo.src}
            alt={siteConfig.title}
            width="66"
            height="58"
          />
        </a>
        <div>
          <a
            href="https://kusama.network/"
            target="_blank"
            className="homepage-font"
          >
            Kusama Network
          </a>
          <a
            href="https://polkadot.network/faq/"
            target="_blank"
            rel="noreferrer noopener"
            className="homepage-font"
          >
            FAQ
          </a>
          <a
            href="https://twitter.com/kusamanetwork"
            target="_blank"
            rel="noreferrer noopener"
            className="homepage-font"
          >
            Twitter
          </a>
          <a
            href="https://www.notion.so/web3foundation/Polkadot-Kusama-Community-Hub-ee1fd077ff6c42c381940404f6aa9f1c"
            target="_blank"
            rel="noreferrer noopener"
            className="homepage-font"
          >
            Community Hub
          </a>
          <a
            href="https://kusa.ma/discord"
            target="_blank"
            rel="noreferrer noopener"
            className="homepage-font"
          >
            Kusama Discord
          </a>
          <a
            href="https://matrix.to/#/!HfRYKXBoPmDBCAWUEJ:polkadot.builders"
            target="_blank"
            rel="noreferrer noopener"
            className="homepage-font"
          >
            Kusama Watercooler
          </a>
          <a
            href="https://github.com/w3f/General-Grants-Program"
            target="_blank"
            rel="noreferrer noopener"
            className="homepage-font"
          >
            Grants and Bounties
          </a>
        </div>
        <div className="kusama-mainpage-cyber-row">
          <div className="kusama-mainpage-column">
            <h2 className="homepage-font-footer">
              Join a cyber secret society
            </h2>
            <p className="homepage-font-footer">
              The Kappa Sigma Mu fraternity asks you to get a Kusama tattoo to
              join.
            </p>
            <a href={docUrl("maintain-guides-society-kusama")}>
              <button className="kusama-mainpage-build-footer">
                See Kappa Sigma Mu
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="row">
        <div className="copyright homepage-font">
          {siteConfig.themeConfig.footer.copyright}
        </div>
        <a
          className="item homepage-font"
          href="https://polkadot.network/privacy/"
        >
          Privacy Policy
        </a>
      </section>
    </footer>
  );
}
