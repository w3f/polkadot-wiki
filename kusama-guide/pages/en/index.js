const React = require('react');

const Index = () => {

  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
            __html: `
          window.location.href = 'docs/en/kusama-index/';
        `,
        }}
      />
      If you are not redirected automatically, follow this <a href="docs/en/kusama-index/">link</a>.
    </div>
  );
}

module.exports = Index;
