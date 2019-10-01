window.onload = () => {
  const head = document.getElementsByTagName('head')[0];

  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5BKVQLS');`;
  gtagScript.setAttribute('data-type', 'application/js');
  head.appendChild(gtagScript);

  const tracker = document.createElement('noscript');
  const pixel = document.createElement('iframe');
  pixel.setAttribute('src', 'https://www.googletagmanager.com/ns.html?id=GTM-5BKVQLS');
  pixel.setAttribute('height', '0');
  pixel.setAttribute('width', '0');
  pixel.setAttribute('style', 'display:none;visibility:hidden');
  tracker.appendChild(pixel);
  head.appendChild(tracker);

  const katex = document.createElement('script');
  katex.setAttribute('defer', true);
  katex.setAttribute('src', 'ttps://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js');
  katex.setAttribute('integrity', 'sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI');
  katex.setAttribute('onload', 'renderMathInElement(document.body);');
}
