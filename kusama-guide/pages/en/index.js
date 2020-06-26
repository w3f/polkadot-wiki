const React = require('react');

const translate = require('../../server/translate.js').translate;

class HomeSplash extends React.Component {
  render() {
    // const {siteConfig, language = ''} = this.props;

    const SplashContainer = props => (
      <div className="kusamaHomeContainer">
          <div className="wrapper homeWrapper">{props.children}</div>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <img src='/img/Kusama_logotype_white_large.png' height={320} />
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
        <div className="mainpage-row-placeholder" />
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainpage-row-placeholder" />
        <div className="mainContainer" style={{padding: '0'}}>
          <div className="kusama-mainpage-row-learn">
            <p className="kusama-full-width">
            Kusama is an early, unaudited and unrefined release of Polkadot. Kusama will serve as a proving ground, allowing teams and developers to build and deploy a parachain or try out Polkadot’s governance, staking, nomination and validation functionality in a real environment.
            </p>
          </div>
          <div className="kusama-mainpage-row">
            <h1 className="kusama-full-width">
              What can you do with Kusama?
           </h1>
          </div>
          <div className="kusama-mainpage-row-validator">
            <div className="mainpage-column">
              <h2>Become a Validator</h2>
            </div>
            <div className="mainpage-column">
              <p>
                The minimum requirement for staking as a validator on Kusama is much lower than it is expected for Polkadot. There are also programs in place such as <a href="https://polkadot.network/join-kusamas-thousand-validators-programme/" target="_blank">Thousand Validators</a> to help community validators rise the ranks.
              </p>
              <a href={docUrl('build-index')}>
                <button className="kusama-mainpage-build-btn">
                  Read more on Validators
                </button>
              </a>
            </div>
          </div>
          <div className="kusama-mainpage-row-more">
            <div className="mainpage-column">
              <h2>Deploy Parachains</h2>
              <p>
              Kusama will get the functionality required for parachains before Polkadot. This includes participating in a parachain slot auction and composable applications.
              </p>
              <a href={docUrl('build-index')}>
                <button className="kusama-mainpage-build-btn">
                  Read more on Parachains
                </button>
              </a>
            </div>
            <div className="mainpage-column">
              <h2>Explore the politics</h2>
              <p>
                Campaign as a councillor or vote for new runtime proposals using Democracy.
              </p>
              <a href={docUrl('build-index')}>
                <button className="kusama-mainpage-build-btn">
                  Read more on Politics
                </button>
              </a>
            </div>
          </div>
          <div className="kusama-mainpage-cyber-row">
            {/* <div className="kusama-mainpage-column">
              <img src='../img/Kusama-white-stencil.png' />
            </div> */}
            <div className="kusama-mainpage-column">
              <h2>
                Join a cyber secret society
              </h2>
              <p>
                The Kappa Sigma Mu fraternity asks you to get a Kusama tattoo to join.
              </p>
              <a href={docUrl('build-index')}>
                <button className="kusama-mainpage-build-btn">
                  See Kappa Sigma Mu
                </button>
              </a>
            </div>
          </div>
        </div> 
      </div>
    );
  }
}

module.exports = Index;
