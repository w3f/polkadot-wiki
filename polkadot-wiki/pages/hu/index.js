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

class HomeNav extends React.Component {
  render() {
    // const {siteConfig, language = ''} = this.props;

    const NavContainer = (props) => (
      <section className="homeNavContainer">
        <Container className="h-100">
          <Row className="h-100 d-flex align-items-center">{props.children}</Row>
        </Container>
      </section>
    );

    const NavItem = (props) => (
      <Col xs={12} md={12} lg={4} className="homeNavItem rounded-lg">
        <a
          href={props.href}
          className="h-100 d-flex align-items-center"
          data-aos="fade-up"
          data-aos-delay={props.aosDelay}
        >
          <div className="mx-auto">
            <h2 className="display-4 mt-0 text-dark font-weight-bold text-center">{props.title}</h2>
            <p className="small text-secondary px-4">{props.content}</p>
          </div>
        </a>
      </Col>
    );

    return (
      <NavContainer>
        <NavItem
          href={this.props.docUrl("build-index")}
          title="Építés"
          content="A legfrissebb információk a Polkadot ökoszisztéma fejlesztői eszközeinek állapotáról."
          aosDelay="0"
        />
        <NavItem
          href={this.props.docUrl("learn-index")}
          content="A Polkadot egy felosztott (sharded) protokoll, amely lehetővé teszi a blokklánchálózatok zökkenőmentes együttműködését."
          title="Tanulás"
          aosDelay="300"
        />
        <NavItem
          href={this.props.docUrl("maintain-index")}
          title="Fenntartás"
          content="Információ és útmutatók csomópontok telepítéséről és a hálózat üzemeltetéséről."
          aosDelay="600"
        />
      </NavContainer>
    );
  }
}

class HomeFooter extends React.Component {
  render() {
    const FooterContainer = (props) => (
      <section className="homeFooterContainer text-white text-left">
        <Container>
          <Row className="pb-5">{props.children}</Row>
        </Container>
      </section>
    );

    const LearnKusama = () => (
      <Col lg={6} className="d-flex align-items-end flex-column pb-5 mb-5 mb-lg-0">
        <Col xs={12}>
          <img src="/img/kusama_canary_white.svg" height={41} />
          <h3 className="h2 font-weight-medium mt-2">
            A Polkadot Kusama kanári hálózatának megismerése
          </h3>
          <p className="mb-5">
            A Kusama a Polkadot kanári hálózata: a radikális innovációt és korai szakaszban lévő
            Polkadot alkalmazásokat szolgáló skálázható, többláncú hálózat. A fejlesztők számára
            a Kusama egy biztos pont, ahol a Polkadot alkalmazások bizonyíthatnak (pl. futásidejű
            frissítések, láncon belüli kormányzás, parachain-ek, parathread-ek stb.).
          </p>
        </Col>
        <Col>
          <a href="https://guide.kusama.network">
            <button className="btn btn-lg btn-primary btn-bg-primary">Kusama Felfedezése</button>
          </a>
        </Col>
      </Col>
    );

    const ImproveWiki = () => (
      <Col lg={6} className="d-flex align-items-end flex-column pb-5">
        <Col xs={12}>
          <span className="material-icons" style={{ fontSize: 50 + "px" }}>
            language
          </span>
          <h3 className="h2 font-weight-medium">A wiki továbbfejlesztése</h3>
          <p className="mb-5">
            A Web3 Alapítvány indította és tartja fenn ezt a wikit. A nyílt forrású projekt célja,
            hogy a Polkadot és a Polkadot ökoszisztéma legkiterjedtebb tudásforrása legyen.
          </p>
        </Col>
        <Col>
          <a href={this.props.docUrl("contributing")}>
            <button className="btn btn-lg btn-primary btn-bg-primary mr-3">Hozzájárulás</button>
          </a>
          <a
            href={this.props.siteConfig.translationRecruitingLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            <button className="btn btn-lg btn-primary btn-bg-primary">Segítség a fordításban</button>
          </a>
        </Col>
      </Col>
    );

    return (
      <FooterContainer>
        <LearnKusama />
        <ImproveWiki />
      </FooterContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    return (
      <div className="homeContainer">
        <HomeNav siteConfig={siteConfig} docUrl={docUrl} />
        <HomeFooter siteConfig={siteConfig} docUrl={docUrl} />
      </div>
    );
  }
}

module.exports = Index;
