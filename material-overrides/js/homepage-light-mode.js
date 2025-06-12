/**
 * Homepage Dark Mode Exclusion
 * 
 * This script ensures the homepage always stays in light mode,
 * regardless of the user's dark mode toggle setting.
 */

(function() {
    'use strict';

    // Check if we're on the homepage
    function isHomePage() {
        return document.body.classList.contains('home-page');
    }

    // Force light mode on homepage
    function enforceHomepageLightMode() {
        if (!isHomePage()) return;

        // Set the color scheme to default (light mode)
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        
        // Remove dark mode attribute and ensure light mode
        htmlElement.setAttribute('data-md-color-scheme', 'default');
        bodyElement.setAttribute('data-md-color-scheme', 'default');
        
        // Also set it on any palette inputs that might exist
        const paletteInputs = document.querySelectorAll('input[name="__palette"]');
        paletteInputs.forEach(input => {
            if (input.getAttribute('data-md-color-scheme') === 'default') {
                input.checked = true;
            }
        });
    }

    // Override the palette toggle functionality for homepage
    function overridePaletteToggle() {
        if (!isHomePage()) return;

        // Listen for palette changes
        const paletteForm = document.querySelector('form[data-md-component="palette"]');
        if (paletteForm) {
            paletteForm.addEventListener('change', function(e) {
                // If on homepage, always revert to light mode after a short delay
                setTimeout(() => {
                    enforceHomepageLightMode();
                }, 10);
            });
        }

        // Also listen for direct clicks on palette toggle buttons
        const paletteLabels = document.querySelectorAll('label[for^="__palette"]');
        paletteLabels.forEach(label => {
            label.addEventListener('click', function(e) {
                // If on homepage, prevent dark mode after a short delay
                setTimeout(() => {
                    enforceHomepageLightMode();
                }, 10);
            });
        });
    }

    // Watch for attribute changes on the document element
    function watchForColorSchemeChanges() {
        if (!isHomePage()) return;

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'data-md-color-scheme' || 
                     mutation.attributeName === 'data-md-color-media')) {
                    
                    // If someone tries to set dark mode on homepage, revert it
                    const currentScheme = document.documentElement.getAttribute('data-md-color-scheme');
                    if (currentScheme === 'slate') {
                        enforceHomepageLightMode();
                    }
                }
            });
        });

        // Start observing
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-md-color-scheme', 'data-md-color-media']
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-md-color-scheme', 'data-md-color-media']
        });
    }

    // Initialize when DOM is ready
    function init() {
        if (isHomePage()) {
            // Immediately enforce light mode
            enforceHomepageLightMode();
            
            // Set up the override functionality
            overridePaletteToggle();
            
            // Watch for changes
            watchForColorSchemeChanges();
            
            console.log('Homepage light mode exclusion initialized');
        }
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();