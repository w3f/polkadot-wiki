/**
 * Dynamic Favicon Switcher
 * Switches between light and dark favicons based on color scheme
 */

(function() {
  const lightFavicon = '/assets/logo/polkadot-icon__near-black-on-cool-gray.png';
  const darkFavicon = '/assets/logo/polkadot-icon__cool-gray-on-near-black.png';

  function updateFavicon() {
    const isDarkMode = document.querySelector('[data-md-color-scheme="custom-dark"]') !== null;
    const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
    
    if (favicon) {
      favicon.href = isDarkMode ? darkFavicon : lightFavicon;
    }
  }

  // Update on page load
  updateFavicon();

  // Watch for color scheme changes
  const observer = new MutationObserver(updateFavicon);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-md-color-scheme']
  });

  // Also listen to palette toggle
  document.addEventListener('DOMContentLoaded', function() {
    const paletteInputs = document.querySelectorAll('input[name="__palette"]');
    paletteInputs.forEach(input => {
      input.addEventListener('change', updateFavicon);
    });
  });
})();
