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
          <p className="homepage-font">
            Kusama is an experimental <br />
            community research and
            <br /> development network.
          </p>
          <a href={docUrl("kusama-index")} target="_blank" className="homepage-font">
            Docs
          </a>
          <a href="https://kusama.network/" target="_blank" className="homepage-font">
            Kusama Network
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
            href="https://matrix.to/#/!HfRYKXBoPmDBCAWUEJ:polkadot.builders"
            target="_blank"
            rel="noreferrer noopener"
            className="homepage-font"
          >
            Kusama Watercooler (Element Chat)
          </a>
        </div>
        <a href="/kusama-wiki.zip" target="_blank" rel="noreferrer noopener">
          Download this Guide as PDF
        </a>
      </section>

      <section className="row">
        <div className="copyright homepage-font">{siteConfig.themeConfig.footer.copyright}</div>
        <a className="item homepage-font" href="https://polkadot.network/privacy/">
          Privacy Policy
        </a>
      </section>
    </footer>
  );
}
