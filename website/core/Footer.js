/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const Container = require("react-bootstrap/Container");
const Row = require("react-bootstrap/Row");
const Col = require("react-bootstrap/Col");
const Button = require("react-bootstrap/Button");

class FooterNavColumn extends React.Component {
  render() {
    return (
      <Col xs={6} md={3} className="mb-3 mb-md-0">
        <h5 className="text-white">{this.props.headline}</h5>
        <ul className="list-unstyled">{this.props.children}</ul>
      </Col>
    );
  }
}

class FooterLink extends React.Component {
  render() {
    return (
      <li className="py-0 py-md-1">
        <a href={this.props.href} className="text-white" target="_blank" rel="noopener noreferrer">
          {this.props.content}
        </a>
      </li>
    );
  }
}

class FooterSocialColumn extends React.Component {
  render() {
    const Social = () => (
      <ul className="list-social-links justify-content-around">
        <li className="text-white">
          <a href="https://twitter.com/Polkadot" target="_blank" rel="noopener noreferrer">
            <i className="socicon-twitter"></i>
          </a>
        </li>
        <li className="text-white">
          <a href="https://www.reddit.com/r/polkadot" target="_blank" rel="noopener noreferrer">
            <i className="socicon-reddit"></i>
          </a>
        </li>
        <li className="text-white">
          <a
            href="https://github.com/paritytech/polkadot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="socicon-github"></i>
          </a>
        </li>
        <li className="text-white">
          <a
            href="https://www.youtube.com/channel/UCB7PbjuZLEba_znc7mEGNgw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="socicon-youtube"></i>
          </a>
        </li>
        <li className="text-white">
          <a href="https://discord.gg/wGUDt2p" target="_blank" rel="noopener noreferrer">
            <i className="socicon-discord"></i>
          </a>
        </li>
      </ul>
    );

    const Newsletter = () => (
      <>
        <p className="d-block text-white">
          Subscribe to the newsletter to hear about Polkadot updates and events.
        </p>
        <Button>
          <a
            href="https://info.polkadot.network/subscribe"
            target="_blank"
            style={{ color: "white" }}
          >
            Subscribe
          </a>
        </Button>
      </>
    );

    return (
      <Col md={3} className="px-lg-0">
        <Social />
        <Newsletter />
      </Col>
    );
  }
}

class FooterLegalLink extends React.Component {
  render() {
    return (
      <li>
        <a
          href={this.props.href}
          className="text-white text-small"
          target="_blank"
          rel="noopener noreferrer"
        >
          {this.props.content}
        </a>
      </li>
    );
  }
}

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
      <footer className="nav-footer spacer-y-4 pb-4" id="footer">
        <Container>
          <Row className="justify-content-start">
            <FooterNavColumn headline="General">
              <FooterLink content="About" href="https://polkadot.network/about" />
              <FooterLink content="FAQ" href="https://polkadot.network/faq" />
              <FooterLink content="Contact" href="https://polkadot.network/contact" />
              <FooterLink content="Build" href="https://polkadot.network/build" />
              <FooterLink
                content="Grants and Bounties"
                href="https://github.com/w3f/General-Grants-Program"
              />
              <FooterLink content="Careers" href="https://polkadot.network/jobs" />
            </FooterNavColumn>
            <FooterNavColumn headline="Technology">
              <FooterLink content="Technology" href="https://polkadot.network/technology" />
              <FooterLink content="Token" href="https://polkadot.network/dot-token" />
              <FooterLink content="Telemetry" href="https://telemetry.polkadot.io/" />
              <FooterLink content="Substrate" href="https://www.parity.io/substrate" />
              <FooterLink content="Whitepaper" href="https://polkadot.network/PolkaDotPaper.pdf" />
              <FooterLink
                content="Lightpaper"
                href="https://polkadot.network/Polkadot-lightpaper.pdf"
              />
            </FooterNavColumn>
            <FooterNavColumn headline="Community">
              <FooterLink content="Community" href="https://polkadot.network/community" />
              <FooterLink content="Documentation" href="http://wiki.polkadot.network/en/latest/" />
              <FooterLink content="Brand Assets" href="https://polkadot.network/brand-assets" />
              <FooterLink content="Blog" href="https://polkadot.network/blog" />
              <FooterLink
                content="Element Chat"
                href="https://app.element.io/#/room/!FdCojkeGzZLSEoiecf:web3.foundation?via=matrix.parity.io&via=matrix.org&via=web3.foundation"
              />
              <FooterLink content="Medium" href="https://medium.com/polkadot-network" />
            </FooterNavColumn>
            <FooterSocialColumn />
          </Row>
          <Row className="footer-legal align-items-end mt-5 pt-4">
            {this.props.config.footerIcon && (
              <Col lg={2} className="mb-2 mb-lg-0">
                <a
                  className="navbar-brand"
                  href="https://polkadot.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={this.props.config.baseUrl + this.props.config.footerIcon}
                    alt="Polkadot Network"
                  />
                </a>
              </Col>
            )}
            <Col lg={10}>
              <ul className="list-unstyled d-flex flex-wrap list-pipe-separator">
                <FooterLegalLink
                  content={this.props.config.copyright}
                  href="https://web3.foundation"
                />
                <FooterLegalLink content="Impressum" href="https://polkadot.network/impressum" />
                <FooterLegalLink content="Disclaimer" href="https://polkadot.network/disclaimer" />
                <FooterLegalLink content="Privacy" href="https://polkadot.network/privacy" />
                <FooterLegalLink content="PDF version" href="{{ dot_ipfs_pdf_url }}" />
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

module.exports = Footer;
