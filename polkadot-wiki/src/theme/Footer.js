import * as React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Logo from "@site/static/img/Polkadot_Logo_White.svg";

function FooterSocialColumn() {
  const SocialItem = ({ href, className }) => {
    return (
      <li className="text-white mr-2 mr-lg-0 mr-xl-2">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <i className={className} />
        </a>
      </li>
    );
  };

  const Social = () => (
    <ul className="list-social-links mt-5 mt-lg-0 justify-content-lg-end">
      <SocialItem href="https://twitter.com/Polkadot" className="socicon-twitter" />
      <SocialItem href="https://www.reddit.com/r/polkadot" className="socicon-reddit" />
      <SocialItem href="https://github.com/paritytech/polkadot-sdk" className="socicon-github" />
      <SocialItem
        href="https://www.youtube.com/channel/UCB7PbjuZLEba_znc7mEGNgw"
        className="socicon-youtube"
      />
      <SocialItem href="https://dot.li/discord" className="socicon-discord" />
    </ul>
  );

  return (
    <Col className="px-lg-0">
      <Social />
    </Col>
  );
}

function FooterLegalLink({ href, content }) {
  return (
    <li>
      <a href={href} className="text-white text-small" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    </li>
  );
}

export default function Footer() {
  const { siteConfig } = useDocusaurusContext();
  const { footer } = siteConfig.themeConfig;

  return (
    <footer className="nav-footer spacer-y-4" id="footer">
      <Container className="container-custom">
        <Row className="footer-legal align-items-end">
          {footer && (
            <Col lg={2} className="mb-2 mb-lg-0">
              <a
                className="navbar-brand"
                href="https://polkadot.network/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Logo height={31} alt="Polkadot Network" />
              </a>
            </Col>
          )}
          <Col lg={6}>
            <ul className="list-unstyled d-flex flex-wrap list-pipe-separator mt-2">
              <FooterLegalLink content={footer.copyright} href="https://web3.foundation" />
              <FooterLegalLink
                content={translate({
                  message: "Legal Disclosures",
                  id: "footer.footerLegal.legal-diclosures",
                  description: "Legal Disclosures Button Label in Footer Legal",
                })}
                href="https://polkadot.network/legal-disclosures"
              />
              <FooterLegalLink
                content={translate({
                  message: "Disclaimer",
                  id: "footer.footerLegal.disclaimer",
                  description: "Disclaimer Button Label in Footer Legal",
                })}
                href="https://polkadot.network/disclaimer"
              />
              <FooterLegalLink
                content={translate({
                  message: "Privacy",
                  id: "footer.footerLegal.privacy",
                  description: "Privacy Button Label in Footer Legal",
                })}
                href="https://polkadot.network/privacy"
              />
            </ul>
          </Col>
          <FooterSocialColumn />
        </Row>
      </Container>
    </footer>
  );
}
