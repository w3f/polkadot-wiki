/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useState} from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Translate from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import KusamaCanary from "@site/static/img/kusama_canary_white.svg";
import { useScrollListener } from "../hooks/useScroll";

function HomeNav() {
  const NavContainer = ({ children }) => (
    <section className="homeNavContainer">
      <Container className="h-100 px-5">
        <Row className="h-100 d-flex align-items-center">{children}</Row>
      </Container>
    </section>
  );

  const NavItem = ({ href, aosDelay, children }) => (
    <Col xs={12} md={12} lg={4} className="homeNavItem rounded-lg">
      <a href={href} className="h-100" data-aos="fade-up" data-aos-delay={aosDelay}>
        <div className="mx-auto">{children}</div>
      </a>
    </Col>
  );

  const NavItemTitle = ({ children }) => (
    <h1 className="mt-0 text-dark font-weight-bold text-center">{children}</h1>
  );

  const NavItemContent = ({ children }) => <div className="homeNavItemContent">{children}</div>;

  return (
    <NavContainer>
      <NavItem href={useDocUrl("getting-started")} aosDelay="0">
        <NavItemContent>
          <NavItemTitle>
            <Translate
              id="homePage.navContainer.learn.title"
              description="Title of Learn Navigator in Home page"
            >
              Learn
            </Translate>
          </NavItemTitle>
          <p className="mx-auto small text-secondary px-4">
            <Translate
              id="homePage.navContainer.learn.content"
              description="Content of Learn Navigator in Home page"
            >
              Polkadot is a sharded protocol that enables blockchain networks to operate together
              seamlessly.
            </Translate>
          </p>
        </NavItemContent>
      </NavItem>
      <NavItem href={useDocUrl("build-index")} aosDelay="200">
        <NavItemContent>
          <NavItemTitle>
            <Translate
              id="homePage.navContainer.build.title"
              description="Title of Build Navigator in Home page"
            >
              Build
            </Translate>
          </NavItemTitle>
          <p className="mx-auto small text-secondary px-4">
            <Translate
              id="homePage.navContainer.build.content"
              description="Content of Build Navigator in Home page"
            >
              Most up-to-date information on the status of the development tools in the Polkadot
              ecosystem.
            </Translate>
          </p>
        </NavItemContent>
      </NavItem>
      <NavItem href={useDocUrl("maintain-index")} aosDelay="400">
        <NavItemContent>
          <NavItemTitle>
            <Translate
              id="homePage.navContainer.maintain.title"
              description="Title of Maintain Navigator in Home page"
            >
              Maintain
            </Translate>
          </NavItemTitle>
          <p className="mx-auto small text-secondary px-4">
            <Translate
              id="homePage.navContainer.maintain.content"
              description="Content of Maintain Navigator in Home page"
            >
              Information and guides on how to deploy a node and run the network.
            </Translate>
          </p>
        </NavItemContent>
      </NavItem>
    </NavContainer>
  );
}

// Used for advertising events, conferences, etc
// To do, generalize this, and clean up implementation. This was hacked together for Polkadot Decoded 2022 by Emre

function Banner() {
  const scroll = useScrollListener()
  const [isScrolled, setIsScrolled] = useState()

  useEffect(() => {
    if (scroll.y > 100) {
      setIsScrolled(true);
    } else if (scroll.y < 1) {
      setIsScrolled(false);
    }
  }, [scroll.y]);

  const FixedBanner = () => (
    <div className={`fixed-banner ${isScrolled ? 'fixed-banner--hidden' : 'fixed-banner--visible'}`}>
      <div className="mx-auto col-12 col-md-10 col-xl-8 p-3 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <p className="mb-0 text-center text-md-left">
         <span class="font-weight-bolder pr-lg-4">Sub0 is coming to Lisbon!</span>
          <span class="d-flex d-lg-inline-block">Join the Polkadot developer conference, November 28th-29th</span>
        </p>
        <a href="https://sub0.polkadot.network/?utm_source=wiki.polkadot.network&utm_medium=referral&utm_campaign=sub0%202022&utm_content=notification%20banner%20wiki">
          <button className="banner-button btn btn-md btn-primary btn-bg-primary mt-3 mt-md-0 ml-md-3">
              Sign Up
          </button>
        </a>
      </div>
    </div>
  )

  return (
    <FixedBanner />
  )
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
      <KusamaCanary height={45} />
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
    </Col>
  );

  const ImproveWiki = () => (
    <Col lg={6}>
      <span className="material-icons" style={{ fontSize: 50 + "px" }}>
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
    <>
      <Banner />
      <Layout title={siteConfig.tagline}>
        <div className="homeContainer">
          <HomeNav />
          <HomeFooter />
        </div>
      </Layout>
    </>
  );
}

function useDocUrl(url) {
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl } = siteConfig;
  const docsPart = "docs/";
  return `${baseUrl}${docsPart}${url}`;
}
