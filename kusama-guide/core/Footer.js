/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : "") + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <p className="homepage-font">
              Kusama is an experimental <br/>community research and<br/> development network.
            </p>
            <a 
              href="https://guide.kusama.network/docs/en/kusama-index"
              target="_blank"
              className="homepage-font"
            >
              Docs
            </a>
            <a 
              href="https://kusama.network/" 
              target="_blank"
              className="homepage-font"
            >
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
          </div>
          {this.props.config.twitterUsername && (
            <div className="social">
              <a
                href={`https://twitter.com/polkadotnetwork}`}
                className="twitter-follow-button"
              >
                Follow @{this.props.config.twitterUsername}
              </a>
            </div>
          )}
        </section>

        <section className="row">
          <div className="copyright homepage-font">{this.props.config.copyright}</div>
          <a className="item homepage-font" href="https://polkadot.network/privacy/">
            Privacy Policy
          </a>
          <a className="item homepage-font" href="#" id="cookie-settings">
            Cookie Settings
          </a>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              var cookieSettings = document.getElementById('cookie-settings');
              cookieSettings.onclick = function() {
                return klaro.show();
              };
              `
            }}
          />
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
