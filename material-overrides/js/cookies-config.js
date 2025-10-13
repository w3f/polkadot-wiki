window.addEventListener("load", function () {
  window.cookieconsent.initialise({
    palette: {
      popup: { background: "#000" },
      button: { background: "#f1d600" }
    },
    type: "opt-in",
    content: {
      message: "This website uses cookies to facilitate the operation of the Kapa AI Chatbot and to enhance user experience through anonymous analytics. By selection 'Allow', you consent to the placement of functional cookies necessary for enabling the chatbot. If you select 'Decline', the chatbot will be disabled and unavailable to you. For more information, please refer to our ",
      dismiss: "Accept",
      deny: "Decline",
      link: "Privacy Policy.",
      href: "https://web3.foundation/privacy-and-cookies/",
    },
    onInitialise: function (status) {
      if (status === 'allow') {
        loadKapaWidget();
      } else {
        disableKapaWidget();
      }
    },
    onStatusChange: function (status) {
      if (status === 'allow') {
        if (!window.kapaWidgetLoaded) {
          location.reload();
        } else {
          loadKapaWidget();
        }
      } else {
        disableKapaWidget();
      }
    },
  });

  function loadKapaWidget() {
    // Remove any existing widget script first
    const oldScript = document.querySelector('script[data-kapa="true"]');
    if (oldScript) oldScript.remove();

    // Also remove existing container
    const container = document.getElementById('kapa-widget-container');
    if (container) container.remove();

    // Create a new script with a cache-busting URL
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://widget.kapa.ai/kapa-widget.bundle.js?ts=' + Date.now();
    script.setAttribute('data-kapa', 'true');
    
    // replicate all your data-* attributes here:
    script.setAttribute('data-website-id', 'f4bbad14-cc24-471c-8b7d-3267eafc6dc2');
    script.setAttribute('data-project-name', 'Polkadot');
    script.setAttribute('data-modal-title', 'Polkadot AI Chatbot');
    script.setAttribute('data-project-color', '#1E1E1E');
    script.setAttribute('data-button-bg-color', '#1C0533');
    script.setAttribute('data-button-text-color', 'white');
    script.setAttribute('data-button-height', '80px');
    script.setAttribute('data-button-width', '72px');
    script.setAttribute('data-font-size-xs', '12px');
    script.setAttribute('data-font-size-sm', '14px');
    script.setAttribute('data-font-size-md', '16px');
    script.setAttribute('data-font-size-lg', '18px');
    script.setAttribute('data-font-size-xl', '22px');
    script.setAttribute('data-modal-title-font-size', '22px');
    script.setAttribute('data-button-text-font-size', '18px');
    script.setAttribute('data-query-input-font-size', '16px');
    script.setAttribute('data-button-image-height', '24px');
    script.setAttribute('data-button-image-width', '24px');
    script.setAttribute('data-modal-image-height', '24px');
    script.setAttribute('data-modal-image-width', '24px');
    script.setAttribute('data-project-logo', 'https://1000logos.net/wp-content/uploads/2022/08/Polkadot-Symbol.png');
    script.setAttribute('data-modal-header-bg-color', '#1C0533');
    script.setAttribute('data-modal-title-color', 'white');
    script.setAttribute('data-modal-disclaimer', `This is an AI chatbot trained to answer questions about Polkadot. As such, the answers it provides might not always be accurate or up-to-date. Please use your best judgement when evaluating its responses. Also, **please refrain from sharing any personal or private information with the bot**. By submitting a query, you agree that you have read and understood [these conditions](/policies/chatbot-terms).
        **If you need further assistance, you can reach out to [Polkadot Support](https://support.polkadot.network/support/tickets/new?ticket_form=i_have_a_support_request).**`);
    script.setAttribute('data-modal-example-questions', 'Where can I store my DOT?, How can I create a DOT account?, How can I stake my DOT?, How does Polkadot OpenGov work?');
    script.setAttribute('data-modal-disclaimer-font-size', '12px');
    script.setAttribute('data-search-mode-enabled', 'false');
    script.setAttribute('data-search-mode-default', 'false');
    script.setAttribute('data-search-result-primary-title-font-size', '16px');
    script.setAttribute('data-button-position-top', '120px');
    script.setAttribute('data-button-position-right', '0px');
    script.setAttribute('data-user-analytics-cookie-enabled', 'false');

    // Reset global state
    window.kapaWidgetLoaded = true;

    document.head.appendChild(script);
  }

  function disableKapaWidget() {
    const container = document.getElementById('kapa-widget-container');
    if (container) container.remove();

    const script = document.querySelector('script[data-kapa="true"]');
    if (script) script.remove();

    // Optional: also delete global kapa variables if they exist
    delete window.kapa;
    window.kapaWidgetLoaded = false;
  }
  
});
