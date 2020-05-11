/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const translate = require('../../server/translate.js').translate;

class HomeSplash extends React.Component {
  render() {
    // const {siteConfig, language = ''} = this.props;

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
          <img src='/img/Polkadot_logotype_color.svg' height={320}/>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <div className="mainpage-row-learn">
            <div className="mainpage-column">
              <h2><translate>A scalable, heterogeneous multichain.</translate></h2>
              <p>
                <translate>
                  Polkadot is a platform with low barriers to entry for flexible, autonomous economies acting together within Polkadot’s shared security umbrella. Polkadot is a revolution, not just in blockchain technology but also towards enabling fairer peer-to-peer digital jurisdictions.
                </translate>
              </p>
              <a href={docUrl('learn-introduction')}>
                <button className="mainpage-build-btn">
                  <translate>Learn More</translate>                
                </button>
              </a>
            </div>
            <div className="mainpage-column">
              <img src={`${baseUrl}img/polkadot_overview.svg`}/>
            </div>
          </div>
          <div className="mainpage-row-build">
            <div className="mainpage-column">
              <img src={`${baseUrl}img/network/one_parachain.png`}/>
            </div>
            <div className="mainpage-column">
              <h2><translate>Build</translate></h2>
              <p>
                <translate>
                  Polkadot empowers builders and developers to create blockchains to suit their needs and to benefit from interoperability and shared security.
                </translate>
              </p>
              <a href={docUrl('build-index')}>
                <button className="mainpage-build-btn">
                  <translate>Builder's Portal</translate>
                </button>
              </a>
            </div>
          </div>
          <div className="mainpage-row">
            <h1 className="full-width">Maintain</h1>
            <div className="mainpage-column">
              <img src={`${baseUrl}img/icon_validator.svg`} width={100}/>
              <h2><translate>Validators</translate></h2>
              <p>
                <translate>Run a validator and help to secure the Polkadot network while earning rewards.</translate>
              </p>
            </div>
            <div className="mainpage-column">
              <img src={`${baseUrl}img/icon_collator.svg`} width={100}/>
              <h2><translate>Collators</translate></h2>
              <p>
                <translate>Run a collator to package the parachain blocks and pass them to validators for verification.</translate>
              </p>
            </div>
            <a href={docUrl('maintain-index')}>
              <button className="mainpage-maintain-btn">
                <translate>Become a Maintainer</translate>
              </button>
            </a>
          </div>
        </div> 
      </div>
    );
  }
}

module.exports = Index;
