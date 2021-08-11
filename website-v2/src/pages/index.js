/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Translate from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import KusamaCanary from "@site/static/img/kusama_canary_white.svg";

function HomeNav() {
  const NavContainer = ({ children }) => (
    <section className="homeNavContainer">
      <Container className="h-100">
        <Row className="h-100 d-flex align-items-center">{children}</Row>
      </Container>
    </section>
  );

  const NavItem = ({ href, aosDelay, children }) => (
    <Col xs={12} md={12} lg={4} className="homeNavItem rounded-lg">
      <a
        href={href}
        className="h-100 d-flex align-items-center"
        data-aos="fade-up"
        data-aos-delay={aosDelay}
      >
        <div className="mx-auto">{children}</div>
      </a>
    </Col>
  );

  const NavItemTitle = ({ children }) => (
    <h2 className="display-4 mt-0 text-dark font-weight-bold text-center">{children}</h2>
  );

  const NavItemContent = ({ children }) => <p className="small text-secondary px-4">{children}</p>;

  return (
    <NavContainer>
      <NavItem href={useDocUrl("learn-launch")} aosDelay="0">
        <NavItemTitle>
          <Translate
            id="homePage.navContainer.learn.title"
            description="Title of Learn Navigator in Home page"
          >
            Learn
          </Translate>
        </NavItemTitle>
        <NavItemContent>
          <Translate
            id="homePage.navContainer.learn.content"
            description="Content of Learn Navigator in Home page"
          >
            Polkadot is a sharded protocol that enables blockchain networks to operate together
            seamlessly.
          </Translate>
        </NavItemContent>
      </NavItem>
      <NavItem href={useDocUrl("build-index")} aosDelay="200">
        <NavItemTitle>
          <Translate
            id="homePage.navContainer.build.title"
            description="Title of Build Navigator in Home page"
          >
            Build
          </Translate>
        </NavItemTitle>
        <NavItemContent>
          <Translate
            id="homePage.navContainer.build.content"
            description="Content of Build Navigator in Home page"
          >
            Most up-to-date information on the status of the development tools in the Polkadot
            ecosystem.
          </Translate>
        </NavItemContent>
      </NavItem>
      <NavItem href={useDocUrl("maintain-index")} aosDelay="400">
        <NavItemTitle>
          <Translate
            id="homePage.navContainer.maintain.title"
            description="Title of Maintain Navigator in Home page"
          >
            Maintain
          </Translate>
        </NavItemTitle>
        <NavItemContent>
          <Translate
            id="homePage.navContainer.maintain.content"
            description="Content of Maintain Navigator in Home page"
          >
            Information and guides on how to deploy a node and run the network.
          </Translate>
        </NavItemContent>
      </NavItem>
    </NavContainer>
  );
}

function HomeFooter() {
  const FooterContainer = ({ children }) => (
    <section className="homeFooterContainer text-white text-left">
      <Container>
        <Row className="">{children}</Row>
      </Container>
    </section>
  );

  const LearnKusama = () => (
    <Col lg={6}>
      <KusamaCanary height={45} />
      <h3 className="h2 font-weight-bold">
        <Translate
          id="homepage.homeFooter.learnKusama.title"
          description="Title of Learn Kusama Footer Section in Home Page"
        >
          Learn about Polkadot’s canary network Kusama
        </Translate>
      </h3>
      <p className="">
        <Translate
          id="homepage.homeFooter.learnKusama.content"
          description="Content of Learn Kusama Footer Section in Home Page"
        >
          Kusama is Polkadot’s “canary network”, a scalable, multi-chain network for radical
          innovation and early stage Polkadot deployments. For developers, Kusama is a proving
          ground for all things Polkadot I.e runtime upgrades, on-chain governance, parachains,
          parathreads, etc.
        </Translate>
      </p>
      <div>
        <a href="https://guide.kusama.network">
          <button className="btn btn-lg btn-primary btn-bg-primary">
            <Translate
              id="homepage.homeFooter.learnKusama.discoverKusamaButton"
              description="Discover Kusama Button Label of Improve Wiki Footer Section in Home page"
            >
              Discover Kusama
            </Translate>
          </button>
        </a>
      </div>
    </Col>
  );

  const ImproveWiki = () => (
    <Col lg={6}>
      <span className="material-icons" style={{ fontSize: 50 + "px" }}>
        language
      </span>
      <h3 className="h2 font-weight-bold">
        <Translate
          id="homepage.homeFooter.improveWiki.title"
          description="Title of Improve Wiki Footer Section in Home page"
        >
          Help improve this wiki
        </Translate>
      </h3>
      <p className="">
        <Translate
          id="homepage.homeFooter.improveWiki.content"
          description="Content of Improve Wiki Footer Section in Home page"
        >
          This wiki was started by and is maintained by Web3 Foundation. It is an open-source-ish
          project and aims to be the most extensive resource of knowledge on Polkadot and the
          Polkadot ecosystem.
        </Translate>
      </p>
      <div>
        <a href={useDocUrl("contributing")}>
          <button className="btn btn-lg btn-primary btn-bg-primary mr-3">
            <Translate
              id="homepage.homeFooter.improveWiki.contributeButton"
              description="Contribute Button Label of Improve Wiki Footer Section in Home page"
            >
              Contribute
            </Translate>
          </button>
        </a>
        <a
          href="https://crowdin.com/project/polkadot-wiki"
          target="_blank"
          rel="noreferrer noopener"
        >
          <button className="btn btn-lg btn-primary btn-bg-primary">
            <Translate
              id="homepage.homeFooter.improveWiki.helpTranslateButton"
              description="Help Translate Button Label of Improve Wiki Footer Section in Home page"
            >
              Help Translate
            </Translate>
          </button>
        </a>
      </div>
    </Col>
  );

  return (
    <FooterContainer>
      <LearnKusama />
      <ImproveWiki />
    </FooterContainer>
  );
}

export default function Index() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.tagline}>
      <div className="homeContainer">
        <HomeNav />
        <HomeFooter />
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
