import * as React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Logo from "@site/static/img/Polkadot_Logo_Horizontal_White.svg";

function FooterNavColumn({ headline, children }) {
  return (
    <Col xs={6} md={3} className="mb-3 mb-md-0">
      <h5 className="text-white">{headline}</h5>
      <ul className="list-unstyled">{children}</ul>
    </Col>
  );
}

function FooterSocialColumn() {
  const SocialItem = ({ href, className }) => {
    return (
      <li className="text-white">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <i className={className} />
        </a>
      </li>
    );
  };

  const Social = () => (
    <ul className="list-social-links justify-content-around">
      <SocialItem
        href="https://twitter.com/Polkadot"
        className="socicon-twitter"
      />
      <SocialItem
        href="https://www.reddit.com/r/polkadot"
        className="socicon-reddit"
      />
      <SocialItem
        href="https://github.com/paritytech/polkadot"
        className="socicon-github"
      />
      <SocialItem
        href="https://www.youtube.com/channel/UCB7PbjuZLEba_znc7mEGNgw"
        className="socicon-youtube"
      />
      <SocialItem
        href="https://discord.gg/wGUDt2p"
        className="socicon-discord"
      />
    </ul>
  );

  const Newsletter = () => (
    <>
      <p className="d-block text-white">
        <Translate
          id="footer.subscribeMessage"
          description="Subscribe message in Footer"
        >
          Subscribe to the newsletter to hear about Polkadot updates and events.
        </Translate>
      </p>
      <Button>
        <a
          href="https://info.polkadot.network/subscribe"
          target="_blank"
          style={{ color: "white" }}
        >
          <Translate
            id="footer.subscribeButton"
            description="Label of Subscribe button in Footer"
          >
            Subscribe
          </Translate>
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

function FooterLegalLink({ href, content }) {
  return (
    <li>
      <a
        href={href}
        className="text-white text-small"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    </li>
  );
}

function FooterLink({ href, content }) {
  return (
    <li className="py-0 py-md-1">
      <a
        href={href}
        className="text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    </li>
  );
}

export default function Footer() {
  const { siteConfig } = useDocusaurusContext();
  const { footer } = siteConfig.themeConfig;

  return (
    <footer className="nav-footer spacer-y-4 pb-4" id="footer">
      <Container>
        <Row className="justify-content-start">
          <FooterNavColumn
            headline={translate({
              message: "General",
              id: "footer.body.general",
              description: "Headline of General column in Footer",
            })}
          >
            <FooterLink
              content={translate({
                message: "About",
                id: "footer.body.general.about",
                description: "About link in General column in Footer",
              })}
              href="https://polkadot.network/about"
            />
            <FooterLink
              content={translate({
                message: "FAQ",
                id: "footer.body.general.faq",
                description: "FAQ link in General column in Footer",
              })}
              href="https://polkadot.network/faq"
            />
            <FooterLink
              content={translate({
                message: "Contact",
                id: "footer.body.general.contact",
                description: "Contact link in General column in Footer",
              })}
              href="https://polkadot.network/contact"
            />
            <FooterLink
              content={translate({
                message: "Build",
                id: "footer.body.general.build",
                description: "Build link in General column in Footer",
              })}
              href="https://polkadot.network/build"
            />
            <FooterLink
              content={translate({
                message: "Grants and Bounties",
                id: "footer.body.general.grantsAndBounties",
                description:
                  "Grants and Bounties link in General column in Footer",
              })}
              href="https://github.com/w3f/General-Grants-Program"
            />
            <FooterLink
              content={translate({
                message: "Careers",
                id: "footer.body.general.careers",
                description: "Careers link in General column in Footer",
              })}
              href="https://polkadot.network/jobs"
            />
          </FooterNavColumn>
          <FooterNavColumn
            headline={translate({
              message: "Technology",
              id: "footer.body.technology",
              description: "Headline of Technology column in Footer",
            })}
          >
            <FooterLink
              content={translate({
                message: "Technology",
                id: "footer.body.technology.technology",
                description: "Technology link in Technology column in Footer",
              })}
              href="https://polkadot.network/technology"
            />
            <FooterLink
              content={translate({
                message: "Token",
                id: "footer.body.technology.token",
                description: "Token link in Technology column in Footer",
              })}
              href="https://polkadot.network/dot-token"
            />
            <FooterLink
              content={translate({
                message: "Telemetry",
                id: "footer.body.technology.telemetry",
                description: "Telemetry link in Technology column in Footer",
              })}
              href="https://telemetry.polkadot.io/"
            />
            <FooterLink
              content={translate({
                message: "Substrate",
                id: "footer.body.technology.substrate",
                description: "Substrate link in Technology column in Footer",
              })}
              href="https://www.parity.io/substrate"
            />
            <FooterLink
              content={translate({
                message: "Whitepaper",
                id: "footer.body.technology.whitepaper",
                description: "Whitepaper link in Technology column in Footer",
              })}
              href="https://polkadot.network/PolkaDotPaper.pdf"
            />
            <FooterLink
              content={translate({
                message: "Lightpaper",
                id: "footer.body.technology.lightpaper",
                description: "Lightpaper link in Technology column in Footer",
              })}
              href="https://polkadot.network/Polkadot-lightpaper.pdf"
            />
          </FooterNavColumn>
          <FooterNavColumn
            headline={translate({
              message: "Community",
              id: "footer.body.community",
              description: "Headline of Community column in Footer",
            })}
          >
            <FooterLink
              content={translate({
                message: "Community",
                id: "footer.body.community.community",
                description: "Community link in Community column in Footer",
              })}
              href="https://polkadot.network/community"
            />
            <FooterLink
              content={translate({
                message: "Documentation",
                id: "footer.body.community.documentation",
                description: "Documentation link in Community column in Footer",
              })}
              href="http://wiki.polkadot.network/en/latest/"
            />
            <FooterLink
              content={translate({
                message: "Brand Assets",
                id: "footer.body.community.brandAssets",
                description: "Brand Assets link in Community column in Footer",
              })}
              href="https://polkadot.network/brand-assets"
            />
            <FooterLink content="Blog" href="https://polkadot.network/blog" />
            <FooterLink
              content="Element Chat"
              href="https://app.element.io/#/room/!FdCojkeGzZLSEoiecf:web3.foundation?via=matrix.parity.io&via=matrix.org&via=web3.foundation"
            />
            <FooterLink
              content="Medium"
              href="https://medium.com/polkadot-network"
            />
          </FooterNavColumn>
          <FooterSocialColumn />
        </Row>
        <Row className="footer-legal align-items-end mt-5 pt-4">
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
          <Col lg={10}>
            <ul className="list-unstyled d-flex flex-wrap list-pipe-separator">
              <FooterLegalLink
                content={footer.copyright}
                href="https://web3.foundation"
              />
              <FooterLegalLink
                content={translate({
                  message: "Impressum",
                  id: "footer.footerLegal.impressum",
                  description: "Impressum Button Label in Footer Legal",
                })}
                href="https://polkadot.network/impressum"
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
        </Row>
      </Container>
    </footer>
  );
}
