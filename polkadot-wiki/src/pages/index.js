/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from "react";
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
      <Container>
        <Row className="justify-content-center">{children}</Row>
      </Container>
    </section>
  );

  const NavItem = ({ href, aosDelay, children, imageSrc, description }) => (
    <Col xs={12} md={6} lg={6} className="mb-4">
      <a href={href} className="text-decoration-none" data-aos="fade-up" data-aos-delay={aosDelay}>
        <div className="card border-0 rounded-lg shadow" style={{ height: "100%" }}>
          <img src={imageSrc} alt="NavItem Image" className="card-img-top rounded-top" style={{ maxHeight: '200px', width: '100%', objectFit: 'contain' }} />
          <div className="card-body d-flex flex-column justify-content-between">
            <h1 className="mt-0 text-dark font-weight-bold text-center">{children}</h1>
            <div className="card-description text-center" style={{ maxHeight: "5rem", overflowY: "auto" }}>
              {description}
            </div>
          </div>
        </div>
      </a>
    </Col>
  );

  return (
    <NavContainer>
      <NavItem
        href={useDocUrl("getting-started")}
        aosDelay="0"
        imageSrc="img/polkadot-guide/Explore.png"
        description={<Translate id="homePage.navContainer.explore.content">Explore Wallets, Applications and Programmes within the Polkadot Ecosystem.</Translate>}
      >
        <Translate id="homePage.navContainer.explore.title">Explore</Translate>
      </NavItem>
      <NavItem
        href={useDocUrl("web3-and-polkadot")}
        aosDelay="200"
        imageSrc="img/polkadot-guide/Learn.png"
        description={<Translate id="homePage.navContainer.learn.content">Learn about Polkadot and how it provides Shared Security and Secure Interoperability to its Parachains.</Translate>}
      >
        <Translate id="homePage.navContainer.learn.title">Learn</Translate>
      </NavItem>
      <NavItem
        href={useDocUrl("build-guide")}
        aosDelay="400"
        imageSrc="img/polkadot-guide/Build.png"
        description={<Translate id="homePage.navContainer.build.content">Most up-to-date Information on the Status of the Development Tools in the Polkadot Ecosystem.</Translate>}
      >
        <Translate id="homePage.navContainer.build.title">Build</Translate>
      </NavItem>
      <NavItem
        href={useDocUrl("maintain-index")}
        aosDelay="600"
        imageSrc="img/polkadot-guide/Maintain.png"
        description={<Translate id="homePage.navContainer.maintain.content">Information and Guides on how to Deploy a Node and Run the Network.</Translate>}
      >
        <Translate id="homePage.navContainer.maintain.title">Maintain</Translate>
      </NavItem>
    </NavContainer>
  );
}

function HomeFooter() {
  const FooterContainer = ({ children }) => (
    <section className="homeFooterContainer text-white text-left">
      <Container className="container-custom">
        <Row className="">{children}</Row>
      </Container>
    </section>
  );

  const LearnKusama = () => (
    <Col lg={6}>
      <div className="text-center">
        <KusamaCanary height={50} style={{ marginBottom: '20px' }}/>
        <h3 className="h2 font-weight-medium text-heading">
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
      </div>
    </Col>
  );

  const ImproveWiki = () => (
    <Col lg={6}>
      <div className="text-center">
        <span className="material-icons" style={{ fontSize: 50 + "px", marginBottom: '20px' }}>
          language
        </span>
        <h3 className="h2 font-weight-medium text-heading">
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
        </div>
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
