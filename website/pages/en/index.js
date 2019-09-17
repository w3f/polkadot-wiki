/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <img src='/polkadot-wiki-i18n/img/Polkadot_logotype_color.svg' height={320}/>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'Polkadot empowers blockchain networks to work together under the protection of shared security.',
            image: `${baseUrl}img/network/one_parachain.png`,
            imageAlign: 'left',
            title: 'Build',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              'Polkadot is a platform with low barriers to entry for flexible, autonomous economies acting together within Polkadot’s shared security umbrella. Polkadot is a revolution, not just in blockchain technology but also towards enabling fairer peer-to-peer digital jurisdictions.',
            image: `${baseUrl}img/polkadot_overview.svg`,
            imageAlign: 'right',
            title: 'A scalable, heterogeneous multichain.',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'Run a validator and help to secure the Polkadot network while earning rewards.',
            image: `${baseUrl}img/icon_validator.svg`,
            imageAlign: 'top',
            title: 'Validate',
          },
          {
            content: 'Run a collator to package the parachain blocks and pass them to validators for verification.',
            image: `${baseUrl}img/icon_collator.svg`,
            imageAlign: 'top',
            title: 'Collate',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <LearnHow />
          <Description />
          <Features />
        </div> 
      </div>
    );
  }
}

module.exports = Index;
